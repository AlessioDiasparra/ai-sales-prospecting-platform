import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MetricsCards({
  totalLeads,
  enrichmentProgress,
  recentActivityCount,
}: {
  totalLeads: number
  enrichmentProgress: number // 0-100
  recentActivityCount: number
}) {
  const nf = new Intl.NumberFormat("en-US")
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Leads</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[88px]">
          <div className="text-3xl font-bold tabular-nums h-9 flex items-end">{nf.format(totalLeads)}</div>
          <p className="text-sm text-muted-foreground">All-time collected</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enrichment Progress</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[88px]">
          <div className="text-3xl font-bold tabular-nums h-9 flex items-end">{enrichmentProgress}%</div>
          <p className="text-sm text-muted-foreground">AI agents running</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[88px]">
          <div className="text-3xl font-bold tabular-nums h-9 flex items-end">{nf.format(recentActivityCount)}</div>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </CardContent>
      </Card>
    </div>
  )
}