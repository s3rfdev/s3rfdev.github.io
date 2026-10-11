/**
 * Generates procedural SVG placeholder artwork used across the portfolio
 * galleries and project covers.
 *
 *   node scripts/gen-placeholders.mjs
 *
 * The output lands in `public/previews/`. Replace these files (or point the
 * `src` fields in `src/data/content.ts` at your own images/thumbnails) with
 * real work — the layout expects a 16:10 / 16:9 source image.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/previews')
mkdirSync(outDir, { recursive: true })

/* ---------------------------------- utils --------------------------------- */
const mulberry32 = (a) => () => {
  a |= 0
  a = (a + 0x6d2b79f5) | 0
  let t = Math.imul(a ^ (a >>> 15), 1 | a)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const PALETTES = [
  ['#0a1224', '#1b3b6f', '#4ade80', '#56d9fe', '#0d1b2a'],
  ['#12071f', '#3b1d5e', '#f471b5', '#8b5cf6', '#1a0b2e'],
  ['#0b1613', '#134e3a', '#7cf7ac', '#ffd166', '#04140d'],
  ['#1a0f06', '#7c3f12', '#ffb347', '#ff6b6b', '#2b1408'],
  ['#070f1a', '#0e2f4d', '#56d9fe', '#e2e8f0', '#04101c'],
  ['#141018', '#4a3b52', '#ffd166', '#f471b5', '#0d0a10'],
  ['#05141b', '#0f4c5c', '#2dd4bf', '#a7f3d0', '#031014'],
  ['#1b0709', '#5c1220', '#ff8a5b', '#ffd166', '#240a0d'],
]

const esc = (s) => String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c])
const r2 = (n) => Math.round(n * 100) / 100

/* ------------------------------- compositions ----------------------------- */
function aurora(rnd, p, w, h) {
  const blobs = Array.from({ length: 5 }, () => {
    const cx = rnd() * w
    const cy = rnd() * h
    return `<ellipse cx="${r2(cx)}" cy="${r2(cy)}" rx="${r2(w * (0.18 + rnd() * 0.3))}" ry="${r2(
      h * (0.18 + rnd() * 0.36),
    )}" fill="${p[2 + Math.floor(rnd() * 3)]}" opacity="${r2(0.22 + rnd() * 0.35)}"/>`
  }).join('')
  return `<g filter="url(#soft)">${blobs}</g>
  <g opacity="0.5"><path d="M0 ${r2(h * 0.72)} Q ${r2(w * 0.3)} ${r2(h * 0.5)} ${r2(w * 0.55)} ${r2(
    h * 0.7,
  )} T ${w} ${r2(h * 0.62)} L ${w} ${h} L 0 ${h} Z" fill="${p[1]}" opacity="0.55"/></g>`
}

function ridges(rnd, p, w, h) {
  let layers = ''
  for (let i = 0; i < 5; i++) {
    const base = h * (0.35 + i * 0.14)
    let d = `M0 ${r2(base)}`
    for (let x = 0; x <= w; x += w / 7) d += ` L ${r2(x)} ${r2(base - rnd() * h * 0.16)}`
    d += ` L ${w} ${h} L 0 ${h} Z`
    layers += `<path d="${d}" fill="${p[(i + 1) % p.length]}" opacity="${r2(0.16 + i * 0.09)}"/>`
  }
  return `<circle cx="${r2(w * (0.6 + rnd() * 0.25))}" cy="${r2(h * 0.26)}" r="${r2(h * (0.08 + rnd() * 0.07))}" fill="${
    p[3]
  }" opacity="0.85" filter="url(#soft)"/>${layers}`
}

