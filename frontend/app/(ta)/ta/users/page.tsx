"use client";

import { useMemo, useState } from "react";
import {
  MagnifyingGlass,
  UserPlus,
  Users,
  ShieldCheck,
  UserCircle,
  Envelope,
  ToggleLeft,
  ToggleRight,
} from "@phosphor-icons/react";

type UserRole = "Talent Acquisition" | "Candidate";

type UserRecord = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
};

const initialUsers: UserRecord[] = [
  {
    id: 1,
    name: "Sarah Amelia",
    email: "sarah.amelia@example.com",
    role: "Talent Acquisition",
    active: true,
  },
  {
    id: 2,
    name: "Andi Pratama",
    email: "andi.pratama@example.com",
    role: "Candidate",
    active: true,
  },
  {
    id: 3,
    name: "Nadia Putri",
    email: "nadia.putri@example.com",
    role: "Candidate",
    active: true,
  },
  {
    id: 4,
    name: "Michael Tan",
    email: "michael.tan@example.com",
    role: "Candidate",
    active: false,
  },
  {
    id: 5,
    name: "Rina Maharani",
    email: "rina.maharani@example.com",
    role: "Talent Acquisition",
    active: true,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = useMemo(
    () =>
      users.filter(
        (user) =>
          `${user.name} ${user.email}`
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          (roleFilter === "All" || user.role === roleFilter),
      ),
    [users, search, roleFilter],
  );

  const activeCount = users.filter((user) => user.active).length;
  const taCount = users.filter(
    (user) => user.role === "Talent Acquisition",
  ).length;
  const candidateCount = users.filter(
    (user) => user.role === "Candidate",
  ).length;

  function toggleUser(id: number) {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  }

  const stats = [
    { label: "Total Users", value: users.length, icon: Users },
    {
      label: "Active Accounts",
      value: activeCount,
      icon: ShieldCheck,
    },
    {
      label: "Talent Acquisition",
      value: taCount,
      icon: UserCircle,
    },
    {
      label: "Candidates",
      value: candidateCount,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-7">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-amber-600">
            Talent Acquisition / Users
          </p>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            User Management
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review user accounts and their assigned platform roles.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            alert(
              "Demo: fitur Invite User memerlukan form dan endpoint backend.",
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <UserPlus size={18} weight="bold" />
          Invite User
        </button>
      </header>

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

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Platform Users</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filtered.length} users displayed
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative block">
              <MagnifyingGlass
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name or email..."
                aria-label="Search users"
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 sm:w-64"
              />
            </label>

            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              aria-label="Filter users by role"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500"
            >
              {["All", "Talent Acquisition", "Candidate"].map((role) => (
                <option key={role} value={role}>
                  {role === "All" ? "All Roles" : role}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((user) => (
            <article
              key={user.id}
              className="flex flex-col gap-3 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B1B3D] text-sm font-bold text-white">
                  {user.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-900">
                    {user.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-slate-500">
                    <Envelope size={15} className="shrink-0" />
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    user.role === "Talent Acquisition"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-sky-50 text-sky-700"
                  }`}
                >
                  {user.role}
                </span>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    user.active
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {user.active ? "Active" : "Inactive"}
                </span>

                <button
                  type="button"
                  onClick={() => toggleUser(user.id)}
                  aria-label={`Toggle account for ${user.name}`}
                  aria-pressed={user.active}
                  className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100"
                >
                  {user.active ? (
                    <ToggleRight
                      size={22}
                      weight="duotone"
                      className="text-emerald-600"
                    />
                  ) : (
                    <ToggleLeft size={22} />
                  )}
                </button>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="p-10 text-center">
              <Users
                size={30}
                className="mx-auto mb-3 text-slate-300"
                weight="duotone"
              />
              <p className="text-sm font-medium text-slate-700">
                No users found
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or role filter.
              </p>
            </div>
          )}
        </div>

        <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
          Demo users only — connect authentication and authorization to
          the backend before production use.
        </p>
      </section>
    </div>
  );
}