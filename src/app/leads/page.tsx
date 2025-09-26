import Sidebar from "@/components/Sidebar"
import { LeadsTableClient } from "./LeadsTableClient"

export default function LeadsPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]">
      <Sidebar />
      <main className="p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Leads</h1>
        </div>
        <LeadsTableClient />
        <p className="text-xs text-muted-foreground mt-2">
          Tip: Click a cell to edit. Use bulk actions to enrich or delete selected rows.
        </p>
      </main>
    </div>
  )
}