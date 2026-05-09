/* =============================================
   Default data for the entire landing page.
   This is used as the initial seed; runtime edits
   are persisted in localStorage via SiteDataContext.
   ============================================= */

export interface ContactChannel {
  id: string
  name: string
  value: string
  link: string
  iconType: 'line' | 'facebook' | 'phone' | 'email' | 'instagram' | 'tiktok' | 'custom'
}

export interface Product {
  id: string
  name: string
  desc: string
  highlight: string
  iconType: 'database' | 'shield' | 'chart' | 'chat' | 'shop' | 'gear'
}

export interface PricingPlan {
  id: string
  name: string
  nameTh: string
  price: string
  period: string
  desc: string
  features: { text: string; included: boolean }[]
  featured: boolean
  cta: string
}

export interface Review {
  id: string
  name: string
  role: string
  text: string
  rating: number
  avatar: string
}

export interface FAQItem {
  id: string
  q: string
  a: string
}

export interface BrandInfo {
  name: string
  tagline: string
  description: string
}

export interface SiteData {
  brand: BrandInfo
  contacts: ContactChannel[]
  products: Product[]
  pricing: PricingPlan[]
  reviews: Review[]
  faqs: FAQItem[]
}

/* ---------- helpers ---------- */
let _counter = 0
export function genId(): string {
  return `id_${Date.now()}_${++_counter}`
}

/* ---------- defaults ---------- */

export const defaultContacts: ContactChannel[] = [
  { id: genId(), name: 'LINE OA', value: '@jacobstore', link: '#', iconType: 'line' },
  { id: genId(), name: 'Facebook', value: 'JACOB Official', link: '#', iconType: 'facebook' },
  { id: genId(), name: 'เบอร์โทร', value: '02-XXX-XXXX', link: 'tel:02XXXXXXXX', iconType: 'phone' },
  { id: genId(), name: 'Email', value: 'support@jacob.th', link: 'mailto:support@jacob.th', iconType: 'email' },
]

export const defaultProducts: Product[] = [
  { id: genId(), name: 'ระบบจัดการข้อมูล', desc: 'จัดการข้อมูลธุรกิจได้อย่างเป็นระบบ ปลอดภัย เข้าถึงง่าย', highlight: 'รองรับข้อมูลไม่จำกัด', iconType: 'database' },
  { id: genId(), name: 'ระบบรักษาความปลอดภัย', desc: 'ปกป้องข้อมูลของคุณด้วยเทคโนโลยีการเข้ารหัสระดับสูง', highlight: 'เข้ารหัส AES-256', iconType: 'shield' },
  { id: genId(), name: 'ระบบวิเคราะห์ข้อมูล', desc: 'วิเคราะห์ข้อมูลเชิงลึก ช่วยตัดสินใจทางธุรกิจได้อย่างแม่นยำ', highlight: 'รายงานเรียลไทม์', iconType: 'chart' },
  { id: genId(), name: 'ระบบแชทอัตโนมัติ', desc: 'ตอบลูกค้าได้ตลอด 24 ชม. ด้วยระบบ AI Chatbot อัจฉริยะ', highlight: 'AI Chatbot', iconType: 'chat' },
  { id: genId(), name: 'ระบบร้านค้าออนไลน์', desc: 'เปิดร้านค้าออนไลน์ได้ง่าย ครบจบในที่เดียว', highlight: 'เปิดร้านใน 5 นาที', iconType: 'shop' },
  { id: genId(), name: 'ระบบ Automation', desc: 'ทำงานซ้ำ ๆ อัตโนมัติ ลดภาระ เพิ่มประสิทธิภาพทีมงาน', highlight: 'ประหยัดเวลา 80%', iconType: 'gear' },
]

export const defaultPricing: PricingPlan[] = [
  {
    id: genId(), name: 'Basic', nameTh: 'แพ็กเกจเริ่มต้น', price: '990', period: '/เดือน',
    desc: 'เหมาะสำหรับผู้เริ่มต้นธุรกิจ หรือใช้งานส่วนตัว', featured: false, cta: 'เริ่มต้นใช้งาน',
    features: [
      { text: 'ใช้งานได้ 1 โปรเจกต์', included: true },
      { text: 'พื้นที่เก็บข้อมูล 5 GB', included: true },
      { text: 'รายงานพื้นฐาน', included: true },
      { text: 'ซัพพอร์ตผ่าน LINE', included: true },
      { text: 'ระบบ Automation', included: false },
      { text: 'API Access', included: false },
      { text: 'Priority Support', included: false },
    ],
  },
  {
    id: genId(), name: 'Standard', nameTh: 'แพ็กเกจมาตรฐาน', price: '1,990', period: '/เดือน',
    desc: 'เหมาะสำหรับธุรกิจขนาดกลาง ที่ต้องการฟีเจอร์ครบ', featured: true, cta: 'เลือกแพ็กเกจนี้',
    features: [
      { text: 'ใช้งานได้ 10 โปรเจกต์', included: true },
      { text: 'พื้นที่เก็บข้อมูล 50 GB', included: true },
      { text: 'รายงานเชิงลึก', included: true },
      { text: 'ซัพพอร์ตผ่าน LINE + โทร', included: true },
      { text: 'ระบบ Automation', included: true },
      { text: 'API Access', included: true },
      { text: 'Priority Support', included: false },
    ],
  },
  {
    id: genId(), name: 'Premium', nameTh: 'แพ็กเกจพรีเมียม', price: '4,990', period: '/เดือน',
    desc: 'เหมาะสำหรับองค์กรที่ต้องการบริการเต็มรูปแบบ', featured: false, cta: 'สั่งซื้อเลย',
    features: [
      { text: 'ใช้งานได้ไม่จำกัด', included: true },
      { text: 'พื้นที่เก็บข้อมูลไม่จำกัด', included: true },
      { text: 'รายงานเชิงลึก + คาดการณ์', included: true },
      { text: 'ซัพพอร์ตทุกช่องทาง', included: true },
      { text: 'ระบบ Automation ขั้นสูง', included: true },
      { text: 'API Access เต็มรูปแบบ', included: true },
      { text: 'Priority Support 24/7', included: true },
    ],
  },
]

