
import Link from "next/link";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarBlankIcon,
  ClipboardTextIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  mockApplications,
  getApplicationStatusStyle,
} from "@/lib/mock-applications";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function CandidateApplicationsPage() {
  const applications = mockApplications;

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D97706]">
          Your career journey
        </p>

        <h1 className="text-2xl font-extrabold text-[#0B1B3D] sm:text-3xl">
          My Applications
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-[#64748B]">
          Pantau daftar lamaran, status seleksi, dan perkembangan perjalanan
          kariermu bersama EIGER Talent Quest.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#64748B]">
              Total Lamaran
            </p>
            <ClipboardTextIcon
              size={22}
              className="text-[#0B1B3D]"
              aria-hidden="true"
            />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-[#0B1B3D]">
            {applications.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#64748B]">
            Dalam Proses
          </p>
          <p className="mt-3 text-3xl font-extrabold text-amber-600">
            {
              applications.filter(
                (application) =>
                  !["ACCEPTED", "REJECTED"].includes(application.status)
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#64748B]">
            Diterima
          </p>
          <p className="mt-3 text-3xl font-extrabold text-emerald-700">
            {
              applications.filter(
                (application) => application.status === "ACCEPTED"
              ).length
            }
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-[#0B1B3D]">
            Riwayat Lamaran
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">
            Daftar posisi yang telah kamu lamar.
          </p>
        </div>

        <Link
          href="/candidate/jobs"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#172D55]"
        >
          <MagnifyingGlassIcon size={18} aria-hidden="true" />
          Jelajahi Lowongan
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white px-5 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F5F9] text-[#0B1B3D]">
            <BriefcaseIcon size={28} aria-hidden="true" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#0B1B3D]">
            Belum Ada Lamaran
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
            Temukan peluang yang sesuai dengan minatmu dan mulai perjalanan
            kariermu bersama EIGER.
          </p>

          <Link
            href="/candidate/jobs"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0B1B3D] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#172D55]"
          >
            Lihat Lowongan
            <ArrowRightIcon size={18} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <article
              key={application.id}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition hover:border-[#CBD5E1] hover:shadow-md sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1B3D] text-[#F59E0B]">
                  <BriefcaseIcon size={24} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B1B3D]">
                        {application.jobTitle}
                      </h3>

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

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#64748B]">
                    <span className="inline-flex items-center gap-2">
                      <MapPinIcon size={17} aria-hidden="true" />
                      {application.location}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <BriefcaseIcon size={17} aria-hidden="true" />
                      {application.employmentType}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <CalendarBlankIcon size={17} aria-hidden="true" />
                      Dilamar {formatDate(application.appliedAt)}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[#64748B]">
                    {application.summary}
                  </p>

                  <div className="mt-5 border-t border-[#E2E8F0] pt-4">
                    <Link
                      href={`/candidate/applications/${application.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1B3D] transition hover:text-[#B86F32]"
                    >
                      Lihat Detail Lamaran
                      <ArrowRightIcon size={18} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
