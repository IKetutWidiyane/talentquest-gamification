# 🏔️ EIGER Talent Quest — Frontend Progress Tracker

---

> 📌 **Project Information**
> 
> - **Project:** EIGER Talent Quest
> - **Frontend Stack:** Next.js App Router, React, TypeScript
> - **Styling:** Tailwind CSS v4t
> - **Icons:** Lucide React
> - **Backend Status:** API sudah diimplementasikan & diuji via Postman
> - **Frontend Directory:** `frontend/`
> - **Documentation:** `FRONTEND_PROGRESS.md`

---

## 🎯 Current Focus & Quick Status

> 🚀 **Next Milestone:** Phase 3 — Application Layout & Navigation
**Prioritas Pengerjaan:**
> 
> 1. Public navbar dan footer
> 2. Candidate layout dan navigation
> 3. Talent Acquisition layout dan sidebar
> 4. Responsive navigation
> 5. Validasi tampilan berdasarkan UI/UX specification

---

## 🏗️ PHASE 1 — Project Setup

- [x]  **1.1 Setup Next.js App Router** — Folder `app/` berada di root `frontend/`
- [x]  **1.2 Setup React dan TypeScript** — Pemeriksaan TypeScript lolos
- [x]  **1.3 Setup Tailwind CSS v4** — Menggunakan `@import "tailwindcss"`
- [x]  **1.4 Install Lucide React** — Untuk ikon UI
- [x]  **1.5 Setup global CSS** — Design tokens EIGER
- [x]  **1.6 Setup root layout dan metadata** — `app/layout.tsx`
- [x]  **1.7 Setup folder src/** — Components, features, hooks, lib, services, types
- [x]  **1.8 Setup TypeScript path alias** — Alias `@/` sudah berfungsi
- [x]  *1.9 Verify `npx tsc --noEmit**` — Tidak ada error
- [x]  *1.10 Verify `npm run lint**` — Tidak ada error
- [x]  **1.11 Verify production build** — Build berhasil sebelumnya; ulangi setelah perubahan besar

---

## 🎨 PHASE 2 — Design System & Reusable UI

### 2.1 Design Tokens

- [x]  **Background** `#F7F5EF`
- [x]  **Surface** `#FFFFFF`
- [x]  **Primary** `#24352B`
- [x]  **Primary accent** `#3F5A43`
- [x]  **Secondary orange** `#B86F32`
- [x]  **Warm accent** `#C7A34A`
- [x]  **Text, muted, border, semantic colors**
- [x]  **Radius, shadow, spacing conventions**
- [x]  **Responsive and reduced-motion rules**

### 2.2 UI Components

- [x]  **Class utility** — `src/lib/utils.ts`
- [x]  **Button** — `src/components/ui/button.tsx`
- [x]  **Input** — `src/components/ui/input.tsx`
- [x]  **Card** — `src/components/ui/card.tsx`
- [x]  **Badge** — `src/components/ui/badge.tsx`
- [x]  **Progress Bar** — `src/components/ui/progress-bar.tsx`
- [x]  **Select** — `src/components/ui/select.tsx`
- [x]  **Textarea** — `src/components/ui/textarea.tsx`
- [x]  **Checkbox** — `src/components/ui/checkbox.tsx`
- [x]  Radio-group — `src/components/ui/radio-group.tsx`
- [x]  **Modal / Dialog** — `src/components/ui/dialog.tsx`
- [x]  **Dropdown Menu** — `src/components/ui/dropdown-menu.tsx`
- [x]  **Table** — `src/components/ui/table.tsx`
- [x]  **Skeleton Loading** — `src/components/ui/skeleton.tsx`
- [x]  **Empty State** — `src/components/ui/empty-state.tsx`
- [x]  **Pagination** — `src/components/ui/pagination.tsx`
- [x]  **Toast / Notification** — `src/components/ui/toast.tsx`
- [x]  Label — `src/components/ui/label.tsx`

---

## 🧩 PHASE 3 — Application Layout & Navigation

- [x]  3.1 Public website layout — `app/(public)/layout.tsx`
- [x]  3.2 Public navbar — `src/components/layout/navigation/public-navbar.tsx`
- [x]  3.3 Public footer — `src/components/layout/navigation/public-footer.tsx`
- [x]  3.4 Candidate dashboard layout — `app/(candidate)/candidate/layout.tsx`
- [x]  3.5 Candidate navigation / sidebar — `src/components/layout/navigation/candidate-navigation.tsx`
- [x]  3.6 Talent Acquisition dashboard layout — `app/(ta)/ta/layout.tsx`
- [x]  3.7 Talent Acquisition navigation / sidebar — `src/components/layout/navigation/ta-navigation.tsx`
- [x]  3.8 Active navigation state — `src/components/layout/navigation/`
- [x]  3.9 Responsive mobile navigation — `src/components/layout/`
- [x]  3.10 User profile menu — `src/components/layout/navigation/`
- [x]  3.11 Role-based navigation — `src/components/layout/navigation/`
- [x]  3.12 Responsive layout verification — Seluruh layout dan navigasi, mobile/tablet/desktop
- [x]  **3.13** Konfigurasi navigasi TA untuk seluruh modul — Overview hingga Analytics
- [x]  **3.14** Pemeriksaan route Assessments — `/ta/assessments` sudah dapat diakses
- [ ]  

---

## 🌐 PHASE 4 — Public Career Website

- [x]  **4.1 Career homepage** — Hero, CTA, nilai perusahaan
- [x]  **4.2 Featured jobs** — Lowongan pilihan
- [x]  **4.3 Job listing** — Daftar lowongan
- [x]  **4.4 Job search** — Pencarian judul atau kata kunci
- [x]  **4.5 Job filters** — Lokasi, kategori, tipe pekerjaan
- [x]  **4.6 Job detail** — Deskripsi, kualifikasi, tanggung jawab
- [x]  **4.7 Apply CTA** — Memerlukan autentikasi
- [x]  **4.8 Login page** — Form login
- [x]  **4.9 Registration page** — Pendaftaran kandidat
- [x]  **4.10 Form validation** — Required fields dan pesan error
- [x]  **4.11 Loading, error, empty states** — Seluruh kondisi UI
- [x]  **4.12 Mobile responsiveness** — Pengujian berbagai ukuran layar
- [x]  **4.13** Integrasi data lowongan dari backend
- [x]  **4.14** Verifikasi tautan antarhalaman publik

---

## 👤 PHASE 5 — Candidate Features

- [x]  **5.1 Candidate dashboard** — Ringkasan aktivitas
- [x]  **5.2 Candidate profile** — Informasi pribadi
- [x]  **5.3 Edit profile** — Update data kandidat
- [x]  **5.4 Education and experience** — Riwayat pendidikan dan pekerjaan
- [x]  **5.5 Skills and competencies** — Kompetensi kandidat

**—Job apply**

- [x]  **5.6 My Applications** — Daftar lamaran
- [x]  **5.7 Application detail** — Informasi lowongan dan lamaran
- [x]  **5.8 Application status timeline** — Tahapan seleksi
- [x]  **5.9 Apply for a job** — Submit lamaran

—**Talent Quest Assessment**

- [x]  **5.10 Talent Quest introduction** — Penjelasan assessment
- [x]  **5.11 Assessment instructions** — Aturan dan petunjuk
- [x]  **5.12 Assessment interface** — Pertanyaan dan jawaban
- [x]  **5.13 Assessment navigation** — Navigasi soal
- [x]  **5.14 Assessment submission** — Kirim jawaban
- [x]  **5.15 Assessment result** — Skor dan ringkasan hasil
- [ ]  **5.16 Competency progress** — Visualisasi perkembangan
- [ ]  **5.17 Assessment history** — Riwayat pengerjaan
- [ ]  **5.18 Candidate notifications** — Status dan informasi penting
- [ ]  **5.19** Integrasi assessment Candidate dengan backend
- [ ]  **5.20** Validasi alur pengerjaan dan pengiriman assessment
    
    

---

## 👔 PHASE 6 — Talent Acquisition Features

- [x]  **6.1 TA dashboard overview** — KPI dan ringkasan rekrutmen
- [x]  **6.2 Candidate management** — Tabel kandidat
- [x]  **6.3 Candidate search and filters** — Pencarian dan penyaringan
- [ ]  **6.4 Candidate detail** — Profil, kompetensi, lamaran
- [ ]  **6.5 Candidate screening** — Review dan update status
- [ ]  **6.6 Job management** — Daftar lowongan
- [ ]  **6.7** Verifikasi data kandidat dengan API backend

— **Job Management**

- [x]  **6.8 Create job** — Form pembuatan lowongan
- [ ]  **6.9 Edit job** — Pembaruan informasi
- [ ]  **6.10 Publish / close job** — Status publikasi
- [ ]  **6.11** Validasi aksi dan data lowongan dengan backend

—**Assessment & Challenge Management**

- [ ]  **6.12 Assessment management** — Daftar assessment
- [ ]  **6.13 Assessment builder** — Buat dan edit assessment
- [ ]  **6.14 Question management** — Pertanyaan dan pilihan jawaban
- [ ]  **6.15 Challenge builder** — Buat dan kelola challenge
- [ ]  **6.16** Assessment detail — Melihat struktur dan konfigurasi assessment
- [ ]  **6.17** Integrasi assessment management dengan API backend

— **Competency & User Management**

- [x]  **6.18 Competency management** — Kelola kompetensi
- [x]  **6.19 User management** — Kelola akun pengguna
- [ ]  **6.20** Create, edit, dan delete competency — Sesuai dukungan API
- [ ]  **6.21** User detail dan pengelolaan role
- [ ]  **6.22** Validasi permissions untuk role Candidate dan Talent Acquisition

—Talentpool and analytics

- [x]  **6.23** Talent pool — Halaman `/ta/talent-pool` dibuat
- [x]  **6.24** Analytics dashboard — Halaman `/ta/analytics` dibuat
- [x]  **6.25** Period selector pada Analytics — Kontrol periode laporan
- [x]  **6.26** Export laporan CSV — Aksi export pada Analytics
- [ ]  **6.27** Charts and visualizations — Visualisasi dengan data backend
- [ ]  **6.28** Verifikasi perhitungan KPI dan metrik rekrutmen
- [ ]  **6.29** Export CSV berdasarkan data aktual
- [ ]  **6.30** Export PDF — Jika didukung backend atau implementasi frontend
- [ ]  **6.31** Pagination dan table actions — Konsisten pada tabel yang memerlukannya
- [ ]  **6.32** Loading, error, empty, dan success states pada seluruh modul TA
- [ ]  **6.33** Integrasi seluruh halaman TA dengan API backend
- [ ]  **6.34** Pengujian end-to-end alur kerja Talent Acquisition

---

## 🔌 PHASE 7 — API Integration

### 7.1 API Foundation

- [x]  **7.1 Configure API base URL** — Environment variable `NEXT_PUBLIC_API_URL`
- [x]  **7.2 Create .env.local** — Konfigurasi lokal dev port 5000
- [x]  **7.3 Create API client** — `src/lib/api-client.ts`
- [x]  **7.4 Create API response types** — `src/types/auth.ts`
- [x]  **7.5 Standarisasi error handling dan response API** — Envelope unwrapping dan token handling
- [ ]  7.6 Verifikasi kontrak API berdasarkan dokumentasi Postman

### 7.2 Services

- [x]  **7.7 Auth service** — `src/lib/api/auth.ts`
- [ ]  7.8 Jobs service — src/services/jobs.service.ts
- [ ]  7.9 Applications service — src/services/applications.service.ts
- [ ]  7.10 Assessments service — src/services/assessments.service.ts
- [ ]  7.11 Candidates service — src/services/candidates.service.ts
- [ ]  7.12 Competencies service — src/services/competencies.service.ts
- [ ]  7.13 Challenges service — src/services/challenges.service.ts
- [ ]  7.14 Users service — src/services/users.service.ts
- [ ]  7.15 Talent pool service — src/services/talent-pool.service.ts
- [ ]  7.16 Analytics service — src/services/analytics.service.ts

### 7.3 Connect Frontend to Backend

- [ ]  7.17 Connect jobs listing and detail
- [ ]  7.18 Connect application submission
- [ ]  7.19 Connect assessment flow
- [ ]  7.20 Connect candidate management
- [ ]  7.21 Connect job management
- [ ]  7.22 Connect assessment, competency, challenge, dan user management
- [ ]  7.23 Connect talent pool
- [ ]  7.24 Connect TA dashboard dan Analytics
- [ ]  7.25 Handle loading dan API errors secara konsisten
- [ ]  7.26 Handle expired / invalid token
- [ ]  7.27 Verify API contracts dengan Postman
- [ ]  7.28 Ganti seluruh data demo dengan data API pada fitur yang sudah terintegrasi

---

## 🔐 PHASE 8 — Authentication & Authorization

- [x]  **8.1 Login integration** — API login terhubung via `LoginForm` & `auth-context`
- [x]  **8.2 Registration integration** — API register terhubung via `RegisterForm` & `auth-context`
- [x]  **8.3 Token/session handling** — Key `eiger_access_token` & auto-hydrate `GET /api/auth/me`
- [x]  **8.4 Logout** — Hapus token dan redirect ke `/login` pada kedua layout shell
- [x]  **8.5 Protected Candidate routes** — `CandidateRouteGuard` di `app/(candidate)/candidate/layout.tsx`
- [x]  **8.6 Protected Talent Acquisition routes** — `TARouteGuard` di `app/(ta)/ta/layout.tsx`
- [x]  **8.7 Role-based UI permissions** — CANDIDATE dan TALENT_ACQUISITION navigation & shell rendering
- [ ]  8.8 Unauthorized page/state — Akses ditolak
- [x]  **8.9 Redirect after login** — Berdasarkan role (`/candidate` vs `/ta`) dan query parameter redirect
- [ ]  8.10 Verifikasi authorization pada backend
- [ ]  8.11 Pastikan pembatasan akses tidak hanya mengandalkan UI frontend
- [ ]  8.12 Uji akses langsung ke URL untuk kedua role

---

## 🧪 PHASE 9 — Quality Assurance

### 9.1 Code Quality

- [ ]  9.1 TypeScript check — `npx tsc --noEmit`
- [ ]  9.2 ESLint check — `npm run lint`
- [ ]  9.3 Production build — `npm run build`
- [ ]  9.4 Perbaiki seluruh error dan warning yang relevan

### 9.2 Functional Testing

- [ ]  9.5 Test login dan logout
- [ ]  9.6 Test candidate journey — Register → Profile → Apply → Assessment
- [ ]  9.7 Test TA journey — Login → Manage Jobs → Review Candidates
- [ ]  9.8 Test assessment management
- [ ]  9.9 Test competency, user, dan talent pool management
- [ ]  9.10 Test Analytics dan export CSV
- [ ]  9.11 Test form validation — Input valid dan tidak valid
- [ ]  9.12 Test API error handling — 4xx, 5xx, dan network errors
- [ ]  9.13 Test loading, empty, success, dan error states

### 9.3 UI & Accessibility

- [ ]  9.14 Test responsive layout — Mobile, tablet, desktop
- [ ]  9.15 Test keyboard accessibility — Focus dan navigasi keyboard
- [ ]  9.16 Verify semantic HTML — Labels, headings, buttons
- [ ]  9.17 Verify role-based access — Candidate vs Talent Acquisition
- [ ]  9.18 Verify browser console — Tidak ada error yang belum ditangani
- [ ]  9.19 Verify seluruh route — Tidak ada 404 yang tidak disengaja
- [ ]  9.20 Verifikasi konsistensi UI terhadap desain EIGER Talent Quest

---

## 🚀 PHASE 10 — Deployment & Documentation

- [ ]  10.1 Finalize environment variables — Development dan production
- [ ]  10.2 Configure production API URL
- [ ]  10.3 Configure hosting dan deployment platform
- [ ]  10.4 Verify production build sebelum deployment
- [ ]  10.5 Deploy frontend dan catat URL deployment
- [ ]  10.6 Verify production API integration — Smoke testing
- [ ]  10.7 Update README — Setup dan cara menjalankan
- [ ]  10.8 Update FRONTEND_PROGRESS.md
- [ ]  10.9 Dokumentasikan struktur folder dan fitur
- [ ]  10.10 Dokumentasikan environment variables tanpa membocorkan secret
- [ ]  10.11 Document known issues jika masih ada
- [ ]  10.12 Final handover checklist — Source code dan dokumentasi

---

## ✅ Final Completion Criteria Checklist

- [ ]  Seluruh halaman prioritas sudah diimplementasikan.
- [ ]  Seluruh route utama dapat diakses tanpa 404 yang tidak disengaja.
- [ ]  Fitur utama terhubung ke API backend.
- [ ]  Data demo sudah diganti dengan data API pada fitur yang siap digunakan.
- [ ]  Authentication dan authorization berjalan sesuai role.
- [ ]  Loading, error, empty, dan success states ditangani.
- [ ]  Responsive layout sudah diverifikasi.
- [ ]  TypeScript, ESLint, dan production build lolos.
- [ ]  Alur Candidate dan Talent Acquisition telah diuji.
- [ ]  Export laporan menghasilkan data yang benar.
- [ ]  Dokumentasi setup dan environment tersedia.
- [ ]  Frontend siap untuk deployment dan handover.
- [ ]  

---




# 1. Backend Implementation Checklist

## AUTHENTICATION

```
AUTHENTICATION
├── Register Account (POST /api/auth/register)              ✅
├── Login & Generate JWT (POST /api/auth/login)             ✅
└── Get Current User (GET /api/auth/me)                    ✅
```

Detail:

- Register akun dan validasi email.
- Login menggunakan kredensial dan menghasilkan JWT.
- Mendapatkan identitas user yang sedang login.
- Autentikasi token digunakan untuk endpoint yang dilindungi.

## JOB MANAGEMENT

```
JOB MANAGEMENT
├── List Jobs (GET /api/jobs)                              ✅
├── Job Detail (GET /api/jobs/:id)                         ✅
├── Create Job (POST /api/jobs)                            ✅
├── Update Job (PATCH /api/jobs/:id)                       ✅
├── Update Job Status (PATCH /api/jobs/:id/status)         ✅
└── Delete Job (DELETE /api/jobs/:id)                      ✅
```

Detail:

- Menampilkan daftar lowongan dan detail lowongan.
- Membuat lowongan dengan informasi pekerjaan.
- Memperbarui informasi dan status lowongan.
- Menghapus lowongan.
- Operasi manajemen lowongan dibatasi untuk role Talent Acquisition (TA); daftar dan detail lowongan bersifat public.

## APPLICATION MANAGEMENT

```
APPLICATION MANAGEMENT
├── Create Application (POST /api/applications)             ✅
├── My Applications (GET /api/applications/my)             ✅
├── Application Detail (GET /api/applications/:id)          ✅
├── All Applications - TA (GET /api/applications)           ✅
└── Update Application Status                               ✅
    └── PATCH /api/applications/:id/status
```

Detail:

- Candidate dapat melamar lowongan.
- Candidate dapat melihat daftar lamarannya sendiri.
- Pengguna terautentikasi dapat mengakses detail lamaran sesuai aturan akses pada implementasi.
- TA dapat melihat seluruh lamaran dan memperbarui tahap rekrutmen.

Tahapan lamaran yang tersedia:

```
SUBMITTED
    ↓
ASSESSMENT_COMPLETED
    ↓
UNDER_REVIEW
    ↓
INTERVIEW
    ↓
FINAL_DECISION
```

`REJECTED` juga tersedia sebagai status lamaran.

## ASSESSMENT MANAGEMENT

```
ASSESSMENT MANAGEMENT
├── Published Assessment
│   └── GET /api/assessments/published/:id                ✅
├── List Assessments (GET /api/assessments)                ✅
├── Assessment Detail (GET /api/assessments/:id)           ✅
├── Create Assessment (POST /api/assessments)              ✅
├── Update Assessment (PATCH /api/assessments/:id)         ✅
├── Update Assessment Status                               ✅
│   └── PATCH /api/assessments/:id/status
└── Delete Assessment (DELETE /api/assessments/:id)        ✅
```

Detail:

- TA dapat membuat dan mengelola assessment.
- TA dapat memperbarui konten dan status assessment.
- Candidate dapat mengambil assessment yang dipublikasikan melalui endpoint khusus.
- Assessment terhubung dengan challenge dan competency melalui relasi yang sudah tersedia di schema.

## ASSESSMENT ATTEMPT

```
ASSESSMENT ATTEMPT
├── Start Assessment (POST /api/assessment-attempts)        ✅
├── Attempt Detail (GET /api/assessment-attempts/:id)       ✅
├── Submit Response                                        ✅
│   └── POST /api/assessment-attempts/:id/responses
├── Complete Assessment                                    ✅
│   └── POST /api/assessment-attempts/:id/complete
└── Candidate Result                                       ✅
    └── GET /api/assessment-attempts/:id/result
```

Detail:

- Candidate memulai assessment dan memperoleh attempt.
- Candidate melihat detail attempt.
- Jawaban challenge disimpan selama assessment berlangsung.
- Attempt dapat diselesaikan untuk menghasilkan hasil assessment.
- Candidate dapat melihat hasil attempt miliknya.

## ASSESSMENT RESULT

```
ASSESSMENT RESULT
├── Candidate Assessment Result                            ✅
│   └── GET /api/assessment-attempts/:id/result
└── TA Application Assessment Result                       ✅
    └── GET /api/assessment-results/applications/:applicationId
```

Detail:

- Menyediakan hasil assessment untuk candidate.
- TA dapat melihat hasil assessment berdasarkan lamaran.
- Hasil mencakup skor keseluruhan dan penilaian competency sesuai implementasi.

Catatan: endpoint hasil candidate juga tercatat pada modul Assessment Attempt. Itu merupakan satu endpoint yang sama, bukan endpoint tambahan.

## CANDIDATE MANAGEMENT

```
CANDIDATE MANAGEMENT
├── Candidate List - TA (GET /api/candidates)              ✅
├── Candidate Detail - TA (GET /api/candidates/:id)        ✅
├── Candidate Profile (GET /api/candidates/profile)        ✅
└── Update Candidate Profile                               ✅
    └── PATCH /api/candidates/profile
```

Detail:

- TA dapat melihat daftar kandidat.
- TA dapat melihat detail kandidat, profil, lamaran, riwayat tahapan, dan aktivitas yang disediakan implementasi.
- Candidate dapat melihat dan memperbarui profilnya sendiri.
- Respons detail kandidat telah disanitasi untuk menghindari kebocoran password hash dan data jawaban mentah.

## COMPETENCY MANAGEMENT

```
COMPETENCY MANAGEMENT
├── List Competencies (GET /api/competencies)               ✅
├── Competency Detail (GET /api/competencies/:id)           ✅
├── Create Competency (POST /api/competencies)              ✅
├── Update Competency (PATCH /api/competencies/:id)         ✅
└── Delete Competency (DELETE /api/competencies/:id)        ✅
```

Detail:

- Mengelola daftar dan detail competency.
- Membuat serta memperbarui competency.
- Menghapus competency yang belum digunakan.
- Relasi competency dengan job mapping, assessment mapping, dan challenge diperhitungkan dalam proteksi penghapusan.

## CHALLENGE MANAGEMENT

```
CHALLENGE MANAGEMENT
├── List Challenges (GET /api/challenges)                   ✅
├── Challenge Detail (GET /api/challenges/:id)               ✅
├── Create Challenge (POST /api/challenges)                  ✅
├── Update Challenge (PATCH /api/challenges/:id)             ✅
├── Delete Challenge (DELETE /api/challenges/:id)            ✅
├── Add Challenge Option (POST /api/challenges/:id/options)  ✅
├── Update Challenge Option                                  ✅
│   └── PATCH /api/challenges/:id/options/:optionId
└── Delete Challenge Option                                  ✅
    └── DELETE /api/challenges/:id/options/:optionId
```

Detail:

- TA dapat mengelola challenge sebagai bagian dari assessment builder.
- Daftar challenge mendukung filter `assessmentId` opsional.
- Detail challenge menyediakan informasi competency dan options.
- TA dapat menambah, mengubah, dan menghapus option challenge.

## USER MANAGEMENT

```
USER MANAGEMENT
├── List Users (GET /api/users)                             ✅
├── User Detail (GET /api/users/:id)                        ✅
├── Create User (POST /api/users)                           ✅
├── Update User (PATCH /api/users/:id)                     ✅
├── Update User Status (PATCH /api/users/:id/status)       ✅
└── Delete User (DELETE /api/users/:id)                    ✅
```

Detail:

- TA dapat melihat dan mengelola akun.
- Pembuatan akun menggunakan password hashing.
- Pembaruan dapat mencakup email dan role.
- Status user dapat diperbarui.
- Respons user disanitasi agar password hash tidak ikut dikirim.

## TALENT POOL MANAGEMENT

```
TALENT POOL MANAGEMENT
├── List Talent Pool (GET /api/talent-pool)                 ✅
├── Talent Pool Detail (GET /api/talent-pool/:id)           ✅
├── Add Candidate (POST /api/talent-pool)                   ✅
├── Update Talent Pool (PATCH /api/talent-pool/:id)         ✅
└── Remove Candidate (DELETE /api/talent-pool/:id)          ✅
```

Detail:

- TA dapat memasukkan kandidat ke talent pool.
- TA dapat melihat daftar dan detail kandidat dalam talent pool.
- Status, notes, dan tags dapat diperbarui.
- Kandidat dapat dikeluarkan dari talent pool.
- Status talent pool meliputi `ACTIVE`, `HIRED`, dan `INACTIVE`.

## ANALYTICS / DASHBOARD

```
ANALYTICS / DASHBOARD
├── Dashboard Overview (GET /api/analytics/dashboard)       ✅
├── Application Analytics                                   ✅
│   └── GET /api/analytics/applications
├── Recruitment Analytics                                   ✅
│   └── GET /api/analytics/recruitment
├── Assessment Analytics                                    ✅
│   └── GET /api/analytics/assessments
└── Talent Pool Analytics                                   ✅
    └── GET /api/analytics/talent-pool
```

Detail:

- Dashboard Overview: ringkasan kandidat, lowongan, lamaran, assessment, attempts, dan talent pool.
- Application Analytics: total lamaran dan distribusi status.
- Recruitment Analytics: statistik lowongan berdasarkan status dan tahapan lamaran.
- Assessment Analytics: jumlah assessment, status attempt, dan rata-rata skor.
- Talent Pool Analytics: jumlah kandidat dalam talent pool berdasarkan status.

Seluruh endpoint analytics dibatasi untuk TA dan telah diuji dengan token TA, tanpa token, serta token Candidate.

No.	Endpoint	Role	Status	Keterangan / Fungsi
1	POST /api/auth/register	Public	✅	Registrasi akun
2	POST /api/auth/login	Public	✅	Login dan mendapatkan JWT
3	GET /api/auth/me	Auth	✅	Mendapatkan data user yang sedang login
4	GET /api/jobs	Public	✅	Melihat daftar lowongan
5	GET /api/jobs/:id	Public	✅	Melihat detail lowongan
6	POST /api/jobs	TA	✅	Membuat lowongan
7	PATCH /api/jobs/:id	TA	✅	Mengubah data lowongan
8	PATCH /api/jobs/:id/status	TA	✅	Mengubah status lowongan
9	DELETE /api/jobs/:id	TA	✅	Menghapus lowongan
10	POST /api/applications	Candidate	✅	Melamar lowongan
11	GET /api/applications/my	Candidate	✅	Melihat lamaran milik candidate
12	GET /api/applications/:id	Auth	✅	Melihat detail lamaran
13	GET /api/applications	TA	✅	Melihat seluruh lamaran
14	PATCH /api/applications/:id/status	TA	✅	Mengubah status/tahapan lamaran
15	GET /api/assessments/published/:id	Candidate	✅	Mengambil assessment yang dipublikasikan untuk candidate
16	GET /api/assessments	TA	✅	Melihat daftar assessment
17	GET /api/assessments/:id	TA	✅	Melihat detail assessment
18	POST /api/assessments	TA	✅	Membuat assessment
19	PATCH /api/assessments/:id	TA	✅	Mengubah assessment
20	PATCH /api/assessments/:id/status	TA	✅	Mengubah status assessment
21	DELETE /api/assessments/:id	TA	✅	Menghapus assessment
22	POST /api/assessment-attempts	Candidate	✅	Memulai assessment
23	GET /api/assessment-attempts/:id	Candidate	✅	Melihat detail attempt/assessment yang sedang dikerjakan
24	POST /api/assessment-attempts/:id/responses	Candidate	✅	Menyimpan jawaban challenge
25	POST /api/assessment-attempts/:id/complete	Candidate	✅	Menyelesaikan assessment
26	GET /api/assessment-attempts/:id/result	Candidate	✅	Melihat hasil assessment
27	GET /api/assessment-results/applications/:applicationId	TA	✅	Melihat hasil assessment berdasarkan lamaran
28	GET /api/candidates	TA	✅	Melihat daftar kandidat
29	GET /api/candidates/:id	TA	✅	Melihat detail kandidat, profil, lamaran, stage history, dan aktivitas
30	GET /api/candidates/profile	Candidate	✅	Melihat profil candidate sendiri
31	PATCH /api/candidates/profile	Candidate	✅	Mengubah profil candidate sendiri
32	GET /api/competencies	TA	✅	Melihat daftar competency
33	GET /api/competencies/:id	TA	✅	Melihat detail competency dan jumlah relasinya
34	POST /api/competencies	TA	✅	Membuat competency baru
35	PATCH /api/competencies/:id	TA	✅	Mengubah competency
36	DELETE /api/competencies/:id	TA	✅	Menghapus competency yang belum digunakan
37	GET /api/challenges	TA	✅	Melihat daftar challenge, dengan filter assessment opsional
38	GET /api/challenges/:id	TA	✅	Melihat detail challenge beserta competency dan options
39	POST /api/challenges	TA	✅	Membuat challenge
40	PATCH /api/challenges/:id	TA	✅	Mengubah data challenge
41	DELETE /api/challenges/:id	TA	✅	Menghapus challenge
42	POST /api/challenges/:id/options	TA	✅	Menambahkan option ke challenge
43	PATCH /api/challenges/:id/options/:optionId	TA	✅	Mengubah option challenge
44	DELETE /api/challenges/:id/options/:optionId	TA	✅	Menghapus option challenge
45	GET /api/users	TA	✅	Melihat daftar seluruh user
46	GET /api/users/:id	TA	✅	Melihat detail user
47	POST /api/users	TA	✅	Membuat user
48	PATCH /api/users/:id	TA	✅	Mengubah email/role user
49	PATCH /api/users/:id/status	TA	✅	Mengubah status user
50	DELETE /api/users/:id	TA	✅	Menghapus user
51	GET /api/talent-pool	TA	✅	Melihat daftar kandidat dalam talent pool
52	GET /api/talent-pool/:id	TA	✅	Melihat detail kandidat dalam talent pool
53	POST /api/talent-pool	TA	✅	Menambahkan kandidat ke talent pool
54	PATCH /api/talent-pool/:id	TA	✅	Mengubah status, notes, atau tags talent pool
55	DELETE /api/talent-pool/:id	TA	✅	Menghapus kandidat dari talent pool
56	GET /api/analytics/dashboard	TA	✅	Mendapatkan ringkasan statistik dashboard
57	GET /api/analytics/applications	TA	✅	Mendapatkan statistik total lamaran dan distribusi status
58	GET /api/analytics/recruitment	TA	✅	Mendapatkan statistik lowongan dan tahapan rekrutmen
59	GET /api/analytics/assessments	TA	✅	Mendapatkan statistik assessment, attempts, dan rata-rata skor
60	GET /api/analytics/talent-pool	TA	✅	Mendapatkan statistik kandidat talent pool berdasarkan status