export const defaultReviews: Review[] = [
  { id: genId(), name: 'คุณสมชาย วงศ์ประเสริฐ', role: 'เจ้าของธุรกิจ E-commerce', text: 'ใช้บริการมาเกือบปีแล้ว ประทับใจมากครับ ระบบเสถียร ทีมงานตอบเร็ว แก้ปัญหาได้ทันที ช่วยให้ธุรกิจเราเติบโตได้อย่างมั่นใจ', rating: 5, avatar: '👨‍💼' },
  { id: genId(), name: 'คุณวิมล รัตนชัย', role: 'นักการตลาดดิจิทัล', text: 'เปรียบเทียบมาหลายเจ้าแล้ว ที่นี่คุ้มค่าที่สุด ฟีเจอร์ครบ ใช้งานง่าย ราคาเป็นกันเอง แนะนำให้เพื่อน ๆ ไปหลายคนแล้วค่ะ', rating: 5, avatar: '👩‍💻' },
  { id: genId(), name: 'คุณธนกฤต ศิริพงษ์', role: 'Freelancer', text: 'ตอนแรกลังเลอยู่ แต่ลองทดลองใช้ฟรีแล้วชอบมาก ตัดสินใจซื้อเลย ตอนนี้ใช้จัดการงานทุกอย่าง ช่วยประหยัดเวลาได้เยอะเลยครับ', rating: 5, avatar: '👨‍🎨' },
]

export const defaultFaqs: FAQItem[] = [
  { id: genId(), q: 'สั่งซื้อยังไง?', a: 'คุณสามารถสั่งซื้อได้ง่าย ๆ เพียงเลือกแพ็กเกจที่ต้องการ แล้วกดปุ่ม "สั่งซื้อ" หรือทักหาแอดมินผ่าน LINE OA เพื่อสั่งซื้อโดยตรง ทีมงานจะดำเนินการให้ภายใน 5 นาที' },
  { id: genId(), q: 'ชำระเงินช่องทางไหน?', a: 'รองรับหลายช่องทาง ได้แก่ โอนผ่านธนาคาร (SCB, KBank, BBL), PromptPay, บัตรเครดิต/เดบิต และ TrueMoney Wallet สะดวกทุกช่องทาง' },
  { id: genId(), q: 'หลังซื้อได้รับอะไร?', a: 'หลังชำระเงินเรียบร้อย คุณจะได้รับลิงก์เข้าสู่ระบบ พร้อมคู่มือการใช้งาน และข้อมูลการเข้าถึงทั้งหมดผ่านทาง Email และ LINE ภายใน 10 นาที' },
  { id: genId(), q: 'มีบริการทดลองใช้ฟรีไหม?', a: 'มีครับ! ทุกแพ็กเกจสามารถทดลองใช้ฟรี 7 วัน โดยไม่ต้องผูกบัตรเครดิต หากไม่พอใจสามารถยกเลิกได้ทันทีโดยไม่มีค่าใช้จ่าย' },
  { id: genId(), q: 'ติดต่อแอดมินได้ที่ไหน?', a: 'ติดต่อได้ทุกช่องทาง ทั้ง LINE OA: @jacobstore, Facebook Page, Email: support@jacob.th หรือโทร 02-XXX-XXXX ทีมงานพร้อมให้บริการ 24 ชั่วโมง' },
]

export const defaultBrand: BrandInfo = {
  name: 'JACOB',
  tagline: 'บริการดิจิทัลคุณภาพสูง',
  description: 'ผู้ให้บริการสินค้าดิจิทัลคุณภาพสูง พร้อมบริการหลังการขายที่ไว้วางใจได้ มุ่งมั่นพัฒนาสินค้าที่ตอบโจทย์ทุกความต้องการ',
}

export const defaultSiteData: SiteData = {
  brand: defaultBrand,
  contacts: defaultContacts,
  products: defaultProducts,
  pricing: defaultPricing,
  reviews: defaultReviews,
  faqs: defaultFaqs,
}
