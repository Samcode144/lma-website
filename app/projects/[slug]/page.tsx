import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublishedProjectBySlug } from "@/lib/cms/queries";
import { getContentImageUrl } from "@/lib/cms/images";
import PublicHeader from "@/app/components/public-header";
import PublicFooter from "@/app/components/public-footer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(dateString: string | null): string {
  if (!dateString) return "Not specified";
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
        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
          Active
        </span>
      );
    case "completed":
      return (
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
          Completed
        </span>
      );
    case "planned":
      return (
        <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
          Planned
        </span>
      );
    default:
      return null;
  }
}

async function ProjectDetailContent({ params }: PageProps) {
  await connection();
  const { slug } = await params;
  const supabase = await createClient();
  const project = await getPublishedProjectBySlug(supabase, slug);

  if (!project) {
    notFound();
  }

  const imageUrl = getContentImageUrl(supabase, project.image_path);

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Project Header */}
      <section className="bg-blue-950 px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 transition hover:text-amber-300"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M19 12H5m6 6-6-6 6-6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to projects
          </Link>

          <div className="mt-6 flex items-center gap-3">
            {getStatusBadge(project.status)}
          </div>

          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Project Image */}
      {imageUrl && (
        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="aspect-[21/9] overflow-hidden bg-slate-100">
              <img
                src={imageUrl}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Project Details */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-blue-950">
                Project Description
              </h2>
              <div className="mt-4 whitespace-pre-wrap leading-8 text-slate-700">
                {project.description}
              </div>

              {project.objectives && (
                <>
                  <h2 className="mt-10 text-2xl font-bold text-blue-950">
                    Objectives
                  </h2>
                  <div className="mt-4 whitespace-pre-wrap leading-8 text-slate-700">
                    {project.objectives}
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">
                  Project Timeline
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Start Date
                    </p>
                    <p className="mt-1 text-slate-900">
                      {formatDate(project.start_date)}
                    </p>
                  </div>

                  {project.end_date && (
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        End Date
                      </p>
                      <p className="mt-1 text-slate-900">
                        {formatDate(project.end_date)}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-slate-600">Status</p>
                    <p className="mt-1 capitalize text-slate-900">
                      {project.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

export default function ProjectDetailPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-600">
          <p role="status">Loading project details...</p>
        </main>
      }
    >
      <ProjectDetailContent {...props} />
    </Suspense>
  );
}
