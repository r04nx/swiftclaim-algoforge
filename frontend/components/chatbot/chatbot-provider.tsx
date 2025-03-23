"use client"

<<<<<<< HEAD
import { createContext, useContext, ReactNode } from "react"
import ChatbotWidget from "./chatbot-widget"

const ChatbotContext = createContext({})

export function ChatbotProvider({ children }: { children: ReactNode }) {
  return (
    <ChatbotContext.Provider value={{}}>
      {children}
      <ChatbotWidget />
=======
import { createContext, useState, useContext, type ReactNode } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
  image?: string
}

type ChatbotContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isMinimized: boolean
  setIsMinimized: (minimized: boolean) => void
  messages: Message[]
  addMessage: (message: Message) => void
  clearMessages: () => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm Claim Saathi, your AI assistant. How can I help you with your insurance claims today?",
      image: "https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png",
    },
  ])

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const clearMessages = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi there! I'm Claim Saathi, your AI assistant. How can I help you with your insurance claims today?",
        image: "https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png",
      },
    ])
  }

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isMinimized,
        setIsMinimized,
        messages,
        addMessage,
        clearMessages,
      }}
    >
      {children}
>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2
    </ChatbotContext.Provider>
  )
}

<<<<<<< HEAD
=======
export function useChatbot() {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider")
  }
  return context
}

>>>>>>> fca8a6cb778a8dc4cdf54d5ff1bf0a53fe2d9ce2
