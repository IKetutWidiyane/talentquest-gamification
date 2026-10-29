
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";

import { getJobById } from "@/lib/api/jobs";
import { ApplyForm } from "@/features/applications/apply-form";

type ApplyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ApplyPage({
  params,
}: ApplyPageProps) {
  const { id } = await params;

  try {
    const job = await getJobById(id);

    return (
      <section className="mx-auto max-w-3xl space-y-6">
        <Link
          href={`/jobs/${encodeURIComponent(job.id)}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#0B1B3D]"
        >
          <ArrowLeftIcon size={17} aria-hidden="true" />
          Kembali ke detail lowongan
        </Link>

        <header>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D97706]">
            JOB APPLICATION
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-[#0B1B3D] sm:text-3xl">
            Ajukan Lamaran
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#64748B]">
            Periksa informasi posisi dan lengkapi konfirmasi
            sebelum melanjutkan proses lamaran.
          </p>
        </header>

        <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1B3D] text-[#F59E0B]">
              <BriefcaseIcon size={25} aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              {job.category && (
                <span className="text-xs font-semibold text-[#B86F32]">
                  {job.category}
                </span>
              )}
              <h2 className="mt-1 text-lg font-bold text-[#0B1B3D]">
                {job.title}
              </h2>

              {job.department && (
                <p className="mt-1 text-sm text-[#64748B]">
                  {job.department}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#64748B]">
                {job.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPinIcon size={16} aria-hidden="true" />
                    {job.location}
                  </span>
                )}
                {job.employmentType && (
                  <span>{job.employmentType}</span>
                )}
              </div>
            </div>
          </div>
        </article>

        <ApplyForm
          jobId={job.id}
          jobTitle={job.title}
        />
      </section>
    );
  } catch {
    notFound();
  }
}
