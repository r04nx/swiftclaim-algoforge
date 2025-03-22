"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Zap, Eye, EyeOff, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    accountType: "individual",
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      accountType: value,
    }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      // Validate first step
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }
      setStep(2)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.phone || !formData.password || !formData.agreeTerms) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and agree to the terms",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Registration successful",
        description: "Welcome to Swift Claim! Please verify your email to continue.",
      })
      router.push("/auth/verify-email")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Registration Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-[#07a6ec] hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </div>

          <div className="flex items-center mb-8">
            <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-[#fa6724] to-[#07a6ec] mr-3">
              <div className="absolute inset-1 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <Zap className="h-5 w-5 text-[#fa6724]" />
              </div>
            </div>
            <h1 className="text-2xl font-bold">Swift Claim</h1>
          </div>

          <div className="flex-1 max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Create your account</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Join Swift Claim to simplify your insurance claims process
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 1 ? "bg-[#fa6724] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-[#fa6724]" : "bg-gray-200"}`}></div>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 2 ? "bg-[#fa6724] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <RadioGroup
                      value={formData.accountType}
                      onValueChange={handleRadioChange}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="individual" id="individual" />
                        <Label htmlFor="individual" className="cursor-pointer">
                          Individual
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="company" id="company" />
                        <Label htmlFor="company" className="cursor-pointer">
                          Insurance Company
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hospital" id="hospital" />
                        <Label htmlFor="hospital" className="cursor-pointer">
                          Healthcare Provider
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button type="button" className="w-full bg-[#fa6724] hover:bg-[#e55613]" onClick={handleNextStep}>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long with a mix of letters, numbers, and symbols
                    </p>
                  </div>
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="terms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: checked === true }))}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#07a6ec] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#07a6ec] hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 bg-[#fa6724] hover:bg-[#e55613]" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#07a6ec] hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#07a6ec] to-[#fa6724] relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-md text-white">
              <h2 className="text-3xl font-bold mb-4">Why Choose Swift Claim?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>File claims in minutes, not days, with our AI-powered system</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>Secure blockchain verification prevents fraud and ensures transparency</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>Receive instant payouts directly to your UPI account</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>Track claim status in real-time with our interactive dashboard</p>
                </li>
              </ul>
              <div className="mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop"
                  alt="Swift Claim Dashboard"
                  width={400}
                  height={250}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

