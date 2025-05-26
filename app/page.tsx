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

const partners = [
  { name: "ILO", logo: "/ilo.png", url: "https://www.ilo.org" },
  { name: "UN Women", logo: "/un-women.jpg", url: "https://www.unwomen.org" },
  { name: "Amnesty International", logo: "/amnesty.png", url: "https://www.amnesty.org" },
  { name: "Human Rights Watch", logo: "/hrw.png", url: "https://www.hrw.org" },
  { name: "Solidarity Center", logo: "/sc.png", url: "https://www.solidaritycenter.org" },
  { name: "Kenya Human Rights Commission", logo: "/khrc.png", url: "https://www.khrc.or.ke" },
  { name: "Federation of Kenya Employers", logo: "/foke.jpg", url: "https://www.fke-kenya.org" },
  { name: "Central Organization of Trade Unions", logo: "/cotu.jpg", url: "https://www.cotu-kenya.org" },
];

// Double the partners array to create seamless loop
const doubledPartners = [...partners, ...partners];

type AnimatedNumberProps = {
  target: number;
  isVisible: boolean;
  suffix?: string;
  className?: string;
};

function AnimatedNumber({ target, isVisible, suffix = '', className = '' }: AnimatedNumberProps) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));
    let raf: number | undefined;
    let mounted = true;
    function animate() {
      start += step;
      if (start >= target) {
        if (mounted) setCount(target);
      } else {
        if (mounted) setCount(start);
        raf = requestAnimationFrame(animate);
      }
    }
    animate();
    return () => {
      mounted = false;
      if (raf !== undefined) cancelAnimationFrame(raf);
    };
  }, [isVisible, target]);
  return <span className={className}>{count.toLocaleString()}{suffix}</span>;
}

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

  const [scrollPaused, setScrollPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      title: "Exchange Program Workshop",
      description: "Participants engaging in cross-cultural learning and workers' rights advocacy.",
      image: "/Exchange program pictures/ep1.jpg",
      category: "Exchange Program",
      location: "Nairobi, Kenya"
    },
    {
      id: 2,
      title: "Wildfire Farm Training",
      description: "Interactive session on workers' rights, human rights, and leadership development.",
      image: "/Wildfire farm awareness creation on workers rights,human rights,sexual harassment and leadership/wfa1.jpeg",
      category: "Training",
      location: "Wildfire Farm, Kenya"
    },
    {
      id: 3,
      title: "Reproductive Health Workshop",
      description: "Women workers participating in reproductive health and menstrual hygiene training.",
      image: "/Reproductive health and menstrual hygiene training at Black petal farm/rh1.jpg",
      category: "Health",
      location: "Black Petal Farm, Kenya"
    },
    {
      id: 4,
      title: "Gender Mainstreaming Training",
      description: "Training session on gender mainstreaming and sexual harassment prevention.",
      image: "/Training and awareness creation on gender mainstreaming ,sexual harassment and leadership at Margin par -Kariki Molo farm/ta1.jpg",
      category: "Gender Equality",
      location: "Margin Par-Kariki Molo Farm, Kenya"
    },
    {
      id: 5,
      title: "Exchange Program Group Activity",
      description: "Participants collaborating during the exchange program workshop.",
      image: "/Exchange program pictures/ep2.jpg",
      category: "Exchange Program",
      location: "Nairobi, Kenya"
    },
    {
      id: 6,
      title: "Leadership Development Session",
      description: "Farm workers engaging in leadership and rights awareness training.",
      image: "/Wildfire farm awareness creation on workers rights,human rights,sexual harassment and leadership/wfa2.jpeg",
      category: "Training",
      location: "Wildfire Farm, Kenya"
    },
    {
      id: 7,
      title: "Health Education Workshop",
      description: "Interactive session on reproductive health and workplace wellness.",
      image: "/Reproductive health and menstrual hygiene training at Black petal farm/rh2.jpg",
      category: "Health",
      location: "Black Petal Farm, Kenya"
    },
    {
      id: 8,
      title: "Gender Equality Training",
      description: "Workshop focusing on gender mainstreaming and workplace equality.",
      image: "/Training and awareness creation on gender mainstreaming ,sexual harassment and leadership at Margin par -Kariki Molo farm/ta2.jpg",
      category: "Gender Equality",
      location: "Margin Par-Kariki Molo Farm, Kenya"
    }
  ]

  // Example resource data for homepage preview (ensure images and downloadUrls are correct)
  const homepageResources = {
    articles: [
      {
        title: "Exchange Program Success",
        content: "Participants engaging in cross-cultural learning and workers' rights advocacy.",
        image: "/Exchange program pictures/ep1.jpg",
        category: "Exchange Program"
      },
      {
        title: "Wildfire Farm Training",
        content: "Comprehensive awareness creation on workers' rights, human rights, and leadership.",
        image: "/Wildfire farm awareness creation on workers rights,human rights,sexual harassment and leadership/wfa1.jpeg",
        category: "Training"
      },
      {
        title: "Reproductive Health Workshop",
        content: "Empowering women workers through reproductive health and menstrual hygiene training.",
        image: "/Reproductive health and menstrual hygiene training at Black petal farm/rh1.jpg",
        category: "Health"
      },
    ],
    reports: [
      {
        title: "Gender Mainstreaming Report",
        content: "Comprehensive training and awareness creation on gender mainstreaming and sexual harassment prevention.",
        image: "/reportpic4.png",
        downloadUrl: "/reports/gender-mainstreaming.pdf",
        category: "Gender Equality"
      },
      {
        title: "Workers' Rights Assessment",
        content: "Detailed analysis of workers' rights implementation and challenges in agricultural sector.",
        image: "/reportpic3.png",
        downloadUrl: "/reports/workers-rights-assessment.pdf",
        category: "Research"
      },
    ],
    videos: [
      {
        title: "Leadership Training Session",
        content: "Interactive leadership training session with farm workers and management.",
        image: "/Training and awareness creation on gender mainstreaming ,sexual harassment and leadership at Margin par -Kariki Molo farm/ta2.jpg",
        duration: "45:30",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        category: "Training"
      },
      {
        title: "Exchange Program Highlights",
        content: "Highlights from our successful exchange program promoting workers' rights.",
        image: "/Exchange program pictures/ep2.jpg",
        duration: "32:15",
        videoUrl: "https://www.youtube.com/watch?v=example2",
        category: "Exchange Program"
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.impact ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 text-white dark:text-white light:text-gray-900">Our Impact</h2>
            <p className="text-2xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto mb-12">
              For over two decades, we've been at the forefront of the labor rights movement in Kenya, driving meaningful change.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Impact Card 1 */}
            <Link href="/resources?tab=articles" className="group">
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)" }}
                className="bg-gradient-to-b from-[#181818] to-[#232526] rounded-3xl shadow-xl p-10 flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-2xl"
              >
                <div className="h-24 w-24 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6">
                  <Shield className="h-12 w-12 text-teal-500" />
                </div>
                <AnimatedNumber target={50000} isVisible={isVisible.impact} suffix="+" className="text-5xl font-extrabold text-white mb-2" />
                <h3 className="text-2xl font-bold text-white mb-2">Workers Empowered</h3>
                <p className="text-lg text-gray-400 mb-4">Through education, advocacy, and support, we've empowered over 50,000 workers to know and claim their rights.</p>
                <span className="text-teal-500 font-medium group-hover:underline">Read Article</span>
              </motion.div>
            </Link>
            {/* Impact Card 2 */}
            <Link href="/resources?tab=articles" className="group">
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)" }}
                className="bg-gradient-to-b from-[#181818] to-[#232526] rounded-3xl shadow-xl p-10 flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-2xl"
              >
                <div className="h-24 w-24 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6">
                  <Scale className="h-12 w-12 text-teal-500" />
                </div>
                <AnimatedNumber target={2500} isVisible={isVisible.impact} suffix="+" className="text-5xl font-extrabold text-white mb-2" />
                <h3 className="text-2xl font-bold text-white mb-2">Legal Cases Resolved</h3>
                <p className="text-lg text-gray-400 mb-4">We have successfully resolved over 2,500 legal cases, ensuring justice and fair treatment for workers.</p>
                <span className="text-teal-500 font-medium group-hover:underline">Read Article</span>
              </motion.div>
            </Link>
            {/* Impact Card 3 */}
            <Link href="/resources?tab=articles" className="group">
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)" }}
                className="bg-gradient-to-b from-[#181818] to-[#232526] rounded-3xl shadow-xl p-10 flex flex-col items-center text-center transition-all duration-300 cursor-pointer hover:shadow-2xl"
              >
                <div className="h-24 w-24 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6">
                  <Users className="h-12 w-12 text-teal-500" />
                </div>
                <AnimatedNumber target={200} isVisible={isVisible.impact} suffix="+" className="text-5xl font-extrabold text-white mb-2" />
                <h3 className="text-2xl font-bold text-white mb-2">Companies Engaged</h3>
                <p className="text-lg text-gray-400 mb-4">Over 200 companies have partnered with us to reform policies and improve workplace standards.</p>
                <span className="text-teal-500 font-medium group-hover:underline">Read Article</span>
              </motion.div>
            </Link>
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

      <section className="py-20 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]" style={{overflow: 'visible'}}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-4">Our Partners</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-2xl mx-auto">
              Working together with leading organizations to create lasting change in workers' rights
            </p>
          </div>
          <div className="relative w-full" style={{overflow: 'visible'}}>
            <div
              className={`flex gap-12 transition-all duration-500 ${
                scrollPaused ? 'pause-animation' : 'animate-scroll-x'
              }`}
              onMouseLeave={() => { setScrollPaused(false); setHoveredIndex(null); }}
              style={{overflow: 'visible'}}
            >
              {doubledPartners.map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="flex-shrink-0 relative group flex flex-col items-center justify-center w-64 h-40 bg-[#181818] rounded-3xl shadow-xl transition-all duration-300 cursor-pointer hover:shadow-2xl border border-[#232526]"
                  onMouseEnter={() => { setScrollPaused(true); setHoveredIndex(idx); }}
                  onMouseLeave={() => { setScrollPaused(false); setHoveredIndex(null); }}
                  onClick={() => window.open(partner.url, '_blank')}
                  tabIndex={0}
                  role="button"
                  aria-label={`Visit ${partner.name} website`}
                  style={{overflow: 'visible'}}
                >
                  <div className="flex items-center justify-center h-28 w-44">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="object-contain h-24 w-40 transition-transform duration-300"
                      style={{ pointerEvents: "none" }}
                    />
                  </div>
                  {/* Tooltip */}
                  {hoveredIndex === idx && (
                    <div className="absolute z-30 left-1/2 -translate-x-1/2 -top-14 bg-black/90 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium animate-fade-in whitespace-nowrap" style={{overflow: 'visible'}}>
                      {partner.name} <span className="text-teal-400 ml-2">Visit Website →</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll-x {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-x {
            animation: scroll-x 30s linear infinite;
          }
          .pause-animation {
            animation-play-state: paused;
          }
          .animate-fade-in {
            animation: fadeIn 0.2s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}</style>
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
