
import Link from "next/link";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";

import { getJobs } from "@/lib/api/jobs";
import type { Job } from "@/lib/api/jobs";

export default async function CandidateJobsPage() {
  let jobs: Job[] = [];

  try {
    jobs = await getJobs();
  } catch (error) {
    console.error("Failed to load jobs:", error);
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D97706]">
          Career opportunities
        </p>

        <h1 className="text-2xl font-extrabold text-[#0B1B3D] sm:text-3xl">
          Explore Opportunities
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
          Temukan peluang karier dan posisi yang sesuai dengan minat serta
          potensi kamu.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748B]">
          {jobs.length} lowongan tersedia
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white px-5 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F5F9] text-[#0B1B3D]">
            <BriefcaseIcon size={28} aria-hidden="true" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#0B1B3D]">
            Belum ada lowongan tersedia
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
            Lowongan belum dapat ditampilkan. Silakan coba kembali beberapa
            saat lagi.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition hover:border-[#CBD5E1] hover:shadow-md sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1B3D] text-[#F59E0B]">
                  <BriefcaseIcon size={24} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold leading-6 text-[#0B1B3D]">
                    {job.title}
                  </h2>

                  <p className="mt-1 text-sm text-[#64748B]">
                    {job.department || job.category || "Career opportunity"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.employmentType && (
                  <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-semibold text-[#334155]">
                    {job.employmentType}
                  </span>
                )}

                {job.workplace && (
                  <span className="rounded-full bg-[#FFFBEB] px-3 py-1 text-xs font-semibold text-[#92400E]">
                    {job.workplace}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-[#64748B]">
                <MapPinIcon size={18} aria-hidden="true" />
                <span>{job.location || "Lokasi tidak dicantumkan"}</span>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#64748B]">
                {job.summary ||
                  job.description ||
                  "Informasi lowongan tersedia pada halaman detail pekerjaan."}
              </p>

              <div className="mt-auto flex flex-col gap-3 pt-6">
                <Link
                  href={`/candidate/jobs/${job.id}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] px-4 py-3 text-sm font-bold text-[#0B1B3D] transition hover:bg-[#F8FAFC]"
                >
                  Lihat Detail
                </Link>

                <Link
                  href={`/candidate/jobs/${job.id}/apply`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#172D55]"
                >
                  Lamar Sekarang
                  <ArrowRightIcon size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
