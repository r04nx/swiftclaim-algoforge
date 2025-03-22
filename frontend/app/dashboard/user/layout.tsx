"use client"

import type { ReactNode } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import UserDashboardHeader from "@/components/dashboard/user/user-dashboard-header"
import UserSidebar from "@/components/dashboard/user/user-sidebar"
import SwiftBot from "@/components/chatbot/swift-bot"
import Image from "next/image"

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect('/auth/login')
    }
    
    if (session?.user?.role === "provider") {
      redirect('/dashboard/provider')
    }
  }, [status, session])

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image
          src="https://i.ibb.co/5Xn2hrY3/logo-white-bg.png"
          alt="Swift Claim"
          width={100}
          height={100}
          className="animate-pulse"
        />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <UserSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <UserDashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <SwiftBot />
    </div>
  )
} 