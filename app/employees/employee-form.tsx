"use client";

import Link from "next/link";
import { useActionState } from "react";
import { MAX_PHOTO_BYTES } from "@/lib/employees/constants";
import type { ActionState, Employee } from "@/lib/employees/types";

type EmployeeFormProps = {
  mode: "create" | "edit";
  action: (
    prevState: ActionState,
    formData: FormData
  ) => Promise<ActionState>;
  employee?: Pick<
    Employee,
    | "staff_id"
    | "first_name"
    | "last_name"
    | "position"
    | "department"
    | "official_email"
    | "phone"
    | "employment_status"
    | "photo_path"
  >;
  photoUrl?: string | null;
  cancelHref: string;
};

const initialState: ActionState = {
  ok: false,
  message: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}

export default function EmployeeForm({
  mode,
  action,
  employee,
  photoUrl,
  cancelHref,
}: EmployeeFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.message && !state.ok && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="staff_id"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Staff ID <span className="text-red-600">*</span>
          </label>
          <input
            id="staff_id"
            name="staff_id"
            required
            defaultValue={employee?.staff_id ?? ""}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            placeholder="e.g. LMA-001"
          />
          <FieldError message={state.fieldErrors?.staff_id} />
        </div>

        <div>
          <label
            htmlFor="first_name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            First name <span className="text-red-600">*</span>
          </label>
          <input
            id="first_name"
            name="first_name"
            required
            defaultValue={employee?.first_name ?? ""}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
          <FieldError message={state.fieldErrors?.first_name} />
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Last name <span className="text-red-600">*</span>
          </label>
          <input
            id="last_name"
            name="last_name"
            required
            defaultValue={employee?.last_name ?? ""}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
          <FieldError message={state.fieldErrors?.last_name} />
        </div>

        <div>
          <label
            htmlFor="position"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Position <span className="text-red-600">*</span>
          </label>
          <input
            id="position"
            name="position"
            required
            defaultValue={employee?.position ?? ""}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
          <FieldError message={state.fieldErrors?.position} />
        </div>

        <div>
          <label
            htmlFor="department"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Department <span className="text-red-600">*</span>
          </label>
          <input
            id="department"
            name="department"
            required
            defaultValue={employee?.department ?? ""}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
          <FieldError message={state.fieldErrors?.department} />
        </div>

        <div>
          <label
            htmlFor="official_email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Official email
          </label>
          <input
            id="official_email"
            name="official_email"
            type="email"
            defaultValue={employee?.official_email ?? ""}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            placeholder="optional"
          />
          <FieldError message={state.fieldErrors?.official_email} />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={employee?.phone ?? ""}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            placeholder="optional"
          />
          <FieldError message={state.fieldErrors?.phone} />
        </div>

        <div>
          <label
            htmlFor="employment_status"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Employment status <span className="text-red-600">*</span>
          </label>
          <select
            id="employment_status"
            name="employment_status"
            required
            defaultValue={employee?.employment_status ?? "active"}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <FieldError message={state.fieldErrors?.employment_status} />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="photo"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Employee photo
          </label>
          <p className="mb-3 text-sm text-slate-500">
            Optional. JPEG, PNG, or WebP only. Maximum{" "}
            {Math.round(MAX_PHOTO_BYTES / (1024 * 1024))} MB. Stored in the
            private employee-photos bucket.
          </p>

          {mode === "edit" && photoUrl ? (
            <div className="mb-4 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt="Current employee photo"
                className="h-20 w-20 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="remove_photo"
                  className="rounded border-slate-300"
                />
                Remove current photo
              </label>
            </div>
          ) : null}

          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
          />
          <FieldError message={state.fieldErrors?.photo} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending
            ? mode === "create"
              ? "Saving..."
              : "Updating..."
            : mode === "create"
              ? "Register employee"
              : "Save changes"}
        </button>

        <Link
          href={cancelHref}
          className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
