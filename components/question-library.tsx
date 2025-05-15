"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Filter } from "lucide-react"
import { useSearchParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export function QuestionLibrary() {
  const [activeTab, setActiveTab] = useState("technical")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>(["Easy", "Medium", "Hard"])
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "Software Engineer"
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

  // Technical questions for different roles
  const technicalQuestions = {
    "Software Engineer": [
      {
        id: "se-tech-1",
        question: "What is the difference between a stack and a queue?",
        difficulty: "Easy",
      },
      {
        id: "se-tech-2",
        question: "Explain the concept of time complexity and give examples of O(1), O(n), and O(n²) operations.",
        difficulty: "Medium",
      },
      {
        id: "se-tech-3",
        question: "How would you implement a LRU (Least Recently Used) cache?",
        difficulty: "Hard",
      },
      {
        id: "se-tech-4",
        question: "What are the differences between REST and GraphQL APIs?",
        difficulty: "Medium",
      },
      {
        id: "se-tech-5",
        question: "Explain the concept of dependency injection and its benefits.",
        difficulty: "Medium",
      },
      {
        id: "se-tech-6",
        question: "How would you design a distributed system for high availability?",
        difficulty: "Hard",
      },
    ],
    "Product Manager": [
      {
        id: "pm-tech-1",
        question: "How do you prioritize features in a product roadmap?",
        difficulty: "Medium",
      },
      {
        id: "pm-tech-2",
        question: "Explain how you would set up and analyze A/B tests for a new feature.",
        difficulty: "Medium",
      },
      {
        id: "pm-tech-3",
        question: "How would you measure the success of a product launch?",
        difficulty: "Easy",
      },
      {
        id: "pm-tech-4",
        question: "Describe your process for gathering and incorporating user feedback.",
        difficulty: "Easy",
      },
      {
        id: "pm-tech-5",
        question: "How do you balance stakeholder requests with user needs?",
        difficulty: "Medium",
      },
      {
        id: "pm-tech-6",
        question:
          "Explain how you would handle a situation where data suggests users don't like a feature you believe in.",
        difficulty: "Hard",
      },
    ],
    "Data Scientist": [
      {
        id: "ds-tech-1",
        question: "Explain the difference between supervised and unsupervised learning with examples.",
        difficulty: "Easy",
      },
      {
        id: "ds-tech-2",
        question: "How would you handle missing data in a dataset?",
        difficulty: "Medium",
      },
      {
        id: "ds-tech-3",
        question: "Explain the concept of overfitting and how to prevent it.",
        difficulty: "Medium",
      },
      {
        id: "ds-tech-4",
        question: "What evaluation metrics would you use for an imbalanced classification problem?",
        difficulty: "Hard",
      },
      {
        id: "ds-tech-5",
        question: "Describe the process of feature engineering and why it's important.",
        difficulty: "Medium",
      },
      {
        id: "ds-tech-6",
        question: "How would you design an A/B test to measure the impact of a recommendation algorithm?",
        difficulty: "Hard",
      },
    ],
    "UX Designer": [
      {
        id: "ux-tech-1",
        question: "Explain your design process from research to implementation.",
        difficulty: "Easy",
      },
      {
        id: "ux-tech-2",
        question: "How do you incorporate user feedback into your design iterations?",
        difficulty: "Medium",
      },
      {
        id: "ux-tech-3",
        question: "Describe how you would design for accessibility.",
        difficulty: "Medium",
      },
      {
        id: "ux-tech-4",
        question: "How do you balance business goals with user needs in your designs?",
        difficulty: "Hard",
      },
      {
        id: "ux-tech-5",
        question: "Explain how you would conduct a usability test and analyze the results.",
        difficulty: "Medium",
      },
      {
        id: "ux-tech-6",
        question: "How would you design a complex feature for both novice and expert users?",
        difficulty: "Hard",
      },
    ],
  }

  // Behavioral questions (common across roles)
  const behavioralQuestions = [
    {
      id: "beh-1",
      question: "Tell me about a time when you had to work under a tight deadline.",
      difficulty: "Easy",
    },
    {
      id: "beh-2",
      question: "Describe a situation where you had to resolve a conflict within your team.",
      difficulty: "Medium",
    },
    {
      id: "beh-3",
      question: "Tell me about a time when you failed and what you learned from it.",
      difficulty: "Medium",
    },
    {
      id: "beh-4",
      question: "Describe a situation where you had to make a difficult decision with limited information.",
      difficulty: "Hard",
    },
    {
      id: "beh-5",
      question: "Tell me about a time when you had to adapt to a significant change at work.",
      difficulty: "Medium",
    },
    {
      id: "beh-6",
      question: "Describe a situation where you went above and beyond what was expected of you.",
      difficulty: "Easy",
    },
    {
      id: "beh-7",
      question: "Tell me about a time when you had to give difficult feedback to someone.",
      difficulty: "Hard",
    },
    {
      id: "beh-8",
      question: "Describe a situation where you had to persuade others to adopt your idea or approach.",
      difficulty: "Medium",
    },
  ]

  // Company-specific questions
  const companyQuestions = [
    {
      id: "comp-1",
      question: "Why do you want to work at our company specifically?",
      difficulty: "Easy",
    },
    {
      id: "comp-2",
      question: "What aspects of our company culture appeal to you the most?",
      difficulty: "Easy",
    },
    {
      id: "comp-3",
      question: "How do you see yourself contributing to our company's mission?",
      difficulty: "Medium",
    },
    {
      id: "comp-4",
      question: "What do you think are the biggest challenges facing our industry right now?",
      difficulty: "Hard",
    },
    {
      id: "comp-5",
      question: "How do you stay updated on news and trends in our industry?",
      difficulty: "Medium",
    },
    {
      id: "comp-6",
      question: "What competitor do you think is doing the most interesting work, and why?",
      difficulty: "Hard",
    },
  ]

  const filteredTechnicalQuestions =
    technicalQuestions[role as keyof typeof technicalQuestions]?.filter((q) =>
      difficultyFilter.includes(q.difficulty),
    ) || []

  const filteredBehavioralQuestions = behavioralQuestions.filter((q) => difficultyFilter.includes(q.difficulty))
  const filteredCompanyQuestions = companyQuestions.filter((q) => difficultyFilter.includes(q.difficulty))

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Question Library</CardTitle>
          <CardDescription>Common interview questions for {role} positions</CardDescription>
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>
          <TabsContent value="technical" className="mt-6 space-y-4">
            {filteredTechnicalQuestions.length > 0 ? (
              filteredTechnicalQuestions.map((q) => (
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
          <TabsContent value="behavioral" className="mt-6 space-y-4">
            {filteredBehavioralQuestions.length > 0 ? (
              filteredBehavioralQuestions.map((q) => (
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
          <TabsContent value="company" className="mt-6 space-y-4">
            {filteredCompanyQuestions.length > 0 ? (
              filteredCompanyQuestions.map((q) => (
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
