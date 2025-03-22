"use client"

import type { ReactNode } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import DashboardHeader from "@/components/dashboard/provider/dashboard-header"
import ProviderSidebar from "@/components/dashboard/provider/provider-sidebar"
import ChatbotWidget from "@/components/chatbot/chatbot-widget"

export default function ProviderDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect('/auth/login')
    }
    
    // Redirect users away from provider dashboard
    if (session?.user?.role === "user") {
      redirect('/dashboard/user')
    }
  }, [status, session])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex dark:bg-gray-950">
      <ProviderSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
      <ChatbotWidget />
    </div>
  )
} 