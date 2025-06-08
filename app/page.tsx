"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ChevronRight, Shield, Users, Scale, ImageIcon, FileText, Download, Twitter, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ArrowLeftRight } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import dynamic from "next/dynamic"
import { HeroCarousel } from "@/components/hero-carousel"

const partners = [
  { name: "Anti-Slavery International", logo: "/asi.jpg", url: "https://www.antislavery.org/" },
  { name: "FEMNET", logo: "/femnet.png", url: "https://www.femnet.org/" },
  { name: "Women Win", logo: "/womenwin.png", url: "https://www.womenwin.org/" },
  { name: "Hivos", logo: "/hivos.png", url: "https://hivos.org/" },
  { name: "Women Working World Wide", logo: "/www.jpeg", url: "https://www.women-ww.org/" },
  { name: "FIDA-Kenya", logo: "/fida.jpeg", url: "https://fidakenya.org/" },
  { name: "Kenya Flower Council", logo: "/kfc.png", url: "https://kenyaflowercouncil.org/" },
  { name: "Equality Now", logo: "/equalitynow.png", url: "https://equalitynow.org/" },
  { name: "Haki Mashinani", logo: "/hakimashinani.jpeg", url: "https://www.hakimashinanikenya.org/" },
  { name: "Fair Trade Africa", logo: "/fta.png", url: "https://fairtradeafrica.net/" },
  { name: "Rainforest Alliance", logo: "/rainforest.png", url: "https://www.rainforest-alliance.org/" },
  { name: "Ufadhili Trust", logo: "/ufadhili.png", url: "https://www.ufadhilitrust.org/" },
  { name: "Kenya Human Rights Commission", logo: "/khrc.png", url: "https://khrc.or.ke/" },
  { name: "Women Empowerment Link", logo: "/wel.jpeg", url: "https://wel.or.ke/" },
  { name: "CREAW", logo: "/creaw.png", url: "https://home.creaw.org/" },
  { name: "Business and Human Rights Resource Center", logo: "/bhrc.png", url: "https://www.business-humanrights.org/en/latest-news/kenya/" },
  { name: "CIFCAD", logo: "/cifcad.png", url: "https://cifcad.org/" }
];

// Double the partners array to create seamless loop
const doubledPartners = [...partners, ...partners];

// Define Hero Carousel items
const heroItems = [
  {
    type: "image" as const,
    src: "/wfa4.jpeg",
    alt: "Workers in action",
  },
  {
    type: "video" as const,
    src: "/video1.MP4", // Ensure this path is correct and video exists
    alt: "Our work in action",
    videoUrl: "/video1.MP4",
  },
  {
    type: "image" as const,
    src: "/pic6.jpg",
    alt: "Community engagement",
  },
  {
    type: "video" as const,
    src: "/Gender1.mov", // Ensure this path is correct and video exists
    alt: "Our work in action",
    videoUrl: "/Gender1.mov",
  },
  {
    type: "image" as const,
    src: "/pic3.jpg",
    alt: "Training session",
  },
  {
    type: "video" as const,
    src: "/Gender1.mov", // Ensure this path is correct and video exists
    alt: "Our work in action",
    videoUrl: "/Gender1.mov",
  },
];

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

