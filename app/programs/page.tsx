import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPrograms } from "@/lib/cms/queries";
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

async function ProgramsContent() {
  await connection();
  const supabase = await createClient();
  const programs = await getPublishedPrograms(supabase);

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Page Header */}
      <section className="bg-blue-950 px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Programs & Opportunities
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Creating opportunities for meaningful progress.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            LMA programs provide structured pathways for community participation,
            capacity building, and development. Learn about current programs and
            how to get involved.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          {programs.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Program information coming soon
              </h2>
              <p className="mt-3 text-slate-600">
                Official program details will be published as initiatives are
                approved and enrollment opens.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {programs.map((program) => {
                const imageUrl = getContentImageUrl(
                  supabase,
                  program.image_path
                );

                return (
                  <article
                    key={program.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-xl"
                  >
                    {imageUrl ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                        <img
                          src={imageUrl}
                          alt={program.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gradient-to-br from-amber-600 to-amber-800" />
                    )}

                    <div className="flex flex-1 flex-col p-8">
                      {program.start_date && (
                        <p className="text-sm font-semibold text-amber-700">
                          {formatDate(program.start_date)}
                          {program.end_date &&
                            ` – ${formatDate(program.end_date)}`}
                        </p>
                      )}

                      <h2 className="mt-3 text-2xl font-bold text-blue-950">
                        {program.title}
                      </h2>

                      <p className="mt-4 flex-1 leading-7 text-slate-700 line-clamp-3">
                        {program.description}
                      </p>

                      <Link
                        href={`/programs/${program.slug}`}
                        className="mt-6 inline-flex items-center gap-2 font-semibold text-amber-700 transition hover:text-amber-800"
                      >
                        View program details
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

export default function ProgramsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-600">
          <p role="status">Loading programs...</p>
        </main>
      }
    >
      <ProgramsContent />
    </Suspense>
  );
}
