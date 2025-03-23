"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const claims = [
  {
    id: "CLM-001",
    type: "Health",
    status: "pending",
    amount: 25000,
    submittedDate: "2024-03-15",
    description: "Hospital admission for surgery",
    documents: ["medical_report.pdf", "bills.pdf"],
  },
  {
    id: "CLM-002",
    type: "Motor",
    status: "approved",
    amount: 15000,
    submittedDate: "2024-03-10",
    description: "Car accident repair",
    documents: ["accident_report.pdf", "garage_estimate.pdf"],
  },
  // Add more dummy claims...
]

export default function ClaimsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Claims</h1>
          <p className="text-gray-500">Manage and track your insurance claims</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/user/claims/new">
            File New Claim
            <FileText className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {claims.map((claim) => (
          <Card key={claim.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  Claim #{claim.id}
                  <Badge 
                    className={
                      claim.status === "approved" 
                        ? "bg-green-100 text-green-800 ml-2"
                        : claim.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 ml-2"
                        : "bg-red-100 text-red-800 ml-2"
                    }
                  >
                    {claim.status.toUpperCase()}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Submitted on {new Date(claim.submittedDate).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/dashboard/user/claims/${claim.id}`}>
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold">Type</h3>
                  <p>{claim.type}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Amount Claimed</h3>
                  <p>₹{claim.amount.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Description</h3>
                  <p>{claim.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Documents</h3>
                  <div className="flex gap-2">
                    {claim.documents.map((doc) => (
                      <Badge key={doc} variant="secondary">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 