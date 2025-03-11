"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import TestimonialCard from "@/components/ui/testimonial-card"

const testimonials = [
  {
    id: "1",
    name: "James Anderson",
    role: "CEO, Anderson Enterprises",
    quote:
      "My CHRONO watch has been with me through board meetings and mountain expeditions. Its reliability and craftsmanship are unmatched.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "2",
    name: "Sophia Chen",
    role: "Architect",
    quote:
      "As someone who appreciates fine design, I'm constantly impressed by the attention to detail in my Celestial Automatic. It's more than a timepiece—it's a work of art.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "3",
    name: "Michael Okonkwo",
    role: "Professional Diver",
    quote:
      "I've trusted my Nautical Diver on expeditions around the world. Its precision and durability in extreme conditions give me confidence when it matters most.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 dark:bg-gray-900/50" data-testid="testimonials-section">
      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity, y }} className="flex flex-col items-center text-center mb-16">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="mt-4 max-w-[700px] text-gray-500 dark:text-gray-400 md:text-lg">
            Discover why discerning watch enthusiasts around the world choose CHRONO timepieces.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={itemVariants} data-testid={`testimonial-${testimonial.id}`}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

