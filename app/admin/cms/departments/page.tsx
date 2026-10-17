import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { getContentImageUrl } from "@/lib/cms/images";
import DepartmentForm from "./department-form";
import DeleteDepartmentButton from "./delete-button";

async function DepartmentsManagement() {
  await connection();
  const { supabase, user } = await requireAdmin({ redirectTo: "/login" });

  const { data: departments } = await supabase
    .from("departments")
    .select("*")
    .order("sort_order")
    .order("name");

  const publishedCount = departments?.filter((d) => d.is_published).length ?? 0;

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
            Departments Management
          </h1>

          <p className="mt-2 text-slate-600">
            Create and manage organizational departments displayed on the public
            Departments page.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm text-blue-800">
            <strong>{publishedCount}</strong> department
            {publishedCount === 1 ? "" : "s"} published •{" "}
            <Link
              href="/departments"
              target="_blank"
              className="underline hover:no-underline"
            >
              View public page
            </Link>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create New Department Form */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Create New Department
            </h2>
            <DepartmentForm />
          </div>

          {/* Existing Departments List */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Existing Departments ({departments?.length ?? 0})
            </h2>

            {!departments || departments.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-600">No departments created yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {departments.map((dept) => {
                  const imageUrl = getContentImageUrl(supabase, dept.image_path);

                  return (
                    <details
                      key={dept.id}
                      className="group rounded-xl border border-slate-200 bg-white"
                    >
                      <summary className="flex cursor-pointer items-center justify-between p-5">
                        <div className="flex items-center gap-3">
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt={dept.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {dept.name}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Sort: {dept.sort_order}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            dept.is_published
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {dept.is_published ? "Published" : "Draft"}
                        </span>
                      </summary>

                      <div className="border-t border-slate-200 p-5">
                        <DepartmentForm department={dept} />
                        <div className="mt-4 border-t border-slate-200 pt-4">
                          <DeleteDepartmentButton id={dept.id} name={dept.name} />
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Signed in as administrator: {user.email}
        </p>
      </div>
    </main>
  );
}

export default function DepartmentsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Loading departments management...</p>
        </main>
      }
    >
      <DepartmentsManagement />
    </Suspense>
  );
}
