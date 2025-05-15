"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, Clock, Lightbulb, MessageSquare, ThumbsUp, AlertTriangle } from "lucide-react"
import { useSearchParams } from "next/navigation"

export function InterviewTips() {
  const [activeTab, setActiveTab] = useState("general")
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "Software Engineer"

  // Role-specific tips
  const roleTips = {
    "Software Engineer": [
      {
        title: "Technical Preparation",
        content:
          "Review data structures, algorithms, and system design concepts. Be prepared to write code on a whiteboard or in a shared editor. Practice explaining your thought process as you solve problems.",
      },
      {
        title: "Project Discussion",
        content:
          "Be ready to discuss your past projects in detail. Use the STAR method (Situation, Task, Action, Result) to structure your responses. Highlight your specific contributions and the technologies you used.",
      },
      {
        title: "Cultural Fit",
        content:
          "Research the company's engineering culture and values. Prepare examples that demonstrate how you've embodied similar values in your previous roles or projects.",
      },
    ],
    "Product Manager": [
      {
        title: "Product Sense",
        content:
          "Practice product critique and improvement exercises. Be ready to discuss how you would prioritize features, measure success, and make trade-offs.",
      },
      {
        title: "Analytical Skills",
        content:
          "Prepare to analyze metrics and make data-driven decisions. Practice case studies that involve interpreting user data and making product recommendations.",
      },
      {
        title: "Stakeholder Management",
        content:
          "Discuss how you've worked with engineering, design, and business teams. Highlight your communication skills and ability to build consensus.",
      },
    ],
    "Data Scientist": [
      {
        title: "Technical Skills",
        content:
          "Be prepared to discuss statistical methods, machine learning algorithms, and data visualization techniques. Practice explaining complex concepts in simple terms.",
      },
      {
        title: "Case Studies",
        content:
          "Prepare for case interviews that test your ability to solve real-world data problems. Practice framing problems, designing solutions, and interpreting results.",
      },
      {
        title: "Communication",
        content:
          "Demonstrate your ability to communicate insights to non-technical stakeholders. Prepare examples of how your data work has influenced business decisions.",
      },
    ],
    "UX Designer": [
      {
        title: "Portfolio Review",
        content:
          "Be ready to walk through your design process for key projects. Highlight your research methods, iterations, and the impact of your designs.",
      },
      {
        title: "Design Challenges",
        content:
          "Practice design exercises that test your problem-solving skills. Focus on understanding user needs, ideation, and design rationale.",
      },
      {
        title: "Collaboration",
        content:
          "Discuss how you work with product managers, engineers, and other designers. Highlight your ability to give and receive feedback.",
      },
    ],
  }

  // General interview tips
  const generalTips = [
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Arrive Early",
      content:
        "Plan to arrive 10-15 minutes early for in-person interviews. For virtual interviews, join the meeting 5 minutes early and test your audio and video beforehand.",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
      title: "Research the Company",
      content:
        "Thoroughly research the company's products, services, culture, and recent news. Be prepared to discuss why you're interested in the company specifically.",
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      title: "Practice the STAR Method",
      content:
        "Structure your responses using the Situation, Task, Action, Result framework. This helps you provide concrete examples and demonstrate your impact.",
    },
    {
      icon: <ThumbsUp className="h-5 w-5 text-primary" />,
      title: "Prepare Questions",
      content:
        "Have thoughtful questions ready for your interviewers. This demonstrates your interest and helps you evaluate if the role is right for you.",
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-primary" />,
      title: "Show Enthusiasm",
      content:
        "Express genuine interest in the role and company. Enthusiasm can set you apart from equally qualified candidates.",
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
      title: "Avoid Common Mistakes",
      content:
        "Don't speak negatively about previous employers, avoid checking your phone, and don't interrupt the interviewer. Stay focused and professional throughout.",
    },
  ]

  // Behavioral interview tips
  const behavioralTips = [
    {
      title: "Leadership",
      content:
        "Prepare examples of when you've led a team or project. Discuss your leadership style, how you motivated others, and the outcomes you achieved.",
    },
    {
      title: "Conflict Resolution",
      content:
        "Describe situations where you've successfully navigated conflicts. Focus on your approach to understanding different perspectives and finding common ground.",
    },
    {
      title: "Problem Solving",
      content:
        "Share examples of complex problems you've solved. Highlight your analytical thinking, creativity, and persistence in overcoming challenges.",
    },
    {
      title: "Adaptability",
      content:
        "Discuss times when you've had to adapt to unexpected changes. Emphasize your flexibility, resilience, and ability to thrive in dynamic environments.",
    },
    {
      title: "Teamwork",
      content:
        "Provide examples of successful collaboration. Highlight your communication skills, empathy, and ability to work effectively with diverse teams.",
    },
    {
      title: "Growth Mindset",
      content:
        "Share stories about how you've learned from failures or feedback. Demonstrate your commitment to continuous improvement and professional development.",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interview Tips</CardTitle>
        <CardDescription>Prepare effectively with these interview tips and strategies</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General Tips</TabsTrigger>
            <TabsTrigger value="role">Role-Specific</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generalTips.map((tip, index) => (
                <Card key={index} className="overflow-hidden border border-muted">
                  <CardHeader className="p-4 pb-0 flex flex-row items-center gap-2">
                    {tip.icon}
                    <CardTitle className="text-base">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground">{tip.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="role" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tips for {role} Interviews</h3>
              <Accordion type="single" collapsible className="w-full">
                {roleTips[role as keyof typeof roleTips]?.map((tip, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-base font-medium">{tip.title}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">{tip.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                )) || (
                  <p className="text-sm text-muted-foreground py-4">
                    No specific tips available for this role yet. Please check the general tips section.
                  </p>
                )}
              </Accordion>
            </div>
          </TabsContent>
          <TabsContent value="behavioral" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Behavioral Interview Questions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Prepare for these common behavioral interview topics using the STAR method (Situation, Task, Action,
                Result).
              </p>
              <Accordion type="single" collapsible className="w-full">
                {behavioralTips.map((tip, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-base font-medium">{tip.title}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">{tip.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
