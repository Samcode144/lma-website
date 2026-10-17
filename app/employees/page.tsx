import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { EMPLOYEES_PAGE_SIZE } from "@/lib/employees/constants";
import type { Employee } from "@/lib/employees/types";
import { escapeIlike } from "@/lib/employees/validation";
import DirectoryFilters from "./directory-filters";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    page?: string;
  }>;
};

async function EmployeesDirectory({ searchParams }: PageProps) {
  await connection();
  const session = await requireAdmin({ redirectTo: "/login" });

  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const status =
    params.status === "active" || params.status === "inactive"
      ? params.status
      : "all";
  const pageNumber = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const from = (pageNumber - 1) * EMPLOYEES_PAGE_SIZE;
  const to = from + EMPLOYEES_PAGE_SIZE - 1;

  const { supabase, user } = session;

  const [
    { count: totalCount },
    { count: activeCount },
    { count: inactiveCount },
  ] = await Promise.all([
    supabase
      .from("employees")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("employees")
      .select("id", { count: "exact", head: true })
      .eq("employment_status", "active"),
    supabase
      .from("employees")
      .select("id", { count: "exact", head: true })
      .eq("employment_status", "inactive"),
  ]);

  let listQuery = supabase
    .from("employees")
    .select(
      "id, staff_id, first_name, last_name, position, department, official_email, phone, photo_path, employment_status, created_at, updated_at",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (status !== "all") {
    listQuery = listQuery.eq("employment_status", status);
  }

  if (query) {
    const escaped = escapeIlike(query);
    listQuery = listQuery.or(
      [
        `staff_id.ilike.%${escaped}%`,
        `first_name.ilike.%${escaped}%`,
        `last_name.ilike.%${escaped}%`,
        `department.ilike.%${escaped}%`,
        `position.ilike.%${escaped}%`,
      ].join(",")
    );
  }

  const { data, error, count: filteredCount } = await listQuery;
  const employees = (data ?? []) as Employee[];
  const totalFiltered = filteredCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / EMPLOYEES_PAGE_SIZE));

  function buildPageHref(page: number) {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (status !== "all") next.set("status", status);
    if (page > 1) next.set("page", String(page));
    const qs = next.toString();
    return qs ? `/employees?${qs}` : "/employees";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="text-sm font-semibold text-amber-700 hover:text-amber-800"
            >
              ← Back to Admin Dashboard
            </Link>

            <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              Employee Management
            </h1>

            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              View and manage LMA employee records.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/employees/id-cards"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-amber-400 hover:bg-amber-50 sm:px-5 sm:py-3"
            >
              Staff ID Cards
            </Link>
            <Link
              href="/employees/new"
              className="rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 sm:px-5 sm:py-3"
            >
              + Register Employee
            </Link>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Employees</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalCount ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Active Employees</p>
            <p className="mt-2 text-3xl font-bold text-emerald-700">
              {activeCount ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Inactive Employees</p>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {inactiveCount ?? 0}
            </p>
          </div>
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Employee Directory</h2>
            <p className="mt-1 text-sm text-slate-500">
              Showing {employees.length} of {totalFiltered} matching record
              {totalFiltered === 1 ? "" : "s"}.
            </p>
          </div>

          <DirectoryFilters query={query} status={status} />

          {error ? (
            <div className="p-6">
              <p className="font-semibold text-red-700">
                Could not load employee records.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Check your Supabase connection, table permissions, and admin
                profile.
              </p>
            </div>
          ) : employees.length === 0 ? (
            <div className="p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                {query || status !== "all"
                  ? "No employees match your filters"
                  : "No employees registered yet"}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {query || status !== "all"
                  ? "Try clearing filters or adjusting your search."
                  : "Register your first employee to begin building the directory."}
              </p>
              {!query && status === "all" ? (
                <Link
                  href="/employees/new"
                  className="mt-5 inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
                >
                  Register First Employee
                </Link>
              ) : null}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Staff ID</th>
                      <th className="px-5 py-4 font-semibold">Employee</th>
                      <th className="px-5 py-4 font-semibold">Position</th>
                      <th className="px-5 py-4 font-semibold">Department</th>
                      <th className="px-5 py-4 font-semibold">Contact</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-5 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">
                          {employee.staff_id}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="font-medium text-slate-900">
                            {employee.first_name} {employee.last_name}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {employee.position}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {employee.department}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          <p>{employee.official_email || "—"}</p>
                          <p className="mt-1">{employee.phone || "—"}</p>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              employee.employment_status === "active"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {employee.employment_status === "active"
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="flex gap-3">
                            <Link
                              href={`/employees/${employee.id}`}
                              className="font-semibold text-amber-700 hover:text-amber-800"
                            >
                              View
                            </Link>
                            <Link
                              href={`/employees/${employee.id}/edit`}
                              className="font-semibold text-slate-700 hover:text-slate-900"
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/employees/${employee.id}/id-card`}
                              className="font-semibold text-slate-700 hover:text-slate-900"
                            >
                              ID Card
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 ? (
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 text-sm">
                  <p className="text-slate-500">
                    Page {pageNumber} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    {pageNumber > 1 ? (
                      <Link
                        href={buildPageHref(pageNumber - 1)}
                        className="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Previous
                      </Link>
                    ) : null}
                    {pageNumber < totalPages ? (
                      <Link
                        href={buildPageHref(pageNumber + 1)}
                        className="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Next
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </section>

        <p className="mt-5 text-sm text-slate-500">
          Signed in as administrator: {user.email}
        </p>
      </div>
    </main>
  );
}

export default function EmployeesPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Loading employee directory...</p>
        </main>
      }
    >
      <EmployeesDirectory {...props} />
    </Suspense>
  );
}
