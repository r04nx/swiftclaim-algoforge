"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  TrendingUp,
  Clock,
  Brain,
  Star
} from "lucide-react"

const performanceData = {
  teamMetrics: [
    {
      agent: "Anjali Singh",
      claimsProcessed: 45,
      accuracy: 98,
      avgProcessingTime: "3.2 hours",
      customerRating: 4.8,
      recentClaims: [
        { id: "CLM-2024", status: "Approved", time: "2.5 hours" },
        { id: "CLM-2023", status: "Under Review", time: "1.8 hours" }
      ]
    },
    {
      agent: "Rahul Verma",
      claimsProcessed: 38,
      accuracy: 96,
      avgProcessingTime: "3.8 hours",
      customerRating: 4.6,
      recentClaims: [
        { id: "CLM-2022", status: "Approved", time: "3.1 hours" },
        { id: "CLM-2021", status: "Rejected", time: "2.9 hours" }
      ]
    }
  ],
  aiPerformance: {
    accuracyRate: 99.2,
    fraudPrevention: "₹3.2M",
    automationRate: 82,
    avgResponseTime: "1.2 seconds",
    improvements: [
      { metric: "Processing Speed", change: "+15%" },
      { metric: "Error Rate", change: "-8%" }
    ]
  }
}

export default function PerformancePage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
            alt="Claim Saathi"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">Performance Metrics</h1>
            <p className="text-muted-foreground">Team and AI performance analytics</p>
          </div>
        </div>
        <Button className="bg-[#07a6ec]">
          <TrendingUp className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Add performance metrics content */}
    </div>
  )
} 