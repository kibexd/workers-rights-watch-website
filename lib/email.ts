// This is a dummy implementation of email functionality
// No actual emails are sent, but the functions simulate the process

interface EmailData {
  to: string
  subject: string
  text: string
  html: string
  cc?: string
  attachments?: any[]
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  // NOTE: This is a dummy implementation. No actual emails are sent.
  try {
    // Log the email data (for demonstration purposes only)
    console.log("DUMMY EMAIL SENDING (not actually sent):", {
      to: data.to,
      subject: data.subject,
      text: data.text.substring(0, 100) + "...",
      html: "HTML content here...",
      cc: data.cc,
      attachments: data.attachments ? `${data.attachments.length} attachments` : "none",
    })

    console.log("Email logged (but not sent)")
    return true
  } catch (error) {
    console.error("Error in dummy email function:", error)
    return false
  }
}

export function createContactFormEmail(formData: any): EmailData {
  return {
    to: "kibeenock7390@gmail.com",
    subject: `Contact Form Submission: ${formData.subject}`,
    text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      Message: ${formData.message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a4365;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
  }
}

export function createVolunteerFormEmail(
  formData: any,
  fileData?: { filename: string; content: string; contentType: string },
): EmailData {
  const email: EmailData = {
    to: "kibeenock7390@gmail.com",
    subject: "New Volunteer Application",
    text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Work Type: ${formData.workType}
      Experience: ${formData.experience}
      Availability: ${formData.availability}
      Message: ${formData.message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a4365;">New Volunteer Application</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Work Type:</strong> ${formData.workType}</p>
        <p><strong>Experience:</strong> ${formData.experience}</p>
        <p><strong>Availability:</strong> ${formData.availability}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
  }

  // Add attachment if resume/CV was uploaded
  if (fileData) {
    email.attachments = [
      {
        content: fileData.content,
        filename: fileData.filename,
        type: fileData.contentType,
        disposition: "attachment",
      },
    ]
  }

  return email
}

export function createCareerApplicationEmail(
  formData: any,
  fileData?: { filename: string; content: string; contentType: string },
): EmailData {
  const email: EmailData = {
    to: "kibeenock7390@gmail.com",
    subject: `Job Application: ${formData.position}`,
    text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Position: ${formData.position}
      Experience: ${formData.experience}
      Cover Letter: ${formData.coverLetter}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a4365;">New Job Application</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Position:</strong> ${formData.position}</p>
        <p><strong>Experience:</strong> ${formData.experience}</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${formData.coverLetter.replace(/\n/g, "<br>")}</p>
      </div>
    `,
  }

  // Add attachment if resume/CV was uploaded
  if (fileData) {
    email.attachments = [
      {
        content: fileData.content,
        filename: fileData.filename,
        type: fileData.contentType,
        disposition: "attachment",
      },
    ]
  }

  return email
}

export function createDonationConfirmationEmail(data: {
  name: string
  email: string
  amount: number
  currency: string
}): EmailData {
  return {
    to: data.email,
    cc: "kibeenock7390@gmail.com",
    subject: "Thank You for Your Donation to Workers Rights Watch",
    text: `
      Dear ${data.name},

      Thank you for your generous donation of ${data.currency.toUpperCase()} ${data.amount} to Workers Rights Watch. 
      Your contribution helps us continue our mission to protect and advocate for workers' rights.

      Best regards,
      The Workers Rights Watch Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a4365;">Thank You for Your Donation</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for your generous donation of <strong>${data.currency.toUpperCase()} ${data.amount}</strong> to Workers Rights Watch.</p>
        <p>Your contribution helps us continue our mission to protect and advocate for workers' rights.</p>
        <p>Best regards,<br>The Workers Rights Watch Team</p>
      </div>
    `,
  }
}
