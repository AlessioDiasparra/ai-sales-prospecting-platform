"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Sidebar from "@/components/Sidebar"

export type Candidate = {
  id: string
  name: string
  title: string
  company: string
  location: string
}

export default function IntelligentSearchPage() {
  const [query, setQuery] = React.useState({ name: "", domain: "", location: "" })
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState<Candidate[]>([])
  const [selected, setSelected] = React.useState<Record<string, boolean>>({})

  const onScan = async () => {
    setLoading(true)
    setSelected({})
    // Simulate multi-source scanning
    await new Promise(r => setTimeout(r, 800))
    setResults([
      { id: "r1", name: "Sam Doe", title: "Sales Ops", company: "Acme Inc", location: "SF" },
      { id: "r2", name: "Taylor Kim", title: "BDR", company: "Globex", location: "NY" },
    ])
    setLoading(false)
  }

  const enrichSelected = () => {
    const chosen = results.filter(r => selected[r.id])
    alert(`Enriching ${chosen.length} candidates...`)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]">
      <Sidebar />
      <main className="p-4 md:p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Intelligent Search</h1>

        <Card>
          <CardHeader>
            <CardTitle>Multi-source scan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input placeholder="Name" value={query.name} onChange={e => setQuery({ ...query, name: e.target.value })} />
              <Input placeholder="Domain" value={query.domain} onChange={e => setQuery({ ...query, domain: e.target.value })} />
              <Input placeholder="Location" value={query.location} onChange={e => setQuery({ ...query, location: e.target.value })} />
            </div>
            <div className="flex gap-2">
              <Button onClick={onScan} disabled={loading}>{loading ? "Scanning..." : "Scan"}</Button>
              <Button variant="secondary" onClick={enrichSelected} disabled={!Object.values(selected).some(Boolean)}>Enrich Selected</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.map(item => (
            <Card key={item.id}>
              <CardContent className="p-4 flex items-start gap-3">
                <Checkbox checked={!!selected[item.id]} onCheckedChange={(v) => setSelected(prev => ({ ...prev, [item.id]: !!v }))} />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">{item.title} · {item.company} · {item.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}