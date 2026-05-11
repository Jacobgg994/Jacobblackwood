import { useInView } from '../hooks/useInView.ts'
import { useSiteData } from '../context/SiteDataContext.tsx'
import type { ContactChannel } from '../data/defaultData.ts'

function ContactIcon({ type }: { type: ContactChannel['iconType'] }) {
  switch (type) {
    case 'line': return <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.813 2 10.5c0 4.21 3.75 7.74 8.81 8.4.34.07.81.23.93.52.1.27.07.68.03.95l-.15.92c-.05.28-.21 1.1.97.6 1.18-.5 6.35-3.74 8.66-6.41C23.08 13.4 22 11.36 22 10.5 22 5.813 17.52 2 12 2z"/></svg>
    case 'facebook': return <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    case 'phone': return <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
    case 'email': return <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    case 'instagram': return <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
    case 'tiktok': return <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.7 4.59c1.57-1.57 2.45-3.7 2.45-5.93V9.4a8.16 8.16 0 004.74 1.52v-3.4a4.85 4.85 0 01-1.45-.83z"/></svg>
    case 'telegram': return <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
    default: return <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
  }
}

const iconColors: Record<ContactChannel['iconType'], { lightBg: string; textColor: string }> = {
  line: { lightBg: 'bg-green-50', textColor: 'text-green-600' },
  facebook: { lightBg: 'bg-blue-50', textColor: 'text-blue-600' },
  phone: { lightBg: 'bg-violet-50', textColor: 'text-violet-600' },
  email: { lightBg: 'bg-amber-50', textColor: 'text-amber-600' },
  instagram: { lightBg: 'bg-pink-50', textColor: 'text-pink-600' },
  tiktok: { lightBg: 'bg-gray-50', textColor: 'text-gray-800' },
  telegram: { lightBg: 'bg-sky-50', textColor: 'text-sky-500' },
  custom: { lightBg: 'bg-cyan-50', textColor: 'text-cyan-600' },
}

export default function ContactSection() {
  const { ref, inView } = useInView(0.1)
  const { data } = useSiteData()

  const cData = data.contactSection || {
    badge: "ติดต่อเรา",
    title1: "พร้อม",
    highlight: "เริ่มต้น",
    title2: "แล้วหรือยัง?",
    description: "สนใจสินค้า ทักหาแอดมินเพื่อสอบถามรายละเอียดได้ทันที",
    ctaTitle: "เริ่มต้นใช้งานวันนี้",
    ctaDesc: "ไม่ว่าคุณจะมีคำถามอะไร ทีมงานพร้อมให้บริการคุณ ทักหาเราได้เลย ไม่ต้องรอ!",
    ctaButton: "ติดต่อเราเลย"
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-50/40 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto mb-14 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 border border-primary-100 rounded-full mb-4">{cData.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{cData.title1}<span className="gradient-text">{cData.highlight}</span>{cData.title2}</h2>
          <p className="text-gray-500 text-lg">{cData.description}</p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(data.contacts.length, 4)} gap-4 sm:gap-6 mb-12 ${inView ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          {data.contacts.map((ch) => {
            const colors = iconColors[ch.iconType] || iconColors.custom
            return (
              <a key={ch.id} href={ch.link}
                className="group bg-[#F8FAFC] hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300 text-center">
                <div className={`w-14 h-14 rounded-2xl ${colors.lightBg} flex items-center justify-center mx-auto mb-4 ${colors.textColor} group-hover:scale-110 transition-transform duration-300`}>
                  <ContactIcon type={ch.iconType} />
                </div>
                <h4 className="text-sm font-bold text-gray-800 mb-1">{ch.name}</h4>
                <p className="text-xs text-gray-400">{ch.value}</p>
              </a>
            )
          })}
        </div>

        <div className={`text-center ${inView ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <div className="bg-gradient-to-br from-primary-600 via-primary-600 to-primary-700 rounded-3xl p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{cData.ctaTitle}</h3>
              <p className="text-primary-100 text-sm sm:text-base max-w-lg mx-auto mb-8">{cData.ctaDesc}</p>
              <a href={cData.ctaButtonLink || "#"} id="contact-cta" className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-bold text-primary-600 bg-white rounded-2xl hover:bg-primary-50 shadow-xl shadow-black/10 hover:-translate-y-0.5 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                {cData.ctaButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
