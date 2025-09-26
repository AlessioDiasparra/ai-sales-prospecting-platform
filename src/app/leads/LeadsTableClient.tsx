"use client"
import * as React from "react"
import dynamic from "next/dynamic"
import { ColumnDef } from "@tanstack/react-table"

// Skeleton fallback while the table code loads
function SkeletonTable() {
  return (
    <div className="space-y-3 p-2 min-h-[420px]">
      <div className="h-6 w-40 rounded bg-muted animate-pulse" />
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="col-span-6 grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((__, j) => (
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

export type Lead = {
  id: string
  name: string
  email: string
  title: string
  company: string
  location: string
  status: "new" | "enriched" | "bounced"
}

const initialLeads: Lead[] = [
  { id: "1", name: "Alex Carter", email: "alex@acme.com", title: "Head of Sales", company: "Acme Inc", location: "San Francisco, CA", status: "new" },
  { id: "2", name: "Jamie Lee", email: "jamie@globex.com", title: "Growth Manager", company: "Globex", location: "New York, NY", status: "enriched" },
  { id: "3", name: "Priya Patel", email: "priya@initech.com", title: "BDR", company: "Initech", location: "Austin, TX", status: "new" },
]

export const LeadsTableClient = () => {
  const [data, setData] = React.useState<Lead[]>(initialLeads)

  const updateLead = (id: string, key: keyof Lead, value: string) => {
    setData(prev => prev.map(l => (l.id === id ? { ...l, [key]: value } : l)))
  }

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <input
          className="w-full bg-transparent outline-none"
          value={row.original.name}
          onChange={(e) => updateLead(row.original.id, "name", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <input
          className="w-full bg-transparent outline-none"
          value={row.original.email}
          onChange={(e) => updateLead(row.original.id, "email", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <input
          className="w-full bg-transparent outline-none"
          value={row.original.title}
          onChange={(e) => updateLead(row.original.id, "title", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => (
        <input
          className="w-full bg-transparent outline-none"
          value={row.original.company}
          onChange={(e) => updateLead(row.original.id, "company", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <input
          className="w-full bg-transparent outline-none"
          value={row.original.location}
          onChange={(e) => updateLead(row.original.id, "location", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <select
          className="w-full bg-transparent outline-none"
          value={row.original.status}
          onChange={(e) => updateLead(row.original.id, "status", e.target.value)}
        >
          <option value="new">new</option>
          <option value="enriched">enriched</option>
          <option value="bounced">bounced</option>
        </select>
      ),
    },
  ]

  return (
    <div className="rounded-md border bg-card p-2 min-h-[420px]">
      <DataTable columns={columns} data={data} />
    </div>
  )
}