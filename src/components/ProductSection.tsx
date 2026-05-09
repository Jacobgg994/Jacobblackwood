import { useInView } from '../hooks/useInView.ts'
import { useSiteData } from '../context/SiteDataContext.tsx'
import type { Product } from '../data/defaultData.ts'

/* ── Icon map ── */
function ProductIcon({ type }: { type: Product['iconType'] }) {
  const props = { className: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.8 }
  switch (type) {
    case 'database': return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
    case 'shield': return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    case 'chart': return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    case 'chat': return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    case 'shop': return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    case 'gear': return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    default: return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  }
}

const iconStyles: Record<Product['iconType'], { bgLight: string; color: string }> = {
  database: { bgLight: 'bg-blue-50', color: 'from-blue-500 to-blue-600' },
  shield: { bgLight: 'bg-emerald-50', color: 'from-emerald-500 to-emerald-600' },
  chart: { bgLight: 'bg-violet-50', color: 'from-violet-500 to-violet-600' },
  chat: { bgLight: 'bg-amber-50', color: 'from-amber-500 to-orange-500' },
  shop: { bgLight: 'bg-pink-50', color: 'from-pink-500 to-rose-500' },
  gear: { bgLight: 'bg-cyan-50', color: 'from-cyan-500 to-teal-500' },
}

export default function ProductSection() {
  const { ref, inView } = useInView(0.1)
  const { data } = useSiteData()

  return (
    <section id="products" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto mb-16 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 border border-primary-100 rounded-full mb-4">สินค้าของเรา</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">บริการ<span className="gradient-text">ครบวงจร</span>ที่ตอบโจทย์</h2>
          <p className="text-gray-500 text-lg">เลือกสินค้าและบริการที่เหมาะกับธุรกิจของคุณ ทุกผลิตภัณฑ์ผ่านการพัฒนาอย่างพิถีพิถัน</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.products.map((product, i) => {
            const style = iconStyles[product.iconType] || iconStyles.gear
            return (
              <div key={product.id} className={`group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary-600/5 hover:-translate-y-1 transition-all duration-300 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-14 h-14 rounded-2xl ${style.bgLight} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${style.color} bg-clip-text text-transparent`}>
                    <ProductIcon type={product.iconType} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.desc}</p>
                {product.highlight && (
                  <div className="flex items-center gap-2 mb-5">
                    <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span className="text-sm font-medium text-primary-600">{product.highlight}</span>
                  </div>
                )}
                <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 group/btn">
                  ดูรายละเอียด
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
