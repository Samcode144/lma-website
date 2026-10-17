export const PROJECT_STATUS_OPTIONS = [
  { value: "planned", label: "Planned" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
] as const;

export const CONTENT_FOLDER_NAMES = {
  departments: "departments",
  projects: "projects",
  programs: "programs",
  partners: "partners",
  news: "news",
  leaders: "leaders",
} as const;
