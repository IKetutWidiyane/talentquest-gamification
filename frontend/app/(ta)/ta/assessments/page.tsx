
"use client";

import { useMemo, useState } from "react";
import {
  ClipboardText, MagnifyingGlass, Funnel, Clock, Users, Plus,
  CheckCircle, CircleDashed, Eye, DotsThree,
} from "@phosphor-icons/react";

type AssessmentStatus = "Active" | "Draft" | "Completed";

type Assessment = {
  id: number;
  title: string;
  type: string;
  candidates: number;
  completed: number;
  duration: string;
  status: AssessmentStatus;
};

const initialAssessments: Assessment[] = [
  { id: 1, title: "EIGER Talent Quest — General Aptitude", type: "Cognitive Test", candidates: 42, completed: 31, duration: "30 min", status: "Active" },
  { id: 2, title: "Frontend Developer Challenge", type: "Technical Test", candidates: 18, completed: 12, duration: "60 min", status: "Active" },
  { id: 3, title: "UI/UX Design Assessment", type: "Practical Challenge", candidates: 24, completed: 24, duration: "90 min", status: "Completed" },
  { id: 4, title: "Behavioral & Personality Test", type: "Personality Test", candidates: 0, completed: 0, duration: "25 min", status: "Draft" },
];

const statusStyles: Record<AssessmentStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Draft: "bg-slate-100 text-slate-600",
  Completed: "bg-amber-50 text-amber-700",
};

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>(initialAssessments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => assessments.filter((item) => {
    const matchesSearch = `${item.title} ${item.type}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (filter === "All" || item.status === filter);
  }), [assessments, search, filter]);

  const totalCandidates = assessments.reduce((sum, item) => sum + item.candidates, 0);
  const totalCompleted = assessments.reduce((sum, item) => sum + item.completed, 0);
  const activeCount = assessments.filter((item) => item.status === "Active").length;

  function toggleStatus(id: number) {
    setAssessments((current) => current.map((item) => {
      if (item.id !== id) return item;
      return { ...item, status: item.status === "Active" ? "Draft" : "Active" };
    }));
  }

  const stats = [
    { label: "Total Assessments", value: assessments.length, icon: ClipboardText },
    { label: "Active Assessments", value: activeCount, icon: CheckCircle },
    { label: "Candidates Assigned", value: totalCandidates, icon: Users },
    { label: "Completed Attempts", value: totalCompleted, icon: CircleDashed },
  ];

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-amber-600">Talent Acquisition / Assessments</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Assessments</h1>
          <p className="mt-2 text-sm text-slate-500">Manage tests and monitor candidate assessment progress.</p>
        </div>
        <button
          onClick={() => alert("Demo: form Create Assessment dapat dihubungkan ke backend pada tahap berikutnya.")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={17} /> Create Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{label}</p>
              <span className="rounded-xl bg-amber-50 p-2 text-amber-600"><Icon size={19} /></span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Assessment Library</h2>
            <p className="mt-1 text-sm text-slate-500">View and manage assessment activities.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assessments..."
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-amber-500 sm:w-60" />
            </div>
            <div className="relative">
              <Funnel className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select value={filter} onChange={(e) => setFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-amber-500 sm:w-40">
                {["All", "Active", "Draft", "Completed"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((item) => {
            const completion = item.candidates ? Math.round(item.completed / item.candidates * 100) : 0;
            return (
              <div key={item.id} className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/70 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="rounded-xl bg-slate-100 p-3 text-[#0B1B3D]"><ClipboardText size={21} /></div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.type}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Users size={14} /> {item.candidates} candidates</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {item.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-48">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-500">Completion</span>
                    <span className="font-semibold text-slate-700">{completion}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: `${completion}%` }} />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">{item.completed} of {item.candidates} completed</p>
                </div>

                <div className="flex items-center justify-between gap-3 lg:w-44 lg:justify-end">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[item.status]}`}>{item.status}</span>
                  <button onClick={() => toggleStatus(item.id)} title="Toggle active/draft"
                    className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100" aria-label={`Toggle ${item.title}`}>
                    {item.status === "Active" ? <DotsThree size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <div className="p-12 text-center text-sm text-slate-500">No assessments match your search.</div>}
        </div>
        <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">Demo data only — belum terhubung ke database.</p>
      </section>
    </div>
  );
}
