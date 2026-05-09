import { useState, useEffect } from 'react'
import { SiteDataProvider } from './context/SiteDataContext.tsx'
import Header from './components/Header.tsx'
import HeroSection from './components/HeroSection.tsx'
import ProductSection from './components/ProductSection.tsx'
import BenefitSection from './components/BenefitSection.tsx'
import PricingSection from './components/PricingSection.tsx'
import ReviewSection from './components/ReviewSection.tsx'
import FAQSection from './components/FAQSection.tsx'
import ContactSection from './components/ContactSection.tsx'
import Footer from './components/Footer.tsx'
import AdminPage from './pages/AdminPage.tsx'

/* Simple hash-based routing */
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash)
  useEffect(() => {
    const handler = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  return route
}

export default function App() {
  const route = useHashRoute()
  const isAdmin = route === '#admin'

  return (
    <SiteDataProvider>
      {isAdmin ? (
        <AdminPage onBack={() => { window.location.hash = '' }} />
      ) : (
        <div className="min-h-screen bg-white text-gray-800">
          <Header />
          <main>
            <HeroSection />
            <ProductSection />
            <BenefitSection />
            <PricingSection />
            <ReviewSection />
            <FAQSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </SiteDataProvider>
  )
}
