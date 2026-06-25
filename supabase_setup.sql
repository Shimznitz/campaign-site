-- supabase_setup.sql
-- ============================================================
-- Run this in the Supabase SQL Editor (Project → SQL Editor → New Query)
-- Creates all tables needed for the site + WhatsApp chatbot.
-- ============================================================

-- Supporters (Join Us form)
create table if not exists supporters (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text not null,
  state text not null,
  lga text,
  occupation text,
  interest text not null,
  created_at timestamptz default now()
);

-- Contact messages (Send Us a Note form)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- WhatsApp conversation history (powers the chatbot's short-term memory)
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

-- Index for fast lookup of a phone number's recent history
create index if not exists conversations_phone_created_idx
  on conversations (phone, created_at desc);

-- Enable Row Level Security
alter table supporters enable row level security;
alter table messages enable row level security;
alter table conversations enable row level security;

-- Allow the public (anon) key used by the website to INSERT into
-- supporters/messages (form submissions), but not read others' data.
create policy "Allow public insert on supporters"
  on supporters for insert
  to anon
  with check (true);

create policy "Allow public insert on messages"
  on messages for insert
  to anon
  with check (true);

-- conversations table is only read/written by the server (webhook route),
-- which uses the same anon key in this starter setup. If you later add a
-- service-role key for server routes, you can lock this down further.
create policy "Allow public insert on conversations"
  on conversations for insert
  to anon
  with check (true);

create policy "Allow public select on conversations"
  on conversations for select
  to anon
  using (true);
