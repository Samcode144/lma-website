import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";

async function ProgramsManagement() {
  await connection();
  const { supabase, user } = await requireAdmin({ redirectTo: "/login" });

  const { data: programs } = await supabase
    .from("programs")
    .select("*")
    .order("created_at", { ascending: false });

  const publishedCount = programs?.filter((p) => p.is_published).length ?? 0;

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
            Programs Management
          </h1>

          <p className="mt-2 text-slate-600">
            Manage program information displayed on the public Programs page.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm text-blue-800">
            <strong>{publishedCount}</strong> program{publishedCount === 1 ? "" : "s"} published •{" "}
            <Link
              href="/programs"
              target="_blank"
              className="underline hover:no-underline"
            >
              View public page
            </Link>
          </p>
          <Link
            href="/admin/cms/programs/new"
            className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            + Create Program
          </Link>
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {!programs || programs.length === 0 ? (
            <div className="p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No programs created yet
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Create your first program to begin building the programs directory.
              </p>
              <Link
                href="/admin/cms/programs/new"
                className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Create First Program
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Title</th>
                    <th className="px-5 py-4 font-semibold">Start Date</th>
                    <th className="px-5 py-4 font-semibold">Published</th>
                    <th className="px-5 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {programs.map((program) => (
                    <tr key={program.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-medium text-slate-900">
                        {program.title}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {program.start_date
                          ? new Date(program.start_date).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            program.is_published
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {program.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/cms/programs/${program.id}`}
                          className="font-semibold text-blue-700 hover:text-blue-800"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="mt-8 text-sm text-slate-500">
          Signed in as administrator: {user.email}
        </p>
      </div>
    </main>
  );
}

export default function ProgramsManagementPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Loading programs management...</p>
        </main>
      }
    >
      <ProgramsManagement />
    </Suspense>
  );
}
