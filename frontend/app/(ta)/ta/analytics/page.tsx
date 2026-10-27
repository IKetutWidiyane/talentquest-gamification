
"use client";

import { useState } from "react";
import {
  TrendUp, Users, Briefcase, Clock, CheckCircle,
  UserCheck, ClipboardText, ArrowUpRight, Download,
} from "@phosphor-icons/react";

const periods = ["7 days", "30 days", "90 days"] as const;
type Period = typeof periods[number];

const metrics: Record<Period, {
  candidates: number;
  jobs: number;
  hired: number;
  days: number;
  previousCandidates: number;
  funnel: { label: string; value: number; color: string }[];
  sources: { label: string; value: number }[];
}> = {
  "7 days": {
    candidates: 38, jobs: 6, hired: 4, days: 12,
    previousCandidates: 31,
    funnel: [
      { label: "Applied", value: 100, color: "bg-[#0B1B3D]" },
      { label: "Screening", value: 72, color: "bg-slate-600" },
      { label: "Assessment", value: 48, color: "bg-amber-500" },
      { label: "Interview", value: 29, color: "bg-orange-400" },
      { label: "Hired", value: 12, color: "bg-emerald-500" },
    ],
    sources: [{ label: "Career Website", value: 44 }, { label: "LinkedIn", value: 30 }, { label: "Referral", value: 18 }, { label: "Other", value: 8 }],
  },
  "30 days": {
    candidates: 164, jobs: 12, hired: 15, days: 18,
    previousCandidates: 139,
    funnel: [
      { label: "Applied", value: 100, color: "bg-[#0B1B3D]" },
      { label: "Screening", value: 68, color: "bg-slate-600" },
      { label: "Assessment", value: 45, color: "bg-amber-500" },
      { label: "Interview", value: 26, color: "bg-orange-400" },
      { label: "Hired", value: 10, color: "bg-emerald-500" },
    ],
    sources: [{ label: "Career Website", value: 40 }, { label: "LinkedIn", value: 32 }, { label: "Referral", value: 20 }, { label: "Other", value: 8 }],
  },
  "90 days": {
    candidates: 482, jobs: 21, hired: 39, days: 22,
    previousCandidates: 421,
    funnel: [
      { label: "Applied", value: 100, color: "bg-[#0B1B3D]" },
      { label: "Screening", value: 65, color: "bg-slate-600" },
      { label: "Assessment", value: 42, color: "bg-amber-500" },
      { label: "Interview", value: 24, color: "bg-orange-400" },
      { label: "Hired", value: 9, color: "bg-emerald-500" },
    ],
    sources: [{ label: "Career Website", value: 42 }, { label: "LinkedIn", value: 29 }, { label: "Referral", value: 21 }, { label: "Other", value: 8 }],
  },
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30 days");
  const data = metrics[period];
  const growth = Math.round(((data.candidates - data.previousCandidates) / data.previousCandidates) * 100);

  const stats = [
    { label: "Total Applicants", value: data.candidates.toLocaleString("en-US"), change: `+${growth}%`, icon: Users, note: "vs. previous period" },
    { label: "Open Positions", value: data.jobs, change: "Active", icon: Briefcase, note: "positions in demo data" },
    { label: "Candidates Hired", value: data.hired, change: "Hired", icon: UserCheck, note: "within selected period" },
    { label: "Time to Hire", value: `${data.days} days`, change: "Average", icon: Clock, note: "illustrative demo metric" },
  ];

  function exportDemoReport() {
    const lines = [
      ["Metric", "Value"],
      ["Period", period],
      ["Total Applicants", data.candidates],
      ["Open Positions", data.jobs],
      ["Candidates Hired", data.hired],
      ["Average Time to Hire", `${data.days} days`],
      [],
      ["Recruitment Stage", "Relative Progress"],
      ...data.funnel.map((item) => [item.label, `${item.value}%`]),
      [],
      ["Candidate Source", "Share"],
      ...data.sources.map((item) => [item.label, `${item.value}%`]),
    ];
    const csv = lines.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `talentquest-analytics-${period.replace(" ", "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-amber-600">Talent Acquisition / Analytics</p>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Recruitment Analytics</h1>
          <p className="mt-2 text-sm text-slate-500">Monitor hiring performance and candidate progress across the pipeline.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            {periods.map((item) => (
              <button key={item} onClick={() => setPeriod(item)} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${period === item ? "bg-[#0B1B3D] text-white" : "text-slate-500 hover:bg-slate-100"}`}>{item}</button>
            ))}
          </div>
          <button onClick={exportDemoReport} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
        <p className="font-semibold">Demo analytics</p>
        <p className="mt-1 text-amber-800">Angka dan grafik di bawah adalah data simulasi untuk preview UI, bukan data rekrutmen aktual.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon, note }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between"><p className="text-sm text-slate-500">{label}</p><span className="rounded-xl bg-amber-50 p-2 text-amber-600"><Icon size={19} /></span></div>
            <div className="mt-4 flex items-end justify-between gap-2"><p className="text-3xl font-bold text-slate-900">{value}</p><span className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700"><TrendUp size={13} />{change}</span></div>
            <p className="mt-2 text-xs text-slate-400">{note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-6 flex items-start justify-between">
            <div><h2 className="font-bold text-slate-900">Recruitment Funnel</h2><p className="mt-1 text-sm text-slate-500">Candidate progression by hiring stage</p></div>
            <span className="rounded-xl bg-slate-100 p-2 text-slate-600"><TrendUp size={19} /></span>
          </div>
          <div className="space-y-5">
            {data.funnel.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm"><span className="font-medium text-slate-700">{item.label}</span><span className="text-slate-500">{item.value}%</span></div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500"><ClipboardText size={15} /> Funnel values show relative progression, not actual counts.</div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-6 flex items-start justify-between">
            <div><h2 className="font-bold text-slate-900">Candidate Sources</h2><p className="mt-1 text-sm text-slate-500">Where applicants discover opportunities</p></div>
            <span className="rounded-xl bg-amber-50 p-2 text-amber-600"><Users size={19} /></span>
          </div>
          <div className="space-y-5">
            {data.sources.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm"><span className="font-medium text-slate-700">{item.label}</span><span className="font-semibold text-slate-900">{item.value}%</span></div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-amber-500" style={{ width: `${item.value}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800"><ArrowUpRight size={17} className="text-emerald-600" /> Career website</div>
            <p className="mt-1 text-sm text-slate-500">Largest illustrative source of applicants in this demo.</p>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div><h2 className="font-bold text-slate-900">Hiring Performance Summary</h2><p className="mt-1 text-sm text-slate-500">Selected reporting period: {period}</p></div>
          <span className="rounded-xl bg-emerald-50 p-2 text-emerald-700"><CheckCircle size={19} /></span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Applicant-to-Hire Ratio</p><p className="mt-2 text-2xl font-bold text-slate-900">{data.hired ? `1:${Math.round(data.candidates / data.hired)}` : "—"}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Applicant Growth</p><p className="mt-2 text-2xl font-bold text-slate-900">+{growth}%</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Open Positions</p><p className="mt-2 text-2xl font-bold text-slate-900">{data.jobs}</p></div>
        </div>
      </section>
    </div>
  );
}
