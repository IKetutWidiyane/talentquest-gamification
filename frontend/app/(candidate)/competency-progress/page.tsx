
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChartLineUpIcon,
  CheckCircleIcon,
  CompassIcon,
  TargetIcon,
  TrophyIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";

import {
  getCandidateAssessmentResult,
  type CandidateAssessmentResult,
} from "@/lib/api/assessment-results";

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getScoreLabel(score: number) {
  if (score >= 85) return "Strong";
  if (score >= 70) return "Solid";
  if (score >= 55) return "Developing";
  return "Foundational";
}

function getScoreColor(score: number) {
  if (score >= 85) {
    return "bg-[#3F5A43]";
  }

  if (score >= 70) {
    return "bg-[#66805B]";
  }

  if (score >= 55) {
    return "bg-[#B86F32]";
  }

  return "bg-[#C7A34A]";
}

function CompetencyProgressContent() {
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attemptId");

  const [result, setResult] =
    useState<CandidateAssessmentResult | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!attemptId) {
      setLoading(false);
      return;
    }

    let active = true;

    async function loadResult() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getCandidateAssessmentResult(attemptId!);

        if (active) {
          setResult(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat mengambil hasil."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadResult();

    return () => {
      active = false;
    };
  }, [attemptId]);

  if (!attemptId) {
    return (
      <section className="rounded-2xl border border-dashed border-[#C9D2C7] bg-white px-6 py-14 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#F1F3EC] text-[#3F5A43]">
          <TargetIcon size={30} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#24352B]">
          Competency Progress Belum Tersedia
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#718074]">
          Hasil competency akan ditampilkan setelah kamu menyelesaikan
          Talent Quest Assessment. Halaman ini membutuhkan ID assessment
          attempt dari backend.
        </p>

        <Link
          href="/candidate/talent-quest"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3F5A43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#304934]"
        >
          Buka Talent Quest
          <ArrowRightIcon size={18} />
        </Link>
      </section>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#E2E8DF] bg-white p-10 text-center">
        <div className="mx-auto size-9 animate-spin rounded-full border-4 border-[#E8EDE5] border-t-[#3F5A43]" />
        <p className="mt-4 text-sm font-medium text-[#718074]">
          Memuat competency progress...
        </p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-6 sm:p-8">
        <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <WarningCircleIcon size={25} />
        </div>

        <h2 className="mt-4 text-lg font-bold text-[#24352B]">
          Hasil Belum Dapat Ditampilkan
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#718074]">
          {error || "Data hasil assessment tidak ditemukan."}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-5 rounded-xl bg-[#3F5A43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#304934]"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const competencies = Array.isArray(result.competencyScores)
    ? result.competencyScores
    : [];

  const overallScore = Math.max(
    0,
    Math.min(100, Number(result.overallScore) || 0)
  );

  return (
    <div className="space-y-7">
      {/* Overall score */}
      <section className="overflow-hidden rounded-2xl bg-[#24352B] p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D8BD78]">
              <TrophyIcon size={16} weight="fill" />
              Talent Quest Result
            </span>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Your Competency Overview
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/65">
              Berikut adalah ringkasan kompetensi berdasarkan hasil
              assessment Talent Quest yang telah kamu selesaikan.
            </p>

            <div className="mt-5 space-y-1 text-sm">
              <p className="font-semibold text-white">
                {result.assessment.name}
              </p>
              <p className="text-white/60">
                Posisi: {result.application.job.title}
              </p>
              <p className="text-xs text-white/45">
                Diselesaikan {formatDate(result.completedAt)}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <div className="flex size-32 flex-col items-center justify-center rounded-full border-[5px] border-[#C7A34A] bg-white/5 sm:size-36">
              <span className="text-4xl font-extrabold text-[#E7D49B]">
                {Math.round(overallScore)}
              </span>
              <span className="mt-1 text-xs font-semibold text-white/60">
                Overall Score
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E2E8DF] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#718074]">
              Overall Score
            </p>
            <ChartLineUpIcon size={21} className="text-[#3F5A43]" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-[#24352B]">
            {Math.round(overallScore)}%
          </p>
          <p className="mt-1 text-xs text-[#718074]">
            {getScoreLabel(overallScore)} performance
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8DF] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#718074]">
              Competencies
            </p>
            <TargetIcon size={21} className="text-[#3F5A43]" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-[#24352B]">
            {competencies.length}
          </p>
          <p className="mt-1 text-xs text-[#718074]">
            Competency evaluated
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8DF] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#718074]">
              Assessment Status
            </p>
            <CheckCircleIcon size={21} className="text-[#3F5A43]" />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-[#3F5A43]">
            Completed
          </p>
          <p className="mt-1 text-xs text-[#718074]">
            Assessment successfully submitted
          </p>
        </div>
      </section>

      {/* Competency breakdown */}
      <section className="rounded-2xl border border-[#E2E8DF] bg-white p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B86F32]">
              Competency Breakdown
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#24352B]">
              Your Strengths & Development Areas
            </h2>
            <p className="mt-1 text-sm text-[#718074]">
              Skor kompetensi berdasarkan respons pada setiap challenge.
            </p>
          </div>

          <span className="w-fit rounded-lg bg-[#F1F3EC] px-3 py-2 text-xs font-semibold text-[#3F5A43]">
            {competencies.length} competencies
          </span>
        </div>

        {competencies.length === 0 ? (
          <p className="mt-6 rounded-xl bg-[#F5F3EA] p-5 text-sm text-[#718074]">
            Belum ada data competency pada hasil assessment ini.
          </p>
        ) : (
          <div className="mt-7 space-y-7">
            {competencies.map((item) => {
              const score = Math.max(
                0,
                Math.min(100, Number(item.score) || 0)
              );

              return (
                <div key={item.competencyId}>
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-[#24352B]">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#92998F]">
                        Weight: {item.weight}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-[#F1F3EC] px-3 py-1 text-xs font-semibold text-[#647568]">
                        {getScoreLabel(score)}
                      </span>
                      <span className="min-w-12 text-right text-lg font-extrabold tabular-nums text-[#3F5A43]">
                        {Math.round(score)}%
                      </span>
                    </div>
                  </div>

                  <div
                    className="h-3 overflow-hidden rounded-full bg-[#EAEDE6]"
                    role="progressbar"
                    aria-label={`${item.name} score`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(score)}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${getScoreColor(score)}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Behavioral summary */}
      {result.behavioralSummary && (
        <section className="rounded-2xl border border-[#E2E8DF] bg-[#F5F3EA] p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#E5EBDD] text-[#3F5A43]">
              <CompassIcon size={23} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#B86F32]">
                Behavioral Summary
              </p>
              <h2 className="text-lg font-bold text-[#24352B]">
                Assessment Insight
              </h2>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-[#536456]">
            {result.behavioralSummary}
          </p>
        </section>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Link
          href="/candidate/applications"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9DCD3] bg-white px-5 py-3 text-sm font-bold text-[#3F5A43] transition hover:bg-[#F5F3EA]"
        >
          <ArrowLeftIcon size={18} />
          My Applications
        </Link>

        <Link
          href="/candidate/talent-quest"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3F5A43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#304934]"
        >
          Back to Talent Quest
          <ArrowRightIcon size={18} />
        </Link>
      </div>
    </div>
  );
}

export default function CompetencyProgressPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B86F32]">
          Your development journey
        </p>

        <h1 className="text-2xl font-extrabold text-[#24352B] sm:text-3xl">
          Competency Progress
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-[#718074]">
          Kenali hasil pemetaan kompetensi dan area pengembanganmu
          berdasarkan Talent Quest Assessment.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-[#E2E8DF] bg-white p-10 text-center text-sm text-[#718074]">
            Menyiapkan halaman competency progress...
          </div>
        }
      >
        <CompetencyProgressContent />
      </Suspense>
    </section>
  );
}
