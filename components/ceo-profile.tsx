import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CEOProfile() {
  return (
    <Card className="w-full shadow-lg border-2">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Neetesh Kumar Sharma</CardTitle>
            <CardDescription>Chief Executive Officer</CardDescription>
          </div>
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">CEO</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 flex justify-center">
            <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Neetesh Kumar Sharma"
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Neetesh Kumar Sharma</h3>
            <p className="text-muted-foreground">
              Neetesh Kumar Sharma is a visionary leader with over 15 years of experience in the technology industry. As
              the CEO of InterviewMaster Pro, he has led the company to become a leading platform for interview
              preparation, helping thousands of candidates secure their dream jobs.
            </p>
            <p className="text-muted-foreground">
              Prior to founding InterviewMaster Pro, Neetesh held leadership positions at several Fortune 500 companies,
              where he developed a deep understanding of hiring processes and the challenges faced by job seekers. His
              passion for education and technology led him to create a platform that leverages AI to provide
              personalized interview coaching.
            </p>
            <p className="text-muted-foreground">
              Neetesh holds an MBA from Harvard Business School and a Bachelor's degree in Computer Science from IIT
              Delhi. He is a frequent speaker at technology and career development conferences.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-primary/5 to-primary/20 rounded-b-lg">
        <Link href="/interview?company=InterviewMaster%20Pro&role=CEO&name=Neetesh%20Kumar%20Sharma" className="w-full">
          <Button className="w-full group">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>View CEO Dashboard</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
