import { useState } from 'react'
import { useInView } from '../hooks/useInView.ts'
import { useSiteData } from '../context/SiteDataContext.tsx'
import type { FAQItem } from '../data/defaultData.ts'

function FAQAccordion({ faq, index, inView }: { faq: FAQItem; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'bg-white shadow-lg shadow-primary-600/5 border-primary-100' : 'bg-white hover:border-gray-200'} ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.1}s` }}>
      <button id={`faq-btn-${index}`} onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-6 text-left">
        <div className="flex items-center gap-4">
          <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${open ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600'}`}>{index + 1}</span>
          <span className="font-semibold text-gray-800">{faq.q}</span>
        </div>
        <svg className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-6 pb-6 pl-[4.5rem] text-sm text-gray-500 leading-relaxed">{faq.a}</p>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const { ref, inView } = useInView(0.1)
  const { data } = useSiteData()

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center mb-12 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 border border-primary-100 rounded-full mb-4">คำถามที่พบบ่อย</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">มี<span className="gradient-text">คำถาม</span>ไหม?</h2>
          <p className="text-gray-500 text-lg">รวบรวมคำถามที่พบบ่อยเพื่อให้คุณได้คำตอบอย่างรวดเร็ว</p>
        </div>
        <div className="space-y-3">
          {data.faqs.map((faq, i) => <FAQAccordion key={faq.id} faq={faq} index={i} inView={inView} />)}
        </div>
        <div className={`text-center mt-10 ${inView ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <p className="text-gray-500 text-sm">ยังมีคำถามเพิ่มเติม? <a href="#contact" className="text-primary-600 font-semibold hover:underline">ติดต่อทีมงานเราได้เลย</a></p>
        </div>
      </div>
    </section>
  )
}
