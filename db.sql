create table profiles (
  id uuid references auth.users not null primary key,
  phone text unique,
  updated_at timestamp with time zone
);

create table resume_evaluations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  resume_url text not null,
  job_description text not null,
  score integer not null,
  feedback text not null,
  payment_status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
