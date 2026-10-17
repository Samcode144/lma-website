
import Link from "next/link";

const navigation = [
  { label: "About LMA", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Departments", href: "#departments" },
  { label: "Projects", href: "#projects" },
  { label: "Programs", href: "#programs" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "News", href: "#news" },
];

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

const departments = [
  {
    title: "Executive Leadership",
    description:
      "Organizational leadership, strategic direction, and institutional oversight.",
    code: "EL",
  },
  {
    title: "Project Management",
    description:
      "Project coordination, implementation, monitoring, and reporting.",
    code: "PM",
  },
  {
    title: "Community Programs",
    description:
      "Community engagement, program coordination, and development initiatives.",
    code: "CP",
  },
  {
    title: "Administration",
    description:
      "Administrative coordination, organizational records, and operational support.",
    code: "AD",
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

function BrandMark() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-sm font-black tracking-wider text-amber-400 ring-1 ring-amber-400/40">
      LMA
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Development notice */}
      <div className="bg-blue-950 px-4 py-2.5 text-center text-xs font-medium tracking-wide text-blue-100 sm:text-sm">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400" />
        LMA DIGITAL PLATFORM
        <span className="mx-2 text-blue-400">|</span>
        WEBSITE PROTOTYPE — UNDER DEVELOPMENT
      </div>

      {/* Header and navigation */}
      <header className="relative z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link
            href="/"
            aria-label="LMA homepage"
            className="flex items-center gap-3"
          >
            <BrandMark />
            <div>
              <p className="text-xl font-extrabold tracking-tight text-blue-950">
                LMA
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                Project Management Unit
              </p>
            </div>
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Contact LMA
            <ArrowIcon />
          </Link>

          <nav
            aria-label="Main navigation"
            className="flex w-full flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-100 pt-4 text-sm font-medium text-slate-600 lg:w-auto lg:border-0 lg:pt-0"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition hover:text-blue-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/verification"
              className="font-semibold text-amber-700 transition hover:text-amber-900"
            >
              Staff Verification
            </Link>
          </nav>
        </div>
      </header>

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
              Welcome to the LMA digital platform, a developing space for
              organizational information, projects, programs, partnerships,
              and the people working to support our mission.
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
              An organizational website prototype for review and development.
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
                A planned digital home for LMA&apos;s institutional identity,
                project information, team, and organizational resources.
              </p>

              <div className="mt-6 space-y-0 sm:mt-8">
                {[
                  ["01", "Organizational information"],
                  ["02", "Projects and community programs"],
                  ["03", "Leadership and partnerships"],
                  ["04", "Staff identity and verification"],
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

      {/* Introduction */}
      <section id="about" className="scroll-mt-8 px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
              About the organization
            </p>
            <h2 className="mt-4 max-w-xl text-2xl font-bold leading-tight tracking-tight text-blue-950 sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
              A clear vision for a connected future.
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
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.number} className="border-l-2 border-amber-400 pl-4 sm:pl-6">
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
      </section>

      {/* Focus areas */}
      <section id="projects" className="scroll-mt-8 px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
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
              A framework for presenting LMA&apos;s approved projects,
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
                  href="#contact"
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

      {/* Departments */}
      <section
        id="departments"
        className="scroll-mt-8 bg-slate-50 px-5 py-12 sm:px-8 sm:py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
              Our structure
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-blue-950 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
              Departments and teams
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
              This section provides a framework for LMA&apos;s organizational
              units. The final department names and responsibilities should
              be confirmed by the organization.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 md:grid-cols-2">
            {departments.map((department) => (
              <article
                key={department.code}
                className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:gap-5 sm:p-6 lg:p-7"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-xs font-bold text-amber-400 sm:h-12 sm:w-12 sm:text-sm">
                  {department.code}
                </div>
                <div>
                  <h3 className="text-base font-bold text-blue-950 sm:text-lg">
                    {department.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600 sm:mt-2 sm:leading-7">
                    {department.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section
        id="leadership"
        className="scroll-mt-8 px-5 py-12 sm:px-8 sm:py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
              Leadership & governance
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-blue-950 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
              Guided by people. Driven by purpose.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
              Meet the people responsible for guiding LMA&apos;s work,
              coordinating projects, and supporting organizational
              priorities.
            </p>
          </div>

          <div className="rounded-2xl bg-blue-950 p-6 text-white sm:p-8 lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-amber-400 sm:h-14 sm:w-14">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7 sm:h-8 sm:w-8"
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
            <h3 className="mt-5 text-xl font-bold sm:mt-6 sm:text-2xl">
              Leadership directory
            </h3>
            <p className="mt-3 text-sm leading-6 text-blue-100 sm:mt-4 sm:leading-7">
              Official profiles, approved photographs, positions, and
              biographies will be published after the team details have
              been confirmed.
            </p>
            <div className="mt-5 border-t border-white/15 pt-4 text-xs text-blue-200 sm:mt-7 sm:pt-5 sm:text-sm">
              Profiles are not yet published in this prototype.
            </div>
          </div>
        </div>
      </section>

      {/* Programs and partnerships */}
      <section
        id="programs"
        className="scroll-mt-8 bg-blue-950 px-5 py-20 text-white sm:px-8 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
              Programs
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Opportunities for meaningful progress.
            </h2>
            <p className="mt-5 leading-8 text-blue-100">
              This section will feature approved programs, eligibility
              information, participation opportunities, and relevant
              announcements.
            </p>
            <Link
              href="#contact"
              className="mt-7 inline-flex items-center gap-3 font-bold text-amber-400 hover:text-amber-300"
            >
              Program information
              <ArrowIcon />
            </Link>
          </div>

          <div id="partnerships" className="scroll-mt-8 border-t border-white/15 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
              Partnerships
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Working together.
            </h2>
            <p className="mt-5 leading-8 text-blue-100">
              A dedicated space for institutional partners, collaborators,
              development stakeholders, and future partnership opportunities.
            </p>
            <Link
              href="#contact"
              className="mt-7 inline-flex items-center gap-3 font-bold text-amber-400 hover:text-amber-300"
            >
              Connect with LMA
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section
        id="news"
        className="scroll-mt-8 px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-slate-200 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
              News & updates
            </p>
            <h2 className="mt-4 text-3xl font-bold text-blue-950 sm:text-4xl">
              Stay informed about LMA.
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Official announcements, project milestones, program updates,
              and organizational news will appear here once publishing
              functionality is implemented.
            </p>
          </div>
          <div className="shrink-0 rounded-xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
            News publishing — planned feature
          </div>
        </div>
      </section>

      {/* Staff verification concept */}
      <section
        id="verification"
        className="scroll-mt-8 border-y border-amber-200 bg-amber-50 px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-800">
              Digital identity & trust
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-blue-950 sm:text-5xl">
              Verify official LMA staff credentials.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-700">
              The planned staff verification service will allow authorized
              staff ID holders to be checked against an official record.
              The final system will display approved identity details and
              current appointment status.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li>✓ Confirmed staff name and position</li>
              <li>✓ Department or organizational unit</li>
              <li>✓ Current active or inactive status</li>
            </ul>
            <p className="mt-6 text-xs leading-6 text-slate-600">
              Verification is a planned feature. This prototype does not
              yet verify staff records or QR codes.
            </p>
          </div>

          <div className="flex h-44 w-44 flex-col items-center justify-center rounded-2xl border border-amber-200 bg-white p-5 text-center shadow-sm">
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              fill="none"
              className="h-16 w-16 text-blue-950"
            >
              <rect x="5" y="5" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="11" width="8" height="8" fill="currentColor" />
              <rect x="39" y="5" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="4" />
              <rect x="45" y="11" width="8" height="8" fill="currentColor" />
              <rect x="5" y="39" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="45" width="8" height="8" fill="currentColor" />
              <path d="M33 5h3v7h-3zm0 12h7v4h-7zm9 0h5v7h-5zm-9 10h5v5h-5zm9 4h4v7h-4zm8-5h10v4H50zm-17 8h4v7h-4zm9 8h5v5h-5zm8 0h5v9h-5zm-17 9h5v5h-5z" fill="currentColor" />
            </svg>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-blue-950">
              QR verification
            </p>
            <p className="mt-1 text-[10px] text-slate-500">
              Design concept only
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-8 px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-blue-950 sm:text-5xl">
              Let&apos;s connect.
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Official contact information will be added once LMA confirms
              its organizational email address, telephone number, and
              office location.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-7 sm:p-9">
            <h3 className="text-xl font-bold text-blue-950">
              Organizational enquiries
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              For partnership enquiries, program information, or
              organizational matters, please use LMA&apos;s approved
              contact channels once they have been established.
            </p>
            <div className="mt-6 border-t border-slate-200 pt-5">
              <p className="text-sm font-semibold text-slate-800">
                Official email
              </p>
              <p className="mt-1 text-sm text-slate-500">
                To be confirmed
              </p>
            </div>
            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-800">
                Office location
              </p>
              <p className="mt-1 text-sm text-slate-500">
                To be confirmed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-12 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3">
                <BrandMark />
                <div>
                  <p className="text-lg font-bold">LMA</p>
                  <p className="text-xs text-slate-400">
                    Project Management Unit
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                A developing digital platform for organizational
                information, projects, programs, partnerships, and
                staff verification.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">Explore</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
                <Link href="/about" className="hover:text-amber-400">About LMA</Link>
                <Link href="/leadership" className="hover:text-amber-400">Leadership</Link>
                <Link href="/projects" className="hover:text-amber-400">Projects</Link>
                <Link href="/programs" className="hover:text-amber-400">Programs</Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white">Organization</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
                <Link href="/partnerships" className="hover:text-amber-400">Partnerships</Link>
                <Link href="/news" className="hover:text-amber-400">News & Updates</Link>
                <Link href="#contact" className="hover:text-amber-400">Contact</Link>
                <Link href="/verification" className="hover:text-amber-400">Staff Verification</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2026 LMA. Website prototype.</p>
            <p>
              Development version — not yet the official public website.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
