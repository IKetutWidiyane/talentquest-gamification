
"use client";

import { useMemo, useState } from "react";
import { Search, Users, Star, BriefcaseBusiness, MapPin, Bookmark, BookmarkCheck } from "lucide-react";

type Talent = {
  id: number;
  name: string;
  email: string;
  position: string;
  location: string;
  score: number;
  skills: string[];
  shortlisted: boolean;
};

const initialTalent: Talent[] = [
  { id: 1, name: "Andi Pratama", email: "andi.pratama@example.com", position: "Frontend Developer", location: "Jakarta", score: 92, skills: ["React", "TypeScript", "Next.js"], shortlisted: true },
  { id: 2, name: "Nadia Putri", email: "nadia.putri@example.com", position: "UI/UX Designer", location: "Bandung", score: 89, skills: ["Figma", "Prototyping", "Research"], shortlisted: true },
  { id: 3, name: "Michael Tan", email: "michael.tan@example.com", position: "Frontend Developer", location: "Tangerang", score: 84, skills: ["JavaScript", "React", "CSS"], shortlisted: false },
  { id: 4, name: "Rina Maharani", email: "rina.maharani@example.com", position: "Data Analyst", location: "Yogyakarta", score: 87, skills: ["SQL", "Python", "Power BI"], shortlisted: false },
  { id: 5, name: "Dimas Saputra", email: "dimas.saputra@example.com", position: "UI/UX Designer", location: "Surabaya", score: 81, skills: ["Figma", "Design System", "UI Design"], shortlisted: false },
];

export default function TalentPoolPage() {
  const [talent, setTalent] = useState(initialTalent);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All");
  const [shortlistOnly, setShortlistOnly] = useState(false);

  const positions = ["All", ...Array.from(new Set(talent.map((item) => item.position)))];
  const filtered = useMemo(() => talent.filter((item) => {
    const text = `${item.name} ${item.email} ${item.position} ${item.skills.join(" ")}`.toLowerCase();
    return text.includes(search.toLowerCase()) &&
      (position === "All" || item.position === position) &&
      (!shortlistOnly || item.shortlisted);
  }), [talent, search, position, shortlistOnly]);

  function toggleShortlist(id: number) {
    setTalent((current) => current.map((item) => item.id === id ? { ...item, shortlisted: !item.shortlisted } : item));
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="mb-1 text-sm font-medium text-amber-600">Talent Acquisition / Talent Pool</p>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Talent Pool</h1>
        <p className="mt-2 text-sm text-slate-500">Keep track of promising candidates for current and future opportunities.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Talents", value: talent.length, icon: Users },
          { label: "Shortlisted", value: talent.filter((item) => item.shortlisted).length, icon: BookmarkCheck },
          { label: "Average Assessment", value: `${Math.round(talent.reduce((sum, item) => sum + item.score, 0) / talent.length)}%`, icon: Star },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between"><p className="text-sm text-slate-500">{label}</p><span className="rounded-xl bg-amber-50 p-2 text-amber-600"><Icon size={19} /></span></div>
            <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div><h2 className="font-bold text-slate-900">Saved Candidates</h2><p className="mt-1 text-sm text-slate-500">{filtered.length} candidates match your filters</p></div>
            <label className="relative block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, skill, role..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-amber-500 md:w-72" /></label>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select value={position} onChange={(e) => setPosition(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500">
              {positions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <button onClick={() => setShortlistOnly((value) => !value)} className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold ${shortlistOnly ? "bg-amber-100 text-amber-800" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              <Bookmark size={16} /> {shortlistOnly ? "Showing Shortlisted" : "Shortlisted Only"}
            </button>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 p-5 transition hover:border-amber-300 hover:shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1B3D] font-bold text-white">{item.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
                  <div><h3 className="font-semibold text-slate-900">{item.name}</h3><p className="mt-1 text-xs text-slate-500">{item.email}</p></div></div>
                <button onClick={() => toggleShortlist(item.id)} aria-label={item.shortlisted ? "Remove from shortlist" : "Add to shortlist"} className={`rounded-lg border p-2 ${item.shortlisted ? "border-amber-200 bg-amber-50 text-amber-700" : "border-slate-200 text-slate-400 hover:bg-slate-50"}`}>
                  {item.shortlisted ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm text-slate-600"><BriefcaseBusiness size={15} />{item.position}</div>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500"><MapPin size={15} />{item.location}</div>
              <div className="mt-5 flex items-center justify-between"><span className="text-xs text-slate-500">Assessment score</span><span className="font-bold text-slate-900">{item.score}%</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-amber-500" style={{ width: `${item.score}%` }} /></div>
              <div className="mt-4 flex flex-wrap gap-1.5">{item.skills.map((skill) => <span key={skill} className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-600">{skill}</span>)}</div>
            </article>
          ))}
          {filtered.length === 0 && <p className="py-10 text-center text-sm text-slate-500 md:col-span-2 xl:col-span-3">No candidates found.</p>}
        </div>
        <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">Demo candidates only — shortlist belum disimpan ke database.</p>
      </div>
    </div>
  );
}
