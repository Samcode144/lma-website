"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useTransition } from "react";

type DirectoryFiltersProps = {
  query: string;
  status: string;
};

export default function DirectoryFilters({
  query,
  status,
}: DirectoryFiltersProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextQuery = String(formData.get("q") ?? "").trim();
    const nextStatus = String(formData.get("status") ?? "all");

    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextStatus && nextStatus !== "all") params.set("status", nextStatus);

    const href = params.toString()
      ? `/employees?${params.toString()}`
      : "/employees";

    startTransition(() => {
      router.push(href);
    });
  }

  function clearFilters() {
    startTransition(() => {
      router.push("/employees");
    });
  }

  return (
    <form
      onSubmit={applyFilters}
      className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 lg:flex-row lg:items-end"
    >
      <div className="flex-1">
        <label
          htmlFor="employee-search"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Search
        </label>
        <input
          id="employee-search"
          name="q"
          defaultValue={query}
          placeholder="Staff ID, name, department, or position"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="w-full lg:w-52">
        <label
          htmlFor="employment-status-filter"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Status
        </label>
        <select
          id="employment-status-filter"
          name="status"
          defaultValue={status || "all"}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {pending ? "Applying..." : "Apply"}
        </button>
        <button
          type="button"
          onClick={clearFilters}
          disabled={pending}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
