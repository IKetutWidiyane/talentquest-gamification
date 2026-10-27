"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash,
  GraduationCap,
  Briefcase,
} from "@phosphor-icons/react";

type Education = {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
};

type Experience = {
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
};

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

export default function CandidateExperiencePage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [message, setMessage] = useState("");

  const [educationForm, setEducationForm] = useState({
    institution: "",
    degree: "",
    field: "",
    startYear: "",
    endYear: "",
  });

  const [experienceForm, setExperienceForm] = useState({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    current: false,
  });

  function addEducation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setEducation((current) => [
      ...current,
      { id: Date.now(), ...educationForm },
    ]);

    setEducationForm({
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
    });
    setMessage("Riwayat pendidikan ditambahkan ke daftar sementara.");
  }

  function addExperience(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setExperience((current) => [
      ...current,
      {
        id: Date.now(),
        ...experienceForm,
        endDate: experienceForm.current ? "" : experienceForm.endDate,
      },
    ]);

    setExperienceForm({
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
    });
    setMessage("Pengalaman kerja ditambahkan ke daftar sementara.");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <Link
          href="/candidate/profile"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0B1B3D]"
        >
          <ArrowLeft size={17} />
          Kembali ke Profil
        </Link>
        <p className="mb-1 text-sm font-medium text-amber-600">
          Candidate / Profile
        </p>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Education & Experience
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Tambahkan riwayat pendidikan dan pengalaman profesionalmu.
        </p>
      </header>

      {message && (
        <p role="status" className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {message}
        </p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-xl bg-amber-50 p-3 text-amber-600">
            <GraduationCap size={24} weight="duotone" />
          </span>
          <div>
            <h2 className="font-bold text-slate-900">Education</h2>
            <p className="mt-1 text-sm text-slate-500">
              Riwayat pendidikan formal.
            </p>
          </div>
        </div>

        <form onSubmit={addEducation} className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Institusi pendidikan *
            <input
              required
              value={educationForm.institution}
              onChange={(e) =>
                setEducationForm({ ...educationForm, institution: e.target.value })
              }
              placeholder="Nama universitas atau sekolah"
              className={inputClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Jenjang pendidikan *
            <select
              required
              value={educationForm.degree}
              onChange={(e) =>
                setEducationForm({ ...educationForm, degree: e.target.value })
              }
              className={inputClass}
            >
              <option value="">Pilih jenjang</option>
              <option value="SMA/SMK">SMA/SMK</option>
              <option value="D1">D1</option>
              <option value="D3">D3</option>
              <option value="D4/S1">D4/S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
              <option value="Other">Lainnya</option>
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Jurusan / bidang studi *
            <input
              required
              value={educationForm.field}
              onChange={(e) =>
                setEducationForm({ ...educationForm, field: e.target.value })
              }
              placeholder="Contoh: Sistem Informasi"
              className={inputClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Tahun mulai *
            <input
              required
              type="number"
              min="1950"
              max="2100"
              value={educationForm.startYear}
              onChange={(e) =>
                setEducationForm({ ...educationForm, startYear: e.target.value })
              }
              placeholder="2022"
              className={inputClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Tahun selesai
            <input
              type="number"
              min={educationForm.startYear || "1950"}
              max="2100"
              value={educationForm.endYear}
              onChange={(e) =>
                setEducationForm({ ...educationForm, endYear: e.target.value })
              }
              placeholder="2026 (kosong jika masih berjalan)"
              className={inputClass}
            />
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0B1B3D] px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus size={18} weight="bold" />
              Tambah Pendidikan
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-3">
          {education.map((item) => (
            <article
              key={item.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-4"
            >
              <div>
                <h3 className="font-semibold text-slate-900">{item.institution}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {item.degree} · {item.field}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.startYear} – {item.endYear || "Sekarang"}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setEducation((current) => current.filter((entry) => entry.id !== item.id))
                }
                aria-label={`Hapus pendidikan ${item.institution}`}
                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash size={18} />
              </button>
            </article>
          ))}

          {education.length === 0 && (
            <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
              Belum ada riwayat pendidikan yang ditambahkan.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-xl bg-amber-50 p-3 text-amber-600">
            <Briefcase size={24} weight="duotone" />
          </span>
          <div>
            <h2 className="font-bold text-slate-900">Work Experience</h2>
            <p className="mt-1 text-sm text-slate-500">
              Pengalaman kerja, magang, freelance, atau proyek profesional.
            </p>
          </div>
        </div>

        <form onSubmit={addExperience} className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Nama perusahaan / organisasi *
            <input
              required
              value={experienceForm.company}
              onChange={(e) =>
                setExperienceForm({ ...experienceForm, company: e.target.value })
              }
              placeholder="Nama perusahaan atau organisasi"
              className={inputClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Posisi *
            <input
              required
              value={experienceForm.position}
              onChange={(e) =>
                setExperienceForm({ ...experienceForm, position: e.target.value })
              }
              placeholder="Contoh: Frontend Developer"
              className={inputClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Tanggal mulai *
            <input
              required
              type="month"
              value={experienceForm.startDate}
              onChange={(e) =>
                setExperienceForm({ ...experienceForm, startDate: e.target.value })
              }
              className={inputClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Tanggal selesai
            <input
              type="month"
              disabled={experienceForm.current}
              value={experienceForm.endDate}
              onChange={(e) =>
                setExperienceForm({ ...experienceForm, endDate: e.target.value })
              }
              className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-100`}
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-600 sm:col-span-2">
            <input
              type="checkbox"
              checked={experienceForm.current}
              onChange={(e) =>
                setExperienceForm({
                  ...experienceForm,
                  current: e.target.checked,
                  endDate: e.target.checked ? "" : experienceForm.endDate,
                })
              }
              className="h-4 w-4 accent-amber-600"
            />
            Saya masih bekerja di posisi ini
          </label>

          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Deskripsi pekerjaan
            <textarea
              rows={4}
              value={experienceForm.description}
              onChange={(e) =>
                setExperienceForm({ ...experienceForm, description: e.target.value })
              }
              placeholder="Jelaskan tanggung jawab, kontribusi, atau pencapaian..."
              className={`${inputClass} resize-y`}
            />
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0B1B3D] px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus size={18} weight="bold" />
              Tambah Pengalaman
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-3">
          {experience.map((item) => (
            <article
              key={item.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-4"
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900">{item.position}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.company}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.startDate} – {item.current ? "Sekarang" : item.endDate || "Belum diisi"}
                </p>
                {item.description && (
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() =>
                  setExperience((current) =>
                    current.filter((entry) => entry.id !== item.id),
                  )
                }
                aria-label={`Hapus pengalaman ${item.position}`}
                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash size={18} />
              </button>
            </article>
          ))}

          {experience.length === 0 && (
            <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
              Belum ada pengalaman kerja yang ditambahkan.
            </p>
          )}
        </div>
      </section>

      <p className="text-xs text-slate-400">
        Demo mode — data pendidikan dan pengalaman belum tersimpan permanen.
      </p>
    </div>
  );
}