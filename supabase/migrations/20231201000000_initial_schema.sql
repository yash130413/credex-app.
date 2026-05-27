-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Organizations table
create table if not exists public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_by uuid not null,
  created_at timestamptz not null default now()
);

-- Audits table
create table if not exists public.audits (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null,
  title text not null,
  provider text not null,
  total_monthly_spend numeric not null default 0,
  total_annual_spend numeric not null default 0,
  estimated_monthly_savings numeric not null default 0,
  estimated_annual_savings numeric not null default 0,
  utilization_rate numeric not null default 0,
  optimization_score integer not null default 0,
  ai_summary text,
  share_id uuid not null default uuid_generate_v4() unique,
  is_public boolean not null default false,
  created_by uuid not null,
  created_at timestamptz not null default now()
);

-- Audit recommendations table
create table if not exists public.audit_recommendations (
  id uuid primary key default uuid_generate_v4(),
  audit_id uuid not null references public.audits(id) on delete cascade,
  provider text not null,
  title text not null,
  recommendation text not null,
  reason text not null,
  confidence_score integer not null,
  priority text not null check (priority in ('Low', 'Medium', 'High', 'Critical')),
  monthly_savings numeric not null default 0,
  annual_savings numeric not null default 0,
  affected_users integer not null default 0,
  rule_id text not null,
  created_at timestamptz not null default now()
);

-- Leads table
create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text not null unique,
  company text,
  company_size text,
  estimated_ai_spend numeric,
  source text,
  created_at timestamptz not null default now()
);

-- User profiles table
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company_name text,
  role text,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_audits_organization_id on public.audits(organization_id);
create index if not exists idx_audits_share_id on public.audits(share_id);
create index if not exists idx_audits_created_by on public.audits(created_by);
create index if not exists idx_audit_recommendations_audit_id on public.audit_recommendations(audit_id);
create index if not exists idx_leads_email on public.leads(email);

-- RLS Policies (enable row level security)
alter table public.organizations enable row level security;
alter table public.audits enable row level security;
alter table public.audit_recommendations enable row level security;
alter table public.leads enable row level security;
alter table public.user_profiles enable row level security;

-- Public audits can be read by anyone
create policy "Public audits are viewable by anyone"
  on public.audits for select
  using (is_public = true);

-- Users can view their own audits
create policy "Users can view their own audits"
  on public.audits for select
  using (auth.uid() = created_by);

-- Users can insert audits
create policy "Users can insert audits"
  on public.audits for insert
  with check (true);

-- Recommendations are viewable if audit is viewable
create policy "Recommendations viewable with audit"
  on public.audit_recommendations for select
  using (
    exists (
      select 1 from public.audits
      where audits.id = audit_recommendations.audit_id
      and (audits.is_public = true or audits.created_by = auth.uid())
    )
  );

-- Anyone can insert recommendations
create policy "Anyone can insert recommendations"
  on public.audit_recommendations for insert
  with check (true);

-- User profiles
create policy "Users can view their own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = id);
