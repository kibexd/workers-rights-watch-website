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
import { ParallaxCarousel } from "@/components/parallax-carousel"
import { Tweet } from 'react-tweet';

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
  { name: "CIFCAD", logo: "/cifcad.png", url: "https://cifcad.org/" },
  { name: "Horticulture Advocacy Network", logo: "/horticulture_logo-2048x940.png", url: "https://horticultureadvocacynetwork.org/" }
];

// Double the partners array to create seamless loop
const doubledPartners = [...partners, ...partners];

// Define Hero Carousel items with enhanced data for parallax carousel
const heroItems = [
  {
    type: "image" as const,
    src: "/wfa4.jpeg",
    alt: "Workers in action",
    title: "Workers Empowerment",
    description: "Empowering farm workers with knowledge and rights awareness"
  },
  // {
  //   type: "video" as const,
  //   src: "/video1.MP4",
  //   alt: "Our work in action",
  //   title: "Training Sessions",
  //   description: "Interactive training on workers' rights and leadership"
  // },
  {
    type: "image" as const,
    src: "/pic6.jpg",
    alt: "Community engagement",
    title: "Community Engagement",
    description: "Building strong partnerships with local communities"
  },
  // {
  //   type: "video" as const,
  //   src: "/Gender1.mov",
  //   alt: "Gender equality training",
  //   title: "Gender Equality",
  //   description: "Promoting gender mainstreaming and equality in workplaces"
  // },
  {
    type: "image" as const,
    src: "/pic4.jpg",
    alt: "Training session",
    title: "Leadership Development",
    description: "Developing leadership skills among workers"
  },
  {
    type: "image" as const,
    src: "/ep3.jpg",
    alt: "Exchange program",
    title: "Exchange Programs",
    description: "Cross-cultural learning and knowledge sharing"
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

// Place this above the HomePage function
const tweetBlockquotes = [
  '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We’re working with farms to prevent sexual harassment and GBV by raising awareness, training managers ,supervisors&amp;workers on addressing sexual harassment. Every worker deserves a workplace free from violence.Together, we can stop harassment before it starts.<a href="https://twitter.com/hashtag/workersrights?src=hash&amp;ref_src=twsrc%5Etfw">#workersrights</a> <a href="https://t.co/9hhmWrHQc7">pic.twitter.com/9hhmWrHQc7</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href="https://twitter.com/Workersrights24/status/1943561978108117248?ref_src=twsrc%5Etfw">July 11, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We partner with flower farms to create inclusive workplaces where everyone regardless of gender has equal opportunity to learn, lead,&amp;thrive. Through training, policy support, &amp;ongoing dialogue, we promote fair treatment, prevent discrimination,&amp;strengthen worker voices. <a href="https://t.co/aeVMlFdFc3">pic.twitter.com/aeVMlFdFc3</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href="https://twitter.com/Workersrights24/status/1943215204394778639?ref_src=twsrc%5Etfw">July 10, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We work closely with flower farms to promote fair wages, safe working conditions,&amp;respect for workers' dignity.<br>Through this partnership, we have seen improved workplace safety standards@empowered workers to advocate for their rights. <a href="https://twitter.com/hivosroea?ref_src=twsrc%5Etfw">@hivosroea</a> <a href="https://twitter.com/Women_Win?ref_src=twsrc%5Etfw">@Women_Win</a> <a href="https://twitter.com/equalitynow?ref_src=twsrc%5Etfw">@equalitynow</a> <a href="https://twitter.com/hashtag/rights?src=hash&amp;ref_src=twsrc%5Etfw">#rights</a> <a href="https://t.co/0TdQfJ7vCX">pic.twitter.com/0TdQfJ7vCX</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href="https://twitter.com/Workersrights24/status/1937408354214904151?ref_src=twsrc%5Etfw">June 24, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
  `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Behind every flower picked is a woman who deserves dignity, respect &amp;protection. Workers Rights Watch is helping Gender Based Violence survivors on Kenya's flower farms reclaim their voices&amp;their rights through partnering with pro-bono lawyers for legal support.<a href="https://twitter.com/hashtag/workersrights?src=hash&amp;ref_src=twsrc%5Etfw">#workersrights</a> <a href="https://t.co/dhY1ThfC1I">pic.twitter.com/dhY1ThfC1I</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href="https://twitter.com/Workersrights24/status/1937041562208207145?ref_src=twsrc%5Etfw">June 23, 2025</a></blockquote>`,
  `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Workers Rights Watch conducts legal awareness sessions where female and male workers are empowered with confidence and knowledge to advocate for their rights and seek legal support without fear of retaliation.<a href="https://twitter.com/hashtag/Workersrights?src=hash&amp;ref_src=twsrc%5Etfw">#Workersrights</a><a href="https://twitter.com/hashtag/Endsexualharassment?src=hash&amp;ref_src=twsrc%5Etfw">#Endsexualharassment</a><a href="https://twitter.com/hashtag/Womenrights?src=hash&amp;ref_src=twsrc%5Etfw">#Womenrights</a><a href="https://twitter.com/hashtag/EndVAWG?src=hash&amp;ref_src=twsrc%5Etfw">#EndVAWG</a> <a href="https://t.co/Uv07A8n2kD">pic.twitter.com/Uv07A8n2kD</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href="https://twitter.com/Workersrights24/status/1935238546622697572?ref_src=twsrc%5Etfw">June 18, 2025</a></blockquote>`,
  `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🎉21 flower farms. Diverse voices with one united mission: To advocate for worker rights&amp;gender equality in the flower industry. <br>By raising awareness&amp;building capacity, workers&amp;farm managements are actively working to eradicate harassment&amp;promote safe working environments.✊ <a href="https://t.co/3KoN5lW9HY">pic.twitter.com/3KoN5lW9HY</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href="https://twitter.com/Workersrights24/status/1932696380755354058?ref_src=twsrc%5Etfw">June 11, 2025</a></blockquote>`,
  `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">✊Day 2 of the exchange program, allowed participants from 21 flower farms share best practices on gender mainstreaming and sexual harassment prevention,strengthening the capacity of workers&amp;management to build equitable workplaces where everyone thrives. <a href="https://twitter.com/hashtag/Workersrights?src=hash&amp;ref_src=twsrc%5Etfw">#Workersrights</a> <a href="https://t.co/NFj6XYa4vS">pic.twitter.com/NFj6XYa4vS</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href="https://twitter.com/Workersrights24/status/1932322602951004583?ref_src=twsrc%5Etfw">June 10, 2025</a></blockquote>`,
  `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">♀️We recently conducted an exchange program that brought together representatives from 21 flower farms for a powerful knowledge sharing platform .✊They shared their experiences&amp;collaboratively developed solutions to end sexual harassment&amp; improve working conditions. <a href="https://t.co/q1JQhhh0TH">pic.twitter.com/q1JQhhh0TH</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href="https://twitter.com/Workersrights24/status/1931998461647282604?ref_src=twsrc%5Etfw">June 9, 2025</a></blockquote>`,
];

function TweetCard({ author, handle, avatar, date, text, image, tweetUrl, blockquote }: {
  author: string;
  handle: string;
  avatar: string;
  date: string;
  text: string;
  image?: string;
  tweetUrl: string;
  blockquote?: string;
}) {
  return (
    <div className="glass shadow-elevated rounded-2xl p-6 flex flex-col items-start max-w-[370px] min-h-[420px] relative">
      <div className="flex items-center mb-3">
        <img src={avatar} alt={author} className="h-10 w-10 rounded-full mr-3 border border-muted" />
        <div>
          <div className="font-bold text-foreground leading-tight">{author}</div>
          <div className="text-muted-foreground text-sm">{handle}</div>
        </div>
      </div>
      <div className="text-muted-foreground text-xs mb-2">{date}</div>
      <div className="text-foreground text-base mb-3 flex-1 whitespace-pre-line">{text}</div>
      {image && (
        <img src={image} alt="Tweet media" className="rounded-xl w-full object-cover mb-3 max-h-40" />
      )}
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center py-2 text-teal-500 font-medium hover:underline rounded-xl bg-teal-500/10 mt-auto"
      >
        View on X
      </a>
      {/* Hidden blockquote for SEO */}
      {blockquote && (
        <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: blockquote }} />
      )}
    </div>
  );
}

