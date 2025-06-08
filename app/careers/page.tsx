"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Clock, MapPin, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

// Define interfaces for form state, job, and internship
interface VolunteerFormState {
  fullName: string
  email: string
  phone: string
  country: string
  about: string
  workType: string
  cvFile: File | null
}
interface JobApplicationState {
  fullName: string
  email: string
  phone: string
  coverLetter: string
  cvFile: File | null
}
interface Job {
  id: number
  title: string
  status: string
  location: string
  type: string
  posted: string
  deadline: string
  salary?: string
  stipend?: string
  description: string
  responsibilities: string[]
  requirements: string[]
}

export default function CareersPage() {
  const [formState, setFormState] = useState<VolunteerFormState>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    about: "",
    workType: "",
    cvFile: null,
  })

  const [jobApplicationState, setJobApplicationState] = useState<JobApplicationState>({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    cvFile: null,
  })

  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [cvUploaded, setCvUploaded] = useState(false)
  const [volunteerCvUploaded, setVolunteerCvUploaded] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [jobFormSubmitting, setJobFormSubmitting] = useState(false)
  const [jobFormSubmitted, setJobFormSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleJobApplicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setJobApplicationState((prev) => ({ ...prev, [id]: value }))

    // Clear error for this field if it exists
    if (formErrors[id]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          cvFile: "File size exceeds 5MB limit",
        }))
        return
      }

      setJobApplicationState((prev) => ({ ...prev, cvFile: file }))
      setCvUploaded(true)

      // Clear error for this field if it exists
      if (formErrors.cvFile) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.cvFile
          return newErrors
        })
      }
    }
  }

  const handleVolunteerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          volunteerCvFile: "File size exceeds 5MB limit",
        }))
        return
      }

      setFormState((prev) => ({ ...prev, cvFile: file }))
      setVolunteerCvUploaded(true)

      // Clear error for this field if it exists
      if (formErrors.volunteerCvFile) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.volunteerCvFile
          return newErrors
        })
      }
    }
  }

  const handleSelectChange = (id: string, value: string) => {
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

  const validateForm = (data: VolunteerFormState | JobApplicationState, type: "volunteer" | "job") => {
    const errors: Record<string, string> = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/

    if (type === "volunteer" && isVolunteerFormState(data)) {
      if (!data.fullName.trim()) errors.fullName = "Full name is required"
      if (!data.email.trim()) errors.email = "Email is required"
      else if (!emailRegex.test(data.email)) errors.email = "Invalid email format"
      if (!data.phone.trim()) errors.phone = "Phone number is required"
      else if (!phoneRegex.test(data.phone)) errors.phone = "Invalid phone format"
      if (!data.country) errors.country = "Country is required"
      if (!data.about.trim()) errors.about = "This field is required"
      if (!data.workType) errors.workType = "Please select a work type"
      if (!data.cvFile) errors.volunteerCvFile = "Resume/CV is required"
    } else if (type === "job" && isJobApplicationState(data)) {
      if (!data.fullName.trim()) errors.fullName = "Full name is required"
      if (!data.email.trim()) errors.email = "Email is required"
      else if (!emailRegex.test(data.email)) errors.email = "Invalid email format"
      if (!data.phone.trim()) errors.phone = "Phone number is required"
      else if (!phoneRegex.test(data.phone)) errors.phone = "Invalid phone format"
      if (!data.coverLetter.trim()) errors.coverLetter = "Cover letter is required"
      if (!data.cvFile) errors.cvFile = "Resume/CV is required"
    }

    return errors
  }

  function isVolunteerFormState(data: any): data is VolunteerFormState {
    return (
      typeof data === "object" &&
      "country" in data &&
      "about" in data &&
      "workType" in data
    )
  }
  function isJobApplicationState(data: any): data is JobApplicationState {
    return (
      typeof data === "object" &&
      "coverLetter" in data
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    const errors = validateForm(formState, "volunteer")
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormSubmitting(true)

    try {
      // Create form data to send
      const formData = new FormData()
      formData.append("fullName", formState.fullName)
      formData.append("email", formState.email)
      formData.append("phone", formState.phone)
      formData.append("country", formState.country)
      formData.append("about", formState.about)
      formData.append("workType", formState.workType)
      if (formState.cvFile) {
        formData.append("cv", formState.cvFile)
      }

      // Send data to API route
      const response = await fetch("/api/submit-volunteer", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit form")
      }

      setFormSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false)
        setFormState({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          about: "",
          workType: "",
          cvFile: null,
        })
        setVolunteerCvUploaded(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormErrors({ submit: "Failed to submit form. Please try again." })
    } finally {
      setFormSubmitting(false)
    }
  }

  const handleJobApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    const errors = validateForm(jobApplicationState, "job")
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setJobFormSubmitting(true)

    try {
      // Create form data to send
      const formData = new FormData()
      formData.append("jobId", selectedJob?.id.toString() || "")
      formData.append("jobTitle", selectedJob?.title || "")
      formData.append("fullName", jobApplicationState.fullName)
      formData.append("email", jobApplicationState.email)
      formData.append("phone", jobApplicationState.phone)
      formData.append("coverLetter", jobApplicationState.coverLetter)
      if (jobApplicationState.cvFile) {
        formData.append("cv", jobApplicationState.cvFile)
      }

      // Send data to API route
      const response = await fetch("/api/submit-application", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit application")
      }

      setJobFormSubmitted(true)

      // Reset form after 3 seconds and close dialog
      setTimeout(() => {
        setJobFormSubmitted(false)
        setJobApplicationState({
          fullName: "",
          email: "",
          phone: "",
          coverLetter: "",
          cvFile: null,
        })
        setCvUploaded(false)
        setIsDialogOpen(false) // Use state to close dialog instead of DOM manipulation
      }, 3000)
    } catch (error) {
      console.error("Error submitting application:", error)
      setFormErrors({ submit: "Failed to submit application. Please try again." })
    } finally {
      setJobFormSubmitting(false)
    }
  }

  const openJobDetails = (job: Job) => {
    setSelectedJob(job)
    setIsDialogOpen(true) // Open the dialog using state
    // Reset form state and errors when opening a new job
    setJobApplicationState({
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      cvFile: null,
    })
    setCvUploaded(false)
    setJobFormSubmitted(false)
    setFormErrors({})
  }

  // Example job listings
  const jobListings = [
    {
      id: 1,
      title: "Program Officer - Labor Rights",
      status: "Open",
      location: "Nairobi, Kenya",
      type: "Full-time",
      posted: "March 15, 2024",
      deadline: "April 15, 2024",
      salary: "KES 80,000 - 100,000 per month",
      description:
        "We are seeking a dedicated Program Officer to lead our labor rights initiatives across Kenya. The ideal candidate will have experience in labor law, human rights advocacy, and program management.",
      responsibilities: [
        "Develop and implement labor rights programs and initiatives",
        "Monitor labor conditions and document rights violations",
        "Conduct training workshops for workers on their rights",
        "Liaise with government agencies, unions, and other stakeholders",
        "Prepare reports and policy recommendations",
      ],
      requirements: [
        "Bachelor's degree in Law, Human Rights, or related field (Master's preferred)",
        "Minimum 3 years of experience in labor rights or human rights advocacy",
        "Strong knowledge of Kenyan labor laws and international labor standards",
        "Excellent communication and report writing skills",
        "Fluency in English and Swahili",
      ],
    },
    {
      id: 2,
      title: "Communications Specialist",
      status: "Closed",
      location: "Nairobi, Kenya",
      type: "Full-time",
      posted: "February 10, 2024",
      deadline: "March 10, 2024",
      salary: "KES 70,000 - 90,000 per month",
      description:
        "We are looking for a Communications Specialist to develop and implement our communications strategy. The ideal candidate will have experience in digital media, content creation, and advocacy communications.",
      responsibilities: [
        "Develop and implement communications strategies",
        "Create compelling content for various platforms",
        "Manage social media accounts and website content",
        "Coordinate media relations and press releases",
        "Design advocacy materials and publications",
      ],
      requirements: [
        "Bachelor's degree in Communications, Journalism, or related field",
        "Minimum 2 years of experience in communications, preferably in the NGO sector",
        "Strong writing and editing skills",
        "Experience with digital media and content management systems",
        "Graphic design skills (Adobe Creative Suite) a plus",
      ],
    },
  ]

  // Example internship listings
  const internshipListings = [
    {
      id: 3,
      title: "Research Intern - Labor Rights",
      status: "Open",
      location: "Nairobi, Kenya",
      type: "Part-time (3 months)",
      posted: "March 20, 2024",
      deadline: "April 10, 2024",
      stipend: "KES 15,000 per month",
      description:
        "We are seeking a motivated Research Intern to support our research initiatives on labor rights in Kenya. This is an excellent opportunity for students or recent graduates interested in human rights and labor issues.",
      responsibilities: [
        "Assist in conducting research on labor conditions and rights violations",
        "Help collect and analyze data for reports and publications",
        "Support the documentation of case studies",
        "Assist in organizing workshops and training sessions",
        "Help prepare research briefs and presentations",
      ],
      requirements: [
        "Currently pursuing or recently completed a degree in Law, Human Rights, Social Sciences, or related field",
        "Strong research and analytical skills",
        "Good writing and communication abilities",
        "Interest in labor rights and human rights issues",
        "Proficiency in MS Office and research tools",
      ],
    },
    {
      id: 4,
      title: "Digital Media Intern",
      status: "Closed",
      location: "Remote with occasional meetings in Nairobi",
      type: "Part-time (6 months)",
      posted: "January 15, 2024",
      deadline: "February 5, 2024",
      stipend: "KES 12,000 per month",
      description:
        "We are looking for a creative Digital Media Intern to support our communications team. The intern will help create engaging content for our digital platforms and assist in implementing our digital media strategy.",
      responsibilities: [
        "Create content for social media platforms",
        "Assist in website updates and maintenance",
        "Help design graphics and visual materials",
        "Support the production of videos and multimedia content",
        "Monitor social media engagement and prepare analytics reports",
      ],
      requirements: [
        "Currently pursuing or recently completed a degree in Communications, Digital Media, or related field",
        "Experience with social media management",
        "Basic graphic design skills",
        "Knowledge of content management systems",
        "Creative thinking and good attention to detail",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/career.jpg?height=600&width=1920"
            alt="Careers"
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
            <h1 className="text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-6">Careers</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl mx-auto">
              Join our team at Workers Rights Watch and make a difference in the lives of workers across Kenya and
              beyond.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl mb-16 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-8">
                  Available Positions
                </h2>

                <Tabs defaultValue="vacancies">
                  <TabsList className="bg-transparent border border-gray-800 dark:border-gray-800 light:border-gray-200 rounded-full p-1 w-fit mb-8">
                    <TabsTrigger
                      value="vacancies"
                      className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
                    >
                      Vacancies
                    </TabsTrigger>
                    <TabsTrigger
                      value="internships"
                      className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
                    >
                      Internships
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="vacancies">
                    <div className="grid gap-6">
                      {jobListings.map((job) => (
                        <Card
                          key={job.id}
                          className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-50 border-0 overflow-hidden rounded-xl transition-all duration-300 hover:shadow-md ${
                            job.status === "Closed" ? "opacity-70" : ""
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <div className="flex items-center mb-2">
                                  <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mr-3">
                                    {job.title}
                                  </h3>
                                  <Badge className={job.status === "Open" ? "bg-green-500" : "bg-gray-500"}>
                                    {job.status}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{job.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Briefcase className="h-4 w-4 mr-1" />
                                    <span>{job.type}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>Posted: {job.posted}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>Deadline: {job.deadline}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 md:mt-0">
                                <Button
                                  variant="default"
                                  className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full"
                                  onClick={() => openJobDetails(job)}
                                  disabled={job.status === "Closed"}
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="internships">
                    <div className="grid gap-6">
                      {internshipListings.map((internship) => (
                        <Card
                          key={internship.id}
                          className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-50 border-0 overflow-hidden rounded-xl transition-all duration-300 hover:shadow-md ${
                            internship.status === "Closed" ? "opacity-70" : ""
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <div className="flex items-center mb-2">
                                  <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mr-3">
                                    {internship.title}
                                  </h3>
                                  <Badge className={internship.status === "Open" ? "bg-green-500" : "bg-gray-500"}>
                                    {internship.status}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{internship.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Briefcase className="h-4 w-4 mr-1" />
                                    <span>{internship.type}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>Posted: {internship.posted}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>Deadline: {internship.deadline}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 md:mt-0">
                                <Button
                                  variant="default"
                                  className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full"
                                  onClick={() => openJobDetails(internship)}
                                  disabled={internship.status === "Closed"}
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                      Volunteer With Us
                    </h2>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-8 leading-relaxed">
                      One way for you to help out is by volunteering your skills and time towards our cause. Join our
                      team of dedicated volunteers and make a real difference in the lives of workers across Kenya.
                    </p>
                    <div className="relative h-64 rounded-2xl overflow-hidden">
                      <Image
                        src="/donate2.jpg?height=400&width=600"
                        alt="Volunteers"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    {formSubmitted ? (
                      <div className="text-center py-12">
                        <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="h-10 w-10 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                          Thank You for Volunteering!
                        </h3>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-6">
                          Your application has been submitted successfully. We appreciate your interest in volunteering
                          with us. Our team will review your information and contact you soon.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-white dark:text-white light:text-gray-900">
                            Full Name *
                          </Label>
                          <Input
                            id="fullName"
                            value={formState.fullName}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                              formErrors.fullName ? "border-2 border-red-500" : ""
                            }`}
                            required
                          />
                          {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white dark:text-white light:text-gray-900">
                              Email *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formState.email}
                              onChange={handleChange}
                              placeholder="you@example.com"
                              className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                                formErrors.email ? "border-2 border-red-500" : ""
                              }`}
                              required
                            />
                            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-white dark:text-white light:text-gray-900">
                              Phone Number *
                            </Label>
                            <Input
                              id="phone"
                              value={formState.phone}
                              onChange={handleChange}
                              placeholder="+254..."
                              className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                                formErrors.phone ? "border-2 border-red-500" : ""
                              }`}
                              required
                            />
                            {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country" className="text-white dark:text-white light:text-gray-900">
                            Country *
                          </Label>
                          <Select
                            value={formState.country}
                            onValueChange={(value) => handleSelectChange("country", value)}
                          >
                            <SelectTrigger
                              className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                                formErrors.country ? "border-2 border-red-500" : ""
                              }`}
                            >
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-gray-800 dark:border-gray-800 light:border-gray-200 text-white dark:text-white light:text-gray-900">
                              <SelectItem value="kenya">Kenya</SelectItem>
                              <SelectItem value="uganda">Uganda</SelectItem>
                              <SelectItem value="tanzania">Tanzania</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="about" className="text-white dark:text-white light:text-gray-900">
                            Tell us about yourself *
                          </Label>
                          <Textarea
                            id="about"
                            value={formState.about}
                            onChange={handleChange}
                            placeholder="Your skills, experience, and why you want to volunteer"
                            className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-xl min-h-[150px] focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                              formErrors.about ? "border-2 border-red-500" : ""
                            }`}
                            rows={5}
                            required
                          />
                          {formErrors.about && <p className="text-red-500 text-sm mt-1">{formErrors.about}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="workType" className="text-white dark:text-white light:text-gray-900">
                            Voluntary Work Type *
                          </Label>
                          <Select
                            value={formState.workType}
                            onValueChange={(value) => handleSelectChange("workType", value)}
                          >
                            <SelectTrigger
                              className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                                formErrors.workType ? "border-2 border-red-500" : ""
                              }`}
                            >
                              <SelectValue placeholder="Select work type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-gray-800 dark:border-gray-800 light:border-gray-200 text-white dark:text-white light:text-gray-900">
                              <SelectItem value="legal">Legal Support</SelectItem>
                              <SelectItem value="research">Research</SelectItem>
                              <SelectItem value="education">Worker Education</SelectItem>
                              <SelectItem value="community">Community Outreach</SelectItem>
                              <SelectItem value="admin">Administrative Support</SelectItem>
                            </SelectContent>
                          </Select>
                          {formErrors.workType && <p className="text-red-500 text-sm mt-1">{formErrors.workType}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="volunteerCv" className="text-white dark:text-white light:text-gray-900">
                            Upload CV/Resume *
                          </Label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-50 hover:bg-[#252525] dark:hover:bg-[#252525] light:hover:bg-gray-100 ${
                                formErrors.volunteerCvFile
                                  ? "border-red-500"
                                  : "border-gray-700 dark:border-gray-700 light:border-gray-300"
                              }`}
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {volunteerCvUploaded ? (
                                  <>
                                    <CheckCircle className="w-8 h-8 mb-3 text-green-500" />
                                    <p className="mb-2 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                                      <span className="font-semibold">CV uploaded successfully</span>
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500">
                                      {formState.cvFile?.name} ({formState.cvFile?.size ? Math.round(formState.cvFile.size / 1024) : 0} KB)
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500 mt-1">
                                      Click to change file
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-500 light:text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                                      <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500">
                                      PDF or DOCX (MAX. 5MB)
                                    </p>
                                  </>
                                )}
                              </div>
                              <input
                                id="volunteerCv"
                                type="file"
                                className="hidden"
                                accept=".pdf,.docx"
                                onChange={handleVolunteerFileUpload}
                                required
                              />
                            </label>
                          </div>
                          {formErrors.volunteerCvFile && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.volunteerCvFile}</p>
                          )}
                        </div>

                        {formErrors.submit && (
                          <div className="bg-red-500/20 p-3 rounded-lg flex items-start">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-red-500 text-sm">{formErrors.submit}</p>
                          </div>
                        )}

                        <Button
                          type="submit"
                          className="w-full bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full h-12"
                          disabled={formSubmitting}
                        >
                          {formSubmitting ? (
                            <div className="flex items-center justify-center">
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
                              Submitting...
                            </div>
                          ) : (
                            "Apply"
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Job Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-2xl max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white dark:text-white light:text-gray-900 flex items-center gap-2">
              {selectedJob?.title}
              <Badge className={selectedJob?.status === "Open" ? "bg-green-500" : "bg-gray-500"}>
                {selectedJob?.status}
              </Badge>
            </DialogTitle>
            <div className="text-gray-400 dark:text-gray-400 light:text-gray-600">
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{selectedJob?.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{selectedJob?.type}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted: {selectedJob?.posted}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Deadline: {selectedJob?.deadline}</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-2">
                {selectedJob?.salary ? "Salary Range" : "Stipend"}
              </h4>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">
                {selectedJob?.salary || selectedJob?.stipend}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-2">
                {selectedJob?.salary ? "Job Description" : "Internship Description"}
              </h4>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">{selectedJob?.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-2">
                Key Responsibilities
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-300 dark:text-gray-300 light:text-gray-700">
                {selectedJob?.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-2">
                Requirements
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-300 dark:text-gray-300 light:text-gray-700">
                {selectedJob?.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-800 dark:border-gray-800 light:border-gray-200">
              {jobFormSubmitted ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white dark:text-white light:text-gray-900 mb-2">
                    Application Submitted!
                  </h4>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                    Thank you for your application. We will review it and get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <h4 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-4">
                    Apply for this {selectedJob?.salary ? "Position" : "Internship"}
                  </h4>

                  <form onSubmit={handleJobApplication} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-white dark:text-white light:text-gray-900">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          value={jobApplicationState.fullName}
                          onChange={handleJobApplicationChange}
                          placeholder="Your full name"
                          className={`bg-[#252525] dark:bg-[#252525] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                            formErrors.fullName ? "border-2 border-red-500" : ""
                          }`}
                          required
                        />
                        {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white dark:text-white light:text-gray-900">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={jobApplicationState.email}
                          onChange={handleJobApplicationChange}
                          placeholder="Your email address"
                          className={`bg-[#252525] dark:bg-[#252525] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                            formErrors.email ? "border-2 border-red-500" : ""
                          }`}
                          required
                        />
                        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white dark:text-white light:text-gray-900">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={jobApplicationState.phone}
                        onChange={handleJobApplicationChange}
                        placeholder="Your phone number"
                        className={`bg-[#252525] dark:bg-[#252525] light:bg-white border-0 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                          formErrors.phone ? "border-2 border-red-500" : ""
                        }`}
                        required
                      />
                      {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverLetter" className="text-white dark:text-white light:text-gray-900">
                        Cover Letter *
                      </Label>
                      <Textarea
                        id="coverLetter"
                        value={jobApplicationState.coverLetter}
                        onChange={handleJobApplicationChange}
                        placeholder="Tell us why you're interested in this position and what makes you a good fit"
                        className={`bg-[#252525] dark:bg-[#252525] light:bg-white border-0 rounded-xl min-h-[150px] focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900 ${
                          formErrors.coverLetter ? "border-2 border-red-500" : ""
                        }`}
                        rows={5}
                        required
                      />
                      {formErrors.coverLetter && <p className="text-red-500 text-sm mt-1">{formErrors.coverLetter}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cv" className="text-white dark:text-white light:text-gray-900">
                        Upload CV/Resume *
                      </Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-[#252525] dark:bg-[#252525] light:bg-gray-50 hover:bg-[#2A2A2A] dark:hover:bg-[#2A2A2A] light:hover:bg-gray-100 ${
                            formErrors.cvFile
                              ? "border-red-500"
                              : "border-gray-700 dark:border-gray-700 light:border-gray-300"
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {cvUploaded ? (
                              <>
                                <CheckCircle className="w-8 h-8 mb-3 text-green-500" />
                                <p className="mb-2 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                                  <span className="font-semibold">CV uploaded successfully</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500">
                                  {jobApplicationState.cvFile?.name} ({jobApplicationState.cvFile?.size ? Math.round(jobApplicationState.cvFile.size / 1024) : 0} KB)
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500 mt-1">
                                  Click to change file
                                </p>
                              </>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-500 light:text-gray-400" />
                                <p className="mb-2 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500">
                                  PDF or DOCX (MAX. 5MB)
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            id="cv"
                            type="file"
                            className="hidden"
                            accept=".pdf,.docx"
                            onChange={handleFileUpload}
                            required
                          />
                        </label>
                      </div>
                      {formErrors.cvFile && <p className="text-red-500 text-sm mt-1">{formErrors.cvFile}</p>}
                    </div>

                    {formErrors.submit && (
                      <div className="bg-red-500/20 p-3 rounded-lg flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-red-500 text-sm">{formErrors.submit}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full h-12 mt-4"
                      disabled={jobFormSubmitting}
                    >
                      {jobFormSubmitting ? (
                        <div className="flex items-center justify-center">
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
                          Submitting...
                        </div>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              className="text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white rounded-full"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
