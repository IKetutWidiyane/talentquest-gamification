
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  CalendarBlankIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  mockApplications,
  getApplicationStatusStyle,
} from "@/lib/mock-application";

import type { ApplicationStatus } from "@/lib/mock-application";

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

const timelineStages: {
  status: ApplicationStatus;
  title: string;
  description: string;
}[] = [
  {
    status: "SUBMITTED",
    title: "Lamaran Terkirim",
    description: "Lamaran berhasil dikirim dan tercatat dalam sistem.",
  },
  {
    status: "IN_REVIEW",
    title: "Peninjauan Lamaran",
    description: "Tim Talent Acquisition meninjau profil dan kualifikasi.",
  },
  {
    status: "ASSESSMENT",
    title: "Assessment",
    description: "Kandidat mengikuti tahapan penilaian kompetensi.",
  },
  {
    status: "INTERVIEW",
    title: "Interview",
    description: "Kandidat mengikuti sesi wawancara dengan tim rekrutmen.",
  },
  {
    status: "ACCEPTED",
    title: "Diterima",
    description: "Kandidat dinyatakan diterima untuk posisi ini.",
  },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params;

  const application = mockApplications.find((item) => item.id === id);

  if (!application) {
    notFound();
  }

  const isRejected = application.status === "REJECTED";

  const currentStageIndex = isRejected
    ? timelineStages.findIndex(
        (stage) => stage.status === "IN_REVIEW"
      )
    : timelineStages.findIndex(
        (stage) => stage.status === application.status
      );

  return (
    <section className="space-y-6">
      <Link
        href="/candidate/applications"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#0B1B3D]"
      >
        <ArrowLeftIcon size={18} aria-hidden="true" />
        Kembali ke My Applications
      </Link>

      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D97706]">
          Application overview
        </p>

        <h1 className="text-2xl font-extrabold text-[#0B1B3D] sm:text-3xl">
          Detail Lamaran
        </h1>

        <p className="text-sm leading-6 text-[#64748B]">
          Informasi posisi dan perkembangan proses rekrutmen kamu.
        </p>
      </div>

      <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#0B1B3D] text-[#F59E0B]">
            <BriefcaseIcon size={28} aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#0B1B3D]">
                  {application.jobTitle}
                </h2>

                <p className="mt-1 text-sm text-[#64748B]">
                  {application.department}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${getApplicationStatusStyle(application.status)}`}
              >
                {application.statusLabel}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#64748B]">
              <span className="inline-flex items-center gap-2">
                <MapPinIcon size={18} aria-hidden="true" />
                {application.location}
              </span>

              <span className="inline-flex items-center gap-2">
                <BriefcaseIcon size={18} aria-hidden="true" />
                {application.employmentType}
              </span>

              <span className="inline-flex items-center gap-2">
                <CalendarBlankIcon size={18} aria-hidden="true" />
                Dilamar {formatDate(application.appliedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-[#F8FAFC] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Informasi Lamaran
          </p>

          <p className="mt-2 text-sm leading-6 text-[#334155]">
            {application.summary}
          </p>

          <p className="mt-3 text-xs text-[#64748B]">
            ID Lamaran: {application.id}
          </p>
        </div>
      </article>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D97706]">
            Recruitment progress
          </p>

          <h2 className="mt-2 text-xl font-extrabold text-[#0B1B3D]">
            Application Status Timeline
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#64748B]">
            Pantau tahapan yang sudah dilalui dan status lamaran saat ini.
          </p>
        </div>

        {isRejected && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <XCircleIcon
              size={23}
              className="mt-0.5 shrink-0 text-rose-600"
              aria-hidden="true"
            />

            <div>
              <p className="font-bold text-rose-800">
                Lamaran Tidak Dilanjutkan
              </p>
              <p className="mt-1 text-sm leading-6 text-rose-700">
                Proses seleksi untuk lamaran ini telah berakhir.
              </p>
            </div>
          </div>
        )}

        <div className="mt-7">
          {timelineStages.map((stage, index) => {
            const isCompleted =
              !isRejected && currentStageIndex >= index;

            const isCurrent =
              !isRejected && currentStageIndex === index;

            const isPast =
              isRejected && index <= currentStageIndex;

            const isDone = isCompleted || isPast;

            return (
              <div key={stage.status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isDone
                        ? "bg-[#24352B] text-white"
                        : "bg-[#F1F5F9] text-[#94A3B8]"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircleIcon
                        size={22}
                        weight="fill"
                        aria-hidden="true"
                      />
                    ) : (
                      <ClockIcon size={21} aria-hidden="true" />
                    )}
                  </div>

                  {index < timelineStages.length - 1 && (
                    <div
                      className={`my-1 min-h-12 w-0.5 flex-1 ${
                        isDone && currentStageIndex > index && !isRejected
                          ? "bg-[#3F5A43]"
                          : "bg-[#E2E8F0]"
                      }`}
                    />
                  )}
                </div>

                <div className="pb-8 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`font-bold ${
                        isCurrent
                          ? "text-[#24352B]"
                          : isDone
                            ? "text-[#334155]"
                            : "text-[#94A3B8]"
                      }`}
                    >
                      {stage.title}
                    </h3>

                    {isCurrent && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                        Status Saat Ini
                      </span>
                    )}
                  </div>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-[#64748B]">
                    {stage.description}
                  </p>

                  {stage.status === "SUBMITTED" && (
                    <p className="mt-2 text-xs text-[#64748B]">
                      {formatDate(application.appliedAt)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs leading-5 text-[#64748B]">
          Timeline ini merupakan simulasi UI berdasarkan status pada data
          lamaran. Tanggal setiap tahapan selain pengiriman belum tersedia.
          Status seleksi aktual nantinya perlu berasal dari backend.
        </p>
      </section>

      <div>
        <Link
          href="/candidate/applications"
          className="inline-flex items-center justify-center rounded-xl border border-[#CBD5E1] px-5 py-3 text-sm font-bold text-[#0B1B3D] transition hover:bg-[#F8FAFC]"
        >
          Kembali ke Daftar Lamaran
        </Link>
      </div>
    </section>
  );
}
