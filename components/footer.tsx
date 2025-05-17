import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Youtube, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-black dark:bg-black light:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              {/* <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center"> */}
              <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center overflow-hidden relative">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-black"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg> */}
                <Image
                src="/dp.jpg"
                alt="Workers Rights Watch Logo"
                fill
                className="object-cover"
                priority
              />
              </div>
              <span className="text-xl font-medium tracking-tight text-white dark:text-white light:text-white">
                WRW
              </span>
            </div>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-300 mb-6">
              Workers Rights Watch (WRW) is a Non-governmental Organization established in 2000, dedicated to protecting
              workers' rights in Kenya.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://web.facebook.com/people/Workersrightswatchke/61572243038226/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-900 dark:bg-gray-900 light:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-400 light:text-gray-300 hover:bg-teal-500 hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/Workersrights24"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-900 dark:bg-gray-900 light:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-400 light:text-gray-300 hover:bg-teal-500 hover:text-black transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/workersrightswatch_ke/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-900 dark:bg-gray-900 light:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-400 light:text-gray-300 hover:bg-teal-500 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/106499488/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-900 dark:bg-gray-900 light:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-400 light:text-gray-300 hover:bg-teal-500 hover:text-black transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@workersrightswatch254"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-900 dark:bg-gray-900 light:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-400 light:text-gray-300 hover:bg-teal-500 hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 text-white dark:text-white light:text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/donate", label: "Donate" },
                { href: "/about", label: "About Us" },
                { href: "/activities", label: "Our Activities" },
                { href: "/our-work", label: "Our Work" },
                { href: "/resources", label: "Resources" },
                { href: "/team", label: "Our Team" },
                { href: "/careers", label: "Careers" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 dark:text-gray-400 light:text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 text-white dark:text-white light:text-white">Contact Us</h3>
            <ul className="space-y-4 text-gray-400 dark:text-gray-400 light:text-gray-300">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-teal-500" />
                <span>P.O. Box 00232-1516, Ruiru, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-teal-500" />
                <span>+254(0)20-2605660</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-teal-500" />
                <span>+254(0)775366920</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-teal-500" />
                <span>info@workersrightswatch.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 text-white dark:text-white light:text-white">Newsletter</h3>
            <div className="bg-gray-900/50 dark:bg-gray-900/50 light:bg-gray-800/50 p-4 rounded-lg border border-gray-800 dark:border-gray-800 light:border-gray-700">
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-300 mb-4">
                Our newsletter is coming soon! Stay tuned for updates on our work and impact.
              </p>
              <div className="flex flex-col space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-900 dark:bg-gray-900 light:bg-gray-800 border-0 rounded-full focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-white"
                  disabled
                />
                <Button
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium rounded-full cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-800 light:border-gray-700 text-center">
          <p className="text-gray-500 dark:text-gray-500 light:text-gray-400 mb-2">
            &copy; {new Date().getFullYear()} Workers Rights Watch. All Rights Reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-500 light:text-gray-400 text-sm">
            Designed and Developed by{" "}
            <a
              href="https://kife254.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:text-teal-400"
            >
              Enock Kibe
            </a>{" "}
            |
            <a
              href="https://github.com/kibexd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:text-teal-400 ml-1"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