function city(rnd, p, w, h) {
  const horizon = h * (0.62 + rnd() * 0.1)
  let bars = ''
  let x = -20
  while (x < w + 20) {
    const bw = 24 + rnd() * 90
    const bh = h * (0.08 + rnd() * 0.45)
    bars += `<rect x="${r2(x)}" y="${r2(horizon - bh)}" width="${r2(bw)}" height="${r2(bh)}" fill="${
      p[1]
    }" opacity="${r2(0.35 + rnd() * 0.5)}"/>`
    const win = Math.floor(rnd() * 4)
    for (let k = 0; k < win; k++) {
      bars += `<rect x="${r2(x + 6 + rnd() * (bw - 14))}" y="${r2(horizon - bh + 8 + rnd() * bh * 0.7)}" width="3" height="5" fill="${
        p[2]
      }" opacity="0.8"/>`
    }
    x += bw + 4 + rnd() * 14
  }
  return `<rect x="0" y="${r2(horizon)}" width="${w}" height="${r2(h - horizon)}" fill="${p[4]}" opacity="0.95"/>${bars}
  <g filter="url(#soft)"><ellipse cx="${r2(w * rnd())}" cy="${r2(horizon)}" rx="${r2(w * 0.5)}" ry="${
    h * 0.16
  }" fill="${p[3]}" opacity="0.35"/></g>`
}

function orbits(rnd, p, w, h) {
  const cx = w * (0.3 + rnd() * 0.4)
  const cy = h * (0.3 + rnd() * 0.4)
  let g = `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(h * (0.16 + rnd() * 0.1))}" fill="url(#core)"/>`
  for (let i = 0; i < 6; i++) {
    g += `<ellipse cx="${r2(cx)}" cy="${r2(cy)}" rx="${r2(h * (0.2 + i * 0.1))}" ry="${r2(
      h * (0.06 + i * 0.035),
    )}" fill="none" stroke="${p[2 + (i % 3)]}" stroke-width="${r2(0.6 + rnd() * 1.4)}" opacity="${r2(
      0.15 + rnd() * 0.4,
    )}" transform="rotate(${r2(rnd() * 60 - 30)} ${r2(cx)} ${r2(cy)})"/>`
  }
  for (let i = 0; i < 70; i++) {
    g += `<circle cx="${r2(rnd() * w)}" cy="${r2(rnd() * h)}" r="${r2(rnd() * 1.7)}" fill="#ffffff" opacity="${r2(
      0.15 + rnd() * 0.6,
    )}"/>`
  }
  return g
}

function waves(rnd, p, w, h) {
  let g = ''
  for (let i = 0; i < 16; i++) {
    const y0 = h * (0.15 + i * 0.05)
    const amp = 12 + rnd() * 60
    g += `<path d="M0 ${r2(y0)} C ${r2(w * 0.25)} ${r2(y0 - amp)}, ${r2(w * 0.6)} ${r2(y0 + amp)}, ${w} ${r2(
      y0 - amp * 0.4,
    )}" fill="none" stroke="${p[2 + (i % 3)]}" stroke-width="${r2(0.6 + rnd() * 1.6)}" opacity="${r2(
      0.12 + rnd() * 0.5,
    )}"/>`
  }
  return g
}

function liquid(rnd, p, w, h) {
  let g = ''
  for (let i = 0; i < 7; i++) {
    const x = rnd() * w
    const y = rnd() * h
    const rx = w * (0.1 + rnd() * 0.25)
    const ry = h * (0.1 + rnd() * 0.3)
    g += `<ellipse cx="${r2(x)}" cy="${r2(y)}" rx="${r2(rx)}" ry="${r2(ry)}" fill="${
      p[2 + (i % 3)]
    }" opacity="${r2(0.3 + rnd() * 0.4)}" filter="url(#soft)" transform="rotate(${r2(rnd() * 180)} ${r2(x)} ${r2(y)})"/>`
  }
  return `<g>${g}</g>`
}

function topology(rnd, p, w, h) {
  let g = ''
  const c1 = { x: w * rnd(), y: h * rnd() }
  const c2 = { x: w * rnd(), y: h * rnd() }
  for (let i = 1; i <= 14; i++) {
    const k = i / 14
    g += `<ellipse cx="${r2(c1.x * k + c2.x * (1 - k))}" cy="${r2(c1.y * k + c2.y * (1 - k))}" rx="${r2(
      w * 0.06 * i,
    )}" ry="${r2(h * 0.5 * k * 0.5)}" fill="none" stroke="${p[2 + (i % 3)]}" stroke-width="${r2(
      0.5 + rnd() * 1.3,
    )}" opacity="${r2(0.1 + rnd() * 0.35)}" transform="rotate(${r2(rnd() * 40 - 20)} ${r2(c1.x)} ${r2(c1.y)})"/>`
  }
  return g
}

