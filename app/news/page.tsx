import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublishedNews } from "@/lib/cms/queries";
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

async function NewsContent() {
  await connection();
  const supabase = await createClient();
  const articles = await getPublishedNews(supabase);

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Page Header */}
      <section className="bg-blue-950 px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            News & Updates
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Stay informed about LMA.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Official announcements, project milestones, program updates, and
            organizational news from the Liberia Marketing Association.
          </p>
        </div>
      </section>

      {/* News List */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          {articles.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                No news articles published yet
              </h2>
              <p className="mt-3 text-slate-600">
                Official announcements and news will appear here once published
                by LMA administrators.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {articles.map((article, index) => {
                const coverUrl = getContentImageUrl(supabase, article.cover_path);
                const isFeatured = index === 0;

                if (isFeatured) {
                  return (
                    <article
                      key={article.id}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-xl"
                    >
                      <div className="grid gap-8 md:grid-cols-2">
                        {coverUrl ? (
                          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 md:aspect-auto">
                            <img
                              src={coverUrl}
                              alt={article.title}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[16/9] bg-gradient-to-br from-blue-950 to-blue-800 md:aspect-auto" />
                        )}

                        <div className="flex flex-col justify-center p-8 md:p-12">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-800">
                              Featured
                            </span>
                            {article.published_at && (
                              <span className="text-slate-500">
                                {formatDate(article.published_at)}
                              </span>
                            )}
                          </div>

                          <h2 className="mt-4 text-3xl font-bold text-blue-950">
                            {article.title}
                          </h2>

                          {article.author_name && (
                            <p className="mt-2 text-sm text-slate-600">
                              By {article.author_name}
                            </p>
                          )}

                          <p className="mt-4 leading-7 text-slate-700 line-clamp-3">
                            {article.content}
                          </p>

                          <Link
                            href={`/news/${article.slug}`}
                            className="mt-6 inline-flex items-center gap-2 font-semibold text-amber-700 transition hover:text-amber-800"
                          >
                            Read full article
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
                      </div>
                    </article>
                  );
                }

                return (
                  <article
                    key={article.id}
                    className="group flex gap-6 overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-lg"
                  >
                    {coverUrl && (
                      <div className="relative hidden w-64 shrink-0 overflow-hidden bg-slate-100 sm:block">
                        <img
                          src={coverUrl}
                          alt={article.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col justify-center p-6">
                      {article.published_at && (
                        <p className="text-sm font-semibold text-amber-700">
                          {formatDate(article.published_at)}
                        </p>
                      )}

                      <h2 className="mt-2 text-xl font-bold text-blue-950">
                        {article.title}
                      </h2>

                      {article.author_name && (
                        <p className="mt-1 text-sm text-slate-600">
                          By {article.author_name}
                        </p>
                      )}

                      <p className="mt-3 leading-7 text-slate-700 line-clamp-2">
                        {article.content}
                      </p>

                      <Link
                        href={`/news/${article.slug}`}
                        className="mt-4 inline-flex items-center gap-2 font-semibold text-amber-700 transition hover:text-amber-800"
                      >
                        Read more
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

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-600">
          <p role="status">Loading news articles...</p>
        </main>
      }
    >
      <NewsContent />
    </Suspense>
  );
}
