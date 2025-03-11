"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // This would be where you'd typically send analytics data
      // For example, using Google Analytics, Plausible, or Vercel Analytics
      const url = searchParams?.size ? `${pathname}?${searchParams}` : pathname

      // Example of what you might do with a real analytics service:
      // window.gtag("config", "GA-MEASUREMENT-ID", {
      //   page_path: url,
      // })

      console.log(`Page view: ${url}`)
    }
  }, [pathname, searchParams])

  return null
}

