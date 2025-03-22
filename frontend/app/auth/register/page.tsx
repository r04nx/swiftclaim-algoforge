"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Zap, Eye, EyeOff, ChevronRight, Shield, FileText, Phone, Building, Users, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Loader } from "@/components/ui/loader"
import { signIn } from "next-auth/react"

type UserType = "individual" | "company"

interface ContactPerson {
  name: string
  designation: string
  email: string
  phone: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  userType: UserType
  accountType: string
  agreeTerms: boolean
  insuranceType: string[]
  existingPolicy: string
  policyNumber: string
  companyName: string
  registrationNumber: string
  companyType: string
  contactPerson: ContactPerson
}

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    userType: "individual",
    accountType: "individual",
    agreeTerms: false,
    insuranceType: [],
    existingPolicy: "",
    policyNumber: "",
    companyName: "",
    registrationNumber: "",
    companyType: "",
    contactPerson: {
      name: "",
      designation: "",
      email: "",
      phone: ""
    }
  })
  const [isTransitioning, setIsTransitioning] = useState(false)

  const insuranceTypes = [
    "Health Insurance",
    "Motor Insurance",
    "Life Insurance",
    "Property Insurance",
    "Travel Insurance"
  ]

  const handleNext = () => {
    // Validate based on user type and current step
    if (formData.userType === "company") {
      switch (step) {
        case 1:
          if (!formData.companyName || !formData.registrationNumber || !formData.companyType) {
            toast({
              title: "Required Fields",
              description: "Please fill in all company details",
              variant: "destructive"
            })
            return
          }
          break
        case 2:
          if (!formData.contactPerson.name || !formData.contactPerson.email || 
              !formData.contactPerson.phone || !formData.contactPerson.designation) {
            toast({
              title: "Required Fields",
              description: "Please fill in all contact person details",
              variant: "destructive"
            })
            return
          }
          break
      }
    } else {
      // Individual user validation
      switch (step) {
        case 1:
          if (!formData.firstName || !formData.lastName || !formData.email) {
            toast({
              title: "Required Fields",
              description: "Please fill in all required fields",
              variant: "destructive"
            })
            return
          }
          break
        case 2:
          if (!formData.phone || !formData.password) {
            toast({
              title: "Required Fields",
              description: "Please fill in all required fields",
              variant: "destructive"
            })
            return
          }
          break
      }
    }
    setStep(step + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Final validation before submission
      if (!formData.agreeTerms) {
        toast({
          title: "Terms Agreement Required",
          description: "Please agree to the terms and conditions",
          variant: "destructive"
        })
        return
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Sign in the user after successful registration
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      toast({
        title: "Registration Successful",
        description: "Welcome to Swift Claim!",
      })

      // Redirect based on user type
      router.push(formData.userType === "company" ? "/dashboard/provider" : "/dashboard/user")
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    if (formData.userType === "company") {
      switch (step) {
        case 1:
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <Building className="h-8 w-8 text-[#07a6ec]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Company Registration</h2>
                  <p className="text-gray-600 dark:text-gray-400">Tell us about your insurance company</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <Label>I am registering as:</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value })}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.userType === "individual"
                      ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                      : "hover:border-gray-400"
                  }`}>
                    <RadioGroupItem value="individual" id="individual" className="sr-only" />
                    <Label htmlFor="individual" className="cursor-pointer">
                      <div className="font-medium mb-1">Individual Policyholder</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        I want to manage my personal insurance policies
                      </p>
                    </Label>
                  </div>

                  <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.userType === "company"
                      ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                      : "hover:border-gray-400"
                  }`}>
                    <RadioGroupItem value="company" id="company" className="sr-only" />
                    <Label htmlFor="company" className="cursor-pointer">
                      <div className="font-medium mb-1">Insurance Provider</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        I represent an insurance company
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyType">Company Type</Label>
                  <select
                    id="companyType"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={formData.companyType}
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                    required
                  >
                    <option value="">Select company type</option>
                    <option value="general">General Insurance</option>
                    <option value="life">Life Insurance</option>
                    <option value="health">Health Insurance</option>
                    <option value="composite">Composite Insurance</option>
                  </select>
                </div>
              </div>
            </div>
          )

        case 2:
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Users className="h-8 w-8 text-[#07a6ec]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Contact Person Details</h2>
                  <p className="text-gray-600 dark:text-gray-400">Who should we contact?</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactPerson.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      contactPerson: { ...formData.contactPerson, name: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={formData.contactPerson.designation}
                    onChange={(e) => setFormData({
                      ...formData,
                      contactPerson: { ...formData.contactPerson, designation: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactPerson.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      contactPerson: { ...formData.contactPerson, email: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPerson.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      contactPerson: { ...formData.contactPerson, phone: e.target.value }
                    })}
                    required
                  />
                </div>
              </div>
            </div>
          )

        case 3:
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-[#07a6ec]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Verification & Terms</h2>
                  <p className="text-gray-600 dark:text-gray-400">Final steps to complete registration</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-2">Next Steps After Registration:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Complete company verification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Set up blockchain integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Configure policy templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Add team members
                    </li>
                  </ul>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, agreeTerms: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-sm text-gray-600 dark:text-gray-400"
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
              </div>
            </div>
          )

        default:
          return null
      }
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
            <Image
              src="https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
              alt="Welcome"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome!</h2>
            <p className="text-gray-600 dark:text-gray-400">Let's start with your basic information</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <Label>I am registering as:</Label>
          <RadioGroup
            value={formData.userType}
            onValueChange={(value) => setFormData({ ...formData, userType: value })}
            className="grid grid-cols-2 gap-4"
          >
            <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              formData.userType === "individual"
                ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                : "hover:border-gray-400"
            }`}>
              <RadioGroupItem value="individual" id="individual" className="sr-only" />
              <Label htmlFor="individual" className="cursor-pointer">
                <div className="font-medium mb-1">Individual Policyholder</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  I want to manage my personal insurance policies
                </p>
              </Label>
            </div>

            <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              formData.userType === "company"
                ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                : "hover:border-gray-400"
            }`}>
              <RadioGroupItem value="company" id="company" className="sr-only" />
              <Label htmlFor="company" className="cursor-pointer">
                <div className="font-medium mb-1">Insurance Provider</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  I represent an insurance company
                </p>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {isTransitioning && <Loader />}
      <div className="min-h-screen flex">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => (step === 1 ? router.push("/") : setStep(step - 1))}
                className="mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {step === 1 ? "Back to Home" : "Previous Step"}
              </Button>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full flex-1 transition-colors ${
                      i <= step ? "bg-[#07a6ec]" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {renderStep()}

              <div className="mt-8">
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-[#07a6ec] hover:bg-[#0696d7]"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-[#fa6724] hover:bg-[#e55613]"
                    disabled={formData.userType === "company" 
                      ? !formData.agreeTerms 
                      : (!formData.agreeTerms || formData.insuranceType.length === 0)}
                  >
                    Create Account
                    <Zap className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Features */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-[#fa6724] to-[#07a6ec] relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-md text-white">
              <h2 className="text-3xl font-bold mb-6">Why Choose Swift Claim?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>Process insurance claims in minutes, not months</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>AI-powered claim assessment for instant approvals</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>Secure blockchain verification prevents fraud</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>24/7 support with Claim Saathi AI assistant</p>
                </li>
              </ul>

              {/* Testimonial */}
              <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Image
                      src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                      alt="Claim Saathi"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm mb-2">
                      "Swift Claim has revolutionized how we handle insurance claims. The process is 
                      incredibly fast and transparent!"
                    </p>
                    <p className="text-sm font-medium">- Rahul Mehta, Happy Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

