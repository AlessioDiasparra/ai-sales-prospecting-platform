"use client"
import * as React from "react"
import { useSession } from "@/lib/auth-client"
import Sidebar from "@/components/Sidebar"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface AppShellProps {
  children: React.ReactNode
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { data: session, isPending } = useSession()
  const pathname = usePathname()

  // Public-only routes (no sidebar when logged out)
  const PUBLIC_ROUTES = new Set([
    "/",
    "/sign-in",
    "/sign-up",
    "/login",
    "/register",
    "/signup",
  ])

  const isLoggedIn = !!session?.user
  const isPublicOnly = PUBLIC_ROUTES.has(pathname)

  // Show sidebar only when: logged in OR loading session, AND not a public-only route while logged out
  const showSidebar = (isLoggedIn || isPending) && !(isPublicOnly && !isLoggedIn)

  return (
    // Outer app background matches reference light canvas
    <div className={cn("min-h-screen bg-muted", showSidebar && "p-4 md:p-6")}> 
      {/* Shell grid with persistent sidebar */}
      <div className={cn(showSidebar && "grid gap-4 md:grid-cols-[256px_1fr]")}> 
        {showSidebar && <Sidebar />}
        {/* Content panel with rounded card look */}
        <div className={cn(
          showSidebar &&
            "rounded-2xl bg-card border shadow-sm min-h-[calc(100dvh-2rem)] md:min-h-[calc(100dvh-3rem)] overflow-hidden"
        )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default AppShell