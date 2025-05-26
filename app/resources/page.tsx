"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Search, ImageIcon, X, ChevronLeft, ChevronRight, MapPin, Filter } from "lucide-react"
import { motion } from "framer-motion"

interface Resource {
  id: number
  title: string
  date: string
  category: string
  content?: string
}

interface Article extends Resource {
  excerpt: string
  image: string
}

interface Report extends Resource {
  description: string
  fileSize: string
  image: string
  downloadUrl: string
}

interface Video extends Resource {
  description: string
  duration: string
  thumbnail: string
  videoUrl: string
}

interface ImageResource extends Resource {
  description: string
  image: string
  location: string
  content?: string
}

interface Resources {
  articles: Article[]
  reports: Report[]
  videos: Video[]
  images: ImageResource[]
}

interface ActiveFilters {
  articles: string[]
  reports: string[]
  videos: string[]
  images: string[]
}

type Image = ImageResource;

const tabs = [
  { id: "articles", label: "Articles" },
  { id: "reports", label: "Reports" },
  { id: "videos", label: "Videos" },
  { id: "images", label: "Photo Gallery" },
]

export default function ResourcesPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("articles")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    articles: [],
    reports: [],
    videos: [],
    images: [],
  })
  const [filteredResources, setFilteredResources] = useState<Resources>({
    articles: [],
    reports: [],
    videos: [],
    images: [],
  })
  const [selectedImage, setSelectedImage] = useState<ImageResource | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  // Example resources data
  const resources: Resources = {
    articles: [
      {
        id: 1,
        title: "Exchange Program Success Story",
        date: "March 15, 2024",
        excerpt: "A transformative exchange program bringing together workers from different regions to share experiences and best practices.",
        image: "/Exchange program pictures/ep1.jpg",
        category: "Exchange Program",
        content: "Our exchange program has successfully facilitated cross-cultural learning and workers' rights advocacy. Participants from different regions came together to share their experiences, challenges, and solutions in promoting workers' rights. The program included workshops, site visits, and collaborative projects that strengthened the workers' rights movement across different communities."
      },
      {
        id: 2,
        title: "Wildfire Farm Training Initiative",
        date: "February 28, 2024",
        excerpt: "Comprehensive training program addressing workers' rights, human rights, and leadership development.",
        image: "/Wildfire farm awareness creation on workers rights,human rights,sexual harassment and leadership/wfa1.jpeg",
        category: "Training",
        content: "The Wildfire Farm training initiative has been instrumental in raising awareness about workers' rights, human rights, and leadership. Through interactive sessions and practical workshops, participants gained valuable insights into their rights and responsibilities, while developing essential leadership skills to advocate for better working conditions."
      },
      {
        id: 3,
        title: "Reproductive Health Workshop",
        date: "January 20, 2024",
        excerpt: "Empowering women workers through comprehensive reproductive health and menstrual hygiene training.",
        image: "/Reproductive health and menstrual hygiene training at Black petal farm/rh1.jpg",
        category: "Health",
        content: "Our reproductive health workshop at Black Petal Farm has been a significant step in promoting women's health and well-being in the workplace. The program covered essential topics including menstrual hygiene, reproductive health rights, and workplace accommodations for women's health needs."
      },
      {
        id: 4,
        title: "The Future of Labor Unions",
        date: "December 12, 2023",
        excerpt: "Exploring the evolving role of unions in the modern workplace and economy.",
        image: "/pic1.jpg",
        category: "Unions",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
      },
      {
        id: 5,
        title: "Workplace Safety Standards",
        date: "November 5, 2023",
        excerpt: "An overview of essential safety standards that every workplace should implement.",
        image: "/pic2.jpg",
        category: "Safety",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
      },
      {
        id: 6,
        title: "Fair Wages Campaign",
        date: "October 18, 2023",
        excerpt: "Advocating for fair compensation and benefits for workers across all sectors.",
        image: "/pic3.jpg",
        category: "Campaigns",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
      },
    ],
    reports: [
      {
        id: 7,
        title: "Gender Mainstreaming Report 2024",
        date: "January 15, 2024",
        description: "Comprehensive analysis of gender mainstreaming initiatives and sexual harassment prevention programs.",
        fileSize: "2.4 MB",
        image: "/Training and awareness creation on gender mainstreaming ,sexual harassment and leadership at Margin par -Kariki Molo farm/ta1.jpg",
        category: "Gender Equality",
        content: "This report details our comprehensive approach to gender mainstreaming and sexual harassment prevention in agricultural workplaces. It includes case studies, best practices, and recommendations for creating safer and more inclusive work environments.",
        downloadUrl: "/reports/gender-mainstreaming-2024.pdf"
      },
      {
        id: 8,
        title: "Workers' Rights Assessment 2024",
        date: "November 30, 2023",
        description: "Detailed analysis of workers' rights implementation and challenges in the agricultural sector.",
        fileSize: "3.1 MB",
        image: "/Wildfire farm awareness creation on workers rights,human rights,sexual harassment and leadership/wfa2.jpeg",
        category: "Research",
        content: "Our latest assessment of workers' rights implementation in the agricultural sector reveals both progress and ongoing challenges. The report provides detailed analysis and recommendations for improving working conditions and protecting workers' rights.",
        downloadUrl: "/reports/workers-rights-assessment-2024.pdf"
      },
      {
        id: 9,
        title: "Gender Equality in the Workplace",
        date: "October 10, 2023",
        description: "Research findings on gender equality issues in Kenyan workplaces.",
        fileSize: "1.8 MB",
        image: "/pic2.jpg",
        category: "Gender Equality",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
        downloadUrl: "/report3.pdf",
      },
      {
        id: 10,
        title: "Occupational Health and Safety Report",
        date: "August 22, 2023",
        description: "Assessment of workplace safety conditions and recommendations for improvement.",
        fileSize: "2.7 MB",
        image: "/pic3.jpg",
        category: "Safety",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
        downloadUrl: "/report4.pdf",
      },
    ],
    videos: [
      {
        id: 11,
        title: "Leadership Training Session Highlights",
        date: "February 5, 2024",
        description: "Interactive leadership training session with farm workers and management.",
        duration: "45:30",
        thumbnail: "/Training and awareness creation on gender mainstreaming ,sexual harassment and leadership at Margin par -Kariki Molo farm/ta2.jpg",
        category: "Training",
        content: "This video captures the highlights of our leadership training session, showcasing the interactive workshops and discussions that helped participants develop essential leadership skills for advocating workers' rights.",
        videoUrl: "https://www.youtube.com/watch?v=example1"
      },
      {
        id: 12,
        title: "Exchange Program Documentary",
        date: "December 18, 2023",
        description: "Documentary showcasing the impact of our exchange program on workers' rights advocacy.",
        duration: "32:15",
        thumbnail: "/Exchange program pictures/ep2.jpg",
        category: "Exchange Program",
        content: "This documentary follows the journey of participants in our exchange program, highlighting how cross-cultural learning and collaboration have strengthened the workers' rights movement across different regions.",
        videoUrl: "https://www.youtube.com/watch?v=example2"
      },
      {
        id: 13,
        title: "Workplace Safety Training",
        date: "October 5, 2023",
        description: "A comprehensive guide to workplace safety protocols and best practices.",
        duration: "22:10",
        thumbnail: "/pic2.jpg",
        category: "Safety",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
        videoUrl: "https://www.youtube.com/watch?v=example3",
      },
      {
        id: 14,
        title: "Gender Equality in the Workplace",
        date: "September 12, 2023",
        description: "Addressing gender discrimination and promoting equality in professional settings.",
        duration: "19:35",
        thumbnail: "/pic3.jpg",
        category: "Gender Equality",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
        videoUrl: "https://www.youtube.com/watch?v=example4",
      },
    ],
    images: [
      {
        id: 15,
        title: "Exchange Program Workshop",
        date: "March 20, 2024",
        description: "Participants engaging in cross-cultural learning and workers' rights advocacy.",
        image: "/Exchange program pictures/ep3.jpg",
        category: "Exchange Program",
        location: "Nairobi, Kenya"
      },
      {
        id: 16,
        title: "Wildfire Farm Training Session",
        date: "February 15, 2024",
        description: "Interactive training session on workers' rights and leadership development.",
        image: "/Wildfire farm awareness creation on workers rights,human rights,sexual harassment and leadership/wfa3.jpeg",
        category: "Training",
        location: "Wildfire Farm, Kenya"
      },
      {
        id: 17,
        title: "Reproductive Health Workshop",
        date: "December 5, 2023",
        description: "Women workers participating in reproductive health and menstrual hygiene training.",
        image: "/Reproductive health and menstrual hygiene training at Black petal farm/rh2.jpg",
        category: "Health",
        location: "Black Petal Farm, Kenya"
      },
      {
        id: 18,
        title: "Gender Mainstreaming Training",
        date: "November 10, 2023",
        description: "Training session on gender mainstreaming and sexual harassment prevention.",
        image: "/Training and awareness creation on gender mainstreaming ,sexual harassment and leadership at Margin par -Kariki Molo farm/ta3.jpg",
        category: "Gender Equality",
        location: "Margin Par-Kariki Molo Farm, Kenya"
      },
      {
        id: 19,
        title: "Legal Aid Clinic",
        date: "October 25, 2023",
        description: "Our legal team providing free consultation to workers facing rights violations.",
        image: "/pic4.jpg",
        category: "Legal Support",
        location: "Nakuru, Kenya",
      },
      {
        id: 20,
        title: "Advocacy Campaign Launch",
        date: "September 18, 2023",
        description: "Launch of our new advocacy campaign for fair wages across all sectors.",
        image: "/eunice.jpg",
        category: "Campaigns",
        location: "Nairobi, Kenya",
      },
    ],
  }

  // Get unique categories for each resource type
  const getCategories = (resourceType: keyof Resources): string[] => {
    const categories = [...new Set(resources[resourceType].map((item) => item.category))]
    return categories
  }

  const articleCategories = getCategories("articles")
  const reportCategories = getCategories("reports")
  const videoCategories = getCategories("videos")
  const imageCategories = getCategories("images")

  // Clear search function
  const clearSearch = () => {
    setSearchQuery("")
    // Apply filters immediately after clearing search
    setTimeout(() => applyFilters(), 0)
  }

  // Clear filter function
  const clearFilter = (category: string, resourceType: keyof ActiveFilters) => {
    setActiveFilters((prev) => {
      const currentFilters = [...prev[resourceType]]
      const updatedFilters = currentFilters.filter((filter) => filter !== category)
      const newFilters = { ...prev, [resourceType]: updatedFilters }

      // Apply the updated filters immediately
      setTimeout(() => applyFilters(newFilters), 0)

      return newFilters
    })
  }

  // Clear all filters function
  const clearAllFilters = (resourceType: keyof ActiveFilters) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev, [resourceType]: [] }

      // Apply the updated filters immediately
      setTimeout(() => applyFilters(newFilters), 0)

      return newFilters
    })
  }

  useEffect(() => {
    // Initialize with all resources
    setFilteredResources(resources)

    // Check if there's a tab parameter in the URL
    const tabParam = searchParams.get("tab")
    if (tabParam && tabs.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  const handleSearch = () => {
    setIsSearching(true)
    applyFilters()
  }

  const applyFilters = (customFilters: ActiveFilters | null = null) => {
    setIsSearching(true)

    // Use provided custom filters or current active filters
    const filtersToApply = customFilters || activeFilters

    const query = searchQuery.toLowerCase().trim()

    // Filter articles
    const filteredArticles = resources.articles.filter((article) => {
      const matchesSearch =
        query === "" ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)

      const matchesFilter = filtersToApply.articles.length === 0 || filtersToApply.articles.includes(article.category)

      return matchesSearch && matchesFilter
    })

    // Filter reports
    const filteredReports = resources.reports.filter((report) => {
      const matchesSearch =
        query === "" ||
        report.title.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query)

      const matchesFilter = filtersToApply.reports.length === 0 || filtersToApply.reports.includes(report.category)

      return matchesSearch && matchesFilter
    })

    // Filter videos
    const filteredVideos = resources.videos.filter((video) => {
      const matchesSearch =
        query === "" ||
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query)

      const matchesFilter = filtersToApply.videos.length === 0 || filtersToApply.videos.includes(video.category)

      return matchesSearch && matchesFilter
    })

    // Filter images
    const filteredImages = resources.images.filter((image) => {
      const matchesSearch =
        query === "" ||
        image.title.toLowerCase().includes(query) ||
        image.description.toLowerCase().includes(query) ||
        image.location.toLowerCase().includes(query)

      const matchesFilter = filtersToApply.images.length === 0 || filtersToApply.images.includes(image.category)

      return matchesSearch && matchesFilter
    })

    setFilteredResources({
      articles: filteredArticles,
      reports: filteredReports,
      videos: filteredVideos,
      images: filteredImages,
    })

    setTimeout(() => {
      setIsSearching(false)
    }, 300)
  }

  const toggleFilter = (category: string, resourceType: keyof ActiveFilters) => {
    setActiveFilters((prev) => {
      const currentFilters = [...prev[resourceType]]

      if (currentFilters.includes(category)) {
        // Remove the filter if it's already active
        const updatedFilters = currentFilters.filter((filter) => filter !== category)
        const newFilters = { ...prev, [resourceType]: updatedFilters }

        // Apply the updated filters immediately
        setTimeout(() => applyFilters(newFilters), 0)

        return newFilters
      } else {
        // Add the filter if it's not active
        const updatedFilters = [...currentFilters, category]
        const newFilters = { ...prev, [resourceType]: updatedFilters }

        // Apply the updated filters immediately
        setTimeout(() => applyFilters(newFilters), 0)

        return newFilters
      }
    })
  }

  const handleImageClick = (image: ImageResource, index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
      setSelectedImage(filteredResources.images[currentImageIndex - 1])
    }
  }

  const handleNextImage = () => {
    if (currentImageIndex < filteredResources.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
      setSelectedImage(filteredResources.images[currentImageIndex + 1])
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Update URL with the tab parameter
    const url = new URL(window.location.href)
    url.searchParams.set("tab", value)
    window.history.pushState({}, "", url)
  }

  // Handle Enter key press in search input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Handle video click to open in new tab
  const handleVideoClick = (videoUrl: string) => {
    if (videoUrl) {
      window.open(videoUrl, "_blank")
    }
  }

  // Handle report download
  const handleDownload = (downloadUrl: string, title: string) => {
    if (downloadUrl) {
      // Create an anchor element and trigger download
      const link = document.createElement("a") as HTMLAnchorElement
      if (link) {
        link.href = downloadUrl
        link.download = title
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA] transition-colors duration-300">
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pic2.jpg?height=600&width=1920"
            alt="Resources"
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
            <h1 className="text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
              Articles & Resources
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl mx-auto">
              Access our collection of articles, reports, videos, and images on workers' rights, labor laws, and
              workplace issues.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA] transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-12 max-w-3xl mx-auto">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 light:text-gray-500 h-5 w-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search resources..."
                  className="pl-12 pr-10 bg-[#111111] dark:bg-[#111111] light:bg-white border-0 rounded-full h-14 text-white dark:text-white light:text-gray-900 focus:ring-2 focus:ring-teal-500 w-full"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-white light:text-gray-500 light:hover:text-gray-900"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <Button
                variant="default"
                className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full h-14 px-8 w-full md:w-auto"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
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
                    Searching...
                  </div>
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="justify-center mb-8 bg-transparent border border-gray-800 dark:border-gray-800 light:border-gray-200 rounded-full p-1 w-fit mx-auto">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="rounded-full px-8 py-2 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Filter chips for each tab */}
              <div className="mb-8">
                {activeTab === "articles" && articleCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="flex items-center text-gray-400 dark:text-gray-400 light:text-gray-600 mr-2">
                      <Filter className="h-4 w-4 mr-1" /> Filter by:
                    </span>
                    {articleCategories.map((category) => (
                      <Badge
                        key={category}
                        className={`cursor-pointer flex items-center ${
                          activeFilters.articles.includes(category)
                            ? "bg-teal-500 text-black"
                            : "bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:bg-teal-500/20"
                        }`}
                      >
                        <span onClick={() => toggleFilter(category, "articles")} className="px-2 py-1">
                          {category}
                        </span>
                        {activeFilters.articles.includes(category) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              clearFilter(category, "articles")
                            }}
                            className="ml-1 hover:bg-black/20 rounded-full p-0.5"
                            aria-label={`Remove ${category} filter`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {activeFilters.articles.length > 0 && (
                      <button
                        onClick={() => clearAllFilters("articles")}
                        className="ml-2 text-sm text-teal-500 hover:text-teal-400 flex items-center"
                        aria-label="Clear all filters"
                      >
                        Clear all <X className="h-3 w-3 ml-1" />
                      </button>
                    )}
                  </div>
                )}

                {activeTab === "reports" && reportCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="flex items-center text-gray-400 dark:text-gray-400 light:text-gray-600 mr-2">
                      <Filter className="h-4 w-4 mr-1" /> Filter by:
                    </span>
                    {reportCategories.map((category) => (
                      <Badge
                        key={category}
                        className={`cursor-pointer flex items-center ${
                          activeFilters.reports.includes(category)
                            ? "bg-teal-500 text-black"
                            : "bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:bg-teal-500/20"
                        }`}
                      >
                        <span onClick={() => toggleFilter(category, "reports")} className="px-2 py-1">
                          {category}
                        </span>
                        {activeFilters.reports.includes(category) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              clearFilter(category, "reports")
                            }}
                            className="ml-1 hover:bg-black/20 rounded-full p-0.5"
                            aria-label={`Remove ${category} filter`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {activeFilters.reports.length > 0 && (
                      <button
                        onClick={() => clearAllFilters("reports")}
                        className="ml-2 text-sm text-teal-500 hover:text-teal-400 flex items-center"
                        aria-label="Clear all filters"
                      >
                        Clear all <X className="h-3 w-3 ml-1" />
                      </button>
                    )}
                  </div>
                )}

                {activeTab === "videos" && videoCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="flex items-center text-gray-400 dark:text-gray-400 light:text-gray-600 mr-2">
                      <Filter className="h-4 w-4 mr-1" /> Filter by:
                    </span>
                    {videoCategories.map((category) => (
                      <Badge
                        key={category}
                        className={`cursor-pointer flex items-center ${
                          activeFilters.videos.includes(category)
                            ? "bg-teal-500 text-black"
                            : "bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:bg-teal-500/20"
                        }`}
                      >
                        <span onClick={() => toggleFilter(category, "videos")} className="px-2 py-1">
                          {category}
                        </span>
                        {activeFilters.videos.includes(category) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              clearFilter(category, "videos")
                            }}
                            className="ml-1 hover:bg-black/20 rounded-full p-0.5"
                            aria-label={`Remove ${category} filter`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {activeFilters.videos.length > 0 && (
                      <button
                        onClick={() => clearAllFilters("videos")}
                        className="ml-2 text-sm text-teal-500 hover:text-teal-400 flex items-center"
                        aria-label="Clear all filters"
                      >
                        Clear all <X className="h-3 w-3 ml-1" />
                      </button>
                    )}
                  </div>
                )}

                {activeTab === "images" && imageCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="flex items-center text-gray-400 dark:text-gray-400 light:text-gray-600 mr-2">
                      <Filter className="h-4 w-4 mr-1" /> Filter by:
                    </span>
                    {imageCategories.map((category) => (
                      <Badge
                        key={category}
                        className={`cursor-pointer flex items-center ${
                          activeFilters.images.includes(category)
                            ? "bg-teal-500 text-black"
                            : "bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:bg-teal-500/20"
                        }`}
                      >
                        <span onClick={() => toggleFilter(category, "images")} className="px-2 py-1">
                          {category}
                        </span>
                        {activeFilters.images.includes(category) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              clearFilter(category, "images")
                            }}
                            className="ml-1 hover:bg-black/20 rounded-full p-0.5"
                            aria-label={`Remove ${category} filter`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {activeFilters.images.length > 0 && (
                      <button
                        onClick={() => clearAllFilters("images")}
                        className="ml-2 text-sm text-teal-500 hover:text-teal-400 flex items-center"
                        aria-label="Clear all filters"
                      >
                        Clear all <X className="h-3 w-3 ml-1" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <TabsContent value="articles">
                {filteredResources.articles.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-20 w-20 rounded-full bg-gray-800 dark:bg-gray-800 light:bg-gray-200 flex items-center justify-center mx-auto mb-6">
                      <Search className="h-10 w-10 text-gray-500 dark:text-gray-500 light:text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-8">
                    {filteredResources.articles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={article.image || "/placeholder.svg"}
                              alt={article.title}
                              fill
                              className="object-cover transition-transform hover:scale-105 duration-500"
                            />
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-teal-500/80 text-black font-medium">{article.category}</Badge>
                            </div>
                          </div>
                          <CardHeader className="pt-6 pb-2">
                            <CardTitle className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                              {article.title}
                            </CardTitle>
                            <p className="text-sm text-teal-500 dark:text-teal-500 light:text-teal-600">
                              {article.date}
                            </p>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">{article.excerpt}</p>
                          </CardContent>
                          <CardFooter>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="text-teal-500 dark:text-teal-500 light:text-teal-600 border-teal-500 dark:border-teal-500 light:border-teal-600 hover:bg-teal-500 hover:text-black rounded-full"
                                >
                                  Read More
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-2xl max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl font-bold text-white dark:text-white light:text-gray-900">
                                    {article.title}
                                  </DialogTitle>
                                  <div className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                                    <div className="flex items-center gap-4 mt-2">
                                      <span className="text-teal-500 dark:text-teal-500 light:text-teal-600">
                                        {article.date}
                                      </span>
                                      <Badge className="bg-teal-500/80 text-black font-medium">
                                        {article.category}
                                      </Badge>
                                    </div>
                                  </div>
                                </DialogHeader>
                                <div className="relative h-64 w-full mt-4 mb-6">
                                  <Image
                                    src={article.image || "/placeholder.svg"}
                                    alt={article.title}
                                    fill
                                    className="object-cover rounded-xl"
                                  />
                                </div>
                                <div className="text-gray-300 dark:text-gray-300 light:text-gray-700 space-y-4">
                                  <div>{article.excerpt}</div>
                                  <div>{article.content}</div>
                                  <div>{article.content}</div>
                                </div>
                                <DialogClose asChild>
                                  <button
                                    className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                                    aria-label="Close dialog"
                                  >
                                    <X className="h-5 w-5" />
                                  </button>
                                </DialogClose>
                              </DialogContent>
                            </Dialog>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reports">
                {filteredResources.reports.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-20 w-20 rounded-full bg-gray-800 dark:bg-gray-800 light:bg-gray-200 flex items-center justify-center mx-auto mb-6">
                      <Search className="h-10 w-10 text-gray-500 dark:text-gray-500 light:text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                      No reports found
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredResources.reports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                          <div className="grid md:grid-cols-3 gap-0">
                            <div className="relative h-full md:col-span-1">
                              <Image
                                src={report.image || "/placeholder.svg"}
                                alt={report.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-3 right-3">
                                <Badge className="bg-teal-500/80 text-black font-medium">{report.category}</Badge>
                              </div>
                            </div>
                            <div className="p-6 md:col-span-2">
                              <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                                {report.title}
                              </h3>
                              <p className="text-sm text-teal-500 dark:text-teal-500 light:text-teal-600 mb-4">
                                {report.date}
                              </p>
                              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">
                                {report.description}
                              </p>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 light:text-gray-500 mb-4">
                                <FileText className="h-4 w-4 mr-2" />
                                <span>PDF</span>
                                <span className="mx-2">•</span>
                                <span>{report.fileSize}</span>
                              </div>
                              <div className="flex space-x-3">
                                <Button
                                  variant="default"
                                  className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full"
                                  onClick={() => handleDownload(report.downloadUrl, report.title)}
                                >
                                  <Download className="mr-2 h-4 w-4" /> Download
                                </Button>
                                <Button
                                  variant="outline"
                                  className="text-white dark:text-white light:text-gray-900 border-gray-700 dark:border-gray-700 light:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-gray-100 rounded-full"
                                  onClick={() => window.open(report.downloadUrl, "_blank")}
                                >
                                  View Online
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="videos">
                {filteredResources.videos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-20 w-20 rounded-full bg-gray-800 dark:bg-gray-800 light:bg-gray-200 flex items-center justify-center mx-auto mb-6">
                      <Search className="h-10 w-10 text-gray-500 dark:text-gray-500 light:text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                      No videos found
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredResources.videos.map((video, index) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full">
                          <div
                            className="relative h-64 overflow-hidden cursor-pointer"
                            onClick={() => handleVideoClick(video.videoUrl)}
                          >
                            <Image
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="h-20 w-20 rounded-full bg-teal-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-10 h-10 text-black ml-1"
                                >
                                  <path d="M8 5.14v14l11-7-11-7z" />
                                </svg>
                              </div>
                            </div>
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-teal-500/80 text-black font-medium">{video.category}</Badge>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                              {video.duration}
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                              {video.title}
                            </h3>
                            <p className="text-sm text-teal-500 dark:text-teal-500 light:text-teal-600 mb-4">
                              {video.date}
                            </p>
                            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-6">
                              {video.description}
                            </p>
                            <Button
                              variant="default"
                              className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full"
                              onClick={() => handleVideoClick(video.videoUrl)}
                            >
                              Watch Video
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="images">
                {filteredResources.images.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-20 w-20 rounded-full bg-gray-800 dark:bg-gray-800 light:bg-gray-200 flex items-center justify-center mx-auto mb-6">
                      <Search className="h-10 w-10 text-gray-500 dark:text-gray-500 light:text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                      No images found
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-4">
                    {filteredResources.images.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Dialog>
                          <DialogTrigger asChild>
                            <div
                              className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                              onClick={() => handleImageClick(image, index)}
                            >
                              <Image
                                src={image.image || "/placeholder.svg"}
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
                          <DialogContent className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-0 rounded-2xl max-w-5xl p-0">
                            <DialogHeader>
                              <DialogTitle className="sr-only">Image Gallery</DialogTitle>
                            </DialogHeader>
                            <div className="relative h-[70vh]">
                              <Image
                                src={selectedImage?.image || "/placeholder.svg"}
                                alt={selectedImage?.title || "Gallery image"}
                                fill
                                className="object-contain"
                              />
                              <DialogClose asChild>
                                <button
                                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                                  aria-label="Close dialog"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </DialogClose>

                              {currentImageIndex > 0 && (
                                <button
                                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                                  onClick={handlePreviousImage}
                                >
                                  <ChevronLeft className="h-6 w-6" />
                                </button>
                              )}

                              {currentImageIndex < filteredResources.images.length - 1 && (
                                <button
                                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                                  onClick={handleNextImage}
                                >
                                  <ChevronRight className="h-6 w-6" />
                                </button>
                              )}
                            </div>
                            <div className="p-6">
                              <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                                {selectedImage?.title}
                              </h3>
                              <div className="flex items-center gap-4 mb-4">
                                <span className="text-teal-500 dark:text-teal-500 light:text-teal-600">
                                  {selectedImage?.date}
                                </span>
                                <Badge className="bg-teal-500/80 text-black font-medium">
                                  {selectedImage?.category}
                                </Badge>
                              </div>
                              <div className="text-gray-300 dark:text-gray-300 light:text-gray-700">
                                {selectedImage?.description}
                              </div>
                              <div className="text-gray-500 dark:text-gray-500 light:text-gray-500 mt-2 flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{selectedImage?.location}</span>
                              </div>
                            </div>
                            <DialogClose className="sr-only" />
                          </DialogContent>
                        </Dialog>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
