"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  LinkedinIcon as LinkedIn,
  Send,
  CheckCircle,
  AlertCircle,
  Youtube,
} from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormState((prev) => ({ ...prev, [id]: value }))

    // Clear error for this field if it exists
    if (formErrors[id]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formState.name.trim()) errors.name = "Name is required"
    if (!formState.email.trim()) errors.email = "Email is required"
    else if (!emailRegex.test(formState.email)) errors.email = "Invalid email format"
    if (!formState.subject.trim()) errors.subject = "Subject is required"
    if (!formState.message.trim()) errors.message = "Message is required"

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)

    try {
      // Create form data to send
      const formData = new FormData()
      formData.append("name", formState.name)
      formData.append("email", formState.email)
      formData.append("subject", formState.subject)
      formData.append("message", formState.message)

      // In a real implementation, you would send this to your server
      // For now, we'll simulate a successful submission
      console.log("Contact form submitted:", formState)

      // Simulate sending an email notification
      console.log("Sending notification email to: kibeenock7390@gmail.com")

      // Send email using API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      setIsSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormErrors({ submit: "Failed to submit form. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1920"
            alt="Contact Us"
            fill
            className="object-cover opacity-20 dark:opacity-20 light:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A] dark:from-black/70 dark:via-black/50 dark:to-[#0A0A0A] light:from-white/70 light:via-white/50 light:to-[#F8F9FA]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl mx-auto">
              Get in touch with our team for inquiries, partnerships, or support.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA] relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-8">
                    Send Us a Message
                  </h2>

                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="h-20 w-20 rounded-full bg-teal-500/10 flex items-center justify-center mb-6">
                        <CheckCircle className="h-10 w-10 text-teal-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-center max-w-md">
                        Thank you for reaching out. We've received your message and will get back to you as soon as
                        possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white dark:text-white light:text-gray-900">
                            Your Name *
                          </Label>
                          <Input
                            id="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                              formErrors.name ? "border-2 border-red-500" : ""
                            }`}
                            required
                          />
                          {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white dark:text-white light:text-gray-900">
                            Your Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                              formErrors.email ? "border-2 border-red-500" : ""
                            }`}
                            required
                          />
                          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-white dark:text-white light:text-gray-900">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                            formErrors.subject ? "border-2 border-red-500" : ""
                          }`}
                          required
                        />
                        {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white dark:text-white light:text-gray-900">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Your message here..."
                          className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-xl min-h-[150px] focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                            formErrors.message ? "border-2 border-red-500" : ""
                          }`}
                          rows={6}
                          required
                        />
                        {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                      </div>

                      {formErrors.submit && (
                        <div className="bg-red-500/20 p-3 rounded-lg flex items-start">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-red-500 text-sm">{formErrors.submit}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full h-12 flex items-center justify-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl mb-8 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-teal-500" />
                      </div>
                      <div>
                        <h3 className="text-white dark:text-white light:text-gray-900 font-bold mb-1">Address</h3>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                          P.O. Box 00232-1516, Ruiru, Kenya
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-teal-500" />
                      </div>
                      <div>
                        <h3 className="text-white dark:text-white light:text-gray-900 font-bold mb-1">Phone</h3>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">+254(0)20-2605660</p>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">+254(0)775366920</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-teal-500" />
                      </div>
                      <div>
                        <h3 className="text-white dark:text-white light:text-gray-900 font-bold mb-1">Email</h3>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                          info@workersrightswatch.org
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-teal-500" />
                      </div>
                      <div>
                        <h3 className="text-white dark:text-white light:text-gray-900 font-bold mb-1">Working Hours</h3>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                          Monday - Friday: 8:00 AM - 5:00 PM
                        </p>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
                    Connect With Us
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://web.facebook.com/people/Workersrightswatchke/61572243038226/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a
                      href="https://x.com/Workersrights24"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.instagram.com/workersrightswatch_ke/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/106499488/admin/dashboard/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedIn className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.youtube.com/@workersrightswatch254"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="h-6 w-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl shadow-xl">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 p-8">Our Location</h2>
                <div className="relative h-[400px] w-full">
                  <Image src="/placeholder.svg?height=400&width=1200" alt="Map" fill className="object-cover" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="h-16 w-16 rounded-full bg-teal-500 flex items-center justify-center animate-pulse">
                      <MapPin className="h-8 w-8 text-black" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
