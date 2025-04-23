alter table "public"."edge" enable row level security;

alter table "public"."note" enable row level security;

alter table "public"."user" enable row level security;

create policy "Enable access for authenticated users only"
on "public"."edge"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable access for authenticated users only"
on "public"."note"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable access for authenticated users only"
on "public"."user"
as permissive
for all
to authenticated
using (true)
with check (true);



