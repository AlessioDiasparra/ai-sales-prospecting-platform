"use client"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/Sidebar"

export default function ApiKeysPage() {
  const [key, setKey] = React.useState("")

  React.useEffect(() => {
    setKey(localStorage.getItem("api_key") || "")
  }, [])

  const save = () => {
    localStorage.setItem("api_key", key)
    alert("API key saved locally.")
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]">
      <Sidebar />
      <main className="p-4 md:p-6">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Orchids API Key</label>
              <Input value={key} onChange={(e) => setKey(e.target.value)} placeholder="sk_live_..." />
            </div>
            <Button onClick={save}>Save</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}