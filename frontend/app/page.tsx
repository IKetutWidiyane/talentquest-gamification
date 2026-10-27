import { PublicLayout } from "@/components/layout/public-layout";
import Link from "next/link";
import {
  ArrowRightIcon,
  BrainIcon,
  CompassIcon,
  FlagIcon,
  HandshakeIcon,
  ArrowClockwiseIcon,
  PathIcon,
  TargetIcon,
  TrendUpIcon,
  UsersIcon,
} from "@phosphor-icons/react";

import FeaturedJobs from "@/features/jobs/featured-jobs";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const highlights = [
  {
    icon: CompassIcon,
    title: "Jelajahi peluang",
    description:
      "Temukan posisi yang sesuai dengan kemampuan dan minatmu, dari kantor pusat hingga lini produksi.",
  },
  {
    icon: TargetIcon,
    title: "Kenali potensimu",
    description:
      "Ikuti Talent Quest untuk menunjukkan cara kamu berpikir, beradaptasi, dan mengambil keputusan.",
  },
  {
    icon: TrendUpIcon,
    title: "Kembangkan kariermu",
    description:
      "Pantau setiap tahap lamaran dari satu tempat, tanpa perlu menebak sudah sampai mana prosesnya.",
  },
];

const recruitmentSteps = [
  {
    title: "Kirim lamaran",
    description: "Pilih lowongan, lengkapi profil, dan unggah CV.",
  },
  {
    title: "Ikuti Talent Quest",
    description: "Selesaikan tantangan berbasis skenario.",
  },
  {
    title: "Ditinjau tim TA",
    description: "Tim Talent Acquisition membaca profil dan hasilmu.",
  },
  {
    title: "Wawancara",
    description: "Bertemu langsung dengan tim yang relevan.",
  },
  {
    title: "Keputusan akhir",
    description: "Kamu mendapat kabar di platform ini.",
  },
];

const challenges = [
  {
    icon: BrainIcon,
    title: "Problem solving",
    description: "Menguraikan masalah dan memilih solusi yang efektif.",
  },
  {
    icon: PathIcon,
    title: "Decision making",
    description: "Mengambil keputusan dengan informasi yang terbatas.",
  },
  {
    icon: UsersIcon,
    title: "Collaboration",
    description: "Bekerja bersama saat kepentingan tidak selalu sama.",
  },
  {
    icon: ArrowClockwiseIcon,
    title: "Adaptability",
    description: "Menyesuaikan langkah ketika keadaan berubah.",
  },
];

/* -------------------------------------------------------------------------- */
/* Hero illustration: peta jalur dengan garis kontur                          */
/* -------------------------------------------------------------------------- */

const CONTOUR_PATH =
  "M270 60 C320 62 360 100 358 150 C356 205 310 236 262 232 C210 228 176 190 182 140 C188 90 226 58 270 60Z";

const contourRings = [
  { scale: 0.22, rotate: 0 },
  { scale: 0.45, rotate: 6 },
  { scale: 0.7, rotate: -4 },
  { scale: 1, rotate: 8 },
  { scale: 1.32, rotate: -2 },
  { scale: 1.68, rotate: 5 },
  { scale: 2.1, rotate: -6 },
];

