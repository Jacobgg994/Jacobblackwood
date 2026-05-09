import { useSiteData } from '../context/SiteDataContext.tsx'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { data } = useSiteData()
  const b = data.brand

  const menuLinks = [
    { href: '#products', label: 'สินค้า' },
    { href: '#benefits', label: 'รายละเอียด' },
    { href: '#pricing', label: 'ราคา' },
    { href: '#reviews', label: 'รีวิว' },
    { href: '#faq', label: 'คำถามที่พบบ่อย' },
    { href: '#contact', label: 'ติดต่อเรา' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-xl font-bold text-white">{b.name}</span>
            </a>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">{b.description}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">เมนูลัด</h4>
            <ul className="space-y-3">
              {menuLinks.map(link => (
                <li key={link.href}><a href={link.href} className="text-sm text-gray-500 hover:text-primary-400 transition-colors duration-200">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">ช่องทางติดต่อ</h4>
            <ul className="space-y-3">
              {data.contacts.map(c => (
                <li key={c.id} className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="text-base">📌</span> {c.name}: {c.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© {currentYear} {b.name}. สงวนลิขสิทธิ์ทุกประการ</p>
        </div>
      </div>
    </footer>
  )
}
