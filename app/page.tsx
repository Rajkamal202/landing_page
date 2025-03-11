import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-product"
import BrandStory from "@/components/brand-story"
import Testimonials from "@/components/testimonials"
import CtaSection from "@/components/cta-section"
import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import Collections from "@/components/collections"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <BrandStory />
        <Collections />
        <Testimonials />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}

