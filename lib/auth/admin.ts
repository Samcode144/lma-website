import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AdminSession = {
  supabase: Awaited<ReturnType<typeof createClient>>;
  user: {
    id: string;
    email?: string;
  };
};

/**
 * Verifies the signed-in user is an LMA administrator.
 * Returns the Supabase client and user, or redirects / returns null.
 */
export async function requireAdmin(
  options: { redirectTo?: string } = {}
): Promise<AdminSession> {
  const redirectTo = options.redirectTo ?? "/login";
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(redirectTo);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    redirect(redirectTo);
  }

  return {
    supabase,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

/** Same checks as requireAdmin, but returns an error string instead of redirecting. */
export async function getAdminSession(): Promise<
  | { ok: true; session: AdminSession }
  | { ok: false; error: string }
> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { ok: false, error: "You must be signed in as an administrator." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    return {
      ok: false,
      error: "You are not authorized to perform this action.",
    };
  }

  return {
    ok: true,
    session: {
      supabase,
      user: {
        id: user.id,
        email: user.email,
      },
    },
  };
}
