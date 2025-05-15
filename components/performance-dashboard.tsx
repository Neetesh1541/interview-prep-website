"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { BarChart, LineChart, PieChart } from "lucide-react"

export function PerformanceDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "Software Engineer"

  // Mock data for the dashboard
  const mockData = {
    interviews: 5,
    questionsAnswered: 25,
    averageScore: 78,
    strengths: ["Communication", "Technical Knowledge"],
    areasToImprove: ["Conciseness", "Specific Examples"],
    recentScores: [65, 72, 75, 80, 85],
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Dashboard</CardTitle>
        <CardDescription>Track your interview performance and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Interviews Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.interviews}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Questions Answered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.questionsAnswered}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.averageScore}%</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Performance</CardTitle>
                <CardDescription>Your interview scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <LineChart className="h-full w-full text-muted-foreground opacity-10" />
                  <div className="absolute text-center">
                    <p className="text-sm text-muted-foreground">Performance chart would display here</p>
                    <p className="text-xs text-muted-foreground mt-1">Complete more interviews to see your progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skill Progress</CardTitle>
                <CardDescription>Your progress in key interview skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">Communication</div>
                    <div className="text-sm font-medium">85%</div>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">Technical Knowledge</div>
                    <div className="text-sm font-medium">80%</div>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">Problem Solving</div>
                    <div className="text-sm font-medium">75%</div>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">Cultural Fit</div>
                    <div className="text-sm font-medium">90%</div>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Question Types</CardTitle>
                <CardDescription>Your performance by question category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <PieChart className="h-full w-full text-muted-foreground opacity-10" />
                  <div className="absolute text-center">
                    <p className="text-sm text-muted-foreground">Question type breakdown would display here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Complete more interviews to see your performance by question type
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Strengths</CardTitle>
                  <CardDescription>Areas where you perform well</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockData.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                    <li className="text-sm text-muted-foreground italic">
                      Complete more interviews to identify additional strengths
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Areas to Improve</CardTitle>
                  <CardDescription>Focus on these areas to improve your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockData.areasToImprove.map((area, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        <span className="text-sm">{area}</span>
                      </li>
                    ))}
                    <li className="text-sm text-muted-foreground italic">
                      Complete more interviews to identify additional areas for improvement
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Feedback</CardTitle>
                <CardDescription>Feedback from your most recent interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <BarChart className="h-full w-full text-muted-foreground opacity-10" />
                  <div className="absolute text-center">
                    <p className="text-sm text-muted-foreground">Detailed feedback would display here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Complete more interviews to receive personalized feedback
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
