"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
<<<<<<< HEAD
  ChartBar,
  Shield,
  Brain,
  FileCheck,
  AlertTriangle,
} from "lucide-react"

const providerMenuItems = [
=======
  Shield,
  Brain,
  BarChart3,
  HelpCircle,
} from "lucide-react"

const sidebarItems = [
>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2
  {
    title: "Dashboard",
    href: "/dashboard/provider",
    icon: LayoutDashboard,
  },
  {
<<<<<<< HEAD
    title: "Policy Management",
    href: "/dashboard/provider/policies",
    icon: FileText,
    submenu: [
      { title: "Active Policies", href: "/dashboard/provider/policies" },
      { title: "Policy Templates", href: "/dashboard/provider/policies/templates" },
      { title: "Create Policy", href: "/dashboard/provider/policies/new" },
    ],
  },
  {
    title: "Claims Processing",
    href: "/dashboard/provider/claims",
    icon: FileCheck,
    submenu: [
      { title: "Pending Claims", href: "/dashboard/provider/claims/pending" },
      { title: "Approved Claims", href: "/dashboard/provider/claims/approved" },
      { title: "Rejected Claims", href: "/dashboard/provider/claims/rejected" },
    ],
  },
  {
    title: "Risk Assessment",
    href: "/dashboard/provider/risk",
    icon: AlertTriangle,
  },
  {
    title: "Analytics",
    href: "/dashboard/provider/analytics",
    icon: ChartBar,
=======
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
>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2
  },
  {
    title: "Team Management",
    href: "/dashboard/provider/team",
    icon: Users,
  },
  {
<<<<<<< HEAD
=======
    title: "Reports",
    href: "/dashboard/provider/reports",
    icon: BarChart3,
  },
  {
>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2
    title: "Settings",
    href: "/dashboard/provider/settings",
    icon: Settings,
  },
<<<<<<< HEAD
=======
  {
    title: "Help & Support",
    href: "/dashboard/provider/support",
    icon: HelpCircle,
  },
>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2
]

export default function ProviderSidebar() {
  const pathname = usePathname()

  return (
<<<<<<< HEAD
    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:border-r">
      <div className="p-6">
        <Link href="/dashboard/provider" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">SwiftClaim Pro</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {providerMenuItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                pathname === item.href ? "bg-accent" : "transparent"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
            {item.submenu && (
              <div className="ml-6 mt-2 space-y-1">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                      pathname === subItem.href ? "text-primary font-medium" : "text-muted-foreground"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
=======
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
>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2
      </nav>
    </div>
  )
} 