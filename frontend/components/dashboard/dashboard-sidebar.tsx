"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Shield,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  PlusCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    claims: true,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-background">
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-4">
          <div className="px-4 py-2">
            <h2 className="text-lg font-semibold tracking-tight">Main Menu</h2>
          </div>

          <nav className="space-y-1">
            <Link href="/dashboard">
              <Button
                variant={isActive("/dashboard") ? "secondary" : "ghost"}
                className={`w-full justify-start ${isActive("/dashboard") ? "bg-[#fa6724]/10 text-[#fa6724] hover:bg-[#fa6724]/20 hover:text-[#fa6724]" : ""}`}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            <div>
              <Collapsible open={openSections.claims} onOpenChange={() => toggleSection("claims")}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between group">
                    <span className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Claims
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${openSections.claims ? "rotate-90" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 space-y-1">
                  <Link href="/dashboard/claims/new">
                    <Button
                      variant={isActive("/dashboard/claims/new") ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive("/dashboard/claims/new") ? "bg-[#07a6ec]/10 text-[#07a6ec] hover:bg-[#07a6ec]/20 hover:text-[#07a6ec]" : ""}`}
                      size="sm"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Claim
                    </Button>
                  </Link>
                  <Link href="/dashboard/claims/pending">
                    <Button
                      variant={isActive("/dashboard/claims/pending") ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive("/dashboard/claims/pending") ? "bg-[#07a6ec]/10 text-[#07a6ec] hover:bg-[#07a6ec]/20 hover:text-[#07a6ec]" : ""}`}
                      size="sm"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Pending
                      <Badge className="ml-auto bg-yellow-500 text-white">2</Badge>
                    </Button>
                  </Link>
                  <Link href="/dashboard/claims/approved">
                    <Button
                      variant={isActive("/dashboard/claims/approved") ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive("/dashboard/claims/approved") ? "bg-[#07a6ec]/10 text-[#07a6ec] hover:bg-[#07a6ec]/20 hover:text-[#07a6ec]" : ""}`}
                      size="sm"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approved
                      <Badge className="ml-auto bg-green-500 text-white">3</Badge>
                    </Button>
                  </Link>
                  <Link href="/dashboard/claims/rejected">
                    <Button
                      variant={isActive("/dashboard/claims/rejected") ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive("/dashboard/claims/rejected") ? "bg-[#07a6ec]/10 text-[#07a6ec] hover:bg-[#07a6ec]/20 hover:text-[#07a6ec]" : ""}`}
                      size="sm"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Rejected
                      <Badge className="ml-auto bg-red-500 text-white">1</Badge>
                    </Button>
                  </Link>
                  <Link href="/dashboard/claims/all">
                    <Button
                      variant={isActive("/dashboard/claims/all") ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive("/dashboard/claims/all") ? "bg-[#07a6ec]/10 text-[#07a6ec] hover:bg-[#07a6ec]/20 hover:text-[#07a6ec]" : ""}`}
                      size="sm"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      All Claims
                    </Button>
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <Link href="/dashboard/policies">
              <Button
                variant={isActive("/dashboard/policies") ? "secondary" : "ghost"}
                className={`w-full justify-start ${isActive("/dashboard/policies") ? "bg-[#fa6724]/10 text-[#fa6724] hover:bg-[#fa6724]/20 hover:text-[#fa6724]" : ""}`}
              >
                <Shield className="mr-2 h-4 w-4" />
                My Policies
              </Button>
            </Link>

            <Link href="/dashboard/profile">
              <Button
                variant={isActive("/dashboard/profile") ? "secondary" : "ghost"}
                className={`w-full justify-start ${isActive("/dashboard/profile") ? "bg-[#fa6724]/10 text-[#fa6724] hover:bg-[#fa6724]/20 hover:text-[#fa6724]" : ""}`}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          </nav>

          <div className="px-4 py-2">
            <h2 className="text-lg font-semibold tracking-tight">Support</h2>
          </div>

          <nav className="space-y-1">
            <Link href="/dashboard/settings">
              <Button
                variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>

            <Link href="/dashboard/help">
              <Button variant={isActive("/dashboard/help") ? "secondary" : "ghost"} className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Button>
            </Link>

            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </Link>
          </nav>
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="bg-[#fa6724]/10 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[#fa6724] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Policy Renewal</p>
              <p className="text-xs text-muted-foreground">Your health policy expires in 15 days</p>
              <Button size="sm" variant="link" className="p-0 h-auto text-xs text-[#fa6724]">
                Renew Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

