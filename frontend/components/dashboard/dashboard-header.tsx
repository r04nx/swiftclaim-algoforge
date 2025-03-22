"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Menu, X, Zap, User, LogOut, Settings, HelpCircle } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function DashboardHeader() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    router.push("/auth/login")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-[#fa6724] to-[#07a6ec]">
              <div className="absolute inset-1 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <Zap className="h-4 w-4 text-[#fa6724]" />
              </div>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">Swift Claim</span>
          </Link>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex items-center w-full max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search claims, policies..." className="w-full pl-9 bg-background" />
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="flex md:hidden">
          {isSearchOpen ? (
            <div className="absolute inset-x-0 top-0 h-16 bg-background flex items-center px-4 z-50">
              <Input type="search" placeholder="Search claims, policies..." className="w-full" autoFocus />
              <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#fa6724]">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Claim approved</p>
                      <p className="text-xs text-muted-foreground">
                        Your health insurance claim #HD12345 has been approved.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Document verification</p>
                      <p className="text-xs text-muted-foreground">Additional documents required for claim #TR78901.</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Policy renewal reminder</p>
                      <p className="text-xs text-muted-foreground">Your health insurance policy expires in 15 days.</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 text-center">
                <Button variant="ghost" size="sm" className="w-full text-[#07a6ec]">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme toggle */}
          <ModeToggle />

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Zap className="h-5 w-5 text-[#fa6724]" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/claims"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Bell className="h-5 w-5 text-[#07a6ec]" />
              <span>My Claims</span>
            </Link>
            <Link
              href="/dashboard/policies"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="h-5 w-5 text-[#fa6724]" />
              <span>Policies</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-5 w-5 text-[#07a6ec]" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

