"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    // Add event listener
    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
      data-testid="site-header"
    >
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 lg:gap-10">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex justify-between items-center mb-8">
                <Link
                  href="/"
                  className="font-serif text-2xl font-bold tracking-tight"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CHRONO
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-6">
                {[
                  { href: "#", label: "Home" },
                  { href: "#", label: "Collections" },
                  { href: "#", label: "Our Story" },
                  { href: "#", label: "Journal" },
                  { href: "#", label: "Contact" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-lg font-medium hover:text-primary transition-colors hover-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t mt-8">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
            CHRONO
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: "#", label: "Home" },
              { href: "#", label: "Collections" },
              { href: "#", label: "Our Story" },
              { href: "#", label: "Journal" },
              { href: "#", label: "Contact" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors hover-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="hidden md:block"
              >
                <ThemeToggle />
              </motion.div>
            )}
          </AnimatePresence>
          <Button variant="ghost" size="icon" className="text-foreground" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground" aria-label="Account">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground relative" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}

