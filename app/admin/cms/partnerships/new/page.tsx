import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import SharedCMSForm from "../../shared-cms-form";
import { createPartnership } from "../actions";

async function PartnershipCreate() {
  await connection();
  const { user } = await requireAdmin({ redirectTo: "/login" });

  const fields = [
    { name: "name", label: "Partner Name", type: "text" as const, required: true },
    { name: "description", label: "Description", type: "textarea" as const, rows: 4, required: true },
    { name: "website_url", label: "Website URL", type: "text" as const, placeholder: "https://example.com" },
    { name: "sort_order", label: "Sort Order", type: "text" as const, placeholder: "0" },
    { name: "image", label: "Partner Logo", type: "file" as const, accept: "image/jpeg,image/png,image/webp" },
    { name: "is_published", label: "Publish on public site", type: "checkbox" as const },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/admin/cms/partnerships" className="text-sm font-semibold text-amber-700 hover:text-amber-800">
            ← Back to partnerships
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Create New Partnership</h1>
        </div>
        <SharedCMSForm title="Partnership Details" fields={fields} submitAction={createPartnership} submitLabel="Create Partnership" />
        <p className="mt-8 text-sm text-slate-500">Signed in as administrator: {user.email}</p>
      </div>
    </main>
  );
}

export default function PartnershipCreatePage() {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600"><p role="status">Loading Partnership creator...</p></main>}><PartnershipCreate /></Suspense>;
}