function studio(rnd, p, w, h) {
  const bokeh = Array.from({ length: 26 }, () => {
    const cx = rnd() * w
    const cy = rnd() * h
    return `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(8 + rnd() * 54)}" fill="${
      p[2 + Math.floor(rnd() * 3)]
    }" opacity="${r2(0.1 + rnd() * 0.35)}"/>`
  }).join('')
  return `<g filter="url(#soft)">${bokeh}</g>
  <rect x="${r2(w * 0.14)}" y="${r2(h * 0.22)}" width="${r2(w * 0.72)}" height="${r2(h * 0.56)}" rx="18" fill="none" stroke="${
    p[3]
  }" stroke-width="1.4" opacity="0.5"/>
  <circle cx="${r2(w * 0.5)}" cy="${r2(h * 0.5)}" r="${r2(h * 0.11)}" fill="${p[2]}" opacity="0.5"/>`
}

const COMPOSITIONS = [aurora, ridges, city, orbits, waves, liquid, topology, studio]

/* --------------------------------- renderer ------------------------------- */
function render(seed, w, h, title) {
  const rnd = mulberry32(seed)
  const p = PALETTES[Math.floor(rnd() * PALETTES.length)]
  const comp = COMPOSITIONS[Math.floor(rnd() * COMPOSITIONS.length)]
  const body = comp(rnd, p, w, h)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(
    title || 'abstract artwork',
  )}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[4]}"/>
    </linearGradient>
    <radialGradient id="core"><stop offset="0" stop-color="#ffffff" stop-opacity="0.95"/><stop offset="1" stop-color="${
      p[2]
    }" stop-opacity="0"/></radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${r2(Math.min(w, h) * 0.045)}"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <linearGradient id="vig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0.45"/><stop offset="0.5" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.6"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${body}
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.09" style="mix-blend-mode:overlay"/>
</svg>
`
}

/* ---------------------------------- emit ---------------------------------- */
const files = []

// Stock photo collections — 3 galleries x 9 frames
const photoGalleries = [
  { id: 'photo-neon', label: 'Neon Nightscapes' },
  { id: 'photo-aurora', label: 'Aurora & Skies' },
  { id: 'photo-macro', label: 'Abstract Macro' },
]
for (const g of photoGalleries) {
  for (let i = 1; i <= 9; i++) {
    const name = `${g.id}-${String(i).padStart(2, '0')}.svg`
    files.push([name, render(1000 + files.length * 7, 1600, 1000, `${g.label} ${i}`)])
  }
}

// Stock video collection — 1 gallery x 6 clips
for (let i = 1; i <= 6; i++) {
  const name = `video-${String(i).padStart(2, '0')}.svg`
  files.push([name, render(9000 + i * 31, 1600, 900, `Stock clip ${i}`)])
}

// Project covers
const covers = ['web-1', 'web-2', 'web-3', 'web-4', 'ai-1', 'ai-2', 'ai-3', 'mobile-1', 'mobile-2']
covers.forEach((c, i) => files.push([`${c}.svg`, render(5000 + i * 137, 1600, 1000, `${c} cover`)]))

// OG image + favicon
files.push(['og-cover.svg', render(4242, 1200, 630, 'Render Mind portfolio')])
files.push([
  'favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="rmGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="100%" stop-color="#56d9fe"/>
    </linearGradient>
    <radialGradient id="rmRadial" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#4ade80" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#05070a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#05070a"/>
  <rect width="64" height="64" rx="14" fill="url(#rmRadial)"/>
  <rect x="3" y="3" width="58" height="58" rx="11" fill="none" stroke="#1f2d3d" stroke-width="1.5"/>
  <path d="M16 46V18h12c5.5 0 9.5 3 9.5 8 0 3.8-2.5 6.6-6.2 7.6L41 46h-6.2l-8.5-11.2H22V46H16zm6-16.8h5.8c2.8 0 4.6-1.5 4.6-3.8s-1.8-3.8-4.6-3.8H22v7.6z" fill="url(#rmGlow)"/>
  <polygon points="41,18 47,18 47,34 41,27" fill="#56d9fe" opacity="0.95"/>
  <circle cx="48" cy="45" r="2.5" fill="#4ade80"/>
</svg>
`,
])

for (const [name, svg] of files) writeFileSync(resolve(outDir, name), svg)
console.log(`wrote ${files.length} placeholder SVGs to public/previews/`)
