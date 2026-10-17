"use client";

import { useState, useTransition } from "react";
import { deleteEmployee } from "./actions";

type DeleteEmployeeButtonProps = {
  employeeId: string;
  employeeName: string;
};

export default function DeleteEmployeeButton({
  employeeId,
  employeeName,
}: DeleteEmployeeButtonProps) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      `Delete ${employeeName}? This cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    startTransition(async () => {
      const result = await deleteEmployee(employeeId);
      if (result && !result.ok) {
        setError(result.message);
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Deleting..." : "Delete employee"}
      </button>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
