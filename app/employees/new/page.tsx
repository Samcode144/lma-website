import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { createEmployee } from "../actions";
import EmployeeForm from "../employee-form";

async function NewEmployeeContent() {
  await connection();
  await requireAdmin({ redirectTo: "/login" });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/employees"
          className="text-sm font-semibold text-amber-700 hover:text-amber-800"
        >
          ← Back to Employee Directory
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Register Employee
        </h1>
        <p className="mt-2 text-slate-600">
          Create a new LMA employee record. Required fields are marked with an
          asterisk.
        </p>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <EmployeeForm
            mode="create"
            action={createEmployee}
            cancelHref="/employees"
          />
        </section>
      </div>
    </main>
  );
}

export default function NewEmployeePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Loading registration form...</p>
        </main>
      }
    >
      <NewEmployeeContent />
    </Suspense>
  );
}
