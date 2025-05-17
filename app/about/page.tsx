"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Users, Scale, Shield, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState({
    vision: false,
    whatWeDo: false,
    objectives: false,
    team: false,
    approach: false,
  })

  const visionRef = useRef(null)
  const whatWeDoRef = useRef(null)
  const objectivesRef = useRef(null)
  const teamRef = useRef(null)
  const approachRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === visionRef.current) {
            setIsVisible((prev) => ({ ...prev, vision: entry.isIntersecting }))
          } else if (entry.target === whatWeDoRef.current) {
            setIsVisible((prev) => ({ ...prev, whatWeDo: entry.isIntersecting }))
          } else if (entry.target === objectivesRef.current) {
            setIsVisible((prev) => ({ ...prev, objectives: entry.isIntersecting }))
          } else if (entry.target === teamRef.current) {
            setIsVisible((prev) => ({ ...prev, team: entry.isIntersecting }))
          } else if (entry.target === approachRef.current) {
            setIsVisible((prev) => ({ ...prev, approach: entry.isIntersecting }))
          }
        })
      },
      { threshold: 0.1 },
    )

    if (visionRef.current) observer.observe(visionRef.current)
    if (whatWeDoRef.current) observer.observe(whatWeDoRef.current)
    if (objectivesRef.current) observer.observe(objectivesRef.current)
    if (teamRef.current) observer.observe(teamRef.current)
    if (approachRef.current) observer.observe(approachRef.current)

    return () => {
      if (visionRef.current) observer.unobserve(visionRef.current)
      if (whatWeDoRef.current) observer.unobserve(whatWeDoRef.current)
      if (objectivesRef.current) observer.unobserve(objectivesRef.current)
      if (teamRef.current) observer.unobserve(teamRef.current)
      if (approachRef.current) observer.unobserve(approachRef.current)
    }
  }, [])

  // Team members data (matching the team page)
  const teamMembers = [
    {
      name: "Eunice M. Waweru",
      title: "Executive Director & Program Coordinator",
      bio: "Ms. Eunice has over 20 years experience as a trade unionist, working closely with labor movements and civil society organizations.",
      image: "/eunice1.jpg?height=400&width=400",
    },
    {
      name: "Caroline Ng'endo",
      title: "Program Officer for Standards & Certification",
      bio: "Ms. Caroline leads the Program Office for Standards & Certification, working to ensure fair labor practices across industries.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Steve Biko",
      title: "Finance Officer",
      bio: "Steve is responsible for managing funds for Workers Rights Watch. He handles the budget for project implementation, financial reporting, and expense accountability.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pic7.jpg?height=600&width=1920"
            alt="About Us"
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
            <h1 className="text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-6">About Us</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl mx-auto">
              Workers' Rights Watch (WRW) is a Non-governmental Organization established in 2000, dedicated to
              championing workers' rights across Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={visionRef} className="py-20 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible.vision ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-[#111111] to-[#0D0D0D] dark:from-[#111111] dark:to-[#0D0D0D] light:from-white light:to-gray-50 border-0 overflow-hidden rounded-2xl h-full">
                <CardContent className="p-10">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mr-6">
                      <Eye className="h-8 w-8 text-teal-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900">Our Vision</h2>
                  </div>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-lg leading-relaxed">
                    To have a workplace in which workers' rights are fully realized and their rights respected.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible.vision ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-[#111111] to-[#0D0D0D] dark:from-[#111111] dark:to-[#0D0D0D] light:from-white light:to-gray-50 border-0 overflow-hidden rounded-2xl h-full">
                <CardContent className="p-10">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mr-6">
                      <Eye className="h-8 w-8 text-teal-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900">Our Mission</h2>
                  </div>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-lg leading-relaxed">
                    To provide workers and neighboring community with rights-based approach founded on dignity,
                    equality, welfare and justice for all.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={whatWeDoRef} className="py-20 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.whatWeDo ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">What We Do</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              Our work spans across multiple areas to ensure comprehensive protection of workers' rights.
            </p>
          </motion.div>

          <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3 gap-0">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isVisible.whatWeDo ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="md:col-span-1 h-full"
                >
                  <div className="relative h-full min-h-[300px]">
                    <Image
                      src="/pic8.jpg?height=600&width=400"
                      alt="Workers in action"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isVisible.whatWeDo ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="md:col-span-2 p-10"
                >
                  <div className="space-y-6">
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed">
                      Workers' Rights Watch (WRW) is a Non-governmental organization established as an association of
                      shop stewards in 2000. Our mandate is to foster collaborative dialogue between workers and actors
                      who affect and those affected by their work. In promoting this dialogue, we have always believed
                      that complementary roles exist between non-governmental organizations and other stakeholders.
                    </p>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed">
                      WRW runs training workshops, conducts research, and provides legal assistance to workers whose
                      rights have been violated. We also facilitate accessible and provide monitoring mechanisms within
                      the private sector that may be applicable to other working institutions, promote decent work,
                      efficiency and accountability as part of our mission.
                    </p>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed">
                      We believe that workers should be given the opportunity to consult and promote corporate
                      citizenship and good working conditions. Our interest is to equip workers with tools, skills and
                      tactics that would enable them to expand the horizon of organizing and create critical
                      consciousness that would be required for effective workers organizing.
                    </p>
                    <Button
                      asChild
                      variant="default"
                      className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full mt-4"
                    >
                      <Link href="/our-work">Learn More About Our Work</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section ref={objectivesRef} className="py-20 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.objectives ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Our Objectives</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              The guiding principles that drive our work and initiatives.
            </p>
          </motion.div>

          <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-10">
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  "To promote, protect and enhance the enjoyment of workers' labour rights.",
                  "Rights education and ignorance within the labour movement through workers education.",
                  "Promote active participation in global changes affecting workers rights.",
                  "Advocates for the improvement of the living conditions of the workers through campaigns.",
                  "Training of trainers to build a vibrant and empowered workers constituency in Kenya.",
                  "Increase workers and community participation in development and empower them to fully participate on participatory social audits.",
                  "Establish a reputable and well governed trade union movement in Kenya.",
                  "To hold employers and institutions accountable on Corporate Citizenship (CSR).",
                  "Initiate dialogue amongst stakeholders locally, nationally and internationally.",
                  "Help workers to develop HIV/AIDS policies that protect workers at work place.",
                  "Gender equality and domestic violence at work place.",
                ].map((objective, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible.objectives ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center text-black font-bold mr-4 mt-1 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">{objective}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section ref={teamRef} className="py-20 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Our Team</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              Meet our dedicated team of professionals working to champion workers' rights across Kenya.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-teal-500 dark:text-teal-500 light:text-teal-600 mb-4">{member.title}</p>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="text-teal-500 dark:text-teal-500 light:text-teal-600 border-teal-500 dark:border-teal-500 light:border-teal-600 hover:bg-teal-500 hover:text-black rounded-full px-8 py-3"
            >
              <Link href="/team">
                View Full Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section ref={approachRef} className="py-20 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.approach ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Our Approach</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              To foster a dialogue between workers and the various actors who affect their working lives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-teal-500" />,
                title: "Rights-Based",
                description:
                  "We approach our work from a rights-based perspective, ensuring dignity and equality for all workers.",
              },
              {
                icon: <Users className="h-10 w-10 text-teal-500" />,
                title: "Collaborative",
                description:
                  "We believe in working together with all stakeholders to achieve meaningful and lasting change.",
              },
              {
                icon: <Scale className="h-10 w-10 text-teal-500" />,
                title: "Empowering",
                description: "We focus on building capacity and empowering workers to advocate for themselves.",
              },
            ].map((approach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible.approach ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="h-20 w-20 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-6">
                      {approach.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                      {approach.title}
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">{approach.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
