"use client"
import * as React from "react"
import { useSession } from "@/lib/auth-client"
import Sidebar from "@/components/Sidebar"
import { cn } from "@/lib/utils"

interface AppShellProps {
  children: React.ReactNode
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { data: session, isPending } = useSession()
  const showSidebar = isPending || !!session?.user

  return (
    <div className={cn(showSidebar && "min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]")}> 
      {showSidebar && <Sidebar />}
      {children}
    </div>
  )
}

export default AppShell