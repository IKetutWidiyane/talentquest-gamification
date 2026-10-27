
"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlassIcon, PlusIcon, TargetIcon, CodeIcon, UsersIcon, BriefcaseIcon, ToggleLeftIcon, ToggleRightIcon } from "@phosphor-icons/react";

type Competency = {
  id: number;
  name: string;
  category: string;
  description: string;
  indicators: number;
  active: boolean;
};

const initialData: Competency[] = [
  { id: 1, name: "Problem Solving", category: "Core", description: "Ability to analyze problems and develop practical solutions.", indicators: 4, active: true },
  { id: 2, name: "Communication", category: "Core", description: "Ability to communicate ideas clearly and collaborate effectively.", indicators: 5, active: true },
  { id: 3, name: "Technical Proficiency", category: "Technical", description: "Role-specific technical knowledge and implementation skills.", indicators: 6, active: true },
  { id: 4, name: "Creative Thinking", category: "Core", description: "Ability to generate ideas and approach challenges creatively.", indicators: 3, active: true },
  { id: 5, name: "Leadership", category: "Leadership", description: "Ability to take initiative and guide a team toward shared goals.", indicators: 4, active: false },
  { id: 6, name: "Adaptability", category: "Core", description: "Ability to respond to changing priorities and new situations.", indicators: 3, active: true },
];

const categoryStyles: Record<string, string> = {
  Core: "bg-amber-50 text-amber-700",
  Technical: "bg-sky-50 text-sky-700",
  Leadership: "bg-violet-50 text-violet-700",
};

export default function CompetenciesPage() {
  const [items, setItems] = useState(initialData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => items.filter((item) =>
    `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category)
  ), [items, search, category]);

  const activeCount = items.filter((item) => item.active).length;
  const categories = ["All", "Core", "Technical", "Leadership"];

  function toggleActive(id: number) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, active: !item.active } : item));
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-amber-600">Talent Acquisition / Competencies</p>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Competencies</h1>
          <p className="mt-2 text-sm text-slate-500">Define the skills and behaviors used in candidate evaluation.</p>
        </div>
        <button onClick={() => alert("Demo: form Add Competency akan dibuat saat integrasi CRUD backend.")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
          <PlusIcon size={17} /> Add Competency
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Competencies", value: items.length, icon: TargetIcon },
          { label: "Active Competencies", value: activeCount, icon: CodeIcon },
          { label: "Evaluation Categories", value: new Set(items.map((item) => item.category)).size, icon: BriefcaseIcon },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between"><p className="text-sm text-slate-500">{label}</p><span className="rounded-xl bg-amber-50 p-2 text-amber-600"><Icon size={19} /></span></div>
            <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
          <div><h2 className="font-bold text-slate-900">Competency Library</h2><p className="mt-1 text-sm text-slate-500">Manage evaluation criteria for Talent Quest.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative"><MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search competencies..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-amber-500 sm:w-60" /></div>
            <div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-lg px-3 py-2 text-xs font-semibold ${category === item ? "bg-[#0B1B3D] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{item}</button>)}</div>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2">
          {filtered.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 p-5 transition hover:border-amber-300">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3"><span className="rounded-xl bg-slate-100 p-3 text-[#0B1B3D]"><TargetIcon size={20} /></span><div><h3 className="font-semibold text-slate-900">{item.name}</h3><span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyles[item.category]}`}>{item.category}</span></div></div>
                <button onClick={() => toggleActive(item.id)} className={`rounded-lg p-1 ${item.active ? "text-emerald-600" : "text-slate-400"}`} aria-label={`Toggle ${item.name}`}>
                  {item.active ? <ToggleRightIcon size={27} /> : <ToggleLeftIcon size={27} />}
                </button>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-500">{item.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="flex items-center gap-2 text-sm text-slate-500"><UsersIcon size={16} /> {item.indicators} indicators</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{item.active ? "Active" : "Inactive"}</span>
              </div>
            </article>
          ))}
          {filtered.length === 0 && <p className="py-10 text-center text-sm text-slate-500 md:col-span-2">No competencies found.</p>}
        </div>
        <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">Demo data only — status belum tersimpan ke database.</p>
      </div>
    </div>
  );
}
