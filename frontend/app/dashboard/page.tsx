"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  PlusCircle,
  ArrowUp,
  ArrowDown,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  DollarSign,
  Calendar,
} from "lucide-react"
import { KYCVerificationModal } from "@/components/verification/kyc-verification-modal"
import { SmartContractViewer } from "@/components/blockchain/smart-contract-viewer"
import { ClaimAnalysis } from "@/components/ai/claim-analysis"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showKYCModal, setShowKYCModal] = useState(true)

  const recentClaims = [
    {
      id: "CLM-123",
      type: "Health",
      amount: "₹45,000",
      status: "Processing",
      date: "2024-03-15",
      progress: 65,
    },
    {
      id: "CLM-122",
      type: "Motor",
      amount: "₹12,500",
      status: "Approved",
      date: "2024-03-10",
      progress: 100,
    },
    {
      id: "CLM-121",
      type: "Travel",
      amount: "₹8,000",
      status: "Rejected",
      date: "2024-03-05",
      progress: 100,
    },
  ]

  return (
    <>
      <KYCVerificationModal 
        isOpen={showKYCModal} 
        onClose={() => setShowKYCModal(false)} 
      />
      
      <div className="space-y-6">
        {/* Welcome Section with Claim Saathi */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-[#07a6ec]/10 to-[#fa6724]/10 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#07a6ec] to-[#fa6724] flex items-center justify-center">
              <Image
                src="https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
                alt="Claim Saathi"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, Rahul!</h1>
              <p className="text-muted-foreground">Here's what's happening with your insurance claims</p>
            </div>
          </div>
          <Link href="/dashboard/claims/new">
            <Button className="bg-[#fa6724] hover:bg-[#e55613]">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Claim
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Claims</p>
                  <h3 className="text-2xl font-bold mt-1">3</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">12%</span>
                <span className="text-muted-foreground ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Claimed</p>
                  <h3 className="text-2xl font-bold mt-1">₹65,500</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">8%</span>
                <span className="text-muted-foreground ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>

          {/* Add more stats cards... */}
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="ai">AI Analysis</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Recent Claims */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClaims.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#07a6ec] to-[#fa6724] flex items-center justify-center">
                          <Image
                            src={
                              claim.status === "Approved"
                                ? "https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
                                : claim.status === "Rejected"
                                ? "https://i.ibb.co/ZRq6hPFn/claimsaathi-angry-shouting.png"
                                : "https://i.ibb.co/99WsM9fP/claimsaathi-dancing-neutral.png"
                            }
                            alt="Claim Saathi"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{claim.id}</span>
                            <Badge variant="outline">{claim.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{claim.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge
                            className={
                              claim.status === "Approved"
                                ? "bg-green-500"
                                : claim.status === "Rejected"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }
                          >
                            {claim.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{claim.date}</p>
                        </div>
                        <Progress value={claim.progress} className="w-[100px]" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain">
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <SmartContractViewer />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ClaimAnalysis />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

