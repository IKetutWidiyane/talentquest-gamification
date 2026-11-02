
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CircleIcon,
  CompassIcon,
  FlagIcon,
  MedalIcon,
  TrophyIcon,
  WarningCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react";

type Question = {
  id: number;
  category: string;
  question: string;
  description: string;
  options: {
    id: string;
    text: string;
    score: number;
  }[];
};

type Props = {
  params: Promise<{ id: string }>;
};

// Demo questions. Replace with backend data in Phase 5.19.
const questions: Question[] = [
  {
    id: 1,
    category: "Problem Solving",
    question: "Ketika menghadapi tantangan yang belum pernah kamu temui, apa yang akan kamu lakukan?",
    description: "Pilih respons yang paling menggambarkan pendekatanmu.",
    options: [
      {
        id: "A",
        text: "Mencari informasi, memahami masalah, lalu menyusun solusi.",
        score: 4,
      },
      {
        id: "B",
        text: "Langsung mencoba berbagai cara sampai menemukan solusi.",
        score: 3,
      },
      {
        id: "C",
        text: "Menunggu arahan dari orang yang lebih berpengalaman.",
        score: 2,
      },
      {
        id: "D",
        text: "Menghindari tantangan tersebut karena belum terbiasa.",
        score: 1,
      },
    ],
  },
  {
    id: 2,
    category: "Teamwork",
    question: "Dalam sebuah tim, terdapat perbedaan pendapat mengenai cara menyelesaikan pekerjaan. Bagaimana kamu menyikapinya?",
    description: "Pilih pendekatan yang paling sesuai dengan dirimu.",
    options: [
      {
        id: "A",
        text: "Memaksakan pendapat karena yakin dengan ide sendiri.",
        score: 1,
      },
      {
        id: "B",
        text: "Mendengarkan setiap pendapat dan mencari kesepakatan bersama.",
        score: 4,
      },
      {
        id: "C",
        text: "Menyerahkan keputusan sepenuhnya kepada anggota lain.",
        score: 2,
      },
      {
        id: "D",
        text: "Mengikuti pendapat mayoritas tanpa memberikan masukan.",
        score: 3,
      },
    ],
  },
  {
    id: 3,
    category: "Adaptability",
    question: "Kamu mendapatkan tugas baru dengan tenggat waktu yang cukup singkat. Apa langkah pertamamu?",
    description: "Pikirkan bagaimana kamu mengelola perubahan situasi.",
    options: [
      {
        id: "A",
        text: "Mengabaikan tugas lain dan mengerjakan semuanya sekaligus.",
        score: 2,
      },
      {
        id: "B",
        text: "Menunggu sampai mendapatkan instruksi yang lebih detail.",
        score: 1,
      },
      {
        id: "C",
        text: "Memahami prioritas, menyusun rencana, dan mulai mengerjakan.",
        score: 4,
      },
      {
        id: "D",
        text: "Meminta orang lain mengambil alih tugas tersebut.",
        score: 2,
      },
    ],
  },
  {
    id: 4,
    category: "Initiative",
    question: "Kamu melihat ada proses kerja yang bisa dibuat lebih efektif. Apa yang akan kamu lakukan?",
    description: "Pilih respons yang paling mencerminkan inisiatifmu.",
    options: [
      {
        id: "A",
        text: "Membiarkannya karena bukan tanggung jawabmu.",
        score: 1,
      },
      {
        id: "B",
        text: "Mengubah proses tersebut tanpa berdiskusi dengan tim.",
        score: 2,
      },
      {
        id: "C",
        text: "Menyampaikan ide dan mengusulkan perbaikan kepada tim.",
        score: 4,
      },
      {
        id: "D",
        text: "Menunggu sampai ada orang lain yang menyadarinya.",
        score: 2,
      },
    ],
  },
  {
    id: 5,
    category: "Growth Mindset",
    question: "Bagaimana kamu merespons kritik atau masukan terhadap hasil pekerjaanmu?",
    description: "Pilih respons yang paling menggambarkan sikapmu.",
    options: [
      {
        id: "A",
        text: "Menerima masukan dan menggunakannya untuk memperbaiki diri.",
        score: 4,
      },
      {
        id: "B",
        text: "Merasa kecewa dan sulit menerima kritik.",
        score: 1,
      },
      {
        id: "C",
        text: "Mendengarkan, tetapi tidak selalu menindaklanjutinya.",
        score: 3,
      },
      {
        id: "D",
        text: "Menganggap kritik sebagai bentuk ketidakpercayaan.",
        score: 1,
      },
    ],
  },
];

