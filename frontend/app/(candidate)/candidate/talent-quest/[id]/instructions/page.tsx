
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CompassIcon,
  FlagIcon,
  ListChecksIcon,
  ShieldCheckIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";

type PageProps = {
  params: Promise<{ id: string }>;
};

const instructions = [
  {
    number: "01",
    title: "Pahami setiap pertanyaan",
    description:
      "Baca pertanyaan dan seluruh pilihan jawaban dengan teliti sebelum menentukan jawaban.",
    icon: ListChecksIcon,
  },
  {
    number: "02",
    title: "Jawab secara mandiri",
    description:
      "Kerjakan assessment berdasarkan kemampuan dan pemahaman diri sendiri.",
    icon: ShieldCheckIcon,
  },
  {
    number: "03",
    title: "Perhatikan navigasi",
    description:
      "Gunakan navigasi soal untuk berpindah dan meninjau kembali jawaban sebelum mengirim.",
    icon: CompassIcon,
  },
  {
    number: "04",
    title: "Periksa sebelum mengirim",
    description:
      "Pastikan seluruh pertanyaan sudah ditinjau. Pengiriman jawaban perlu dilakukan dengan teliti.",
    icon: CheckCircleIcon,
  },
];

export default async function AssessmentInstructionsPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#F5F3EA] px-4 py-8 text-[#24352B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back navigation */}
        <Link
          href="/candidate/talent-quest"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#647568] transition hover:text-[#24352B]"
        >
          <ArrowLeftIcon size={18} />
          Kembali ke Talent Quest
        </Link>

        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-[#24352B] p-7 text-white sm:p-10">
          <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-2 -top-6 h-44 w-44 rounded-full border border-white/10" />

          <div className="relative z-10 max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C7A34A]/40 bg-[#C7A34A]/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#E7D49B]">
              <CompassIcon size={15} weight="fill" />
              YOUR NEXT ADVENTURE
            </div>

            <p className="mb-2 text-sm font-medium text-[#C7A34A]">
              TALENT QUEST / PREPARATION
            </p>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Ready for the
              <br />
              next challenge?
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Sebelum memulai perjalananmu, luangkan waktu untuk memahami
              petunjuk berikut. Persiapkan diri dan tunjukkan potensi terbaikmu.
            </p>
          </div>

          <div className="relative z-10 mt-8 flex items-center gap-3 border-t border-white/15 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C7A34A]/20 text-[#E7D49B]">
              <FlagIcon size={22} weight="fill" />
            </div>
            <div>
              <p className="text-sm font-semibold">Preparation checkpoint</p>
              <p className="text-xs text-white/60">
                Review the guidelines before you begin
              </p>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="mt-9">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B86F32]">
              Assessment guidelines
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Petunjuk Pengerjaan
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#718074]">
              Ikuti beberapa panduan berikut agar proses assessment berjalan
              dengan baik.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {instructions.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="rounded-2xl border border-[#E4E1D6] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#3F5A43]">
                      <Icon size={23} weight="duotone" />
                    </div>
                    <span className="text-sm font-bold tracking-widest text-[#B7B9AA]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-bold text-[#24352B]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#718074]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Important notice */}
        <section className="mt-8 rounded-2xl border border-[#E8D9B7] bg-[#FBF5E8] p-5">
          <div className="flex items-start gap-3">
            <WarningCircleIcon
              size={23}
              weight="fill"
              className="mt-0.5 shrink-0 text-[#B86F32]"
            />
            <div>
              <h3 className="font-bold text-[#725329]">
                Hal yang perlu diperhatikan
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#806B48]">
                <li>
                  • Pastikan koneksi internet dan perangkat dalam kondisi baik.
                </li>
                <li>
                  • Hindari menutup halaman selama assessment berlangsung.
                </li>
                <li>
                  • Pastikan jawaban sudah diperiksa sebelum melakukan pengiriman.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ready confirmation */}
        <section className="mt-8 rounded-2xl border border-[#E4E1D6] bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircleIcon
                  size={20}
                  weight="fill"
                  className="text-[#3F7A4B]"
                />
                <h3 className="font-bold">Sudah siap untuk memulai?</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#718074]">
                Pastikan kamu sudah membaca seluruh petunjuk. Setelah siap,
                lanjutkan ke halaman pengerjaan assessment.
              </p>
            </div>

            <Link
              href={`/candidate/talent-quest/${id}/assessment`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3F5A43] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#304934]"
            >
              Mulai Assessment
              <ArrowRightIcon size={18} weight="bold" />
            </Link>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-[#92998F]">
          EIGER Talent Quest · Explore your potential, embrace the challenge.
        </p>
      </div>
    </main>
  );
}
