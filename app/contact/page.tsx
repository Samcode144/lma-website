import Link from "next/link";
import PublicHeader from "@/app/components/public-header";
import PublicFooter from "@/app/components/public-footer";

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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      {/* Page Header */}
      <section className="bg-blue-950 px-5 py-12 text-white sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Get in Touch
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Contact LMA
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            Connect with the Liberia Marketing Association for partnership
            enquiries, program information, or organizational matters.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold text-blue-950 sm:text-3xl">
                Organizational enquiries
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                For partnership enquiries, program information, or
                organizational matters, please use LMA&apos;s approved
                contact channels.
              </p>

              <div className="mt-8 space-y-6">
                {/* Email */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-amber-400">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6"
                      >
                        <path
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Official Email
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        To be confirmed
                      </p>
                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Official email address will be published once
                        organizational contact details are finalized.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-amber-400">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6"
                      >
                        <path
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Telephone
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        To be confirmed
                      </p>
                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Official telephone number will be published once
                        organizational contact details are finalized.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Office Location */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-amber-400">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6"
                      >
                        <path
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Office Location
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        To be confirmed
                      </p>
                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Official office address will be published once
                        organizational contact details are finalized.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-950 to-blue-900 p-8 text-white sm:p-10">
                <h3 className="text-2xl font-bold">
                  Working with LMA
                </h3>
                <p className="mt-4 text-sm leading-7 text-blue-100 sm:leading-8">
                  The Liberia Marketing Association is committed to
                  transparent communication and professional partnerships.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm text-blue-100">
                      Partnership and collaboration opportunities
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm text-blue-100">
                      Program information and participation
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm text-blue-100">
                      General organizational enquiries
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <h4 className="font-semibold text-white">
                    Staff Verification
                  </h4>
                  <p className="mt-2 text-sm text-blue-100">
                    To verify LMA staff credentials, use our QR code
                    verification system.
                  </p>
                  <Link
                    href="/verification"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
                  >
                    Learn about verification
                    <ArrowIcon />
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="font-bold text-slate-900">
                  Explore LMA
                </h3>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-900"
                  >
                    <ArrowIcon />
                    About LMA
                  </Link>
                  <Link
                    href="/leadership"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-900"
                  >
                    <ArrowIcon />
                    Leadership Team
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-900"
                  >
                    <ArrowIcon />
                    Projects & Programs
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-900"
                  >
                    <ArrowIcon />
                    Return to Homepage
                  </Link>
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
