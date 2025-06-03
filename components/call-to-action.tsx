"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CallToAction() {
  return (
    <section className="py-20 bg-teal-500 text-black">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            There are many ways you can support our work and contribute to the protection of workers' rights in Kenya.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              variant="default"
              className="bg-black hover:bg-gray-900 text-white font-medium rounded-full px-8 py-6 text-base"
            >
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent border-black text-black hover:bg-black hover:text-white font-medium rounded-full px-8 py-6 text-base"
            >
              <Link href="/careers">Volunteer With Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 