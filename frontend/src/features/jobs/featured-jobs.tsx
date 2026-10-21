
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

type FeaturedJob = {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  featured?: boolean;
};

const featuredJobs: FeaturedJob[] = [
  {
    id: "job-001",
    title: "Frontend Developer",
    department: "Technology",
    location: "Bandung, Jawa Barat",
    employmentType: "Full-time",
    description:
      "Bangun pengalaman digital yang intuitif dan responsif untuk mendukung perjalanan pelanggan EIGER.",
    featured: true,
  },
  {
    id: "job-002",
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Bandung, Jawa Barat",
    employmentType: "Full-time",
    description:
      "Kembangkan strategi pemasaran digital dan kampanye kreatif untuk menjangkau komunitas outdoor.",
  },
  {
    id: "job-003",
    title: "Product Designer",
    department: "Product & Design",
    location: "Bandung, Jawa Barat",
    employmentType: "Full-time",
    description:
      "Rancang pengalaman produk digital yang berpusat pada pengguna dengan pendekatan kreatif.",
  },
];

export default function FeaturedJobs() {
  return (
    <section
      id="featured-jobs"
      aria-labelledby="featured-jobs-heading"
      className="bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
              Explore opportunities
            </p>

            <h2
              id="featured-jobs-heading"
              className="text-3xl font-bold tracking-tight text-[#0B1B3D] sm:text-4xl"
            >
              Temukan perjalanan
              <br className="hidden sm:block" /> kariermu bersama EIGER.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Temukan peluang untuk berkembang, berkolaborasi, dan memberikan
              dampak melalui pekerjaan yang sesuai dengan potensimu.
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0B1B3D]/15 px-5 py-3 text-sm font-semibold text-[#0B1B3D] transition hover:border-amber-500 hover:bg-amber-50"
          >
            Lihat semua lowongan
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredJobs.map((job) => (
            <article
              key={job.id}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7"
            >
              <div className="mb-6 flex items-start justify-between gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#0B1B3D] text-amber-400">
                  <BriefcaseBusiness size={23} />
                </div>

                {job.featured && (
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    Featured
                  </span>
                )}
              </div>

              <p className="mb-2 text-sm font-medium text-slate-500">
                {job.department}
              </p>

              <h3 className="text-xl font-bold text-[#0B1B3D] transition group-hover:text-amber-700">
                {job.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                {job.description}
              </p>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={16} className="shrink-0 text-slate-400" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BriefcaseBusiness
                    size={16}
                    className="shrink-0 text-slate-400"
                  />
                  <span>{job.employmentType}</span>
                </div>
              </div>

              <Link
                href={`/jobs/${job.id}`}
                aria-label={`Lihat detail lowongan ${job.title}`}
                className="mt-7 inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#0B1B3D] transition hover:border-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-white"
              >
                Lihat detail
                <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Contoh lowongan untuk pengembangan UI. Ganti dengan data lowongan
          aktual dari backend sebelum digunakan sebagai informasi rekrutmen.
        </p>
      </div>
    </section>
  );
}
