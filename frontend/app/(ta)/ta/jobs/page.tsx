
import Link from "next/link";
import {
  BriefcaseBusiness,
  Plus,
  Search,
  SlidersHorizontal,
  MapPin,
  Clock3,
  Users,
} from "lucide-react";

const jobs = [
  {
    id: "JOB-001",
    title: "Frontend Developer",
    department: "Technology",
    location: "Bandung, Indonesia",
    type: "Full-time",
    status: "Published",
    applicants: 24,
    updated: "Demo data",
  },
  {
    id: "JOB-002",
    title: "UI/UX Designer",
    department: "Product Design",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    status: "Draft",
    applicants: 0,
    updated: "Demo data",
  },
  {
    id: "JOB-003",
    title: "Digital Marketing Intern",
    department: "Marketing",
    location: "Bandung, Indonesia",
    type: "Internship",
    status: "Closed",
    applicants: 42,
    updated: "Demo data",
  },
];

const statusStyles: Record<string, string> = {
  Published: "bg-emerald-50 text-emerald-700",
  Draft: "bg-amber-50 text-amber-700",
  Closed: "bg-slate-100 text-slate-600",
};

export default function TAJobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-500">
            Talent Acquisition / Jobs
          </p>
          <h2 className="mt-1 text-2xl font-bold text-[#0B1B3D]">
            Job Management
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Kelola lowongan dan pantau kandidat yang melamar.
          </p>
        </div>

        <button
          type="button"
          disabled
          title="Form pembuatan lowongan akan dibuat pada tahap berikutnya"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] px-4 py-3 text-sm font-semibold text-white opacity-70"
        >
          <Plus size={17} />
          Create Job
          <span className="text-xs text-amber-300">Soon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Jobs</p>
            <BriefcaseBusiness size={19} className="text-amber-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-[#0B1B3D]">
            {jobs.length}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Contoh lowongan
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Published Jobs</p>
          <p className="mt-3 text-3xl font-bold text-emerald-700">
            {jobs.filter((job) => job.status === "Published").length}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Berdasarkan data demo
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Applicants</p>
          <p className="mt-3 text-3xl font-bold text-[#0B1B3D]">
            {jobs.reduce((total, job) => total + job.applicants, 0)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Angka simulasi, bukan data database
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-[#0B1B3D]">
              All Job Openings
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Daftar lowongan contoh untuk pengembangan UI.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
              <Search size={16} className="text-slate-400" />
              <input
                type="search"
                placeholder="Search jobs..."
                aria-label="Cari lowongan"
                className="w-full bg-transparent text-sm outline-none sm:w-44"
                disabled
              />
            </label>

            <button
              type="button"
              disabled
              title="Filter akan diaktifkan pada tahap berikutnya"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-400"
            >
              <SlidersHorizontal size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="flex flex-col gap-4 p-4 transition-colors hover:bg-slate-50/70 sm:p-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex min-w-0 gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <BriefcaseBusiness size={21} />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-[#0B1B3D]">
                      {job.title}
                    </h4>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {job.id} · {job.department}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={14} />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} />
                      {job.applicants} applicants
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 lg:justify-end">
                <span className="text-xs text-slate-400">
                  {job.updated}
                </span>
                <Link
                  href={`/ta/jobs/${job.id}`}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#0B1B3D] transition hover:border-amber-300 hover:bg-amber-50"
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="border-t border-slate-200 bg-slate-50/70 px-5 py-3">
          <p className="text-xs text-slate-500">
            Menampilkan {jobs.length} lowongan demo.
          </p>
        </div>
      </section>
    </div>
  );
}
