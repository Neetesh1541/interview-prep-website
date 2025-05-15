"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Sparkles, Mic, BarChart3, Brain, Zap, Award, UserRound } from "lucide-react"

export default function Home() {
  const [role, setRole] = useState("Software Engineer")
  const [company, setCompany] = useState("Google")
  const [name, setName] = useState("")
  const router = useRouter()
  const { user } = useAuth()

  const handleStartInterview = () => {
    const params = new URLSearchParams()
    params.set("role", role)
    params.set("company", company)
    if (name) params.set("name", name)
    router.push(`/interview?${params.toString()}`)
  }

  return (
    <AnimatedGradientBackground>
      <Header />
      <main className="container max-w-6xl py-12">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-2">
              <UserRound className="h-8 w-8 text-white" />
            </div>
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Neetesh
          </h1>
          <p className="text-2xl font-medium mb-2">Your Personal AI Interviewer</p>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Practice with an AI-powered interview simulator that provides real-time feedback and personalized coaching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg border-2 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-bl-full"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-blue-600" />
                Start Your Interview
              </CardTitle>
              <CardDescription>Configure your interview settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Job Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role" className="border-blue-200 dark:border-blue-800">
                    <SelectValue placeholder="Select a job role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>
                    <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                    <SelectItem value="UX Designer">UX Designer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select value={company} onValueChange={setCompany}>
                  <SelectTrigger id="company" className="border-blue-200 dark:border-blue-800">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="Microsoft">Microsoft</SelectItem>
                    <SelectItem value="Amazon">Amazon</SelectItem>
                    <SelectItem value="Apple">Apple</SelectItem>
                    <SelectItem value="Meta">Meta</SelectItem>
                    <SelectItem value="Netflix">Netflix</SelectItem>
                    <SelectItem value="Startup">Startup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Your Name (Optional)</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name || user?.name || ""}
                  onChange={(e) => setName(e.target.value)}
                  className="border-blue-200 dark:border-blue-800"
                />
              </div>
            </CardContent>
            <CardFooter>
              {user ? (
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleStartInterview}
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Start Interview
                </Button>
              ) : (
                <div className="w-full space-y-2">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={handleStartInterview}
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    Start Interview as Guest
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    <Link href="/signin" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Sign in
                    </Link>{" "}
                    to save your interview history
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>

          <Card className="shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Key Features
              </CardTitle>
              <CardDescription>What makes Neetesh special</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">AI-Powered Interviews</h3>
                    <p className="text-sm text-muted-foreground">
                      Neetesh adapts to your responses and provides realistic interview scenarios with personalized
                      feedback.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-2">
                    <Mic className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Voice Interaction</h3>
                    <p className="text-sm text-muted-foreground">
                      Speak your answers naturally and hear questions spoken aloud for a realistic interview experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Performance Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive detailed feedback and scoring on your interview performance with actionable improvement
                      tips.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-2">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Selection Results</h3>
                    <p className="text-sm text-muted-foreground">
                      Get a realistic selection or rejection letter based on your performance to prepare for real
                      outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-blue-200 dark:border-blue-800">
                <Zap className="mr-2 h-4 w-4" />
                Learn More
              </Button>
              <Button variant="outline" className="border-blue-200 dark:border-blue-800">
                <Award className="mr-2 h-4 w-4" />
                View Pricing
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </AnimatedGradientBackground>
  )
}
