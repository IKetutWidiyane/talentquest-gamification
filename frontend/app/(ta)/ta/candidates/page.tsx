
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  SlidersHorizontalIcon,
  UsersIcon,
  UserCheckIcon,
  ClockIcon,
  TrophyIcon,
  ArrowUpRightIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

type CandidateStatus =
  | "New"
  | "Screening"
  | "Interview"
  | "Hired"
  | "Rejected";

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  location: string;
  status: CandidateStatus;
  score: number | null;
  appliedAt: string;
}

const candidates: Candidate[] = [
  {
    id: "CAN-001",
    name: "Aditya Pratama",
    email: "aditya@example.com",
    position: "Frontend Developer",
    location: "Bandung",
    status: "Screening",
    score: 86,
    appliedAt: "Demo data",
  },
  {
    id: "CAN-002",
    name: "Nadia Putri",
    email: "nadia@example.com",
    position: "UI/UX Designer",
    location: "Jakarta",
    status: "Interview",
    score: 92,
    appliedAt: "Demo data",
  },
  {
    id: "CAN-003",
    name: "Rizky Saputra",
    email: "rizky@example.com",
    position: "Frontend Developer",
    location: "Lampung",
    status: "New",
    score: null,
    appliedAt: "Demo data",
  },
  {
    id: "CAN-004",
    name: "Dewi Anggraini",
    email: "dewi@example.com",
    position: "Digital Marketing Intern",
    location: "Bandung",
    status: "Hired",
    score: 89,
    appliedAt: "Demo data",
  },
  {
    id: "CAN-005",
    name: "Fajar Ramadhan",
    email: "fajar@example.com",
    position: "UI/UX Designer",
    location: "Yogyakarta",
    status: "Rejected",
    score: 58,
    appliedAt: "Demo data",
  },
];

const statusStyles: Record<CandidateStatus, string> = {
  New: "bg-sky-50 text-sky-700",
  Screening: "bg-amber-50 text-amber-800",
  Interview: "bg-violet-50 text-violet-700",
  Hired: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-rose-50 text-rose-700",
};

const statusOptions = [
  "All",
  "New",
  "Screening",
  "Interview",
  "Hired",
  "Rejected",
] as const;

