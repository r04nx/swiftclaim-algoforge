"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Shield,
  TrendingUp,
  FileText,
  Eye
} from "lucide-react"

const fraudData = {
  activeAlerts: [
    {
      id: "FRD-124",
      type: "Multiple Claims",
      description: "3 claims from same policy in 48 hours",
      severity: "High",
      detectedAt: "2024-03-21T10:00:00",
      aiConfidence: 92,
      status: "Under Investigation",
      relatedClaims: ["CLM-2024", "CLM-2025", "CLM-2026"]
    },
    {
      id: "FRD-125",
      type: "Document Tampering",
      description: "Inconsistent hospital records",
      severity: "Medium",
      detectedAt: "2024-03-21T09:30:00",
      aiConfidence: 78,
      status: "Pending Review",
      relatedClaims: ["CLM-2027"]
    }
  ],
  insights: {
    commonPatterns: [
      {
        type: "Multiple Hospital Claims",
        occurrences: 15,
        trend: "+12%",
        riskLevel: "High"
      },
      {
        type: "Delayed Reporting",
        occurrences: 23,
        trend: "-5%",
        riskLevel: "Medium"
      }
    ],
    preventionMetrics: {
      fraudPrevented: "₹4.2M",
      accuracyRate: "96%",
      falsePositives: "3.2%",
      averageDetectionTime: "45 seconds"
    }
  }
}

export default function FraudDetectionPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://i.ibb.co/Z7MhTHj/claimsaathi-neutral-mildlyangry.png"
            alt="Claim Saathi"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">Fraud Detection</h1>
            <p className="text-muted-foreground">AI-powered fraud prevention system</p>
          </div>
        </div>
        <Button className="bg-[#07a6ec]">
          <Shield className="mr-2 h-4 w-4" />
          View Reports
        </Button>
      </div>

      {/* Add fraud detection content */}
    </div>
  )
} 