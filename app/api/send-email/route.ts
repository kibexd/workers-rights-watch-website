import { NextResponse } from "next/server"
import { createContactFormEmail, sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create and send email (currently just logs the email data)
    const emailData = createContactFormEmail(formData)
    const success = await sendEmail(emailData)

    // NOTE: This is a dummy implementation. The email is not actually sent.
    // The success response is returned regardless of whether the email would have been sent.
    console.log("Contact form submission processed (email not actually sent)")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return NextResponse.json({ success: false, error: "Failed to process message" }, { status: 500 })
  }
}