export default function TACandidatesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>("All");

  const filteredCandidates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return candidates.filter((candidate) => {
      const matchesSearch =
        !query ||
        candidate.name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.position.toLowerCase().includes(query) ||
        candidate.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalCandidates = candidates.length;
  const activeCandidates = candidates.filter(
    (candidate) =>
      candidate.status === "New" ||
      candidate.status === "Screening" ||
      candidate.status === "Interview",
  ).length;
  const interviewCandidates = candidates.filter(
    (candidate) => candidate.status === "Interview",
  ).length;
  const averageScoreCandidates = candidates.filter(
    (candidate) => candidate.score !== null,
  );
  const averageScore = averageScoreCandidates.length
    ? Math.round(
        averageScoreCandidates.reduce(
          (total, candidate) => total + (candidate.score ?? 0),
          0,
        ) / averageScoreCandidates.length,
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-slate-500">
            Talent Acquisition / Candidates
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0B1B3D]">
            Candidate Management
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Kelola kandidat, tinjau proses seleksi, dan pantau hasil
            assessment dalam satu tempat.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500">
          <UsersIcon size={15} />
          Candidate Directory
        </span>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Candidates"
          value={totalCandidates}
          helper="Kandidat dalam data demo"
          icon={UsersIcon}
        />
        <StatCard
          label="Active Pipeline"
          value={activeCandidates}
          helper="New, screening, dan interview"
          icon={UserCheckIcon}
        />
        <StatCard
          label="In Interview"
          value={interviewCandidates}
          helper="Sedang tahap interview"
          icon={ClockIcon}
        />
        <StatCard
          label="Average Assessment"
          value={`${averageScore}%`}
          helper="Kandidat yang memiliki skor"
          icon={TrophyIcon}
        />
      </div>

      {/* Candidate directory */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-bold text-[#0B1B3D]">
              All Candidates
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Cari kandidat atau filter berdasarkan status seleksi.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 sm:w-64">
              <MagnifyingGlassIcon
                size={16}
                className="shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search candidates..."
                aria-label="Cari kandidat"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
              <SlidersHorizontalIcon
                size={16}
                className="shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as (typeof statusOptions)[number],
                  )
                }
                aria-label="Filter status kandidat"
                className="min-w-0 bg-transparent text-sm text-slate-700 outline-none"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All statuses" : status}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Candidate</th>
                <th className="px-5 py-4 font-semibold">Applied Position</th>
                <th className="px-5 py-4 font-semibold">Assessment</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="transition-colors hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={candidate.name} />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#0B1B3D]">
                          {candidate.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {candidate.email}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {candidate.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-700">
                      {candidate.position}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <MapPinIcon size={12} />
                      {candidate.location}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    {candidate.score === null ? (
                      <span className="text-xs text-slate-400">
                        Not assessed
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-amber-500"
                            style={{ width: `${candidate.score}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-[#0B1B3D]">
                          {candidate.score}%
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={candidate.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/ta/candidates/${candidate.id}`}
                      aria-label={`Lihat detail ${candidate.name}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#0B1B3D] transition hover:border-amber-300 hover:bg-amber-50"
                    >
                      Details
                      <ArrowUpRightIcon size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCandidates.length === 0 && (
            <EmptyState />
          )}
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 md:hidden">
          {filteredCandidates.map((candidate) => (
            <article key={candidate.id} className="space-y-4 p-4">
              <div className="flex items-start gap-3">
                <Avatar name={candidate.name} />

                <div className="min-w-0 flex-1">
                  <h4 className="break-words text-sm font-semibold text-[#0B1B3D]">
                    {candidate.name}
                  </h4>
                  <p className="mt-1 break-all text-xs text-slate-500">
                    {candidate.email}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {candidate.id}
                  </p>
                </div>

                <StatusBadge status={candidate.status} />
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-700">
                  {candidate.position}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <MapPinIcon size={13} />
                  {candidate.location}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Assessment score
                  </span>
                  <span className="text-sm font-bold text-[#0B1B3D]">
                    {candidate.score === null
                      ? "Not assessed"
                      : `${candidate.score}%`}
                  </span>
                </div>
              </div>

              <Link
                href={`/ta/candidates/${candidate.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-[#0B1B3D] hover:bg-amber-50"
              >
                View candidate
                <ArrowUpRightIcon size={15} />
              </Link>
            </article>
          ))}

          {filteredCandidates.length === 0 && (
            <EmptyState />
          )}
        </div>

        <div className="border-t border-slate-200 bg-slate-50/70 px-5 py-3">
          <p className="text-xs text-slate-500">
            Menampilkan {filteredCandidates.length} dari{" "}
            {totalCandidates} kandidat demo.
          </p>
        </div>
      </section>

      <p className="text-xs leading-5 text-slate-400">
        Informasi pada halaman ini adalah data simulasi untuk pengembangan
        antarmuka, bukan data kandidat sebenarnya.
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  helper: string;
  icon: Icon;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{label}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
          <Icon size={18} />
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-[#0B1B3D]">
        {value}
      </p>
      <p className="mt-1 text-xs leading-5 text-slate-400">{helper}</p>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-label={`Avatar ${name}`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1B3D] text-xs font-bold text-[#F59E0B]"
    >
      {initials || "?"}
    </div>
  );
}

function StatusBadge({ status }: { status: CandidateStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="px-5 py-12 text-center">
      <UsersIcon className="mx-auto text-slate-300" size={32} />
      <h4 className="mt-3 font-semibold text-[#0B1B3D]">
        No candidates found
      </h4>
      <p className="mt-1 text-sm text-slate-500">
        Coba ubah kata kunci atau filter status.
      </p>
    </div>
  );
}
