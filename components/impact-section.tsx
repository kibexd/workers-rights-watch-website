"use client"

import { motion } from "framer-motion"
import { Users, Target, Award, Heart } from "lucide-react"

const impactItems = [
  {
    icon: Users,
    title: "Workers Trained",
    value: "10,000+",
    description: "Empowering workers with essential skills and knowledge",
  },
  {
    icon: Target,
    title: "Communities Reached",
    value: "50+",
    description: "Making a difference in communities across the region",
  },
  {
    icon: Award,
    title: "Success Rate",
    value: "95%",
    description: "High success rate in our training and support programs",
  },
  {
    icon: Heart,
    title: "Lives Impacted",
    value: "25,000+",
    description: "Creating positive change in workers' lives",
  },
]

export function ImpactSection() {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Impact
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Through our dedicated efforts, we've made significant strides in
            improving workers' rights and livelihoods across the region.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {impactItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1A1A1A] rounded-2xl p-8 hover:bg-[#252525] transition-colors duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="bg-teal-500/10 p-4 rounded-xl">
                  <item.icon className="w-8 h-8 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.value}
                  </h3>
                  <h4 className="text-lg font-semibold text-teal-500 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 