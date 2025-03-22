"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
  Calendar,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const recentClaims = [
  {
    id: "CLM-001",
    type: "Health",
    status: "pending",
    amount: 25000,
    date: "2024-03-15",
  },
  {
    id: "CLM-002",
    type: "Motor",
    status: "approved",
    amount: 15000,
    date: "2024-03-10",
  },
]

const activePolicies = [
  {
    id: "POL-001",
    type: "Health Insurance",
    coverage: "₹5,00,000",
    expiry: "2025-03-15",
  },
  {
    id: "POL-002",
    type: "Motor Insurance",
    coverage: "₹2,00,000",
    expiry: "2024-12-31",
  },
]

export default function UserDashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <Image
          src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
          alt="Claim Saathi"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name}!</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Here's an overview of your insurance portfolio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">3 active claims</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <Shield className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">Total coverage: ₹10L</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">Under review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Claim Success</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80%</div>
            <p className="text-xs text-gray-500">4 out of 5 approved</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        claim.status === "approved"
                          ? "bg-green-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      {claim.status === "approved" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{claim.type} Claim</p>
                      <p className="text-sm text-gray-500">
                        ₹{claim.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/user/claims/${claim.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/user/claims">
                  View All Claims
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Active Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activePolicies.map((policy) => (
                <div
                  key={policy.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{policy.type}</p>
                      <p className="text-sm text-gray-500">
                        Coverage: {policy.coverage}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/user/policies/${policy.id}`}>
                      View Policy
                    </Link>
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/user/policies">
                  View All Policies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full" asChild>
              <Link href="/dashboard/user/claims/new">
                <FileText className="mr-2 h-4 w-4" />
                File New Claim
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/user/policies">
                <Shield className="mr-2 h-4 w-4" />
                View Policies
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/user/support">
                <AlertCircle className="mr-2 h-4 w-4" />
                Get Support
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 