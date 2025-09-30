"use client"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { authClient, useSession } from "@/lib/auth-client"

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession()
  const router = useRouter()

  const [name, setName] = React.useState("")
  const [image, setImage] = React.useState("")

  React.useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "")
      setImage(session.user.image || "")
    }
  }, [session])

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token")
    const { error } = await authClient.signOut({
      fetchOptions: { headers: { Authorization: `Bearer ${token}` } },
    })
    if (!error?.code) {
      localStorage.removeItem("bearer_token")
      refetch()
      router.push("/sign-in")
    }
  }

  if (isPending) return <div className="p-4">Loading...</div>

  return (
    <div className="p-4 md:p-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <Input value={session?.user?.email || ""} readOnly />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Image URL</label>
              <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
            </div>
            <Button onClick={handleSignOut} variant="destructive">Sign out</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>User ID: {session?.user?.id}</div>
            <div>Authenticated: {session?.user ? "Yes" : "No"}</div>
          </CardContent>
        </Card>
    </div>
  )
}