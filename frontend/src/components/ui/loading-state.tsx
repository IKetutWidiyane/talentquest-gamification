import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

type LoadingStateProps = {
  message?: string;
};

export default function LoadingState({
  message = "Sedang memuat data...",
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-center"
    >
      <CircleNotch
        aria-hidden="true"
        className="h-8 w-8 animate-spin text-amber-600"
      />
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}