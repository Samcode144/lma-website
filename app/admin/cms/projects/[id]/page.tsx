import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { PROJECT_STATUS_OPTIONS } from "@/lib/cms/constants";
import SharedCMSForm, { type FormField } from "../../shared-cms-form";
import { updateProject, deleteProject } from "../actions";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function ProjectEdit({ params }: PageProps) {
  await connection();
  const { id } = await params;
  const { supabase, user } = await requireAdmin({ redirectTo: "/login" });

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !project) {
    notFound();
  }

  const fields: FormField[] = [
    { name: "title", label: "Project Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", rows: 4, required: true },
    { name: "objectives", label: "Objectives", type: "textarea", rows: 4 },
    {
      name: "status",
      label: "Project Status",
      type: "select",
      options: PROJECT_STATUS_OPTIONS.map(o => ({ value: o.value, label: o.label })),
      required: true,
    },
    { name: "start_date", label: "Start Date", type: "date" },
    { name: "end_date", label: "End Date", type: "date" },
    { name: "image", label: "Project Image", type: "file", accept: "image/jpeg,image/png,image/webp" },
    { name: "is_published", label: "Publish on public site", type: "checkbox" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/admin/cms/projects" className="text-sm font-semibold text-amber-700 hover:text-amber-800">← Back to Projects</Link>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Edit Project</h1>
        </div>
        <SharedCMSForm title="Project Details" fields={fields} defaultValues={project} submitAction={(formData) => updateProject(id, formData)} submitLabel="Update Project" isEditing={true} existingImagePath={project.image_path} />
        <div className="mt-6">
          <form action={async () => { "use server"; await deleteProject(id); }}>
            <button type="submit" onClick={(e) => { if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) e.preventDefault(); }} className="rounded-lg border border-red-300 px-6 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50">Delete Project</button>
          </form>
        </div>
        <p className="mt-8 text-sm text-slate-500">Signed in as administrator: {user.email}</p>
      </div>
    </main>
  );
}

export default function ProjectEditPage(props: PageProps) {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600"><p role="status">Loading project editor...</p></main>}><ProjectEdit {...props} /></Suspense>;
}
