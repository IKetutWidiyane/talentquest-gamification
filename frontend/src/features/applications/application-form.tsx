
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  InfoIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

interface ApplyFormProps {
  jobId: string;
  jobTitle: string;
}

export function ApplyForm({
  jobId,
  jobTitle,
}: ApplyFormProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!confirmed || submitted) return;

    // Demo only: belum mengirim lamaran ke backend.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircleIcon size={28} aria-hidden="true" />
        </div>

        <h2 className="mt-4 text-xl font-bold text-[#0B1B3D]">
          Simulasi pengajuan berhasil
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#64748B]">
          Alur pengajuan untuk posisi <strong>{jobTitle}</strong>{" "}
          sudah berhasil diuji. Lamaran ini belum dikirim atau
          disimpan di server.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            onClick={() =>
              window.location.assign("/candidate/applications")
            }
          >
            Lihat My Applications
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              window.location.assign(`/jobs/${encodeURIComponent(jobId)}`)
            }
          >
            Kembali ke lowongan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-7"
    >
      <div>
        <h2 className="text-lg font-bold text-[#0B1B3D]">
          Konfirmasi pengajuan
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#64748B]">
          Pastikan kamu telah memeriksa posisi yang dipilih dan
          siap melanjutkan proses rekrutmen.
        </p>
      </div>

      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <InfoIcon
          size={21}
          className="mt-0.5 shrink-0 text-amber-700"
          aria-hidden="true"
        />
        <p className="text-sm leading-6 text-amber-900">
          Mode demo: tombol ini hanya menguji interaksi frontend.
          Lamaran belum tersimpan dan belum diterima oleh tim
          rekrutmen EIGER.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
          className="mt-1 size-4 accent-[#24352B]"
          required
        />
        <span className="text-sm leading-6 text-[#334155]">
          Saya telah memeriksa informasi posisi dan ingin
          melanjutkan simulasi pengajuan lamaran ini.
        </span>
      </label>

      <Button type="submit" fullWidth disabled={!confirmed}>
        <PaperPlaneTiltIcon size={18} aria-hidden="true" />
        Simulasikan Pengajuan
      </Button>

      <p className="text-center text-xs text-[#64748B]">
        Ingin memeriksa posisi kembali?{" "}
        <Link
          href={`/jobs/${encodeURIComponent(jobId)}`}
          className="font-semibold text-[#B86F32] hover:underline"
        >
          Lihat detail lowongan
        </Link>
      </p>
    </form>
  );
}
