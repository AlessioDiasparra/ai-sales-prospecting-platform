import Sidebar from "@/components/Sidebar"
import { MetricsCards } from "@/components/MetricsCards"

export default function DashboardPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]">
      <Sidebar />
      <main className="p-4 md:p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <MetricsCards totalLeads={1240} enrichmentProgress={68} recentActivityCount={27} />
        {/* ... add more dashboard widgets later ... */}
      </main>
    </div>
  )
}