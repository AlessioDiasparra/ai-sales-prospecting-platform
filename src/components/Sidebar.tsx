"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { authClient, useSession } from "@/lib/auth-client"
import { Home, Users, Building2, Search, User, KeyRound, ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/search", label: "Intelligent Search", icon: Search },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings/api-keys", label: "API Keys", icon: KeyRound },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending, refetch } = useSession()
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("sidebar_collapsed") : null
    if (saved) setCollapsed(saved === "1")
  }, [])

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      const next = !c
      if (typeof window !== "undefined") localStorage.setItem("sidebar_collapsed", next ? "1" : "0")
      return next
    })
  }

  const handleSignOut = async () => {
    // Use built-in auth client signOut to avoid INVALID_ORIGIN from custom fetch options
    const { error } = await authClient.signOut()
    if (!error?.code) {
      localStorage.removeItem("bearer_token")
      await refetch()
      router.push("/sign-in")
    }
  }

  // Only show sidebar when logged in
  if (!session?.user || isPending) return null

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 border-r bg-[var(--sidebar)] text-[var(--sidebar-foreground)] hidden md:flex md:flex-col transition-[width] duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between gap-2 p-3 border-b">
        <Link href="/dashboard" className={cn("font-semibold text-lg overflow-hidden transition-all", collapsed && "sr-only")}>Lovable for Sales</Link>
        <Button variant="ghost" size="icon" className="shrink-0" onClick={toggleCollapsed} aria-label="Toggle sidebar">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {NAV.map(item => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]",
                active && "bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)]",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4" />
              <span className={cn(collapsed && "sr-only")}>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t">
        <Button variant="outline" className={cn("w-full", collapsed && "px-0 justify-center")} onClick={handleSignOut}>
          {collapsed ? <span className="sr-only">Sign out</span> : "Sign out"}
        </Button>
      </div>
    </aside>
  )
}