// Place this above the HomePage function

const tweetData = [
  {
    author: 'Workersrightswatch',
    handle: '@Workersrights24',
    avatar: '/placeholder-logo.png',
    date: 'Jun 11, 2025',
    text: `🎉21 flower farms. Diverse voices with one united mission: To advocate for worker rights & gender equality in the flower industry.\nBy raising awareness & building capacity, workers & farm managements are actively working to eradicate harassment & promote safe working environments.`,
    image: '/tweet1.jpg', // Replace with actual image or leave undefined
    tweetUrl: 'https://twitter.com/Workersrights24/status/1932696380755354058',
    blockquote: `<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">🎉21 flower farms. Diverse voices with one united mission: To advocate for worker rights&amp;gender equality in the flower industry. <br>By raising awareness&amp;building capacity, workers&amp;farm managements are actively working to eradicate harassment&amp;promote safe working environments.✊ <a href=\"https://t.co/3KoN5lW9HY\">pic.twitter.com/3KoN5lW9HY</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href=\"https://twitter.com/Workersrights24/status/1932696380755354058?ref_src=twsrc%5Etfw\">June 11, 2025</a></blockquote>`
  },
  {
    author: 'Workersrightswatch',
    handle: '@Workersrights24',
    avatar: '/placeholder-logo.png',
    date: 'Jun 10, 2025',
    text: `✊Day 2 of the exchange program, allowed participants from 21 flower farms share best practices on gender mainstreaming and sexual harassment prevention, strengthening the capacity of workers & management to build equitable workplaces where everyone thrives. #Workersrights`,
    image: '/tweet2.jpg',
    tweetUrl: 'https://twitter.com/Workersrights24/status/1932322602951004583',
    blockquote: `<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">✊Day 2 of the exchange program, allowed participants from 21 flower farms share best practices on gender mainstreaming and sexual harassment prevention,strengthening the capacity of workers&amp;management to build equitable workplaces where everyone thrives. <a href=\"https://twitter.com/hashtag/Workersrights?src=hash&amp;ref_src=twsrc%5Etfw\">#Workersrights</a> <a href=\"https://t.co/NFj6XYa4vS\">pic.twitter.com/NFj6XYa4vS</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href=\"https://twitter.com/Workersrights24/status/1932322602951004583?ref_src=twsrc%5Etfw\">June 10, 2025</a></blockquote>`
  },
  {
    author: 'Workersrightswatch',
    handle: '@Workersrights24',
    avatar: '/placeholder-logo.png',
    date: 'Jun 9, 2025',
    text: `♀️We recently conducted an exchange program that brought together representatives from 21 flower farms for a powerful knowledge sharing platform.✊ They shared their experiences & collaboratively developed solutions to end sexual harassment & improve working conditions.`,
    image: '/tweet3.jpg',
    tweetUrl: 'https://twitter.com/Workersrights24/status/1931998461647282604',
    blockquote: `<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">♀️We recently conducted an exchange program that brought together representatives from 21 flower farms for a powerful knowledge sharing platform .✊They shared their experiences&amp;collaboratively developed solutions to end sexual harassment&amp; improve working conditions. <a href=\"https://t.co/q1JQhhh0TH\">pic.twitter.com/q1JQhhh0TH</a></p>&mdash; Workersrightswatch (@Workersrights24) <a href=\"https://twitter.com/Workersrights24/status/1931998461647282604?ref_src=twsrc%5Etfw\">June 9, 2025</a></blockquote>`
  },
  // Add more tweets as needed
];

