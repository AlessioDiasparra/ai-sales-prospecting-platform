"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Sidebar from "@/components/Sidebar"

type Props = { params: { id: string } }

const COMPANIES: Record<string, { id: string; name: string; domain: string; hq: string }> = {
  "c1": { id: "c1", name: "Acme Inc", domain: "acme.com", hq: "San Francisco, CA" },
  "c2": { id: "c2", name: "Globex", domain: "globex.com", hq: "New York, NY" },
}

export default function CompanyDetailPage({ params }: Props) {
  const company = COMPANIES[params.id]

  if (!company) {
    return (
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]">
        <Sidebar />
        <main className="p-4 md:p-6">
          <p className="mb-4">Company not found.</p>
          <Button asChild>
            <Link href="/companies">Back to Companies</Link>
          </Button>
        </main>
      </div>
    )
  }

  const mapQuery = encodeURIComponent(company.name + " " + company.hq)

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]">
      <Sidebar />
      <main className="p-4 md:p-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{company.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div><span className="text-muted-foreground">Domain:</span> {company.domain}</div>
            <div><span className="text-muted-foreground">HQ:</span> {company.hq}</div>
            <Button asChild className="mt-2"><Link href="/leads">View Leads</Link></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full overflow-hidden rounded-md border">
              <iframe
                title="Company Location"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}