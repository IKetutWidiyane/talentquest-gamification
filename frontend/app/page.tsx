
import { PublicLayout } from "@/components/layout/public-layout";
import Link from "next/link";
import { ArrowRight, Compass, Target, TrendingUp } from "lucide-react";

const highlights = [
  {
    icon: Compass,
    title: "Jelajahi Peluang",
    description:
      "Temukan posisi yang sesuai dengan kemampuan dan minatmu.",
  },
  {
    icon: Target,
    title: "Kenali Potensimu",
    description:
      "Ikuti Talent Quest untuk menunjukkan kompetensi yang kamu miliki.",
  },
  {
    icon: TrendingUp,
    title: "Kembangkan Karier",
    description:
      "Pantau perkembangan lamaran dan langkah rekrutmenmu.",
  },
];

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#D8DFD5] bg-[#EDF1E9] px-3 py-1.5 text-xs font-semibold tracking-wide text-primary">
              EIGER CAREERS
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Temukan potensimu.
              <span className="block text-primary-accent">
                Mulai petualangan kariermu.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Jelajahi kesempatan berkarier bersama EIGER, ikuti tantangan
              kompetensi, dan temukan langkah berikutnya dalam perjalanan
              profesionalmu.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-accent"
              >
                Jelajahi Lowongan
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/talent-quest"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-background"
              >
                Kenali Talent Quest
              </Link>
            </div>

            <p className="mt-5 text-xs leading-5 text-muted">
              Peluang karier, tantangan kompetensi, dan proses rekrutmen dalam
              satu platform.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[#E8E9DF] blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-border bg-[#E8E9DF] p-6 sm:p-8">
              <div className="flex min-h-[300px] flex-col justify-between rounded-xl bg-primary p-7 text-white sm:min-h-[360px] sm:p-9">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#D5DCCF]">
                    YOUR NEXT CHAPTER
                  </p>

                  <h2 className="mt-5 max-w-sm text-3xl font-bold leading-tight sm:text-4xl">
                    Grow beyond your limits.
                  </h2>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">
                    Setiap perjalanan dimulai dengan kesempatan untuk
                    berkembang.
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-5">
                  <span className="text-xs font-medium tracking-wide text-white/80">
                    EIGER TALENT QUEST
                  </span>
                  <Compass size={28} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-primary-accent">
              YOUR JOURNEY STARTS HERE
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Lebih dari sekadar mencari pekerjaan
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
              Kenali peluang, tunjukkan kemampuan, dan ikuti proses rekrutmen
              dengan pengalaman yang lebih terarah.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-[0_4px_18px_rgb(29_33_30_/_6%)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg bg-[#E8EDE5] text-primary">
                    <Icon size={22} />
                  </span>

                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
