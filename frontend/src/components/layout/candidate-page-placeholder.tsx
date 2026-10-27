
import type { Icon } from "@phosphor-icons/react";
import { HardHat } from "@phosphor-icons/react/dist/ssr";

interface CandidatePagePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: Icon;
}

export default function CandidatePagePlaceholder({
  eyebrow,
  title,
  description,
  icon: Icon,
}: CandidatePagePlaceholderProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D97706]">
            {eyebrow}
          </p>

          <h1 className="text-2xl font-extrabold tracking-tight text-[#0B1B3D] sm:text-3xl">
            {title}
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
            {description}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1B3D] text-[#F59E0B] sm:h-14 sm:w-14">
          <Icon size={26} aria-hidden="true" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="h-1.5 bg-[#D97706]" />

        <div className="flex min-h-[280px] flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[340px]">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F5F9] text-[#0B1B3D]">
            <HardHat size={27} aria-hidden="true" />
          </div>

          <h2 className="text-lg font-bold text-[#0B1B3D]">
            Halaman siap dikembangkan
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-[#64748B]">
            Layout dan navigasi dasar sudah disiapkan. Fitur halaman ini
            akan dikembangkan pada tahap berikutnya.
          </p>

          <span className="mt-5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-3 py-1.5 text-xs font-semibold text-[#92400E]">
            UI foundation
          </span>
        </div>
      </div>
    </section>
  );
}
