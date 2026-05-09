import { useState, useEffect } from 'react'
import { SiteDataProvider, SiteDataContext } from './context/SiteDataContext.tsx'
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
import AdminLogin from './pages/AdminLogin.tsx'

const SESSION_KEY = 'jacob_admin_auth'

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
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true')

  function handleLogin() {
    sessionStorage.setItem(SESSION_KEY, 'true')
    setAuthed(true)
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    window.location.hash = ''
  }

  return (
    <SiteDataProvider>
      {isAdmin ? (
        authed ? (
          <AdminPage onBack={() => { window.location.hash = '' }} onLogout={handleLogout} />
        ) : (
          <AdminLogin onSuccess={handleLogin} onBack={() => { window.location.hash = '' }} />
        )
      ) : (
        <div className="min-h-screen bg-white text-gray-800">
          <Header />
          <main>
            <SiteDataContext.Consumer>
              {ctx => ctx?.data.layout.map(section => {
                if (!section.visible) return null
                switch (section.type) {
                  case 'hero': return <HeroSection key={section.id} />
                  case 'products': return <ProductSection key={section.id} />
                  case 'benefits': return <BenefitSection key={section.id} />
                  case 'pricing': return <PricingSection key={section.id} />
                  case 'reviews': return <ReviewSection key={section.id} />
                  case 'faq': return <FAQSection key={section.id} />
                  case 'contact': return <ContactSection key={section.id} />
                  default: return null
                }
              })}
            </SiteDataContext.Consumer>
          </main>
          <Footer />
        </div>
      )}
    </SiteDataProvider>
  )
}
