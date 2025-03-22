"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import {
  FileText,
  PlusCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Shield,
  Calendar,
  MapPin,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Rahul! Here's an overview of your insurance claims.</p>
        </div>
        <Link href="/dashboard/claims/new">
          <Button className="bg-[#fa6724] hover:bg-[#e55613]">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Claim
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">-1 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Claims</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected Claims</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Same as last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Claims and Chart */}
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Recent Claims</CardTitle>
                <CardDescription>Your most recent insurance claims and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClaims.map((claim) => (
                    <div key={claim.id} className="flex items-center gap-4">
                      <div className={`w-2 h-10 rounded-full ${getStatusColor(claim.status)}`} />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{claim.title}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(claim.status)}`}>
                            {claim.status}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Shield className="mr-1 h-3 w-3" />
                          <span>{claim.policy}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>{claim.date}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>{claim.location}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/claims/${claim.id}`}>
                          <ArrowRight className="h-4 w-4" />
                          <span className="sr-only">View claim</span>
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/claims/all">View all claims</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Claims Overview</CardTitle>
                <CardDescription>Distribution of your claims by status</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    approved: {
                      label: "Approved",
                      color: "hsl(var(--chart-1))",
                    },
                    pending: {
                      label: "Pending",
                      color: "hsl(var(--chart-2))",
                    },
                    rejected: {
                      label: "Rejected",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={claimsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="approved" fill="var(--color-approved)" name="Approved" />
                      <Bar dataKey="pending" fill="var(--color-pending)" name="Pending" />
                      <Bar dataKey="rejected" fill="var(--color-rejected)" name="Rejected" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Alerts and Recommendations */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>Important notifications about your policies and claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Policy Renewal Required</p>
                      <p className="text-xs text-muted-foreground">
                        Your health insurance policy expires in 15 days. Renew now to avoid coverage gaps.
                      </p>
                      <Button size="sm" variant="link" className="p-0 h-auto text-xs text-[#fa6724]">
                        Renew Policy
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Document Verification</p>
                      <p className="text-xs text-muted-foreground">
                        Additional documents required for claim #TR78901. Please upload them within 3 days.
                      </p>
                      <Button size="sm" variant="link" className="p-0 h-auto text-xs text-[#07a6ec]">
                        Upload Documents
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Personalized suggestions based on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Critical Illness Cover</p>
                      <p className="text-xs text-muted-foreground">
                        Based on your profile, we recommend adding critical illness coverage to your health policy.
                      </p>
                      <Button
                        size="sm"
                        variant="link"
                        className="p-0 h-auto text-xs text-green-600 dark:text-green-500"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Premium Discount</p>
                      <p className="text-xs text-muted-foreground">
                        You're eligible for a 15% discount on your travel insurance premium. Apply before your next
                        trip.
                      </p>
                      <Button
                        size="sm"
                        variant="link"
                        className="p-0 h-auto text-xs text-purple-600 dark:text-purple-500"
                      >
                        Apply Discount
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claims History</CardTitle>
              <CardDescription>Detailed view of all your insurance claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {allClaims.map((claim) => (
                  <div key={claim.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium">{claim.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Shield className="mr-1 h-4 w-4" />
                          <span>{claim.policy}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{claim.date}</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusBadgeColor(claim.status)}`}>
                          {claim.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Claim Details</h4>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Claim ID:</span>
                            <span>{claim.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <span>₹{claim.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span>{claim.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Submitted:</span>
                            <span>{claim.submittedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Claim Progress</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Verification</span>
                              <span>{claim.progress.verification}%</span>
                            </div>
                            <Progress value={claim.progress.verification} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Processing</span>
                              <span>{claim.progress.processing}%</span>
                            </div>
                            <Progress value={claim.progress.processing} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Payment</span>
                              <span>{claim.progress.payment}%</span>
                            </div>
                            <Progress value={claim.progress.payment} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/claims/${claim.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Policies</CardTitle>
              <CardDescription>Overview of all your active insurance policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {policies.map((policy) => (
                  <div key={policy.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPolicyTypeColor(policy.type)}`}
                        >
                          {getPolicyTypeIcon(policy.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{policy.name}</h3>
                          <p className="text-sm text-muted-foreground">{policy.provider}</p>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            policy.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-400"
                          }`}
                        >
                          {policy.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Policy Details</h4>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Policy Number:</span>
                            <span>{policy.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sum Insured:</span>
                            <span>₹{policy.sumInsured.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Premium:</span>
                            <span>₹{policy.premium.toLocaleString()}/year</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Coverage Period</h4>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Start Date:</span>
                            <span>{policy.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">End Date:</span>
                            <span>{policy.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Days Remaining:</span>
                            <span>{policy.daysRemaining} days</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Claims</h4>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Claims:</span>
                            <span>{policy.claims.total}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Approved:</span>
                            <span>{policy.claims.approved}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pending:</span>
                            <span>{policy.claims.pending}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/policies/${policy.id}`}>View Details</Link>
                      </Button>
                      {policy.daysRemaining < 30 && (
                        <Button size="sm" className="bg-[#fa6724] hover:bg-[#e55613]">
                          Renew Policy
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claims Analytics</CardTitle>
              <CardDescription>Insights and trends from your insurance claims history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Claims Trend</h3>
                  <ChartContainer
                    config={{
                      claims: {
                        label: "Claims",
                        color: "hsl(var(--chart-1))",
                      },
                      amount: {
                        label: "Amount (₹)",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={claimsTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="claims"
                          stroke="var(--color-claims)"
                          name="Claims"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="amount"
                          stroke="var(--color-amount)"
                          name="Amount (₹)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Claims by Type</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Health</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Travel</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Motor</span>
                          <span>10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Processing Time</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Average Processing Time</p>
                          <p className="text-sm text-muted-foreground">Time from submission to payout</p>
                        </div>
                        <div className="text-2xl font-bold text-[#07a6ec]">2.5 days</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Industry Average</p>
                          <p className="text-sm text-muted-foreground">Standard processing time</p>
                        </div>
                        <div className="text-2xl font-bold text-muted-foreground">45 days</div>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <p className="text-sm font-medium text-green-800 dark:text-green-400">
                          Your claims are processed 94% faster than the industry average thanks to blockchain
                          verification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions
function getStatusColor(status: string) {
  switch (status) {
    case "Approved":
      return "bg-green-500"
    case "Pending":
      return "bg-yellow-500"
    case "Processing":
      return "bg-blue-500"
    case "Rejected":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-400"
    case "Processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
    case "Rejected":
      return "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
  }
}

function getPolicyTypeColor(type: string) {
  switch (type) {
    case "Health":
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
    case "Travel":
      return "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-400"
    case "Motor":
      return "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
  }
}

function getPolicyTypeIcon(type: string) {
  switch (type) {
    case "Health":
      return <Shield className="h-6 w-6" />
    case "Travel":
      return <MapPin className="h-6 w-6" />
    case "Motor":
      return <Car className="h-6 w-6" />
    default:
      return <FileText className="h-6 w-6" />
  }
}

// Sample data
const recentClaims = [
  {
    id: "HD12345",
    title: "Hospital Admission - Apollo Hospital",
    status: "Approved",
    policy: "Health Insurance",
    date: "15 May 2023",
    location: "Mumbai",
  },
  {
    id: "TR78901",
    title: "Flight Cancellation - Air India",
    status: "Processing",
    policy: "Travel Insurance",
    date: "02 Jun 2023",
    location: "Delhi",
  },
  {
    id: "HD67890",
    title: "Medical Consultation - Max Hospital",
    status: "Pending",
    policy: "Health Insurance",
    date: "10 Jun 2023",
    location: "Bangalore",
  },
  {
    id: "TR45678",
    title: "Baggage Loss - IndiGo Airlines",
    status: "Rejected",
    policy: "Travel Insurance",
    date: "25 May 2023",
    location: "Chennai",
  },
]

const allClaims = [
  {
    id: "HD12345",
    title: "Hospital Admission - Apollo Hospital",
    status: "Approved",
    policy: "Health Insurance",
    date: "15 May 2023",
    location: "Mumbai",
    amount: 45000,
    submittedDate: "12 May 2023",
    progress: {
      verification: 100,
      processing: 100,
      payment: 100,
    },
  },
  {
    id: "TR78901",
    title: "Flight Cancellation - Air India",
    status: "Processing",
    policy: "Travel Insurance",
    date: "02 Jun 2023",
    location: "Delhi",
    amount: 12500,
    submittedDate: "01 Jun 2023",
    progress: {
      verification: 100,
      processing: 70,
      payment: 0,
    },
  },
  {
    id: "HD67890",
    title: "Medical Consultation - Max Hospital",
    status: "Pending",
    policy: "Health Insurance",
    date: "10 Jun 2023",
    location: "Bangalore",
    amount: 8000,
    submittedDate: "10 Jun 2023",
    progress: {
      verification: 40,
      processing: 0,
      payment: 0,
    },
  },
  {
    id: "TR45678",
    title: "Baggage Loss - IndiGo Airlines",
    status: "Rejected",
    policy: "Travel Insurance",
    date: "25 May 2023",
    location: "Chennai",
    amount: 15000,
    submittedDate: "23 May 2023",
    progress: {
      verification: 100,
      processing: 100,
      payment: 0,
    },
  },
]

const policies = [
  {
    id: "HL-1234-5678",
    name: "Comprehensive Health Insurance",
    provider: "Max Bupa Health Insurance",
    type: "Health",
    status: "Active",
    sumInsured: 500000,
    premium: 12000,
    startDate: "01 Jan 2023",
    endDate: "31 Dec 2023",
    daysRemaining: 15,
    claims: {
      total: 5,
      approved: 4,
      pending: 1,
    },
  },
  {
    id: "TR-5678-9012",
    name: "International Travel Insurance",
    provider: "ICICI Lombard",
    type: "Travel",
    status: "Active",
    sumInsured: 250000,
    premium: 5000,
    startDate: "15 Mar 2023",
    endDate: "14 Mar 2024",
    daysRemaining: 90,
    claims: {
      total: 2,
      approved: 1,
      pending: 1,
    },
  },
  {
    id: "MT-9012-3456",
    name: "Comprehensive Motor Insurance",
    provider: "HDFC ERGO",
    type: "Motor",
    status: "Expiring Soon",
    sumInsured: 350000,
    premium: 8000,
    startDate: "10 Jul 2022",
    endDate: "09 Jul 2023",
    daysRemaining: 5,
    claims: {
      total: 1,
      approved: 1,
      pending: 0,
    },
  },
]

const claimsData = [
  {
    month: "Jan",
    approved: 1,
    pending: 0,
    rejected: 0,
  },
  {
    month: "Feb",
    approved: 0,
    pending: 1,
    rejected: 0,
  },
  {
    month: "Mar",
    approved: 2,
    pending: 0,
    rejected: 0,
  },
  {
    month: "Apr",
    approved: 1,
    pending: 1,
    rejected: 0,
  },
  {
    month: "May",
    approved: 3,
    pending: 0,
    rejected: 1,
  },
  {
    month: "Jun",
    approved: 2,
    pending: 2,
    rejected: 0,
  },
]

const claimsTrendData = [
  {
    month: "Jan",
    claims: 1,
    amount: 15000,
  },
  {
    month: "Feb",
    claims: 1,
    amount: 8000,
  },
  {
    month: "Mar",
    claims: 2,
    amount: 30000,
  },
  {
    month: "Apr",
    claims: 2,
    amount: 25000,
  },
  {
    month: "May",
    claims: 4,
    amount: 60000,
  },
  {
    month: "Jun",
    claims: 4,
    amount: 45000,
  },
]

// Missing import
function Car(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
      <circle cx="6.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  )
}

