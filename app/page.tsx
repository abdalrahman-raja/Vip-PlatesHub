import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturedPlates from "@/components/featured-plates"
import EmiratesGrid from "@/components/emirates-grid"
import PaymentMethods from "@/components/payment-methods"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturedPlates />
      <EmiratesGrid />
      <PaymentMethods />
      <Footer />
      <FloatingContact />
    </main>
  )
}
