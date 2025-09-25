"use client"
import * as React from "react"
import Sidebar from "@/components/Sidebar"
// import { DataTable } from "@/components/DataTable"
import dynamic from "next/dynamic"
import { ColumnDef } from "@tanstack/react-table"

// Skeleton fallback while the table code loads
function SkeletonTable() {
  return (
    <div className="space-y-3 p-2 min-h-[420px]">
      <div className="h-6 w-40 rounded bg-muted animate-pulse" />
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="col-span-5 grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((__, j) => (
              <div key={j} className="h-9 rounded bg-muted animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const DataTable = dynamic(() => import("@/components/DataTable").then(m => m.DataTable), {
  ssr: false,
  loading: () => <SkeletonTable />,
})

export type Company = {
  id: string
  name: string
  domain: string
  industry: string
  size: string
  hq: string
}

const initialCompanies: Company[] = [
  { id: "c1", name: "Acme Inc", domain: "acme.com", industry: "Manufacturing", size: "500-1k", hq: "San Francisco, CA" },
  { id: "c2", name: "Globex", domain: "globex.com", industry: "SaaS", size: "200-500", hq: "New York, NY" },
]

export default function CompaniesPage() {
  const [data, setData] = React.useState<Company[]>(initialCompanies)

  const updateCompany = (id: string, key: keyof Company, value: string) => {
    setData(prev => prev.map(c => (c.id === id ? { ...c, [key]: value } : c)))
  }

  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <input
          className="w-full bg-transparent outline-none"
          value={row.original.name}
          onChange={(e) => updateCompany(row.original.id, "name", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "domain",
      header: "Domain",
      cell: ({ row }) => (
        <input
          className="w-full bg-transparent outline-none"
          value={row.original.domain}
          onChange={(e) => updateCompany(row.original.id, "domain", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "industry",
      header: "Industry",
      cell: ({ row }) => (
        <input
          className="w-full bg-transparent outline-none"
          value={row.original.industry}
          onChange={(e) => updateCompany(row.original.id, "industry", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: ({ row }) => (
        <input
          className="w-full bg-transparent outline-none"
          value={row.original.size}
          onChange={(e) => updateCompany(row.original.id, "size", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "hq",
      header: "HQ",
      cell: ({ row }) => (
        <input
          className="w-full bg-transparent outline-none"
          value={row.original.hq}
          onChange={(e) => updateCompany(row.original.id, "hq", e.target.value)}
        />
      ),
    },
  ]

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]">
      <Sidebar />
      <main className="p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">Companies</h1>
        <div className="rounded-md border bg-card p-2 min-h-[420px]">
          <DataTable columns={columns} data={data} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Tip: Click a cell to edit. Use bulk actions to enrich or delete selected rows.
        </p>
      </main>
    </div>
  )
}