const getScoreLabel = (score: number) => {
  if (score >= 85) return "Excellent Explorer";
  if (score >= 70) return "Skilled Adventurer";
  if (score >= 55) return "Growing Explorer";
  return "Rising Adventurer";
};

const getScoreDescription = (score: number) => {
  if (score >= 85)
    return "Kamu menunjukkan kecenderungan yang kuat dalam menghadapi tantangan, bekerja sama, dan mengembangkan diri.";
  if (score >= 70)
    return "Kamu memiliki fondasi kompetensi yang baik. Terus kembangkan kemampuan dan konsistensimu.";
  if (score >= 55)
    return "Kamu sedang membangun kemampuan. Jadikan setiap tantangan sebagai kesempatan untuk belajar.";
  return "Setiap perjalanan dimulai dari satu langkah. Terus eksplorasi dan kembangkan potensimu.";
};

export default function AssessmentPage({ params }: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showReview, setShowReview] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const currentQuestion = questions[questionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const totalScore = useMemo(() => {
    return questions.reduce((total, question) => {
      const selected = question.options.find(
        (option) => option.id === answers[question.id]
      );

      return total + (selected?.score ?? 0);
    }, 0);
  }, [answers]);

  const maxScore = questions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const competencyResults = useMemo(() => {
    return questions.map((question) => {
      const selected = question.options.find(
        (option) => option.id === answers[question.id]
      );

      return {
        category: question.category,
        score: selected?.score ?? 0,
        percentage: Math.round(((selected?.score ?? 0) / 4) * 100),
      };
    });
  }, [answers]);

  const selectAnswer = (optionId: string) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleSubmit = () => {
    setShowSubmitConfirm(false);
    setShowReview(false);
    setShowResult(true);
  };

  const restartAssessment = () => {
    setQuestionIndex(0);
    setAnswers({});
    setShowReview(false);
    setShowResult(false);
    setShowSubmitConfirm(false);
  };

  // Result screen
  if (showResult) {
    return (
      <main className="min-h-screen bg-[#F5F3EA] px-4 py-10 text-[#24352B] sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-3xl bg-[#24352B] p-8 text-center text-white sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#C7A34A]/20 text-[#E7D49B]">
              <TrophyIcon size={42} weight="fill" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#E7D49B]">
              Quest completed
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Your journey continues!
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/70">
              Kamu telah menyelesaikan demo assessment Talent Quest.
              Berikut adalah ringkasan hasil pengerjaanmu.
            </p>

            <div className="mx-auto mt-8 flex h-36 w-36 flex-col items-center justify-center rounded-full border-4 border-[#C7A34A] bg-white/5">
              <span className="text-4xl font-bold text-[#E7D49B]">
                {percentage}%
              </span>
              <span className="mt-1 text-xs text-white/60">
                Demo score
              </span>
            </div>

            <h2 className="mt-6 text-xl font-bold text-[#E7D49B]">
              {getScoreLabel(percentage)}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/70">
              {getScoreDescription(percentage)}
            </p>
          </div>

          <section className="mt-7 rounded-2xl border border-[#E4E1D6] bg-white p-6">
            <h2 className="text-lg font-bold">Assessment Summary</h2>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-[#F5F3EA] p-4">
                <p className="text-xs text-[#718074]">Total Questions</p>
                <p className="mt-2 text-2xl font-bold">{totalQuestions}</p>
              </div>
              <div className="rounded-xl bg-[#F5F3EA] p-4">
                <p className="text-xs text-[#718074]">Answered</p>
                <p className="mt-2 text-2xl font-bold">{answeredCount}</p>
              </div>
              <div className="col-span-2 rounded-xl bg-[#F5F3EA] p-4 sm:col-span-1">
                <p className="text-xs text-[#718074]">Total Points</p>
                <p className="mt-2 text-2xl font-bold">
                  {totalScore}/{maxScore}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-5 rounded-2xl border border-[#E4E1D6] bg-white p-6">
            <div className="flex items-center gap-2">
              <MedalIcon size={22} className="text-[#B86F32]" />
              <h2 className="text-lg font-bold">Competency Overview</h2>
            </div>

            <div className="mt-6 space-y-5">
              {competencyResults.map((item) => (
                <div key={item.category}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">
                      {item.category}
                    </span>
                    <span className="text-sm font-bold text-[#3F5A43]">
                      {item.score}/4
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-[#EAEAE3]">
                    <div
                      className="h-full rounded-full bg-[#3F5A43] transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/candidate/talent-quest"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3F5A43] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#304934]"
            >
              Back to Talent Quest
              <ArrowRightIcon size={18} />
            </Link>

            <button
              type="button"
              onClick={restartAssessment}
              className="rounded-xl border border-[#D9DCD3] bg-white px-6 py-3.5 text-sm font-bold text-[#3F5A43] transition hover:bg-[#F5F3EA]"
            >
              Try Demo Again
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-[#92998F]">
            Demo results only · EIGER Talent Quest
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F3EA] px-4 py-7 text-[#24352B] sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/candidate/talent-quest"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#647568] hover:text-[#24352B]"
          >
            <ArrowLeftIcon size={18} />
            Exit Quest
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-[#E4E1D6] bg-white px-4 py-2 text-xs font-bold text-[#3F5A43]">
            <CompassIcon size={17} />
            EIGER TALENT QUEST
          </div>
        </div>

        {/* Progress header */}
        <section className="rounded-2xl bg-[#24352B] p-5 text-white sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C7A34A]">
                Adventure challenge
              </p>
              <h1 className="mt-2 text-2xl font-bold">
                Assessment in Progress
              </h1>
              <p className="mt-2 text-sm text-white/65">
                Take your time and choose the answer that best represents you.
              </p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
              <p className="text-xs text-white/60">Your progress</p>
              <p className="mt-1 text-xl font-bold">
                {answeredCount}/{totalQuestions}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-white/65">
              <span>Quest progress</span>
              <span>
                {Math.round((answeredCount / totalQuestions) * 100)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#C7A34A] transition-all"
                style={{
                  width: `${(answeredCount / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* Assessment content */}
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_290px]">
          <section className="min-w-0 rounded-2xl border border-[#E4E1D6] bg-white p-5 sm:p-8">
            {showReview ? (
              <>
                <div className="mb-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B86F32]">
                    Final checkpoint
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    Review Your Answers
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#718074]">
                    Periksa kembali jawabanmu sebelum menyelesaikan assessment.
                  </p>
                </div>

                <div className="mb-5 flex flex-wrap gap-3 text-xs font-semibold">
                  <span className="rounded-full bg-[#EAF0E8] px-3 py-2 text-[#3F5A43]">
                    {answeredCount} Answered
                  </span>
                  <span className="rounded-full bg-[#FBF0E8] px-3 py-2 text-[#A65F2A]">
                    {unansweredCount} Unanswered
                  </span>
                </div>

                <div className="space-y-3">
                  {questions.map((question, index) => {
                    const selected = question.options.find(
                      (option) => option.id === answers[question.id]
                    );

                    return (
                      <button
                        type="button"
                        key={question.id}
                        onClick={() => {
                          setQuestionIndex(index);
                          setShowReview(false);
                        }}
                        className="w-full rounded-xl border border-[#E4E1D6] p-4 text-left transition hover:border-[#3F5A43] hover:bg-[#F8F8F3]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-bold text-[#B86F32]">
                            QUESTION {index + 1}
                          </span>
                          {selected ? (
                            <CheckCircleIcon
                              size={20}
                              weight="fill"
                              className="text-[#3F7A4B]"
                            />
                          ) : (
                            <WarningCircleIcon
                              size={20}
                              className="text-[#B86F32]"
                            />
                          )}
                        </div>

                        <p className="mt-2 text-sm font-semibold">
                          {question.question}
                        </p>
                        <p className="mt-2 text-xs text-[#718074]">
                          {selected
                            ? `Your answer: ${selected.id} — ${selected.text}`
                            : "Belum dijawab · Klik untuk mengisi"}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7 flex flex-col-reverse justify-between gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setShowReview(false)}
                    className="rounded-xl border border-[#D9DCD3] px-5 py-3 text-sm font-bold text-[#3F5A43]"
                  >
                    Back to Questions
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSubmitConfirm(true)}
                    className="rounded-xl bg-[#3F5A43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#304934]"
                  >
                    Submit Assessment
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B86F32]">
                      {currentQuestion.category}
                    </p>
                    <h2 className="mt-2 text-xl font-bold">
                      Question {questionIndex + 1}
                      <span className="font-medium text-[#A3AA9E]">
                        {" "}
                        / {totalQuestions}
                      </span>
                    </h2>
                  </div>

                  <span className="rounded-lg bg-[#F5F3EA] px-3 py-2 text-xs font-bold text-[#647568]">
                    {answers[currentQuestion.id]
                      ? "Answered"
                      : "Not answered"}
                  </span>
                </div>

                <div className="my-7 h-px bg-[#ECEDE7]" />

                <h3 className="text-xl font-bold leading-relaxed sm:text-2xl">
                  {currentQuestion.question}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#718074]">
                  {currentQuestion.description}
                </p>

                <div className="mt-7 space-y-3">
                  {currentQuestion.options.map((option) => {
                    const selected =
                      answers[currentQuestion.id] === option.id;

                    return (
                      <button
                        type="button"
                        key={option.id}
                        onClick={() => selectAnswer(option.id)}
                        className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-[#3F5A43] bg-[#EAF0E8] ring-1 ring-[#3F5A43]"
                            : "border-[#E4E1D6] bg-white hover:border-[#AAB8A6] hover:bg-[#FAFAF6]"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                            selected
                              ? "bg-[#3F5A43] text-white"
                              : "bg-[#F0F0E9] text-[#647568]"
                          }`}
                        >
                          {option.id}
                        </span>

                        <span className="flex-1 pt-1 text-sm leading-6">
                          {option.text}
                        </span>

                        {selected ? (
                          <CheckCircleIcon
                            size={21}
                            weight="fill"
                            className="mt-1 shrink-0 text-[#3F5A43]"
                          />
                        ) : (
                          <CircleIcon
                            size={21}
                            className="mt-1 shrink-0 text-[#B8BEB4]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-[#ECEDE7] pt-6 sm:flex-row">
                  <button
                    type="button"
                    disabled={questionIndex === 0}
                    onClick={() =>
                      setQuestionIndex((index) => Math.max(0, index - 1))
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9DCD3] px-5 py-3 text-sm font-bold text-[#3F5A43] transition hover:bg-[#F5F3EA] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeftIcon size={17} />
                    Previous
                  </button>

                  {questionIndex < totalQuestions - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setQuestionIndex((index) =>
                          Math.min(totalQuestions - 1, index + 1)
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3F5A43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#304934]"
                    >
                      Next Question
                      <ArrowRightIcon size={17} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowReview(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3F5A43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#304934]"
                    >
                      Review Answers
                      <FlagIcon size={17} />
                    </button>
                  )}
                </div>
              </>
            )}
          </section>

          {/* Question navigator */}
          <aside className="h-fit rounded-2xl border border-[#E4E1D6] bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Quest Navigator</h2>
              <CompassIcon size={21} className="text-[#B86F32]" />
            </div>

            <p className="mt-2 text-xs leading-5 text-[#879184]">
              Pilih nomor soal untuk berpindah pertanyaan.
            </p>

            <div className="mt-5 grid grid-cols-5 gap-2">
              {questions.map((question, index) => {
                const isAnswered = Boolean(answers[question.id]);
                const isCurrent = questionIndex === index;

                return (
                  <button
                    type="button"
                    key={question.id}
                    onClick={() => {
                      setQuestionIndex(index);
                      setShowReview(false);
                    }}
                    aria-label={`Go to question ${index + 1}`}
                    className={`flex aspect-square items-center justify-center rounded-lg text-sm font-bold transition ${
                      isCurrent
                        ? "bg-[#24352B] text-white ring-2 ring-[#C7A34A] ring-offset-2"
                        : isAnswered
                          ? "bg-[#EAF0E8] text-[#3F5A43]"
                          : "bg-[#F2F1EB] text-[#8B9387] hover:bg-[#E8E8DF]"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 space-y-3 border-t border-[#ECEDE7] pt-5">
              <div className="flex items-center gap-2 text-xs text-[#718074]">
                <span className="h-3 w-3 rounded-sm bg-[#24352B]" />
                Current question
              </div>
              <div className="flex items-center gap-2 text-xs text-[#718074]">
                <span className="h-3 w-3 rounded-sm bg-[#EAF0E8]" />
                Answered
              </div>
              <div className="flex items-center gap-2 text-xs text-[#718074]">
                <span className="h-3 w-3 rounded-sm bg-[#F2F1EB]" />
                Not answered
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[#F5F3EA] p-4">
              <p className="text-xs text-[#718074]">Completion</p>
              <p className="mt-1 text-2xl font-bold text-[#3F5A43]">
                {answeredCount}/{totalQuestions}
              </p>
              <p className="mt-1 text-xs text-[#879184]">
                Questions answered
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowReview(true)}
              className="mt-4 w-full rounded-xl border border-[#3F5A43] px-4 py-3 text-sm font-bold text-[#3F5A43] transition hover:bg-[#EAF0E8]"
            >
              Review & Submit
            </button>
          </aside>
        </div>

        <p className="mt-7 text-center text-xs text-[#92998F]">
          EIGER Talent Quest · Demo assessment experience
        </p>
      </div>

      {/* Submission confirmation modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17251D]/65 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FBF5E8] text-[#B86F32]">
              <FlagIcon size={25} weight="fill" />
            </div>

            <h2
              id="submit-title"
              className="mt-5 text-xl font-bold text-[#24352B]"
            >
              Submit your assessment?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#718074]">
              Kamu sudah menjawab {answeredCount} dari {totalQuestions} soal.
              {unansweredCount > 0
                ? ` Masih ada ${unansweredCount} soal yang belum dijawab.`
                : " Semua pertanyaan sudah terjawab."}
            </p>

            {unansweredCount > 0 && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#FBF5E8] p-3 text-xs leading-5 text-[#806B48]">
                <WarningCircleIcon
                  size={18}
                  className="mt-0.5 shrink-0"
                />
                Kamu masih bisa kembali untuk melengkapi jawaban sebelum submit.
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 rounded-xl border border-[#D9DCD3] px-4 py-3 text-sm font-bold text-[#3F5A43]"
              >
                Review Again
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 rounded-xl bg-[#3F5A43] px-4 py-3 text-sm font-bold text-white hover:bg-[#304934]"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
