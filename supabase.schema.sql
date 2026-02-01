-- Supabase schema for VidhiSahayak (run in Supabase SQL editor)

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  created_at timestamp with time zone default now()
);

-- Lawyers
create table if not exists public.lawyers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  practices text[] not null default '{}',
  experience_years int not null default 0,
  location text not null,
  fee int not null default 0,
  created_at timestamp with time zone default now()
);

-- Consultations
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  user_email text,
  lawyer_id uuid references public.lawyers(id) on delete set null,
  scheduled_at timestamp with time zone,
  status text not null default 'pending',
  fee int,
  created_at timestamp with time zone default now()
);

-- Basic RLS (public read allowed, writes restricted) - adjust as needed later
alter table public.categories enable row level security;
alter table public.lawyers enable row level security;
alter table public.consultations enable row level security;

-- Public read policies
drop policy if exists categories_read on public.categories;
create policy categories_read on public.categories for select using (true);
drop policy if exists lawyers_read on public.lawyers;
create policy lawyers_read on public.lawyers for select using (true);
drop policy if exists consultations_read on public.consultations;
create policy consultations_read on public.consultations for select using (true);

-- Write policies can be added later for authenticated users/admins

-- =============================
-- Additional schema (profiles, guidance, documents, AI, support, payments)
-- =============================

-- Ensure pgcrypto for gen_random_uuid (run once if needed)
-- create extension if not exists pgcrypto;

-- Profiles (link to Supabase Auth users)
create table if not exists public.profiles (
  id uuid primary key, -- same as auth.users.id
  role text not null check (role in ('user','lawyer','consultant','admin')),
  full_name text,
  email text unique,
  preferred_language text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

-- Basic policies: user can read/update own profile; public cannot read others
drop policy if exists profiles_select_self on public.profiles;
create policy profiles_select_self on public.profiles for select using (auth.uid() = id);
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles for update using (auth.uid() = id);
drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles for insert with check (auth.uid() = id);

-- Lawyer profile details (1-1 with profiles)
create table if not exists public.lawyer_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  license_number text,
  verification_status text not null default 'pending' check (verification_status in ('pending','verified','rejected')),
  proof_identity_url text,
  photo_url text,
  education text,
  experience_years int default 0,
  practicing_court text,
  office_location text,
  contact_info text,
  practices text[] not null default '{}',
  fee int default 0,
  created_at timestamp with time zone default now()
);

alter table public.lawyer_profiles enable row level security;
-- Allow owner read/update, public can read verified lawyers for listing
drop policy if exists lawyer_profiles_select_owner on public.lawyer_profiles;
create policy lawyer_profiles_select_owner on public.lawyer_profiles for select using (auth.uid() = id);
drop policy if exists lawyer_profiles_update_owner on public.lawyer_profiles;
create policy lawyer_profiles_update_owner on public.lawyer_profiles for update using (auth.uid() = id);
drop policy if exists lawyer_profiles_select_verified on public.lawyer_profiles;
create policy lawyer_profiles_select_verified on public.lawyer_profiles for select using (verification_status = 'verified');

-- Consultant profile details (1-1 with profiles)
create table if not exists public.consultant_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  expertise text,
  office_location text,
  contact_info text,
  created_at timestamp with time zone default now()
);

alter table public.consultant_profiles enable row level security;
drop policy if exists consultant_profiles_select_owner on public.consultant_profiles;
create policy consultant_profiles_select_owner on public.consultant_profiles for select using (auth.uid() = id);
drop policy if exists consultant_profiles_update_owner on public.consultant_profiles;
create policy consultant_profiles_update_owner on public.consultant_profiles for update using (auth.uid() = id);

-- Guidance per category (store structured arrays in jsonb)
create table if not exists public.guidance (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  where_to_get jsonb default '[]'::jsonb,
  type_required jsonb default '[]'::jsonb,
  verification_contacts jsonb default '[]'::jsonb,
  submission_offices jsonb default '[]'::jsonb,
  print_guidance jsonb default '[]'::jsonb,
  steps jsonb default '[]'::jsonb,
  updated_at timestamp with time zone default now()
);

