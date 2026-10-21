import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import { jobs } from "@/features/jobs/job-data";
import { PublicLayout } from "@/components/layout/public-layout";

type JobDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({
  params,
}: JobDetailPageProps) {
  const { id } = await params;
  const job = jobs.find((item) => item.id === id);

  if (!job) {
    notFound();
  }

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
              <ArrowLeft size={16} aria-hidden="true" />
              Kembali ke lowongan
            </Link>

            <div className="mt-8">
              <span className="inline-flex rounded-md bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-300">
                {job.category}
              </span>

              <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                {job.title}
              </h1>

              <p className="mt-3 text-base text-slate-300">
                {job.department}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={17} className="text-amber-400" />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-2">
                  <BriefcaseBusiness size={17} className="text-amber-400" />
                  {job.employmentType}
                </span>

                <span>{job.workplace}</span>
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

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {job.summary}
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#0B1B3D]">
                Tanggung jawab
              </h2>

              <ul className="mt-5 space-y-4">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2
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
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#0B1B3D]">
                Kualifikasi
              </h2>

              <ul className="mt-5 space-y-4">
                {job.qualifications.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2
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
              <ArrowRight size={17} aria-hidden="true" />
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
                {job.department}
              </p>

              <p className="mt-4 text-xs text-slate-500">Tanggal publikasi</p>
              <p className="mt-1 text-sm font-semibold text-[#0B1B3D]">
                {new Date(`${job.postedAt}T00:00:00`).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </p>
            </div>
          </aside>
        </section>
      </main>
    </PublicLayout>
  );
}