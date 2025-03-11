"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { z } from "zod"

const emailSchema = z.string().email({ message: "Please enter a valid email address" })

export default function CtaSection() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // Validate email
      emailSchema.parse(email)

      // Show loading state
      setIsSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success notification
    toast("Subscription successful", {
    description: "Thank you for subscribing to our newsletter.",
    });


      // Reset form
      setEmail("")
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else {
        setError("An error occurred. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} className="py-24 bg-primary text-white" data-testid="cta-section">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Join Our <span className="text-accent">Exclusive Circle</span>
            </h2>
            <p className="text-primary-foreground/80 md:text-lg max-w-[500px]">
              Subscribe to our newsletter for exclusive updates on new collections, limited editions, and invitations to
              private events.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  aria-describedby={error ? "email-error" : undefined}
                  data-testid="email-input"
                />
                {error && (
                  <p id="email-error" className="text-sm text-red-300" data-testid="email-error">
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent text-primary hover:bg-accent/90"
                disabled={isSubmitting}
                data-testid="subscribe-button"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
              <p className="text-sm text-primary-foreground/60 text-center">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

