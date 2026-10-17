import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { getContentImageUrl } from "@/lib/cms/images";

async function LeadershipManagement() {
  await connection();
  const { supabase, user } = await requireAdmin({ redirectTo: "/login" });

  // Fetch all employees with leadership profile fields
  const { data: employees } = await supabase
    .from("employees")
    .select(
      "id, staff_id, first_name, last_name, position, department, biography, show_on_leadership, leadership_sort_order, public_photo_path, employment_status"
    )
    .order("show_on_leadership", { ascending: false })
    .order("leadership_sort_order")
    .order("last_name");

  const publishedCount = employees?.filter((e) => e.show_on_leadership).length ?? 0;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href="/admin"
            className="text-sm font-semibold text-amber-700 hover:text-amber-800"
          >
            ← Back to Admin Dashboard
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Leadership Profile Management
          </h1>

          <p className="mt-2 text-slate-600">
            Select employees to publish on the public Leadership page. Edit their
            biography and upload a public photo.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <div>
            <p className="text-sm text-blue-800">
              <strong>{publishedCount}</strong> profile
              {publishedCount === 1 ? "" : "s"} currently published on{" "}
              <Link
                href="/leadership"
                target="_blank"
                className="underline hover:no-underline"
              >
                /leadership
              </Link>
            </p>
          </div>
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Employee Profiles</h2>
            <p className="mt-1 text-sm text-slate-500">
              Click an employee to edit their public leadership profile.
            </p>
          </div>

          {!employees || employees.length === 0 ? (
            <div className="p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No employees found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Register employees first before managing leadership profiles.
              </p>
              <Link
                href="/employees/new"
                className="mt-5 inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Register First Employee
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Employee</th>
                    <th className="px-5 py-4 font-semibold">Position</th>
                    <th className="px-5 py-4 font-semibold">Department</th>
                    <th className="px-5 py-4 font-semibold">Public Profile</th>
                    <th className="px-5 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {employees.map((employee) => {
                    const photoUrl = getContentImageUrl(
                      supabase,
                      employee.public_photo_path
                    );

                    return (
                      <tr key={employee.id} className="hover:bg-slate-50">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {photoUrl ? (
                              <img
                                src={photoUrl}
                                alt={`${employee.first_name} ${employee.last_name}`}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
                                {employee.first_name.charAt(0)}
                                {employee.last_name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-slate-900">
                                {employee.first_name} {employee.last_name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {employee.staff_id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {employee.position}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {employee.department}
                        </td>
                        <td className="px-5 py-4">
                          {employee.show_on_leadership ? (
                            <div>
                              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                                Published
                              </span>
                              <p className="mt-1 text-xs text-slate-500">
                                Sort order: {employee.leadership_sort_order}
                              </p>
                            </div>
                          ) : (
                            <span className="text-slate-400">Not published</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <Link
                            href={`/admin/cms/leadership/${employee.id}`}
                            className="font-semibold text-blue-700 hover:text-blue-800"
                          >
                            Edit Profile
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="mt-5 text-sm text-slate-500">
          Signed in as administrator: {user.email}
        </p>
      </div>
    </main>
  );
}

export default function LeadershipManagementPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Loading leadership management...</p>
        </main>
      }
    >
      <LeadershipManagement />
    </Suspense>
  );
}
