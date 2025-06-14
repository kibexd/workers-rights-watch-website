"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Users, Scale, Shield, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function OurProgramsPage() {
  const [isVisible, setIsVisible] = useState({
    intro: false,
    programs: false,
    achievements: false,
    methodology: false,
  })

  const introRef = useRef(null)
  const programsRef = useRef(null)
  const achievementsRef = useRef(null)
  const methodologyRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === introRef.current) {
            setIsVisible((prev) => ({ ...prev, intro: entry.isIntersecting }))
          } else if (entry.target === programsRef.current) {
            setIsVisible((prev) => ({ ...prev, programs: entry.isIntersecting }))
          } else if (entry.target === achievementsRef.current) {
            setIsVisible((prev) => ({ ...prev, achievements: entry.isIntersecting }))
          } else if (entry.target === methodologyRef.current) {
            setIsVisible((prev) => ({ ...prev, methodology: entry.isIntersecting }))
          }
        })
      },
      { threshold: 0.1 },
    )

    if (introRef.current) observer.observe(introRef.current)
    if (programsRef.current) observer.observe(programsRef.current)
    if (achievementsRef.current) observer.observe(achievementsRef.current)
    if (methodologyRef.current) observer.observe(methodologyRef.current)

    return () => {
      if (introRef.current) observer.unobserve(introRef.current)
      if (programsRef.current) observer.unobserve(programsRef.current)
      if (achievementsRef.current) observer.unobserve(achievementsRef.current)
      if (methodologyRef.current) observer.unobserve(methodologyRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pic6.jpg?height=600&width=1920"
            alt="Our Programs"
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
            <h1 className="text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-6">Our Programs</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl mx-auto">
              Discover how Workers Rights Watch is making a difference in the lives of workers across Kenya through our
              various programs and initiatives.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={introRef} className="py-20 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.intro ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative h-96 rounded-2xl overflow-hidden">
                    <Image
                      src="/ta7.jpg?height=600&width=800"
                      alt="Workers Rights Watch in action"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
                      Our Commitment to Workers' Rights
                    </h2>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6 leading-relaxed">
                      Since our establishment in 2000, Workers Rights Watch has been at the forefront of advocating for
                      workers' rights in Kenya. Our work is guided by a rights-based approach that emphasizes dignity,
                      equality, and justice for all workers.
                    </p>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6 leading-relaxed">
                      We believe that every worker deserves fair treatment, safe working conditions, and the opportunity
                      to voice their concerns without fear of reprisal. Through our various programs and initiatives, we
                      strive to create a more equitable workplace environment for all.
                    </p>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed">
                      Our approach combines direct support to workers, advocacy for policy change, research on labor
                      conditions, and education on workers' rights. By addressing these multiple dimensions, we aim to
                      create sustainable improvements in the lives of workers across Kenya.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section ref={programsRef} className="py-20 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.programs ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Our Programs</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              We implement a range of programs designed to address different aspects of workers' rights and needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-teal-500" />,
                title: "Worker Education Program",
                description:
                  "Educating workers about their rights under national and international labor laws through workshops, training sessions, and informational materials.",
                image: "/ep6copy.jpg?height=400&width=600",
              },
              {
                icon: <Scale className="h-10 w-10 text-teal-500" />,
                title: "Legal Support Services",
                description:
                  "Providing legal assistance to workers facing rights violations, unfair treatment, or unsafe working conditions through our network of pro bono lawyers.",
                image: "/rh5.jpg?height=400&width=600",
              },
              {
                icon: <FileText className="h-10 w-10 text-teal-500" />,
                title: "Research & Documentation",
                description:
                  "Conducting research on labor conditions and documenting violations to inform our advocacy and intervention strategies across various sectors.",
                image: "/rh3.jpg?height=400&width=600",
              },
              {
                icon: <Users className="h-10 w-10 text-teal-500" />,
                title: "Community Outreach",
                description:
                  "Engaging with communities to raise awareness about workers' rights and build solidarity networks for collective action and support.",
                image: "/ta1.jpg?height=400&width=600",
              },
              {
                icon: <Users className="h-10 w-10 text-teal-500" />,
                title: "Women's Economic Empowerment",
                description:
                  "Strengthening the agency, financial skills and capacity of women to make informed decisions, participate in decision making and make sustainable choices for themselves and their communities.",
                image: "/wfa4.jpeg?height=400&width=600",
              },
              {
                icon: <Shield className="h-10 w-10 text-teal-500" />,
                title: "Reproductive Health Program",
                description:
                  "Promoting access to information and services on menstrual and reproductive health enabling workers to lead healthy and productive lives.",
                image: "/rh6.jpg?height=400&width=600",
              },
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible.programs ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center mr-4">
                        {program.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 mb-6">{program.description}</p>
                    <Button
                      variant="outline"
                      className="text-teal-500 dark:text-teal-500 light:text-teal-600 border-teal-500 dark:border-teal-500 light:border-teal-600 hover:bg-teal-500 hover:text-black rounded-full"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={achievementsRef} className="py-20 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.achievements ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Key Achievements</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              Over the years, our work has led to significant improvements in workers' rights and conditions.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              // {
              //   year: "2022",
              //   title: "Improved Safety Standards in Manufacturing",
              //   description:
              //     "Our advocacy led to the implementation of enhanced safety protocols in 15 manufacturing plants, benefiting over 5,000 workers.",
              //   image: "/placeholder.svg?height=400&width=800",
              // },
              {
                year: "2024",
                title: "Fair Wages Campaign Success",
                description:
                  "Successfully advocated for fair wage policies in the agricultural sector, resulting in wage increases for more than 3,000 farm workers.",
                image: "/pic6.jpg?height=400&width=800",
              },
              {
                year: "2025",
                title: "Gender Equality in the Workplace Initiative",
                description:
                  "Launched a comprehensive program addressing gender-based discrimination in workplaces, reaching 25 companies and impacting over 7,000 women workers.",
                image: "/ta7.jpg?height=400&width=800",
              },
              // {
              //   year: "2015",
              //   title: "DelMonte Campaign Research",
              //   description:
              //     "Conducted groundbreaking research on labor conditions in Kenya's cut-flower industry, which informed subsequent advocacy efforts and policy changes.",
              //   image: "/placeholder.svg?height=400&width=800",
              // },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible.achievements ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="relative h-full md:col-span-1">
                      <Image
                        src={achievement.image || "/ep6.jpg"}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-teal-500 text-black font-medium px-3 py-1 text-sm">
                          <Calendar className="h-4 w-4 mr-1 inline-block" /> {achievement.year}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-8 md:col-span-2">
                      <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6">
                        {achievement.description}
                      </p>
                      <Button
                        variant="outline"
                        className="text-teal-500 dark:text-teal-500 light:text-teal-600 border-teal-500 dark:border-teal-500 light:border-teal-600 hover:bg-teal-500 hover:text-black rounded-full"
                      >
                        Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={methodologyRef} className="py-20 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.methodology ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Our Methodology</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              Our approach combines research, advocacy, education, and direct support to create lasting change.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible.methodology ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                {[
                  {
                    title: "Research-Based Approach",
                    description:
                      "We conduct thorough research to understand the challenges workers face and identify effective solutions.",
                  },
                  {
                    title: "Collaborative Partnerships",
                    description:
                      "We work with various stakeholders, including workers, employers, government agencies, and other NGOs.",
                  },
                  {
                    title: "Empowerment Through Education",
                    description:
                      "We believe in equipping workers with knowledge and skills to advocate for themselves.",
                  },
                  {
                    title: "Sustainable Solutions",
                    description:
                      "We focus on creating long-term, sustainable changes in policies, practices, and attitudes.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-black font-bold mr-4 mt-1 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible.methodology ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-6 -right-6 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/ep6.jpg?height=600&width=800"
                  alt="Our methodology in action"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-teal-500 text-black">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Get Involved</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              There are many ways you can support our work and contribute to the protection of workers' rights in Kenya.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                variant="default"
                className="bg-black hover:bg-gray-900 text-white font-medium rounded-full px-8 py-6 text-base"
              >
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-transparent border-black text-black hover:bg-black hover:text-white font-medium rounded-full px-8 py-6 text-base"
              >
                <Link href="/careers">Volunteer With Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 