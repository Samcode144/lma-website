import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { getContentImageUrl } from "@/lib/cms/images";
import LeadershipProfileForm from "./profile-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function LeadershipProfileEdit({ params }: PageProps) {
  await connection();
  const { id } = await params;
  const { supabase, user } = await requireAdmin({ redirectTo: "/login" });

  const { data: employee, error } = await supabase
    .from("employees")
    .select(
      "id, staff_id, first_name, last_name, position, department, biography, show_on_leadership, leadership_sort_order, public_photo_path, employment_status"
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !employee) {
    notFound();
  }

  const photoUrl = getContentImageUrl(supabase, employee.public_photo_path);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/admin/cms/leadership"
            className="text-sm font-semibold text-amber-700 hover:text-amber-800"
          >
            ← Back to Leadership Management
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Edit Leadership Profile
          </h1>

          <p className="mt-2 text-slate-600">
            Manage public leadership profile for {employee.first_name}{" "}
            {employee.last_name}
          </p>
        </div>

        {/* Employee Summary Card */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${employee.first_name} ${employee.last_name}`}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-600">
                {employee.first_name.charAt(0)}
                {employee.last_name.charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {employee.first_name} {employee.last_name}
              </h2>
              <p className="mt-1 font-semibold text-amber-700">
                {employee.position}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {employee.department} • Staff ID: {employee.staff_id}
              </p>
              <div className="mt-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    employee.employment_status === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.employment_status === "active"
                    ? "Active Employee"
                    : "Inactive Employee"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <LeadershipProfileForm employee={employee} existingPhotoUrl={photoUrl} />

        <p className="mt-8 text-sm text-slate-500">
          Signed in as administrator: {user.email}
        </p>
      </div>
    </main>
  );
}

export default function LeadershipProfileEditPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Loading profile editor...</p>
        </main>
      }
    >
      <LeadershipProfileEdit {...props} />
    </Suspense>
  );
}
