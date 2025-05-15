"use client"

import type React from "react"

import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { Header } from "@/components/header"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Video, BookOpen, Download } from "lucide-react"
import Link from "next/link"

export default function Resources() {
  return (
    <AnimatedGradientBackground>
      <Header />
      <div className="container max-w-6xl py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">
            Explore our collection of interview preparation resources to help you succeed.
          </p>
        </div>

        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResourceCard
                title="Technical Interview Guide"
                description="Master coding interviews with our comprehensive guide."
                icon={<FileText className="h-6 w-6" />}
                category="Software Engineering"
              />
              <ResourceCard
                title="Behavioral Interview Questions"
                description="Prepare for common behavioral questions with example answers."
                icon={<FileText className="h-6 w-6" />}
                category="All Roles"
              />
              <ResourceCard
                title="Product Manager Interview Guide"
                description="Learn how to showcase your product sense and analytical skills."
                icon={<FileText className="h-6 w-6" />}
                category="Product Management"
              />
              <ResourceCard
                title="Data Science Interview Prep"
                description="Prepare for technical and case interviews in data science."
                icon={<FileText className="h-6 w-6" />}
                category="Data Science"
              />
              <ResourceCard
                title="UX Design Portfolio Guide"
                description="Create a standout UX portfolio that showcases your skills."
                icon={<FileText className="h-6 w-6" />}
                category="UX Design"
              />
              <ResourceCard
                title="Salary Negotiation Tactics"
                description="Learn effective strategies for negotiating your compensation."
                icon={<FileText className="h-6 w-6" />}
                category="All Roles"
              />
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResourceCard
                title="Mock Technical Interview"
                description="Watch a full software engineering interview with feedback."
                icon={<Video className="h-6 w-6" />}
                category="Software Engineering"
              />
              <ResourceCard
                title="How to Answer 'Tell Me About Yourself'"
                description="Master this common interview opener with expert tips."
                icon={<Video className="h-6 w-6" />}
                category="All Roles"
              />
              <ResourceCard
                title="System Design Interview Example"
                description="Learn how to approach system design questions effectively."
                icon={<Video className="h-6 w-6" />}
                category="Software Engineering"
              />
              <ResourceCard
                title="Product Case Study Walkthrough"
                description="See how to tackle a product management case interview."
                icon={<Video className="h-6 w-6" />}
                category="Product Management"
              />
              <ResourceCard
                title="Data Visualization Challenge"
                description="Watch a data scientist solve a real interview challenge."
                icon={<Video className="h-6 w-6" />}
                category="Data Science"
              />
              <ResourceCard
                title="UX Design Challenge"
                description="See how to approach a design challenge in an interview."
                icon={<Video className="h-6 w-6" />}
                category="UX Design"
              />
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResourceCard
                title="Resume Template"
                description="ATS-friendly resume template optimized for tech roles."
                icon={<Download className="h-6 w-6" />}
                category="All Roles"
              />
              <ResourceCard
                title="Cover Letter Template"
                description="Customizable cover letter template with examples."
                icon={<Download className="h-6 w-6" />}
                category="All Roles"
              />
              <ResourceCard
                title="Thank You Email Template"
                description="Post-interview thank you email templates that stand out."
                icon={<Download className="h-6 w-6" />}
                category="All Roles"
              />
              <ResourceCard
                title="Technical Project Documentation"
                description="Template for documenting technical projects on your resume."
                icon={<Download className="h-6 w-6" />}
                category="Software Engineering"
              />
              <ResourceCard
                title="Product Case Study Template"
                description="Framework for presenting product management case studies."
                icon={<Download className="h-6 w-6" />}
                category="Product Management"
              />
              <ResourceCard
                title="UX Portfolio Template"
                description="Structure your UX portfolio with this comprehensive template."
                icon={<Download className="h-6 w-6" />}
                category="UX Design"
              />
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResourceCard
                title="Mastering the Coding Interview"
                description="Comprehensive course covering algorithms and data structures."
                icon={<BookOpen className="h-6 w-6" />}
                category="Software Engineering"
              />
              <ResourceCard
                title="Product Management Fundamentals"
                description="Learn the core skills needed for product management roles."
                icon={<BookOpen className="h-6 w-6" />}
                category="Product Management"
              />
              <ResourceCard
                title="Data Science Interview Prep"
                description="Prepare for technical and case interviews in data science."
                icon={<BookOpen className="h-6 w-6" />}
                category="Data Science"
              />
              <ResourceCard
                title="UX Design Portfolio Masterclass"
                description="Create a standout UX portfolio that showcases your skills."
                icon={<BookOpen className="h-6 w-6" />}
                category="UX Design"
              />
              <ResourceCard
                title="Behavioral Interview Mastery"
                description="Prepare for behavioral questions with the STAR method."
                icon={<BookOpen className="h-6 w-6" />}
                category="All Roles"
              />
              <ResourceCard
                title="Salary Negotiation Workshop"
                description="Learn effective strategies for negotiating your compensation."
                icon={<BookOpen className="h-6 w-6" />}
                category="All Roles"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedGradientBackground>
  )
}

interface ResourceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  category: string
}

function ResourceCard({ title, description, icon, category }: ResourceCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-full bg-primary/10 p-1.5">{icon}</div>
          <div className="text-xs bg-secondary px-2 py-1 rounded-full">{category}</div>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href="#" className="w-full">
          <Button variant="outline" className="w-full">
            View Resource
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