// Map tweet IDs to their dates (ISO format for easy sorting)
const tweetIdDateMap = [
  { id: '1943561978108117248', date: '2025-07-11' },
  { id: '1943215204394778639', date: '2025-07-10' },
  { id: '1937408354214904151', date: '2025-06-24' },
  { id: '1937041562208207145', date: '2025-06-23' },
  { id: '1932696380755354058', date: '2025-06-11' },
  { id: '1932322602951004583', date: '2025-06-10' },
  { id: '1931998461647282604', date: '2025-06-09' },
  { id: '1935238546622697572', date: '2025-06-18' },
  // Add more as needed
];

// Sort by date descending (latest first)
const tweetIds = tweetIdDateMap
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .map((item) => item.id);

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

  // Add state for visible tweets
  const [visibleTweets, setVisibleTweets] = useState(3);
  const tweetSectionRef = useRef<HTMLDivElement>(null);

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
    // {
    //   id: 5,
    //   title: "Exchange Program Group Activity",
    //   description: "Participants collaborating during the exchange program workshop.",
    //   image: "/Exchange program pictures/ep2.jpg",
    //   category: "Exchange Program",
    //   location: "Nairobi, Kenya"
    // },
    // {
    //   id: 6,
    //   title: "Leadership Development Session",
    //   description: "Farm workers engaging in leadership and rights awareness training.",
    //   image: "/Wildfire farm awareness creation on workers rights,human rights,sexual harassment and leadership/wfa2.jpeg",
    //   category: "Training",
    //   location: "Wildfire Farm, Kenya"
    // },
    // {
    //   id: 7,
    //   title: "Health Education Workshop",
    //   description: "Interactive session on reproductive health and workplace wellness.",
    //   image: "/Reproductive health and menstrual hygiene training at Black petal farm/rh2.jpg",
    //   category: "Health",
    //   location: "Black Petal Farm, Kenya"
    // },
    // {
    //   id: 8,
    //   title: "Gender Equality Training",
    //   description: "Workshop focusing on gender mainstreaming and workplace equality.",
    //   image: "/Training and awareness creation on gender mainstreaming ,sexual harassment and leadership at Margin par -Kariki Molo farm/ta2.jpg",
    //   category: "Gender Equality",
    //   location: "Margin Par-Kariki Molo Farm, Kenya"
    // }
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
        title: "Sexual harassment life in the horticultural industry",
        content: "Interactive leadership training session with farm workers and management.",
        image: "/Training and awareness creation on gender mainstreaming ,sexual harassment and leadership at Margin par -Kariki Molo farm/ta2.jpg",
        duration: "45:30",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        category: "Gender Equality"
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
          className="w-64 h-52 bg-card rounded-2xl flex items-center justify-center px-6 cursor-pointer border border-border transition-all duration-300"
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
            <p className="text-foreground text-sm font-medium opacity-70 transition-opacity duration-300 hover:opacity-100 mt-auto">
              {partner.name}
            </p>
            {/* Visit button that appears on hover */}
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="inline-flex items-center text-teal-500 text-xs font-medium mt-1"
            >
              Visit Website
              <ArrowRight className="h-3 w-3 ml-1" />
            </motion.span>
          </div>
        </motion.div>
      </div>
    );
  };

  // Handler for Load More
  const handleLoadMore = () => {
    setVisibleTweets((prev) => Math.min(prev + 3, tweetIds.length));
  };
  // Handler for Clear
  const handleClearTweets = () => {
    setVisibleTweets(3);
    if (tweetSectionRef.current) {
      tweetSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* 1. Marquee just below the main nav */}
      <div className="w-full bg-gradient-to-r from-teal-400 via-white to-orange-400 py-2 border-b-2 border-neutral-900 overflow-hidden relative z-30">
        <div className="relative w-full h-10">
          <div className="absolute top-0 left-0 w-full h-full flex items-center whitespace-nowrap animate-marquee-continuous">
            <span className="font-bold text-xl md:text-2xl tracking-wide text-black mx-8">
              Workers Rights Watch • Empowering Workers • Dignity • Equality • Justice • WRW Impact • Safe Workplaces • Gender Equality • Legal Support • Community • Advocacy •
            </span>
            <span className="font-bold text-xl md:text-2xl tracking-wide text-black mx-8">
              Workers Rights Watch • Empowering Workers • Dignity • Equality • Justice • WRW Impact • Safe Workplaces • Gender Equality • Legal Support • Community • Advocacy •
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section with full background bands */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-20 flex flex-row items-center justify-between w-full h-full">
          {/* Hero Text Left */}
          <div className="flex-1 flex flex-col justify-center items-start max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-bold mb-6 text-foreground leading-tight drop-shadow-sm" style={{letterSpacing: '-0.01em'}}>
                Championing Workers&apos; Rights in the Modern Era
              </h1>
              <p className="text-xl mb-8 text-muted-foreground leading-relaxed">
                Empowering laborers, fostering ethical practices, and shaping a fair work environment since 2000.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  variant="default"
                  className="gradient-button text-white font-medium rounded-2xl px-8 py-6 text-base shadow-elevated transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link href="/about">Our Mission</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="text-teal border-teal-500 hover:bg-peach hover:text-orange rounded-2xl px-8 py-6 text-base border-2 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/contact">Get Involved</Link>
                </Button>
              </div>
            </motion.div>
          </div>
          {/* Parallax Carousel Box Right */}
          <div className="flex-shrink-0 w-full max-w-[900px] h-[480px] md:h-[600px] border-2 border-neutral-900 rounded-2xl bg-white/60 backdrop-blur-md overflow-hidden flex items-center justify-center ml-8">
            <div className="relative w-full h-full flex items-center justify-center">
              <ParallaxCarousel 
                items={heroItems}
                autoAdvance={true}
                interval={4000}
              />
            </div>
          </div>
        </div>
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ChevronRight className="h-10 w-10 text-foreground/60 rotate-90" />
          </motion.div>
        </div>
      </section>

      <section ref={missionRef} className="py-24 bg-background mb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.mission ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Focus Areas</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                icon: <ArrowRight className="h-8 w-8 text-teal-500" />,
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
                <Card className="bg-card border-2 border-neutral-900 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="h-16 w-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {/* Separate Legal Support and Access to Justice as its own card/row */}
            <motion.div
              key="legal-support-access-justice"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible.mission ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 4 * 0.2 }}
              className="lg:col-span-3"
            >
              <Card className="bg-card border-2 border-neutral-900 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 mt-8">
                <CardContent className="p-8">
                  <div className="h-16 w-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6">
                    <FileText className="h-8 w-8 text-teal-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Legal Support and Access to Justice
                  </h3>
                  <p className="text-muted-foreground">
                    Providing legal awareness, representation, and support to ensure justice and protection of workers rights. Focusing on access to legal remedies for violations such as unfair dismissal, discrimination, gender-based violence/sexual harassment, and land or property rights violations. Strengthening legal literacy, links communities to justice systems, and promotes accountability and rule of law.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={impactRef} className="py-32 bg-secondary mb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.impact ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6 text-foreground">Our Impact</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
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
                className="group relative overflow-hidden rounded-2xl bg-card border-2 border-neutral-900"
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
                      className="text-4xl font-extrabold text-foreground"
                    />
                    <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-teal-500/20">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.label}</h3>
                  <p className="text-base text-muted-foreground">{item.description}</p>
                  
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
      <section ref={galleryRef} className="py-24 bg-background mb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.gallery ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Photo Gallery</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                      className="relative h-64 rounded-xl overflow-hidden cursor-pointer group border-2 border-neutral-900"
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
                  <DialogContent className="bg-card border-0 rounded-2xl max-w-4xl p-0">
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
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {selectedImage?.title}
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <p className="text-teal-500">{selectedImage?.location}</p>
                        <Badge className="bg-teal-500/80 text-black font-medium">{selectedImage?.category}</Badge>
                      </div>
                      <p className="text-muted-foreground">
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
              className="text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-black rounded-full px-8 py-3"
            >
              <Link href="/resources?tab=images">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      <section ref={resourcesRef} className="py-24 bg-secondary mb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.resources ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Latest Resources</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access our collection of articles, reports, and videos on workers&apos; rights and labor issues.
            </p>
          </motion.div>

          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="justify-center mb-12 bg-transparent border border-border rounded-full p-1 w-fit mx-auto">
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
                    <Card className="bg-card border-2 border-neutral-900 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500 border-2 border-neutral-900"
                        />
                      </div>
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">{item.content}</p>
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
                    <Card className="bg-card border-2 border-neutral-900 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500 border-2 border-neutral-900"
                        />
                      </div>
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">{item.content}</p>
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
                    <Card className="bg-card border-2 border-neutral-900 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
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
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">{item.content}</p>
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
              className="text-teal-500 hover:text-teal-400"
            >
              <Link href="/resources">
                View All Resources <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section (properly structured) */}
      <section className="py-24 bg-background mb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Partners</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Working together with leading organizations to create lasting change in workers' rights
            </p>
          </motion.div>

          {/* Scroll Direction Toggle */}
          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              className="text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-black rounded-full px-6 py-2"
              onClick={() => setScrollDirection(scrollDirection === 'left' ? 'right' : 'left')}
              aria-label="Toggle scroll direction"
            >
              <ArrowLeftRight className="h-4 w-4 mr-2" /> Scroll {scrollDirection === 'left' ? 'Right' : 'Left'}
            </Button>
          </div>

          <div className="relative mx-auto max-w-[95vw]">
            {/* Gradient fade on left side */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />

            {/* Gradient fade on right side */}
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

            {/* Main scrolling container */}
            <div 
              className="overflow-hidden relative" 
              style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
            >
              <div 
                id="partner-scroll"
                className={`flex gap-8 py-8 ${scrollDirection === 'left' ? 'animate-scroll-partners' : 'animate-scroll-partners-reverse'}`}
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
      </section>

      {/* Twitter Feed Section */}
      <section className="py-24 bg-background" ref={tweetSectionRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Latest Updates</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow our latest activities and updates on X (Twitter)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto pb-8">
            {tweetIds.slice(0, visibleTweets).map((id) => (
              <div key={id} className="glass shadow-elevated rounded-2xl p-4 flex flex-col items-center max-w-[370px] min-h-[420px] mx-auto">
                <Tweet id={id} />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            {visibleTweets < tweetIds.length && (
              <Button
                onClick={handleLoadMore}
                className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full px-8 py-3 shadow-elevated"
              >
                Load More
              </Button>
            )}
            {visibleTweets > 3 && (
              <Button
                onClick={handleClearTweets}
                variant="outline"
                className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-black rounded-full px-8 py-3 shadow-elevated"
              >
                Clear Tweets
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-teal-500 text-black mt-16">
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
