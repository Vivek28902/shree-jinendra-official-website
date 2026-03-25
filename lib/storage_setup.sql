-- ==========================================
-- SUPABASE STORAGE BUCKET SETUP
-- ==========================================

-- 1. Create a public storage bucket named 'sjaa-assets'
insert into storage.buckets (id, name, public)
values ('sjaa-assets', 'sjaa-assets', true)
on conflict (id) do nothing;

-- 2. Allow public to READ images (so your website can display them)
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'sjaa-assets' );

-- 3. Allow public to UPLOAD images (from your Admin Panel)
create policy "Allow Public Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'sjaa-assets' );

-- 4. Allow public to UPDATE images
create policy "Allow Public Updates"
  on storage.objects for update
  using ( bucket_id = 'sjaa-assets' );

-- 5. Allow public to DELETE images
create policy "Allow Public Deletes"
  on storage.objects for delete
  using ( bucket_id = 'sjaa-assets' );
