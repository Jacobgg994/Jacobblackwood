import { useInView } from '../hooks/useInView.ts'
import { useSiteData } from '../context/SiteDataContext.tsx'

export default function PricingSection() {
  const { ref, inView } = useInView(0.1)
  const { data } = useSiteData()

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto mb-16 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 border border-primary-100 rounded-full mb-4">แพ็กเกจราคา</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">เลือกแพ็กเกจที่<span className="gradient-text">เหมาะกับคุณ</span></h2>
          <p className="text-gray-500 text-lg">ราคาเป็นกันเอง คุ้มค่าทุกบาท พร้อมทดลองใช้ฟรี 7 วัน</p>
        </div>

        <div className={`grid gap-6 lg:gap-8 items-start ${
          data.pricing.length <= 3 ? 'md:grid-cols-3' :
          data.pricing.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' :
          'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {data.pricing.map((plan, i) => (
            <div key={plan.id} className={`relative bg-white rounded-2xl border transition-all duration-300 ${
              plan.featured ? 'border-primary-200 shadow-2xl shadow-primary-600/10 scale-[1.03] md:scale-105 z-10' : 'border-gray-100 shadow-sm hover:shadow-lg hover:shadow-gray-200/50'
            } ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s` }}>
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="shimmer inline-flex items-center gap-1.5 px-5 py-1.5 text-xs font-bold text-white rounded-full shadow-lg shadow-primary-600/30">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    แนะนำ
                  </span>
                </div>
              )}
              <div className="p-8">
                <div className="mb-6">
                  <span className={`text-sm font-semibold ${plan.featured ? 'text-primary-600' : 'text-gray-500'}`}>{plan.name}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{plan.nameTh}</h3>
                </div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-gray-900">฿{plan.price}</span>
                  <span className="text-gray-400 text-sm mb-2">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-8">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3">
                      {f.included ? (
                        <svg className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                      )}
                      <span className={`text-sm ${f.included ? 'text-gray-700' : 'text-gray-400'}`}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.featured ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:-translate-y-0.5' : 'bg-primary-50 text-primary-600 hover:bg-primary-100 border border-primary-200'
                }`}>{plan.cta}</a>
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center text-sm text-gray-400 mt-10 ${inView ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          * ทุกแพ็กเกจสามารถทดลองใช้ฟรี 7 วัน · ยกเลิกได้ทุกเมื่อ · ไม่มีค่าใช้จ่ายแอบแฝง
        </p>
      </div>
    </section>
  )
}
