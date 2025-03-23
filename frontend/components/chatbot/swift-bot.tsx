"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"
import Image from "next/image"

interface Message {
  role: "user" | "assistant"
  content: string
  image?: string
}

export default function SwiftBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Claim Saathi, your personal insurance assistant. How can I help you today?",
      image: "https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content: "I can help you file a new claim! Would you like to start the process?",
          image: "https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
        },
        {
          content: "Let me check your policy details for you.",
          image: "https://i.ibb.co/8nHxb4zN/claimsaathi-snapping-winking.png"
        },
        {
          content: "I'm here to assist with any insurance-related questions!",
          image: "https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
        }
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: randomResponse.content,
        image: randomResponse.image
      }])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-[380px] h-[600px] flex flex-col shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Image
                src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                alt="Claim Saathi"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-medium">Claim Saathi</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {message.role === "assistant" && message.image && (
                    <Image
                      src={message.image}
                      alt="Claim Saathi"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
} 