import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import SharedCMSForm from "../../shared-cms-form";
import { updateProgram, deleteProgram } from "../actions";

type PageProps = { params: Promise<{ id: string }>; };

async function ProgramEdit({ params }: PageProps) {
  await connection();
  const { id } = await params;
  const { supabase, user } = await requireAdmin({ redirectTo: "/login" });

  const { data: program, error } = await supabase.from("programs").select("*").eq("id", id).maybeSingle();
  if (error || !program) notFound();

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
          <Link href="/admin/cms/programs" className="text-sm font-semibold text-amber-700 hover:text-amber-800">← Back to Programs</Link>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Edit Program</h1>
        </div>
        <SharedCMSForm title="Program Details" fields={fields} defaultValues={program} submitAction={(formData) => updateProgram(id, formData)} submitLabel="Update Program" isEditing={true} existingImagePath={program.image_path} />
        <div className="mt-6">
          <form action={async () => { "use server"; await deleteProgram(id); }}>
            <button type="submit" onClick={(e) => { if (!confirm("Are you sure you want to delete this program?")) e.preventDefault(); }} className="rounded-lg border border-red-300 px-6 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50">Delete Program</button>
          </form>
        </div>
        <p className="mt-8 text-sm text-slate-500">Signed in as administrator: {user.email}</p>
      </div>
    </main>
  );
}

export default function ProgramEditPage(props: PageProps) {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600"><p role="status">Loading program editor...</p></main>}><ProgramEdit {...props} /></Suspense>;
}
