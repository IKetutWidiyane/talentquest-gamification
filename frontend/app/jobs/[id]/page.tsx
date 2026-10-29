
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  MapPinIcon,
  ArrowClockwiseIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  getJobById,
  toStringArray,
  type Job,
} from "@/lib/api/jobs";
import { PublicLayout } from "@/components/layout/public-layout";

type JobDetailPageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(date?: string | null) {
  if (!date) return "Belum tersedia";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Belum tersedia";
  }

  return parsedDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function JobDetailError({
  id,
  message,
}: {
  id: string;
  message: string;
}) {
  return (
    <PublicLayout>
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F8F9FA] px-4 py-16">
        <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-50">
            <ArrowClockwiseIcon
              size={23}
              className="text-amber-700"
              aria-hidden="true"
            />
          </div>

          <h1 className="mt-5 text-xl font-bold text-[#0B1B3D]">
            Detail lowongan belum tersedia
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {message}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/jobs"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#0B1B3D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#142952]"
            >
              <ArrowLeftIcon size={16} aria-hidden="true" />
              Kembali ke lowongan
            </Link>

            <Link
              href={`/jobs/${encodeURIComponent(id)}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-[#0B1B3D] transition hover:bg-slate-50"
            >
              Coba lagi
            </Link>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}

export default async function JobDetailPage({
  params,
}: JobDetailPageProps) {
  const { id } = await params;

  let job: Job;

  try {
    job = await getJobById(id);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Detail lowongan gagal dimuat.";

    return <JobDetailError id={id} message={message} />;
  }

  // Normalisasi tambahan sebagai pengaman sebelum render.
  const responsibilities = toStringArray(job.responsibilities);
  const qualifications = toStringArray(
    job.qualifications ?? job.requirements,
  );

  const description = job.summary ?? job.description;
  const workplace = job.workplace;
  const loginUrl = `/login?redirect=${encodeURIComponent(`/jobs/${job.id}`)}`;

  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#F8F9FA]">
        {/* Header */}
        <section className="bg-[#0B1B3D] text-white">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              <ArrowLeftIcon size={16} aria-hidden="true" />
              Kembali ke lowongan
            </Link>

            <div className="mt-8">
              {job.category && (
                <span className="inline-flex rounded-md bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-300">
                  {job.category}
                </span>
              )}

              <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                {job.title}
              </h1>

              {job.department && (
                <p className="mt-3 text-base text-slate-300">
                  {job.department}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                {job.location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPinIcon
                      size={17}
                      className="text-amber-400"
                      aria-hidden="true"
                    />
                    {job.location}
                  </span>
                )}

                {job.employmentType && (
                  <span className="inline-flex items-center gap-2">
                    <BriefcaseIcon
                      size={17}
                      className="text-amber-400"
                      aria-hidden="true"
                    />
                    {job.employmentType}
                  </span>
                )}

                {workplace && <span>{workplace}</span>}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8 lg:py-14">
          <div className="space-y-6">
            <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#0B1B3D]">
                Tentang posisi
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                {description || "Deskripsi posisi belum tersedia."}
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#0B1B3D]">
                Tanggung jawab
              </h2>

              {responsibilities.length > 0 ? (
                <ul className="mt-5 space-y-4">
                  {responsibilities.map((item, index) => (
                    <li
                      key={`${index}-${item}`}
                      className="flex gap-3"
                    >
                      <CheckCircleIcon
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-600"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-6 text-slate-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Informasi tanggung jawab belum tersedia.
                </p>
              )}
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#0B1B3D]">
                Kualifikasi
              </h2>

              {qualifications.length > 0 ? (
                <ul className="mt-5 space-y-4">
                  {qualifications.map((item, index) => (
                    <li
                      key={`${index}-${item}`}
                      className="flex gap-3"
                    >
                      <CheckCircleIcon
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-600"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-6 text-slate-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Informasi kualifikasi belum tersedia.
                </p>
              )}
            </article>
          </div>

          {/* Apply CTA */}
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
              LANGKAH BERIKUTNYA
            </p>

            <h2 className="mt-3 text-xl font-bold text-[#0B1B3D]">
              Tertarik dengan posisi ini?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Masuk ke akunmu untuk melanjutkan proses lamaran dan mengikuti
              tahapan rekrutmen melalui EIGER Talent Quest.
            </p>

            <Link
              href={loginUrl}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0B1B3D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#142952] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              Masuk untuk melamar
              <ArrowRightIcon size={17} aria-hidden="true" />
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-amber-700 hover:text-amber-800"
              >
                Daftar sekarang
              </Link>
            </p>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-xs text-slate-500">Departemen</p>
              <p className="mt-1 text-sm font-semibold text-[#0B1B3D]">
                {job.department || "Belum ditentukan"}
              </p>

              <p className="mt-4 text-xs text-slate-500">
                Tanggal publikasi
              </p>
              <p className="mt-1 text-sm font-semibold text-[#0B1B3D]">
                {formatDate(job.postedAt)}
              </p>
            </div>
          </aside>
        </section>
      </main>
    </PublicLayout>
  );
}
