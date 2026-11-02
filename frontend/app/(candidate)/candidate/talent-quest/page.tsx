
import Link from "next/link";
import {
  ArrowRightIcon,
  BrainIcon,
  CheckCircleIcon,
  CompassIcon,
  FlagIcon,
  TargetIcon,
} from "@phosphor-icons/react/dist/ssr";

const assessmentHighlights = [
  {
    icon: BrainIcon,
    title: "Kenali Potensimu",
    description:
      "Kerjakan tantangan untuk menunjukkan cara berpikir, pemecahan masalah, dan kemampuanmu.",
  },
  {
    icon: TargetIcon,
    title: "Ukur Kompetensi",
    description:
      "Dapatkan gambaran kompetensi yang relevan dengan perjalanan kariermu.",
  },
  {
    icon: FlagIcon,
    title: "Pantau Perkembangan",
    description:
      "Lihat hasil dan riwayat assessment untuk memahami perkembanganmu.",
  },
];

const preparationItems = [
  "Pastikan koneksi internet stabil.",
  "Pilih waktu ketika kamu bisa fokus.",
  "Baca instruksi sebelum memulai.",
  "Periksa jawaban sebelum mengirim assessment.",
];

export default function TalentQuestPage() {
  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#24352B] p-6 text-white sm:p-10">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" />
        <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full border border-white/10" />

        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8D5A5]">
            <CompassIcon size={16} aria-hidden="true" />
            EIGER Talent Quest
          </div>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
            Discover Your Potential.
            <span className="block text-[#D8BD78]">
              Take the Next Challenge.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            Kenali kemampuanmu melalui rangkaian assessment Talent Quest.
            Persiapkan diri, selesaikan tantangan, dan pelajari hasilnya
            sebagai bagian dari perjalanan kariermu.
          </p>

          <Link
            href="/candidate/talent-quest/demo-assessment/instructions"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#D8BD78] px-5 py-3.5 text-sm font-bold text-[#24352B] transition hover:bg-[#E8D5A5]"
          >
            Mulai Assessment
            <ArrowRightIcon size={19} aria-hidden="true" />
          </Link>

          <p className="mt-3 text-xs text-white/55">
            Mode demonstrasi · Hasil belum menjadi penilaian rekrutmen resmi
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B86F32]">
          Your journey
        </p>
        <h2 className="mt-2 text-xl font-extrabold text-[#24352B] sm:text-2xl">
          What You Will Discover
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {assessmentHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF1E9] text-[#3F5A43]">
                  <Icon size={25} aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-bold text-[#24352B]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold text-[#24352B]">
            Sebelum Memulai
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#64748B]">
            Persiapan sederhana agar kamu dapat mengikuti assessment dengan
            nyaman.
          </p>

          <ul className="mt-5 space-y-4">
            {preparationItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircleIcon
                  size={21}
                  className="mt-0.5 shrink-0 text-[#3F5A43]"
                  aria-hidden="true"
                />
                <span className="text-sm leading-6 text-[#475569]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="rounded-2xl border border-[#E8DCC4] bg-[#FAF7F0] p-5 sm:p-6">
          <CompassIcon
            size={27}
            className="text-[#B86F32]"
            aria-hidden="true"
          />

          <h2 className="mt-4 text-lg font-bold text-[#24352B]">
            Every Challenge Is a Step Forward
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#64748B]">
            Talent Quest dirancang sebagai pengalaman untuk mengeksplorasi
            kompetensi. Kerjakan setiap tantangan dengan teliti dan jujur.
          </p>
        </aside>
      </div>
    </section>
  );
}
