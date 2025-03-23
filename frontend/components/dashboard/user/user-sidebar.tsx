"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Shield,
  User,
  Settings,
  HelpCircle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard/user",
    icon: LayoutDashboard,
  },
  {
    title: "My Claims",
    href: "/dashboard/user/claims",
    icon: FileText,
    subItems: [
      {
        title: "New Claim",
        href: "/dashboard/user/claims/new",
        icon: FileText,
      },
      {
        title: "Pending",
        href: "/dashboard/user/claims/pending",
        icon: Clock,
      },
      {
        title: "Approved",
        href: "/dashboard/user/claims/approved",
        icon: CheckCircle,
      },
      {
        title: "Rejected",
        href: "/dashboard/user/claims/rejected",
        icon: XCircle,
      },
    ],
  },
  {
    title: "My Policies",
    href: "/dashboard/user/policies",
    icon: Shield,
  },
  {
    title: "Profile",
    href: "/dashboard/user/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/user/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/dashboard/user/support",
    icon: HelpCircle,
  },
]

export default function UserSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full w-64 bg-white dark:bg-gray-900 border-r">
      <div className="p-6">
        <Link href="/dashboard/user" className="flex items-center gap-2">
          <Image
            src="https://i.ibb.co/5Xn2hrY3/logo-white-bg.png"
            alt="Swift Claim"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-bold text-xl">Swift Claim</span>
        </Link>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            const hasSubItems = item.subItems && item.subItems.length > 0
            
            return (
              <li key={item.href} className="space-y-1">
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
                
                {hasSubItems && (
                  <ul className="ml-6 space-y-1">
                    {item.subItems.map((subItem) => {
                      const isSubActive = pathname === subItem.href
                      return (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                              isSubActive && "bg-blue-50 dark:bg-blue-900/20 text-[#07a6ec]"
                            )}
                          >
                            <subItem.icon className="h-4 w-4" />
                            <span>{subItem.title}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
} 