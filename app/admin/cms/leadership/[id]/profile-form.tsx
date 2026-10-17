"use client";

import { useActionState, useState } from "react";
import { updateLeadershipProfile } from "./actions";

type Employee = {
  id: string;
  biography: string | null;
  show_on_leadership: boolean;
  leadership_sort_order: number;
  public_photo_path: string | null;
};

export default function LeadershipProfileForm({
  employee,
  existingPhotoUrl,
}: {
  employee: Employee;
  existingPhotoUrl: string | null;
}) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [removePhoto, setRemovePhoto] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const result = await updateLeadershipProfile(employee.id, formData);
      if (result.ok) {
        setPhotoPreview(null);
        setRemovePhoto(false);
      }
      return result;
    },
    null
  );

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setRemovePhoto(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRemovePhoto() {
    setRemovePhoto(true);
    setPhotoPreview(null);
    const fileInput = document.getElementById(
      "public_photo"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Public Profile Settings
        </h3>

        {/* Publication Status */}
        <div className="mt-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="show_on_leadership"
              value="true"
              defaultChecked={employee.show_on_leadership}
              className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-medium text-slate-900">
              Publish on Leadership page
            </span>
          </label>
          <p className="ml-8 mt-1 text-sm text-slate-500">
            When checked, this profile will appear on the public /leadership page
          </p>
        </div>

        {/* Sort Order */}
        <div className="mt-6">
          <label htmlFor="leadership_sort_order" className="block font-medium text-slate-900">
            Display Order
          </label>
          <input
            type="number"
            id="leadership_sort_order"
            name="leadership_sort_order"
            defaultValue={employee.leadership_sort_order}
            min="0"
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-slate-500">
            Lower numbers appear first (0 = highest priority)
          </p>
        </div>

        {/* Biography */}
        <div className="mt-6">
          <label htmlFor="biography" className="block font-medium text-slate-900">
            Biography
          </label>
          <textarea
            id="biography"
            name="biography"
            rows={6}
            defaultValue={employee.biography || ""}
            placeholder="Enter a brief biography for the public leadership page..."
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-slate-500">
            This biography will be displayed on the public leadership page
          </p>
        </div>

        {/* Public Photo */}
        <div className="mt-6">
          <label htmlFor="public_photo" className="block font-medium text-slate-900">
            Public Profile Photo
          </label>
          <p className="mt-1 text-sm text-slate-500">
            Upload a professional photo for the public website (max 2MB, JPEG/PNG/WebP)
          </p>

          {(employee.public_photo_path && !removePhoto) || photoPreview ? (
            <div className="mt-3 flex items-center gap-4">
              <img
                src={photoPreview || existingPhotoUrl || ""}
                alt="Preview"
                className="h-24 w-24 rounded-full object-cover ring-2 ring-slate-200"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                Remove Photo
              </button>
            </div>
          ) : null}

          <input
            type="file"
            id="public_photo"
            name="public_photo"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange}
            className="mt-3 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />

          <input type="hidden" name="remove_photo" value={removePhoto ? "true" : "false"} />
        </div>
      </div>

      {/* Status Messages */}
      {state && (
        <div
          className={`rounded-lg px-4 py-3 ${
            state.ok
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.ok ? state.message : state.error}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
