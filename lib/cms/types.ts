export type Leader = {
  staff_id: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
  biography: string | null;
  public_photo_path: string | null;
  leadership_sort_order: number;
};

export type Department = {
  id: string;
  name: string;
  description: string;
  image_path: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  objectives: string;
  image_path: string | null;
  start_date: string | null;
  end_date: string | null;
  status: "planned" | "active" | "completed";
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Program = {
  id: string;
  title: string;
  slug: string;
  description: string;
  application_info: string;
  image_path: string | null;
  start_date: string | null;
  end_date: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Partner = {
  id: string;
  name: string;
  description: string;
  website_url: string | null;
  logo_path: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_path: string | null;
  author_name: string | null;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };
