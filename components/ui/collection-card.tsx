"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface Collection {
  id: string
  name: string
  description: string
  image: string
  link: string
}

interface CollectionCardProps {
  collection: Collection
  index: number
}

export default function CollectionCard({ collection, index }: CollectionCardProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      data-testid={`collection-card-${collection.id}`}
    >
      <Card className="overflow-hidden border-0 bg-gray-800 h-full">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={collection.image || "/placeholder.svg?height=800&width=600"}
            alt={collection.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <CardContent className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-serif text-2xl font-semibold text-white">{collection.name}</h3>
            <p className="mt-2 text-sm text-gray-300">{collection.description}</p>
            <Link
              href={collection.link}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline group"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}

