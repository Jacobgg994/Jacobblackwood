export default function HeroSection() {
  return (
    <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-100/60 via-primary-50/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary-50/50 to-transparent rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="animate-slide-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              บริการดิจิทัลคุณภาพสูง
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
              สินค้าคุณภาพ
              <br />
              <span className="gradient-text">พร้อมบริการ</span>
              <br />
              ที่เชื่อถือได้
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mb-8">
              เรามุ่งมั่นพัฒนาสินค้าและบริการดิจิทัลที่ตอบโจทย์ทุกความต้องการ
              ด้วยคุณภาพระดับพรีเมียม ราคาที่คุ้มค่า และทีมงานที่พร้อมดูแลคุณ
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                id="hero-cta-primary"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-primary-600 rounded-2xl hover:bg-primary-700 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 transition-all duration-200 hover:-translate-y-0.5 animate-pulse-glow"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                สั่งซื้อเลย
              </a>
              <a
                href="#pricing"
                id="hero-cta-secondary"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-semibold text-primary-600 bg-primary-50 border border-primary-200 rounded-2xl hover:bg-primary-100 hover:border-primary-300 transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                ดูราคา
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4.5 h-4.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ลูกค้า 10,000+</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4.5 h-4.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ตอบแชท 24 ชม.</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4.5 h-4.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>รับประกันคุณภาพ</span>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="animate-slide-in-right delay-200 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-3xl blur-2xl" />
              <img
                src="/hero.png"
                alt="สินค้าดิจิทัลพรีเมียม"
                className="relative w-full max-w-lg rounded-3xl animate-float"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-3 sm:p-4 animate-fade-in-up delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">ความพึงพอใจ</p>
                    <p className="text-sm font-bold text-gray-800">99.8%</p>
                  </div>
                </div>
              </div>
              {/* Floating stat */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-3 sm:p-4 animate-fade-in-up delay-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">ยอดขาย</p>
                    <p className="text-sm font-bold text-gray-800">+250%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
