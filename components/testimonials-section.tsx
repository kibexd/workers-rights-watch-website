"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Factory Worker",
    image: "/placeholder.svg",
    quote: "Workers Rights Watch has been instrumental in helping us understand our rights and fight for better working conditions. Their support has made a real difference in our workplace."
  },
  {
    id: 2,
    name: "Michael Ochieng",
    role: "Union Representative",
    image: "/placeholder.svg",
    quote: "The training and resources provided by Workers Rights Watch have empowered our union to better advocate for workers' rights. Their commitment to the cause is truly inspiring."
  },
  {
    id: 3,
    name: "Grace Muthoni",
    role: "Agricultural Worker",
    image: "/placeholder.svg",
    quote: "Thanks to Workers Rights Watch, we've seen significant improvements in our working conditions. Their dedication to protecting workers' rights is making a real impact."
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#0F0F0F]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">What People Say</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Hear from workers and partners about the impact of our work in protecting and promoting workers' rights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#111111] border-0 overflow-hidden rounded-2xl h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                      <p className="text-teal-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="h-8 w-8 text-teal-500/20 absolute -top-2 -left-2" />
                    <p className="text-gray-300 relative z-10">{testimonial.quote}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 