const TwitterEmbed = dynamic(() => import('@/components/TwitterEmbed'), { ssr: false });

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
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('left'); // State for scroll direction

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
        image: "/Exchange program pictures/ep2.jpg",
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
        title: "Workers Rights Watch: Improving Labor Conditions in Horticulture Report",
        content: "How Workers Rights Watch Transformed Labor Conditions Across The Horticultural Sector.",
        image: "/reportpic5.png",
        downloadUrl: "/How Workers Rights Watch Transformed Labor Conditions Across The Horticultural Sector. Article ..pdf",
        category: "Gender Equality"
      },
      {
        title: "WRW Impact Report",
        content: "Women's Freedom to Work: Unmasking Sexual Harassment at Workplace",
        image: "/reportpic6.png",
        downloadUrl: "/WRW Impact Report - Final Version.pdf",
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

  // Define the PartnerCard component inside HomePage
  const PartnerCard = ({ 
    partner, 
    onHoverStart, 
    onHoverEnd 
  }: { 
    partner: { name: string; logo: string; url: string }; 
    onHoverStart: () => void; 
    onHoverEnd: () => void;
  }) => {
    return (
      <div
        className="flex-shrink-0 relative"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onClick={() => window.open(partner.url, '_blank')}
        tabIndex={0}
        role="button"
        aria-label={`Visit ${partner.name} website`}
      >
        <motion.div
          whileHover={{ 
            y: -8, 
            boxShadow: "0 20px 30px rgba(0,0,0,0.3)",
            borderColor: '#3a3a3a' 
          }}
          className="w-64 h-52 bg-[#121212] rounded-2xl flex items-center justify-center px-6 cursor-pointer border border-[#282828] transition-all duration-300"
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            {/* Logo container with fixed dimensions and centered content */}
            <div className="w-48 h-36 flex items-center justify-center mb-2 relative">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                style={{ objectFit: "contain" }}
                className="transition-all duration-300"
              />
            </div>
            {/* Partner name always visible */}
            <p className="text-white text-sm font-medium opacity-70 transition-opacity duration-300 hover:opacity-100 mt-auto">
              {partner.name}
            </p>
            {/* Visit button that appears on hover */}
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="inline-flex items-center text-teal-400 text-xs font-medium mt-1"
            >
              Visit Website
              <ArrowRight className="h-3 w-3 ml-1" />
            </motion.span>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          {/* Hero Carousel in the background */}
          <HeroCarousel items={heroItems} autoplayInterval={5500} />
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

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
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

          {/* Masonry layout for focus areas */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 w-full max-w-6xl mx-auto space-y-8">
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
                title: "Health and Well-Being",
                content: "Promoting access to information and services on menstrual and reproductive health enabling workers to lead healthy and productive lives.",
              },
              {
                icon: <Users className="h-8 w-8 text-teal-500" />,
                title: "Women Economic Empowerment",
                content: "Strengthening the agency, financial skills and capacity of women to make informed decisions, participate in decision making and make sustainable choices for themselves and their communities.",
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

      <section ref={impactRef} className="py-32 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.impact ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6 text-white dark:text-white light:text-gray-900">Our Impact</h2>
            <p className="text-2xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto mb-12">
              For over two decades, we&apos;ve been at the forefront of the labor rights movement in Kenya, driving meaningful change.
            </p>
          </motion.div>

          {/* 2x2 Grid Layout - Adjusted card size and spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                number: 50000,
                label: "Workers Empowered",
                description: "Through education, awareness, advocacy and support, we have empowered over 50,000+ workers to know and claim their rights.",
                image: "/pic1.jpg",
                icon: <Users className="h-8 w-8 text-teal-500" />
              },
              {
                number: 1500,
                label: "Legal Cases Resolved",
                description: "Successfully resolved over 1,500 legal cases, ensuring justice for workers across Kenya.",
                image: "/pic8.jpg",
                icon: <Scale className="h-8 w-8 text-teal-500" />
              },
              {
                number: 50,
                label: "Farms Engaged",
                description: "Partnered with 50+ farms to implement fair labor practices and improve working conditions.",
                image: "/Training and awareness creation on gender mainstreaming ,sexual harassment and leadership at Margin par -Kariki Molo farm/ta2.jpg",
                icon: <Shield className="h-8 w-8 text-teal-500" />
              },
              {
                number: 5000,
                label: "Women Trained",
                description: "Trained over 5,000 women on Reproductive Health and Menstrual Hygiene.",
                image: "/wfa4.jpeg",
                icon: <Users className="h-8 w-8 text-teal-500" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible.impact ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl bg-[#181818]"
              >
                {/* Image Container */}
                <div className="relative h-52 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Content Container */}
                <div className="p-6">
                  {/* Stats and Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <AnimatedNumber
                      target={item.number}
                      isVisible={isVisible.impact}
                      suffix="+"
                      className="text-4xl font-extrabold text-white"
                    />
                    <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-teal-500/20">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{item.label}</h3>
                  <p className="text-base text-gray-400">{item.description}</p>
                  
                  {/* Button */}
                  <div className="mt-5">
                    <span className="inline-flex items-center text-teal-500 font-medium group-hover:underline">
                      Read Success Stories
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
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

      {/* Partners Section (properly structured) */}
      <section className="py-24 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA] overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-4">Our Partners</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-2xl mx-auto">
              Working together with leading organizations to create lasting change in workers' rights
            </p>
          </motion.div>

          {/* Scroll Direction Toggle */}
          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              className="text-teal-500 dark:text-teal-500 light:text-teal-600 border-teal-500 dark:border-teal-500 light:border-teal-600 hover:bg-teal-500 hover:text-black rounded-full px-6 py-2"
              onClick={() => setScrollDirection(scrollDirection === 'left' ? 'right' : 'left')}
              aria-label="Toggle scroll direction"
            >
              <ArrowLeftRight className="h-4 w-4 mr-2" /> Scroll {scrollDirection === 'left' ? 'Right' : 'Left'}
            </Button>
          </div>

          <div className="relative mx-auto max-w-[95vw]">
            {/* Gradient fade on left side */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />

            {/* Gradient fade on right side */}
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none" />

            {/* Main scrolling container */}
            <div 
              className="overflow-hidden relative" 
              style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
            >
              <div 
                id="partner-scroll"
                className="flex gap-8 py-8"
                style={{ 
                  width: 'fit-content'
                }}
              >
                {/* First set of partners */}
                {partners.map((partner, idx) => (
                  <PartnerCard
                    key={`first-${partner.name}-${idx}`} 
                    partner={partner} 
                    onHoverStart={() => {
                      // Find the element and pause animation
                      const scrollEl = document.getElementById('partner-scroll');
                      if (scrollEl) scrollEl.classList.add('paused');
                    }}
                    onHoverEnd={() => {
                      // Find the element and resume animation
                      const scrollEl = document.getElementById('partner-scroll');
                      if (scrollEl) scrollEl.classList.remove('paused');
                    }}
                  />
                ))}
                
                {/* Second set of partners (duplicate for seamless looping) */}
                {partners.map((partner, idx) => (
                  <PartnerCard
                    key={`second-${partner.name}-${idx}`} 
                    partner={partner} 
                    onHoverStart={() => {
                      // Find the element and pause animation
                      const scrollEl = document.getElementById('partner-scroll');
                      if (scrollEl) scrollEl.classList.add('paused');
                    }}
                    onHoverEnd={() => {
                      // Find the element and resume animation
                      const scrollEl = document.getElementById('partner-scroll');
                      if (scrollEl) scrollEl.classList.remove('paused');
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          #partner-scroll {
            animation: ${scrollDirection === 'left' ? 'scrollLeft' : 'scrollRight'} 50s linear infinite;
          }
          
          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes scrollRight {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0%);
            }
          }
          
          #partner-scroll.paused {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Twitter Feed Section */}
      <section className="py-24 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-white light:text-gray-900">Latest Updates</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto">
              Follow our latest activities and updates on X (Twitter)
            </p>
          </motion.div>

          {/* X/Twitter embed, beautifully styled with dynamic widget script */}
          <div
            className="columns-1 sm:columns-2 lg:columns-3 gap-8 w-full max-w-6xl mx-auto space-y-8 pb-8"
          >
            <TwitterEmbed
              tweetHtml={`<blockquote class=\"twitter-tweet\" data-media-max-width=\"560\"><p lang=\"en\" dir=\"ltr\">Other activities we do;<br>✓Advocating for fair compensation benefits and working hours for all workers.<br>✓Combating workplace discrimination based on gender,ethnicity,disability or other factors.<a href=\"https://twitter.com/hashtag/Endviolence?src=hash&amp;ref_src=twsrc%5Etfw\">#Endviolence</a><a href=\"https://twitter.com/hashtag/workersrights?src=hash&amp;ref_src=twsrc%5Etfw\">#workersrights</a> <a href=\"https://twitter.com/hashtag/WomensRightsAreHumanRights?src=hash&amp;ref_src=twsrc%5Etfw\">#WomensRightsAreHumanRights</a> <a href=\"https://t.co/AezPwhRa9h\">pic.twitter.com/AezPwhRa9h</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href=\"https://twitter.com/Workersrights24/status/1927265182041899063?ref_src=twsrc%5Etfw\">May 27, 2025</a></blockquote>`}
              className="break-inside-avoid mb-8"
            />
            <TwitterEmbed
              tweetHtml={`<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">Talking about periods matters🩸🩸🩸🩸💃✨<br><br>When women learn about their bodies&amp;their rights ,they are more likely to take care of themselves with confidence&amp;dignity.♀️🩸<br>We create awareness on menstrual health hygiene management to women in flower farms.🩸🩸<a href=\"https://twitter.com/hashtag/periodpositive?src=hash&amp;ref_src=twsrc%5Etfw\">#periodpositive</a> <a href=\"https://t.co/vaAvUkyczd\">pic.twitter.com/vaAvUkyczd</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href=\"https://twitter.com/Workersrights24/status/1925454159983055129?ref_src=twsrc%5Etfw\">May 22, 2025</a></blockquote>`}
              className="break-inside-avoid mb-8"
            />
            <TwitterEmbed
              tweetHtml={`<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">At Worker&#39;s Rights Watch ,we believe in empowering workers by letting their voices lead the way.Through open,guided discussions based on what participants want to learn,we create space for workers to advocate for&amp; defend their rights confidently&amp;collectively.<a href=\"https://twitter.com/hashtag/Workersrights?src=hash&amp;ref_src=twsrc%5Etfw\">#Workersrights</a> <a href=\"https://t.co/432F1a5EkH\">pic.twitter.com/432F1a5EkH</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href=\"https://twitter.com/Workersrights24/status/1921825887516811650?ref_src=twsrc%5Etfw\">May 12, 2025</a></blockquote>`}
              className="break-inside-avoid mb-8"
            />
            {/* Add more <TwitterEmbed ... /> here for more posts */}
          </div>

          {/* Beautiful animated Apple-style Follow button */}
          <div className="text-center mt-12">
            <a
              href="https://x.com/Workersrights24"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center group
                         relative px-10 py-6 mt-3 rounded-full
                         bg-[#101720] border border-teal-500 text-teal-400
                         font-bold text-base shadow-lg overflow-hidden
                         transition-all duration-300
                         focus:outline-none
                         hover:ring-2 hover:ring-teal-400 hover:bg-[#0a222a]
                         "
              style={{
                boxShadow: "0 0 28px 0 #10bfae46"
              }}
            >
              {/* Glowing animated ring */}
              <span className="absolute inset-0 pointer-events-none rounded-full
                  animate-pulse
                  bg-gradient-to-r from-teal-500/20 via-teal-500/10 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <span className="relative flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow @Workersrights24
              </span>
            </a>
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
