export type EmploymentStatus = "active" | "inactive";

export type Employee = {
  id: string;
  staff_id: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
  official_email: string | null;
  phone: string | null;
  photo_path: string | null;
  employment_status: EmploymentStatus;
  created_at: string;
  updated_at: string;
};

export type EmployeeFormValues = {
  staff_id: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
  official_email: string | null;
  phone: string | null;
  employment_status: EmploymentStatus;
};

export type ActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof EmployeeFormValues | "photo", string>>;
};
