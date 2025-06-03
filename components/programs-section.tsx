"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, Scale, FileText } from "lucide-react"
import Link from "next/link"

const programs = [
  {
    icon: <Shield className="h-10 w-10 text-teal-500" />,
    title: "Worker Education Program",
    description: "Educating workers about their rights under national and international labor laws through workshops and training sessions.",
    link: "/our-programs#education"
  },
  {
    icon: <Scale className="h-10 w-10 text-teal-500" />,
    title: "Legal Support Services",
    description: "Providing legal assistance to workers facing rights violations, unfair treatment, or unsafe working conditions.",
    link: "/our-programs#legal"
  },
  {
    icon: <FileText className="h-10 w-10 text-teal-500" />,
    title: "Research & Documentation",
    description: "Conducting research on labor conditions and documenting violations to inform our advocacy strategies.",
    link: "/our-programs#research"
  },
  {
    icon: <Users className="h-10 w-10 text-teal-500" />,
    title: "Community Outreach",
    description: "Engaging with communities to raise awareness about workers' rights and build solidarity networks.",
    link: "/our-programs#outreach"
  }
]

export function ProgramsSection() {
  return (
    <section className="py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Programs
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We implement a range of programs designed to address different aspects of workers' rights and needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#1A1A1A] rounded-2xl p-8 hover:bg-[#252525] transition-colors duration-300 h-full">
                <div className="flex items-start gap-6">
                  <div className="bg-teal-500/10 p-4 rounded-xl">
                    {program.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{program.description}</p>
                    <Button
                      asChild
                      variant="outline"
                      className="text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-black rounded-full"
                    >
                      <Link href={program.link}>Learn More</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 