import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ChatbotProvider } from "@/components/chatbot/chatbot-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Swift Claim - AI & Blockchain Insurance Claims",
  description: "Revolutionizing insurance claims with AI & blockchain: faster, smarter, fraud-proof",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ChatbotProvider>
            {children}
            <Toaster />
          </ChatbotProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'