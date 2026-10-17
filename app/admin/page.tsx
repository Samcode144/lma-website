import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";

async function AdminDashboard() {
  // Render this authenticated page at request time.
  await connection();

  const supabase = await createClient();

  // Verify the signed-in user with Supabase Auth.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Verify the administrator role using the database.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-slate-950 px-4 py-4 text-white sm:px-6 sm:py-5">
        <div className="mx-auto flex max-w-6xl items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-sm font-bold text-slate-950 sm:h-12 sm:w-12">
            LMA
          </div>

          <div>
            <p className="text-xs font-medium text-amber-400 sm:text-sm">
              Liberia Marketing Association
            </p>
            <h1 className="text-base font-bold sm:text-xl">
              Administrator Dashboard
            </h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 sm:text-sm">
            Secure Administration
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:mt-3 sm:text-3xl">
            Welcome to the LMA Dashboard
          </h2>

          <p className="mt-2 text-sm text-slate-600 sm:mt-3 sm:text-base">
            You are signed in with an authorized administrator account.
            This dashboard is protected by a server-side role check.
          </p>

          {/* Staff Management Section */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Staff Management
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
              Manage employee records, ID cards, and staff verification.
            </p>

            <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/employees"
                className="rounded-xl border border-slate-200 p-4 transition hover:border-amber-400 hover:bg-amber-50 sm:p-5"
              >
                <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Employee Management
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                  Manage employee records and employment status.
                </p>
              </Link>

              <Link
                href="/employees/id-cards"
                className="rounded-xl border border-slate-200 p-4 transition hover:border-amber-400 hover:bg-amber-50 sm:p-5"
              >
                <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Staff ID Cards
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                  Prepare printable staff cards with a secure QR verification link.
                </p>
              </Link>

              <Link
                href="/verification"
                className="rounded-xl border border-slate-200 p-4 transition hover:border-amber-400 hover:bg-amber-50 sm:p-5"
              >
                <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Public Verification
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                  Public QR pages show only approved staff details.
                </p>
              </Link>
            </div>
          </div>

          {/* Website Content Management Section */}
          <div className="mt-8 sm:mt-10">
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Website Content Management
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
              Manage public website content, including leadership profiles, departments, projects, programs, partnerships, and news.
            </p>

            <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/admin/cms/leadership"
                className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50 sm:p-5"
              >
                <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Leadership Profiles
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                  Manage public leadership profiles and biographies.
                </p>
              </Link>

              <Link
                href="/admin/cms/departments"
                className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50 sm:p-5"
              >
                <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Departments
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                  Create and manage organizational departments.
                </p>
              </Link>

              <Link
                href="/admin/cms/projects"
                className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50 sm:p-5"
              >
                <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Projects
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                  Manage project information and status.
                </p>
              </Link>

              <Link
                href="/admin/cms/programs"
                className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50 sm:p-5"
              >
                <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Programs
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                  Create and manage community programs.
                </p>
              </Link>

              <Link
                href="/admin/cms/partnerships"
                className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50 sm:p-5"
              >
                <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Partnerships
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                  Manage partner organizations and collaborations.
                </p>
              </Link>

              <Link
                href="/admin/cms/news"
                className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50 sm:p-5"
              >
                <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                  News & Announcements
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                  Write and publish news articles and updates.
                </p>
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6">
            <p className="text-xs text-slate-500 sm:text-sm">
              Signed in as: {user.email}
            </p>

            <LogoutButton />
          </div>

          <Link
            href="/"
            className="mt-4 inline-block text-sm font-medium text-amber-700 hover:text-amber-800 sm:mt-5"
          >
            Return to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 text-slate-600">
          <p role="status">
            Loading administrator dashboard...
          </p>
        </main>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}
