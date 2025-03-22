"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, X, Mic, Paperclip, Maximize2, Minimize2 } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  mood?: string
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm Claim Saathi, your AI assistant. How can I help you with your insurance claims today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  const botResponses = [
    {
      content: "I'd be happy to help you file a new claim! 😊 Would you like to start the process now?",
      mood: "happy",
    },
    {
      content: "I've found your latest claim #HD12345. It's currently under review, and I estimate it'll be completed within 24 hours. I'll notify you as soon as there's an update! 🕒",
      mood: "neutral",
    },
    {
      content: "Uh-oh! 😮 I noticed you haven't uploaded all the required documents for your claim. Would you like me to guide you through the upload process?",
      mood: "concerned",
    },
    {
      content: "Great news! 🎉 Your claim has been approved and the payment will be processed within 24 hours!",
      mood: "excited",
    },
    {
      content: "I'm checking your policy details... 🔍 Did you know you're eligible for a wellness reward? Let me tell you more about it!",
      mood: "neutral",
    },
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const response = botResponses[Math.floor(Math.random() * botResponses.length)]
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "bot",
        timestamp: new Date(),
        mood: response.mood,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <Button
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-gradient-to-r from-[#07a6ec] to-[#fa6724] shadow-lg z-50 p-0"
        >
          <Image
            src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
            alt="Claim Saathi"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Button>
      )}

      {/* Chatbot Widget */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 bg-background border rounded-lg shadow-xl z-50 flex flex-col transition-all duration-300 ${
            isExpanded ? "w-[500px] h-[600px]" : "w-[350px] h-[500px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[#07a6ec] to-[#fa6724] text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Image
                src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                alt="Claim Saathi"
                width={32}
                height={32}
                className="rounded-full bg-white"
              />
              <div>
                <h3 className="font-semibold">Claim Saathi</h3>
                <p className="text-xs opacity-90">AI Insurance Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleExpand} className="text-white hover:bg-white/20">
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleChatbot} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} gap-2 items-end`}
                >
                  {msg.sender === "bot" && (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#07a6ec] to-[#fa6724] flex items-center justify-center flex-shrink-0">
                      <Image
                        src={
                          msg.mood === "happy"
                            ? "https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                            : msg.mood === "excited"
                            ? "https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
                            : msg.mood === "concerned"
                            ? "https://i.ibb.co/Z7MhTHj/claimsaathi-neutral-mildlyangry.png"
                            : "https://i.ibb.co/99WsM9fP/claimsaathi-dancing-neutral.png"
                        }
                        alt="Claim Saathi"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div
                    className={`${
                      msg.sender === "user"
                        ? "bg-[#fa6724] text-white rounded-lg rounded-br-none"
                        : "bg-muted rounded-lg rounded-bl-none"
                    } p-3 max-w-[80%]`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start gap-2 items-end">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#07a6ec] to-[#fa6724] flex items-center justify-center flex-shrink-0">
                    <Image
                      src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                      alt="Claim Saathi"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                  <div className="bg-muted p-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="p-2 border-t border-b">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                File a new claim
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Check claim status
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Upload documents
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Contact support
              </Button>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 flex gap-2 items-center">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-[#fa6724] hover:bg-[#e55613] text-white"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

