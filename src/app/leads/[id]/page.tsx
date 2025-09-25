"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Sidebar from "@/components/Sidebar"

const MOCK = {
  "1": { id: "1", name: "Alex Carter", email: "alex@acme.com", title: "Head of Sales", company: "Acme Inc", location: "San Francisco, CA" },
  "2": { id: "2", name: "Jamie Lee", email: "jamie@globex.com", title: "Growth Manager", company: "Globex", location: "New York, NY" },
  "3": { id: "3", name: "Priya Patel", email: "priya@initech.com", title: "BDR", company: "Initech", location: "Austin, TX" },
} as const

type Props = { params: { id: string } }

export default function LeadDetailPage({ params }: Props) {
  const lead = MOCK[params.id as keyof typeof MOCK]

  if (!lead) {
    return (
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]">
        <Sidebar />
        <main className="p-4 md:p-6">
          <p className="mb-4">Lead not found.</p>
          <Button asChild>
            <Link href="/leads">Back to Leads</Link>
          </Button>
        </main>
      </div>
    )
  }

  const logs = [
    { ts: "10:12", text: "Email validated (SMTP ping)" },
    { ts: "10:08", text: "LinkedIn role confirmed" },
    { ts: "09:58", text: "Company matched via domain" },
  ]

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]">
      <Sidebar />
      <main className="p-4 md:p-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{lead.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div><span className="text-muted-foreground">Email:</span> {lead.email}</div>
            <div><span className="text-muted-foreground">Title:</span> {lead.title}</div>
            <div><span className="text-muted-foreground">Company:</span> {lead.company}</div>
            <div><span className="text-muted-foreground">Location:</span> {lead.location}</div>
            <Button asChild className="mt-2"><a href={`/companies/${lead.company.toLowerCase().replace(/\s+/g, "-")}`}>View Company</a></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrichment Log</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {logs.map((l, i) => (
                <li key={i} className="flex gap-2"><span className="text-muted-foreground">{l.ts}</span> {l.text}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}