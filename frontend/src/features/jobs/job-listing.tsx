"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { jobs } from "@/features/jobs/job-data";

export default function JobListing() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("all");
  const [category, setCategory] = useState("all");
  const [employmentType, setEmploymentType] = useState("all");

  const locations = useMemo(
    () => [...new Set(jobs.map((job) => job.location))].sort(),
    [],
  );

  const categories = useMemo(
    () => [...new Set(jobs.map((job) => job.category))].sort(),
    [],
  );

  const filteredJobs = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return jobs.filter((job) => {
      const searchableText = [
        job.title,
        job.department,
        job.location,
        job.category,
        job.summary,
        job.employmentType,
      ]
        .join(" ")
        .toLowerCase();

      const matchesKeyword =
        !normalizedKeyword || searchableText.includes(normalizedKeyword);

      const matchesLocation =
        location === "all" || job.location === location;

      const matchesCategory =
        category === "all" || job.category === category;

      const matchesEmploymentType =
        employmentType === "all" ||
        job.employmentType === employmentType;

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesCategory &&
        matchesEmploymentType
      );
    });
  }, [keyword, location, category, employmentType]);

  function resetFilters() {
    setKeyword("");
    setLocation("all");
    setCategory("all");
    setEmploymentType("all");
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <section className="bg-[#0B1B3D] text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            EIGERINDO CAREERS
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Temukan peluang yang sesuai dengan potensimu.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Jelajahi peluang karier, temukan bidang yang sesuai dengan
            kemampuanmu, dan mulai langkah berikutnya bersama Eigerindo.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
            <BriefcaseBusiness size={16} className="text-amber-400" />
            {jobs.length} lowongan dalam data demo
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(240px,1.6fr)_repeat(3,minmax(150px,1fr))]">
            <div>
              <label
                htmlFor="job-keyword"
                className="mb-2 block text-sm font-semibold text-[#0B1B3D]"
              >
                Cari lowongan
              </label>

              <div className="flex h-12 items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 transition focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-100">
                <Search size={18} className="shrink-0 text-slate-400" />

                <input
                  id="job-keyword"
                  type="search"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Judul, posisi, atau kata kunci..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="job-location"
                className="mb-2 block text-sm font-semibold text-[#0B1B3D]"
              >
                Lokasi
              </label>

              <select
                id="job-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
              >
                <option value="all">Semua lokasi</option>
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="job-category"
                className="mb-2 block text-sm font-semibold text-[#0B1B3D]"
              >
                Kategori
              </label>

              <select
                id="job-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
              >
                <option value="all">Semua kategori</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="job-type"
                className="mb-2 block text-sm font-semibold text-[#0B1B3D]"
              >
                Tipe pekerjaan
              </label>

              <select
                id="job-type"
                value={employmentType}
                onChange={(event) => setEmploymentType(event.target.value)}
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
              >
                <option value="all">Semua tipe</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              <SlidersHorizontal
                size={15}
                className="mr-1.5 inline-block"
              />
              Menampilkan{" "}
              <span className="font-semibold text-[#0B1B3D]">
                {filteredJobs.length}
              </span>{" "}
              dari {jobs.length} lowongan demo
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-amber-700 transition hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
            >
              Reset pencarian dan filter
            </button>
          </div>
        </div>
      </section>

      {/* Job cards */}
      <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-[#0B1B3D] sm:text-2xl">
            Lowongan yang tersedia
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Pilih posisi untuk melihat deskripsi, tanggung jawab, dan
            kualifikasi pekerjaan.
          </p>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center rounded-md bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
                    {job.category}
                  </span>

                  <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                    {job.employmentType}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold leading-snug text-[#0B1B3D] transition-colors group-hover:text-amber-700">
                  {job.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {job.department}
                </p>

                <p className="mt-4 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                  {job.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden="true" />
                    {job.location}
                  </span>
                  <span>{job.workplace}</span>
                </div>

                <Link
                  href={`/jobs/${job.id}`}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#0B1B3D] px-4 py-3 text-sm font-semibold text-[#0B1B3D] transition hover:bg-[#0B1B3D] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                  Lihat detail
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Search
              size={28}
              className="mx-auto text-slate-400"
              aria-hidden="true"
            />

            <h3 className="mt-4 text-lg font-bold text-[#0B1B3D]">
              Lowongan tidak ditemukan
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Coba kata kunci lain atau ubah filter yang kamu pilih.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-[#0B1B3D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#142952] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              Tampilkan semua lowongan
            </button>
          </div>
        )}
      </section>
    </div>
  );
}