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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

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

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Who We Are",
      href: "/about",
      items: [
        { title: "About Us", href: "/about", description: "Learn about our mission, vision, and values" },
        { title: "Our Team", href: "/team", description: "Meet our dedicated team members" },
        { title: "Our Board", href: "/team?tab=board", description: "Meet our board of directors" },
      ],
    },
    { name: "Our Programs", href: "/our-programs" },
    {
      name: "Resources",
      href: "/resources",
      items: [
        { title: "Articles", href: "/resources?tab=articles", description: "Read our latest articles and news" },
        { title: "Reports", href: "/resources?tab=reports", description: "Access our research reports and publications" },
        { title: "Videos", href: "/resources?tab=videos", description: "Watch our videos and documentaries" },
        { title: "Photo Gallery", href: "/resources?tab=images", description: "Browse our photo gallery" },
      ],
    },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Donate", href: "/donate", isButton: true },
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
              <NavigationMenu>
                <NavigationMenuList>
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      {item.items ? (
                        <>
                          <NavigationMenuTrigger
                            className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                              pathname.startsWith(item.href) ? "text-teal-500" : "text-white"
                            }`}
                          >
                            {item.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                              {item.items.map((subItem) => (
                                <li key={subItem.title}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={subItem.href}
                                      className={cn(
                                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                        pathname === subItem.href ? "text-teal-500 bg-accent" : ""
                                      )}
                                    >
                                      <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : item.isButton ? (
                        <Link href={item.href} legacyBehavior passHref>
                          <Button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold rounded-full px-6 py-2 shadow-lg">
                            {item.name}
                          </Button>
                        </Link>
                      ) : (
                        <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                              pathname === item.href ? "text-teal-500" : "text-white",
                              "bg-transparent hover:bg-transparent",
                              "border-0 focus:border-0"
                            )}
                          >
                            {item.name}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
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
                  {navItems.map((item) => (
                    item.items ? (
                      <div key={item.name} className="space-y-2">
                        <p className="text-sm font-medium text-teal-500">{item.name}</p>
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block pl-4 text-sm text-white hover:text-teal-500"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      !item.isButton && (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                            pathname === item.href ? "text-teal-500" : "text-white"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    )
                  ))}
                  {/* Render Donate button separately in mobile menu */}
                  {navItems.find(item => item.isButton) && (
                    <Link href="/donate">
                      <Button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold rounded-full px-6 py-2 shadow-lg w-full">
                        {navItems.find(item => item.isButton)?.name}
                      </Button>
                    </Link>
                  )}
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
