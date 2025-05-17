import { NextResponse } from "next/server"
// Ensure you have an email utility or library installed and configured
// import { createCareerApplicationEmail, sendEmail } from "@/lib/email" // Uncomment if you have this utility

export async function POST(request: Request) {
  try {
    // Needs bodyParser: false config if handling file uploads directly via FormData
    // As you already have it, it should work with request.formData()

    const formData = await request.formData()

    // Extract form fields
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const position = formData.get("position") as string
    const experience = formData.get("experience") as string // Assuming this is text input
    const coverLetter = formData.get("coverLetter") as string
    // Handle file upload if present
    const resumeFile = formData.get("resume") as File // Assuming input type="file" name="resume"


    // Validate required fields
    if (!name || !email || !position) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    let fileAttachment = undefined;

    if (resumeFile && resumeFile.size > 0) {
      // NOTE: In a real implementation, you would process the file here.
      // This involves reading the file content and encoding it (e.g., Base64)
      // for attaching to an email or saving it elsewhere.

      // For sending via email, you typically need the file content as a Buffer or Base64 string
      const fileBuffer = await resumeFile.arrayBuffer(); // Read file content as ArrayBuffer
      const fileBase64 = Buffer.from(fileBuffer).toString('base64'); // Convert to Base64

      fileAttachment = {
        filename: resumeFile.name,
        content: fileBase64, // Use the actual file content
        contentType: resumeFile.type,
        encoding: 'base64' // Specify encoding
      };

      console.log("Resume file processed:", resumeFile.name, resumeFile.size, "bytes");

      // This was a dummy implementation
      // fileData = {
      //   filename: resumeFile.name,
      //   content: "dummy-base64-content",
      //   contentType: resumeFile.type,
      // }
    }

    // Create application data object
    const applicationData = {
      name,
      email,
      phone,
      position,
      experience, // Include experience in the data
      coverLetter,
    }

    // Create email content (Needs actual implementation)
    // You might have a utility function like createCareerApplicationEmail
    const emailBody = `
      <h2>New Job Application</h2>
      <p><strong>Position Applied For:</strong> ${position}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Experience:</strong> ${experience || 'Not specified'}</p>
      <p><strong>Cover Letter:</strong><br/>${coverLetter.replace(/\n/g, '<br/>')}</p>
    `;

    const emailData = {
      to: process.env.CAREERS_EMAIL_RECIPIENT || 'your-careers-email@example.com', // Set recipient email in .env.local
      from: process.env.EMAIL_FROM || 'noreply@your-domain.com', // Set sender email in .env.local
      subject: `Job Application: ${position} - ${name}`,
      html: emailBody,
      text: `Job Application for ${position} by ${name}\nEmail: ${email}\nPhone: ${phone}\nExperience: ${experience || 'Not specified'}\nCover Letter:\n${coverLetter}`,
      replyTo: email,
      attachments: fileAttachment ? [fileAttachment] : [], // Attach the resume if processed
    };

    // Send email (Needs actual implementation using a library like Nodemailer or a service SDK)
    // Example using a dummy sendEmail function:
    // const success = await sendEmail(emailData); // Uncomment and use your sendEmail function

    // NOTE: This is a dummy implementation. The email is not actually sent here.
    console.log("Job application submission processed (email not actually sent). Email data:", emailData)


    // Simulate success for now
    const success = true; // Replace with actual result from sendEmail


    if (!success) {
       throw new Error("Email sending failed."); // Throw if your sendEmail function returns false or throws
    }


    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in job application submission:", error)
    // Provide a more user-friendly error message
     const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while submitting the application";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

// Keep bodyParser: false for FormData handling
export const config = {
  api: {
    bodyParser: false,
  },
}
