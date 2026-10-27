import { ArrowClockwiseIcon, WarningCircleIcon } from "@phosphor-icons/react";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "Data belum berhasil dimuat. Silakan coba lagi.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-red-200 bg-white p-8 text-center"
    >
      <WarningCircleIcon
        aria-hidden="true"
        className="h-9 w-9 text-red-600"
      />

      <h3 className="mt-4 font-semibold text-[#0B1B3D]">
        Terjadi kendala
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0B1B3D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#142952] focus:outline-none focus:ring-4 focus:ring-amber-500/25"
        >
          <ArrowClockwiseIcon aria-hidden="true" className="h-4 w-4" />
          Coba lagi
        </button>
      )}
    </div>
  );
}