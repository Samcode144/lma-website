import { Suspense } from "react";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublishedLeaders } from "@/lib/cms/queries";
import { getContentImageUrl } from "@/lib/cms/images";
import PublicHeader from "@/app/components/public-header";
import PublicFooter from "@/app/components/public-footer";

// Revalidate every 60 seconds (or on-demand via revalidatePath)
export const revalidate = 60;

async function LeadershipContent() {
  await connection();
  const supabase = await createClient();
  const leaders = await getPublishedLeaders(supabase);

  console.log("Leadership page render - leaders count:", leaders.length);
  if (leaders.length > 0) {
    console.log("First leader:", JSON.stringify(leaders[0], null, 2));
  }

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Page Header */}
      <section className="bg-blue-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Leadership & Governance
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Meet the people guiding LMA&apos;s mission.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            Our leadership team brings together diverse expertise and experience
            to advance the organization&apos;s goals, support community development,
            and ensure effective project delivery.
          </p>
        </div>
      </section>

      {/* Leadership Directory */}
      <section className="px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {leaders.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center sm:p-12">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Leadership profiles coming soon
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:mt-3 sm:text-base">
                Official leadership profiles will be published once team details
                have been confirmed by the organization.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {leaders.map((leader) => {
                const photoUrl = getContentImageUrl(
                  supabase,
                  leader.public_photo_path
                );

                return (
                  <article
                    key={leader.staff_id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-xl"
                  >
                    {photoUrl ? (
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <img
                          src={photoUrl}
                          alt={`${leader.first_name} ${leader.last_name}`}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-950 to-blue-800">
                        <div className="flex h-full items-center justify-center">
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white backdrop-blur-sm sm:h-24 sm:w-24 sm:text-3xl">
                            {leader.first_name.charAt(0)}
                            {leader.last_name.charAt(0)}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-5 sm:p-6">
                      <h2 className="text-lg font-bold text-blue-950 sm:text-xl">
                        {leader.first_name} {leader.last_name}
                      </h2>
                      <p className="mt-1.5 text-sm font-semibold text-amber-700 sm:mt-2 sm:text-base">
                        {leader.position}
                      </p>
                      <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                        {leader.department}
                      </p>

                      {leader.biography && (
                        <p className="mt-3 text-sm leading-6 text-slate-700 sm:mt-4 sm:leading-7">
                          {leader.biography}
                        </p>
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

export default function LeadershipPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-600">
          <p role="status">Loading leadership directory...</p>
        </main>
      }
    >
      <LeadershipContent />
    </Suspense>
  );
}
