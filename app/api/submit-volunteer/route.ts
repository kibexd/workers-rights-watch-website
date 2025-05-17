import { NextResponse } from "next/server"
// Ensure you have an email utility or library installed and configured
// import { createVolunteerFormEmail, sendEmail } from "@/lib/email" // Uncomment if you have this utility

export async function POST(request: Request) {
  try {
     // Needs bodyParser: false config if handling file uploads directly via FormData
    // As you already have it, it should work with request.formData()
    const formData = await request.formData()

    // Extract form fields
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const workType = formData.get("workType") as string // Assuming this is a string input
    const experience = formData.get("experience") as string // Assuming this is text input
    const availability = formData.get("availability") as string // Assuming this is text input
    const message = formData.get("message") as string
    // Handle file upload if present (Optional for volunteer?)
    const resumeFile = formData.get("resume") as File // Assuming input type="file" name="resume"


    // Validate required fields
    if (!name || !email || !workType) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    let fileAttachment = undefined;

    if (resumeFile && resumeFile.size > 0) {
       // NOTE: Process file content similar to submit-application route if you need to attach it
       const fileBuffer = await resumeFile.arrayBuffer();
       const fileBase64 = Buffer.from(fileBuffer).toString('base64');

       fileAttachment = {
         filename: resumeFile.name,
         content: fileBase64,
         contentType: resumeFile.type,
         encoding: 'base64'
       };

      console.log("Resume file processed for volunteer:", resumeFile.name, resumeFile.size, "bytes");
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

    // Create email content (Needs actual implementation)
    // You might have a utility function like createVolunteerFormEmail
     const emailBody = `
      <h2>New Volunteer Application</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Volunteer Type:</strong> ${workType}</p>
      <p><strong>Experience:</strong> ${experience || 'Not specified'}</p>
      <p><strong>Availability:</strong> ${availability || 'Not specified'}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
    `;


    const emailData = {
      to: process.env.VOLUNTEER_EMAIL_RECIPIENT || 'your-volunteer-email@example.com', // Set recipient email in .env.local
      from: process.env.EMAIL_FROM || 'noreply@your-domain.com', // Set sender email in .env.local
      subject: `Volunteer Application: ${workType} - ${name}`,
      html: emailBody,
      text: `Volunteer Application for ${workType} by ${name}\nEmail: ${email}\nPhone: ${phone}\nExperience: ${experience || 'Not specified'}\nAvailability: ${availability || 'Not specified'}\nMessage:\n${message}`,
      replyTo: email,
      attachments: fileAttachment ? [fileAttachment] : [], // Attach the resume if processed
    };


    // Send email (Needs actual implementation using a library like Nodemailer or a service SDK)
    // Example using a dummy sendEmail function:
    // const success = await sendEmail(emailData); // Uncomment and use your sendEmail function


    // NOTE: This is a dummy implementation. The email is not actually sent here.
    console.log("Volunteer form submission processed (email not actually sent). Email data:", emailData)


    // Simulate success for now
    const success = true; // Replace with actual result from sendEmail


     if (!success) {
       throw new Error("Email sending failed."); // Throw if your sendEmail function returns false or throws
    }


    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in volunteer form submission:", error)
    // Provide a more user-friendly error message
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while submitting the volunteer form";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

// Keep bodyParser: false for FormData handling
export const config = {
  api: {
    bodyParser: false,
  },
}
