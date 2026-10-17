import type {
  ActionState,
  EmployeeFormValues,
  EmploymentStatus,
} from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function parseEmployeeForm(
  formData: FormData
):
  | { ok: true; values: EmployeeFormValues }
  | { ok: false; state: ActionState } {
  const staff_id = readString(formData, "staff_id");
  const first_name = readString(formData, "first_name");
  const last_name = readString(formData, "last_name");
  const position = readString(formData, "position");
  const department = readString(formData, "department");
  const official_email_raw = readString(formData, "official_email");
  const phone_raw = readString(formData, "phone");
  const status_raw = readString(formData, "employment_status");

  const fieldErrors: ActionState["fieldErrors"] = {};

  if (!staff_id) {
    fieldErrors.staff_id = "Staff ID is required.";
  } else if (staff_id.length > 50) {
    fieldErrors.staff_id = "Staff ID must be 50 characters or fewer.";
  }

  if (!first_name) {
    fieldErrors.first_name = "First name is required.";
  } else if (first_name.length > 100) {
    fieldErrors.first_name = "First name must be 100 characters or fewer.";
  }

  if (!last_name) {
    fieldErrors.last_name = "Last name is required.";
  } else if (last_name.length > 100) {
    fieldErrors.last_name = "Last name must be 100 characters or fewer.";
  }

  if (!position) {
    fieldErrors.position = "Position is required.";
  } else if (position.length > 150) {
    fieldErrors.position = "Position must be 150 characters or fewer.";
  }

  if (!department) {
    fieldErrors.department = "Department is required.";
  } else if (department.length > 150) {
    fieldErrors.department = "Department must be 150 characters or fewer.";
  }

  let official_email: string | null = null;
  if (official_email_raw) {
    if (!EMAIL_PATTERN.test(official_email_raw) || official_email_raw.length > 254) {
      fieldErrors.official_email = "Enter a valid email address.";
    } else {
      official_email = official_email_raw.toLowerCase();
    }
  }

  let phone: string | null = null;
  if (phone_raw) {
    if (phone_raw.length > 40) {
      fieldErrors.phone = "Phone number must be 40 characters or fewer.";
    } else {
      phone = phone_raw;
    }
  }

  if (status_raw !== "active" && status_raw !== "inactive") {
    fieldErrors.employment_status = "Select an employment status.";
  }

  if (fieldErrors && Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      state: {
        ok: false,
        message: "Please correct the highlighted fields.",
        fieldErrors,
      },
    };
  }

  return {
    ok: true,
    values: {
      staff_id,
      first_name,
      last_name,
      position,
      department,
      official_email,
      phone,
      employment_status: status_raw as EmploymentStatus,
    },
  };
}

export function isUniqueViolation(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return error.code === "23505" || /duplicate|unique/i.test(error.message ?? "");
}

/** Escape characters that have special meaning in PostgREST ilike filters. */
export function escapeIlike(value: string): string {
  return value.replace(/[%_,]/g, (match) => `\\${match}`);
}
