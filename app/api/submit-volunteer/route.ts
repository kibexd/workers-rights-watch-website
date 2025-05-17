import { NextResponse } from "next/server"
import { createVolunteerFormEmail, sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const workType = formData.get("workType") as string
    const experience = formData.get("experience") as string
    const availability = formData.get("availability") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!name || !email || !workType) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Handle file upload if present
    const resumeFile = formData.get("resume") as File
    let fileData

    if (resumeFile && resumeFile.size > 0) {
      // NOTE: In a real implementation, you would process the file here
      // For now, we'll just log that a file was received
      console.log("Resume file received:", resumeFile.name, resumeFile.size, "bytes")

      // This is a dummy implementation
      fileData = {
        filename: resumeFile.name,
        content: "dummy-base64-content",
        contentType: resumeFile.type,
      }
    }

    // Create volunteer data object
    const volunteerData = {
      name,
      email,
      phone,
      workType,
      experience,
      availability,
      message,
    }

    // Create and log email (not actually sending)
    const emailData = createVolunteerFormEmail(volunteerData, fileData)
    const success = await sendEmail(emailData)

    // NOTE: This is a dummy implementation. The email is not actually sent.
    console.log("Volunteer form submission processed (email not actually sent)")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in volunteer form submission:", error)
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
