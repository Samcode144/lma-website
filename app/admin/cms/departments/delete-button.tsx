"use client";

import { useActionState } from "react";
import { deleteDepartment } from "./actions";

export default function DeleteDepartmentButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [state, formAction, isPending] = useActionState(
    async () => {
      if (!confirm(`Are you sure you want to delete "${name}"?`)) {
        return null;
      }
      return await deleteDepartment(id);
    },
    null
  );

  return (
    <form action={formAction}>
      {state && !state.ok && (
        <p className="mb-2 text-sm text-red-600">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete Department"}
      </button>
    </form>
  );
}
