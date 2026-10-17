"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "select" | "file" | "checkbox";
  required?: boolean;
  placeholder?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  accept?: string;
};

type SharedCMSFormProps = {
  title: string;
  fields: FormField[];
  defaultValues?: Record<string, unknown>;
  submitAction: (formData: FormData) => Promise<{ ok: boolean; message?: string; error?: string }>;
  submitLabel?: string;
  isEditing?: boolean;
  existingImagePath?: string | null;
  onSuccess?: () => void;
};

export default function SharedCMSForm({
  title,
  fields,
  defaultValues = {},
  submitAction,
  submitLabel = "Save",
  isEditing = false,
  existingImagePath,
  onSuccess,
}: SharedCMSFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const result = await submitAction(formData);
      
      if (result.ok) {
        if (!isEditing) {
          const form = document.getElementById("cms-form") as HTMLFormElement;
          form?.reset();
          setImagePreview(null);
        }
        setRemoveImage(false);
        
        if (onSuccess) {
          onSuccess();
        } else if (!isEditing) {
          router.refresh();
        }
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
    <form
      id={isEditing ? undefined : "cms-form"}
      action={formAction}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>

      {fields.map((field) => {
        if (field.type === "checkbox") {
          return (
            <div key={field.name}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={field.name}
                  value="true"
                  defaultChecked={Boolean(defaultValues?.[field.name] ?? false)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                <span className="text-sm font-medium text-slate-900">
                  {field.label}
                </span>
              </label>
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-900"
              >
                {field.label} {field.required && "*"}
              </label>
              <select
                id={field.name}
                name={field.name}
                defaultValue={defaultValues?.[field.name] as string | undefined}
                required={field.required}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "file") {
          return (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-900"
              >
                {field.label}
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-32 w-32 rounded object-cover"
                />
              )}
              <input
                type="file"
                id={field.name}
                name={field.name}
                accept={field.accept}
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />
              {existingImagePath && !removeImage && isEditing && (
                <button
                  type="button"
                  onClick={() => setRemoveImage(true)}
                  className="mt-2 text-sm text-red-600 hover:text-red-700"
                >
                  Remove current image
                </button>
              )}
              <input
                type="hidden"
                name="remove_image"
                value={removeImage ? "true" : "false"}
              />
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-900"
              >
                {field.label} {field.required && "*"}
              </label>
              <textarea
                id={field.name}
                name={field.name}
                rows={field.rows ?? 4}
                defaultValue={defaultValues?.[field.name] as string | undefined}
                placeholder={field.placeholder}
                required={field.required}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-slate-900"
            >
              {field.label} {field.required && "*"}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              defaultValue={defaultValues?.[field.name] as string | undefined}
              placeholder={field.placeholder}
              required={field.required}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        );
      })}

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

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
