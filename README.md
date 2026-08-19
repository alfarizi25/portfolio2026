# Abdee Alfarizi — Design & Photography Portfolio

Platform portofolio premium yang dibangun dengan fokus pada performa, tipografi, dan pengalaman visual imersif. Dirancang khusus untuk membedakan antara presentasi karya desain (dengan metadata alat & peran) dan fotografi (dengan EXIF kamera & lensa), berjalan di atas Next.js 15 (App Router) dan Supabase.

---

## 1. Overview Struktur Folder

- `src/app/(public)/`: Halaman yang dapat diakses pengunjung (Home, Work, About, Contact).
- `src/app/(admin)/`: Halaman panel admin (terlindungi oleh otentikasi).
- `src/components/gallery/`: Komponen inti untuk menampilkan karya (Masonry Grid, ProjectCard dengan Framer Motion).
- `src/components/ui/`: Komponen dasar UI yang minimalis.
- `src/lib/data/`: Data statis (`mock-projects.ts`) untuk placeholder sebelum Supabase tersambung.
- `src/types/`: Definisi TypeScript (terutama `project.ts`).
- `supabase/migrations/`: Skema database SQL yang siap dijalankan.

---

## 2. Setup Lokal dari Nol

1. **Persyaratan**: Node.js versi 18 ke atas.
2. **Clone & Install**:
   ```bash
   git clone <repo-url>
   cd portfolio-abdee
   npm install
   ```
3. **Environment Variables**:
   Copy `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Lalu isi nilai-nilainya (Lihat bagian Setup Supabase di bawah).

4. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser.

---

## 3. Setup Supabase (Database & Storage)

1. Buat project baru di [Supabase](https://supabase.com).
2. Pergi ke menu **SQL Editor** di dashboard Supabase.
3. Buka file `supabase/migrations/00000_init.sql` dari kode sumber ini, copy seluruh isinya, paste di SQL Editor Supabase, lalu klik **Run**. Ini akan otomatis:
   - Membuat tabel `projects`, `blog_posts`, `contact_messages`, `site_settings`.
   - Mengatur Row Level Security (RLS) agar publik hanya bisa membaca karya yang dipublikasikan.
   - Mengatur trigger untuk kolom `updated_at`.
4. Pergi ke menu **Storage** di Supabase, buat bucket baru bernama `portfolio-media`. Setel bucket menjadi **Public**.
5. Ambil API Keys:
   - Di dashboard Supabase, pergi ke **Project Settings -> API**.
   - Salin `Project URL` ke `NEXT_PUBLIC_SUPABASE_URL` di `.env.local`.
   - Salin `anon public` key ke `NEXT_PUBLIC_SUPABASE_ANON_KEY` di `.env.local`.
6. Buat 1 User Admin:
   - Pergi ke menu **Authentication -> Users**.
   - Tambahkan pengguna baru dengan email dan kata sandi Anda. Anda akan menggunakan kredensial ini untuk login ke `/admin`.

---

## 4. Setup Resend (Untuk Form Kontak)

1. **Resend (Email Notifikasi)**:
   - Daftar di [Resend](https://resend.com).
   - Buat API Key dan masukkan ke `RESEND_API_KEY` di `.env.local`.

---

## 5. Deploy ke Vercel

1. Push repository Anda ke GitHub.
2. Login ke [Vercel](https://vercel.com) dan klik **Add New Project**.
3. Pilih repository GitHub Anda.
4. Di bagian **Environment Variables**, tambahkan semua variabel yang ada di `.env.local`.
5. Klik **Deploy**.

---

## 6. Panduan Update Konten (Bagian yang harus diubah Pemilik)

> [!IMPORTANT]
> Jangan lupa untuk mengganti placeholder berikut dengan data asli Anda sebelum go-live!

1. **Info Pribadi di `layout.tsx`**: Buka `src/app/layout.tsx` dan ubah `title` serta `description` metadata dengan tagline Anda yang sebenarnya.
2. **Halaman About (`src/app/(public)/about/page.tsx`)**:
   - Ganti URL gambar profil (`src`).
   - Ganti teks biografi placeholder dengan cerita asli Anda.
   - Ganti `href` pada tombol "Download CV" dengan link file PDF CV asli yang telah Anda unggah ke Supabase Storage.
   - Ganti `href` pada tombol "Email Me" (misal: `mailto:abdee@example.com`).
3. **Karya / Portofolio**:
   Saat ini halaman Galeri menggunakan data *mock* dari `src/lib/data/mock-projects.ts`. Setelah Supabase dihubungkan dan halaman Admin selesai dibangun (atau Anda mengisinya manual melalui *Table Editor* Supabase), Anda perlu mengambil data dari Supabase di file `src/app/(public)/work/page.tsx`.

### Penjelasan Field: Design vs Photography
Saat memasukkan karya, ingat perbedaan dua tipe karya:
- **Design (`type: 'design'`)**: Gunakan kolom `role` (misal: "Lead Designer") dan `tools` (misal: "Figma, Illustrator").
- **Photography (`type: 'photography'`)**: Gunakan kolom `camera` (misal: "Sony A7III"), `lens`, dan `location`.
- Keduanya menggunakan *grid masonry* yang otomatis menyesuaikan rasio aspek gambar Anda. Jangan potong (crop) paksa foto Anda menjadi persegi jika itu merusak komposisi aslinya!

---

## 7. Rencana Maintenance & Keterbatasan

- **Free Tier Supabase**: Supabase free tier cukup untuk portofolio pribadi. Namun, basis data akan mengalami "pause" jika tidak ada aktivitas selama beberapa hari. Pastikan Anda memiliki script *cron job* sederhana (bisa via Vercel Cron) untuk melakukan *ping* (query SELECT sederhana) ke database setiap hari.
- **Storage**: Batasi ukuran unggahan gambar. Sangat disarankan untuk mengompres gambar (misal dengan WebP atau JPEG progresif) sebelum diunggah ke Supabase Storage agar loading web tetap cepat (LCP < 2.5s).

---

*Setiap keputusan desain dalam kode ini telah dieksekusi dengan prinsip: Apakah ini membuat karya terlihat lebih baik? Selamat mempublikasikan karya Anda.*
