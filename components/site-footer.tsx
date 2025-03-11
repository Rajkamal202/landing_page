import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300" data-testid="site-footer">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-4">CHRONO</h3>
            <p className="text-sm text-gray-400 mb-4">
              Crafting exceptional timepieces since 1875. Our watches combine traditional craftsmanship with modern
              innovation.
            </p>
            <div className="flex space-x-4">
              {[
                { href: siteConfig.links.facebook, icon: Facebook, label: "Facebook" },
                { href: siteConfig.links.instagram, icon: Instagram, label: "Instagram" },
                { href: siteConfig.links.twitter, icon: Twitter, label: "Twitter" },
                { href: siteConfig.links.youtube, icon: Youtube, label: "YouTube" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Collections</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Heritage Collection",
                "Nautical Collection",
                "Metropolitan Collection",
                "Celestial Collection",
                "Limited Editions",
              ].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-accent transition-colors hover-underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Information</h3>
            <ul className="space-y-3 text-sm">
              {["About Us", "Craftsmanship", "Store Locator", "Careers", "Press"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-accent transition-colors hover-underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Customer Service</h3>
            <ul className="space-y-3 text-sm">
              {["Contact Us", "Shipping & Returns", "Warranty & Repairs", "FAQ", "Care Guide"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-accent transition-colors hover-underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} CHRONO. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <Link key={index} href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

