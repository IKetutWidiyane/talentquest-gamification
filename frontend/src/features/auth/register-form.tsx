"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (name.trim().length < 2) {
      setError("Nama lengkap minimal 2 karakter.");
      return;
    }

    if (password.length < 8) {
      setError("Password harus terdiri dari minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setMessage(
      "Validasi berhasil. Registrasi belum dapat diproses sampai endpoint backend dihubungkan."
    );
  }

  const inputClassName =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="fullName"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Nama lengkap
        </label>

        <input
          id="fullName"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Masukkan nama lengkap"
          required
          minLength={2}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
            setMessage("");
          }}
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="registerEmail"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Email
        </label>

        <input
          id="registerEmail"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
            setMessage("");
          }}
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="registerPassword"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="registerPassword"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Minimal 8 karakter"
            required
            minLength={8}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
              setMessage("");
            }}
            className={`${inputClassName} pr-12`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Eye aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Konfirmasi password
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Masukkan ulang password"
            required
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setError("");
              setMessage("");
            }}
            className={`${inputClassName} pr-12`}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword((current) => !current)
            }
            aria-label={
              showConfirmPassword
                ? "Sembunyikan konfirmasi password"
                : "Tampilkan konfirmasi password"
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            {showConfirmPassword ? (
              <EyeOff aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Eye aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
        >
          {error}
        </p>
      )}

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
        Buat akun
      </button>

      <p className="text-center text-sm text-slate-500">
        Sudah memiliki akun?{" "}
        <Link
          href="/login"
          className="font-bold text-[#0B1B3D] transition hover:text-amber-700"
        >
          Masuk
        </Link>
      </p>
    </form>
  );
}