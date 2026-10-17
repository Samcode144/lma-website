create or replace function public.verify_employee_by_staff_id(p_staff_id text)
returns table (
  staff_id text,
  first_name text,
  last_name text,
  position text,
  department text,
  employment_status text
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
    employee.employment_status::text
  from public.employees as employee
  where p_staff_id is not null
    and pg_catalog.char_length(p_staff_id) between 1 and 50
    and p_staff_id = pg_catalog.btrim(p_staff_id)
    and p_staff_id !~ '[[:cntrl:]]'
    and employee.staff_id = p_staff_id
  limit 1;
$function$;

revoke all on function public.verify_employee_by_staff_id(text) from public;
revoke all on function public.verify_employee_by_staff_id(text) from anon, authenticated;
grant execute on function public.verify_employee_by_staff_id(text) to anon, authenticated;
