"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Envelope, Eye, EyeSlash, LockKey } from "@phosphor-icons/react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Form login sudah siap. Autentikasi backend perlu dihubungkan sebelum kamu dapat masuk."
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Email
        </label>

        <div className="relative">
          <Envelope
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
            }}
            className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-700"
          >
            Password
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-amber-700 transition hover:text-amber-800"
          >
            Lupa password?
          </Link>
        </div>

        <div className="relative">
          <LockKey
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Masukkan password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setMessage("");
            }}
            className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            aria-pressed={showPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            {showPassword ? (
              <EyeSlash aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Eye aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {message && (
        <p
          role="status"
          className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-3.5 text-sm font-bold text-[#0B1B3D] transition hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/25"
      >
        Masuk
      </button>

      <p className="text-center text-sm text-slate-500">
        Belum memiliki akun?{" "}
        <Link
          href="/register"
          className="font-bold text-[#0B1B3D] transition hover:text-amber-700"
        >
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}