"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Twitter, ExternalLink, MapPin, Briefcase, Calendar, X, Users, Scale, FileText, Shield, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"

interface TeamMember {
  id: number
  name: string
  title: string
  image: string
  bio: string
  email?: string
  linkedin?: string
  twitter?: string
  location: string
  joinDate: string
  expertise: string[]
  education: string
}

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<string>("leadership")
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const searchParams = useSearchParams()

  // Read tab parameter from URL on initial load
  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam && ["leadership", "staff", "board"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  // Team members data
  const leadershipTeam = [
    {
      id: 1,
      name: "Eunice M. Waweru",
      title: "Executive Director & Program Coordinator",
      image: "/eunice1.jpg?height=400&width=400",
      bio: "Ms. Eunice has over 20 years experience as a trade unionist, working closely with labor movements and civil society organizations. She has been instrumental in establishing Workers Rights Watch as a leading advocate for workers' rights in Kenya.",
      email: "eunice@workersrightswatch.org",
      linkedin: "https://www.linkedin.com/in/eunice-waweru/",
      twitter: "https://twitter.com/eunicewaweru",
      location: "Nairobi, Kenya",
      joinDate: "January 2000",
      expertise: ["Labor Rights", "Advocacy", "Program Management"],
      education: "Master's in Labor Relations, University of Nairobi",
    },
    {
      id: 2,
      name: "Caroline Ng'endo",
      title: "Program Officer for Standards & Certification",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Ms. Caroline leads the Program Office for Standards & Certification, working to ensure fair labor practices across industries. She has a background in labor law and has been with the organization for over 8 years.",
      email: "caroline@workersrightswatch.org",
      linkedin: "https://www.linkedin.com/in/caroline-ngendo/",
      twitter: "https://twitter.com/carolinengendo",
      location: "Nairobi, Kenya",
      joinDate: "March 2015",
      expertise: ["Labor Standards", "Certification", "Legal Compliance"],
      education: "Bachelor of Laws, University of Nairobi",
    },
    {
      id: 3,
      name: "Steve Biko",
      title: "Finance Officer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Steve is responsible for managing funds for Workers Rights Watch. He handles the budget for project implementation, financial reporting, and expense accountability. He has a background in finance and accounting with over 10 years of experience in the non-profit sector.",
      email: "steve@workersrightswatch.org",
      linkedin: "https://www.linkedin.com/in/steve-biko/",
      twitter: "https://twitter.com/stevebiko",
      location: "Nairobi, Kenya",
      joinDate: "June 2013",
      expertise: ["Financial Management", "Budgeting", "Non-profit Accounting"],
      education: "CPA, Strathmore University",
    },
  ]

  const staffMembers = [
    {
      id: 4,
      name: "James Odhiambo",
      title: "Legal Officer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "James provides legal support to workers facing rights violations. He has a law degree from the University of Nairobi and has been practicing labor law for 5 years.",
      email: "james@workersrightswatch.org",
      linkedin: "https://www.linkedin.com/in/james-odhiambo/",
      location: "Nairobi, Kenya",
      joinDate: "August 2019",
      expertise: ["Labor Law", "Legal Advocacy", "Case Management"],
      education: "Bachelor of Laws, University of Nairobi",
    },
    {
      id: 5,
      name: "Mercy Wanjiku",
      title: "Communications Officer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Mercy manages our communications strategy, social media presence, and public relations. She has a background in journalism and has been with the organization for 3 years.",
      email: "mercy@workersrightswatch.org",
      twitter: "https://twitter.com/mercywanjiku",
      location: "Nairobi, Kenya",
      joinDate: "February 2021",
      expertise: ["Communications", "Social Media", "Public Relations"],
      education: "Bachelor's in Communication, Daystar University",
    },
    {
      id: 6,
      name: "Daniel Kimani",
      title: "Research Coordinator",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Daniel leads our research initiatives on labor conditions and rights violations. He has a Master's degree in Social Research and has published several papers on labor rights in Kenya.",
      email: "daniel@workersrightswatch.org",
      linkedin: "https://www.linkedin.com/in/daniel-kimani/",
      location: "Kisumu, Kenya",
      joinDate: "May 2020",
      expertise: ["Research Methodology", "Data Analysis", "Labor Studies"],
      education: "Master's in Social Research, University of Nairobi",
    },
    {
      id: 7,
      name: "Faith Muthoni",
      title: "Community Outreach Officer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Faith coordinates our community engagement programs and awareness campaigns. She has extensive experience working with grassroots organizations and has been with us for 4 years.",
      email: "faith@workersrightswatch.org",
      twitter: "https://twitter.com/faithmuthoni",
      location: "Mombasa, Kenya",
      joinDate: "January 2020",
      expertise: ["Community Engagement", "Grassroots Organizing", "Awareness Campaigns"],
      education: "Bachelor's in Sociology, Kenyatta University",
    },
    {
      id: 8,
      name: "Peter Otieno",
      title: "Training Coordinator",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Peter develops and implements our worker education and training programs. He has a background in adult education and has trained over 2,000 workers on their rights.",
      email: "peter@workersrightswatch.org",
      linkedin: "https://www.linkedin.com/in/peter-otieno/",
      location: "Nakuru, Kenya",
      joinDate: "March 2019",
      expertise: ["Training & Development", "Adult Education", "Curriculum Design"],
      education: "Bachelor's in Education, Kenyatta University",
    },
    {
      id: 9,
      name: "Sarah Njeri",
      title: "Administrative Assistant",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Sarah provides administrative support to the team, managing office operations and logistics. She has a diploma in office administration and has been with the organization for 2 years.",
      email: "sarah@workersrightswatch.org",
      location: "Nairobi, Kenya",
      joinDate: "June 2022",
      expertise: ["Office Administration", "Logistics", "Event Planning"],
      education: "Diploma in Office Administration, Kenya Polytechnic",
    },
  ]

  const boardMembers = [
    {
      id: 10,
      name: "Dr. Joseph Mwangi",
      title: "Board Chairperson",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Dr. Mwangi is a professor of Labor Economics at the University of Nairobi. He has published extensively on labor markets and workers' rights in East Africa.",
      linkedin: "https://www.linkedin.com/in/joseph-mwangi/",
      location: "Nairobi, Kenya",
      joinDate: "January 2018",
      expertise: ["Labor Economics", "Policy Development", "Academic Research"],
      education: "PhD in Economics, University of Cambridge",
    },
    {
      id: 11,
      name: "Hon. Jane Akinyi",
      title: "Board Member",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Hon. Akinyi is a former Member of Parliament and has been a vocal advocate for workers' rights throughout her political career.",
      twitter: "https://twitter.com/janeakinyi",
      location: "Kisumu, Kenya",
      joinDate: "March 2019",
      expertise: ["Policy Advocacy", "Government Relations", "Political Strategy"],
      education: "Bachelor's in Political Science, University of Nairobi",
    },
    {
      id: 12,
      name: "Mr. David Omondi",
      title: "Board Treasurer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Mr. Omondi is a certified public accountant with over 15 years of experience in financial management for non-profit organizations.",
      linkedin: "https://www.linkedin.com/in/david-omondi/",
      location: "Nairobi, Kenya",
      joinDate: "February 2020",
      expertise: ["Financial Management", "Non-profit Accounting", "Auditing"],
      education: "CPA-K, Strathmore University",
    },
    {
      id: 13,
      name: "Ms. Elizabeth Wangari",
      title: "Board Secretary",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Ms. Wangari is a human rights lawyer with a focus on labor rights. She has represented numerous workers in landmark cases in Kenya.",
      email: "elizabeth@lawfirm.com",
      location: "Nairobi, Kenya",
      joinDate: "May 2021",
      expertise: ["Human Rights Law", "Labor Litigation", "Legal Strategy"],
      education: "Master of Laws, Harvard Law School",
    },
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const openMemberProfile = (member: TeamMember) => {
    setSelectedMember(member)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const renderTeamMembers = (members: TeamMember[]) => {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {members.map((member: TeamMember, index: number) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 cursor-pointer"
              onClick={() => openMemberProfile(member)}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover object-center transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-teal-500 dark:text-teal-500 light:text-teal-600 mb-4">{member.title}</p>
                <div className="flex justify-center space-x-3">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label={`Email ${member.name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label={`${member.name}'s LinkedIn profile`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label={`${member.name}'s Twitter profile`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pic8.jpg?height=600&width=1920"
            alt="Our Team"
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
            <h1 className="text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-6">Our Team</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl mx-auto">
              Meet the dedicated professionals working to protect and promote workers' rights across Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="leadership" onValueChange={handleTabChange} className="w-full">
            <TabsList className="justify-center mb-12 bg-transparent border border-gray-800 dark:border-gray-800 light:border-gray-200 rounded-full p-1 w-fit mx-auto">
              <TabsTrigger
                value="leadership"
                className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
              >
                Leadership
              </TabsTrigger>
              <TabsTrigger
                value="staff"
                className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
              >
                Staff
              </TabsTrigger>
              <TabsTrigger
                value="board"
                className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
              >
                Board
              </TabsTrigger>
            </TabsList>

            <TabsContent value="leadership" className="mt-8">
              {renderTeamMembers(leadershipTeam)}
            </TabsContent>

            <TabsContent value="staff" className="mt-8">
              {renderTeamMembers(staffMembers)}
            </TabsContent>

            <TabsContent value="board" className="mt-8">
              {renderTeamMembers(boardMembers)}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Member Profile Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-2xl max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedMember?.name || "Team Member"}
          </DialogTitle>
          {selectedMember && (
            <div className="flex flex-col md:flex-row h-full">
              {/* Left sidebar with image and contact info */}
              <div className="md:w-1/3 bg-[#111111] p-6 flex flex-col">
                <div className="relative h-64 w-full rounded-xl overflow-hidden mb-6">
                  <Image
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{selectedMember.name}</h3>
                <p className="text-teal-500 font-medium mb-4">{selectedMember.title}</p>

                <div className="space-y-4 mt-2 text-gray-300">
                  {selectedMember.location && (
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{selectedMember.location}</span>
                    </div>
                  )}
                  {selectedMember.joinDate && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Joined: {selectedMember.joinDate}</span>
                    </div>
                  )}
                  {selectedMember.education && (
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{selectedMember.education}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  {selectedMember.email && (
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="flex items-center text-gray-300 hover:text-teal-500 transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-3 text-teal-500" />
                      <span className="truncate">{selectedMember.email}</span>
                    </a>
                  )}
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-teal-500 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 mr-3 text-teal-500" />
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                  {selectedMember.twitter && (
                    <a
                      href={selectedMember.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-teal-500 transition-colors"
                    >
                      <Twitter className="h-5 w-5 mr-3 text-teal-500" />
                      <span>Twitter Profile</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>

                <div className="mt-auto pt-6">
                  <Button
                    variant="outline"
                    className="w-full border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-black"
                    onClick={closeDialog}
                  >
                    Close Profile
                  </Button>
                </div>
              </div>

              {/* Right content area */}
              <div className="md:w-2/3 p-8 max-h-[80vh] overflow-y-auto">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-bold text-white">About {selectedMember.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">Biography</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedMember.bio}</p>
                  </div>

                  {selectedMember.expertise && selectedMember.expertise.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.expertise.map((skill: string, index: number) => (
                          <Badge key={index} className="bg-teal-500/20 text-teal-500 hover:bg-teal-500/30 px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">Role at Workers Rights Watch</h4>
                    <p className="text-gray-300 leading-relaxed">
                      As {selectedMember.title}, {selectedMember.name.split(" ")[0]} plays a crucial role in our
                      organization's mission to protect and promote workers' rights across Kenya.
                      {selectedMember.title.includes("Director") &&
                        " Their leadership guides our strategic direction and ensures we remain focused on our core values and objectives."}
                      {selectedMember.title.includes("Officer") &&
                        " They are responsible for implementing our programs and initiatives, ensuring they meet the highest standards of quality and impact."}
                      {selectedMember.title.includes("Coordinator") &&
                        " They oversee the coordination of our various activities, ensuring effective collaboration between different teams and stakeholders."}
                      {selectedMember.title.includes("Board") &&
                        " As part of our governance structure, they provide oversight and guidance to ensure our organization operates with integrity and effectiveness."}
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="absolute top-4 right-4 rounded-full p-2 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                onClick={closeDialog}
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Who We Work With Section */}
<section className="py-28 bg-[#181818] dark:bg-[#181818] light:bg-[#F8F9FA] overflow-hidden">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
        Who We Work With
      </h2>
      <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
        Workers Rights Watch collaborates with a diverse network of individuals and groups who support our mission in many ways.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
      {[
        {
          icon: <Users className="h-10 w-10 text-teal-500" />,
          title: "Workers' Assemblies",
          description: "Grassroots groups of workers who provide insights, feedback, and mobilize for collective action.",
          image: "/pic2.jpg",
          gradient: "from-teal-500/30 to-transparent"
        },
        {
          icon: <Scale className="h-10 w-10 text-teal-500" />,
          title: "Community Leaders",
          description: "Local champions who help us reach and empower workers in their communities.",
          image: "/pic7.jpg",
          gradient: "from-blue-500/30 to-transparent"
        },
        {
          icon: <FileText className="h-10 w-10 text-teal-500" />,
          title: "Legal Advisors",
          description: "A network of legal professionals who provide guidance and representation for workers' rights cases.",
          image: "/pic3.jpg",
          gradient: "from-purple-500/30 to-transparent"
        },
        {
          icon: <Shield className="h-10 w-10 text-teal-500" />,
          title: "Partner Organizations",
          description: "We collaborate with NGOs, unions, and advocacy groups to amplify our impact and reach.",
          image: "/pic4.jpg",
          gradient: "from-pink-500/30 to-transparent"
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group"
        >
          <div className="h-full rounded-3xl shadow-xl overflow-hidden bg-[#232526] flex flex-col">
            {/* Image Section with Gradient Overlay */}
            <div className="relative h-48 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-tr ${item.gradient} z-10 opacity-70`}></div>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Icon positioned on the image */}
              <div className="absolute bottom-5 right-0 m-4 z-20 h-14 w-14 rounded-2xl bg-[#181818]/70 backdrop-blur-sm flex items-center justify-center transform translate-y-1/2 group-hover:-translate-y-2 transition-transform duration-500">
                {item.icon}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 pt-10 flex-grow flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
              
              {/* Hidden details that appear on hover */}
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                className="mt-4 overflow-hidden"
              >
                <span className="inline-flex items-center text-teal-500 font-medium mt-4">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      <section className="py-16 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-6">Join Our Team</h2>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 mb-8">
              We're always looking for passionate individuals to join our mission of protecting workers' rights in
              Kenya.
            </p>
            <Button
              asChild
              variant="default"
              className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full px-8 py-6 text-base"
            >
              <Link href="/careers">View Open Positions</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
