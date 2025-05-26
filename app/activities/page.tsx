"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pic5.jpg?height=600&width=1920"
            alt="Our Activities"
            fill
            className="object-cover opacity-20 dark:opacity-20 light:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A] dark:from-black/70 dark:via-black/50 dark:to-[#0A0A0A] light:from-white/70 light:via-white/50 light:to-[#F8F9FA]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-6">Our Activities</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl mx-auto mb-12">
              We're currently updating our activities page with the latest information about our initiatives and programs.
              Please check back soon!
            </p>
            <Button
              asChild
              variant="default"
              className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full px-8 py-6 text-base"
            >
              <Link href="/our-work">View Our Work</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
