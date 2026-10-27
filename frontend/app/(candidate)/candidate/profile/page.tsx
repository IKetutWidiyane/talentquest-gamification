import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle,
  CaretRight,
  UserCircle,
  Clock,
  FileText,
  GraduationCap,
  Envelope,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  User,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

const candidate = {
  name: "Candidate Demo",
  email: "candidate@example.com",
  phone: "Belum ditambahkan",
  location: "Belum ditambahkan",
  headline: "Candidate EIGER Talent Quest",
  summary:
    "Lengkapi profil untuk membantu tim Talent Acquisition mengenal latar belakang dan potensi kamu selama proses rekrutmen.",
  birthDate: "Belum ditambahkan",
  gender: "Belum ditambahkan",
  address: "Belum ditambahkan",
};

const profileSections = [
  {
    title: "Pendidikan",
    description: "Tambahkan riwayat pendidikan formal kamu.",
    icon: GraduationCap,
    href: "/candidate/profile/experience",
    action: "Kelola Pendidikan & Pengalaman",
  },
  {
    title: "Pengalaman",
    description: "Tambahkan pengalaman kerja, organisasi, atau magang.",
    icon: Briefcase,
    href: "/candidate/profile/experience",
    action: "Kelola Pengalaman",
  },
  {
    title: "Kompetensi",
    description: "Tambahkan keahlian dan tingkat penguasaanmu.",
    icon: ShieldCheck,
    href: "/candidate/profile/skills",
    action: "Kelola Kompetensi",
  },
];

function InfoItem({
  icon: IconComponent,
  label,
  value,
}: {
  icon: Icon;
  label: string;
  value: string;
}) {
  const isEmpty =
    value === "Belum ditambahkan" || value.trim().length === 0;

  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#0B1B3D]">
        <IconComponent size={18} aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p
          className={`mt-1 break-words text-sm font-semibold ${
            isEmpty ? "text-slate-400" : "text-[#0B1B3D]"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function CandidateProfilePage() {
  return (
    <div className="space-y-7">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D97706]">
            Your Career Journey
          </p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0B1B3D] sm:text-3xl">
            My Profile
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Kelola informasi pribadi dan persiapkan profil terbaikmu
            untuk proses rekrutmen EIGER.
          </p>
        </div>

        <Link
          href="/candidate/profile/edit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0B1B3D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#152B55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] focus-visible:ring-offset-2"
        >
          <Pencil size={16} />
          Edit Profil
        </Link>
      </section>

      {/* Profile hero */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-2 bg-[#D97706]" />

        <div className="p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#0B1B3D] text-amber-400 sm:h-24 sm:w-24">
              <UserCircle size={48} weight="light" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-extrabold text-[#0B1B3D] sm:text-2xl">
                  {candidate.name}
                </h3>

                <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                  <Clock size={12} />
                  Profil Demo
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {candidate.headline}
              </p>

              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-5">
                <span className="inline-flex items-center gap-2 break-all">
                  <Envelope size={15} className="shrink-0 text-slate-400" />
                  {candidate.email}
                </span>

                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} className="shrink-0 text-slate-400" />
                  {candidate.location}
                </span>
              </div>
            </div>

            <div className="hidden shrink-0 rounded-xl bg-amber-50 p-4 text-[#92400E] lg:block">
              <User size={27} weight="duotone" />
              <p className="mt-2 text-xs font-bold">Candidate Portal</p>
              <p className="mt-1 text-[11px]">EIGER Talent Quest</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal information */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h3 className="text-lg font-bold text-[#0B1B3D]">
              Informasi Pribadi
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Informasi dasar mengenai identitas dan kontak kamu.
            </p>
          </div>

          <Link
            href="/candidate/profile/edit"
            aria-label="Edit informasi pribadi"
            className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-[#0B1B3D] transition hover:border-amber-300 hover:bg-amber-50 sm:self-auto"
          >
            <Pencil size={15} />
            Edit
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          <InfoItem icon={User} label="Nama Lengkap" value={candidate.name} />
          <InfoItem icon={Envelope} label="Alamat Email" value={candidate.email} />
          <InfoItem icon={Phone} label="Nomor Telepon" value={candidate.phone} />
          <InfoItem icon={Calendar} label="Tanggal Lahir" value={candidate.birthDate} />
          <InfoItem icon={User} label="Jenis Kelamin" value={candidate.gender} />
          <InfoItem icon={MapPin} label="Domisili" value={candidate.location} />
        </div>

        <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Alamat Lengkap
          </p>
          <p className="mt-2 text-sm text-slate-600">{candidate.address}</p>
        </div>
      </section>

      {/* About candidate */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#B45309]">
            <FileText size={20} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-[#0B1B3D]">
                Tentang Saya
              </h3>

              <Link
                href="/candidate/profile/edit"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#B45309] hover:text-[#92400E]"
              >
                Perbarui
                <CaretRight size={15} />
              </Link>
            </div>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {candidate.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Education, experience and competencies */}
      <section className="space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D97706]">
            Complete Your Profile
          </p>

          <h3 className="mt-1 text-xl font-extrabold text-[#0B1B3D]">
            Informasi Pendukung
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Lengkapi bagian berikut agar tim rekrutmen dapat mengenal
            latar belakang dan kompetensi kamu dengan lebih baik.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {profileSections.map((section) => {
            const IconComponent = section.icon;

            return (
              <article
                key={section.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-[#0B1B3D]">
                    <IconComponent size={21} />
                  </div>

                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-800">
                    Perlu dilengkapi
                  </span>
                </div>

                <h4 className="mt-4 font-bold text-[#0B1B3D]">
                  {section.title}
                </h4>

                <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                  {section.description}
                </p>

                <Link
                  href={section.href}
                  className="mt-4 inline-flex min-h-10 w-full items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-[#0B1B3D] transition hover:border-amber-300 hover:bg-amber-50"
                >
                  {section.action}
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom action */}
      <section className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h3 className="font-bold text-[#0B1B3D]">
            Siap memperbarui profilmu?
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Pastikan informasi yang kamu tampilkan akurat dan terbaru.
          </p>
        </div>

        <Link
          href="/candidate/profile/edit"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#D97706] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B45309] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B3D] focus-visible:ring-offset-2"
        >
          Lengkapi Profil
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}