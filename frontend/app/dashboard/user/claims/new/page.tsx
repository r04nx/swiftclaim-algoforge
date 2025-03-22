"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Upload, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function NewClaimPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: "Claim submitted successfully",
        description: "Your claim has been received and is under review.",
      })

      router.push("/dashboard/user/claims")
    } catch (error) {
      toast({
        title: "Error submitting claim",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Claims
      </Button>

      <div className="flex items-center gap-4">
        <Image
          src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
          alt="Claim Saathi"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">File a New Claim</h1>
          <p className="text-gray-500">
            Let me help you file your insurance claim
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Claim Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Claim Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select claim type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health">Health Insurance</SelectItem>
                    <SelectItem value="motor">Motor Insurance</SelectItem>
                    <SelectItem value="life">Life Insurance</SelectItem>
                    <SelectItem value="property">Property Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="amount">Claim Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter claim amount"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your claim..."
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Supporting Documents</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2">Drag and drop your files here, or click to browse</p>
                  <p className="text-sm text-gray-500">
                    Supported formats: PDF, JPG, PNG (Max 10MB each)
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FileText className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Claim
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 