"use client"

import type { ReactNode } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import ChatbotWidget from "@/components/chatbot/chatbot-widget"
import { Brain, Shield } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect('/auth/login')
    }
  }, [status])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

