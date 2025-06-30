"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  LinkedinIcon as LinkedIn,
  Send,
  CheckCircle,
  AlertCircle,
  Youtube,
} from "lucide-react"
import { motion } from "framer-motion"

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  submit?: string;
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-32 mb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ta5.jpg?height=600&width=1920"
            alt="Contact Us"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 gradient-hero"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-foreground mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Workers Rights Watch is here to support, inform, and empower workers across Kenya. Reach out to us for questions, partnerships, or support. We look forward to hearing from you!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background mb-16 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="glass p-8 rounded-2xl flex flex-col items-center text-center shadow-elevated h-full">
                <div className="h-14 w-14 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                  <MapPin className="h-7 w-7 text-teal-500" />
                      </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Address</h3>
                <p className="text-muted-foreground">P.O. Box 00232-1516, Ruiru, Kenya</p>
                    </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="glass p-8 rounded-2xl flex flex-col items-center text-center shadow-elevated h-full">
                <div className="h-14 w-14 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                  <Phone className="h-7 w-7 text-teal-500" />
                        </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Phone</h3>
                <a href="tel:+254202605660" className="text-teal-500 hover:underline block">+254(0)20-2605660</a>
                <a href="tel:+254775366920" className="text-teal-500 hover:underline block">+254(0)775366920</a>
                        </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="glass p-8 rounded-2xl flex flex-col items-center text-center shadow-elevated h-full">
                <div className="h-14 w-14 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                  <Mail className="h-7 w-7 text-teal-500" />
                      </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
                <a href="mailto:info@workersrightswatch.org" className="text-teal-500 hover:underline block">info@workersrightswatch.org</a>
                      </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="glass p-8 rounded-2xl flex flex-col items-center text-center shadow-elevated h-full">
                <div className="h-14 w-14 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-teal-500" />
                          </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Working Hours</h3>
                <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 5:00 PM</p>
                <p className="text-muted-foreground">Sat - Sun: Closed</p>
                          </div>
            </motion.div>
                  </div>

          <div className="flex flex-wrap gap-4 justify-center mt-12">
                    <a
                      href="https://web.facebook.com/people/Workersrightswatchke/61572243038226/"
                      target="_blank"
                      rel="noopener noreferrer"
              className="h-12 w-12 rounded-full glass flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a
                      href="https://x.com/Workersrights24"
                      target="_blank"
                      rel="noopener noreferrer"
              className="h-12 w-12 rounded-full glass flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.instagram.com/workersrightswatch_ke/"
                      target="_blank"
                      rel="noopener noreferrer"
              className="h-12 w-12 rounded-full glass flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/106499488/admin/dashboard/"
                      target="_blank"
                      rel="noopener noreferrer"
              className="h-12 w-12 rounded-full glass flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedIn className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.youtube.com/@workersrightswatch254"
                      target="_blank"
                      rel="noopener noreferrer"
              className="h-12 w-12 rounded-full glass flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-black transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="h-6 w-6" />
                    </a>
          </div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass rounded-2xl overflow-hidden shadow-elevated">
              <h2 className="text-2xl font-bold text-foreground p-8 text-center">Our Location</h2>
                <div className="relative h-[400px] w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.985697429829!2d36.82515217537938!3d-1.1705576355114375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3c60950af6e7%3A0xc3a1d73136233d45!2sBiashara%20St%2C%20Kiambu!5e0!3m2!1sen!2ske!4v1749370301781!5m2!1sen!2ske" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-20 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="glass rounded-2xl shadow-elevated p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Who can contact Workers Rights Watch?</h3>
                  <p className="text-muted-foreground">Any worker, employer, or stakeholder in Kenya interested in labor rights, workplace fairness, or seeking support can reach out to us.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Do you provide legal assistance to workers?</h3>
                  <p className="text-muted-foreground">Yes, we offer guidance and support for workers facing workplace violations, including referrals to legal aid where appropriate.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Is your support confidential?</h3>
                  <p className="text-muted-foreground">Absolutely. All inquiries and cases are handled with strict confidentiality and respect for your privacy.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Can you help with workplace discrimination or harassment?</h3>
                  <p className="text-muted-foreground">Yes, we assist workers experiencing discrimination, harassment, or unfair treatment, and can connect you with the right resources.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">How can I get involved or support your work?</h3>
                  <p className="text-muted-foreground">You can support us by volunteering, partnering, or donating. Reach out via the contact details above to learn more.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
