import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ChatbotProvider } from "@/components/chatbot/chatbot-provider"
<<<<<<< HEAD
import { LoadingProvider } from "@/providers/loading-provider"
=======
import { AuthProvider } from "@/providers/auth-provider"
>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2

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
<<<<<<< HEAD
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
=======
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2
            <ChatbotProvider>
              {children}
              <Toaster />
            </ChatbotProvider>
<<<<<<< HEAD
          </LoadingProvider>
        </ThemeProvider>
=======
          </ThemeProvider>
        </AuthProvider>
>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2
      </body>
    </html>
  )
}



import './globals.css'