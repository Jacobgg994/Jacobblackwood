import { useInView } from '../hooks/useInView.ts'
import { useSiteData } from '../context/SiteDataContext.tsx'

const trustItems = [
  { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: 'ลูกค้าใช้งานจริง', desc: 'มากกว่า 10,000 ธุรกิจไว้วางใจ' },
  { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, title: 'ตอบแชทไว', desc: 'เฉลี่ยตอบภายใน 5 นาที' },
  { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: 'บริการปลอดภัย', desc: 'เข้ารหัสข้อมูลทุกขั้นตอน' },
  { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, title: 'ดูแลหลังซื้อ', desc: 'พร้อมช่วยเหลือตลอดการใช้งาน' },
]

export default function ReviewSection() {
  const { ref, inView } = useInView(0.1)
  const { data } = useSiteData()

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto mb-16 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 border border-primary-100 rounded-full mb-4">รีวิวจากลูกค้า</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">ลูกค้า<span className="gradient-text">ไว้วางใจ</span>เรา</h2>
          <p className="text-gray-500 text-lg">เสียงตอบรับจากลูกค้าจริงที่ใช้บริการของเรา</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {data.reviews.map((r, i) => (
            <div key={r.id} className={`group bg-[#F8FAFC] hover:bg-white rounded-2xl p-7 border border-gray-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center text-xl">{r.avatar}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 ${inView ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          {trustItems.map((t) => (
            <div key={t.title} className="text-center p-6 bg-gradient-to-b from-primary-50/60 to-white rounded-2xl border border-primary-100/40 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-3 text-primary-600">{t.icon}</div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">{t.title}</h4>
              <p className="text-xs text-gray-400">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
