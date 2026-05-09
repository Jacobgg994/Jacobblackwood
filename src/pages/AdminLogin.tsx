import { useState, useEffect } from 'react'

/*
  Password is stored as a SHA-256 hash so it's not visible as plaintext in source.
  To change the password, generate a new hash at:
    crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_PASSWORD'))
*/
const ADMIN_USER = 'admin'

const LOCKOUT_KEY = 'jacob_lockout'
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 5 * 60 * 1000 // 5 minutes

/* Compute SHA-256 hash */
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/* The actual password hash (SHA-256 of "7ujm@0615257193") */
const VALID_HASH = 'd9811e9d77e5a4be310d67b1a9da8b97c19158d814e8c9ed7915f0ba37a150df'

interface LockoutData {
  attempts: number
  lockedUntil: number | null
}

function getLockout(): LockoutData {
  try {
    const raw = localStorage.getItem(LOCKOUT_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { attempts: 0, lockedUntil: null }
}

function setLockout(data: LockoutData) {
  localStorage.setItem(LOCKOUT_KEY, JSON.stringify(data))
}

export default function AdminLogin({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lockout, setLockoutState] = useState<LockoutData>(getLockout)
  const [countdown, setCountdown] = useState(0)

  const isLocked = lockout.lockedUntil !== null && Date.now() < lockout.lockedUntil

  // Countdown timer for lockout
  useEffect(() => {
    if (!isLocked) { setCountdown(0); return }
    const tick = () => {
      const remaining = Math.max(0, Math.ceil(((lockout.lockedUntil ?? 0) - Date.now()) / 1000))
      setCountdown(remaining)
      if (remaining <= 0) {
        const cleared = { attempts: 0, lockedUntil: null }
        setLockout(cleared)
        setLockoutState(cleared)
        setError('')
      }
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [isLocked, lockout.lockedUntil])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (isLocked) return

    setLoading(true)
    // Small delay to prevent timing attacks and feel natural
    await new Promise(r => setTimeout(r, 500))

    const passHash = await sha256(password)

    if (username === ADMIN_USER && passHash === VALID_HASH) {
      // Success — clear lockout
      const cleared = { attempts: 0, lockedUntil: null }
      setLockout(cleared)
      setLockoutState(cleared)
      setError('')
      setLoading(false)
      onSuccess()
    } else {
      // Failure — increment attempts
      const newAttempts = lockout.attempts + 1
      const newLockout: LockoutData = {
        attempts: newAttempts,
        lockedUntil: newAttempts >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_DURATION : null,
      }
      setLockout(newLockout)
      setLockoutState(newLockout)
      setLoading(false)

      if (newAttempts >= MAX_ATTEMPTS) {
        setError(`ล็อคระบบ ${LOCKOUT_DURATION / 60000} นาที เนื่องจากใส่รหัสผิดเกินกำหนด`)
      } else {
        setError(`ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (เหลือ ${MAX_ATTEMPTS - newAttempts} ครั้ง)`)
      }
    }
  }

  function formatTime(secs: number) {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center px-4" style={{ fontFamily: '"Noto Sans Thai", "Inter", system-ui, sans-serif' }}>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white/60 p-8 sm:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-colors ${isLocked ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-600/20' : 'bg-gradient-to-br from-blue-600 to-blue-500 shadow-blue-600/20'}`}>
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">เข้าสู่ระบบแอดมิน</h1>
            <p className="text-sm text-gray-400 mt-1">กรุณาใส่ข้อมูลเพื่อจัดการเว็บไซต์</p>
          </div>

          {/* Lockout banner */}
          {isLocked && (
            <div className="mb-6 px-4 py-4 bg-red-50 border border-red-100 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-lg mb-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                ระบบถูกล็อค
              </div>
              <p className="text-sm text-red-500">ลองใหม่ได้ในอีก <span className="font-mono font-bold">{formatTime(countdown)}</span></p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">ชื่อผู้ใช้</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                <input id="admin-username" type="text" value={username} onChange={e => { setUsername(e.target.value); setError('') }}
                  className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition disabled:opacity-50"
                  placeholder="ชื่อผู้ใช้" autoComplete="username" autoFocus disabled={isLocked} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">รหัสผ่าน</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </span>
                <input id="admin-password" type={showPass ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError('') }}
                  className="w-full pl-11 pr-12 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition disabled:opacity-50"
                  placeholder="รหัสผ่าน" autoComplete="current-password" disabled={isLocked} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition p-1" tabIndex={-1}>
                  {showPass ? (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {error && !isLocked && (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                {error}
              </div>
            )}

            <button id="admin-login-btn" type="submit" disabled={isLocked || loading}
              className="w-full py-3.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  กำลังตรวจสอบ...
                </>
              ) : isLocked ? (
                '🔒 ระบบถูกล็อค'
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>
          </form>

          {/* Attempt counter */}
          {lockout.attempts > 0 && !isLocked && (
            <p className="text-center text-xs text-amber-500 mt-3">
              ⚠️ พยายามเข้าสู่ระบบ {lockout.attempts}/{MAX_ATTEMPTS} ครั้ง
            </p>
          )}

          <div className="text-center mt-6">
            <button onClick={onBack} className="text-sm text-gray-400 hover:text-blue-600 transition-colors">← กลับหน้าเว็บไซต์</button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">🔒 เฉพาะผู้ดูแลระบบเท่านั้น</p>
      </div>
    </div>
  )
}
