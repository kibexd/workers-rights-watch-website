"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Youtube, Phone } from "lucide-react"
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
    href: "https://www.facebook.com/profile.php?id=61572243038226",
    icon: <Facebook className="h-5 w-5" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/workersrightswatch_ke/",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/workers-rights-watch-13102931b/",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/Workersrights24",
    icon: <XLogo />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@workersrightswatch254",
    icon: <Youtube className="h-5 w-5" />,
  },
  {
    name: "WhatsApp",
    href: "https://wa.link/0t7sv7",
    icon: <Phone className="h-5 w-5" />,
  },
]

export function FloatingSocial() {
  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 right-0 z-50"
        style={{ pointerEvents: 'none' }}
      >
        {/* Glassmorphic Dock with animation and border, attached to edge */}
        <motion.div
          className="glass flex flex-col items-center justify-center gap-2 px-3 py-4 rounded-full shadow-elevated border-2 border-neutral-900"
          style={{
            minHeight: '320px',
            minWidth: '64px',
            boxShadow: '0 8px 32px 0 rgba(168,191,193,0.18)',
            borderRadius: '2.5rem 0 0 2.5rem',
            backdropFilter: 'blur(16px)',
            pointerEvents: 'auto',
          }}
          initial={{ y: 0 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        >
          {socialLinks.map((link, index) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-full text-foreground hover:bg-teal-500/10 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  whileHover={{ scale: 1.13, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  {link.icon}
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
        </motion.div>
      </motion.div>
    </TooltipProvider>
  )
} 