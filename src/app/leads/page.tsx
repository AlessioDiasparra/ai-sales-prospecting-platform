import { LeadsTableClient } from "./LeadsTableClient"

export default function LeadsPage() {
  return (
    <main className="p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Leads</h1>
      </div>
      <LeadsTableClient />
      <p className="text-xs text-muted-foreground mt-2">
        Tip: Click a cell to edit. Use bulk actions to enrich or delete selected rows.
      </p>
    </main>
  )
}