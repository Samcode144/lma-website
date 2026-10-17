import PublicHeader from "@/app/components/public-header";
import PublicFooter from "@/app/components/public-footer";

export default function VerificationPage() {
  return (
    <main className="min-h-screen bg-white">
      <PublicHeader />

      <section className="px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          {/* Page Header */}
          <div className="mb-10 text-center sm:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
              Digital Identity & Trust
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-blue-950 sm:mt-4 sm:text-4xl md:text-5xl">
              Verify LMA Staff Credentials
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
              Scan a staff ID card to confirm identity and employment status.
            </p>
          </div>

          {/* Verification Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <div className="flex items-center gap-4 bg-blue-950 px-6 py-5 text-white sm:px-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-sm font-black text-blue-950">
                LMA
              </div>
              <div>
                <p className="font-bold">Liberia Marketing Association</p>
                <p className="text-xs uppercase tracking-widest text-amber-300">
                  Staff Verification
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                How to verify an LMA staff ID
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Locate the QR code
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Find the QR code printed on the LMA staff ID card.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Scan with your phone
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Open your phone camera and point it at the QR code. Tap
                      the notification to open the verification page.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      View verified details
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      The verification page will display the employee&apos;s
                      Staff ID, name, position, department, and current
                      employment status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="font-semibold text-amber-900">
                  What you&apos;ll see when verified:
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-amber-800">
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 shrink-0"
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
                    Confirmed staff name and position
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 shrink-0"
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
                    Department or organizational unit
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 shrink-0"
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
                    Current active or inactive status
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm leading-6 text-slate-600">
                  <strong className="font-semibold text-slate-900">
                    Note:
                  </strong>{" "}
                  Verification is public and does not require an account.
                  Contact LMA directly if the verification service is
                  unavailable or you need additional confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Visual */}
          <div className="mt-10 flex justify-center">
            <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-slate-300 bg-white">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 64 64"
                  fill="none"
                  className="h-24 w-24 text-blue-950"
                >
                  <rect
                    x="5"
                    y="5"
                    width="20"
                    height="20"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <rect x="11" y="11" width="8" height="8" fill="currentColor" />
                  <rect
                    x="39"
                    y="5"
                    width="20"
                    height="20"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <rect x="45" y="11" width="8" height="8" fill="currentColor" />
                  <rect
                    x="5"
                    y="39"
                    width="20"
                    height="20"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <rect x="11" y="45" width="8" height="8" fill="currentColor" />
                  <path
                    d="M33 5h3v7h-3zm0 12h7v4h-7zm9 0h5v7h-5zm-9 10h5v5h-5zm9 4h4v7h-4zm8-5h10v4H50zm-17 8h4v7h-4zm9 8h5v5h-5zm8 0h5v9h-5zm-17 9h5v5h-5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-950">
                QR Verification
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Example staff ID QR code
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
