import { PublicLayout } from "@/components/layout/public-layout";
import RegisterForm from "@/features/auth/register-form";

export default function RegisterPage() {
  return (
    <PublicLayout>
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F8F7F4] px-4 py-12 sm:px-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-2">
          <section className="hidden flex-col justify-between bg-[#0B1B3D] p-10 text-white lg:flex xl:p-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                EIGER Talent Quest
              </p>

              <h1 className="mt-8 max-w-sm text-4xl font-bold leading-tight xl:text-5xl">
                Start your next adventure.
              </h1>

              <p className="mt-5 max-w-sm leading-7 text-slate-300">
                Buat akun kandidat untuk menjelajahi peluang karier dan
                mengikuti proses rekrutmen EIGER.
              </p>
            </div>

            <p className="border-t border-white/15 pt-6 text-sm text-slate-300">
              Discover opportunities. Show your potential.
            </p>
          </section>

          <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 lg:hidden">
                EIGER Talent Quest
              </p>

              <p className="mt-2 text-sm font-semibold text-amber-600">
                Join the journey
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1B3D]">
                Buat akun kandidat
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Lengkapi informasi berikut untuk mulai membangun perjalanan
                kariermu.
              </p>

              <div className="mt-8">
                <RegisterForm />
              </div>
            </div>
          </section>
        </div>
      </main>
    </PublicLayout>
  );
}