"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden" data-testid="brand-story">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <motion.div
            className="relative aspect-square md:aspect-auto md:h-[600px] overflow-hidden rounded-2xl"
            style={{ scale: imageScale }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d4cf2525fd50d1b098d64694ac768522.jpg-SPs3hHiQXAlwDMw5jIAb20DzMCFEm8.jpeg"
              alt="Intricate watch movement showcasing our craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          <motion.div style={{ opacity, y }} className="space-y-6">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              A Legacy of <span className="text-gradient">Excellence</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-lg">
              Since 1875, our master watchmakers have been crafting timepieces of exceptional quality and precision.
              Each watch is a testament to our commitment to excellence and traditional Swiss craftsmanship.
            </p>
            <p className="text-gray-500 dark:text-gray-400 md:text-lg">
              Our journey began in a small workshop in Geneva, where our founder, Antoine Chrono, set out to create
              watches that would stand the test of time. Today, we continue his legacy, combining time-honored
              techniques with innovative technology.
            </p>
            <p className="text-gray-500 dark:text-gray-400 md:text-lg">
              Every CHRONO timepiece undergoes rigorous testing and quality control, ensuring that each watch that bears
              our name meets our exacting standards. From the selection of materials to the final assembly, no detail is
              overlooked.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button className="rounded-full group">
                Our Heritage
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" className="rounded-full">
                Watch Craftsmanship
              </Button>
            </div>

            <div className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-0.5 w-12 bg-accent"></div>
                <span className="font-serif text-lg font-medium">Antoine Chrono, Founder</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

