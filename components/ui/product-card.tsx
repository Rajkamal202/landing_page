"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useState } from "react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating?: number
  reviews?: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-testid="product-card"
    >
      <Card className="overflow-hidden border-0 bg-white dark:bg-gray-800 shadow-md h-full">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <Badge className="absolute left-4 top-4 bg-white/80 text-black backdrop-blur-sm dark:bg-black/80 dark:text-white">
            {product.category}
          </Badge>

          <motion.div
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">Quick View</Button>
          </motion.div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-serif text-xl font-semibold line-clamp-1">{product.name}</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>

          {product.rating && (
            <div className="mt-3 flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating ?? 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews} reviews)</span>
            </div>
          )}

          <p className="mt-4 text-lg font-semibold text-gradient">{formatPrice(product.price)}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button className="w-full rounded-full group">
            Add to Cart
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

