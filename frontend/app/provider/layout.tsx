"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { Brain, Shield, FileText, BarChart3, Users, Settings } from "lucide-react"

interface ProviderLayoutProps {
  children: ReactNode
}

export default function ProviderLayout({ children }: ProviderLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="https://i.ibb.co/5Xn2hrY3/logo-white-bg.png"
              alt="Swift Claim"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Swift Claim</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Provider Portal</p>
            </div>
          </div>
        </div>
        <nav className="px-4 space-y-2">
          <a href="/provider" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <BarChart3 className="h-5 w-5" />
            Dashboard
          </a>
          <a href="/provider/claims" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <FileText className="h-5 w-5" />
            Claims
          </a>
          <a href="/provider/policies" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Shield className="h-5 w-5" />
            Policies
          </a>
          <a href="/provider/team" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Users className="h-5 w-5" />
            Team
          </a>
          <a href="/provider/settings" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Settings className="h-5 w-5" />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://i.ibb.co/8nHxb4zN/claimsaathi-snapping-winking.png"
                alt="Claim Saathi"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">AI Assistant Active</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Settings className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  )
} 