import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { createEmployeePhotoSignedUrl } from "@/lib/employees/photos";
import type { Employee } from "@/lib/employees/types";
import DeleteEmployeeButton from "../delete-employee-button";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function EmployeeProfileContent({ params }: PageProps) {
  await connection();
  const session = await requireAdmin({ redirectTo: "/login" });
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const { data, error } = await session.supabase
    .from("employees")
    .select(
      "id, staff_id, first_name, last_name, position, department, official_email, phone, photo_path, employment_status, created_at, updated_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const employee = data as Employee;
  const photoUrl = await createEmployeePhotoSignedUrl(
    session.supabase,
    employee.photo_path
  );

  const fullName = `${employee.first_name} ${employee.last_name}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/employees"
          className="text-sm font-semibold text-amber-700 hover:text-amber-800"
        >
          ← Back to Employee Directory
        </Link>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrl}
                  alt={`Photo of ${fullName}`}
                  className="h-24 w-24 rounded-xl object-cover ring-1 ring-slate-200"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-500">
                  No photo
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-amber-700">
                  {employee.staff_id}
                </p>
                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  {fullName}
                </h1>
                <p className="mt-2 text-slate-600">
                  {employee.position} · {employee.department}
                </p>
                <span
                  className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    employee.employment_status === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.employment_status === "active"
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/employees/${employee.id}/edit`}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Edit employee
              </Link>
              <DeleteEmployeeButton
                employeeId={employee.id}
                employeeName={fullName}
              />
            </div>
          </div>

          <dl className="mt-8 grid gap-5 border-t border-slate-200 pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate-500">Official email</dt>
              <dd className="mt-1 font-medium text-slate-900">
                {employee.official_email || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Phone</dt>
              <dd className="mt-1 font-medium text-slate-900">
                {employee.phone || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Created</dt>
              <dd className="mt-1 font-medium text-slate-900">
                {new Date(employee.created_at).toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Last updated</dt>
              <dd className="mt-1 font-medium text-slate-900">
                {new Date(employee.updated_at).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}

export default function EmployeeProfilePage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Loading employee profile...</p>
        </main>
      }
    >
      <EmployeeProfileContent {...props} />
    </Suspense>
  );
}
