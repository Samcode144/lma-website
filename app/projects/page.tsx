import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublishedProjects } from "@/lib/cms/queries";
import { getContentImageUrl } from "@/lib/cms/images";
import PublicHeader from "@/app/components/public-header";
import PublicFooter from "@/app/components/public-footer";

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          Active
        </span>
      );
    case "completed":
      return (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
          Completed
        </span>
      );
    case "planned":
      return (
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          Planned
        </span>
      );
    default:
      return null;
  }
}

async function ProjectsContent() {
  await connection();
  const supabase = await createClient();
  const projects = await getPublishedProjects(supabase);

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Page Header */}
      <section className="bg-blue-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Our Work
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Projects driving community development.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            Explore LMA&apos;s project portfolio, from planning to implementation and
            completion. Each project represents our commitment to sustainable
            development and community impact.
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {projects.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center sm:p-12">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Project information coming soon
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:mt-3 sm:text-base">
                Official project details will be published as initiatives are
                approved and implementation begins.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const imageUrl = getContentImageUrl(
                  supabase,
                  project.image_path
                );

                return (
                  <article
                    key={project.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-xl"
                  >
                    {imageUrl ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                        <img
                          src={imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gradient-to-br from-blue-950 to-blue-800" />
                    )}

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-3">
                        {getStatusBadge(project.status)}
                        {project.start_date && (
                          <span className="text-xs text-slate-500">
                            {formatDate(project.start_date)}
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-blue-950 sm:text-xl">
                        {project.title}
                      </h2>

                      <p className="mt-2 flex-1 text-sm leading-6 text-slate-700 line-clamp-3 sm:mt-3 sm:leading-7">
                        {project.description}
                      </p>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition hover:text-amber-800 sm:mt-5"
                      >
                        View project details
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                        >
                          <path
                            d="M5 12h14m-6-6 6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
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

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-600">
          <p role="status">Loading projects...</p>
        </main>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
