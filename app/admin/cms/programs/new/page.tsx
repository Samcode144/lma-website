import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import SharedCMSForm from "../../shared-cms-form";
import { createProgram } from "../actions";

async function ProgramCreate() {
  await connection();
  const { user } = await requireAdmin({ redirectTo: "/login" });

  const fields = [
    { name: "title", label: "Program Title", type: "text" as const, required: true },
    { name: "description", label: "Description", type: "textarea" as const, rows: 4, required: true },
    { name: "application_info", label: "Application Information", type: "textarea" as const, rows: 4 },
    { name: "start_date", label: "Start Date", type: "date" as const },
    { name: "end_date", label: "End Date", type: "date" as const },
    { name: "image", label: "Program Image", type: "file" as const, accept: "image/jpeg,image/png,image/webp" },
    { name: "is_published", label: "Publish on public site", type: "checkbox" as const },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/admin/cms/programs" className="text-sm font-semibold text-amber-700 hover:text-amber-800">
            ← Back to Programs
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Create New Program</h1>
        </div>
        <SharedCMSForm title="Program Details" fields={fields} submitAction={createProgram} submitLabel="Create Program" />
        <p className="mt-8 text-sm text-slate-500">Signed in as administrator: {user.email}</p>
      </div>
    </main>
  );
}

export default function ProgramCreatePage() {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600"><p role="status">Loading program creator...</p></main>}><ProgramCreate /></Suspense>;
}
