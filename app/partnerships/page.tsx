import { Suspense } from "react";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPartners } from "@/lib/cms/queries";
import { getContentImageUrl } from "@/lib/cms/images";
import PublicHeader from "@/app/components/public-header";
import PublicFooter from "@/app/components/public-footer";

async function PartnershipsContent() {
  await connection();
  const supabase = await createClient();
  const partners = await getPublishedPartners(supabase);

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Page Header */}
      <section className="bg-blue-950 px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Partnerships & Collaboration
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Working together for greater impact.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            LMA collaborates with development partners, community organizations,
            and institutions to advance shared goals and maximize collective
            impact.
          </p>
        </div>
      </section>

      {/* Partners List */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          {partners.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Partnership information coming soon
              </h2>
              <p className="mt-3 text-slate-600">
                Official partnership details will be published as collaborations
                are formalized and approved.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => {
                const logoUrl = getContentImageUrl(supabase, partner.logo_path);

                return (
                  <article
                    key={partner.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-xl"
                  >
                    {logoUrl ? (
                      <div className="flex aspect-[16/9] items-center justify-center border-b border-slate-100 bg-white p-8">
                        <img
                          src={logoUrl}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/9] items-center justify-center border-b border-slate-100 bg-slate-50">
                        <div className="text-4xl font-bold text-slate-300">
                          {partner.name.charAt(0)}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-xl font-bold text-blue-950">
                        {partner.name}
                      </h2>

                      <p className="mt-3 flex-1 leading-7 text-slate-700">
                        {partner.description}
                      </p>

                      {partner.website_url && (
                        <a
                          href={partner.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-2 font-semibold text-amber-700 transition hover:text-amber-800"
                        >
                          Visit website
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-5 w-5"
                          >
                            <path
                              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      )}
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

export default function PartnershipsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-600">
          <p role="status">Loading partnerships...</p>
        </main>
      }
    >
      <PartnershipsContent />
    </Suspense>
  );
}
