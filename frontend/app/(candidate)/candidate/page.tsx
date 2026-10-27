
import Link from "next/link";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  MountainsIcon,
  SparkleIcon,
  TargetIcon,
  UserIcon,
} from "@phosphor-icons/react";

const overviewItems = [
  {
    label: "Total Lamaran",
    value: "—",
    description: "Semua lamaran yang telah dikirim",
    icon: BriefcaseIcon,
  },
  {
    label: "Dalam Proses",
    value: "—",
    description: "Lamaran yang sedang ditinjau",
    icon: ClockIcon,
  },
  {
    label: "Assessment Selesai",
    value: "—",
    description: "Talent Quest yang telah dikerjakan",
    icon: CheckCircleIcon,
  },
];

const quickActions = [
  {
    title: "Jelajahi Lowongan",
    description: "Temukan peluang karier yang sesuai.",
    href: "/candidate/jobs",
    icon: BriefcaseIcon,
  },
  {
    title: "Lengkapi Profil",
    description: "Perbarui informasi diri dan pengalaman.",
    href: "/candidate/profile",
    icon: UserIcon,
  },
  {
    title: "Talent Quest",
    description: "Kenali proses assessment kandidat.",
    href: "/candidate/talent-quest",
    icon: TargetIcon,
  },
];

export default function CandidateDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <section className="relative isolate overflow-hidden rounded-2xl bg-[#0B1B3D] p-6 text-white shadow-sm sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-16 -z-10 h-64 w-64 rounded-full border-[32px] border-white/[0.05]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 right-24 -z-10 h-48 w-48 rounded-full bg-[#D97706]/10 blur-2xl"
        />

        <div className="relative max-w-2xl">
          

          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Selamat datang di perjalanan kariermu!
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Pantau proses lamaran, persiapkan dirimu, dan temukan
            peluang baru bersama EIGER Talent Quest.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/candidate/jobs"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#D97706] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B45309] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B3D]"
            >
              Jelajahi Lowongan
              <ArrowRightIcon size={16} />
            </Link>

            <Link
              href="/candidate/profile"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <UserIcon size={16} />
              Lihat Profil
            </Link>
          </div>
        </div>
      </section>

      {/* Activity overview */}
      <section aria-labelledby="overview-heading" className="space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D97706]">
            Your Progress
          </p>
          <h2
            id="overview-heading"
            className="mt-1 text-xl font-extrabold text-[#0B1B3D] sm:text-2xl"
          >
            Ringkasan Aktivitas
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Pantau perkembangan proses rekrutmenmu di satu tempat.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {overviewItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B1B3D]">
                      {item.value}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-[#D97706]">
                    <Icon size={21} aria-hidden="true" />
                  </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  {item.description}
                </p>
                <p className="mt-2 text-[11px] text-slate-400">
                  Menunggu integrasi data
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Main dashboard content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent applications */}
        <section
          aria-labelledby="applications-heading"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2
                id="applications-heading"
                className="text-lg font-bold text-[#0B1B3D]"
              >
                Lamaran Terbaru
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Lihat perkembangan lamaran pekerjaanmu.
              </p>
            </div>

            <Link
              href="/candidate/applications"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#B45309] hover:text-[#92400E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706]"
            >
              Semua Lamaran
              <ArrowRightIcon size={15} />
            </Link>
          </div>

          <div className="mt-6 flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
              <FileTextIcon size={23} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#0B1B3D]">
              Data lamaran belum tersedia
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Daftar lamaran terbaru akan muncul di sini setelah
              integrasi data lamaran kandidat tersedia.
            </p>

            <Link
              href="/candidate/jobs"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1B3D] transition hover:border-amber-400 hover:bg-amber-50"
            >
              Cari Lowongan
              <ArrowRightIcon size={15} />
            </Link>
          </div>
        </section>

        {/* Talent Quest card */}
        <section className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-1.5 bg-[#D97706]" />

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1B3D] text-amber-400">
              <MountainsIcon size={24} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#D97706]">
              Discover Your Potential
            </p>

            <h2 className="mt-2 text-xl font-extrabold text-[#0B1B3D]">
              EIGER Talent Quest
            </h2>

            <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
              Kenali proses assessment dan persiapkan dirimu untuk
              menunjukkan potensi serta kompetensi terbaikmu.
            </p>

            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/70 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#92400E]">
                <TargetIcon size={17} />
                Progres Assessment
              </div>
              <p className="mt-2 text-xs leading-5 text-amber-900/75">
                Informasi progres akan tersedia setelah data
                assessment terhubung.
              </p>
            </div>

            <Link
              href="/candidate/talent-quest"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0B1B3D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#152B55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] focus-visible:ring-offset-2"
            >
              Buka Talent Quest
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>
      </div>

      {/* Quick actions */}
      <section aria-labelledby="quick-actions-heading" className="space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D97706]">
            Get Started
          </p>
          <h2
            id="quick-actions-heading"
            className="mt-1 text-xl font-extrabold text-[#0B1B3D]"
          >
            Akses Cepat
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#0B1B3D] transition group-hover:bg-amber-50 group-hover:text-[#B45309]">
                  <Icon size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[#0B1B3D]">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {action.description}
                  </p>
                </div>

                <ArrowRightIcon
                  size={17}
                  className="mt-1 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#D97706]"
                />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
