"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ui/product-card"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

const featuredProducts = [
  {
    id: "1",
    name: "Louis Moinet Time To Race",
    description:
      "A masterpiece of precision engineering featuring a unique tachymeter design and skeleton dial with luminous details.",
    price: 125000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Limited-Edition-Watches-Louis-Moinet-Time-To-Race-M2.avif-StEgVnxQ2uevLSbLrJazgsK0HpdD5P.jpeg",
    category: "Sport Luxury",
    rating: 4.9,
    reviews: 24,
  },
  {
    id: "2",
    name: "Omega Seamaster Professional",
    description: "Professional-grade diving watch with 300m water resistance and iconic black dial design.",
    price: 18900,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1682759749mob_.webp-e71ziknMjjcaxKU8VUb4lrRdJCJt9q.jpeg",
    category: "Diver",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "3",
    name: "Cartier Moonphase",
    description: "Elegant moonphase complication with brown leather strap and rose gold case.",
    price: 32500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cartier-automatic-watch-for-men.jpg-3REodSZcCblnlRP3XFzbcO1wq8KdPE.jpeg",
    category: "Dress",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "4",
    name: "Rolex GMT-Master II",
    description: "The ultimate traveler's companion with dual time zone functionality and iconic design.",
    price: 45500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/limited-edition-rolex-watches-makes-special-VBswVeoN2Nh4Vb1IAodDIGV8Rb8LdU.webp",
    category: "Sport",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "5",
    name: "Jacob & Co Astronomia",
    description: "A celestial masterpiece featuring a complex tourbillon movement and astronomical complications.",
    price: 750000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/geneva_watch_days_2022__jacob_%26_co%27s_astronomia_and_epic_x_in_the_spotlight_cover_166209100263117efa5a456.png-2rKpexL0jc9G5aBNLmftanNRwADo5B.jpeg",
    category: "Haute Horlogerie",
    rating: 5.0,
    reviews: 17,
  },
]

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [visibleItems, setVisibleItems] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToNext = () => {
    if (currentIndex < featuredProducts.length - visibleItems) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(featuredProducts.length - visibleItems)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900" ref={sectionRef} data-testid="featured-products">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured <span className="text-gradient">Timepieces</span>
          </h2>
          <p className="mt-4 max-w-[700px] text-gray-500 dark:text-gray-400 md:text-lg">
            Discover our most sought-after watches, each a testament to exceptional craftsmanship and timeless design.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700"
              onClick={scrollToPrev}
              aria-label="Previous product"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700"
              onClick={scrollToNext}
              aria-label="Next product"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative overflow-hidden" ref={containerRef}>
            <motion.div
              className="flex transition-all duration-500 ease-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / featuredProducts.length}%)`,
                width: `${(100 * featuredProducts.length) / visibleItems}%`,
              }}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className={cn("px-4", visibleItems === 1 ? "w-full" : visibleItems === 2 ? "w-1/2" : "w-1/3")}
                  variants={itemVariants}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-8 md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={scrollToPrev}
              aria-label="Previous product"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={scrollToNext}
              aria-label="Next product"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" className="rounded-full px-8 group">
            View All Watches
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

