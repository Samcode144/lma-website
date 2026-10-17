-- LMA public website CMS.
-- Run this in the Supabase SQL editor if the CLI is not linked.
-- Does not alter employee-photos policies or make public.employees readable.

-- Public profile fields on existing employee records (not a second people table).
alter table public.employees
  add column if not exists biography text,
  add column if not exists show_on_leadership boolean not null default false,
  add column if not exists leadership_sort_order integer not null default 0,
  add column if not exists public_photo_path text;

comment on column public.employees.show_on_leadership is
  'When true, approved public fields may appear on /leadership. Independent of employment_status.';
comment on column public.employees.public_photo_path is
  'Optional object path in the public content-images bucket for website display only.';

-- Published leadership listing. Returns only approved public fields.
create or replace function public.list_published_leaders()
returns table (
  staff_id text,
  first_name text,
  last_name text,
  position text,
  department text,
  biography text,
  public_photo_path text,
  leadership_sort_order integer
)
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select
    employee.staff_id::text,
    employee.first_name::text,
    employee.last_name::text,
    employee.position::text,
    employee.department::text,
    employee.biography::text,
    employee.public_photo_path::text,
    employee.leadership_sort_order
  from public.employees as employee
  where employee.show_on_leadership = true
  order by
    employee.leadership_sort_order,
    employee.last_name,
    employee.first_name;
$function$;

revoke all on function public.list_published_leaders() from public;
revoke all on function public.list_published_leaders() from anon, authenticated;
grant execute on function public.list_published_leaders() to anon, authenticated;

-- Admin authorization check. Returns true if the current user is an LMA administrator.
-- Matches production function definition with most restrictive search_path.
create or replace function public.is_lma_admin()
returns boolean
language sql
stable
security definer
set search_path to ''
as $function$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.role = 'admin'
  );
$function$;

comment on function public.is_lma_admin() is
  'Returns true when the authenticated user has admin role in profiles table.';

revoke all on function public.is_lma_admin() from public;
revoke all on function public.is_lma_admin() from anon;
grant execute on function public.is_lma_admin() to authenticated;

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text not null default '',
  image_path text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  objectives text not null default '',
  image_path text,
  start_date date,
  end_date date,
  status text not null default 'planned'
    check (status in ('planned', 'active', 'completed')),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  application_info text not null default '',
  image_path text,
  start_date date,
  end_date date,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  website_url text,
  logo_path text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null default '',
  cover_path text,
  author_name text,
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.departments enable row level security;
alter table public.projects enable row level security;
alter table public.programs enable row level security;
alter table public.partners enable row level security;
alter table public.news_articles enable row level security;

-- Visitors may read published rows only. Employees remain admin-only.
drop policy if exists "Published departments are public" on public.departments;
create policy "Published departments are public"
  on public.departments for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins manage departments" on public.departments;
create policy "Admins manage departments"
  on public.departments for all
  to authenticated
  using (public.is_lma_admin())
  with check (public.is_lma_admin());

drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public"
  on public.projects for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects"
  on public.projects for all
  to authenticated
  using (public.is_lma_admin())
  with check (public.is_lma_admin());

drop policy if exists "Published programs are public" on public.programs;
create policy "Published programs are public"
  on public.programs for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins manage programs" on public.programs;
create policy "Admins manage programs"
  on public.programs for all
  to authenticated
  using (public.is_lma_admin())
  with check (public.is_lma_admin());

drop policy if exists "Published partners are public" on public.partners;
create policy "Published partners are public"
  on public.partners for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins manage partners" on public.partners;
create policy "Admins manage partners"
  on public.partners for all
  to authenticated
  using (public.is_lma_admin())
  with check (public.is_lma_admin());

drop policy if exists "Published news is public" on public.news_articles;
create policy "Published news is public"
  on public.news_articles for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins manage news" on public.news_articles;
create policy "Admins manage news"
  on public.news_articles for all
  to authenticated
  using (public.is_lma_admin())
  with check (public.is_lma_admin());

grant select on public.departments, public.projects, public.programs, public.partners, public.news_articles
  to anon, authenticated;
grant insert, update, delete on public.departments, public.projects, public.programs, public.partners, public.news_articles
  to authenticated;

-- Public website images. Separate from private employee-photos.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'content-images',
  'content-images',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read content images" on storage.objects;
create policy "Public can read content images"
  on storage.objects for select
  to public
  using (bucket_id = 'content-images');

drop policy if exists "Admins insert content images" on storage.objects;
create policy "Admins insert content images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'content-images' and public.is_lma_admin());

drop policy if exists "Admins update content images" on storage.objects;
create policy "Admins update content images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'content-images' and public.is_lma_admin())
  with check (bucket_id = 'content-images' and public.is_lma_admin());

drop policy if exists "Admins delete content images" on storage.objects;
create policy "Admins delete content images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'content-images' and public.is_lma_admin());
