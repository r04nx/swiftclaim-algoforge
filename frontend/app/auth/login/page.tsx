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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fingerprint, ArrowLeft, Zap, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"password" | "otp" | "biometric">("password")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login successful",
        description: "Welcome back to Swift Claim!",
      })
      router.push("/dashboard")
    }, 1500)
  }

  const handleBiometricLogin = async () => {
    setIsLoading(true)

    // Simulate biometric authentication
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Biometric authentication successful",
        description: "Welcome back to Swift Claim!",
      })
      router.push("/dashboard")
    }, 1500)
  }

  const handleSendOtp = async () => {
    setIsLoading(true)

    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "OTP sent",
        description: `A verification code has been sent to ${phoneNumber}`,
      })
      setLoginMethod("otp")
    }, 1000)
  }

  const handleVerifyOtp = async () => {
    setIsLoading(true)

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "OTP verified",
        description: "Welcome back to Swift Claim!",
      })
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Login Form */}
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
              <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
              <p className="text-gray-600 dark:text-gray-400">Log in to your account to manage your insurance claims</p>
            </div>

            <Tabs defaultValue="password" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="password" onClick={() => setLoginMethod("password")}>
                  Password
                </TabsTrigger>
                <TabsTrigger value="otp" onClick={() => setLoginMethod("password")}>
                  OTP
                </TabsTrigger>
                <TabsTrigger value="biometric" onClick={() => setLoginMethod("biometric")}>
                  Biometric
                </TabsTrigger>
              </TabsList>

              <TabsContent value="password">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/auth/forgot-password" className="text-sm text-[#07a6ec] hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-[#fa6724] hover:bg-[#e55613]" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Log in"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="otp">
                {loginMethod === "password" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      onClick={handleSendOtp}
                      className="w-full bg-[#fa6724] hover:bg-[#e55613]"
                      disabled={isLoading || !phoneNumber}
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <Label className="block text-center mb-4">
                        Enter the verification code sent to {phoneNumber}
                      </Label>
                      <div className="flex justify-center gap-2">
                        {otp.map((digit, index) => (
                          <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className="w-12 h-12 text-center text-xl"
                          />
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={handleVerifyOtp}
                      className="w-full bg-[#fa6724] hover:bg-[#e55613]"
                      disabled={isLoading || otp.some((digit) => !digit)}
                    >
                      {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                    <p className="text-center text-sm">
                      Didn't receive the code?{" "}
                      <button type="button" className="text-[#07a6ec] hover:underline" onClick={handleSendOtp}>
                        Resend
                      </button>
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="biometric">
                <div className="space-y-6 text-center">
                  <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Fingerprint className="h-12 w-12 text-[#07a6ec]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Biometric Authentication</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Use your fingerprint or face ID to securely log in to your account
                    </p>
                    <Button
                      onClick={handleBiometricLogin}
                      className="bg-[#fa6724] hover:bg-[#e55613]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Authenticating..." : "Authenticate"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-[#07a6ec] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#fa6724] to-[#07a6ec] relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-md text-white">
              <h2 className="text-3xl font-bold mb-4">Revolutionizing Insurance Claims</h2>
              <p className="text-lg mb-6">
                Swift Claim reduces claim settlement time from 90 days to under 3 minutes with AI & blockchain
                technology.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Image
                      src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                      alt="Claim Saathi"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-sm">
                      "Swift Claim processed my health insurance claim in just 2 hours! The blockchain verification gave
                      me confidence that everything was secure."
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium">Priya Sharma, Health Insurance Policyholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

