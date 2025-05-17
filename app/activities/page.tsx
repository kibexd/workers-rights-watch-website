"use client"

import { useEffect, useRef, useState, JSX } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Users, Scale, FileText, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Activity {
  id: number
  title: string
  date: string
  location: string
  description: string
  image: string
  category: string
}

interface CurrentActivity {
  image: string
  title: string
  description: string
}

interface InterventionArea {
  icon: JSX.Element
  title: string
  description: string
}

export default function ActivitiesPage() {
  const [isVisible, setIsVisible] = useState<{
    activities: boolean
    interventions: boolean
    past: boolean
  }>({
    activities: false,
    interventions: false,
    past: false,
  })

  const activitiesRef = useRef<HTMLDivElement>(null)
  const interventionsRef = useRef<HTMLDivElement>(null)
  const pastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === activitiesRef.current) {
            setIsVisible((prev) => ({ ...prev, activities: entry.isIntersecting }))
          } else if (entry.target === interventionsRef.current) {
            setIsVisible((prev) => ({ ...prev, interventions: entry.isIntersecting }))
          } else if (entry.target === pastRef.current) {
            setIsVisible((prev) => ({ ...prev, past: entry.isIntersecting }))
          }
        })
      },
      { threshold: 0.1 },
    )

    if (activitiesRef.current) observer.observe(activitiesRef.current)
    if (interventionsRef.current) observer.observe(interventionsRef.current)
    if (pastRef.current) observer.observe(pastRef.current)

    return () => {
      if (activitiesRef.current) observer.unobserve(activitiesRef.current)
      if (interventionsRef.current) observer.unobserve(interventionsRef.current)
      if (pastRef.current) observer.unobserve(pastRef.current)
    }
  }, [])

  // Past activities data
  const pastActivities: Activity[] = [
    {
      id: 1,
      title: "DelMonte Campaign Research",
      date: "June 2015",
      location: "Thika, Kenya",
      description:
        "Conducted comprehensive research on labor conditions in Kenya's cut-flower industry, focusing on the DelMonte operations.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Research",
    },
    {
      id: 2,
      title: "Workers' Rights Workshop Series",
      date: "March - May 2018",
      location: "Nairobi, Kenya",
      description:
        "Organized a series of educational workshops for factory workers on their rights under Kenyan labor laws.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Education",
    },
    {
      id: 3,
      title: "Gender Equality in the Workplace Initiative",
      date: "September 2018 - February 2019",
      location: "Multiple locations, Kenya",
      description:
        "Launched a comprehensive program addressing gender-based discrimination in workplaces across various industries.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Advocacy",
    },
    {
      id: 4,
      title: "Fair Wages Campaign",
      date: "January - November 2020",
      location: "Agricultural regions, Kenya",
      description:
        "Advocated for fair wage policies in the agricultural sector, working with farm owners and labor representatives.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Campaign",
    },
    {
      id: 5,
      title: "Workplace Safety Standards Improvement",
      date: "March - December 2022",
      location: "Industrial areas, Kenya",
      description:
        "Collaborated with manufacturing plants to implement enhanced safety protocols and training programs.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Safety",
    },
    {
      id: 6,
      title: "Legal Aid Clinics for Workers",
      date: "Ongoing since 2016",
      location: "Various locations, Kenya",
      description:
        "Providing free legal consultation and representation to workers facing rights violations and unfair treatment.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Legal Support",
    },
  ]

  const currentActivities: CurrentActivity[] = [
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Worker Education Programs",
      description:
        "Educating workers about their rights, labor laws, and workplace safety through workshops and training sessions.",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Advocacy Campaigns",
      description:
        "Advocating for policy changes and improved labor laws to better protect workers' rights across various industries.",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Research & Documentation",
      description:
        "Conducting research on labor conditions and documenting violations to inform our advocacy and intervention strategies.",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Legal Support Services",
      description:
        "Providing legal assistance to workers facing rights violations, unfair treatment, or unsafe working conditions.",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Community Outreach",
      description:
        "Engaging with communities to raise awareness about workers' rights and build solidarity networks for collective action.",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Workplace Monitoring",
      description:
        "Monitoring workplace conditions and practices to ensure compliance with labor laws and standards.",
    },
  ]

  const interventionAreas: InterventionArea[] = [
    {
      icon: <Shield className="h-10 w-10 text-teal-500" />,
      title: "Labor Rights Education",
      description:
        "Educating workers about their rights under national and international labor laws and standards.",
    },
    {
      icon: <Users className="h-10 w-10 text-teal-500" />,
      title: "Workplace Safety",
      description: "Promoting safe and healthy working conditions across all industries and sectors.",
    },
    {
      icon: <Scale className="h-10 w-10 text-teal-500" />,
      title: "Fair Wages & Benefits",
      description: "Advocating for fair compensation, benefits, and working hours for all workers.",
    },
    {
      icon: <FileText className="h-10 w-10 text-teal-500" />,
      title: "Anti-Discrimination",
      description:
        "Combating workplace discrimination based on gender, ethnicity, disability, or other factors.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1920"
            alt="Our Activities"
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
            <h1 className="text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-6">Our Activities</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl mx-auto">
              Workers Rights Watch is committed to protecting and promoting the rights of workers through various
              initiatives and programs.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={activitiesRef} className="py-20 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.activities ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">
              Current Activities
            </h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              Our ongoing initiatives to protect and promote workers' rights across Kenya.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {currentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible.activities ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                      {activity.title}
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 mb-6">{activity.description}</p>
                    <Button variant="ghost" className="text-teal-500 hover:text-teal-400 p-0 h-auto">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={interventionsRef} className="py-20 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.interventions ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">
              Key Areas of Intervention
            </h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              Our strategic focus areas that guide our work and initiatives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {interventionAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible.interventions ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start">
                      <div className="h-16 w-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mr-6 flex-shrink-0">
                        {area.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                          {area.title}
                        </h3>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">{area.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.interventions ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Button
              asChild
              variant="default"
              className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full px-8 py-6 text-base"
            >
              <Link href="/contact">Get Involved</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section ref={pastRef} className="py-20 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.past ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Past Activities</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              A look back at our previous initiatives and their impact on workers' rights in Kenya.
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="justify-center mb-12 bg-transparent border border-gray-800 dark:border-gray-800 light:border-gray-200 rounded-full p-1 w-fit mx-auto">
              <TabsTrigger
                value="all"
                className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
              >
                All Activities
              </TabsTrigger>
              <TabsTrigger
                value="research"
                className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
              >
                Research
              </TabsTrigger>
              <TabsTrigger
                value="advocacy"
                className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
              >
                Advocacy
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
              >
                Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-3 gap-8">
                {pastActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isVisible.past ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.title}
                          fill
                          className="object-cover transition-transform hover:scale-105 duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-teal-500/80 text-black font-medium">{activity.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                          {activity.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 light:text-gray-600 mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{activity.date}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{activity.location}</span>
                        </div>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 mb-6">
                          {activity.description}
                        </p>
                        <Button
                          variant="outline"
                          className="text-teal-500 dark:text-teal-500 light:text-teal-600 border-teal-500 dark:border-teal-500 light:border-teal-600 hover:bg-teal-500 hover:text-black rounded-full"
                        >
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="research">
              <div className="grid md:grid-cols-3 gap-8">
                {pastActivities
                  .filter((activity) => activity.category === "Research")
                  .map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={isVisible.past ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={activity.image || "/placeholder.svg"}
                            alt={activity.title}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-teal-500/80 text-black font-medium">{activity.category}</Badge>
                          </div>
                        </div>
                        <CardContent className="p-8">
                          <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                            {activity.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 light:text-gray-600 mb-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{activity.date}</span>
                            <span className="mx-2">•</span>
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{activity.location}</span>
                          </div>
                          <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 mb-6">
                            {activity.description}
                          </p>
                          <Button
                            variant="outline"
                            className="text-teal-500 dark:text-teal-500 light:text-teal-600 border-teal-500 dark:border-teal-500 light:border-teal-600 hover:bg-teal-500 hover:text-black rounded-full"
                          >
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="advocacy">
              <div className="grid md:grid-cols-3 gap-8">
                {pastActivities
                  .filter((activity) => activity.category === "Advocacy" || activity.category === "Campaign")
                  .map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={isVisible.past ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={activity.image || "/placeholder.svg"}
                            alt={activity.title}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-teal-500/80 text-black font-medium">{activity.category}</Badge>
                          </div>
                        </div>
                        <CardContent className="p-8">
                          <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                            {activity.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 light:text-gray-600 mb-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{activity.date}</span>
                            <span className="mx-2">•</span>
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{activity.location}</span>
                          </div>
                          <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 mb-6">
                            {activity.description}
                          </p>
                          <Button
                            variant="outline"
                            className="text-teal-500 dark:text-teal-500 light:text-teal-600 border-teal-500 dark:border-teal-500 light:border-teal-600 hover:bg-teal-500 hover:text-black rounded-full"
                          >
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="education">
              <div className="grid md:grid-cols-3 gap-8">
                {pastActivities
                  .filter((activity) => activity.category === "Education")
                  .map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={isVisible.past ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={activity.image || "/placeholder.svg"}
                            alt={activity.title}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-teal-500/80 text-black font-medium">{activity.category}</Badge>
                          </div>
                        </div>
                        <CardContent className="p-8">
                          <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                            {activity.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 light:text-gray-600 mb-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{activity.date}</span>
                            <span className="mx-2">•</span>
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{activity.location}</span>
                          </div>
                          <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 mb-6">
                            {activity.description}
                          </p>
                          <Button
                            variant="outline"
                            className="text-teal-500 dark:text-teal-500 light:text-teal-600 border-teal-500 dark:border-teal-500 light:border-teal-600 hover:bg-teal-500 hover:text-black rounded-full"
                          >
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
