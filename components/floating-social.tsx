"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const XLogo = () => (
  <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
    <path d="M1199.97 0H950.684L600.001 505.5L249.316 0H0L480.684 695.5L0 1227H249.316L600.001 721.5L950.684 1227H1200L719.316 531.5L1199.97 0Z" fill="currentColor"/>
  </svg>
)

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/workersrightswatch",
    color: "#1877F2",
  },
  {
    name: "X",
    icon: XLogo,
    href: "https://twitter.com/workersrightswatch",
    color: "#000000",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/workersrightswatch",
    color: "#E4405F",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/company/workersrightswatch",
    color: "#0A66C2",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@workersrightswatch",
    color: "#FF0000",
  },
]

export function FloatingSocial() {
  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <div className="flex flex-col space-y-4">
          {socialLinks.map((link, index) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    backgroundColor: link.name === "X" ? "#000000" : undefined,
                    color: link.name === "X" ? "#FFFFFF" : undefined,
                  }}
                >
                  <link.icon
                    className={`w-6 h-6 ${
                      link.name === "X" ? "w-7 h-7" : ""
                    }`}
                  />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="bg-black text-white px-3 py-2 rounded-lg text-sm"
              >
                <p>Follow us on {link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </motion.div>
    </TooltipProvider>
  )
} 