alter table public.guidance enable row level security;
drop policy if exists guidance_read on public.guidance;
create policy guidance_read on public.guidance for select using (true);

-- Templates for documents per category
create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  title text not null,
  body text not null,
  created_at timestamp with time zone default now()
);

alter table public.templates enable row level security;
drop policy if exists templates_read on public.templates;
create policy templates_read on public.templates for select using (true);

-- User-created documents
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  title text,
  content jsonb default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','submitted','approved','rejected')),
  created_at timestamp with time zone default now()
);

alter table public.documents enable row level security;
-- Owner can read/write own documents
drop policy if exists documents_select_owner on public.documents;
create policy documents_select_owner on public.documents for select using (auth.uid() = user_id);
drop policy if exists documents_insert_owner on public.documents;
create policy documents_insert_owner on public.documents for insert with check (auth.uid() = user_id);
drop policy if exists documents_update_owner on public.documents;
create policy documents_update_owner on public.documents for update using (auth.uid() = user_id);

-- Searches log (AI and normal)
create table if not exists public.search_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  query text not null,
  created_at timestamp with time zone default now()
);
alter table public.search_logs enable row level security;
drop policy if exists search_logs_select_owner on public.search_logs;
create policy search_logs_select_owner on public.search_logs for select using (auth.uid() = user_id);
drop policy if exists search_logs_insert_owner on public.search_logs;
create policy search_logs_insert_owner on public.search_logs for insert with check (auth.uid() = user_id or user_id is null);

-- AI chat sessions and messages
create table if not exists public.ai_chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default now()
);
alter table public.ai_chat_sessions enable row level security;
drop policy if exists ai_sessions_select_owner on public.ai_chat_sessions;
create policy ai_sessions_select_owner on public.ai_chat_sessions for select using (auth.uid() = user_id);
drop policy if exists ai_sessions_insert_owner on public.ai_chat_sessions;
create policy ai_sessions_insert_owner on public.ai_chat_sessions for insert with check (auth.uid() = user_id or user_id is null);

create table if not exists public.ai_chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.ai_chat_sessions(id) on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  created_at timestamp with time zone default now()
);
alter table public.ai_chat_messages enable row level security;
-- A simple policy: allow selecting messages if session belongs to user
drop policy if exists ai_messages_select_owner on public.ai_chat_messages;
create policy ai_messages_select_owner on public.ai_chat_messages for select using (
  exists (
    select 1 from public.ai_chat_sessions s where s.id = session_id and (s.user_id is null or s.user_id = auth.uid())
  )
);
-- Allow inserting messages if the session belongs to the current user or is anonymous
drop policy if exists ai_messages_insert_owner on public.ai_chat_messages;
create policy ai_messages_insert_owner on public.ai_chat_messages for insert with check (
  exists (
    select 1 from public.ai_chat_sessions s where s.id = session_id and (s.user_id is null or s.user_id = auth.uid())
  )
);

-- Support tickets
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  email text,
  subject text,
  message text,
  status text not null default 'open' check (status in ('open','in_progress','closed')),
  created_at timestamp with time zone default now()
);
alter table public.support_tickets enable row level security;
drop policy if exists support_select_owner on public.support_tickets;
create policy support_select_owner on public.support_tickets for select using (auth.uid() = user_id);
drop policy if exists support_insert_owner on public.support_tickets;
create policy support_insert_owner on public.support_tickets for insert with check (auth.uid() = user_id or user_id is null);

-- Payments (placeholder for future Stripe/UPI integration)
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  consultation_id uuid references public.consultations(id) on delete set null,
  amount int not null,
  currency text not null default 'INR',
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  provider text, -- e.g., stripe
  created_at timestamp with time zone default now()
);
alter table public.payments enable row level security;
drop policy if exists payments_select_owner on public.payments;
create policy payments_select_owner on public.payments for select using (auth.uid() = user_id);
-- Only allow storing payments that are already marked as 'paid'
drop policy if exists payments_insert_owner on public.payments;
create policy payments_insert_paid_owner on public.payments for insert with check (
  auth.uid() = user_id and status = 'paid'
);
