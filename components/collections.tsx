"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import CollectionCard from "@/components/ui/collection-card"

const collections = [
  {
    id: "1",
    name: "Heritage",
    description: "Timeless designs inspired by our rich watchmaking history.",
    image: "/heritage.jpg",
    link: "#",
  },
  {
    id: "2",
    name: "Nautical",
    description: "Professional-grade timepieces for underwater exploration.",
    image: "/nautical.webp",
    link: "#",
  },
  {
    id: "3",
    name: "Metropolitan",
    description: "Elegant watches for the modern urban professional.",
    image:"/metropolitian.webp",
    link: "#",
  },
  {
    id: "4",
    name: "Celestial",
    description: "Sophisticated complications inspired by astronomical phenomena.",
    image: "/celestial.jpg",
    link: "#",
  },
]

export default function Collections() {
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

  return (
    <section ref={sectionRef} className="py-24 bg-gray-900 text-white" data-testid="collections-section">
      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity, y }} className="flex flex-col items-center text-center mb-16">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our <span className="text-gradient">Collections</span>
          </h2>
          <p className="mt-4 max-w-[700px] text-gray-400 md:text-lg">
            Explore our distinct watch collections, each with its own character and purpose, yet all bearing the
            hallmarks of CHRONO craftsmanship.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

