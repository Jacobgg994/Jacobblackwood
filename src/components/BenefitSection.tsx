import { useInView } from '../hooks/useInView.ts'

const benefits = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    title: 'ใช้งานง่าย',
    desc: 'ออกแบบ UI/UX มาให้ใช้งานง่าย ไม่ต้องมีความรู้ด้านเทคนิค ทุกคนสามารถเริ่มใช้งานได้ทันที',
    color: 'bg-blue-500',
    lightBg: 'bg-blue-50',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'ราคาคุ้มค่า',
    desc: 'แพ็กเกจหลากหลาย เลือกได้ตามงบประมาณ ไม่มีค่าใช้จ่ายแอบแฝง จ่ายเท่าที่ใช้จริง',
    color: 'bg-emerald-500',
    lightBg: 'bg-emerald-50',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'รองรับหลายแพลตฟอร์ม',
    desc: 'ใช้งานได้ทุกอุปกรณ์ ทั้งคอมพิวเตอร์ มือถือ และแท็บเล็ต ซิงค์ข้อมูลแบบเรียลไทม์',
    color: 'bg-violet-500',
    lightBg: 'bg-violet-50',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'บริการหลังการขาย',
    desc: 'ทีมงานพร้อมดูแลคุณตลอด 24 ชั่วโมง ตอบทุกคำถาม แก้ไขทุกปัญหาอย่างรวดเร็ว',
    color: 'bg-amber-500',
    lightBg: 'bg-amber-50',
  },
]

export default function BenefitSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="benefits" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 border border-primary-100 rounded-full mb-4">
            ทำไมต้องเลือกเรา
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            จุดเด่นที่ทำให้เรา<span className="gradient-text">แตกต่าง</span>
          </h2>
          <p className="text-gray-500 text-lg">
            เรามุ่งมั่นส่งมอบประสบการณ์ที่ดีที่สุดให้กับลูกค้าทุกท่าน
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`group relative bg-[#F8FAFC] hover:bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300 ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="flex gap-5">
                {/* Icon */}
                <div className={`shrink-0 w-14 h-14 rounded-2xl ${b.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-gray-700">
                    {b.icon}
                  </div>
                </div>
                {/* Text */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${b.lightBg} rounded-bl-[2.5rem] rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className={`mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 ${inView ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          {[
            { value: '10,000+', label: 'ลูกค้าทั่วประเทศ' },
            { value: '99.9%', label: 'ระบบออนไลน์ตลอด' },
            { value: '24/7', label: 'ทีมซัพพอร์ต' },
            { value: '4.9/5', label: 'คะแนนความพึงพอใจ' },
          ].map((s) => (
            <div key={s.label} className="text-center p-6 bg-gradient-to-b from-primary-50/50 to-white rounded-2xl border border-primary-100/50">
              <p className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
