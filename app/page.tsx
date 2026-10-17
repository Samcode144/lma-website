import Link from "next/link";
import PublicHeader from "@/app/components/public-header";
import PublicFooter from "@/app/components/public-footer";

const focusAreas = [
  {
    number: "01",
    title: "Community Development",
    description:
      "Explore initiatives designed to support communities, strengthen local participation, and create meaningful opportunities.",
    tag: "COMMUNITY",
  },
  {
    number: "02",
    title: "Market Women",
    description:
      "A dedicated space for future initiatives, resources, and information supporting market women and their communities.",
    tag: "EMPOWERMENT",
  },
  {
    number: "03",
    title: "Programs & Projects",
    description:
      "Discover approved programs, project activities, implementation updates, and opportunities for collaboration.",
    tag: "DEVELOPMENT",
  },
];

const principles = [
  {
    number: "01",
    title: "Accountability",
    description:
      "Clear responsibilities, reliable information, and transparent organizational processes.",
  },
  {
    number: "02",
    title: "Collaboration",
    description:
      "Building constructive relationships with communities, institutions, and partners.",
  },
  {
    number: "03",
    title: "Impact",
    description:
      "Working toward practical outcomes that respond to community needs and development priorities.",
  },
];

function ArrowIcon() {
  return (
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
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <PublicHeader />

      {/* Hero section */}
      <section className="relative isolate bg-blue-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -right-32 -top-36 h-[440px] w-[440px] rounded-full border border-white/10" />
          <div className="absolute -right-16 -top-20 h-[310px] w-[310px] rounded-full border border-white/10" />
          <div className="absolute right-10 top-12 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-1 w-2/5 bg-amber-400" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:gap-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-32">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 sm:mb-7 sm:gap-3 sm:px-4 sm:py-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-100 sm:text-xs sm:tracking-[0.16em]">
                Our organization. Our mission. Our future.
              </span>
            </div>

            <h1 className="max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-7xl">
              Advancing development.
              <span className="mt-1 block text-amber-400 sm:mt-2">
                Strengthening communities.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:mt-7 sm:text-base sm:leading-8 md:text-lg">
              Welcome to the LMA digital platform. Explore organizational
              information, leadership profiles, projects, programs, staff
              verification, and connect with our team.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-amber-400 px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-amber-300 sm:px-6 sm:py-4"
              >
                Discover LMA
                <ArrowIcon />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-6 sm:py-4"
              >
                Explore Our Work
              </Link>
            </div>

            <p className="mt-5 text-xs leading-6 text-blue-200 sm:mt-8">
              An organizational website for the Liberia Marketing Association.
            </p>
          </div>

          {/* Hero information panel */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl border border-amber-400/20 sm:-inset-3" />
            <div className="relative rounded-2xl border border-white/15 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm sm:p-7 lg:p-9">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400 sm:text-xs sm:tracking-[0.2em]">
                    The LMA platform
                  </p>
                  <h2 className="mt-2 text-xl font-bold sm:mt-3 sm:text-2xl lg:text-3xl">
                    One connected organization.
                  </h2>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 sm:h-12 sm:w-12">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 sm:h-7 sm:w-7"
                  >
                    <path
                      d="M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-blue-100 sm:mt-5 sm:leading-7">
                A digital home for LMA&apos;s institutional identity,
                project information, team, and organizational resources.
              </p>

              <div className="mt-6 space-y-0 sm:mt-8">
                {[
                  ["01", "Leadership & team profiles"],
                  ["02", "Projects and community programs"],
                  ["03", "Staff identity verification"],
                  ["04", "Organizational information"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    className="flex items-center gap-3 border-t border-white/10 py-3 sm:gap-4 sm:py-4"
                  >
                    <span className="text-xs font-bold text-amber-400 sm:text-sm">
                      {number}
                    </span>
                    <span className="text-xs font-medium text-white sm:text-sm">
                      {label}
                    </span>
                    <span className="ml-auto text-blue-300">
                      <ArrowIcon />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational principles */}
      <section className="border-y border-slate-200 bg-slate-50 px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
              Our Principles
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-blue-950 sm:mt-4 sm:text-3xl md:text-4xl">
              Guiding values for our work
            </h2>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="border-l-2 border-amber-400 pl-4 sm:pl-6"
              >
                <p className="text-xs font-bold tracking-widest text-amber-700 sm:text-sm">
                  {principle.number}
                </p>
                <h3 className="mt-2 text-lg font-bold text-blue-950 sm:mt-3 sm:text-xl">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:leading-7">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section className="scroll-mt-8 px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                What we do
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-blue-950 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
                Our areas of focus
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-slate-600 sm:leading-7">
              A framework for presenting LMA&apos;s projects,
              activities, and community initiatives.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area) => (
              <article
                key={area.number}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-7 lg:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-950/20 sm:text-3xl">
                    {area.number}
                  </span>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] text-amber-800 sm:px-3 sm:py-1.5">
                    {area.tag}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-blue-950 sm:mt-9 sm:text-2xl">
                  {area.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 sm:mt-4 sm:leading-7">
                  {area.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-3 border-t border-slate-100 pt-4 text-sm font-semibold text-blue-900 group-hover:text-amber-700 sm:mt-8 sm:gap-3 sm:pt-5"
                >
                  Learn more
                  <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-blue-950 px-5 py-12 text-white sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 md:grid-cols-3">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
              >
                <path
                  d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-7.87a4 4 0 0 1 0 7.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold sm:text-2xl">
              Leadership
            </h3>
            <p className="mt-3 text-sm leading-6 text-blue-100 sm:leading-7">
              Meet the people guiding LMA&apos;s mission and coordinating
              organizational priorities.
            </p>
            <Link
              href="/leadership"
              className="mt-5 inline-flex items-center gap-3 font-semibold text-amber-400 hover:text-amber-300"
            >
              View leadership team
              <ArrowIcon />
            </Link>
          </div>

          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
              >
                <path
                  d="M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold sm:text-2xl">
              Projects
            </h3>
            <p className="mt-3 text-sm leading-6 text-blue-100 sm:leading-7">
              Explore LMA&apos;s project portfolio and community development
              initiatives.
            </p>
            <Link
              href="/projects"
              className="mt-5 inline-flex items-center gap-3 font-semibold text-amber-400 hover:text-amber-300"
            >
              View all projects
              <ArrowIcon />
            </Link>
          </div>

          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
              >
                <path
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold sm:text-2xl">
              Staff Verification
            </h3>
            <p className="mt-3 text-sm leading-6 text-blue-100 sm:leading-7">
              Verify official LMA staff credentials using QR code scanning.
            </p>
            <Link
              href="/verification"
              className="mt-5 inline-flex items-center gap-3 font-semibold text-amber-400 hover:text-amber-300"
            >
              Learn about verification
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
