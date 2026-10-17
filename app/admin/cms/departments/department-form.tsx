"use client";

import { useActionState, useState } from "react";
import { createDepartment, updateDepartment } from "./actions";
import type { Department } from "@/lib/cms/types";

export default function DepartmentForm({
  department,
}: {
  department?: Department;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const isEditing = !!department;

  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const result = isEditing
        ? await updateDepartment(department.id, formData)
        : await createDepartment(formData);

      if (result.ok && !isEditing) {
        // Reset form for create mode
        const form = document.getElementById(
          "dept-form"
        ) as HTMLFormElement | null;
        form?.reset();
        setImagePreview(null);
        setRemoveImage(false);
      } else if (result.ok) {
        setImagePreview(null);
        setRemoveImage(false);
      }

      return result;
    },
    null
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setRemoveImage(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <form id={isEditing ? undefined : "dept-form"} action={formAction} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <div>
        <label htmlFor={`name-${department?.id ?? "new"}`} className="block text-sm font-medium text-slate-900">
          Department Name *
        </label>
        <input
          type="text"
          id={`name-${department?.id ?? "new"}`}
          name="name"
          defaultValue={department?.name}
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor={`desc-${department?.id ?? "new"}`} className="block text-sm font-medium text-slate-900">
          Description *
        </label>
        <textarea
          id={`desc-${department?.id ?? "new"}`}
          name="description"
          rows={3}
          defaultValue={department?.description}
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`sort-${department?.id ?? "new"}`} className="block text-sm font-medium text-slate-900">
            Sort Order
          </label>
          <input
            type="number"
            id={`sort-${department?.id ?? "new"}`}
            name="sort_order"
            defaultValue={department?.sort_order ?? 0}
            min="0"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_published"
              value="true"
              defaultChecked={department?.is_published ?? false}
              className="h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            <span className="text-sm font-medium text-slate-900">Publish</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor={`image-${department?.id ?? "new"}`} className="block text-sm font-medium text-slate-900">
          Department Image
        </label>
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-32 rounded object-cover" />
        )}
        <input
          type="file"
          id={`image-${department?.id ?? "new"}`}
          name="image"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm"
        />
        {isEditing && department?.image_path && !removeImage && (
          <button
            type="button"
            onClick={() => setRemoveImage(true)}
            className="mt-2 text-sm text-red-600 hover:text-red-700"
          >
            Remove current image
          </button>
        )}
        <input type="hidden" name="remove_image" value={removeImage ? "true" : "false"} />
      </div>

      {state && (
        <div
          className={`rounded-lg px-3 py-2 text-sm ${
            state.ok
              ? "bg-emerald-50 text-emerald-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {state.ok ? state.message : state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : isEditing ? "Update Department" : "Create Department"}
      </button>
    </form>
  );
}
