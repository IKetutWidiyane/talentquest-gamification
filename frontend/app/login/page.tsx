import { PublicLayout } from "@/components/layout/public-layout";
import LoginForm from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <PublicLayout>
      <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#F8F7F4] px-4 py-12 sm:px-6">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#0B1B3D]/10 blur-3xl"
        />

        <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-2">
          {/* Left panel */}
          <section className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden bg-[#0B1B3D] p-10 text-white lg:flex xl:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -right-12 top-32 h-52 w-52 rounded-full border border-white/10"
            />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                EIGER Talent Quest
              </p>

              <h1 className="mt-8 max-w-sm text-4xl font-bold leading-tight xl:text-5xl">
                Your next adventure starts here.
              </h1>

              <p className="mt-5 max-w-sm leading-7 text-slate-300">
                Temukan peluang karier, tunjukkan potensimu, dan mulai
                perjalanan bersama EIGER.
              </p>
            </div>

            <div className="relative border-t border-white/15 pt-6">
              <p className="text-sm leading-6 text-slate-300">
                Explore your potential. Take the next step.
              </p>
            </div>
          </section>

          {/* Login form */}
          <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                  EIGER Talent Quest
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-amber-600">
                  Welcome back
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1B3D]">
                  Masuk ke akunmu
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Masuk untuk melanjutkan perjalanan karier dan memantau
                  proses lamaranmu.
                </p>
              </div>

              <div className="mt-8">
                <LoginForm />
              </div>
            </div>
          </section>
        </div>
      </main>
    </PublicLayout>
  );
}