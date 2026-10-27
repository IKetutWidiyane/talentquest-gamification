"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  BrainIcon,
  CodeIcon,
  UsersIcon,
  TargetIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";

type SkillCategory = "Technical" | "Core" | "Leadership";

type CandidateSkill = {
  id: number;
  name: string;
  category: SkillCategory;
  level: string;
};

const categoryStyles: Record<SkillCategory, string> = {
  Technical: "bg-amber-50 text-amber-700",
  Core: "bg-emerald-50 text-emerald-700",
  Leadership: "bg-slate-100 text-slate-700",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

export default function CandidateSkillsPage() {
  const [skills, setSkills] = useState<CandidateSkill[]>([
    { id: 1, name: "JavaScript", category: "Technical", level: "Intermediate" },
    { id: 2, name: "React", category: "Technical", level: "Intermediate" },
    { id: 3, name: "Problem Solving", category: "Core", level: "Advanced" },
  ]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("Technical");
  const [level, setLevel] = useState("Beginner");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  const technicalCount = skills.filter(
    (skill) => skill.category === "Technical",
  ).length;

  const coreCount = skills.filter(
    (skill) => skill.category === "Core",
  ).length;

  const leadershipCount = skills.filter(
    (skill) => skill.category === "Leadership",
  ).length;

  const filteredSkills = useMemo(
    () =>
      skills.filter(
        (skill) => filter === "All" || skill.category === filter,
      ),
    [skills, filter],
  );

  function addSkill(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = name.trim();

    if (!normalizedName) {
      setMessage("Nama skill wajib diisi.");
      return;
    }

    if (
      skills.some(
        (skill) =>
          skill.name.toLowerCase() === normalizedName.toLowerCase(),
      )
    ) {
      setMessage("Skill tersebut sudah ada di daftar.");
      return;
    }

    setSkills((current) => [
      ...current,
      {
        id: Date.now(),
        name: normalizedName,
        category,
        level,
      },
    ]);

    setName("");
    setMessage("Skill berhasil ditambahkan ke daftar sementara.");
  }

  function removeSkill(id: number) {
    setSkills((current) => current.filter((skill) => skill.id !== id));
    setMessage("Skill dihapus dari daftar sementara.");
  }

  const stats = [
    { label: "Total Skills", value: skills.length, icon: TargetIcon },
    { label: "Technical Skills", value: technicalCount, icon: CodeIcon },
    { label: "Core Skills", value: coreCount, icon: BrainIcon },
    { label: "Leadership Skills", value: leadershipCount, icon: UsersIcon },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <Link
          href="/candidate/profile"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#0B1B3D]"
        >
          <ArrowLeftIcon size={17} />
          Kembali ke Profil
        </Link>

        <p className="mb-1 text-sm font-medium text-amber-600">
          Candidate / Profile
        </p>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Skills & Competencies
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Tunjukkan keahlian dan kompetensi yang mendukung potensi kariermu.
        </p>
      </header>

      {message && (
        <p
          role="status"
          className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500">{label}</p>
              <span className="rounded-xl bg-amber-50 p-2 text-amber-600">
                <Icon size={19} weight="duotone" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">
              {value}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-xl bg-amber-50 p-3 text-amber-600">
            <ShieldCheckIcon size={23} weight="duotone" />
          </span>
          <div>
            <h2 className="font-bold text-slate-900">Add a Skill</h2>
            <p className="mt-1 text-sm text-slate-500">
              Tambahkan keahlian dan tingkat penguasaanmu.
            </p>
          </div>
        </div>

        <form onSubmit={addSkill} className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Nama skill *
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Contoh: TypeScript, Communication, Leadership"
              className={inputClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Kategori
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as SkillCategory)
              }
              className={inputClass}
            >
              <option value="Technical">Technical</option>
              <option value="Core">Core</option>
              <option value="Leadership">Leadership</option>
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Tingkat penguasaan
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className={inputClass}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <PlusIcon size={18} weight="bold" />
              Add Skill
            </button>
          </div>
        </form>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">My Skills</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredSkills.length} skills displayed
            </p>
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter skills by category"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500"
          >
            <option value="All">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Core">Core</option>
            <option value="Leadership">Leadership</option>
          </select>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredSkills.map((skill) => (
            <article
              key={skill.id}
              className="flex flex-col gap-3 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="rounded-xl bg-slate-100 p-3 text-[#0B1B3D]">
                  {skill.category === "Technical" ? (
                    <CodeIcon size={21} weight="duotone" />
                  ) : skill.category === "Core" ? (
                    <BrainIcon size={21} weight="duotone" />
                  ) : (
                    <UsersIcon size={21} weight="duotone" />
                  )}
                </span>

                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900">
                    {skill.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyles[skill.category]}`}
                    >
                      {skill.category}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {skill.level}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                aria-label={`Remove ${skill.name}`}
                className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:self-center"
              >
                <TrashIcon size={16} />
                Remove
              </button>
            </article>
          ))}

          {filteredSkills.length === 0 && (
            <div className="p-10 text-center">
              <BrainIcon
                size={30}
                className="mx-auto mb-3 text-slate-300"
                weight="duotone"
              />
              <p className="text-sm font-medium text-slate-700">
                No skills found
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Tambahkan skill atau pilih kategori lain.
              </p>
            </div>
          )}
        </div>

        <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
          Demo data only — skills belum disimpan ke database.
        </p>
      </section>
    </div>
  );
}