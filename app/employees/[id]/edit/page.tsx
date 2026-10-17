import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { createEmployeePhotoSignedUrl } from "@/lib/employees/photos";
import type { ActionState, Employee } from "@/lib/employees/types";
import { updateEmployee } from "../../actions";
import EmployeeForm from "../../employee-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function EditEmployeeContent({ params }: PageProps) {
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

  const boundUpdate = updateEmployee.bind(
    null,
    employee.id
  ) as (
    prevState: ActionState,
    formData: FormData
  ) => Promise<ActionState>;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/employees/${employee.id}`}
          className="text-sm font-semibold text-amber-700 hover:text-amber-800"
        >
          ← Back to employee profile
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Edit employee
        </h1>
        <p className="mt-2 text-slate-600">
          Update details for {employee.first_name} {employee.last_name} (
          {employee.staff_id}).
        </p>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <EmployeeForm
            mode="edit"
            action={boundUpdate}
            employee={employee}
            photoUrl={photoUrl}
            cancelHref={`/employees/${employee.id}`}
          />
        </section>
      </div>
    </main>
  );
}

export default function EditEmployeePage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Loading employee editor...</p>
        </main>
      }
    >
      <EditEmployeeContent {...props} />
    </Suspense>
  );
}
