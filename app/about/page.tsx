import Link from "next/link";
import PublicHeader from "@/app/components/public-header";
import PublicFooter from "@/app/components/public-footer";

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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Page Header */}
      <section className="bg-blue-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            About the organization
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            A clear vision for a connected future.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            Learn about LMA&apos;s mission, organizational principles, and commitment to
            community development and transparent operations.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="max-w-xl text-2xl font-bold leading-tight tracking-tight text-blue-950 sm:text-3xl md:text-4xl lg:text-5xl">
              Building a professional digital presence
            </h2>
          </div>

          <div>
            <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 md:text-lg">
              This platform is being developed to give LMA a professional
              digital presence and a central place to share approved
              organizational information with stakeholders, partners,
              community members, and the public.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
              The final website will reflect the organization&apos;s
              officially approved history, mission, objectives, leadership,
              and work. These details will be confirmed before public launch.
            </p>

            <Link
              href="/departments"
              className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-blue-900 hover:text-amber-700 sm:mt-7"
            >
              Explore our organizational structure
              <ArrowIcon />
            </Link>
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

      {/* Mission Statement */}
      <section className="px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
              Our Mission
            </p>
            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-blue-950 sm:text-3xl md:text-4xl lg:text-5xl">
              Advancing development. Strengthening communities.
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Welcome to the LMA digital platform, a developing space for
              organizational information, projects, programs, partnerships,
              and the people working to support our mission.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-amber-400 px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-amber-300 sm:px-6 sm:py-4"
              >
                View Our Projects
                <ArrowIcon />
              </Link>
              <Link
                href="/leadership"
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:px-6 sm:py-4"
              >
                Meet Our Team
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
