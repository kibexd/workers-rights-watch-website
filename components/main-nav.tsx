"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import TopHeader from "@/components/top-header"
import { FloatingSocial } from "@/components/floating-social"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Our Team" },
    { href: "/our-work", label: "Our Work" },
    { href: "/activities", label: "Our Activities" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ]

  const resourceLinks = [
    { href: "/resources?tab=articles", label: "Articles" },
    { href: "/resources?tab=reports", label: "Reports" },
    { href: "/resources?tab=videos", label: "Videos" },
    { href: "/resources?tab=images", label: "Photo Gallery" },
  ]

  return (
    <>
      <TopHeader />
    <header
        className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/dp.jpg"
                alt="Workers Rights Watch Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-white">Workers Rights Watch</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                  <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                    pathname === link.href ? "text-teal-500" : "text-white"
                  }`}
                >
                  {link.label}
                  </Link>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
<Button
  variant="ghost"
                    className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                      pathname.startsWith("/resources") ? "text-teal-500" : "text-white"
                    }`}
                  >
                    Resources <ChevronDown className="ml-1 h-4 w-4" />
</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#111111] border-gray-800">
                  {resourceLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="text-white hover:text-teal-500 hover:bg-[#1A1A1A] cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/donate">
                <Button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold rounded-full px-6 py-2 ml-2 shadow-lg">
                  Donate
            </Button>
              </Link>
              {/* <ThemeToggle /> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-black/95 backdrop-blur-md"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                        pathname === link.href ? "text-teal-500" : "text-white"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-teal-500">Resources</p>
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block pl-4 text-sm text-white hover:text-teal-500"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                    </Link>
                    ))}
                  </div>
                  {/* <div className="pt-4">
                    <ThemeToggle />
                  </div> */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
      <FloatingSocial />
    </>
  )
}
