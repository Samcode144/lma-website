import { Suspense } from "react";
import { connection } from "next/server";
import { normalizeStaffIdParam } from "@/lib/employees/staff-id";
import { createClient } from "@/lib/supabase/server";

type PublicEmployee = {
  staff_id: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
  employment_status: "active" | "inactive";
};

type PageProps = {
  params: Promise<{ staffId: string }>;
};

function isPublicEmployee(value: unknown): value is PublicEmployee {
  if (!value || typeof value !== "object") {
    return false;
  }
  const employee = value as Record<string, unknown>;
  return (
    typeof employee.staff_id === "string" &&
    typeof employee.first_name === "string" &&
    typeof employee.last_name === "string" &&
    typeof employee.position === "string" &&
    typeof employee.department === "string" &&
    (employee.employment_status === "active" ||
      employee.employment_status === "inactive")
  );
}

async function VerificationResult({ params }: PageProps) {
  await connection();
  const { staffId: rawStaffId } = await params;
  const staffId = normalizeStaffIdParam(rawStaffId);

  if (!staffId) {
    return <VerificationMessage kind="invalid" />;
  }

  let lookupData: unknown;
  let lookupError: unknown;
  try {
    const supabase = await createClient();
    const result = await supabase.rpc(
      "verify_employee_by_staff_id",
      { p_staff_id: staffId },
    );
    lookupData = result.data;
    lookupError = result.error;
  } catch (error) {
    lookupError = error;
  }

  if (lookupError) {
    console.error("Public staff verification lookup failed:", lookupError);
    return <VerificationMessage kind="unavailable" />;
  }

  if (!Array.isArray(lookupData)) {
    console.error("Public staff verification returned an invalid response.");
    return <VerificationMessage kind="unavailable" />;
  }

  if (lookupData.length === 0) {
    return <VerificationMessage kind="not-found" staffId={staffId} />;
  }

  if (lookupData.length !== 1 || !isPublicEmployee(lookupData[0])) {
    console.error("Public staff verification returned invalid employee data.");
    return <VerificationMessage kind="unavailable" />;
  }

  const employee = lookupData[0];
  if (!employee) {
    console.error("Public staff verification returned an empty result.");
    return <VerificationMessage kind="unavailable" />;
  }

  const isActive = employee.employment_status === "active";
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:py-16">
      <section className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
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
          <p
            role="status"
            className={`rounded-lg px-4 py-3 text-sm font-extrabold tracking-wide ${
              isActive
                ? "bg-emerald-50 text-emerald-800"
                : "bg-amber-50 text-amber-900"
            }`}
          >
            {isActive
              ? "VERIFIED — ACTIVE STAFF"
              : "NOT CURRENTLY ACTIVE"}
          </p>

          <dl className="mt-7 space-y-5">
            <VerificationField label="Staff ID" value={employee.staff_id} />
            <VerificationField
              label="Full name"
              value={`${employee.first_name} ${employee.last_name}`}
            />
            <VerificationField label="Position" value={employee.position} />
            <VerificationField label="Department" value={employee.department} />
          </dl>

          <p className="mt-8 border-t border-slate-200 pt-5 text-xs leading-relaxed text-slate-500">
            This public page confirms only the staff details shown above.
            Contact LMA directly if you need additional confirmation.
          </p>
        </div>
      </section>
    </main>
  );
}

function VerificationField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 break-words text-base font-semibold text-slate-900">
        {value}
      </dd>
    </div>
  );
}

function VerificationMessage({
  kind,
  staffId,
}: {
  kind: "invalid" | "not-found" | "unavailable";
  staffId?: string;
}) {
  const content = {
    invalid: {
      title: "Invalid Staff ID",
      message: "The verification link contains an invalid Staff ID.",
    },
    "not-found": {
      title: "Staff ID Not Found",
      message: `No employee record was found for ${staffId}.`,
    },
    unavailable: {
      title: "Verification Unavailable",
      message:
        "The verification service could not be reached. No staff verification has been made. Please try again later.",
    },
  }[kind];

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
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
          <p role="status" className="font-bold text-slate-900">
            {content.title}
          </p>
          <p className="mt-3 leading-relaxed text-slate-600">
            {content.message}
          </p>
        </div>
      </section>
    </main>
  );
}

export default function VerifyStaffPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Checking staff verification...</p>
        </main>
      }
    >
      <VerificationResult {...props} />
    </Suspense>
  );
}
