import Link from "next/link";

function BrandMark() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-sm font-black tracking-wider text-amber-400 ring-1 ring-amber-400/40">
      LMA
    </div>
  );
}

export default function PublicFooter() {
  return (
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
              <Link href="/departments" className="hover:text-amber-400">Departments</Link>
              <Link href="/projects" className="hover:text-amber-400">Projects</Link>
              <Link href="/programs" className="hover:text-amber-400">Programs</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Organization</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/partnerships" className="hover:text-amber-400">Partnerships</Link>
              <Link href="/news" className="hover:text-amber-400">News & Updates</Link>
              <Link href="/verification" className="hover:text-amber-400">Staff Verification</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} LMA. All rights reserved.</p>
          <p>
            Development version — not yet the official public website.
          </p>
        </div>
      </div>
    </footer>
  );
}
