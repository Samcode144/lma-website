import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import QRCode from "qrcode";
import { requireAdmin } from "@/lib/auth/admin";
import { createEmployeePhotoSignedUrl } from "@/lib/employees/photos";
import { getSiteOrigin } from "@/lib/site-origin";
import type { Employee } from "@/lib/employees/types";
import PrintButton from "./print-button";

type IdCardEmployee = Pick<
  Employee,
  | "staff_id"
  | "first_name"
  | "last_name"
  | "position"
  | "department"
  | "photo_path"
>;

type PageProps = {
  params: Promise<{ id: string }>;
};

async function EmployeeIdCard({ params }: PageProps) {
  await connection();
  const { supabase } = await requireAdmin();
  const { id } = await params;
  const { data, error } = await supabase
    .from("employees")
    .select("staff_id, first_name, last_name, position, department, photo_path")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const employee = data as IdCardEmployee;
  const [photoUrl, origin] = await Promise.all([
    createEmployeePhotoSignedUrl(supabase, employee.photo_path),
    getSiteOrigin(),
  ]);
  const verificationUrl = new URL(
    `/verify/${encodeURIComponent(employee.staff_id)}`,
    origin,
  ).toString();
  const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
    errorCorrectionLevel: "H",
    margin: 1,
    width: 320,
    color: { dark: "#0b1f3a", light: "#ffffff" },
  });
  const fullName = `${employee.first_name} ${employee.last_name}`;

  return (
    <main className="id-card-page min-h-screen bg-slate-100 px-4 py-10">
      <div className="no-print mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-between gap-4">
        <Link
          href="/employees/id-cards"
          className="font-semibold text-amber-800 hover:text-amber-900"
        >
          ← Back to Staff ID Cards
        </Link>
        <PrintButton />
      </div>

      <article
        className="lma-id-card mx-auto overflow-hidden rounded-[0.16in] border border-slate-300 bg-white text-slate-950 shadow-xl"
        aria-label={`LMA staff ID card for ${fullName}`}
      >
        <header className="flex h-[0.48in] items-center justify-between bg-[#0b1f3a] px-[0.17in] text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-[0.31in] w-[0.31in] items-center justify-center rounded-md bg-amber-400 text-[8pt] font-black text-[#0b1f3a]">
              LMA
            </div>
            <div>
              <p className="text-[8pt] font-bold leading-tight">
                Liberia Marketing Association
              </p>
              <p className="text-[5pt] uppercase tracking-[0.13em] text-amber-300">
                Official Staff Identification
              </p>
            </div>
          </div>
          <span className="text-[5pt] font-semibold uppercase tracking-widest text-amber-300">
            STAFF
          </span>
        </header>

        <div className="flex h-[1.40in] items-center gap-[0.15in] px-[0.17in] py-[0.1in]">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt={`Photo of ${fullName}`}
              className="h-[0.92in] w-[0.72in] shrink-0 rounded-md border border-slate-200 object-cover"
            />
          ) : (
            <div
              aria-label="No employee photo available"
              className="flex h-[0.92in] w-[0.72in] shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-100 text-[8pt] font-bold text-slate-500"
            >
              {employee.first_name.charAt(0)}
              {employee.last_name.charAt(0)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="text-[5pt] font-bold uppercase tracking-[0.13em] text-amber-700">
              {employee.position}
            </p>
            <h1 className="mt-1 break-words text-[12pt] font-extrabold leading-tight text-[#0b1f3a]">
              {fullName}
            </h1>
            <p className="mt-1 break-words text-[7pt] text-slate-600">
              {employee.department}
            </p>
            <p className="mt-2 text-[5pt] font-semibold uppercase tracking-wide text-slate-500">
              Staff ID
            </p>
            <p className="text-[9pt] font-bold tracking-wide text-[#0b1f3a]">
              {employee.staff_id}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt={`QR code to verify Staff ID ${employee.staff_id}`}
              className="h-[0.68in] w-[0.68in]"
            />
            <span className="mt-1 text-center text-[4.5pt] font-semibold uppercase tracking-wide text-slate-600">
              Scan to verify
            </span>
          </div>
        </div>

        <footer className="flex h-[0.245in] items-center justify-between bg-amber-400 px-[0.17in] text-[5pt] font-bold uppercase tracking-[0.08em] text-[#0b1f3a]">
          <span>LMA · Liberia</span>
          <span>Property of LMA</span>
        </footer>
      </article>
      <p className="no-print mx-auto mt-5 max-w-3xl text-center text-xs text-slate-500">
        Print at actual size or save as PDF. The QR code contains only the
        public verification link.
      </p>
    </main>
  );
}

export default function EmployeeIdCardPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 text-slate-600">
          <p role="status">Preparing staff ID card...</p>
        </main>
      }
    >
      <EmployeeIdCard {...props} />
    </Suspense>
  );
}
