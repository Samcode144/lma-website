import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Leader,
  Department,
  Project,
  Program,
  Partner,
  NewsArticle,
} from "./types";

/**
 * Query published leaders for public display.
 */
export async function getPublishedLeaders(
  supabase: SupabaseClient
): Promise<Leader[]> {
  const { data, error } = await supabase.rpc("list_published_leaders");

  if (error) {
    console.error("Error fetching leaders:", error);
    console.error("Error details:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return [];
  }

  console.log("Leaders fetched successfully:", data?.length || 0, "profiles");
  return (data as Leader[]) ?? [];
}

/**
 * Query published departments.
 */
export async function getPublishedDepartments(
  supabase: SupabaseClient
): Promise<Department[]> {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("is_published", true)
    .order("sort_order")
    .order("name");

  if (error) {
    console.error("Error fetching departments:", error);
    return [];
  }

  return (data as Department[]) ?? [];
}

/**
 * Query published projects.
 */
export async function getPublishedProjects(
  supabase: SupabaseClient
): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("start_date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return (data as Project[]) ?? [];
}

/**
 * Query a single published project by slug.
 */
export async function getPublishedProjectBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data as Project | null;
}

/**
 * Query published programs.
 */
export async function getPublishedPrograms(
  supabase: SupabaseClient
): Promise<Program[]> {
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("is_published", true)
    .order("start_date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching programs:", error);
    return [];
  }

  return (data as Program[]) ?? [];
}

/**
 * Query a single published program by slug.
 */
export async function getPublishedProgramBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<Program | null> {
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching program:", error);
    return null;
  }

  return data as Program | null;
}

/**
 * Query published partners.
 */
export async function getPublishedPartners(
  supabase: SupabaseClient
): Promise<Partner[]> {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("is_published", true)
    .order("sort_order")
    .order("name");

  if (error) {
    console.error("Error fetching partners:", error);
    return [];
  }

  return (data as Partner[]) ?? [];
}

/**
 * Query published news articles.
 */
export async function getPublishedNews(
  supabase: SupabaseClient,
  limit?: number
): Promise<NewsArticle[]> {
  let query = supabase
    .from("news_articles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }

  return (data as NewsArticle[]) ?? [];
}

/**
 * Query a single published news article by slug.
 */
export async function getPublishedNewsBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<NewsArticle | null> {
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching news article:", error);
    return null;
  }

  return data as NewsArticle | null;
}
