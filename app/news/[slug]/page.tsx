import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublishedNewsBySlug } from "@/lib/cms/queries";
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

async function NewsArticleContent({ params }: PageProps) {
  await connection();
  const { slug } = await params;
  const supabase = await createClient();
  const article = await getPublishedNewsBySlug(supabase, slug);

  if (!article) {
    notFound();
  }

  const coverUrl = getContentImageUrl(supabase, article.cover_path);

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Article Header */}
      <section className="bg-blue-950 px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/news"
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
            Back to news
          </Link>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-blue-100">
            {article.published_at && (
              <time dateTime={article.published_at}>
                {formatDate(article.published_at)}
              </time>
            )}
            {article.author_name && (
              <>
                <span className="text-blue-400">•</span>
                <span>By {article.author_name}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Article Cover Image */}
      {coverUrl && (
        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="aspect-[21/9] overflow-hidden bg-slate-100">
              <img
                src={coverUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="whitespace-pre-wrap leading-8 text-slate-700">
              {article.content}
            </div>
          </div>
        </div>
      </article>

      {/* Back to News */}
      <section className="border-t border-slate-200 bg-slate-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-semibold text-amber-700 transition hover:text-amber-800"
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
            View all news articles
          </Link>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

export default function NewsArticlePage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-600">
          <p role="status">Loading article...</p>
        </main>
      }
    >
      <NewsArticleContent {...props} />
    </Suspense>
  );
}
