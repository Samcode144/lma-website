import Link from "next/link";

export default function VerificationGuidePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <header className="flex items-center gap-4 bg-[#0b1f3a] px-6 py-5 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 font-black text-[#0b1f3a]">
            LMA
          </div>
          <div>
            <p className="font-bold">Liberia Marketing Association</p>
            <p className="text-xs uppercase tracking-widest text-amber-300">
              Staff verification
            </p>
          </div>
        </header>
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Verify an LMA staff ID
          </h1>
          <p className="mt-3 leading-relaxed text-slate-600">
            Scan the QR code on an LMA staff ID card with your phone camera.
            The verification page will show the employee&apos;s Staff ID, name,
            position, department, and current employment status.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Verification is public and does not require an account. Contact LMA
            directly if the verification service is unavailable or you need
            additional confirmation.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block font-semibold text-amber-800 hover:text-amber-900"
          >
            Return to LMA homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
