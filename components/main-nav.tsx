"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import Image from "next/image"

export default function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/our-work", label: "Our Work" },
    { href: "/activities", label: "Our Activities" },
    { href: "/resources", label: "Resources" },
    { href: "/team", label: "Our Team" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/donate", label: "Donate" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md dark:bg-black/80 light:bg-white/80"
          : "bg-transparent dark:bg-transparent light:bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center overflow-hidden relative">
              <Image
                src="/dp.jpg"
                alt="Workers Rights Watch Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <Link
              href="/"
              className="text-xl font-medium tracking-tight text-white dark:text-white light:text-gray-900"
            >
              WORKERS RIGHTS WATCH
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`relative py-2 hover:text-teal-400 transition-colors ${
                      pathname === item.href
                        ? "text-teal-400 dark:text-teal-400 light:text-teal-600"
                        : "text-gray-300 dark:text-gray-300 light:text-gray-700"
                    }`}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 h-0.5 bg-teal-400 dark:bg-teal-400 light:bg-teal-600 bottom-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Theme toggle button - temporarily disabled
<Button
  onClick={toggleTheme}
  variant="ghost"
  size="icon"
  className="text-gray-300 dark:text-gray-300 light:text-gray-700 rounded-full"
  aria-label="Toggle theme"
>
  {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
</Button>
*/}
            <Button
              variant="default"
              className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full px-6"
            >
              <Link href="/donate">Donate Us</Link>
            </Button>
          </nav>

          <div className="md:hidden flex items-center">
            {/* Theme toggle button - temporarily disabled
<Button
  onClick={toggleTheme}
  variant="ghost"
  size="icon"
  className="mr-2 text-gray-300 dark:text-gray-300 light:text-gray-700 rounded-full"
  aria-label="Toggle theme"
>
  {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
</Button>
*/}
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              className="text-gray-300 dark:text-gray-300 light:text-gray-700 rounded-full"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-6 border-t border-gray-800 dark:border-gray-800 light:border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`block text-lg hover:text-teal-400 transition-colors ${
                        pathname === item.href
                          ? "text-teal-400 dark:text-teal-400 light:text-teal-600"
                          : "text-gray-300 dark:text-gray-300 light:text-gray-700"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Button
                    variant="default"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full"
                  >
                    <Link href="/donate" onClick={() => setIsMenuOpen(false)}>
                      Donate Us
                    </Link>
                  </Button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
