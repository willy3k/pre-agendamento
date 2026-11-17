create table if not exists public.pre_bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(btrim(full_name)) between 2 and 120),
  phone text not null check (char_length(btrim(phone)) between 8 and 24),
  email text,
  objective text not null check (
    objective in (
      'Emagrecimento',
      'Ganho de massa',
      'Condicionamento',
      'Saúde e bem-estar'
    )
  ),
  visit_time text not null check (visit_time in ('Manhã', 'Tarde', 'Noite')),
  consent boolean not null check (consent),
  created_at timestamptz not null default now()
);

alter table public.pre_bookings enable row level security;

revoke all on table public.pre_bookings from public, anon, authenticated;
grant insert on table public.pre_bookings to anon;

drop policy if exists "Allow anonymous pre-booking submissions"
  on public.pre_bookings;

create policy "Allow anonymous pre-booking submissions"
  on public.pre_bookings
  for insert
  to anon
  with check (consent is true);
