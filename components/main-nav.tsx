"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
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
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopHeader />
        <header
          className={`transition-all duration-300 ${
            isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
          }`}
        >
          <nav className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              <Link href="/" className="flex items-center space-x-3 group relative">
                {/* Logo Container with Animated Square Border */}
                <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden rounded-lg custom-logo-container">
                  <Image
                    src="/dp.jpg"
                    alt="Workers Rights Watch Logo"
                    width={48} /* Increased size slightly */
                    height={48} /* Increased size slightly */
                    className="w-full h-full object-cover z-10 rounded-lg"
                  />
                  {/* Animated Square Glow Border - implemented via CSS */}
                </div>
                {/* Text with Neon Glow Effect */}
                <span className="text-xl font-bold text-foreground relative inline-block custom-text-glow">
                  Workers Rights Watch
                </span>
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
                                pathname.startsWith(item.href) ? "text-teal-500" : "text-foreground"
                              }`}
                            >
                              {item.name}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-card text-card-foreground">
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
                                pathname === item.href ? "text-teal-500" : "text-foreground",
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
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-foreground"
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
                className="md:hidden bg-background/95 backdrop-blur-md"
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
                              className="block pl-4 text-sm text-foreground hover:text-teal-500"
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
                              pathname === item.href ? "text-teal-500" : "text-foreground"
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
      </div>
      <FloatingSocial />

      <style jsx>{`
        @keyframes rotateSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes rotateFast {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .custom-logo-container {
          position: relative;
          border-radius: 8px; /* Smoothed ends */
        }

        .custom-logo-container::before,
        .custom-logo-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 8px; /* Match container border-radius */
          transition: all 0.3s ease-out;
          z-index: 0;
        }

        /* Inner glow */
        .custom-logo-container::before {
          border: 2px solid transparent;
          background: linear-gradient(45deg, #10bfae, #1ed760, #10bfae) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0; /* Hidden by default */
          animation: rotateSlow 10s linear infinite;
          animation-play-state: paused; /* Paused by default */
        }

        /* Outer glow */
        .custom-logo-container::after {
          border: 2px solid transparent;
          background: linear-gradient(45deg, #10bfae, #1ed760, #10bfae) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          filter: blur(8px); /* Soften the glow */
          opacity: 0; /* Hidden by default */
          animation: rotateFast 15s linear infinite reverse;
          animation-play-state: paused; /* Paused by default */
        }

        .group:hover .custom-logo-container::before,
        .group:hover .custom-logo-container::after {
          opacity: 1; /* Visible on hover */
          animation-play-state: running; /* Run animation on hover */
        }

        /* Text Glow */
        .custom-text-glow {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); /* Subtle white glow */
          transition: text-shadow 0.3s ease-out;
        }

        .group:hover .custom-text-glow {
          text-shadow: 0 0 10px #10bfae, 0 0 20px #10bfae, 0 0 30px #10bfae; /* Teal glow on hover */
        }

      `}</style>
    </>
  )
}
