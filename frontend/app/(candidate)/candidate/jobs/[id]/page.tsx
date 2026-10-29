
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  MapPinIcon,
  BriefcaseIcon,
  BuildingsIcon,
  CalendarBlankIcon,
} from "@phosphor-icons/react/dist/ssr";

import { getJobById, toStringArray } from "@/lib/api/jobs";

interface CandidateJobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CandidateJobDetailPage({
  params,
}: CandidateJobDetailPageProps) {
  const { id } = await params;

  let job;

  try {
    job = await getJobById(id);
  } catch (error) {
    console.error("Failed to load job detail:", error);
    notFound();
  }

  if (!job) {
    notFound();
  }

  const responsibilities = toStringArray(job.responsibilities);
  const requirements = toStringArray(
    job.requirements ?? job.qualifications
  );

  return (
    <section className="space-y-6">
      <Link
        href="/candidate/jobs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#0B1B3D]"
      >
        <ArrowLeftIcon size={18} aria-hidden="true" />
        Kembali ke daftar lowongan
      </Link>

      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#0B1B3D] text-[#F59E0B]">
            <BriefcaseIcon size={28} aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D97706]">
              Job opportunity
            </p>

            <h1 className="mt-2 text-2xl font-extrabold text-[#0B1B3D] sm:text-3xl">
              {job.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#64748B]">
              <span className="inline-flex items-center gap-2">
                <BuildingsIcon size={18} aria-hidden="true" />
                {job.department || job.category || "Department"}
              </span>

              <span className="inline-flex items-center gap-2">
                <MapPinIcon size={18} aria-hidden="true" />
                {job.location || "Lokasi tidak dicantumkan"}
              </span>

              {job.employmentType && (
                <span className="inline-flex items-center gap-2">
                  <BriefcaseIcon size={18} aria-hidden="true" />
                  {job.employmentType}
                </span>
              )}

              {job.postedAt && (
                <span className="inline-flex items-center gap-2">
                  <CalendarBlankIcon size={18} aria-hidden="true" />
                  {new Date(job.postedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        {job.workplace && (
          <div className="mt-6">
            <span className="rounded-full bg-[#FFFBEB] px-3 py-1.5 text-xs font-semibold text-[#92400E]">
              {job.workplace}
            </span>
          </div>
        )}

        <div className="my-7 border-t border-[#E2E8F0]" />

        <div className="space-y-7">
          <section>
            <h2 className="text-lg font-bold text-[#0B1B3D]">
              Deskripsi Pekerjaan
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#64748B]">
              {job.description ||
                job.summary ||
                "Deskripsi pekerjaan belum tersedia."}
            </p>
          </section>

          {responsibilities.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-[#0B1B3D]">
                Tanggung Jawab
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#64748B]">
                {responsibilities.map((item, index) => (
                  <li key={`${index}-${item}`}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {requirements.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-[#0B1B3D]">
                Kualifikasi
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#64748B]">
                {requirements.map((item, index) => (
                  <li key={`${index}-${item}`}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="mt-8 border-t border-[#E2E8F0] pt-6">
          <Link
            href={`/candidate/jobs/${job.id}/apply`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#172D55] sm:w-auto"
          >
            Lamar Sekarang
            <BriefcaseIcon size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
