import { Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, Phone } from "lucide-react"
import { motion } from "framer-motion"

const XLogo = () => (
  <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
    <path d="M1199.97 0H950.684L600.001 505.5L249.316 0H0L480.684 695.5L0 1227H249.316L600.001 721.5L950.684 1227H1200L719.316 531.5L1199.97 0Z" fill="currentColor"/>
  </svg>
)

export default function TopHeader() {
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61572243038226",
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/workersrightswatch_ke/",
      icon: <Instagram className="h-4 w-4" />,
    },
    {
      name: "X",
      href: "https://x.com/Workersrights24",
      icon: <XLogo />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/106499488/admin/dashboard/",
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@workersrightswatch254",
      icon: <Youtube className="h-4 w-4" />,
    },
    {
      name: "WhatsApp",
      href: "https://wa.link/0t7sv7",
      icon: <Phone className="h-4 w-4" />,
    },
  ]

  return (
    <div className="bg-[#111111] dark:bg-[#111111] light:bg-white border-b border-[#282828] dark:border-[#282828] light:border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-6">
            <a
              href="mailto:info@workersrightswatch.org"
              className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-teal-500 dark:hover:text-teal-500 light:hover:text-teal-600 flex items-center text-sm"
            >
              <Mail className="h-4 w-4 mr-2" />
              info@workersrightswatch.org
            </a>
            <a
              href="tel:+254775366920"
              className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-teal-500 dark:hover:text-teal-500 light:hover:text-teal-600 flex items-center text-sm"
            >
              <Phone className="h-4 w-4 mr-2" />
              +254(0)775366920
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-teal-500 dark:hover:text-teal-500 light:hover:text-teal-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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