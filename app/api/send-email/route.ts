import { NextResponse } from "next/server"
// Ensure you have an email utility or library installed and configured
// Example using Nodemailer: npm install nodemailer
// You would also need a configured transporter, possibly in a lib/email.ts file
// import { createContactFormEmail, sendEmail } from "@/lib/email" // Uncomment if you have this utility

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Extract form fields from the request body
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // This is where you would integrate with an email sending service
    // Uncommented code:
    // You need to implement createContactFormEmail and sendEmail functions
    // Ensure your email service credentials (SMTP, API key) are in .env.local

    // Create email data object
    const emailData = {
      to: process.env.CONTACT_EMAIL_RECIPIENT || 'your-recipient-email@example.com', // Set recipient email in .env.local
      from: process.env.EMAIL_FROM || 'noreply@your-domain.com', // Set sender email in .env.local
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
      text: `
        Name: ${name}\n
        Email: ${email}\n
        Subject: ${subject}\n
        Message:\n${message}
      `,
      replyTo: email, // Allow replying directly to the sender
    };

    // Send email (Needs actual implementation using a library like Nodemailer or a service SDK)
    // Example using a dummy sendEmail function:
    // const success = await sendEmail(emailData); // Uncomment and use your sendEmail function

    // NOTE: This is a dummy implementation. The email is not actually sent here.
    console.log("Contact form submission received:", formState) // formState is not available here, log emailData instead
    console.log("Attempting to send email notification:", emailData) // Log the email data


    // Simulate success for now
    const success = true; // Replace with actual result from sendEmail

    if (!success) {
       throw new Error("Email sending failed."); // Throw if your sendEmail function returns false or throws
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in send email API route:", error)
    // Provide a more user-friendly error message
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while sending the email";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
