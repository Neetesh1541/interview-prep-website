"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export function CEOQuestionLibrary() {
  const [activeTab, setActiveTab] = useState("strategic")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>(["Easy", "Medium", "Hard"])
  const { toast } = useToast()

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast({
      title: "Copied to clipboard",
      description: "You can now paste this question in your notes or interview prep document.",
    })
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleDifficulty = (difficulty: string) => {
    setDifficultyFilter((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  // Strategic leadership questions
  const strategicQuestions = [
    {
      id: "ceo-strat-1",
      question: "What is your vision for the company in the next 5 years?",
      difficulty: "Medium",
    },
    {
      id: "ceo-strat-2",
      question: "How do you balance short-term results with long-term growth?",
      difficulty: "Hard",
    },
    {
      id: "ceo-strat-3",
      question: "Describe how you would approach a major strategic pivot for the company.",
      difficulty: "Hard",
    },
    {
      id: "ceo-strat-4",
      question: "How do you identify and evaluate new market opportunities?",
      difficulty: "Medium",
    },
    {
      id: "ceo-strat-5",
      question: "What metrics do you consider most important for measuring company success?",
      difficulty: "Medium",
    },
    {
      id: "ceo-strat-6",
      question: "How would you approach international expansion for our company?",
      difficulty: "Hard",
    },
  ]

  // Financial leadership questions
  const financialQuestions = [
    {
      id: "ceo-fin-1",
      question: "How do you approach capital allocation decisions?",
      difficulty: "Hard",
    },
    {
      id: "ceo-fin-2",
      question: "Describe your experience with fundraising and investor relations.",
      difficulty: "Medium",
    },
    {
      id: "ceo-fin-3",
      question: "How would you handle a situation where the company needs to reduce costs significantly?",
      difficulty: "Hard",
    },
    {
      id: "ceo-fin-4",
      question: "What financial metrics do you monitor most closely as a CEO?",
      difficulty: "Medium",
    },
    {
      id: "ceo-fin-5",
      question: "How do you evaluate the ROI of major investments or acquisitions?",
      difficulty: "Hard",
    },
    {
      id: "ceo-fin-6",
      question: "Describe your approach to budgeting and financial planning.",
      difficulty: "Medium",
    },
  ]

  // Leadership and team questions
  const leadershipQuestions = [
    {
      id: "ceo-lead-1",
      question: "How do you build and develop a high-performing executive team?",
      difficulty: "Medium",
    },
    {
      id: "ceo-lead-2",
      question: "Describe your leadership style and how it has evolved over your career.",
      difficulty: "Easy",
    },
    {
      id: "ceo-lead-3",
      question: "How do you foster innovation and creativity within an organization?",
      difficulty: "Medium",
    },
    {
      id: "ceo-lead-4",
      question: "How do you handle disagreements with your board of directors?",
      difficulty: "Hard",
    },
    {
      id: "ceo-lead-5",
      question: "Describe how you've handled a significant crisis or failure in your leadership career.",
      difficulty: "Hard",
    },
    {
      id: "ceo-lead-6",
      question: "How do you ensure diversity, equity, and inclusion are prioritized in your organization?",
      difficulty: "Medium",
    },
    {
      id: "ceo-lead-7",
      question: "How do you communicate difficult decisions to employees, investors, and the public?",
      difficulty: "Hard",
    },
  ]

  // Board and stakeholder questions
  const stakeholderQuestions = [
    {
      id: "ceo-stake-1",
      question: "How do you manage relationships with diverse stakeholders with competing interests?",
      difficulty: "Hard",
    },
    {
      id: "ceo-stake-2",
      question: "Describe your approach to board management and communication.",
      difficulty: "Medium",
    },
    {
      id: "ceo-stake-3",
      question: "How do you handle shareholder activism or pressure for short-term results?",
      difficulty: "Hard",
    },
    {
      id: "ceo-stake-4",
      question: "What is your philosophy on corporate social responsibility and sustainability?",
      difficulty: "Medium",
    },
    {
      id: "ceo-stake-5",
      question: "How do you approach succession planning for key leadership positions?",
      difficulty: "Medium",
    },
    {
      id: "ceo-stake-6",
      question: "How would you handle a situation where the board wants to go in a direction you disagree with?",
      difficulty: "Hard",
    },
  ]

  const filteredStrategicQuestions = strategicQuestions.filter((q) => difficultyFilter.includes(q.difficulty))
  const filteredFinancialQuestions = financialQuestions.filter((q) => difficultyFilter.includes(q.difficulty))
  const filteredLeadershipQuestions = leadershipQuestions.filter((q) => difficultyFilter.includes(q.difficulty))
  const filteredStakeholderQuestions = stakeholderQuestions.filter((q) => difficultyFilter.includes(q.difficulty))

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>CEO Question Library</CardTitle>
          <CardDescription>Common interview questions for executive leadership positions</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Difficulty</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={difficultyFilter.includes("Easy")}
              onCheckedChange={() => toggleDifficulty("Easy")}
            >
              Easy
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={difficultyFilter.includes("Medium")}
              onCheckedChange={() => toggleDifficulty("Medium")}
            >
              Medium
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={difficultyFilter.includes("Hard")}
              onCheckedChange={() => toggleDifficulty("Hard")}
            >
              Hard
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="strategic">Strategic</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
            <TabsTrigger value="stakeholder">Stakeholders</TabsTrigger>
          </TabsList>
          <TabsContent value="strategic" className="mt-6 space-y-4">
            {filteredStrategicQuestions.length > 0 ? (
              filteredStrategicQuestions.map((q) => (
                <Card key={q.id} className="overflow-hidden border border-muted">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              q.difficulty === "Easy"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"
                                : q.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"
                            }
                          >
                            {q.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm">{q.question}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(q.question, q.id)}
                        className="flex-shrink-0"
                      >
                        {copiedId === q.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No questions match your current filters. Try adjusting the difficulty level.
              </p>
            )}
          </TabsContent>
          <TabsContent value="financial" className="mt-6 space-y-4">
            {filteredFinancialQuestions.length > 0 ? (
              filteredFinancialQuestions.map((q) => (
                <Card key={q.id} className="overflow-hidden border border-muted">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              q.difficulty === "Easy"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"
                                : q.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"
                            }
                          >
                            {q.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm">{q.question}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(q.question, q.id)}
                        className="flex-shrink-0"
                      >
                        {copiedId === q.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No questions match your current filters. Try adjusting the difficulty level.
              </p>
            )}
          </TabsContent>
          <TabsContent value="leadership" className="mt-6 space-y-4">
            {filteredLeadershipQuestions.length > 0 ? (
              filteredLeadershipQuestions.map((q) => (
                <Card key={q.id} className="overflow-hidden border border-muted">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              q.difficulty === "Easy"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"
                                : q.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"
                            }
                          >
                            {q.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm">{q.question}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(q.question, q.id)}
                        className="flex-shrink-0"
                      >
                        {copiedId === q.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No questions match your current filters. Try adjusting the difficulty level.
              </p>
            )}
          </TabsContent>
          <TabsContent value="stakeholder" className="mt-6 space-y-4">
            {filteredStakeholderQuestions.length > 0 ? (
              filteredStakeholderQuestions.map((q) => (
                <Card key={q.id} className="overflow-hidden border border-muted">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              q.difficulty === "Easy"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"
                                : q.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"
                            }
                          >
                            {q.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm">{q.question}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(q.question, q.id)}
                        className="flex-shrink-0"
                      >
                        {copiedId === q.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No questions match your current filters. Try adjusting the difficulty level.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
