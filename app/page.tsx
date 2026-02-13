import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import MarqueeTicker from "@/components/marquee-ticker"
import FeaturedPlates from "@/components/featured-plates"
import FeaturesSection from "@/components/features-section"
import EmiratesGrid from "@/components/emirates-grid"
import SpecialOffers from "@/components/special-offers"
import FAQSection from "@/components/faq-section"
import Testimonials from "@/components/testimonials"
import PaymentMethods from "@/components/payment-methods"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <MarqueeTicker />
      <FeaturedPlates />
      <FeaturesSection />
      <EmiratesGrid />
      <SpecialOffers />
      <PaymentMethods />
      <FAQSection />
      <Testimonials />
      <Footer />
      <FloatingContact />
    </main>
  )
}
