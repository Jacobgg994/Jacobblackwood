import { useState } from 'react'
import { useSiteData } from '../context/SiteDataContext.tsx'
import { genId, type ContactChannel, type Product } from '../data/defaultData.ts'

/* ── Icon type options ── */
const contactIconOptions = [
  { value: 'line', label: 'LINE' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'phone', label: 'โทรศัพท์' },
  { value: 'email', label: 'Email' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'custom', label: 'อื่น ๆ' },
] as const

const productIconOptions = [
  { value: 'database', label: '💾 ฐานข้อมูล' },
  { value: 'shield', label: '🛡️ ความปลอดภัย' },
  { value: 'chart', label: '📊 วิเคราะห์' },
  { value: 'chat', label: '💬 แชท' },
  { value: 'shop', label: '🛒 ร้านค้า' },
  { value: 'gear', label: '⚙️ ระบบ' },
] as const

type Tab = 'layout' | 'brand' | 'hero' | 'benefits' | 'products' | 'pricing' | 'reviews' | 'faqs' | 'contacts'

/* ══════════════════════════════════════ */
export default function AdminPage({ onBack, onLogout }: { onBack: () => void; onLogout?: () => void }) {
  const ctx = useSiteData()
  const [tab, setTab] = useState<Tab>('layout')
  const [toast, setToast] = useState('')
  const [deploying, setDeploying] = useState(false)

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function handleDeploy() {
    if (deploying) return
    const confirmed = window.confirm('ต้องการ Deploy ข้อมูลขึ้น Vercel หรือไม่?\n\nระบบจะบันทึกข้อมูลลงไฟล์ → commit → push ขึ้น GitHub\nVercel จะอัปเดตอัตโนมัติภายใน 1-2 นาที')
    if (!confirmed) return

    setDeploying(true)
    try {
      const res = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: ctx.data }),
      })
      const result = await res.json()
      if (result.ok) {
        showToast(result.message || 'Deploy สำเร็จ!')
      } else {
        showToast('❌ ' + (result.error || 'Deploy ล้มเหลว'))
      }
    } catch (err: any) {
      showToast('❌ ไม่สามารถเชื่อมต่อ API ได้ (ต้องรันใน localhost)')
    } finally {
      setDeploying(false)
    }
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'layout', label: 'โครงสร้างเว็บ', icon: '🧩' },
    { key: 'brand', label: 'แบรนด์', icon: '🏷️' },
    { key: 'hero', label: 'ส่วนหัว', icon: '🎯' },
    { key: 'benefits', label: 'ข้อดี', icon: '✨' },
    { key: 'contacts', label: 'ช่องทางติดต่อ', icon: '📱' },
    { key: 'products', label: 'สินค้า', icon: '📦' },
    { key: 'pricing', label: 'แพ็กเกจราคา', icon: '💰' },
    { key: 'reviews', label: 'รีวิว', icon: '⭐' },
    { key: 'faqs', label: 'คำถามที่พบบ่อย', icon: '❓' },
  ]

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: '"Noto Sans Thai", "Inter", system-ui, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 transition" title="กลับหน้าหลัก">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-gray-800">⚙️ จัดการข้อมูลเว็บไซต์</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { ctx.resetAll(); showToast('รีเซ็ตข้อมูลเรียบร้อย') }}
              className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition">
              🔄 รีเซ็ต
            </button>
            {onLogout && (
              <button onClick={onLogout}
                className="px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                🚪 ออกจากระบบ
              </button>
            )}
            <button onClick={onBack}
              className="px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              👁️ ดูหน้าเว็บ
            </button>
            <button onClick={handleDeploy} disabled={deploying}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-md shadow-green-600/20 transition-all disabled:opacity-60 disabled:cursor-wait flex items-center gap-1.5">
              {deploying ? (
                <><svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> กำลัง Deploy...</>
              ) : (
                '🚀 Deploy'
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl shadow-lg animate-fade-in-up">
          ✅ {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                tab === t.key ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {tab === 'layout' && <LayoutTab ctx={ctx} showToast={showToast} />}
          {tab === 'brand' && <BrandTab ctx={ctx} showToast={showToast} />}
          {tab === 'hero' && <HeroTab ctx={ctx} />}
          {tab === 'benefits' && <BenefitsTab ctx={ctx} />}
          {tab === 'contacts' && <ContactsTab ctx={ctx} showToast={showToast} />}
          {tab === 'products' && <ProductsTab ctx={ctx} showToast={showToast} />}
          {tab === 'pricing' && <PricingTab ctx={ctx} showToast={showToast} />}
          {tab === 'reviews' && <ReviewsTab ctx={ctx} showToast={showToast} />}
          {tab === 'faqs' && <FaqsTab ctx={ctx} showToast={showToast} />}
        </div>
      </div>
    </div>
  )
}

/* ── shared styling ── */
const inputCls = 'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition'
const labelCls = 'block text-xs font-semibold text-gray-500 mb-1'
const cardCls = 'bg-gray-50 rounded-xl p-4 border border-gray-100'
const addBtnCls = 'inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition'
const delBtnCls = 'p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition'

/* ═══════ Layout ═══════ */
function LayoutTab({ ctx }: { ctx: ReturnType<typeof useSiteData>; showToast: (m: string) => void }) {
  const { data, updateLayoutItem, setLayout } = ctx

  function moveUp(index: number) {
    if (index === 0) return
    const newLayout = [...data.layout]
    const temp = newLayout[index - 1]
    newLayout[index - 1] = newLayout[index]
    newLayout[index] = temp
    setLayout(newLayout)
  }

  function moveDown(index: number) {
    if (index === data.layout.length - 1) return
    const newLayout = [...data.layout]
    const temp = newLayout[index + 1]
    newLayout[index + 1] = newLayout[index]
    newLayout[index] = temp
    setLayout(newLayout)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">🧩 โครงสร้างเว็บ ({data.layout.length} ส่วน)</h2>
      </div>
      <div className="space-y-3">
        {data.layout.map((item, i) => (
          <div key={item.id} className={`${cardCls} flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <span className="text-lg text-gray-400 font-bold w-6">{i + 1}</span>
              <div className="flex flex-col">
                <span className={`text-base font-semibold ${item.visible ? 'text-gray-900' : 'text-gray-400 line-through'}`}>{item.label}</span>
                <span className="text-xs text-gray-400">ชนิด: {item.type}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Visibility Toggle */}
              <button 
                onClick={() => updateLayoutItem(item.id, { visible: !item.visible })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${item.visible ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {item.visible ? '👁️ แสดง' : '🙈 ซ่อน'}
              </button>
              
              {/* Order Controls */}
              <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-100">
                <button onClick={() => moveUp(i)} disabled={i === 0} className={`p-1.5 rounded-md ${i === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:shadow-sm text-gray-600'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                </button>
                <button onClick={() => moveDown(i)} disabled={i === data.layout.length - 1} className={`p-1.5 rounded-md ${i === data.layout.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:shadow-sm text-gray-600'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-6 text-center">เคล็ดลับ: คุณสามารถกดลูกศร ⬆️ ⬇️ เพื่อจัดเรียงตำแหน่งของแต่ละส่วน และกด 👁️/🙈 เพื่อซ่อนหรือเปิดแสดงผลได้</p>
    </div>
  )
}

/* ═══════ Contacts ═══════ */
function ContactsTab({ ctx, showToast }: { ctx: ReturnType<typeof useSiteData>; showToast: (m: string) => void }) {
  const { data, updateContact, removeContact, addContact, setContacts, updateContactSection } = ctx

  function moveUp(index: number) {
    if (index === 0) return
    const newContacts = [...data.contacts]
    const temp = newContacts[index - 1]
    newContacts[index - 1] = newContacts[index]
    newContacts[index] = temp
    setContacts(newContacts)
  }

  function moveDown(index: number) {
    if (index === data.contacts.length - 1) return
    const newContacts = [...data.contacts]
    const temp = newContacts[index + 1]
    newContacts[index + 1] = newContacts[index]
    newContacts[index] = temp
    setContacts(newContacts)
  }

  function handleAdd() {
    addContact({ id: genId(), name: 'ช่องทางใหม่', value: '', link: '#', iconType: 'custom' })
    showToast('เพิ่มช่องทางติดต่อแล้ว')
  }

  const defaultContactSection = {
    badge: "ติดต่อเรา",
    title1: "พร้อม",
    highlight: "เริ่มต้น",
    title2: "แล้วหรือยัง?",
    description: "สนใจสินค้า ทักหาแอดมินเพื่อสอบถามรายละเอียดได้ทันที",
    ctaTitle: "เริ่มต้นใช้งานวันนี้",
    ctaDesc: "ไม่ว่าคุณจะมีคำถามอะไร ทีมงานพร้อมให้บริการคุณ ทักหาเราได้เลย ไม่ต้องรอ!",
    ctaButton: "ติดต่อเราเลย"
  }
  const cData = data.contactSection || defaultContactSection;

  return (
    <div>
      <div className="space-y-4 max-w-2xl mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-2">ข้อมูลส่วนหัว (Contact Header)</h3>
        <div>
          <label className={labelCls}>ป้ายกำกับ (Badge)</label>
          <input value={cData.badge} onChange={e => updateContactSection({ ...cData, badge: e.target.value })} className={inputCls} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className={labelCls}>หัวข้อบรรทัด 1</label><input value={cData.title1} onChange={e => updateContactSection({ ...cData, title1: e.target.value })} className={inputCls} /></div>
          <div><label className={labelCls}>เน้นคำ (Highlight)</label><input value={cData.highlight} onChange={e => updateContactSection({ ...cData, highlight: e.target.value })} className={inputCls} /></div>
          <div><label className={labelCls}>หัวข้อบรรทัด 2</label><input value={cData.title2} onChange={e => updateContactSection({ ...cData, title2: e.target.value })} className={inputCls} /></div>
        </div>
        <div>
          <label className={labelCls}>คำอธิบาย</label>
          <input value={cData.description} onChange={e => updateContactSection({ ...cData, description: e.target.value })} className={inputCls} />
        </div>

        <h3 className="text-sm font-bold text-gray-800 mt-6 mb-2">กล่องข้อความ CTA (เริ่มต้นใช้งานวันนี้)</h3>
        <div><label className={labelCls}>หัวข้อหลัก</label><input value={cData.ctaTitle} onChange={e => updateContactSection({ ...cData, ctaTitle: e.target.value })} className={inputCls} /></div>
        <div><label className={labelCls}>คำอธิบาย</label><textarea value={cData.ctaDesc} onChange={e => updateContactSection({ ...cData, ctaDesc: e.target.value })} className={inputCls + ' min-h-[60px]'} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>ข้อความปุ่มกด</label><input value={cData.ctaButton} onChange={e => updateContactSection({ ...cData, ctaButton: e.target.value })} className={inputCls} placeholder="ติดต่อเราเลย" /></div>
          <div><label className={labelCls}>ลิงก์ (URL)</label><input value={cData.ctaButtonLink || ''} onChange={e => updateContactSection({ ...cData, ctaButtonLink: e.target.value })} className={inputCls} placeholder="เช่น https://line.me/ti/p/..." /></div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 border-t border-gray-100 pt-6">
        <h2 className="text-base font-bold text-gray-800">📱 ช่องทางติดต่อ ({data.contacts.length})</h2>
        <button onClick={handleAdd} className={addBtnCls}>+ เพิ่มช่องทาง</button>
      </div>
      <div className="space-y-3">
        {data.contacts.map((c, i) => (
          <div key={c.id} className={cardCls}>
            <div className="flex items-start gap-3">
              <span className="text-lg mt-1 text-gray-400 font-bold">{i + 1}</span>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className={labelCls}>ประเภท</label>
                  <select value={c.iconType} onChange={e => updateContact(c.id, { iconType: e.target.value as ContactChannel['iconType'] })} className={inputCls}>
                    {contactIconOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>ชื่อ</label>
                  <input value={c.name} onChange={e => updateContact(c.id, { name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>ข้อมูล</label>
                  <input value={c.value} onChange={e => updateContact(c.id, { value: e.target.value })} className={inputCls} placeholder="เช่น @line_id" />
                </div>
                <div>
                  <label className={labelCls}>ลิงก์</label>
                  <input value={c.link} onChange={e => updateContact(c.id, { link: e.target.value })} className={inputCls} placeholder="https://..." />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {/* Order Controls */}
                <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                  <button onClick={() => moveUp(i)} disabled={i === 0} className={`p-1 rounded ${i === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'}`} title="ย้ายขึ้น">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                  </button>
                  <button onClick={() => moveDown(i)} disabled={i === data.contacts.length - 1} className={`p-1 rounded ${i === data.contacts.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'}`} title="ย้ายลง">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
                <button onClick={() => { removeContact(c.id); showToast('ลบเรียบร้อย') }} className={delBtnCls} title="ลบ">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        {data.contacts.length === 0 && <p className="text-sm text-gray-400 text-center py-8">ยังไม่มีช่องทางติดต่อ กดปุ่ม "+ เพิ่มช่องทาง" เพื่อเริ่มต้น</p>}
      </div>
    </div>
  )
}

/* ═══════ Products ═══════ */
function ProductsTab({ ctx, showToast }: { ctx: ReturnType<typeof useSiteData>; showToast: (m: string) => void }) {
  const { data, updateProduct, removeProduct, addProduct } = ctx

  function handleAdd() {
    addProduct({ id: genId(), name: 'สินค้าใหม่', desc: '', highlight: '', iconType: 'gear' })
    showToast('เพิ่มสินค้าแล้ว')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">📦 สินค้า ({data.products.length})</h2>
        <button onClick={handleAdd} className={addBtnCls}>+ เพิ่มสินค้า</button>
      </div>
      <div className="space-y-3">
        {data.products.map((p, i) => (
          <div key={p.id} className={cardCls}>
            <div className="flex items-start gap-3">
              <span className="text-lg mt-1 text-gray-400 font-bold">{i + 1}</span>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className={labelCls}>ไอคอน</label>
                  <select value={p.iconType} onChange={e => updateProduct(p.id, { iconType: e.target.value as Product['iconType'] })} className={inputCls}>
                    {productIconOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>ชื่อสินค้า</label>
                  <input value={p.name} onChange={e => updateProduct(p.id, { name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>หมวดหมู่/แบรนด์</label>
                  <input value={p.brand || ''} onChange={e => updateProduct(p.id, { brand: e.target.value })} className={inputCls} placeholder="เช่น MINSoftware" />
                </div>
                <div>
                  <label className={labelCls}>จุดเด่น</label>
                  <input value={p.highlight} onChange={e => updateProduct(p.id, { highlight: e.target.value })} className={inputCls} />
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <label className={labelCls}>รายละเอียด</label>
                  <input value={p.desc} onChange={e => updateProduct(p.id, { desc: e.target.value })} className={inputCls} />
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <label className={labelCls}>URL รูปภาพ (เว้นว่างเพื่อใช้ไอคอน)</label>
                  <input value={p.image || ''} onChange={e => updateProduct(p.id, { image: e.target.value })} className={inputCls} placeholder="https://..." />
                </div>
              </div>
              <button onClick={() => { removeProduct(p.id); showToast('ลบสินค้าเรียบร้อย') }} className={delBtnCls} title="ลบ">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {data.products.length === 0 && <p className="text-sm text-gray-400 text-center py-8">ยังไม่มีสินค้า กดปุ่ม "+ เพิ่มสินค้า" เพื่อเริ่มต้น</p>}
      </div>
    </div>
  )
}

/* ═══════ Reviews ═══════ */
function ReviewsTab({ ctx, showToast }: { ctx: ReturnType<typeof useSiteData>; showToast: (m: string) => void }) {
  const { data, updateReview, removeReview, addReview } = ctx

  function handleAdd() {
    addReview({ id: genId(), name: 'ลูกค้า', role: '', text: '', rating: 5, avatar: '👤' })
    showToast('เพิ่มรีวิวแล้ว')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">⭐ รีวิวลูกค้า ({data.reviews.length})</h2>
        <button onClick={handleAdd} className={addBtnCls}>+ เพิ่มรีวิว</button>
      </div>
      <div className="space-y-3">
        {data.reviews.map((r, i) => (
          <div key={r.id} className={cardCls}>
            <div className="flex items-start gap-3">
              <span className="text-lg mt-1 text-gray-400 font-bold">{i + 1}</span>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className={labelCls}>Emoji</label>
                  <input value={r.avatar} onChange={e => updateReview(r.id, { avatar: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>ชื่อ</label>
                  <input value={r.name} onChange={e => updateReview(r.id, { name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>ตำแหน่ง / อาชีพ</label>
                  <input value={r.role} onChange={e => updateReview(r.id, { role: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>คะแนน (1-5)</label>
                  <input type="number" min={1} max={5} value={r.rating} onChange={e => updateReview(r.id, { rating: Number(e.target.value) })} className={inputCls} />
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <label className={labelCls}>ข้อความรีวิว</label>
                  <textarea value={r.text} onChange={e => updateReview(r.id, { text: e.target.value })} className={inputCls + ' min-h-[60px]'} />
                </div>
              </div>
              <button onClick={() => { removeReview(r.id); showToast('ลบรีวิวเรียบร้อย') }} className={delBtnCls} title="ลบ">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════ FAQs ═══════ */
function FaqsTab({ ctx, showToast }: { ctx: ReturnType<typeof useSiteData>; showToast: (m: string) => void }) {
  const { data, updateFaq, removeFaq, addFaq } = ctx

  function handleAdd() {
    addFaq({ id: genId(), q: 'คำถามใหม่', a: '' })
    showToast('เพิ่มคำถามแล้ว')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">❓ คำถามที่พบบ่อย ({data.faqs.length})</h2>
        <button onClick={handleAdd} className={addBtnCls}>+ เพิ่มคำถาม</button>
      </div>
      <div className="space-y-3">
        {data.faqs.map((f, i) => (
          <div key={f.id} className={cardCls}>
            <div className="flex items-start gap-3">
              <span className="text-lg mt-1 text-gray-400 font-bold">{i + 1}</span>
              <div className="flex-1 space-y-2">
                <div>
                  <label className={labelCls}>คำถาม</label>
                  <input value={f.q} onChange={e => updateFaq(f.id, { q: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>คำตอบ</label>
                  <textarea value={f.a} onChange={e => updateFaq(f.id, { a: e.target.value })} className={inputCls + ' min-h-[60px]'} />
                </div>
              </div>
              <button onClick={() => { removeFaq(f.id); showToast('ลบคำถามเรียบร้อย') }} className={delBtnCls} title="ลบ">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════ Brand ═══════ */
function BrandTab({ ctx, showToast }: { ctx: ReturnType<typeof useSiteData>; showToast: (m: string) => void }) {
  const { data, updateBrand } = ctx
  const b = data.brand

  return (
    <div>
      <h2 className="text-base font-bold text-gray-800 mb-4">🏷️ ข้อมูลแบรนด์</h2>
      <div className="space-y-4 max-w-lg">
        <div>
          <label className={labelCls}>ชื่อแบรนด์</label>
          <input value={b.name} onChange={e => { updateBrand({ ...b, name: e.target.value }); showToast('บันทึกแล้ว') }} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Tagline</label>
          <input value={b.tagline} onChange={e => updateBrand({ ...b, tagline: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>คำอธิบาย</label>
          <textarea value={b.description} onChange={e => updateBrand({ ...b, description: e.target.value })} className={inputCls + ' min-h-[80px]'} />
        </div>
      </div>
    </div>
  )
}

/* ═══════ Hero ═══════ */
function HeroTab({ ctx }: { ctx: ReturnType<typeof useSiteData> }) {
  const { data, updateHero } = ctx
  const h = data.hero

  const defaultIndicators = [
    { id: "t1", text: "ลูกค้า 10,000+" },
    { id: "t2", text: "ตอบแชท 24 ชม." },
    { id: "t3", text: "รับประกันคุณภาพ" }
  ]
  const currentIndicators = h.trustIndicators || defaultIndicators

  function updateTrustIndicator(index: number, text: string) {
    const newIndicators = [...currentIndicators]
    newIndicators[index] = { ...newIndicators[index], text }
    updateHero({ ...h, trustIndicators: newIndicators })
  }

  return (
    <div>
      <h2 className="text-base font-bold text-gray-800 mb-4">🎯 ส่วนหัว (Hero)</h2>
      <div className="space-y-4 max-w-2xl mb-8">
        <div>
          <label className={labelCls}>ป้ายกำกับ (Badge)</label>
          <input value={h.badge} onChange={e => { updateHero({ ...h, badge: e.target.value }) }} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>หัวข้อบรรทัด 1</label>
          <input value={h.titleLine1} onChange={e => updateHero({ ...h, titleLine1: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>หัวข้อบรรทัด 2 (เน้นสี)</label>
          <input value={h.titleLine2} onChange={e => updateHero({ ...h, titleLine2: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>หัวข้อบรรทัด 3</label>
          <input value={h.titleLine3} onChange={e => updateHero({ ...h, titleLine3: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>คำอธิบาย</label>
          <textarea value={h.description} onChange={e => updateHero({ ...h, description: e.target.value })} className={inputCls + ' min-h-[80px]'} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelCls}>ปุ่มหลัก (Primary CTA)</label>
            <input value={h.ctaPrimary} onChange={e => updateHero({ ...h, ctaPrimary: e.target.value })} className={inputCls} placeholder="ข้อความบนปุ่ม" />
            <input value={h.ctaPrimaryLink || ''} onChange={e => updateHero({ ...h, ctaPrimaryLink: e.target.value })} className={inputCls} placeholder="ลิงก์ เช่น #pricing หรือ https://..." />
          </div>
          <div className="space-y-2">
            <label className={labelCls}>ปุ่มรอง (Secondary CTA)</label>
            <input value={h.ctaSecondary} onChange={e => updateHero({ ...h, ctaSecondary: e.target.value })} className={inputCls} placeholder="ข้อความบนปุ่ม" />
            <input value={h.ctaSecondaryLink || ''} onChange={e => updateHero({ ...h, ctaSecondaryLink: e.target.value })} className={inputCls} placeholder="ลิงก์ เช่น #contact หรือ https://..." />
          </div>
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-800 mb-3">จุดเด่น / สร้างความเชื่อมั่น (Trust Indicators)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {currentIndicators.map((indicator, i) => (
          <div key={indicator.id} className={cardCls}>
            <label className={labelCls}>ข้อความที่ {i + 1}</label>
            <input value={indicator.text} onChange={e => updateTrustIndicator(i, e.target.value)} className={inputCls} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════ Benefits ═══════ */
function BenefitsTab({ ctx }: { ctx: ReturnType<typeof useSiteData> }) {
  const { data, updateBenefits } = ctx
  const b = data.benefits

  const defaultStats = [
    { id: "s1", value: "10,000+", label: "ลูกค้าทั่วประเทศ" },
    { id: "s2", value: "99.9%", label: "ระบบออนไลน์ตลอด" },
    { id: "s3", value: "24/7", label: "ทีมซัพพอร์ต" },
    { id: "s4", value: "4.9/5", label: "คะแนนความพึงพอใจ" }
  ]
  const currentStats = b.stats || defaultStats

  function updateItem(index: number, update: Partial<typeof b.items[0]>) {
    const items = [...b.items]
    items[index] = { ...items[index], ...update }
    updateBenefits({ ...b, items })
  }

  function updateStat(index: number, update: Partial<typeof currentStats[0]>) {
    const newStats = [...currentStats]
    newStats[index] = { ...newStats[index], ...update }
    updateBenefits({ ...b, stats: newStats })
  }

  return (
    <div>
      <h2 className="text-base font-bold text-gray-800 mb-4">✨ ข้อดีของเรา (Benefits)</h2>
      
      <div className="space-y-4 max-w-2xl mb-8">
        <div>
          <label className={labelCls}>ป้ายกำกับ (Badge)</label>
          <input value={b.badge} onChange={e => updateBenefits({ ...b, badge: e.target.value })} className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>หัวข้อหลัก</label>
            <input value={b.title} onChange={e => updateBenefits({ ...b, title: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>คำเน้น (Highlight)</label>
            <input value={b.highlight} onChange={e => updateBenefits({ ...b, highlight: e.target.value })} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>คำอธิบาย</label>
          <textarea value={b.description} onChange={e => updateBenefits({ ...b, description: e.target.value })} className={inputCls + ' min-h-[60px]'} />
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-800 mb-3">รายการข้อดี</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {b.items.map((item, i) => (
          <div key={item.id} className={cardCls}>
            <div className="mb-2">
              <label className={labelCls}>หัวข้อ</label>
              <input value={item.title} onChange={e => updateItem(i, { title: e.target.value })} className={inputCls} />
            </div>
            <div className="mb-2">
              <label className={labelCls}>รายละเอียด</label>
              <textarea value={item.desc} onChange={e => updateItem(i, { desc: e.target.value })} className={inputCls + ' min-h-[60px]'} />
            </div>
            <div>
              <label className={labelCls}>สีไอคอน</label>
              <select value={item.iconType} onChange={e => updateItem(i, { iconType: e.target.value as any })} className={inputCls}>
                <option value="blue">Blue</option>
                <option value="emerald">Emerald</option>
                <option value="violet">Violet</option>
                <option value="amber">Amber</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-bold text-gray-800 mb-3 mt-8">สถิติ (Stats)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {currentStats.map((stat, i) => (
          <div key={stat.id} className={cardCls}>
            <div className="mb-2">
              <label className={labelCls}>ตัวเลข / สถิติ</label>
              <input value={stat.value} onChange={e => updateStat(i, { value: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>คำอธิบาย</label>
              <input value={stat.label} onChange={e => updateStat(i, { label: e.target.value })} className={inputCls} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════ Pricing ═══════ */
function PricingTab({ ctx, showToast }: { ctx: ReturnType<typeof useSiteData>; showToast: (m: string) => void }) {
  const { data, updatePricingPlan, addPricingPlan, removePricingPlan, setPricing } = ctx

  function moveUp(index: number) {
    if (index === 0) return
    const newPricing = [...data.pricing]
    const temp = newPricing[index - 1]
    newPricing[index - 1] = newPricing[index]
    newPricing[index] = temp
    setPricing(newPricing)
  }

  function moveDown(index: number) {
    if (index === data.pricing.length - 1) return
    const newPricing = [...data.pricing]
    const temp = newPricing[index + 1]
    newPricing[index + 1] = newPricing[index]
    newPricing[index] = temp
    setPricing(newPricing)
  }

  function handleAdd() {
    addPricingPlan({
      id: genId(), name: 'New Plan', nameTh: 'แพ็กเกจใหม่', price: '0', period: '/เดือน',
      desc: '', featured: false, cta: 'สั่งซื้อเลย',
      features: [{ text: 'ฟีเจอร์ 1', included: true }],
    })
    showToast('เพิ่มแพ็กเกจแล้ว')
  }

  function toggleFeatured(id: string, current: boolean) {
    // Only one plan can be featured
    data.pricing.forEach(p => {
      if (p.id === id) updatePricingPlan(p.id, { featured: !current })
      else if (p.featured) updatePricingPlan(p.id, { featured: false })
    })
    showToast('บันทึกแล้ว')
  }

  function updateFeatureText(planId: string, featureIdx: number, text: string) {
    const plan = data.pricing.find(p => p.id === planId)
    if (!plan) return
    const features = plan.features.map((f, i) => i === featureIdx ? { ...f, text } : f)
    updatePricingPlan(planId, { features })
  }

  function toggleFeature(planId: string, featureIdx: number) {
    const plan = data.pricing.find(p => p.id === planId)
    if (!plan) return
    const features = plan.features.map((f, i) => i === featureIdx ? { ...f, included: !f.included } : f)
    updatePricingPlan(planId, { features })
  }

  function addFeature(planId: string) {
    const plan = data.pricing.find(p => p.id === planId)
    if (!plan) return
    updatePricingPlan(planId, { features: [...plan.features, { text: 'ฟีเจอร์ใหม่', included: true }] })
    showToast('เพิ่มฟีเจอร์แล้ว')
  }

  function removeFeature(planId: string, featureIdx: number) {
    const plan = data.pricing.find(p => p.id === planId)
    if (!plan) return
    updatePricingPlan(planId, { features: plan.features.filter((_, i) => i !== featureIdx) })
    showToast('ลบฟีเจอร์แล้ว')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">💰 แพ็กเกจราคา ({data.pricing.length})</h2>
        <button onClick={handleAdd} className={addBtnCls}>+ เพิ่มแพ็กเกจ</button>
      </div>
      <div className="space-y-6">
        {data.pricing.map((plan, i) => (
          <div key={plan.id} className={`rounded-xl border p-5 ${plan.featured ? 'border-blue-300 bg-blue-50/30' : 'border-gray-100 bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-400">{i + 1}</span>
                <span className="text-sm font-bold text-gray-800">{plan.name}</span>
                {plan.featured && <span className="px-2 py-0.5 text-[10px] font-bold text-blue-600 bg-blue-100 rounded-full">⭐ แนะนำ</span>}
              </div>
              <div className="flex items-center gap-2">
                {/* Order Controls */}
                <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                  <button onClick={() => moveUp(i)} disabled={i === 0} className={`p-1 rounded ${i === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'}`} title="ย้ายขึ้น">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                  </button>
                  <button onClick={() => moveDown(i)} disabled={i === data.pricing.length - 1} className={`p-1 rounded ${i === data.pricing.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'}`} title="ย้ายลง">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>

                <button onClick={() => toggleFeatured(plan.id, plan.featured)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${plan.featured ? 'text-blue-600 bg-blue-100 hover:bg-blue-200' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'}`}>
                  {plan.featured ? '✓ แนะนำอยู่' : 'ตั้งเป็นแนะนำ'}
                </button>
                <button onClick={() => { removePricingPlan(plan.id); showToast('ลบแพ็กเกจเรียบร้อย') }} className={delBtnCls} title="ลบ">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div>
                <label className={labelCls}>ชื่อ EN</label>
                <input value={plan.name} onChange={e => updatePricingPlan(plan.id, { name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>ชื่อ TH</label>
                <input value={plan.nameTh} onChange={e => updatePricingPlan(plan.id, { nameTh: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>ราคา</label>
                <input value={plan.price} onChange={e => updatePricingPlan(plan.id, { price: e.target.value })} className={inputCls} placeholder="เช่น 1,990" />
              </div>
              <div>
                <label className={labelCls}>ต่อ</label>
                <input value={plan.period} onChange={e => updatePricingPlan(plan.id, { period: e.target.value })} className={inputCls} placeholder="/เดือน" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>คำอธิบาย</label>
                <input value={plan.desc} onChange={e => updatePricingPlan(plan.id, { desc: e.target.value })} className={inputCls} />
              </div>
              <div className="sm:col-span-1">
                <label className={labelCls}>ข้อความปุ่ม CTA</label>
                <input value={plan.cta} onChange={e => updatePricingPlan(plan.id, { cta: e.target.value })} className={inputCls} />
              </div>
              <div className="sm:col-span-1">
                <label className={labelCls}>ลิงก์ปุ่ม CTA</label>
                <input value={plan.ctaLink || ''} onChange={e => updatePricingPlan(plan.id, { ctaLink: e.target.value })} className={inputCls} placeholder="เช่น #contact" />
              </div>
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelCls}>ฟีเจอร์</label>
                <button onClick={() => addFeature(plan.id)} className="text-xs text-blue-600 hover:text-blue-700 font-semibold">+ เพิ่มฟีเจอร์</button>
              </div>
              <div className="space-y-1.5">
                {plan.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <button onClick={() => toggleFeature(plan.id, fi)} className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs transition ${f.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {f.included ? '✓' : '✗'}
                    </button>
                    <input value={f.text} onChange={e => updateFeatureText(plan.id, fi, e.target.value)} className={inputCls + ' flex-1'} />
                    <button onClick={() => removeFeature(plan.id, fi)} className="text-red-300 hover:text-red-500 transition text-xs">✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
