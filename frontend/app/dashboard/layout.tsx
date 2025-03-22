import type { ReactNode } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import ChatbotWidget from "@/components/chatbot/chatbot-widget"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex-1 flex">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
      <ChatbotWidget />
    </div>
  )
}

