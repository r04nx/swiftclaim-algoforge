"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"
import confetti from "canvas-confetti"

export default function ClaimSuccessPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    // Trigger confetti animation
    if (typeof window !== 'undefined') {
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    // Simulate blockchain verification progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    // Update steps based on progress
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          return 4;
        }
        return prev + 1;
      });
    }, 1500);
    
    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-8">
        <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Claim Submitted Successfully!</h1>
        <p className="text-muted-foreground">
          Your claim has been submitted and is being processed through our blockchain network
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Blockchain Verification Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {currentStep >= 1 ? <CheckCircle className="h-4 w-4" /> : "1"}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Claim Received</h3>
                  <p className="text-sm text-muted-foreground">Your claim has been received and logged in our system</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {currentStep >= 2 ? <CheckCirc\

