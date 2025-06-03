import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react"

interface FooterLink {
  name: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

export default function Footer() {
  const sections: FooterSection[] = [
    {
      title: "Who We Are",
      links: [
        { name: "Vision & Mission", href: "/about?tab=vision" },
        { name: "Our Team", href: "/about?tab=team" },
        { name: "Our Approach", href: "/about?tab=approach" },
        { name: "Objectives", href: "/about?tab=objectives" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Articles", href: "/resources?tab=articles" },
        { name: "Reports", href: "/resources?tab=reports" },
        { name: "Videos", href: "/resources?tab=videos" },
        { name: "Photo Gallery", href: "/resources?tab=images" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "Our Work", href: "/our-work" },
        { name: "Activities", href: "/activities" },
        { name: "Contact", href: "/contact" },
        { name: "Donate", href: "/donate" },
      ],
    },
  ]

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
      icon: <Twitter className="h-5 w-5" />,
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

  return (
    <footer className="bg-[#0A0A0A] text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-teal-500 mr-3" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-teal-500 mr-3" />
                <span>+254 123 456 789</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-teal-500 mr-3" />
                <span>info@workersrightswatch.org</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-teal-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-500 transition-colors duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-col items-center mt-4 md:mt-0">
              <p className="text-sm text-center md:text-center">
                © {new Date().getFullYear()} Workers Rights Watch. All rights reserved.
              </p>
              <p className="text-sm text-center md:text-center mt-2">
                Designed and built by{' '}
                <a
                  href="https://github.com/kife"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:text-teal-400"
                >
                  Kife ☻
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
