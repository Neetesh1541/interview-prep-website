"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mic,
  MicOff,
  ArrowLeft,
  Send,
  User,
  Loader2,
  Volume2,
  VolumeX,
  Download,
  Info,
  Award,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams, useRouter } from "next/navigation"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InterviewerAvatar } from "@/components/interviewer-avatar"
import { InterviewTips } from "@/components/interview-tips"
import { QuestionLibrary } from "@/components/question-library"
import { PerformanceDashboard } from "@/components/performance-dashboard"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InterviewResults } from "@/components/interview-results"

export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState("interview")
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [interviewEnded, setInterviewEnded] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [interviewScore, setInterviewScore] = useState(0)
  const [isSelected, setIsSelected] = useState(false)
  const [feedbackPoints, setFeedbackPoints] = useState<string[]>([])
  const [voiceActive, setVoiceActive] = useState(false)
  const [voiceText, setVoiceText] = useState("")

  const [messages, setMessages] = useState<any[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [ttsError, setTtsError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "Software Engineer"
  const company = searchParams.get("company") || "Google"
  const candidateName = searchParams.get("name") || ""
  const router = useRouter()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()
  const { theme } = useTheme()
  const { user } = useAuth()

  const [voiceId, setVoiceId] = useState(localStorage.getItem("voiceId") || "pNInz6obpgDQGcF9MkVF")

  useEffect(() => {
    if ("speechSynthesis" in window) {
      console.log("Text-to-speech is supported!")
    } else {
      console.log("Text-to-speech is not supported on this browser.")
      setTtsError("Text-to-speech is not supported on this browser.")
    }

    if (!localStorage.getItem("voiceId")) {
      localStorage.setItem("voiceId", "pNInz6obpgDQGcF9MkVF")
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = theme === "dark"
    }
  }, [theme])

  const startRecording = () => {
    setIsRecording(true)
    setVoiceActive(true)
    setVoiceText("Listening...")

    // Check if the browser supports the Web Speech API
    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Please try using Chrome or Edge.",
        variant: "destructive",
      })
      setIsRecording(false)
      setVoiceActive(false)
      setVoiceText("")
      return
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = "en-US"

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = ""
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        } else {
          interimTranscript += event.results[i][0].transcript
        }
      }

      if (finalTranscript) {
        setVoiceText(finalTranscript)
        sendMessage(finalTranscript)
        stopRecording()
      } else if (interimTranscript) {
        setVoiceText(interimTranscript)
      }
    }

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
      toast({
        title: "Speech Recognition Error",
        description: `Error: ${event.error}. Please try again or type your response.`,
        variant: "destructive",
      })
      setIsRecording(false)
      setVoiceActive(false)
      setVoiceText("")
    }

    try {
      recognitionRef.current.start()
    } catch (error) {
      console.error("Error starting speech recognition:", error)
      toast({
        title: "Speech Recognition Error",
        description: "Failed to start speech recognition. Please try again or type your response.",
        variant: "destructive",
      })
      setIsRecording(false)
      setVoiceActive(false)
      setVoiceText("")
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        console.error("Error stopping speech recognition:", error)
      }
    }
    setIsRecording(false)
    setVoiceActive(false)
    setVoiceText("")
  }

  const sendMessage = async (message: string) => {
    if (!message) return

    setMessages((prevMessages) => [...prevMessages, { role: "user", content: message }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, role, company, questionCount, voiceId, userId: user?.id }),
      })

      // Check if the response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
      }

      // Try to parse the JSON response
      let data
      try {
        data = await response.json()
      } catch (error) {
        console.error("Error parsing JSON:", error)
        throw new Error("Invalid JSON response from server")
      }

      // Update state with the response
      setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: data.response }])
      setQuestionCount(data.questionCount)

      // Check if this is the last question
      if (data.questionCount > 5) {
        setInterviewEnded(true)
        // Generate random score between 65 and 95
        const score = Math.floor(Math.random() * 31) + 65
        setInterviewScore(score)
        setIsSelected(score >= 75)

        // Generate feedback points
        const strengths = [
          "Strong communication skills",
          "Clear and concise answers",
          "Good technical knowledge",
          "Demonstrated problem-solving ability",
          "Showed enthusiasm and passion",
        ]

        const weaknesses = [
          "Could provide more specific examples",
          "Some technical concepts need deeper understanding",
          "Answers could be more structured",
          "Consider using the STAR method more consistently",
          "Work on conciseness in responses",
        ]

        // Mix strengths and weaknesses based on score
        const numStrengths = Math.floor((score / 100) * 5)
        const numWeaknesses = 5 - numStrengths

        const selectedStrengths = strengths.sort(() => 0.5 - Math.random()).slice(0, numStrengths)
        const selectedWeaknesses = weaknesses.sort(() => 0.5 - Math.random()).slice(0, numWeaknesses)

        setFeedbackPoints([...selectedStrengths, ...selectedWeaknesses])

        // Show results after a short delay
        setTimeout(() => {
          setShowResults(true)
        }, 1500)
      }

      // Handle text-to-speech if available
      if (data.audioUrl) {
        try {
          if (audioRef.current) {
            audioRef.current.pause()
          }
          audioRef.current = new Audio(data.audioUrl)
          await audioRef.current.play()
        } catch (error) {
          console.error("Error playing audio:", error)
          // Fallback to browser TTS
          speakWithBrowserTTS(data.response)
        }
      } else {
        // Use browser TTS as fallback
        speakWithBrowserTTS(data.response)
      }
    } catch (error: any) {
      console.error("Error sending message:", error)
      toast({
        title: "Something went wrong!",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })

      // Add a fallback response if the API fails
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting to the server. Please try again in a moment.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Fallback browser TTS function
  const speakWithBrowserTTS = (text: string) => {
    if (!("speechSynthesis" in window)) return

    const utterance = new SpeechSynthesisUtterance(text)

    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      (voice) => voice.lang.includes("en") && (voice.name.includes("Female") || voice.name.includes("Google")),
    )

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    window.speechSynthesis.speak(utterance)
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      sendMessage(event.target.value)
      event.target.value = ""
    }
  }

  const playAudio = async (text: string) => {
    setIsSpeaking(true)
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, voiceId }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
      }

      let data
      try {
        data = await response.json()
      } catch (error) {
        console.error("Error parsing JSON:", error)
        throw new Error("Invalid JSON response from server")
      }

      if (data.audioUrl) {
        try {
          if (audioRef.current) {
            audioRef.current.pause()
          }
          audioRef.current = new Audio(data.audioUrl)
          await audioRef.current.play()
          audioRef.current.onended = () => setIsSpeaking(false)
        } catch (error) {
          console.error("Playback failed:", error)
          // Fallback to browser TTS
          speakWithBrowserTTS(text)
          setIsSpeaking(false)
        }
      } else {
        // Use browser TTS as fallback
        speakWithBrowserTTS(text)
        setIsSpeaking(false)
      }
    } catch (error: any) {
      console.error("Error sending message:", error)
      toast({
        title: "Something went wrong!",
        description: "There was an error playing the audio. Using browser TTS instead.",
        variant: "destructive",
      })
      // Fallback to browser TTS
      speakWithBrowserTTS(text)
      setIsSpeaking(false)
    }
  }

  const saveInterviewTranscript = () => {
    const transcript = messages.map((message) => `${message.role}: ${message.content}`).join("\n\n")

    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "interview-transcript.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleViewResults = () => {
    setShowResults(true)
  }

  const handleCloseResults = () => {
    setShowResults(false)
  }

  const handleStartNewInterview = () => {
    router.push("/")
  }

  // Start the interview with an initial question when the interview is started
  useEffect(() => {
    if (interviewStarted && messages.length === 0) {
      // Add a welcome message
      const initialMessage = `Welcome to your interview for the ${role} position at ${company}${candidateName ? `, ${candidateName}` : ""}. I'm Neetesh, your AI interviewer. I'll be asking you a series of questions to assess your fit for this role. Let's begin with the first question.`

      setMessages([{ role: "assistant", content: initialMessage }])

      // Send an empty message to get the first question
      setTimeout(() => {
        sendMessage("")
      }, 1000)
    }
  }, [interviewStarted, messages.length, role, company, candidateName])

  return (
    <AnimatedGradientBackground>
      <Header />
      <div className="container max-w-6xl py-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            <div className="flex gap-2">
              {interviewStarted && !interviewEnded && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (messages.length > 0) {
                      playAudio(messages[messages.length - 1].content)
                    }
                  }}
                  className="flex items-center gap-2"
                  disabled={messages.length === 0 || isLoading}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="h-4 w-4" />
                      Stop Speech
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" />
                      Speak Question
                    </>
                  )}
                </Button>
              )}

              {interviewStarted && (
                <Button
                  variant="outline"
                  onClick={saveInterviewTranscript}
                  className="flex items-center gap-2"
                  disabled={messages.length === 0}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Save Transcript</span>
                </Button>
              )}

              {interviewEnded && (
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleViewResults}
                >
                  <Award className="mr-2 h-4 w-4" />
                  View Results
                </Button>
              )}

              <TabsList className="grid grid-cols-4 h-9">
                <TabsTrigger value="interview" className="text-xs px-2">
                  Interview
                </TabsTrigger>
                <TabsTrigger value="tools" className="text-xs px-2">
                  Tools
                </TabsTrigger>
                <TabsTrigger value="tips" className="text-xs px-2">
                  Tips
                </TabsTrigger>
                <TabsTrigger value="stats" className="text-xs px-2">
                  Stats
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              >
                {company}
              </Badge>
              <Badge variant="outline">{role}</Badge>
              {candidateName && (
                <Badge variant="outline" className="bg-blue-600/10">
                  {candidateName}
                </Badge>
              )}
            </div>
            {questionCount > 0 && !interviewEnded && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Question {questionCount}/5</span>
                <Progress
                  value={questionCount * 20}
                  className="w-24 h-2"
                  indicatorClassName="bg-gradient-to-r from-blue-600 to-purple-600"
                />
              </div>
            )}
          </div>

          {/* Display TTS info message */}
          {ttsError && (
            <Alert className="mb-4 border-blue-200 dark:border-blue-800">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle>Voice Information</AlertTitle>
              <AlertDescription>{ttsError}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="interview" className="mt-0 p-0">
            <Card className="w-full space-y-4 border-2 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600/5 to-purple-600/5">
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-blue-600" />
                  Interview Session
                </CardTitle>
                <CardDescription>
                  {interviewStarted
                    ? interviewEnded
                      ? "Interview completed. You can view your results."
                      : "The interview is in progress. Answer questions clearly and concisely."
                    : "Click start to begin your interview with Neetesh."}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-6 pr-6 max-h-[400px] overflow-y-auto">
                <div className="flex flex-col space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {message.role === "user" ? (
                        <>
                          <div className="rounded-full bg-blue-600/10 p-1.5 mt-1">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <Badge variant="secondary" className="mb-1">
                              You
                            </Badge>
                            <p className="text-sm bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">{message.content}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <InterviewerAvatar />
                          <div className="flex-1">
                            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 mb-1">Neetesh</Badge>
                            <p className="text-sm bg-gradient-to-r from-blue-600/5 to-purple-600/5 p-3 rounded-lg">
                              {message.content}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}

                  {voiceActive && (
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-600/10 p-1.5 mt-1">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-1">
                          You
                        </Badge>
                        <div className="text-sm bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg flex items-center gap-2">
                          <div className="animate-pulse flex items-center gap-1">
                            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <span>{voiceText || "Listening..."}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center bg-gradient-to-r from-blue-600/5 to-purple-600/5">
                {!interviewStarted ? (
                  <Button
                    onClick={() => setInterviewStarted(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Start Interview
                  </Button>
                ) : interviewEnded ? (
                  <Button
                    onClick={handleViewResults}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    View Results
                  </Button>
                ) : (
                  <>
                    <div className="flex items-center space-x-4 w-full">
                      <Button
                        variant={isRecording ? "destructive" : "outline"}
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={isLoading}
                        className={isRecording ? "" : "border-blue-200 dark:border-blue-800"}
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="mr-2 h-4 w-4" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="mr-2 h-4 w-4" />
                            Start Voice Answer
                          </>
                        )}
                      </Button>
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Type your answer..."
                          onKeyDown={handleKeyDown}
                          disabled={isRecording || isLoading}
                          className="border rounded-md px-3 py-2 w-full text-sm border-blue-200 dark:border-blue-800"
                        />
                      </div>
                      <Button
                        aria-label="send"
                        onClick={() => {
                          const input = document.querySelector('input[type="text"]') as HTMLInputElement | null
                          if (input) {
                            sendMessage(input.value)
                            input.value = "" // Clear the input field after sending
                          }
                        }}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </>
                        ) : (
                          <>
                            Send
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="mt-0 p-0">
            <QuestionLibrary />
          </TabsContent>

          <TabsContent value="tips" className="mt-0 p-0">
            <InterviewTips />
          </TabsContent>

          <TabsContent value="stats" className="mt-0 p-0">
            <PerformanceDashboard />
          </TabsContent>
        </Tabs>
      </div>

      {/* Interview Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Award className="h-5 w-5 text-blue-600" />
              Your Interview Results
            </DialogTitle>
            <DialogDescription>
              Here's how you performed in your interview for {role} at {company}
            </DialogDescription>
          </DialogHeader>

          <InterviewResults
            score={interviewScore}
            isSelected={isSelected}
            role={role}
            company={company}
            candidateName={candidateName || "Candidate"}
            feedbackPoints={feedbackPoints}
          />

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleCloseResults} className="sm:flex-1">
              Close
            </Button>
            <Button
              onClick={saveInterviewTranscript}
              variant="outline"
              className="sm:flex-1 border-blue-200 dark:border-blue-800"
            >
              <Download className="mr-2 h-4 w-4" />
              Save Transcript
            </Button>
            <Button
              onClick={handleStartNewInterview}
              className="sm:flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Mic className="mr-2 h-4 w-4" />
              New Interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AnimatedGradientBackground>
  )
}
