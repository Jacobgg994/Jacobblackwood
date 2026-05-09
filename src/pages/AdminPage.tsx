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

type Tab = 'contacts' | 'products' | 'reviews' | 'faqs' | 'brand'

/* ══════════════════════════════════════ */
export default function AdminPage({ onBack, onLogout }: { onBack: () => void; onLogout?: () => void }) {
  const ctx = useSiteData()
  const [tab, setTab] = useState<Tab>('contacts')
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2000) }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'contacts', label: 'ช่องทางติดต่อ', icon: '📱' },
    { key: 'products', label: 'สินค้า', icon: '📦' },
    { key: 'reviews', label: 'รีวิว', icon: '⭐' },
    { key: 'faqs', label: 'คำถามที่พบบ่อย', icon: '❓' },
    { key: 'brand', label: 'แบรนด์', icon: '🏷️' },
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
              🔄 รีเซ็ตทั้งหมด
            </button>
            {onLogout && (
              <button onClick={onLogout}
                className="px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                🚪 ออกจากระบบ
              </button>
            )}
            <button onClick={onBack}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              👁️ ดูหน้าเว็บ
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
          {tab === 'contacts' && <ContactsTab ctx={ctx} showToast={showToast} />}
          {tab === 'products' && <ProductsTab ctx={ctx} showToast={showToast} />}
          {tab === 'reviews' && <ReviewsTab ctx={ctx} showToast={showToast} />}
          {tab === 'faqs' && <FaqsTab ctx={ctx} showToast={showToast} />}
          {tab === 'brand' && <BrandTab ctx={ctx} showToast={showToast} />}
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

/* ═══════ Contacts ═══════ */
function ContactsTab({ ctx, showToast }: { ctx: ReturnType<typeof useSiteData>; showToast: (m: string) => void }) {
  const { data, updateContact, removeContact, addContact } = ctx

  function handleAdd() {
    addContact({ id: genId(), name: 'ช่องทางใหม่', value: '', link: '#', iconType: 'custom' })
    showToast('เพิ่มช่องทางติดต่อแล้ว')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
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
              <button onClick={() => { removeContact(c.id); showToast('ลบเรียบร้อย') }} className={delBtnCls} title="ลบ">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
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
                  <label className={labelCls}>จุดเด่น</label>
                  <input value={p.highlight} onChange={e => updateProduct(p.id, { highlight: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>รายละเอียด</label>
                  <input value={p.desc} onChange={e => updateProduct(p.id, { desc: e.target.value })} className={inputCls} />
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
