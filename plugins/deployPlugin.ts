import { type Plugin } from 'vite'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

/**
 * Vite plugin that adds a local-only API for deploying site data.
 * Available ONLY in dev mode — the production build has no server.
 *
 * POST /api/deploy  { data: SiteData }
 *   → writes to src/data/defaultData.ts (with a new DATA_VERSION)
 *   → git add + commit + push
 *   → Vercel auto-deploys, visitors get fresh data (old localStorage is discarded)
 */
export function deployPlugin(): Plugin {
  return {
    name: 'deploy-plugin',
    configureServer(server) {
      server.middlewares.use('/api/deploy', async (req, res) => {
        // CORS
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        if (req.method === 'OPTIONS') { res.statusCode = 200; res.end(); return }
        if (req.method !== 'POST') { res.statusCode = 405; res.end('Method not allowed'); return }

        // Read body
        let body = ''
        for await (const chunk of req) body += chunk
        try {
          const { data, commitMsg } = JSON.parse(body)
          if (!data) { res.statusCode = 400; res.end(JSON.stringify({ ok: false, error: 'Missing data' })); return }

          // Generate a unique version for this deploy
          const version = String(Date.now())

          // Generate the new defaultData.ts content
          const tsContent = generateDefaultDataTs(data, version)

          // Write file
          const filePath = path.resolve(process.cwd(), 'src/data/defaultData.ts')
          fs.writeFileSync(filePath, tsContent, 'utf-8')

          // Git add + commit + push
          const msg = commitMsg || `update: site data via admin panel (${new Date().toLocaleString('th-TH')})`
          try {
            execSync('git add src/data/defaultData.ts', { cwd: process.cwd(), stdio: 'pipe' })
            execSync(`git commit -m "${msg}"`, { cwd: process.cwd(), stdio: 'pipe' })
            execSync('git push', { cwd: process.cwd(), stdio: 'pipe', timeout: 30000 })
          } catch (gitErr: any) {
            const stderr = gitErr.stderr?.toString() || gitErr.message
            if (stderr.includes('nothing to commit')) {
              res.statusCode = 200
              res.end(JSON.stringify({ ok: true, message: 'ไม่มีการเปลี่ยนแปลง — ข้อมูลเหมือนเดิม' }))
              return
            }
            res.statusCode = 500
            res.end(JSON.stringify({ ok: false, error: `Git error: ${stderr}` }))
            return
          }

          res.statusCode = 200
          res.end(JSON.stringify({ ok: true, message: 'Deploy สำเร็จ! Vercel จะอัปเดตภายใน 1-2 นาที' }))
        } catch (err: any) {
          res.statusCode = 500
          res.end(JSON.stringify({ ok: false, error: err.message }))
        }
      })
    },
  }
}

/* ── Generate TypeScript file from data ── */
function generateDefaultDataTs(data: any, version: string): string {
  const filePath = path.resolve(process.cwd(), 'src/data/defaultData.ts')
  let content = fs.readFileSync(filePath, 'utf-8')

  content = content.replace(/export const DATA_VERSION = '.*'/, `export const DATA_VERSION = '${version}'`)

  const replaceVar = (varName: string, value: any) => {
    // Matches export const <varName>: <Type> = <value> until the next export
    const typeMatch = content.match(new RegExp(`export const ${varName}: ([a-zA-Z\\[\\]]+) =`))
    if (typeMatch) {
      const type = typeMatch[1]
      const regex = new RegExp(`export const ${varName}: ${type.replace('[', '\\[').replace(']', '\\]')} = [\\s\\S]*?(?=\\nexport const )`, 'g')
      content = content.replace(regex, `export const ${varName}: ${type} = ${JSON.stringify(value, null, 2)}\n`)
    }
  }

  replaceVar('defaultLayout', data.layout)
  replaceVar('defaultBrand', data.brand)
  replaceVar('defaultHero', data.hero)
  replaceVar('defaultBenefits', data.benefits)
  replaceVar('defaultContacts', data.contacts)
  replaceVar('defaultContactSection', data.contactSection)
  replaceVar('defaultProducts', data.products)
  replaceVar('defaultPricing', data.pricing)
  replaceVar('defaultReviews', data.reviews)
  replaceVar('defaultFaqs', data.faqs)

  return content
}
