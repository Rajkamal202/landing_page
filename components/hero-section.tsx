"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 50])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToNextSection = () => {
    const nextSection = sectionRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      data-testid="hero-section"
    >
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PROFESSIONAL_EDGE_GREEN_SILVER_1024x1024-YhOnvhe8Cp0WlTi9XKaCWJ56U1wAmC.webp"
          alt="Professional Edge Watch"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
        <motion.div style={{ y: textY, opacity }} className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-3xl space-y-6"
          >
            <h1 className="font-serif text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Where Time Meets <span className="text-gradient">Excellence</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-gray-200 md:text-xl">
              Discover our collection of meticulously crafted timepieces that blend traditional watchmaking with modern
              innovation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 group" data-testid="explore-button">
                Explore Collection
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white text-white px-8 hover:bg-white hover:text-black transition-colors"
              >
                Book Consultation
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 hover:text-white animate-bounce"
          onClick={scrollToNextSection}
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </motion.div>
    </motion.section>
  )
}

