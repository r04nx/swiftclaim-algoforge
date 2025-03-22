"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Shield,
  Brain,
  Settings,
  User,
  Bell,
  Wallet,
  History,
  HelpCircle,
} from "lucide-react"

const menuItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Claims",
    href: "/dashboard/claims",
    icon: FileText,
    submenu: [
      { title: "Active Claims", href: "/dashboard/claims" },
      { title: "File New Claim", href: "/dashboard/claims/new" },
      { title: "Claim History", href: "/dashboard/claims/history" },
    ]
  },
  {
    title: "Blockchain",
    href: "/dashboard/blockchain",
    icon: Shield,
    submenu: [
      { title: "Smart Contracts", href: "/dashboard/blockchain/contracts" },
      { title: "Transaction History", href: "/dashboard/blockchain/transactions" },
      { title: "Verification Status", href: "/dashboard/blockchain/verification" },
    ]
  },
  {
    title: "AI Analysis",
    href: "/dashboard/ai",
    icon: Brain,
    submenu: [
      { title: "Risk Assessment", href: "/dashboard/ai/risk" },
      { title: "Fraud Detection", href: "/dashboard/ai/fraud" },
      { title: "Insights", href: "/dashboard/ai/insights" },
    ]
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                isActive ? "bg-accent" : "transparent"
              )}
            >
              <Icon className={cn(
                "h-4 w-4",
                isActive ? "text-[#fa6724]" : "text-muted-foreground"
              )} />
              <span className={cn(
                isActive ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {item.title}
              </span>
            </Link>
            
            {item.submenu && isActive && (
              <div className="ml-6 mt-2 space-y-1">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                      pathname === subItem.href ? "text-[#07a6ec] font-medium" : "text-muted-foreground"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
} 