import { CompaniesTableClient } from "./CompaniesTableClient"

export default function CompaniesPage() {
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4">Companies</h1>
      <CompaniesTableClient />
      <p className="text-xs text-muted-foreground mt-2">
        Tip: Click a cell to edit. Use bulk actions to enrich or delete selected rows.
      </p>
    </main>
  )
}