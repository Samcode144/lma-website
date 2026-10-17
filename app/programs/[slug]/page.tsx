import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublishedProgramBySlug } from "@/lib/cms/queries";
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

async function ProgramDetailContent({ params }: PageProps) {
  await connection();
  const { slug } = await params;
  const supabase = await createClient();
  const program = await getPublishedProgramBySlug(supabase, slug);

  if (!program) {
    notFound();
  }

  const imageUrl = getContentImageUrl(supabase, program.image_path);

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Program Header */}
      <section className="bg-blue-950 px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/programs"
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
            Back to programs
          </Link>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {program.title}
          </h1>
        </div>
      </section>

      {/* Program Image */}
      {imageUrl && (
        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="aspect-[21/9] overflow-hidden bg-slate-100">
              <img
                src={imageUrl}
                alt={program.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Program Details */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-blue-950">
                About This Program
              </h2>
              <div className="mt-4 whitespace-pre-wrap leading-8 text-slate-700">
                {program.description}
              </div>

              {program.application_info && (
                <>
                  <h2 className="mt-10 text-2xl font-bold text-blue-950">
                    How to Apply
                  </h2>
                  <div className="mt-4 whitespace-pre-wrap leading-8 text-slate-700">
                    {program.application_info}
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">
                  Program Timeline
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Start Date
                    </p>
                    <p className="mt-1 text-slate-900">
                      {formatDate(program.start_date)}
                    </p>
                  </div>

                  {program.end_date && (
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        End Date
                      </p>
                      <p className="mt-1 text-slate-900">
                        {formatDate(program.end_date)}
                      </p>
                    </div>
                  )}
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

export default function ProgramDetailPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-600">
          <p role="status">Loading program details...</p>
        </main>
      }
    >
      <ProgramDetailContent {...props} />
    </Suspense>
  );
}
