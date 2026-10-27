"use client";

import { useMemo, useState } from "react";
import {
  MagnifyingGlass,
  Users,
  Star,
  Briefcase,
  MapPin,
  BookmarkSimple,
} from "@phosphor-icons/react";

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
  {
    id: 1,
    name: "Andi Pratama",
    email: "andi.pratama@example.com",
    position: "Frontend Developer",
    location: "Jakarta",
    score: 92,
    skills: ["React", "TypeScript", "Next.js"],
    shortlisted: true,
  },
  {
    id: 2,
    name: "Nadia Putri",
    email: "nadia.putri@example.com",
    position: "UI/UX Designer",
    location: "Bandung",
    score: 89,
    skills: ["Figma", "Prototyping", "Research"],
    shortlisted: true,
  },
  {
    id: 3,
    name: "Michael Tan",
    email: "michael.tan@example.com",
    position: "Frontend Developer",
    location: "Tangerang",
    score: 84,
    skills: ["JavaScript", "React", "CSS"],
    shortlisted: false,
  },
  {
    id: 4,
    name: "Rina Maharani",
    email: "rina.maharani@example.com",
    position: "Data Analyst",
    location: "Yogyakarta",
    score: 87,
    skills: ["SQL", "Python", "Power BI"],
    shortlisted: false,
  },
  {
    id: 5,
    name: "Dimas Saputra",
    email: "dimas.saputra@example.com",
    position: "UI/UX Designer",
    location: "Surabaya",
    score: 81,
    skills: ["Figma", "Design System", "UI Design"],
    shortlisted: false,
  },
];

export default function TalentPoolPage() {
  const [talent, setTalent] = useState(initialTalent);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All");
  const [shortlistOnly, setShortlistOnly] = useState(false);

  const positions = [
    "All",
    ...Array.from(new Set(talent.map((item) => item.position))),
  ];

  const filtered = useMemo(
    () =>
      talent.filter((item) => {
        const text =
          `${item.name} ${item.email} ${item.position} ${item.skills.join(" ")}`.toLowerCase();

        return (
          text.includes(search.toLowerCase()) &&
          (position === "All" || item.position === position) &&
          (!shortlistOnly || item.shortlisted)
        );
      }),
    [talent, search, position, shortlistOnly],
  );

  const shortlistedCount = talent.filter(
    (item) => item.shortlisted,
  ).length;

  const averageScore =
    talent.length > 0
      ? Math.round(
          talent.reduce((sum, item) => sum + item.score, 0) /
            talent.length,
        )
      : 0;

  function toggleShortlist(id: number) {
    setTalent((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, shortlisted: !item.shortlisted }
          : item,
      ),
    );
  }

  const stats = [
    { label: "Total Talents", value: talent.length, icon: Users },
    {
      label: "Shortlisted",
      value: shortlistedCount,
      icon: BookmarkSimple,
    },
    {
      label: "Average Assessment",
      value: `${averageScore}%`,
      icon: Star,
    },
  ];

  return (
    <div className="space-y-7">
      <header>
        <p className="mb-1 text-sm font-medium text-amber-600">
          Talent Acquisition / Talent Pool
        </p>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Talent Pool
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Keep track of promising candidates for current and future
          opportunities.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
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

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="space-y-4 border-b border-slate-100 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Saved Candidates
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filtered.length} candidates match your filters
              </p>
            </div>

            <label className="relative block">
              <MagnifyingGlass
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, skill, role..."
                aria-label="Search candidates"
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 md:w-72"
              />
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={position}
              onChange={(event) => setPosition(event.target.value)}
              aria-label="Filter by position"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500"
            >
              {positions.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Positions" : item}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShortlistOnly((value) => !value)}
              aria-pressed={shortlistOnly}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                shortlistOnly
                  ? "bg-amber-100 text-amber-800"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <BookmarkSimple
                size={17}
                weight={shortlistOnly ? "fill" : "regular"}
              />
              {shortlistOnly ? "Showing Shortlisted" : "Shortlisted Only"}
            </button>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-amber-300 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B1B3D] font-bold text-white">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {item.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleShortlist(item.id)}
                  aria-label={
                    item.shortlisted
                      ? `Remove ${item.name} from shortlist`
                      : `Add ${item.name} to shortlist`
                  }
                  aria-pressed={item.shortlisted}
                  className={`shrink-0 rounded-lg border p-2 transition ${
                    item.shortlisted
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-slate-200 text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <BookmarkSimple
                    size={18}
                    weight={item.shortlisted ? "fill" : "regular"}
                  />
                </button>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
                <Briefcase size={16} className="shrink-0 text-slate-400" />
                {item.position}
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={16} className="shrink-0 text-slate-400" />
                {item.location}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Assessment score
                </span>
                <span className="font-bold text-slate-900">
                  {item.score}%
                </span>
              </div>

              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={`Assessment score for ${item.name}`}
                aria-valuenow={item.score}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="py-10 text-center md:col-span-2 xl:col-span-3">
              <Users
                size={30}
                className="mx-auto mb-3 text-slate-300"
                weight="duotone"
              />
              <p className="text-sm font-medium text-slate-700">
                No candidates found
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
          Demo data only — shortlist changes are not saved to the database.
        </p>
      </section>
    </div>
  );
}