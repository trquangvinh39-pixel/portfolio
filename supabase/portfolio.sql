-- Portfolio Trần Quang Vinh — dữ liệu trên Supabase
-- Chạy toàn bộ file này một lần trong Supabase → SQL Editor (chạy lại nhiều lần vẫn an toàn).
-- Gồm: lời nhắn từ form liên hệ (chỉ ghi, không ai đọc được qua web) và bộ đếm lượt xem / lượt thích.
-- Đọc lời nhắn: Supabase → Table Editor → pf_messages (bằng tài khoản quản trị của anh).

-- 1. Lời nhắn
create table if not exists public.pf_messages (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 120),
  email       text not null check (char_length(email) between 5 and 200 and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  company     text check (company is null or char_length(company) <= 160),
  topic       text check (topic is null or char_length(topic) <= 80),
  body        text not null check (char_length(body) between 5 and 4000),
  lang        text check (lang in ('vi', 'en')),
  handled     boolean not null default false
);

alter table public.pf_messages enable row level security;

-- Khách (anon) chỉ được THÊM lời nhắn, không đọc / sửa / xoá
drop policy if exists pf_messages_insert on public.pf_messages;
create policy pf_messages_insert on public.pf_messages
  for insert to anon, authenticated
  with check (handled = false);

revoke all on public.pf_messages from anon, authenticated;
grant insert (name, email, company, topic, body, lang) on public.pf_messages to anon, authenticated;

-- Chặn spam đơn giản: tối đa 5 lời nhắn / email / giờ, 200 lời nhắn / ngày toàn trang
create or replace function public.pf_messages_guard()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.pf_messages where email = new.email and created_at > now() - interval '1 hour') >= 5 then
    raise exception 'too many messages';
  end if;
  if (select count(*) from public.pf_messages where created_at > now() - interval '1 day') >= 200 then
    raise exception 'daily limit';
  end if;
  return new;
end $$;

drop trigger if exists pf_messages_guard on public.pf_messages;
create trigger pf_messages_guard before insert on public.pf_messages
  for each row execute function public.pf_messages_guard();

-- 2. Bộ đếm lượt xem / lượt thích (key = 'site' hoặc mã dự án)
create table if not exists public.pf_counters (
  key         text primary key check (key ~ '^[a-z0-9-]{1,40}$'),
  views       bigint not null default 0,
  likes       bigint not null default 0,
  updated_at  timestamptz not null default now()
);

alter table public.pf_counters enable row level security;
revoke all on public.pf_counters from anon, authenticated;

-- Danh sách mã hợp lệ, để không ai tạo bộ đếm rác
create or replace function public.pf_valid_key(p_key text)
returns boolean language sql immutable as $$
  select p_key in ('site', 'agentic-ai', 'webapp', 'daily-plan', 'exit-cost', 'feasibility', 'fnb', 'bi-stack', 'sku-rank', 'inventory');
$$;

-- Tăng bộ đếm, trả về số mới
create or replace function public.pf_bump(p_key text, p_kind text)
returns table (key text, views bigint, likes bigint)
language plpgsql security definer set search_path = public as $$
#variable_conflict use_column
begin
  if not public.pf_valid_key(p_key) or p_kind not in ('view', 'like') then
    raise exception 'invalid key or kind';
  end if;
  insert into public.pf_counters as c (key, views, likes)
  values (p_key, case when p_kind = 'view' then 1 else 0 end, case when p_kind = 'like' then 1 else 0 end)
  on conflict (key) do update
    set views = c.views + case when p_kind = 'view' then 1 else 0 end,
        likes = c.likes + case when p_kind = 'like' then 1 else 0 end,
        updated_at = now();
  return query select c.key, c.views, c.likes from public.pf_counters c where c.key = p_key;
end $$;

-- Đọc toàn bộ số đếm (không có dữ liệu cá nhân)
create or replace function public.pf_stats()
returns table (key text, views bigint, likes bigint)
language sql stable security definer set search_path = public as $$
  select c.key, c.views, c.likes from public.pf_counters c;
$$;

revoke all on function public.pf_bump(text, text) from public;
revoke all on function public.pf_stats() from public;
grant execute on function public.pf_bump(text, text) to anon, authenticated;
grant execute on function public.pf_stats() to anon, authenticated;

-- 3. Kiểm tra nhanh
do $$
declare r record;
begin
  select * into r from public.pf_bump('site', 'view');
  if r.views < 1 then raise exception 'pf_bump lỗi'; end if;
  begin
    perform public.pf_bump('rac', 'view');
    raise exception 'pf_bump nhận mã không hợp lệ';
  exception when others then
    if sqlerrm <> 'invalid key or kind' then raise; end if;
  end;
  update public.pf_counters set views = views - 1 where key = 'site';
  raise notice 'TẤT CẢ KIỂM TRA ĐẠT';
end $$;
