import { NextResponse } from "next/server"

// Mock questions for different roles
const questions = {
  "Software Engineer": [
    "Tell me about your experience with JavaScript frameworks like React or Angular.",
    "How do you approach debugging a complex issue in your code?",
    "Explain how you would design a scalable web application architecture.",
    "What's your approach to writing clean, maintainable code?",
    "How do you stay updated with the latest technologies and best practices?",
  ],
  "Product Manager": [
    "How do you prioritize features in a product roadmap?",
    "Tell me about a time when you had to make a difficult product decision.",
    "How do you gather and incorporate user feedback into your product development process?",
    "Describe your approach to working with engineering and design teams.",
    "How do you measure the success of a product launch?",
  ],
  "Data Scientist": [
    "Explain your approach to cleaning and preprocessing data for analysis.",
    "How do you validate the results of your machine learning models?",
    "Tell me about a challenging data analysis project you've worked on.",
    "How do you communicate technical findings to non-technical stakeholders?",
    "What techniques do you use to handle imbalanced datasets?",
  ],
  "UX Designer": [
    "Walk me through your design process from research to implementation.",
    "How do you incorporate user feedback into your designs?",
    "Tell me about a time when you had to defend a design decision.",
    "How do you ensure your designs are accessible to all users?",
    "What methods do you use to test the effectiveness of your designs?",
  ],
}

// Default questions if role is not found
const defaultQuestions = [
  "Tell me about your background and experience.",
  "What are your strengths and weaknesses?",
  "Why are you interested in this position?",
  "Where do you see yourself in 5 years?",
  "Do you have any questions for me?",
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, role, company, questionCount = 0, voiceId, userId } = body

    // Log the received data for debugging
    console.log("Received interview request:", { message, role, company, questionCount, voiceId, userId })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get the appropriate questions for the role
    const roleQuestions = questions[role as keyof typeof questions] || defaultQuestions

    // Generate a response based on the question count
    let response
    let newQuestionCount = questionCount

    if (questionCount < 5) {
      // If we haven't asked all questions yet, provide the next question
      response = roleQuestions[questionCount]
      newQuestionCount = questionCount + 1
    } else {
      // If we've asked all questions, provide a conclusion
      response = `Thank you for completing this interview for the ${role} position at ${company}. I've evaluated your responses and will now provide you with your results and feedback. Please click the "View Results" button to see how you performed.`
    }

    // Return the response as JSON
    return NextResponse.json({
      response,
      questionCount: newQuestionCount,
    })
  } catch (error) {
    console.error("Error processing interview request:", error)
    return NextResponse.json({ error: "Failed to process interview request" }, { status: 500 })
  }
}
