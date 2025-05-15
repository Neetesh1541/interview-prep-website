import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Award, ThumbsUp, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface InterviewResultsProps {
  score: number
  isSelected: boolean
  role: string
  company: string
  candidateName: string
  feedbackPoints: string[]
}

export function InterviewResults({
  score,
  isSelected,
  role,
  company,
  candidateName,
  feedbackPoints,
}: InterviewResultsProps) {
  // Format current date for the letter
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-blue-100 dark:text-blue-900/20 stroke-current"
                strokeWidth="10"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-blue-600 dark:text-blue-400 stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{score}%</span>
              <span className="text-sm text-muted-foreground">Overall Score</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          {isSelected ? (
            <Badge className="text-lg py-1 px-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
              <CheckCircle className="mr-1 h-4 w-4" /> Selected
            </Badge>
          ) : (
            <Badge className="text-lg py-1 px-4 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
              <XCircle className="mr-1 h-4 w-4" /> Not Selected
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-blue-600" />
              Feedback Summary
            </CardTitle>
            <CardDescription>Key observations from your interview</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedbackPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className={`mt-1 h-2 w-2 rounded-full ${index < 3 ? "bg-green-500" : "bg-amber-500"}`}></div>
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-600" />
              Performance Breakdown
            </CardTitle>
            <CardDescription>How you performed in different areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">Technical Knowledge</div>
                <div className="text-sm font-medium">{Math.min(100, score + Math.floor(Math.random() * 10) - 5)}%</div>
              </div>
              <Progress
                value={Math.min(100, score + Math.floor(Math.random() * 10) - 5)}
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-blue-600 to-purple-600"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">Communication</div>
                <div className="text-sm font-medium">{Math.min(100, score + Math.floor(Math.random() * 10) - 5)}%</div>
              </div>
              <Progress
                value={Math.min(100, score + Math.floor(Math.random() * 10) - 5)}
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-blue-600 to-purple-600"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">Problem Solving</div>
                <div className="text-sm font-medium">{Math.min(100, score + Math.floor(Math.random() * 10) - 5)}%</div>
              </div>
              <Progress
                value={Math.min(100, score + Math.floor(Math.random() * 10) - 5)}
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-blue-600 to-purple-600"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">Cultural Fit</div>
                <div className="text-sm font-medium">{Math.min(100, score + Math.floor(Math.random() * 10) - 5)}%</div>
              </div>
              <Progress
                value={Math.min(100, score + Math.floor(Math.random() * 10) - 5)}
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-blue-600 to-purple-600"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            {isSelected ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            )}
            {isSelected ? "Offer Letter" : "Rejection Letter"}
          </CardTitle>
          <CardDescription>
            {isSelected
              ? `Congratulations on your successful interview!`
              : `Thank you for your interest in the position.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg text-sm space-y-4">
            <div className="text-right">{currentDate}</div>

            <p>Dear {candidateName},</p>

            {isSelected ? (
              <>
                <p>
                  We are pleased to inform you that you have been selected for the position of {role} at {company}. Your
                  performance during the interview process was impressive, and we believe your skills and experience
                  make you an excellent fit for our team.
                </p>

                <p>
                  We were particularly impressed with your {feedbackPoints[0].toLowerCase()} and
                  {feedbackPoints[1].toLowerCase()}. These qualities align well with our company values and the
                  requirements of the role.
                </p>

                <p>
                  We would like to invite you to discuss the details of our offer, including compensation, benefits, and
                  your potential start date. Our HR team will be in touch with you shortly to schedule this
                  conversation.
                </p>

                <p>Congratulations once again, and we look forward to welcoming you to the {company} team!</p>
              </>
            ) : (
              <>
                <p>
                  Thank you for taking the time to interview for the {role} position at {company}. We appreciate your
                  interest in joining our team and the effort you put into the interview process.
                </p>

                <p>
                  After careful consideration, we have decided to move forward with other candidates whose
                  qualifications more closely align with our current needs. While we were impressed with your{" "}
                  {feedbackPoints[0].toLowerCase()}, we are looking for candidates with more experience in{" "}
                  {feedbackPoints[4].toLowerCase().replace("work on ", "")}.
                </p>

                <p>
                  We encourage you to apply for future positions that match your skills and experience. We will keep
                  your application on file and contact you if a suitable position becomes available.
                </p>

                <p>We wish you the best in your job search and future career endeavors.</p>
              </>
            )}

            <p>Sincerely,</p>
            <p>The Hiring Team at {company}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
