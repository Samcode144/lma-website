import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { PROJECT_STATUS_OPTIONS } from "@/lib/cms/constants";
import SharedCMSForm, { type FormField } from "../../shared-cms-form";
import { createProject } from "../actions";

async function ProjectCreate() {
  await connection();
  const { user } = await requireAdmin({ redirectTo: "/login" });

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
    { name: "start_date", label: "Start Date", type: "date" as const },
    { name: "end_date", label: "End Date", type: "date" as const },
    {
      name: "image",
      label: "Project Image",
      type: "file" as const,
      accept: "image/jpeg,image/png,image/webp",
    },
    { name: "is_published", label: "Publish on public site", type: "checkbox" as const },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/admin/cms/projects"
            className="text-sm font-semibold text-amber-700 hover:text-amber-800"
          >
            ← Back to Projects
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Create New Project
          </h1>
        </div>

        <SharedCMSForm
          title="Project Details"
          fields={fields}
          defaultValues={{ status: "planned" }}
          submitAction={createProject}
          submitLabel="Create Project"
        />

        <p className="mt-8 text-sm text-slate-500">
          Signed in as administrator: {user.email}
        </p>
      </div>
    </main>
  );
}

export default function ProjectCreatePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600">
          <p role="status">Loading project creator...</p>
        </main>
      }
    >
      <ProjectCreate />
    </Suspense>
  );
}
