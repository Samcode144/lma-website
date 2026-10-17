import { Suspense } from "react";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublishedDepartments } from "@/lib/cms/queries";
import { getContentImageUrl } from "@/lib/cms/images";
import PublicHeader from "@/app/components/public-header";
import PublicFooter from "@/app/components/public-footer";

async function DepartmentsContent() {
  await connection();
  const supabase = await createClient();
  const departments = await getPublishedDepartments(supabase);

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Page Header */}
      <section className="bg-blue-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Our Structure
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Departments and organizational units.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            LMA&apos;s work is organized across departments and teams, each focused
            on specific organizational functions and development priorities.
          </p>
        </div>
      </section>

      {/* Departments List */}
      <section className="px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {departments.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center sm:p-12">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Department information coming soon
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:mt-3 sm:text-base">
                Official department details will be published once organizational
                structure has been confirmed.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {departments.map((department) => {
                const imageUrl = getContentImageUrl(
                  supabase,
                  department.image_path
                );

                return (
                  <article
                    key={department.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-xl"
                  >
                    {imageUrl ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                        <img
                          src={imageUrl}
                          alt={department.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : null}

                    <div className="p-5 sm:p-6 lg:p-8">
                      <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
                        {department.name}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-slate-700 sm:mt-4 sm:leading-7">
                        {department.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

export default function DepartmentsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-600">
          <p role="status">Loading departments...</p>
        </main>
      }
    >
      <DepartmentsContent />
    </Suspense>
  );
}
