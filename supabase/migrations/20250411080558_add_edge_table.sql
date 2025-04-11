create table if not exists "public"."edge" (
    "id" uuid not null default gen_random_uuid(),
    "source_note_id" uuid,
    "target_note_id" uuid,
    "source_handle" text not null,
    "target_handle" text not null
);


create table if not exists "public"."note" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "creator_id" uuid,
    "x" double precision not null,
    "y" double precision not null,
    "title" text not null,
    "content" text not null
);


create table if not exists "public"."user" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "email" text not null
);


DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'edge_pkey') THEN
        CREATE UNIQUE INDEX edge_pkey ON public.edge USING btree (id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'note_pkey') THEN
        CREATE UNIQUE INDEX note_pkey ON public.note USING btree (id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'user_email_key') THEN
        CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'user_pkey') THEN
        CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'edge_pkey') THEN
        ALTER TABLE "public"."edge" ADD CONSTRAINT "edge_pkey" PRIMARY KEY USING INDEX "edge_pkey";
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'note_pkey') THEN
        ALTER TABLE "public"."note" ADD CONSTRAINT "note_pkey" PRIMARY KEY USING INDEX "note_pkey";
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_pkey') THEN
        ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY USING INDEX "user_pkey";
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'edge_source_note_id_fkey') THEN
        ALTER TABLE "public"."edge" ADD CONSTRAINT "edge_source_note_id_fkey" FOREIGN KEY (source_note_id) REFERENCES note(id) ON UPDATE CASCADE ON DELETE SET NULL;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'edge_target_note_id_fkey') THEN
        ALTER TABLE "public"."edge" ADD CONSTRAINT "edge_target_note_id_fkey" FOREIGN KEY (target_note_id) REFERENCES note(id) ON UPDATE CASCADE ON DELETE SET NULL;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'note_creator_id_fkey') THEN
        ALTER TABLE "public"."note" ADD CONSTRAINT "note_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES "user"(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_email_key') THEN
        ALTER TABLE "public"."user" ADD CONSTRAINT "user_email_key" UNIQUE USING INDEX "user_email_key";
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_id_fkey') THEN
        ALTER TABLE "public"."user" ADD CONSTRAINT "user_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
    END IF;
END
$$;

grant delete on table "public"."edge" to "anon";

grant insert on table "public"."edge" to "anon";

grant references on table "public"."edge" to "anon";

grant select on table "public"."edge" to "anon";

grant trigger on table "public"."edge" to "anon";

grant truncate on table "public"."edge" to "anon";

grant update on table "public"."edge" to "anon";

grant delete on table "public"."edge" to "authenticated";

grant insert on table "public"."edge" to "authenticated";

grant references on table "public"."edge" to "authenticated";

grant select on table "public"."edge" to "authenticated";

grant trigger on table "public"."edge" to "authenticated";

grant truncate on table "public"."edge" to "authenticated";

grant update on table "public"."edge" to "authenticated";

grant delete on table "public"."edge" to "service_role";

grant insert on table "public"."edge" to "service_role";

grant references on table "public"."edge" to "service_role";

grant select on table "public"."edge" to "service_role";

grant trigger on table "public"."edge" to "service_role";

grant truncate on table "public"."edge" to "service_role";

grant update on table "public"."edge" to "service_role";

grant delete on table "public"."note" to "anon";

grant insert on table "public"."note" to "anon";

grant references on table "public"."note" to "anon";

grant select on table "public"."note" to "anon";

grant trigger on table "public"."note" to "anon";

grant truncate on table "public"."note" to "anon";

grant update on table "public"."note" to "anon";

grant delete on table "public"."note" to "authenticated";

grant insert on table "public"."note" to "authenticated";

grant references on table "public"."note" to "authenticated";

grant select on table "public"."note" to "authenticated";

grant trigger on table "public"."note" to "authenticated";

grant truncate on table "public"."note" to "authenticated";

grant update on table "public"."note" to "authenticated";

grant delete on table "public"."note" to "service_role";

grant insert on table "public"."note" to "service_role";

grant references on table "public"."note" to "service_role";

grant select on table "public"."note" to "service_role";

grant trigger on table "public"."note" to "service_role";

grant truncate on table "public"."note" to "service_role";

grant update on table "public"."note" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";


