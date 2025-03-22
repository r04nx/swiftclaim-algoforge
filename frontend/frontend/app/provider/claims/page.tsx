"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Search, 
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Eye
} from "lucide-react"

const claimsData = {
  pending: [
    {
      id: "CLM-2024",
      customerName: "Priya Mehta",
      type: "Health",
      amount: "₹85,000",
      hospital: "Apollo Hospitals",
      submittedAt: "2024-03-21T14:30:00",
      status: "Under Review",
      documents: ["Medical Reports", "Bills", "Insurance Card"],
      aiRiskScore: 78,
      priority: "High",
      aiRecommendation: "Manual Review Required",
      notes: "Multiple claims from same hospital"
    },
    {
      id: "CLM-2025",
      customerName: "Vikram Singh",
      type: "Motor",
      amount: "₹35,000",
      vehicle: "KA-01-MM-1234",
      submittedAt: "2024-03-21T13:15:00",
      status: "Pending Documents",
      documents: ["Accident Report", "RC Book", "Police FIR"],
      aiRiskScore: 65,
      priority: "Medium"
    }
  ],
  recent: [
    {
      id: "CLM-2022",
      customerName: "Arun Kumar",
      type: "Health",
      amount: "₹55,000",
      hospital: "Fortis Hospital",
      submittedAt: "2024-03-20T09:30:00",
      status: "Approved",
      documents: ["Medical Reports", "Bills"],
      aiRiskScore: 92,
      priority: "Completed"
    }
  ],
  approved: [
    {
      id: "CLM-2020",
      customerName: "Suresh Kumar",
      type: "Motor",
      amount: "₹65,000",
      vehicle: "DL-01-AB-1234",
      submittedAt: "2024-03-19T15:30:00",
      status: "Approved",
      documents: ["Accident Report", "RC Book", "Repair Estimate"],
      aiRiskScore: 95,
      approvedAt: "2024-03-20T10:15:00",
      approvedBy: "AI System",
      settlementAmount: "₹62,000"
    }
  ],
  rejected: [
    {
      id: "CLM-2019",
      customerName: "Meera Patel",
      type: "Health",
      amount: "₹1,25,000",
      hospital: "City Hospital",
      submittedAt: "2024-03-18T11:20:00",
      status: "Rejected",
      documents: ["Medical Reports", "Bills"],
      aiRiskScore: 45,
      rejectionReason: "Policy expired",
      rejectedAt: "2024-03-19T09:30:00"
    }
  ]
}

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [showClaimSaathi, setShowClaimSaathi] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getClaimSaathiMood = (status: string) => {
    switch (status) {
      case "High":
        return "https://i.ibb.co/ZRq6hPFn/claimsaathi-angry-shouting.png"
      case "Approved":
        return "https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
      case "Rejected":
        return "https://i.ibb.co/Z7MhTHj/claimsaathi-neutral-mildlyangry.png"
      default:
        return "https://i.ibb.co/XZP3h1bN/claimsaathi-neutral-firm.png"
    }
  }

  const filteredClaims = [...claimsData.pending, ...claimsData.recent]
    .filter(claim => {
      const searchLower = searchTerm.toLowerCase()
      return (
        claim.id.toLowerCase().includes(searchLower) ||
        claim.customerName.toLowerCase().includes(searchLower) ||
        claim.type.toLowerCase().includes(searchLower)
      )
    })
    .filter(claim => {
      if (activeTab === "all") return true
      if (activeTab === "high") return claim.priority === "High"
      if (activeTab === "pending") return claim.status === "Under Review"
      return claim.status === activeTab
    })

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={getClaimSaathiMood(selectedClaim?.priority || "default")}
            alt="Claim Saathi"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">Claims Management</h1>
            <p className="text-muted-foreground">Process and track insurance claims</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline"
            onClick={() => setShowClaimSaathi(true)}
          >
            <Image
              src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
              alt="Ask Claim Saathi"
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
            Ask Claim Saathi
          </Button>
          <Button className="bg-[#07a6ec]">
            <FileText className="mr-2 h-4 w-4" />
            New Claim
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search claims by ID, customer name, or type..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Claims</TabsTrigger>
          <TabsTrigger value="high">High Priority</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="Approved">Approved</TabsTrigger>
          <TabsTrigger value="Rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid gap-4">
            {filteredClaims.map(claim => (
              <Card key={claim.id} className="hover:border-[#07a6ec] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{claim.customerName}</h3>
                        <Badge variant="outline">{claim.id}</Badge>
                        <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                        {claim.priority === "High" && (
                          <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {claim.type} • {claim.amount} • {new Date(claim.submittedAt).toLocaleDateString()}
                      </div>
                      <div className="mt-4 flex gap-2">
                        {claim.documents.map(doc => (
                          <Badge key={doc} variant="outline" className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" onClick={() => setSelectedClaim(claim)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button>Review Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {showClaimSaathi && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-96 z-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image
                src={getClaimSaathiMood(selectedClaim?.priority || "default")}
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
              onClick={() => setShowClaimSaathi(false)}
            >
              ×
            </Button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mb-3">
            <p className="text-sm">
              {selectedClaim ? (
                `I notice this claim has a risk score of ${selectedClaim.aiRiskScore}. Would you like me to analyze it further?`
              ) : (
                "Hi! I can help you process claims faster. What would you like to know?"
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Type your question..." className="flex-1" />
            <Button className="bg-[#07a6ec]">Send</Button>
          </div>
        </div>
      )}
    </div>
  )
} 