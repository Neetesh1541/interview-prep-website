"use client"

import type React from "react"

import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { Header } from "@/components/header"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Code, LineChart, Layers, Palette } from "lucide-react"

export default function Practice() {
  const router = useRouter()

  const handleStartPractice = (role: string) => {
    const params = new URLSearchParams()
    params.set("role", role)
    params.set("company", "Practice Session")
    router.push(`/interview?${params.toString()}`)
  }

  return (
    <AnimatedGradientBackground>
      <Header />
      <div className="container max-w-6xl py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Practice Interviews</h1>
          <p className="text-muted-foreground">
            Choose a role-specific practice session to improve your interview skills.
          </p>
        </div>

        <Tabs defaultValue="software-engineer" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="software-engineer">Software Engineer</TabsTrigger>
            <TabsTrigger value="product-manager">Product Manager</TabsTrigger>
            <TabsTrigger value="data-scientist">Data Scientist</TabsTrigger>
            <TabsTrigger value="ux-designer">UX Designer</TabsTrigger>
          </TabsList>

          <TabsContent value="software-engineer" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PracticeCard
                title="Algorithms & Data Structures"
                description="Practice common coding interview questions and algorithms."
                icon={<Code className="h-6 w-6" />}
                onClick={() => handleStartPractice("Software Engineer")}
              />
              <PracticeCard
                title="System Design"
                description="Practice designing scalable systems and architectures."
                icon={<Layers className="h-6 w-6" />}
                onClick={() => handleStartPractice("Software Engineer")}
              />
              <PracticeCard
                title="Behavioral Questions"
                description="Practice answering common behavioral interview questions."
                icon={<LineChart className="h-6 w-6" />}
                onClick={() => handleStartPractice("Software Engineer")}
              />
            </div>
          </TabsContent>

          <TabsContent value="product-manager" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PracticeCard
                title="Product Case Studies"
                description="Practice analyzing and improving products."
                icon={<Layers className="h-6 w-6" />}
                onClick={() => handleStartPractice("Product Manager")}
              />
              <PracticeCard
                title="Product Metrics"
                description="Practice defining and analyzing product metrics."
                icon={<LineChart className="h-6 w-6" />}
                onClick={() => handleStartPractice("Product Manager")}
              />
              <PracticeCard
                title="Stakeholder Management"
                description="Practice handling stakeholder scenarios and conflicts."
                icon={<Code className="h-6 w-6" />}
                onClick={() => handleStartPractice("Product Manager")}
              />
            </div>
          </TabsContent>

          <TabsContent value="data-scientist" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PracticeCard
                title="Statistical Analysis"
                description="Practice statistical concepts and hypothesis testing."
                icon={<LineChart className="h-6 w-6" />}
                onClick={() => handleStartPractice("Data Scientist")}
              />
              <PracticeCard
                title="Machine Learning"
                description="Practice machine learning algorithms and applications."
                icon={<Code className="h-6 w-6" />}
                onClick={() => handleStartPractice("Data Scientist")}
              />
              <PracticeCard
                title="Data Case Studies"
                description="Practice solving real-world data problems."
                icon={<Layers className="h-6 w-6" />}
                onClick={() => handleStartPractice("Data Scientist")}
              />
            </div>
          </TabsContent>

          <TabsContent value="ux-designer" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PracticeCard
                title="Design Challenges"
                description="Practice solving design challenges and exercises."
                icon={<Palette className="h-6 w-6" />}
                onClick={() => handleStartPractice("UX Designer")}
              />
              <PracticeCard
                title="Portfolio Review"
                description="Practice presenting and explaining your design work."
                icon={<Layers className="h-6 w-6" />}
                onClick={() => handleStartPractice("UX Designer")}
              />
              <PracticeCard
                title="User Research"
                description="Practice explaining user research methods and findings."
                icon={<LineChart className="h-6 w-6" />}
                onClick={() => handleStartPractice("UX Designer")}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedGradientBackground>
  )
}

interface PracticeCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

function PracticeCard({ title, description, icon, onClick }: PracticeCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="rounded-full bg-primary/10 p-2 w-fit mb-2">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" onClick={onClick}>
          Start Practice
        </Button>
      </CardFooter>
    </Card>
  )
}
