import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import SharedCMSForm from "../../shared-cms-form";
import { createNewsArticle } from "../actions";

async function NewsCreate() {
  await connection();
  const { user } = await requireAdmin({ redirectTo: "/login" });

  const fields = [
    { name: "title", label: "Article Title", type: "text" as const, required: true },
    { name: "content", label: "Article Content", type: "textarea" as const, rows: 10, required: true },
    { name: "author_name", label: "Author Name", type: "text" as const, placeholder: "Optional" },
    { name: "image", label: "Cover Image", type: "file" as const, accept: "image/jpeg,image/png,image/webp" },
    { name: "is_published", label: "Publish immediately", type: "checkbox" as const },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/admin/cms/news" className="text-sm font-semibold text-amber-700 hover:text-amber-800">← Back to News</Link>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Create News Article</h1>
        </div>
        <SharedCMSForm title="Article Details" fields={fields} submitAction={createNewsArticle} submitLabel="Create Article" />
        <p className="mt-8 text-sm text-slate-500">Signed in as administrator: {user.email}</p>
      </div>
    </main>
  );
}

export default function NewsCreatePage() {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-600"><p role="status">Loading...</p></main>}><NewsCreate /></Suspense>;
}
