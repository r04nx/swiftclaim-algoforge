"use client"

<<<<<<< HEAD
import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Calendar,
  CreditCard,
  Download,
  Upload,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Car,
  Home,
  Heart,
  Umbrella
} from "lucide-react"

// Realistic user dashboard data
const dashboardData = {
  user: {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    joinedDate: "May 2023",
    profileImage: "https://i.pravatar.cc/150?img=68"
  },
  policies: [
    {
      id: "POL-1234567",
      type: "Health Insurance",
      provider: "Max Bupa",
      premium: "₹24,500/year",
      coverage: "₹5,00,000",
      status: "Active",
      renewalDate: "2024-12-15",
      icon: <Heart className="h-5 w-5 text-red-500" />
    },
    {
      id: "POL-7891234",
      type: "Motor Insurance",
      provider: "ICICI Lombard",
      premium: "₹12,800/year",
      coverage: "₹3,50,000",
      status: "Active",
      renewalDate: "2024-08-30",
      icon: <Car className="h-5 w-5 text-blue-500" />
    },
    {
      id: "POL-4567890",
      type: "Home Insurance",
      provider: "HDFC ERGO",
      premium: "₹8,500/year",
      coverage: "₹50,00,000",
      status: "Active",
      renewalDate: "2025-02-10",
      icon: <Home className="h-5 w-5 text-green-500" />
    }
  ],
  claims: [
    {
      id: "CLM-9876543",
      policyId: "POL-1234567",
      type: "Health Insurance",
      date: "2024-03-15",
      amount: "₹45,000",
      status: "Processing",
      progress: 60,
      documents: 4,
      pendingAction: "Medical bills verification"
    },
    {
      id: "CLM-6543210",
      policyId: "POL-7891234",
      type: "Motor Insurance",
      date: "2024-02-28",
      amount: "₹35,000",
      status: "Approved",
      progress: 100,
      documents: 6,
      pendingAction: null
    },
    {
      id: "CLM-3210987",
      policyId: "POL-1234567",
      type: "Health Insurance",
      date: "2023-11-10",
      amount: "₹18,500",
      status: "Settled",
      progress: 100,
      documents: 5,
      pendingAction: null
    }
  ],
  payments: [
    {
      id: "PAY-123456",
      policyId: "POL-1234567",
      date: "2024-01-15",
      amount: "₹24,500",
      method: "Credit Card",
      status: "Successful"
    },
    {
      id: "PAY-789012",
      policyId: "POL-7891234",
      date: "2024-02-05",
      amount: "₹12,800",
      method: "Net Banking",
      status: "Successful"
    },
    {
      id: "PAY-345678",
      policyId: "POL-4567890",
      date: "2024-02-10",
      amount: "₹8,500",
      method: "UPI",
      status: "Successful"
    }
  ],
  notifications: [
    {
      id: "NOTIF-1",
      type: "Claim Update",
      message: "Your claim CLM-9876543 is being processed. Medical bills verification in progress.",
      date: "2024-03-18T10:30:00",
      isRead: false
    },
    {
      id: "NOTIF-2",
      type: "Policy Renewal",
      message: "Your Motor Insurance policy POL-7891234 is due for renewal in 45 days.",
      date: "2024-03-15T14:15:00",
      isRead: true
    },
    {
      id: "NOTIF-3",
      type: "Payment Confirmation",
      message: "Payment of ₹24,500 for Health Insurance policy POL-1234567 was successful.",
      date: "2024-01-15T09:45:00",
      isRead: true
    }
  ],
  documents: [
    {
      id: "DOC-1",
      name: "Health Insurance Policy Document",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2023-05-10",
      category: "Policy"
    },
    {
      id: "DOC-2",
      name: "Motor Insurance Policy Document",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2023-08-15",
      category: "Policy"
    },
    {
      id: "DOC-3",
      name: "Hospital Discharge Summary",
      type: "PDF",
      size: "3.2 MB",
      uploadDate: "2024-03-15",
      category: "Claim"
    },
    {
      id: "DOC-4",
      name: "Medical Bills",
      type: "PDF",
      size: "4.5 MB",
      uploadDate: "2024-03-15",
      category: "Claim"
    }
  ]
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAssistant, setShowAssistant] = useState(false)

  // Function to get time-appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{getGreeting()}, {dashboardData.user.name}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your insurance policies and claims
          </p>
        </div>
        <Button 
          className="bg-[#07a6ec] hover:bg-[#0696d7]"
          onClick={() => setShowAssistant(true)}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Ask Claim Saathi
        </Button>
      </div>

      {/* Policy Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardData.policies.map((policy) => (
          <Card key={policy.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    {policy.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{policy.type}</h3>
                    <p className="text-sm text-muted-foreground">{policy.provider}</p>
                  </div>
                </div>
                <Badge className={policy.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {policy.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Policy ID</span>
                  <span className="font-medium">{policy.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Coverage</span>
                  <span className="font-medium">{policy.coverage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Premium</span>
                  <span className="font-medium">{policy.premium}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Renewal</span>
                  <span className="font-medium">{new Date(policy.renewalDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" className="bg-[#07a6ec] hover:bg-[#0696d7]">
                  File Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Claims */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.claims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {claim.status === "Processing" ? (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      ) : claim.status === "Approved" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                      )}
                      <div>
                        <h4 className="font-medium">{claim.id}</h4>
                        <p className="text-sm text-muted-foreground">{claim.type}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{claim.amount}</p>
                      <p className="text-sm text-muted-foreground">{new Date(claim.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge
                          className={
                            claim.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : claim.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {claim.status}
                        </Badge>
                        {claim.pendingAction && (
                          <p className="text-xs text-muted-foreground mt-1">{claim.pendingAction}</p>
                        )}
                      </div>
                      <Progress value={claim.progress} className="w-[100px]" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">View All Claims</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.notifications.map((notification) => (
                  <div key={notification.id} className={`p-4 border rounded-lg ${!notification.isRead ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{notification.type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{notification.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-6">
          {/* Claims content */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Claims</CardTitle>
              <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">
                New Claim
              </Button>
            </CardHeader>
            <CardContent>
              {/* Claims table or list would go here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          {/* Payments content */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{payment.id}</h4>
                      <p className="text-sm text-muted-foreground">
                        Policy: {payment.policyId}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{payment.amount}</p>
                      <p className="text-sm text-muted-foreground">{payment.method}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">
                        {payment.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          {/* Documents content */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Documents</CardTitle>
              <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{doc.category}</Badge>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Claim Saathi Assistant */}
      {showAssistant && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80 z-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="https://i.ibb.co/8nHxb4zN/claimsaathi-snapping-winking.png"
                alt="Claim Saathi"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-medium">Claim Saathi</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAssistant(false)}
            >
              ×
            </Button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mb-3">
            <p className="text-sm">
              Hi {dashboardData.user.name}! I'm here to help with your insurance needs. 
              What would you like to know about your policies or claims?
            </p>
          </div>
          {/* Chat interface would go here */}
        </div>
      )}
=======
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
>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2
    </div>
  )
} 