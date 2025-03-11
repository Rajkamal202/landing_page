"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { getInitials } from "@/lib/utils"

interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  avatar: string
  rating?: number
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="h-full" data-testid="testimonial-card">
      <Card className="h-full border-0 bg-white dark:bg-gray-800 shadow-sm">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-6">
            <svg className="h-8 w-8 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
          </div>

          {testimonial.rating && (
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          )}

          <p className="flex-1 text-gray-600 dark:text-gray-300 italic mb-6">{testimonial.quote}</p>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{getInitials(testimonial.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{testimonial.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

