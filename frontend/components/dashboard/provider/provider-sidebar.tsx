"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Shield,
  Brain,
  BarChart3,
  HelpCircle,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard/provider",
    icon: LayoutDashboard,
  },
  {
    title: "Claims Management",
    href: "/dashboard/provider/claims",
    icon: FileText,
  },
  {
    title: "Policy Management",
    href: "/dashboard/provider/policies",
    icon: Shield,
  },
  {
    title: "AI & Analytics",
    href: "/dashboard/provider/analytics",
    icon: Brain,
  },
  {
    title: "Team Management",
    href: "/dashboard/provider/team",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/dashboard/provider/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/provider/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/dashboard/provider/support",
    icon: HelpCircle,
  },
]

export default function ProviderSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full w-64 bg-white dark:bg-gray-900 border-r">
      <div className="p-6">
        <Link href="/dashboard/provider" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#07a6ec]" />
          <span className="font-bold text-xl">Swift Claim</span>
        </Link>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    isActive && "bg-blue-50 dark:bg-blue-900/20 text-[#07a6ec]"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
} 