import { Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { motion } from "framer-motion"

const XLogo = () => (
  <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
    <path d="M1199.97 0H950.684L600.001 505.5L249.316 0H0L480.684 695.5L0 1227H249.316L600.001 721.5L950.684 1227H1200L719.316 531.5L1199.97 0Z" fill="currentColor"/>
  </svg>
)

export default function TopHeader() {
  const socialLinks = [
    { icon: <Facebook className="h-4 w-4" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-4 w-4" />, href: "#", label: "Twitter" },
    { icon: <XLogo />, href: "#", label: "X" },
    { icon: <Instagram className="h-4 w-4" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-4 w-4" />, href: "#", label: "LinkedIn" },
    { icon: <Youtube className="h-4 w-4" />, href: "#", label: "YouTube" },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#111111] border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-10">
          {/* Email */}
          <motion.a
            href="mailto:info@workersrightswatch.org"
            className="flex items-center text-sm text-gray-400 hover:text-teal-500 transition-colors"
            whileHover={{ x: 5 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Mail className="h-4 w-4 mr-2" />
            info@workersrightswatch.org
          </motion.a>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-teal-500 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 