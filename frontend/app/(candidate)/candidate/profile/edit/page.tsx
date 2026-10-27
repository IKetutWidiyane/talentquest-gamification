"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FloppyDisk,
  UserCircle,
  Envelope,
  Phone,
  MapPin,
  CalendarBlank,
  IdentificationCard,
} from "@phosphor-icons/react";

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  birthDate: string;
  gender: string;
  location: string;
  address: string;
  summary: string;
};

const initialProfile: ProfileForm = {
  fullName: "Candidate Demo",
  email: "candidate@example.com",
  phone: "",
  headline: "Candidate EIGER Talent Quest",
  birthDate: "",
  gender: "",
  location: "",
  address: "",
  summary: "",
};

export default function EditCandidateProfilePage() {
  const [form, setForm] = useState<ProfileForm>(initialProfile);
  const [message, setMessage] = useState("");

  function updateField<K extends keyof ProfileForm>(
    field: K,
    value: ProfileForm[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.fullName.trim() || !form.email.trim()) {
      setMessage("Nama lengkap dan email wajib diisi.");
      return;
    }

    // Demo: data hanya tersedia di state halaman ini.
    setMessage("Perubahan berhasil disiapkan. Integrasi API belum dilakukan.");
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link
          href="/candidate/profile"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#0B1B3D]"
        >
          <ArrowLeft size={17} />
          Kembali ke Profil
        </Link>

        <p className="mb-1 text-sm font-medium text-amber-600">
          Candidate / Profile
        </p>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Edit Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Lengkapi informasi pribadi agar tim Talent Acquisition dapat
          mengenalmu lebih baik.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <UserCircle size={23} weight="duotone" />
            </span>
            <div>
              <h2 className="font-bold text-slate-900">
                Informasi Pribadi
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Informasi dasar akun kandidat.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Nama lengkap <span className="text-red-500">*</span>
              <input
                required
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder="Masukkan nama lengkap"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Email <span className="text-red-500">*</span>
              <span className="relative block">
                <Envelope
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="nama@email.com"
                  className={`${inputClass} pl-10`}
                />
              </span>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Nomor telepon
              <span className="relative block">
                <Phone
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className={`${inputClass} pl-10`}
                />
              </span>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Tanggal lahir
              <span className="relative block">
                <CalendarBlank
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => updateField("birthDate", e.target.value)}
                  className={`${inputClass} pl-10`}
                />
              </span>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Jenis kelamin
              <select
                value={form.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className={inputClass}
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Male">Laki-laki</option>
                <option value="Female">Perempuan</option>
                <option value="Prefer not to say">Tidak ingin menyebutkan</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Kota domisili
              <span className="relative block">
                <MapPin
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Kota tempat tinggal"
                  className={`${inputClass} pl-10`}
                />
              </span>
            </label>

            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Headline profesional
              <input
                value={form.headline}
                onChange={(e) => updateField("headline", e.target.value)}
                placeholder="Contoh: Frontend Developer"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Alamat
              <textarea
                rows={2}
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Masukkan alamat tempat tinggal"
                className={`${inputClass} resize-y`}
              />
            </label>

            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Tentang saya
              <textarea
                rows={5}
                value={form.summary}
                onChange={(e) => updateField("summary", e.target.value)}
                placeholder="Ceritakan latar belakang, minat, dan tujuan kariermu..."
                className={`${inputClass} resize-y`}
              />
            </label>
          </div>
        </section>

        {message && (
          <p
            role="status"
            className={`rounded-xl px-4 py-3 text-sm ${
              message.startsWith("Perubahan")
                ? "bg-amber-50 text-amber-800"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link
            href="/candidate/profile"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Batal
          </Link>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <FloppyDisk size={18} weight="bold" />
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}