function TrailMap() {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Ilustrasi peta jalur pendakian dengan empat pos tantangan menuju puncak"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <g
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.12"
        strokeWidth="1"
      >
        {contourRings.map((ring) => (
          <path
            key={ring.scale}
            d={CONTOUR_PATH}
            transform={`translate(270 146) rotate(${ring.rotate}) scale(${ring.scale}) translate(-270 -146)`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {/* Jalur tantangan */}
      <path
        className="trail-draw"
        pathLength={1}
        d="M50 350 C110 330 90 280 150 270 S250 300 280 250 S200 200 240 170 S262 150 270 146"
        fill="none"
        stroke="#D97706"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Pos tantangan */}
      {[
        { x: 50, y: 350, n: "1" },
        { x: 150, y: 270, n: "2" },
        { x: 280, y: 250, n: "3" },
        { x: 240, y: 170, n: "4" },
      ].map((point) => (
        <g key={point.n}>
          <circle cx={point.x} cy={point.y} r="12" fill="#F8F9FA" />
          <text
            x={point.x}
            y={point.y + 4.5}
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#0F172A"
          >
            {point.n}
          </text>
        </g>
      ))}

      <g fontSize="11" fontWeight="600" fill="#F1F5F9">
        <text x="68" y="354">
          Problem solving
        </text>
        <text x="150" y="248" textAnchor="middle">
          Decision making
        </text>
        <text x="296" y="254">
          Collaboration
        </text>
        <text x="224" y="166" textAnchor="end">
          Adaptability
        </text>
      </g>

      {/* Puncak */}
      <g>
        <path d="M270 146 L270 118" stroke="#F8F9FA" strokeWidth="2" />
        <path d="M270 118 L294 126 L270 134Z" fill="#D97706" />
        <circle cx="270" cy="146" r="4.5" fill="#F8F9FA" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600";

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Animasi jalur */}
      <style>{`
        .trail-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
        }

        @media (prefers-reduced-motion: no-preference) {
          .trail-draw {
            animation: trail-draw 1.6s cubic-bezier(.4,0,.2,1) .2s both;
          }
        }

        @keyframes trail-draw {
          from {
            stroke-dashoffset: 1;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* ------------------------------------------------------------------ */}
      {/* Hero Section                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-[#F8F9FA] pt-0">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 pb-8 pt-2 sm:px-6 sm:pb-12 sm:pt-4 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-16 lg:pt-4">
          <div className="lg:col-span-7 lg:pr-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              EIGERINDO CAREERS
            </p>

            <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-[#0B1B3D] sm:text-5xl lg:text-6xl">
              Temukan potensimu. Mulai petualangan kariermu.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Jelajahi kesempatan berkarier bersama Eigerindo, ikuti tantangan
              kompetensi profesional, dan wujudkan lompatan besar dalam
              perjalanan industri ritel dan outdoor bersama kami.
            </p>

            <div className="mt-6 flex flex-col gap-3.5 sm:flex-row">
              <Link
                href="/jobs"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0B1B3D] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#142952] ${focusRing}`}
              >
                Jelajahi lowongan
                <ArrowRightIcon size={17} aria-hidden="true" />
              </Link>

              <Link
                href="/talent-quest"
                className={`inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#0B1B3D] shadow-sm transition-all hover:border-[#0B1B3D] hover:bg-slate-50 ${focusRing}`}
              >
                Kenali Talent Quest
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-200/80 pt-6 text-xs font-medium text-slate-500">
              <span>✓ Kantor Pusat &amp; Operasional</span>
              <span>✓ Jalur Karier Transparan</span>
              <span>✓ Penilaian Berbasis Skenario</span>
            </div>
          </div>

          {/* Ilustrasi peta */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 shadow-xl">
              <div className="relative aspect-[4/4.2] overflow-hidden bg-[#0B1B3D] sm:aspect-[4/3.8] lg:aspect-[4/4.2]">
                <TrailMap />

                <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-[#0B1B3D]/90 to-transparent p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-500">
                    Eigerindo Talent Pathway
                  </p>
                  <h2 className="mt-1.5 max-w-xs text-2xl font-bold leading-tight text-white sm:text-3xl">
                    Empat pos. Satu profil talenta unggul.
                  </h2>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-[#0B1B3D]/95 px-6 py-4 backdrop-blur-md sm:px-8">
                  <span className="text-xs font-semibold tracking-wide text-slate-300">
                    EIGER Talent Quest Assessment
                  </span>
                  <FlagIcon
                    size={20}
                    strokeWidth={2}
                    className="text-amber-500"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Highlights                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              VALUE PROPOSITION
            </span>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0B1B3D] sm:text-3xl">
              Lebih dari sekadar mencari pekerjaan
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-600">
              Kenali peluang, tunjukkan kapabilitas terbaikmu, dan ikuti proses
              rekrutmen di Eigerindo dengan pengalaman yang transparan serta
              terarah.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-slate-200 border-t-4 border-t-amber-600 bg-[#F8F9FA] p-7 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <span className="flex size-12 items-center justify-center rounded-lg bg-amber-50 text-amber-700 shadow-inner">
                    <Icon size={24} aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 text-lg font-bold text-[#0B1B3D]">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Featured Jobs                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-slate-200 bg-[#F8F9FA]">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <FeaturedJobs />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Alur Rekrutmen                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              RECRUITMENT PIPELINE
            </span>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0B1B3D] sm:text-3xl">
              Cara kerja rekrutmen Eigerindo
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-600">
              Lima tahap yang terstruktur, memastikan kamu selalu tahu posisi
              dan status lamaranmu.
            </p>
          </div>

          <ol className="mt-12 grid gap-8 md:grid-cols-5 md:gap-4">
            {recruitmentSteps.map((step, index) => (
              <li key={step.title} className="relative md:pr-4">
                {index < recruitmentSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-12 right-0 top-5 hidden h-0.5 bg-slate-300 md:block"
                  />
                )}

                {index < recruitmentSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-2rem] left-5 top-12 w-0.5 bg-slate-300 md:hidden"
                  />
                )}

                <div className="relative flex gap-4 md:block">
                  <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#0B1B3D] bg-white text-sm font-extrabold text-[#0B1B3D] shadow-sm">
                    {index + 1}
                  </span>

                  <div className="md:mt-4">
                    <h3 className="text-base font-bold text-[#0B1B3D]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Talent Quest                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[#0B1B3D] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              GAMIFIED ASSESSMENT
            </span>

            <h2 className="mt-2 max-w-md text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              Talent Quest: Kenali cara berpikir dan bertindakmu
            </h2>

            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              Selesaikan empat tantangan berbasis skenario nyata di dunia
              kerja. Hasilnya memberikan pemetaan potensi kekuatan dirimu
              secara objektif.
            </p>

            <Link
              href="/talent-quest"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-amber-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Pelajari Talent Quest
              <ArrowRightIcon size={17} aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {challenges.map((item) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-[#142952]/60 p-6 backdrop-blur-sm transition-all hover:border-amber-500/50"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-amber-400">
                    <Icon size={20} strokeWidth={2} aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA Penutup                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-slate-200 bg-[#F8F9FA] p-8 shadow-sm sm:p-12 lg:flex-row lg:items-center">
            <div className="flex items-center gap-6">
              <span className="hidden size-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shadow-sm sm:flex">
                <HandshakeIcon size={28} aria-hidden="true" />
              </span>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#0B1B3D] sm:text-2xl">
                  Siap memulai langkah berkarier bersama Eigerindo?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  Buat akun, lengkapi profil profesionalmu, dan temukan posisi
                  yang paling sesuai dengan passionmu.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
              <Link
                href="/jobs"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0B1B3D] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#142952] ${focusRing}`}
              >
                Jelajahi lowongan
                <ArrowRightIcon size={17} aria-hidden="true" />
              </Link>

              <Link
                href="/register"
                className={`inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#0B1B3D] shadow-sm transition-all hover:border-[#0B1B3D] hover:bg-slate-50 ${focusRing}`}
              >
                Buat akun
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
