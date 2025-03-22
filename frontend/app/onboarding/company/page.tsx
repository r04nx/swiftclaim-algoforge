import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, Building, BarChart3, Users, Database } from "lucide-react"
import CompanyOnboardingSteps from "@/components/company-onboarding-steps"

export default function CompanyOnboarding() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[#07a6ec] hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#07a6ec] to-[#fa6724] p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Insurance Company Onboarding</h1>
            <p className="text-lg opacity-90">
              Welcome to Swift Claim! Let's set up your company account and integrate our blockchain-powered claims
              processing system.
            </p>
          </div>

          <CompanyOnboardingSteps />

          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">What to Expect</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Building className="h-10 w-10 text-[#07a6ec]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Company Profile</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Set up your company profile with verification and blockchain integration for secure operations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Database className="h-10 w-10 text-[#fa6724]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Policy Configuration</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Configure your insurance policies and smart contract parameters for automated claim processing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Users className="h-10 w-10 text-[#07a6ec]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Team Setup</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Add team members with role-based access control for claims processing and management.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <BarChart3 className="h-10 w-10 text-[#fa6724]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Dashboard Customization</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Customize your analytics dashboard to monitor claim metrics and fraud detection insights.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Blockchain Integration Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#07a6ec]" />
                  <span>Reduce claim processing costs by up to 45%</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#07a6ec]" />
                  <span>Decrease fraud cases by up to 78% with AI detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#07a6ec]" />
                  <span>Automate claim verification with smart contracts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#07a6ec]" />
                  <span>Provide transparent claim tracking for policyholders</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/onboarding/company/step1">
                <Button className="bg-[#07a6ec] hover:bg-[#0695d3] text-white">
                  Begin Onboarding <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

