import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  defaultSiteData,
  DATA_VERSION,
  type SiteData,
  type ContactChannel,
  type Product,
  type PricingPlan,
  type Review,
  type FAQItem,
  type BrandInfo,
  type SectionLayout,
  type HeroData,
  type BenefitsData,
  type ContactSectionData,
} from '../data/defaultData.ts'

const STORAGE_KEY = 'jacob_site_data'

/* ---------- context shape ---------- */

interface SiteDataContextValue {
  data: SiteData

  /* layout */
  setLayout: (layout: SectionLayout[]) => void
  updateLayoutItem: (id: string, update: Partial<SectionLayout>) => void

  /* brand */
  updateBrand: (brand: BrandInfo) => void

  /* hero & benefits */
  updateHero: (hero: HeroData) => void
  updateBenefits: (benefits: BenefitsData) => void

  /* contacts & contact section */
  updateContactSection: (contactSection: ContactSectionData) => void
  setContacts: (contacts: ContactChannel[]) => void
  addContact: (contact: ContactChannel) => void
  updateContact: (id: string, contact: Partial<ContactChannel>) => void
  removeContact: (id: string) => void

  /* products */
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  removeProduct: (id: string) => void

  /* pricing */
  setPricing: (pricing: PricingPlan[]) => void
  addPricingPlan: (plan: PricingPlan) => void
  updatePricingPlan: (id: string, plan: Partial<PricingPlan>) => void
  removePricingPlan: (id: string) => void

  /* reviews */
  setReviews: (reviews: Review[]) => void
  addReview: (review: Review) => void
  updateReview: (id: string, review: Partial<Review>) => void
  removeReview: (id: string) => void

  /* faqs */
  setFaqs: (faqs: FAQItem[]) => void
  addFaq: (faq: FAQItem) => void
  updateFaq: (id: string, faq: Partial<FAQItem>) => void
  removeFaq: (id: string) => void

  /* reset */
  resetAll: () => void
}

export const SiteDataContext = createContext<SiteDataContextValue | null>(null)

/* ---------- provider ---------- */

function loadFromStorage(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const stored = JSON.parse(raw) as SiteData
      // If version doesn't match (new deploy happened), use fresh defaults
      if (stored.version !== DATA_VERSION) {
        localStorage.removeItem(STORAGE_KEY)
        return defaultSiteData
      }
      return stored
    }
  } catch { /* ignore */ }
  return defaultSiteData
}

function saveToStorage(data: SiteData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(loadFromStorage)

  // Persist every change
  useEffect(() => { saveToStorage(data) }, [data])

  /* --- helper to immutably update a top-level key --- */
  function patch(partial: Partial<SiteData>) {
    setData(prev => ({ ...prev, ...partial }))
  }

  /* brand */
  const updateBrand = (brand: BrandInfo) => patch({ brand })

  /* hero & benefits */
  const updateHero = (hero: HeroData) => patch({ hero })
  const updateBenefits = (benefits: BenefitsData) => patch({ benefits })

  /* contacts & contact section */
  const updateContactSection = (contactSection: ContactSectionData) => patch({ contactSection })
  const setContacts = (contacts: ContactChannel[]) => patch({ contacts })
  const addContact = (contact: ContactChannel) => setData(p => ({ ...p, contacts: [...p.contacts, contact] }))
  const updateContact = (id: string, c: Partial<ContactChannel>) =>
    setData(p => ({ ...p, contacts: p.contacts.map(x => x.id === id ? { ...x, ...c } : x) }))
  const removeContact = (id: string) =>
    setData(p => ({ ...p, contacts: p.contacts.filter(x => x.id !== id) }))

  /* products */
  const setProducts = (products: Product[]) => patch({ products })
  const addProduct = (product: Product) => setData(p => ({ ...p, products: [...p.products, product] }))
  const updateProduct = (id: string, pr: Partial<Product>) =>
    setData(p => ({ ...p, products: p.products.map(x => x.id === id ? { ...x, ...pr } : x) }))
  const removeProduct = (id: string) =>
    setData(p => ({ ...p, products: p.products.filter(x => x.id !== id) }))

  /* pricing */
  const setPricing = (pricing: PricingPlan[]) => patch({ pricing })
  const addPricingPlan = (plan: PricingPlan) => setData(p => ({ ...p, pricing: [...p.pricing, plan] }))
  const updatePricingPlan = (id: string, plan: Partial<PricingPlan>) =>
    setData(p => ({ ...p, pricing: p.pricing.map(x => x.id === id ? { ...x, ...plan } : x) }))
  const removePricingPlan = (id: string) =>
    setData(p => ({ ...p, pricing: p.pricing.filter(x => x.id !== id) }))

  /* reviews */
  const setReviews = (reviews: Review[]) => patch({ reviews })
  const addReview = (review: Review) => setData(p => ({ ...p, reviews: [...p.reviews, review] }))
  const updateReview = (id: string, r: Partial<Review>) =>
    setData(p => ({ ...p, reviews: p.reviews.map(x => x.id === id ? { ...x, ...r } : x) }))
  const removeReview = (id: string) =>
    setData(p => ({ ...p, reviews: p.reviews.filter(x => x.id !== id) }))

  /* faqs */
  const setFaqs = (faqs: FAQItem[]) => patch({ faqs })
  const addFaq = (faq: FAQItem) => setData(p => ({ ...p, faqs: [...p.faqs, faq] }))
  const updateFaq = (id: string, f: Partial<FAQItem>) =>
    setData(p => ({ ...p, faqs: p.faqs.map(x => x.id === id ? { ...x, ...f } : x) }))
  const removeFaq = (id: string) =>
    setData(p => ({ ...p, faqs: p.faqs.filter(x => x.id !== id) }))

  /* layout actions */
  const setLayout = (layout: SectionLayout[]) => setData(p => ({ ...p, layout }))
  const updateLayoutItem = (id: string, update: Partial<SectionLayout>) => setData(p => ({ ...p, layout: p.layout.map(i => i.id === id ? { ...i, ...update } : i) }))

  /* reset */
  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY)
    setData(defaultSiteData)
  }

  return (
    <SiteDataContext.Provider value={{
      data,
      updateBrand,
      updateHero, updateBenefits,
      updateContactSection, setContacts, addContact, updateContact, removeContact,
      setProducts, addProduct, updateProduct, removeProduct,
      setPricing, addPricingPlan, updatePricingPlan, removePricingPlan,
      setReviews, addReview, updateReview, removeReview,
      setFaqs, addFaq, updateFaq, removeFaq,
      setLayout, updateLayoutItem,
      resetAll,
    }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData(): SiteDataContextValue {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used inside SiteDataProvider')
  return ctx
}
