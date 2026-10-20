
import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  ClipboardCheck,
} from "lucide-react";

const overviewCards = [
  { label: "Total Candidates", icon: Users },
  { label: "Active Jobs", icon: BriefcaseBusiness },
  { label: "Assessments", icon: ClipboardCheck },
];

export default function TAOverviewPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D97706]">
          Dashboard
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0B1B3D] sm:text-3xl">
          Overview
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Welcome to your Talent Acquisition workspace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {overviewCards.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1B3D] text-[#F59E0B]">
              <Icon size={21} />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-600">
              {label}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Data integration coming soon
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="text-[#D97706]" size={22} />
          <h2 className="font-bold text-[#0B1B3D]">
            Recruitment Overview
          </h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Dashboard foundation is ready. Recruitment statistics and
          management features will be connected in the next development phase.
        </p>
      </div>
    </section>
  );
}
