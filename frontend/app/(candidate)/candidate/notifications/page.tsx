export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1B3D]">Notifikasi</h1>
        <p className="mt-1 text-sm text-slate-500">
          Pembaruan status lamaran dan assessment Anda.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">Belum ada notifikasi baru saat ini.</p>
      </div>
    </div>
  );
}

