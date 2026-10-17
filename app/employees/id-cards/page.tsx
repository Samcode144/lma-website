import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import type { Employee, EmploymentStatus } from "@/lib/employees/types";

type IdCardEmployee = Pick<
  Employee,
  | "id"
  | "staff_id"
  | "first_name"
  | "last_name"
  | "position"
  | "department"
> & {
  employment_status: EmploymentStatus;
};

async function IdCardDirectory() {
  await connection();
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("employees")
    .select("id, staff_id, first_name, last_name, position, department, employment_status")
    .order("last_name", { ascending: true })
    .order("first_name", { ascending: true });

  const employees = (data ?? []) as IdCardEmployee[];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin"
          className="text-sm font-semibold text-amber-700 hover:text-amber-800"
        >
          ← Back to Admin Dashboard
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Staff ID Cards</h1>
        <p className="mt-2 text-slate-600">
          Choose an employee to preview and print their LMA identification card.
        </p>

        {error ? (
          <p
            role="alert"
            className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-800"
          >
            Employee records could not be loaded. Please try again.
          </p>
        ) : employees.length === 0 ? (
          <p className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
            No employee records are available to print.
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {employees.map((employee) => (
              <li
                key={employee.id}
                className="flex flex-wrap items-center justify-between gap-4 p-5"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {employee.first_name} {employee.last_name}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {employee.staff_id} · {employee.position} ·{" "}
                    {employee.department}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {employee.employment_status}
                  </p>
                </div>
                <Link
                  href={`/employees/${employee.id}/id-card`}
                  className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  View / Print Card
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default function IdCardsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Loading staff ID cards...</p>
        </main>
      }
    >
      <IdCardDirectory />
    </Suspense>
  );
}
