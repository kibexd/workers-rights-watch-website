"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ChevronRight, Shield, Users, Scale, ImageIcon, FileText, Download } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState({
    mission: false,
    impact: false,
    resources: false,
    gallery: false,
  })

  type GalleryImage = {
    id: number
    title: string
    description: string
    image: string
    category: string
    location: string
  }

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const missionRef = useRef(null)
  const impactRef = useRef(null)
  const resourcesRef = useRef(null)
  const galleryRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === missionRef.current) {
            setIsVisible((prev) => ({ ...prev, mission: entry.isIntersecting }))
          } else if (entry.target === impactRef.current) {
            setIsVisible((prev) => ({ ...prev, impact: entry.isIntersecting }))
          } else if (entry.target === resourcesRef.current) {
            setIsVisible((prev) => ({ ...prev, resources: entry.isIntersecting }))
          } else if (entry.target === galleryRef.current) {
            setIsVisible((prev) => ({ ...prev, gallery: entry.isIntersecting }))
          }
        })
      },
      { threshold: 0.1 },
    )

    if (missionRef.current) observer.observe(missionRef.current)
    if (impactRef.current) observer.observe(impactRef.current)
    if (resourcesRef.current) observer.observe(resourcesRef.current)
    if (galleryRef.current) observer.observe(galleryRef.current)

    return () => {
      if (missionRef.current) observer.unobserve(missionRef.current)
      if (impactRef.current) observer.unobserve(impactRef.current)
      if (resourcesRef.current) observer.unobserve(resourcesRef.current)
      if (galleryRef.current) observer.unobserve(galleryRef.current)
    }
  }, [])

  // Gallery images data
  const galleryImages = [
    {
      id: 1,
      title: "Worker Education Workshop",
      description: "Workers participating in our rights education workshop in Nairobi.",
      image: "/pic1.jpg",
      category: "Events",
      location: "Nairobi, Kenya",
    },
    {
      id: 2,
      title: "Community Outreach Program",
      description: "Our team engaging with local communities to raise awareness about labor rights.",
      image: "/pic2.jpg",
      category: "Outreach",
      location: "Mombasa, Kenya",
    },
    {
      id: 3,
      title: "Annual Conference 2023",
      description: "Participants at our annual conference discussing the future of labor rights in Kenya.",
      image: "/pic3.jpg",
      category: "Events",
      location: "Nairobi, Kenya",
    },
    {
      id: 4,
      title: "Women's Rights Workshop",
      description: "Women workers learning about their rights and gender equality in the workplace.",
      image: "/pic4.jpg",
      category: "Gender Equality",
      location: "Kisumu, Kenya",
    },
  ]

  // Example resource data for homepage preview (ensure images and downloadUrls are correct)
  const homepageResources = {
    articles: [
      {
        title: "Women's Freedom to Work",
        content: "Addressing workplace harassment and promoting gender equality.",
        image: "/pic2.jpg", // Example image path
      },
      {
        title: "The Future of Labor Unions",
        content: "Exploring the evolving role of unions in the modern workplace.",
        image: "/pic3.jpg", // Example image path
      },
      {
        title: "Workers' Rights in Digital Age",
        content: "How technology is reshaping labor rights and workplace dynamics.",
        image: "/pic4.jpg", // Example image path
      },
    ],
    reports: [
      {
        title: "Annual Impact Report 2023",
        content:
          "Our comprehensive report on the progress and impact of our initiatives over the past year.",
        image: "/pic2.jpg", // Example image path
        downloadUrl: "/cli-handbook.pdf", // Example download URL
      },
      {
        title: "Labor Rights Violations in Kenya",
        content: "A detailed analysis of labor rights violations across different sectors in Kenya.",
        image: "/pic3.jpg", // Example image path
        downloadUrl: "/report2.docx", // Example download URL
      },
    ],
    videos: [
      {
        title: "Workers' Rights Awareness",
        content: "An educational video on basic workers' rights and how to assert them.",
        image: "/pic2.jpg", // Example image path
        duration: "15:24",
        videoUrl: "https://www.youtube.com/watch?v=example1", // Example YouTube URL
      },
      {
        title: "Interview: Labor Movement Leaders",
        content: "Interviews with key figures in Kenya's labor movement discussing current challenges.",
        image: "/pic3.jpg", // Example image path
        duration: "28:45",
        videoUrl: "https://www.youtube.com/watch?v=example2", // Example YouTube URL
      },
    ],
  }

  interface HandleImageClick {
    (image: GalleryImage): void
  }

  const handleImageClick: HandleImageClick = (image) => {
    setSelectedImage(image)
  }

  // Add handleVideoClick for homepage videos
  const handleVideoClick = (videoUrl: string) => {
    if (videoUrl) {
      window.open(videoUrl, "_blank");
    }
  }

   // Add handleDownload for homepage reports
  const handleDownload = (downloadUrl: string, title: string) => {
    if (downloadUrl) {
      const link = document.createElement("a") as HTMLAnchorElement;
      if (link) {
        link.href = downloadUrl;
        link.download = title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pic1.jpg?height=1080&width=1920"
            alt="Workers in action"
            fill
            className="object-cover opacity-40 dark:opacity-40 light:opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A] dark:from-black/70 dark:via-black/50 dark:to-[#0A0A0A] light:from-white/70 light:via-white/50 light:to-[#F8F9FA]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl font-bold mb-6 text-white dark:text-white light:text-gray-900 leading-tight">
              Championing Workers&apos; Rights in the Modern Era
            </h1>
            <p className="text-xl mb-8 text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed">
              Empowering laborers, fostering ethical practices, and shaping a fair work environment since 2000.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                variant="default"
                className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full px-8 py-6 text-base"
              >
                <Link href="/about">Our Mission</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-white dark:text-white light:text-gray-700 border-white dark:border-white light:border-gray-700 hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black light:hover:bg-gray-700 light:hover:text-white rounded-full px-8 py-6 text-base"
              >
                <Link href="/contact">Get Involved</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ChevronRight className="h-10 w-10 text-white dark:text-white light:text-gray-900 rotate-90" />
          </motion.div>
        </div>
      </section>

      <section ref={missionRef} className="py-24 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.mission ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Our Focus Areas</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              We&apos;re dedicated to creating a world where every worker is treated with dignity, respect, and
              fairness.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-teal-500" />,
                title: "Workers' Rights",
                content: "Ensuring fair treatment and safe working conditions for all employees.",
              },
              {
                icon: <Users className="h-8 w-8 text-teal-500" />,
                title: "Gender Equality",
                content: "Promoting equal opportunities and addressing workplace discrimination.",
              },
              {
                icon: <Scale className="h-8 w-8 text-teal-500" />,
                title: "Ethical Practices",
                content: "Advocating for responsible business conduct and corporate accountability.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible.mission ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="h-16 w-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">{item.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={impactRef} className="py-24 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible.impact ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/pic1.jpg?height=600&width=800"
                  alt="Workers in action"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible.impact ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-white dark:text-white light:text-gray-900">Our Impact</h2>
              <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700">
                For over two decades, we&apos;ve been at the forefront of the labor rights movement in Kenya, driving
                meaningful change.
              </p>
              <div className="space-y-6 mt-8">
                {[
                  "Our team brings extensive experience from various labor rights movements, providing first-hand insights into workers' issues.",
                  "We develop and implement projects in consultation with partners, ensuring targeted interventions in areas of need.",
                  "Through diverse engagement methods, we've expanded our focus to address both direct and indirect issues affecting labor and gender rights.",
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible.impact ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                    className="flex items-start"
                  >
                    <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center text-black font-bold mr-4 mt-1 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">{point}</p>
                  </motion.div>
                ))}
              </div>
              <Button
                asChild
                variant="default"
                className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full px-8 py-6 text-base mt-6"
              >
                <Link href="/activities">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section ref={galleryRef} className="py-24 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.gallery ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Photo Gallery</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              Explore images from our activities, events, and community engagements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.gallery ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                      onClick={() => handleImageClick(image)}
                    >
                      <Image
                        src={image.image || "/pic1.jpg"}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="h-12 w-12 rounded-full bg-teal-500 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-black" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-teal-500/80 text-black font-medium">{image.category}</Badge>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-2xl max-w-4xl p-0">
                    <DialogTitle className="sr-only">
                      {selectedImage?.title || "Gallery image"}
                    </DialogTitle>
                    <div className="relative h-[60vh]">
                      <Image
                        src={selectedImage?.image || "/eunice.jpg"}
                        alt={selectedImage?.title || "Gallery image"}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                        {selectedImage?.title}
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <p className="text-teal-500 dark:text-teal-500 light:text-teal-600">
                          {selectedImage?.location}
                        </p>
                        <Badge className="bg-teal-500/80 text-black font-medium">{selectedImage?.category}</Badge>
                      </div>
                      <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">
                        {selectedImage?.description}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="text-teal-500 dark:text-teal-500 light:text-teal-600 border-teal-500 dark:border-teal-500 light:border-teal-600 hover:bg-teal-500 hover:text-black rounded-full px-8 py-3"
            >
              <Link href="/resources?tab=images">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      <section ref={resourcesRef} className="py-24 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.resources ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Latest Resources</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              Access our collection of articles, reports, and videos on workers&apos; rights and labor issues.
            </p>
          </motion.div>

          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="justify-center mb-12 bg-transparent border border-gray-800 dark:border-gray-800 light:border-gray-200 rounded-full p-1 w-fit mx-auto">
              <TabsTrigger
                value="articles"
                className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
              >
                Articles
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
              >
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
              >
                Videos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
              <div className="grid md:grid-cols-3 gap-8">
                {homepageResources.articles.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isVisible.resources ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 mb-6">{item.content}</p>
                        <Button variant="ghost" className="text-teal-500 hover:text-teal-400 p-0 h-auto">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="grid md:grid-cols-2 gap-8">
                {homepageResources.reports.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isVisible.resources ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 mb-6">{item.content}</p>
                        <Button
                          variant="default"
                          className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full"
                          onClick={() => handleDownload(item.downloadUrl, item.title)}
                        >
                          <Download className="mr-2 h-4 w-4" /> Download Report
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 gap-8">
                {homepageResources.videos.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isVisible.resources ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                      <div
                        className="relative h-56 overflow-hidden cursor-pointer"
                        onClick={() => handleVideoClick(item.videoUrl)}
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="h-16 w-16 rounded-full bg-teal-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-8 h-8 text-black ml-1"
                            >
                              <path d="M8 5.14v14l11-7-11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded-md">
                          {item.duration}
                        </div>
                      </div>
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 mb-6">{item.content}</p>
                        <Button
                          variant="default"
                          className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full"
                          onClick={() => handleVideoClick(item.videoUrl)}
                        >
                          Watch Video
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="ghost"
              className="text-teal-500 hover:text-teal-400 dark:text-teal-500 dark:hover:text-teal-400 light:text-teal-600 light:hover:text-teal-700"
            >
              <Link href="/resources">
                View All Resources <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-teal-500 text-black">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Join Our Cause</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Support our mission to protect and promote workers&apos; rights in Kenya. Your contribution makes a
              difference.
            </p>
            <Button
              asChild
              variant="default"
              className="bg-black hover:bg-gray-900 text-white font-medium rounded-full px-8 py-6 text-base"
            >
              <Link href="/donate">Donate Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
