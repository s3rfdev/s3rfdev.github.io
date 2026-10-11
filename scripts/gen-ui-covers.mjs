import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const outDir = resolve(process.cwd(), 'public/previews')

function esc(s) {
  return String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c])
}

// --------------------------------------------------------------------------
// 1. WEB-1: Legal Enterprise ERP & EDMS (Multi-Office Document Management)
// --------------------------------------------------------------------------
function genWeb1() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#05070a"/>
      <stop offset="100%" stop-color="#0b1017"/>
    </linearGradient>
    <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4ade80" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#4ade80" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="accentGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="100%" stop-color="#56d9fe"/>
    </linearGradient>
  </defs>

  <!-- Canvas background -->
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    <path d="M0,200 H1600 M0,400 H1600 M0,600 H1600 M0,800 H1600 M200,0 V1000 M400,0 V1000 M600,0 V1000 M800,0 V1000 M1000,0 V1000 M1200,0 V1000 M1400,0 V1000"/>
  </g>

  <!-- Browser Window Frame -->
  <g transform="translate(80, 60)">
    <!-- Window body -->
    <rect width="1440" height="880" rx="16" fill="#090d14" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>

    <!-- Chrome bar -->
    <rect width="1440" height="52" rx="16" fill="#0d131c"/>
    <rect y="40" width="1440" height="12" fill="#0d131c"/>
    <line x1="0" y1="52" x2="1440" y2="52" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <!-- Window buttons -->
    <circle cx="28" cy="26" r="6" fill="#ff5f56"/>
    <circle cx="48" cy="26" r="6" fill="#ffbd2e"/>
    <circle cx="68" cy="26" r="6" fill="#27c93f"/>

    <!-- URL Bar -->
    <rect x="220" y="12" width="620" height="28" rx="6" fill="#141c28" stroke="rgba(255,255,255,0.06)"/>
    <text x="240" y="31" font-family="monospace" font-size="12" fill="#7d90a6">https://lexflow.internal/cases • 14 offices [LONDON · NY · DUBAI · SG]</text>
    <rect x="760" y="16" width="65" height="20" rx="4" fill="rgba(74,222,128,0.15)"/>
    <text x="770" y="30" font-family="monospace" font-size="10.5" font-weight="bold" fill="#4ade80">● 200 OK</text>

    <!-- Header actions -->
    <text x="1310" y="31" font-family="monospace" font-size="12" fill="#9fb2c7">PARTNER LEVEL</text>
    <circle cx="1405" cy="26" r="12" fill="#1e293b" stroke="#4ade80"/>

    <!-- Sidebar -->
    <g transform="translate(0, 52)">
      <rect width="220" height="828" fill="#0b1018" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="24" y="42" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ffffff">LEXFLOW ERP</text>
      <text x="24" y="60" font-family="monospace" font-size="10" fill="#64748b">GLOBAL LEGAL EDMS</text>

      <!-- Nav items -->
      <g transform="translate(16, 90)">
        <rect width="188" height="36" rx="8" fill="rgba(74,222,128,0.12)" stroke="rgba(74,222,128,0.3)"/>
        <text x="16" y="23" font-family="sans-serif" font-size="12.5" font-weight="bold" fill="#4ade80">● Active Matters</text>

        <text x="16" y="65" font-family="sans-serif" font-size="12.5" fill="#8fa2b8">Contracts &amp; EDMS</text>
        <text x="16" y="105" font-family="sans-serif" font-size="12.5" fill="#8fa2b8">Partner Billable Hrs</text>
        <text x="16" y="145" font-family="sans-serif" font-size="12.5" fill="#8fa2b8">Multi-Currency Invoicing</text>
        <text x="16" y="185" font-family="sans-serif" font-size="12.5" fill="#8fa2b8">Audit Trail &amp; RBAC</text>
        <text x="16" y="225" font-family="sans-serif" font-size="12.5" fill="#8fa2b8">Office Nodes (14)</text>
      </g>

      <g transform="translate(20, 680)">
        <rect width="180" height="90" rx="8" fill="#101722" stroke="rgba(255,255,255,0.08)"/>
        <text x="16" y="26" font-family="monospace" font-size="10" fill="#64748b">AUDIT ENGINE</text>
        <text x="16" y="48" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">GDPR &amp; SOC2</text>
        <text x="16" y="70" font-family="monospace" font-size="11" fill="#4ade80">● Immutability: 100%</text>
      </g>
    </g>

    <!-- Main Content Area -->
    <g transform="translate(240, 72)">
      <!-- KPI Cards Row -->
      <g>
        <rect width="270" height="96" rx="10" fill="#0f1622" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="28" font-family="monospace" font-size="11" fill="#7d90a6">TOTAL REVENUE (Q3)</text>
        <text x="20" y="62" font-family="sans-serif" font-size="26" font-weight="bold" fill="#ffffff">$1,480,250</text>
        <text x="20" y="82" font-family="monospace" font-size="10" fill="#4ade80">+18.4% vs prev qtr</text>
      </g>

      <g transform="translate(290, 0)">
        <rect width="270" height="96" rx="10" fill="#0f1622" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="28" font-family="monospace" font-size="11" fill="#7d90a6">ACTIVE CASES</text>
        <text x="20" y="62" font-family="sans-serif" font-size="26" font-weight="bold" fill="#ffffff">842 Matters</text>
        <text x="20" y="82" font-family="monospace" font-size="10" fill="#56d9fe">14 International Branches</text>
      </g>

      <g transform="translate(580, 0)">
        <rect width="270" height="96" rx="10" fill="#0f1622" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="28" font-family="monospace" font-size="11" fill="#7d90a6">DOCUMENTS INDEXED</text>
        <text x="20" y="62" font-family="sans-serif" font-size="26" font-weight="bold" fill="#ffffff">48,190 Docs</text>
        <text x="20" y="82" font-family="monospace" font-size="10" fill="#4ade80">● Full-Text OCR Synced</text>
      </g>

      <g transform="translate(870, 0)">
        <rect width="300" height="96" rx="10" fill="#0f1622" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="28" font-family="monospace" font-size="11" fill="#7d90a6">BILLING VELOCITY</text>
        <path d="M20,75 Q 80,45 140,65 T 260,35 L 260,85 L 20,85 Z" fill="url(#chartGreen)"/>
        <path d="M20,75 Q 80,45 140,65 T 260,35" fill="none" stroke="#4ade80" stroke-width="2.5"/>
        <text x="210" y="82" font-family="monospace" font-size="10" fill="#4ade80">99.8% SLA</text>
      </g>

      <!-- Data Table -->
      <g transform="translate(0, 120)">
        <rect width="1170" height="660" rx="10" fill="#0c121b" stroke="rgba(255,255,255,0.08)"/>

        <!-- Table Header -->
        <rect width="1170" height="42" rx="10" fill="#131b27"/>
        <text x="24" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">MATTER ID</text>
        <text x="140" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">CLIENT / MATTER TITLE</text>
        <text x="440" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">JURISDICTION</text>
        <text x="630" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">PARTNER IN CHARGE</text>
        <text x="840" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">STATUS</text>
        <text x="1010" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">BILLED (USD)</text>

        <!-- Row 1 -->
        <g transform="translate(0, 42)">
          <line x1="0" y1="56" x2="1170" y2="56" stroke="rgba(255,255,255,0.05)"/>
          <text x="24" y="34" font-family="monospace" font-size="12" fill="#56d9fe">#UK-2024-884</text>
          <text x="140" y="27" font-family="sans-serif" font-size="13" font-weight="600" fill="#ffffff">Apex Maritime Holding M&amp;A</text>
          <text x="140" y="44" font-family="sans-serif" font-size="11" fill="#64748b">Cross-border asset transfer &amp; maritime escrow</text>
          <rect x="440" y="18" width="120" height="22" rx="4" fill="rgba(86,217,254,0.1)"/>
          <text x="448" y="33" font-family="monospace" font-size="10.5" fill="#56d9fe">UK Commercial</text>
          <text x="630" y="34" font-family="sans-serif" font-size="12.5" fill="#cbd5e1">R. Kensington, KC</text>
          <rect x="840" y="18" width="95" height="22" rx="4" fill="rgba(74,222,128,0.15)"/>
          <text x="852" y="33" font-family="monospace" font-size="10.5" font-weight="bold" fill="#4ade80">● ACTIVE</text>
          <text x="1010" y="34" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">$248,500.00</text>
        </g>

        <!-- Row 2 -->
        <g transform="translate(0, 98)">
          <line x1="0" y1="56" x2="1170" y2="56" stroke="rgba(255,255,255,0.05)"/>
          <text x="24" y="34" font-family="monospace" font-size="12" fill="#56d9fe">#US-2024-102</text>
          <text x="140" y="27" font-family="sans-serif" font-size="13" font-weight="600" fill="#ffffff">CyberShield Tech Global Patent</text>
          <text x="140" y="44" font-family="sans-serif" font-size="11" fill="#64748b">Multi-jurisdiction IP portfolio protection</text>
          <rect x="440" y="18" width="110" height="22" rx="4" fill="rgba(86,217,254,0.1)"/>
          <text x="448" y="33" font-family="monospace" font-size="10.5" fill="#56d9fe">US Federal IP</text>
          <text x="630" y="34" font-family="sans-serif" font-size="12.5" fill="#cbd5e1">M. Vance, Esq.</text>
          <rect x="840" y="18" width="95" height="22" rx="4" fill="rgba(74,222,128,0.15)"/>
          <text x="852" y="33" font-family="monospace" font-size="10.5" font-weight="bold" fill="#4ade80">● ACTIVE</text>
          <text x="1010" y="34" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">$182,400.00</text>
        </g>

        <!-- Row 3 -->
        <g transform="translate(0, 154)">
          <line x1="0" y1="56" x2="1170" y2="56" stroke="rgba(255,255,255,0.05)"/>
          <text x="24" y="34" font-family="monospace" font-size="12" fill="#56d9fe">#DXB-2024-49</text>
          <text x="140" y="27" font-family="sans-serif" font-size="13" font-weight="600" fill="#ffffff">Gulf Logistics REIT Structuring</text>
          <text x="140" y="44" font-family="sans-serif" font-size="11" fill="#64748b">DIFC compliance, real estate trust governance</text>
          <rect x="440" y="18" width="90" height="22" rx="4" fill="rgba(86,217,254,0.1)"/>
          <text x="448" y="33" font-family="monospace" font-size="10.5" fill="#56d9fe">DIFC Dubai</text>
          <text x="630" y="34" font-family="sans-serif" font-size="12.5" fill="#cbd5e1">T. Al-Mansoor</text>
          <rect x="840" y="18" width="115" height="22" rx="4" fill="rgba(255,209,102,0.15)"/>
          <text x="852" y="33" font-family="monospace" font-size="10.5" font-weight="bold" fill="#ffd166">● INVOICED</text>
          <text x="1010" y="34" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">$310,000.00</text>
        </g>

        <!-- Row 4 -->
        <g transform="translate(0, 210)">
          <line x1="0" y1="56" x2="1170" y2="56" stroke="rgba(255,255,255,0.05)"/>
          <text x="24" y="34" font-family="monospace" font-size="12" fill="#56d9fe">#SG-2024-032</text>
          <text x="140" y="27" font-family="sans-serif" font-size="13" font-weight="600" fill="#ffffff">FinTech Venture Seed Compliance</text>
          <text x="140" y="44" font-family="sans-serif" font-size="11" fill="#64748b">MAS licensing, AML/KYC audit and depository</text>
          <rect x="440" y="18" width="90" height="22" rx="4" fill="rgba(86,217,254,0.1)"/>
          <text x="448" y="33" font-family="monospace" font-size="10.5" fill="#56d9fe">SG MAS Corp</text>
          <text x="630" y="34" font-family="sans-serif" font-size="12.5" fill="#cbd5e1">W. Tan, Senior</text>
          <rect x="840" y="18" width="95" height="22" rx="4" fill="rgba(74,222,128,0.15)"/>
          <text x="852" y="33" font-family="monospace" font-size="10.5" font-weight="bold" fill="#4ade80">● ACTIVE</text>
          <text x="1010" y="34" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">$142,800.00</text>
        </g>
      </g>
    </g>
  </g>
</svg>`
}

// --------------------------------------------------------------------------
// 2. WEB-2: Logistics Dispatch & Fleet Console
// --------------------------------------------------------------------------
function genWeb2() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#05070a"/><stop offset="100%" stop-color="#09101a"/></linearGradient>
    <linearGradient id="cyanGlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#56d9fe" stop-opacity="0.3"/><stop offset="100%" stop-color="#56d9fe" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg2)"/>
  
  <g transform="translate(80, 60)">
    <!-- Window frame -->
    <rect width="1440" height="880" rx="16" fill="#080e17" stroke="rgba(86,217,254,0.2)" stroke-width="1.5"/>
    <rect width="1440" height="52" rx="16" fill="#0d1624"/>
    <rect y="40" width="1440" height="12" fill="#0d1624"/>
    <line x1="0" y1="52" x2="1440" y2="52" stroke="rgba(255,255,255,0.08)"/>

    <circle cx="28" cy="26" r="6" fill="#ff5f56"/>
    <circle cx="48" cy="26" r="6" fill="#ffbd2e"/>
    <circle cx="68" cy="26" r="6" fill="#27c93f"/>

    <rect x="220" y="12" width="580" height="28" rx="6" fill="#142032"/>
    <text x="240" y="31" font-family="monospace" font-size="12" fill="#8da4be">https://dispatch.ops/fleet-telemetry • LIVE [18,420 ACTIVE ORDERS]</text>
    <rect x="730" y="16" width="60" height="20" rx="4" fill="rgba(86,217,254,0.2)"/>
    <text x="738" y="30" font-family="monospace" font-size="10.5" font-weight="bold" fill="#56d9fe">28 ms</text>

    <!-- Content layout -->
    <g transform="translate(30, 72)">
      <!-- Top Metrics -->
      <g>
        <rect width="330" height="88" rx="10" fill="#0e1826" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">ONLINE COURIERS &amp; VANS</text>
        <text x="20" y="58" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff">1,420 Units</text>
        <text x="20" y="76" font-family="monospace" font-size="10" fill="#4ade80">● 98.4% On-Time SLA</text>
      </g>
      <g transform="translate(350, 0)">
        <rect width="330" height="88" rx="10" fill="#0e1826" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">HOURLY DISPATCH THROUGHPUT</text>
        <text x="20" y="58" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff">3,840 Orders/hr</text>
        <text x="20" y="76" font-family="monospace" font-size="10" fill="#56d9fe">Peak load auto-balancing</text>
      </g>
      <g transform="translate(700, 0)">
        <rect width="330" height="88" rx="10" fill="#0e1826" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">ANOMALY &amp; FRAUD DETECTOR</text>
        <text x="20" y="58" font-family="sans-serif" font-size="28" font-weight="bold" fill="#4ade80">0 Alerts Flagged</text>
        <text x="20" y="76" font-family="monospace" font-size="10" fill="#64748b">ML Route deviation monitor: OK</text>
      </g>
      <g transform="translate(1050, 0)">
        <rect width="330" height="88" rx="10" fill="#0e1826" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">DISPATCH WEBSOCKET CLUSTER</text>
        <text x="20" y="58" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff">12 Nodes</text>
        <text x="20" y="76" font-family="monospace" font-size="10" fill="#4ade80">● Zero packet loss</text>
      </g>

      <!-- Center Left: Live Vector Map / Geo Graph -->
      <g transform="translate(0, 110)">
        <rect width="880" height="670" rx="12" fill="#0b121e" stroke="rgba(255,255,255,0.08)"/>
        <text x="24" y="36" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ffffff">METROPOLITAN ROUTE TOPOLOGY &amp; GPS TELEMETRY</text>

        <!-- Simulated Vector Map Grid -->
        <g opacity="0.18" stroke="#56d9fe" stroke-width="1">
          <path d="M40,100 L840,100 M40,200 L840,200 M40,300 L840,300 M40,400 L840,400 M40,500 L840,500 M40,600 L840,600 M100,60 L100,640 M240,60 L240,640 M380,60 L380,640 M520,60 L520,640 M660,60 L660,640 M780,60 L780,640"/>
        </g>

        <!-- Route paths -->
        <path d="M120,480 Q 280,240 440,320 T 720,180" fill="none" stroke="#56d9fe" stroke-width="3" stroke-dasharray="6,4"/>
        <path d="M200,580 Q 380,480 540,540 T 800,420" fill="none" stroke="#4ade80" stroke-width="3"/>
        <path d="M300,180 Q 420,380 620,380" fill="none" stroke="#ffd166" stroke-width="2.5"/>

        <!-- Waypoint Nodes -->
        <circle cx="120" cy="480" r="8" fill="#56d9fe"/>
        <circle cx="440" cy="320" r="10" fill="#0e1826" stroke="#56d9fe" stroke-width="3"/>
        <circle cx="720" cy="180" r="9" fill="#4ade80"/>
        <circle cx="540" cy="540" r="7" fill="#ffd166"/>

        <rect x="420" y="270" width="130" height="40" rx="6" fill="#142032" stroke="#56d9fe"/>
        <text x="430" y="288" font-family="monospace" font-size="10" font-weight="bold" fill="#ffffff">HUB-NORTH #04</text>
        <text x="430" y="302" font-family="monospace" font-size="9" fill="#4ade80">● 42 Units en route</text>
      </g>

      <!-- Center Right: Live Dispatch Feed -->
      <g transform="translate(900, 110)">
        <rect width="480" height="670" rx="12" fill="#0b121e" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="36" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ffffff">REALTIME DISPATCH FEED</text>

        <!-- Feed item 1 -->
        <g transform="translate(20, 60)">
          <rect width="440" height="85" rx="8" fill="#101826" stroke="rgba(74,222,128,0.2)"/>
          <text x="16" y="24" font-family="monospace" font-size="12" font-weight="bold" fill="#ffffff">ORDER #EXP-8891</text>
          <rect x="340" y="12" width="85" height="20" rx="4" fill="rgba(74,222,128,0.15)"/>
          <text x="348" y="26" font-family="monospace" font-size="10" font-weight="bold" fill="#4ade80">IN TRANSIT</text>
          <text x="16" y="48" font-family="sans-serif" font-size="12" fill="#94a3b8">Driver: Michael S. (Van #204) • ETA: 8 min</text>
          <text x="16" y="68" font-family="monospace" font-size="10.5" fill="#56d9fe">GeoHash: 9q8yy2 • Anomaly score: 0.01 (Optimal)</text>
        </g>

        <!-- Feed item 2 -->
        <g transform="translate(20, 160)">
          <rect width="440" height="85" rx="8" fill="#101826" stroke="rgba(86,217,254,0.15)"/>
          <text x="16" y="24" font-family="monospace" font-size="12" font-weight="bold" fill="#ffffff">ORDER #EXP-8892</text>
          <rect x="340" y="12" width="85" height="20" rx="4" fill="rgba(86,217,254,0.15)"/>
          <text x="352" y="26" font-family="monospace" font-size="10" font-weight="bold" fill="#56d9fe">ASSIGNED</text>
          <text x="16" y="48" font-family="sans-serif" font-size="12" fill="#94a3b8">Driver: Alex K. (Moto #08) • Pickup in 3 min</text>
          <text x="16" y="68" font-family="monospace" font-size="10.5" fill="#56d9fe">GeoHash: 9q8yy7 • Smart Batching #3</text>
        </g>

        <!-- Feed item 3 -->
        <g transform="translate(20, 260)">
          <rect width="440" height="85" rx="8" fill="#101826" stroke="rgba(255,209,102,0.15)"/>
          <text x="16" y="24" font-family="monospace" font-size="12" font-weight="bold" fill="#ffffff">BATCH #WH-7740</text>
          <rect x="340" y="12" width="85" height="20" rx="4" fill="rgba(255,209,102,0.15)"/>
          <text x="352" y="26" font-family="monospace" font-size="10" font-weight="bold" fill="#ffd166">ROUTING</text>
          <text x="16" y="48" font-family="sans-serif" font-size="12" fill="#94a3b8">Zone 4 to Zone 7 cross-dock transfer</text>
          <text x="16" y="68" font-family="monospace" font-size="10.5" fill="#4ade80">● Algorithm: OSRM High-Efficiency</text>
        </g>
      </g>
    </g>
  </g>
</svg>`
}

// --------------------------------------------------------------------------
// 3. AI-1: GenAI Render Farm & ComfyUI MLOps Pipeline
// --------------------------------------------------------------------------
function genAi1() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bgAi" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#040608"/><stop offset="100%" stop-color="#080d14"/></linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1600" height="1000" fill="url(#bgAi)"/>

  <!-- ComfyUI Node Canvas -->
  <g transform="translate(80, 60)">
    <rect width="1440" height="880" rx="16" fill="#080b11" stroke="rgba(74,222,128,0.25)" stroke-width="1.5"/>

    <!-- Top status chrome -->
    <rect width="1440" height="48" rx="16" fill="#0d121c"/>
    <text x="24" y="29" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">RENDERFLOW // DISTRIBUTED COMFYUI MLOPS CLUSTER</text>
    <text x="540" y="29" font-family="monospace" font-size="11" fill="#7d90a6">[4x NVIDIA RTX 4090 · 96 GB VRAM TOTAL · NVENC 4K]</text>

    <rect x="1260" y="12" width="150" height="24" rx="4" fill="rgba(74,222,128,0.15)"/>
    <text x="1275" y="28" font-family="monospace" font-size="11" font-weight="bold" fill="#4ade80">● QUEUE RUNNING</text>

    <!-- Node 1: Checkpoint Loader -->
    <g transform="translate(60, 120)">
      <rect width="280" height="180" rx="8" fill="#121824" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
      <rect width="280" height="32" rx="8" fill="#1e293b"/>
      <text x="16" y="21" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff">Load Checkpoint</text>
      <circle cx="265" cy="16" r="5" fill="#4ade80"/>

      <text x="16" y="60" font-family="monospace" font-size="10.5" fill="#94a3b8">ckpt_name: v7-cinematic-fp16.safetensors</text>
      <text x="16" y="85" font-family="monospace" font-size="10.5" fill="#94a3b8">vae: vae-ft-mse-840000</text>
      <text x="16" y="110" font-family="monospace" font-size="10.5" fill="#94a3b8">precision: fp16 (TensorRT compiled)</text>

      <!-- Outputs -->
      <circle cx="280" cy="140" r="6" fill="#ffd166"/>
      <text x="235" y="144" font-family="monospace" font-size="10" fill="#ffd166">MODEL</text>
      <circle cx="280" cy="160" r="6" fill="#f471b5"/>
      <text x="245" y="164" font-family="monospace" font-size="10" fill="#f471b5">CLIP</text>
    </g>

    <!-- Node 2: CLIP Text Encode (Prompt) -->
    <g transform="translate(420, 120)">
      <rect width="320" height="240" rx="8" fill="#121824" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
      <rect width="320" height="32" rx="8" fill="#2d1b42"/>
      <text x="16" y="21" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f471b5">CLIP Text Encode (Positive + LoRA)</text>

      <rect x="16" y="50" width="288" height="120" rx="6" fill="#0b0e14"/>
      <text x="26" y="75" font-family="monospace" font-size="10" fill="#cbd5e1">cinematic 4k film still, hyperdetailed</text>
      <text x="26" y="95" font-family="monospace" font-size="10" fill="#cbd5e1">anamorphic lens, photorealistic studio</text>
      <text x="26" y="115" font-family="monospace" font-size="10" fill="#cbd5e1">lighting, master shot, color graded</text>
      <text x="26" y="140" font-family="monospace" font-size="9.5" fill="#4ade80">&lt;lora:product-commercial-v3:0.85&gt;</text>

      <circle cx="320" cy="205" r="6" fill="#f471b5"/>
      <text x="260" y="209" font-family="monospace" font-size="10" fill="#f471b5">CONDITION</text>
    </g>

    <!-- Node 3: KSampler -->
    <g transform="translate(820, 160)">
      <rect width="300" height="280" rx="8" fill="#121824" stroke="rgba(74,222,128,0.4)" stroke-width="1.5"/>
      <rect width="300" height="32" rx="8" fill="#0f291e"/>
      <text x="16" y="21" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4ade80">KSampler (DPM++ 2M Karras)</text>

      <text x="16" y="60" font-family="monospace" font-size="11" fill="#cbd5e1">seed: 8492049182 (fixed batch)</text>
      <text x="16" y="85" font-family="monospace" font-size="11" fill="#cbd5e1">steps: 32 • cfg: 6.5</text>
      <text x="16" y="110" font-family="monospace" font-size="11" fill="#cbd5e1">sampler: dpmpp_2m</text>
      <text x="16" y="135" font-family="monospace" font-size="11" fill="#cbd5e1">scheduler: karras</text>
      <text x="16" y="160" font-family="monospace" font-size="11" fill="#cbd5e1">denoise: 1.00</text>

      <!-- Progress bar inside KSampler -->
      <rect x="16" y="195" width="268" height="24" rx="4" fill="#0a1218"/>
      <rect x="16" y="195" width="220" height="24" rx="4" fill="url(#accentGlow)"/>
      <text x="110" y="211" font-family="monospace" font-size="10.5" font-weight="bold" fill="#040608">82% [3.1 it/s]</text>

      <circle cx="300" cy="250" r="6" fill="#56d9fe"/>
      <text x="250" y="254" font-family="monospace" font-size="10" fill="#56d9fe">LATENT</text>
    </g>

    <!-- Node 4: VAE Decode & 4K Upscale -->
    <g transform="translate(1180, 260)">
      <rect width="220" height="200" rx="8" fill="#121824" stroke="rgba(86,217,254,0.3)" stroke-width="1.5"/>
      <rect width="220" height="32" rx="8" fill="#102538"/>
      <text x="16" y="21" font-family="sans-serif" font-size="12" font-weight="bold" fill="#56d9fe">VAEDecode &amp; 4K Export</text>

      <text x="16" y="65" font-family="monospace" font-size="10.5" fill="#94a3b8">upscale_model: 4x-UltraSharp</text>
      <text x="16" y="90" font-family="monospace" font-size="10.5" fill="#94a3b8">output_res: 3840 x 2160</text>
      <text x="16" y="115" font-family="monospace" font-size="10.5" fill="#94a3b8">codec: NVENC ProRes / H.265</text>
      <text x="16" y="140" font-family="monospace" font-size="10.5" fill="#4ade80">● S3 Sync: Auto-Upload</text>
    </g>

    <!-- Connecting Bezier Cables -->
    <path d="M340,260 C 560,260 600,220 820,220" fill="none" stroke="#ffd166" stroke-width="3" opacity="0.85"/>
    <path d="M740,325 C 780,325 780,260 820,260" fill="none" stroke="#f471b5" stroke-width="3" opacity="0.85"/>
    <path d="M1120,410 C 1140,410 1150,360 1180,360" fill="none" stroke="#56d9fe" stroke-width="3" filter="url(#glow)"/>

    <!-- Bottom Monitoring Console -->
    <g transform="translate(60, 520)">
      <rect width="1320" height="300" rx="10" fill="#0c1017" stroke="rgba(255,255,255,0.08)"/>
      <text x="24" y="32" font-family="monospace" font-size="12" font-weight="bold" fill="#ffffff">CLUSTER TELEMETRY &amp; BATCH WORKER POOL</text>

      <g transform="translate(24, 55)">
        <rect width="300" height="90" rx="8" fill="#121722"/>
        <text x="16" y="24" font-family="monospace" font-size="11" fill="#7d90a6">GPU-0 [RTX 4090 24GB]</text>
        <text x="16" y="52" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">22.4 GB / 93% Load</text>
        <text x="16" y="74" font-family="monospace" font-size="10" fill="#4ade80">58°C • Power: 340W</text>
      </g>

      <g transform="translate(344, 55)">
        <rect width="300" height="90" rx="8" fill="#121722"/>
        <text x="16" y="24" font-family="monospace" font-size="11" fill="#7d90a6">GPU-1 [RTX 4090 24GB]</text>
        <text x="16" y="52" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">21.8 GB / 91% Load</text>
        <text x="16" y="74" font-family="monospace" font-size="10" fill="#4ade80">56°C • Power: 325W</text>
      </g>

      <g transform="translate(664, 55)">
        <rect width="300" height="90" rx="8" fill="#121722"/>
        <text x="16" y="24" font-family="monospace" font-size="11" fill="#7d90a6">DAILY BATCH PROGRESS</text>
        <text x="16" y="52" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">894 / 1,200 Assets</text>
        <text x="16" y="74" font-family="monospace" font-size="10" fill="#56d9fe">ETA: 2h 14m remaining</text>
      </g>

      <g transform="translate(984, 55)">
        <rect width="310" height="90" rx="8" fill="#121722"/>
        <text x="16" y="24" font-family="monospace" font-size="11" fill="#7d90a6">EXPORT PIPELINE</text>
        <text x="16" y="52" font-family="sans-serif" font-size="20" font-weight="bold" fill="#4ade80">S3 + NVENC 4K</text>
        <text x="16" y="74" font-family="monospace" font-size="10" fill="#cbd5e1">Direct marketplace packs upload</text>
      </g>

      <!-- Terminal logs row -->
      <g transform="translate(24, 165)">
        <rect width="1270" height="110" rx="6" fill="#080c12"/>
        <text x="16" y="24" font-family="monospace" font-size="10.5" fill="#4ade80">[19:42:01] worker-02: batch #440 finished in 2.84s (3840x2160, 4K ProRes NVENC)</text>
        <text x="16" y="44" font-family="monospace" font-size="10.5" fill="#56d9fe">[19:42:03] s3-sync: uploaded asset_440.mp4 -&gt; s3://rendermind-output/commercial/ [28.4 MB]</text>
        <text x="16" y="64" font-family="monospace" font-size="10.5" fill="#cbd5e1">[19:42:04] rabbitmq-queue: ack received, pop next job #441 (prompt_hash: 98fae2)</text>
        <text x="16" y="84" font-family="monospace" font-size="10.5" fill="#ffd166">[19:42:06] vram-guard: tensor cache clean, 0 memory fragmentation</text>
      </g>
    </g>
  </g>
</svg>`
}

// --------------------------------------------------------------------------
// 4. MOBILE-1: FitPass Club App (Fitness Club Network with QR & Biometrics)
// --------------------------------------------------------------------------
function genMobile1() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bgMob" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#05070a"/><stop offset="100%" stop-color="#0b111a"/></linearGradient>
    <linearGradient id="qrNeon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4ade80"/><stop offset="100%" stop-color="#56d9fe"/></linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bgMob)"/>

  <!-- Left: Feature Badges & Architecture Highlights -->
  <g transform="translate(100, 140)">
    <rect width="1400" height="720" rx="20" fill="#090d15" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>

    <g transform="translate(60, 60)">
      <text x="0" y="30" font-family="monospace" font-size="12" font-weight="bold" fill="#4ade80">● FLUTTER MOBILE ARCHITECTURE</text>
      <text x="0" y="70" font-family="sans-serif" font-size="34" font-weight="bold" fill="#ffffff">FitPass Club Companion</text>
      <text x="0" y="105" font-family="sans-serif" font-size="16" fill="#8fa2b8">Multi-Branch Fitness Access &amp; Membership Ecosystem</text>

      <g transform="translate(0, 150)">
        <rect width="380" height="90" rx="10" fill="#0f1622" stroke="rgba(255,255,255,0.06)"/>
        <text x="20" y="28" font-family="monospace" font-size="11" fill="#7d90a6">OFFLINE QR TURNSTILE PASS</text>
        <text x="20" y="56" font-family="sans-serif" font-size="17" font-weight="bold" fill="#ffffff">AES-256 Rotating Token</text>
        <text x="20" y="76" font-family="monospace" font-size="10" fill="#4ade80">Zero delay at turnstile entry</text>
      </g>

      <g transform="translate(0, 260)">
        <rect width="380" height="90" rx="10" fill="#0f1622" stroke="rgba(255,255,255,0.06)"/>
        <text x="20" y="28" font-family="monospace" font-size="11" fill="#7d90a6">BIOMETRIC INTEGRATION</text>
        <text x="20" y="56" font-family="sans-serif" font-size="17" font-weight="bold" fill="#ffffff">FaceID &amp; Fingerprint Auth</text>
        <text x="20" y="76" font-family="monospace" font-size="10" fill="#56d9fe">Seamless fallback on camera failure</text>
      </g>

      <g transform="translate(0, 370)">
        <rect width="380" height="90" rx="10" fill="#0f1622" stroke="rgba(255,255,255,0.06)"/>
        <text x="20" y="28" font-family="monospace" font-size="11" fill="#7d90a6">STORE DEPLOYMENT &amp; RATING</text>
        <text x="20" y="56" font-family="sans-serif" font-size="17" font-weight="bold" fill="#ffffff">50,000+ Installs • 4.8★</text>
        <text x="20" y="76" font-family="monospace" font-size="10" fill="#4ade80">Google Play &amp; App Store single code</text>
      </g>
    </g>

    <!-- Right: Smartphone Device Mockup -->
    <g transform="translate(620, 40)">
      <!-- Phone Outer Chassis -->
      <rect width="360" height="640" rx="42" fill="#030508" stroke="#1f2d3d" stroke-width="4"/>
      <!-- Inner Bezel -->
      <rect x="10" y="10" width="340" height="620" rx="34" fill="#0b1017"/>

      <!-- Dynamic Island / Notch -->
      <rect x="120" y="20" width="100" height="22" rx="11" fill="#000000"/>

      <!-- Status Bar -->
      <text x="35" y="36" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">9:41</text>
      <text x="280" y="36" font-family="monospace" font-size="10" fill="#ffffff">5G 100%</text>

      <!-- App Header -->
      <g transform="translate(26, 60)">
        <text x="0" y="18" font-family="monospace" font-size="10" font-weight="bold" fill="#4ade80">● FITPASS ELITE</text>
        <text x="0" y="40" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff">Welcome, Sergei</text>
        <text x="0" y="56" font-family="sans-serif" font-size="11" fill="#64748b">Platinum Card #84920</text>
      </g>

      <!-- Digital Member Pass Card -->
      <g transform="translate(26, 130)">
        <rect width="288" height="190" rx="16" fill="#111824" stroke="url(#qrNeon)" stroke-width="1.5"/>

        <!-- Simulated QR Code -->
        <g transform="translate(20, 20)">
          <rect width="90" height="90" rx="8" fill="#ffffff"/>
          <g fill="#000000">
            <rect x="8" y="8" width="24" height="24" rx="3"/>
            <rect x="58" y="8" width="24" height="24" rx="3"/>
            <rect x="8" y="58" width="24" height="24" rx="3"/>
            <rect x="40" y="40" width="12" height="12"/>
            <rect x="60" y="60" width="16" height="16"/>
          </g>
        </g>

        <text x="125" y="45" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">TURNSTILE PASS</text>
        <text x="125" y="64" font-family="monospace" font-size="10" fill="#4ade80">● TAP TO ENTER</text>
        <text x="125" y="88" font-family="sans-serif" font-size="10.5" fill="#94a3b8">Valid across all 8 clubs</text>

        <line x1="20" y1="130" x2="268" y2="130" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="155" font-family="monospace" font-size="10" fill="#7d90a6">BIOMETRICS: VERIFIED</text>
        <text x="20" y="172" font-family="monospace" font-size="9" fill="#56d9fe">Token expires in 45s</text>
      </g>

      <!-- Today's Schedule Card -->
      <g transform="translate(26, 340)">
        <rect width="288" height="100" rx="14" fill="#111824" stroke="rgba(255,255,255,0.06)"/>
        <text x="16" y="24" font-family="monospace" font-size="10" fill="#ffd166">TODAY AT 19:00</text>
        <text x="16" y="48" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff">Crossfit Master Class</text>
        <text x="16" y="70" font-family="sans-serif" font-size="11.5" fill="#94a3b8">Hall 2 • Coach: Marcus V. [Booked]</text>
      </g>

      <!-- Activity Ring Stats -->
      <g transform="translate(26, 455)">
        <rect width="288" height="90" rx="14" fill="#111824" stroke="rgba(255,255,255,0.06)"/>
        <text x="16" y="24" font-family="monospace" font-size="10" fill="#7d90a6">WEEKLY TELEMETRY</text>
        <text x="16" y="52" font-family="sans-serif" font-size="20" font-weight="bold" fill="#4ade80">4 Workouts</text>
        <text x="16" y="72" font-family="sans-serif" font-size="11" fill="#64748b">HealthKit &amp; Google Fit synced</text>
      </g>

      <!-- Bottom Tab Bar -->
      <g transform="translate(10, 565)">
        <rect width="340" height="55" rx="20" fill="#0d141f" stroke="rgba(255,255,255,0.08)"/>
        <text x="35" y="32" font-family="sans-serif" font-size="10" font-weight="bold" fill="#4ade80">Pass</text>
        <text x="115" y="32" font-family="sans-serif" font-size="10" fill="#64748b">Schedule</text>
        <text x="200" y="32" font-family="sans-serif" font-size="10" fill="#64748b">Clubs</text>
        <text x="275" y="32" font-family="sans-serif" font-size="10" fill="#64748b">Profile</text>
      </g>
    </g>
  </g>
</svg>`
}

// --------------------------------------------------------------------------
// 5. WEB-3: Multi-Tenant Subscription & Invoicing Engine
// --------------------------------------------------------------------------
function genWeb3() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bgW3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#05070a"/><stop offset="100%" stop-color="#0a121d"/></linearGradient>
    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4ade80" stop-opacity="0.38"/><stop offset="100%" stop-color="#4ade80" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bgW3)"/>
  <g transform="translate(80, 60)">
    <rect width="1440" height="880" rx="16" fill="#080d16" stroke="rgba(74,222,128,0.2)" stroke-width="1.5"/>
    <rect width="1440" height="52" rx="16" fill="#0d1522"/>
    <circle cx="28" cy="26" r="6" fill="#ff5f56"/><circle cx="48" cy="26" r="6" fill="#ffbd2e"/><circle cx="68" cy="26" r="6" fill="#27c93f"/>
    <rect x="220" y="12" width="600" height="28" rx="6" fill="#131e2e"/>
    <text x="240" y="31" font-family="monospace" font-size="12" fill="#7d90a6">https://subhub.fintech/billing • 99.99% IDEMPOTENCY • WEBHOOKS HEALTHY</text>

    <g transform="translate(40, 75)">
      <!-- Top KPIs -->
      <g>
        <rect width="320" height="90" rx="10" fill="#0e1724" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">MONTHLY RECURRING REVENUE</text>
        <text x="20" y="60" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff">$482,900</text>
        <text x="20" y="78" font-family="monospace" font-size="10" fill="#4ade80">● +14.2% MoM Expansion</text>
      </g>
      <g transform="translate(350, 0)">
        <rect width="320" height="90" rx="10" fill="#0e1724" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">WEBHOOK INGESTION (24H)</text>
        <text x="20" y="60" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff">124,800 Events</text>
        <text x="20" y="78" font-family="monospace" font-size="10" fill="#56d9fe">0 Failed • 100% Reconciled</text>
      </g>
      <g transform="translate(700, 0)">
        <rect width="320" height="90" rx="10" fill="#0e1724" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">ACTIVE SUBSCRIPTIONS</text>
        <text x="20" y="60" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff">14,240 Accounts</text>
        <text x="20" y="78" font-family="monospace" font-size="10" fill="#4ade80">Churn: 0.82% (Industry Low)</text>
      </g>
      <g transform="translate(1050, 0)">
        <rect width="310" height="90" rx="10" fill="#0e1724" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">GATEWAY RECONCILIATION</text>
        <text x="20" y="60" font-family="sans-serif" font-size="26" font-weight="bold" fill="#4ade80">AUTOMATED</text>
        <text x="20" y="78" font-family="monospace" font-size="10" fill="#7d90a6">Audit hash: sha256:7f81b</text>
      </g>

      <!-- MRR Growth Curve -->
      <g transform="translate(0, 110)">
        <rect width="1360" height="300" rx="12" fill="#0b111c" stroke="rgba(255,255,255,0.08)"/>
        <text x="24" y="32" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">REVENUE ACCELERATION &amp; RECURRING COHORTS</text>

        <path d="M40,240 Q 240,210 440,170 T 840,110 T 1320,40 L 1320,270 L 40,270 Z" fill="url(#mrrGrad)"/>
        <path d="M40,240 Q 240,210 440,170 T 840,110 T 1320,40" fill="none" stroke="#4ade80" stroke-width="3"/>
        <circle cx="1320" cy="40" r="7" fill="#4ade80"/>
      </g>

      <!-- Subscriptions Table -->
      <g transform="translate(0, 430)">
        <rect width="1360" height="240" rx="10" fill="#0b111c" stroke="rgba(255,255,255,0.08)"/>
        <rect width="1360" height="36" rx="10" fill="#111824"/>
        <text x="20" y="22" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">ORGANIZATION</text>
        <text x="320" y="22" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">PLAN / SEATS</text>
        <text x="620" y="22" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">GATEWAY</text>
        <text x="920" y="22" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">STATUS</text>
        <text x="1180" y="22" font-family="monospace" font-size="11" font-weight="bold" fill="#7d90a6">MRR</text>

        <!-- Rows -->
        <g transform="translate(0, 36)">
          <text x="20" y="32" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">AcroVenture Cloud Inc.</text>
          <text x="320" y="32" font-family="monospace" font-size="12" fill="#56d9fe">Enterprise (250 Seats)</text>
          <text x="620" y="32" font-family="monospace" font-size="12" fill="#94a3b8">Stripe Custom ACH</text>
          <rect x="920" y="16" width="90" height="22" rx="4" fill="rgba(74,222,128,0.15)"/>
          <text x="930" y="31" font-family="monospace" font-size="10.5" font-weight="bold" fill="#4ade80">● ACTIVE</text>
          <text x="1180" y="32" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">$12,500/mo</text>
        </g>
        <g transform="translate(0, 92)">
          <text x="20" y="32" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">Nordic Media Group</text>
          <text x="320" y="32" font-family="monospace" font-size="12" fill="#56d9fe">Scale (120 Seats)</text>
          <text x="620" y="32" font-family="monospace" font-size="12" fill="#94a3b8">Braintree Vault</text>
          <rect x="920" y="16" width="90" height="22" rx="4" fill="rgba(74,222,128,0.15)"/>
          <text x="930" y="31" font-family="monospace" font-size="10.5" font-weight="bold" fill="#4ade80">● ACTIVE</text>
          <text x="1180" y="32" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">$6,800/mo</text>
        </g>
      </g>
    </g>
  </g>
</svg>`
}

// --------------------------------------------------------------------------
// 6. WEB-4: High-Throughput Telemetry & Analytics Dashboard
// --------------------------------------------------------------------------
function genWeb4() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bgW4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#05070a"/><stop offset="100%" stop-color="#0b131e"/></linearGradient>
    <linearGradient id="cyanLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#56d9fe"/><stop offset="100%" stop-color="#4ade80"/></linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bgW4)"/>
  <g transform="translate(80, 60)">
    <rect width="1440" height="880" rx="16" fill="#080e18" stroke="rgba(86,217,254,0.25)" stroke-width="1.5"/>
    <rect width="1440" height="52" rx="16" fill="#0d1726"/>
    <circle cx="28" cy="26" r="6" fill="#ff5f56"/><circle cx="48" cy="26" r="6" fill="#ffbd2e"/><circle cx="68" cy="26" r="6" fill="#27c93f"/>
    <rect x="220" y="12" width="620" height="28" rx="6" fill="#132034"/>
    <text x="240" y="31" font-family="monospace" font-size="12" fill="#7d90a6">https://pulse-metrics.cloud/telemetry • CLICKHOUSE 6 NODES • 50M+ EVENTS/MO</text>

    <g transform="translate(40, 75)">
      <!-- KPI Row -->
      <g>
        <rect width="320" height="90" rx="10" fill="#0e1828" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">INGESTION THROUGHPUT</text>
        <text x="20" y="60" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff">18,400 req/s</text>
        <text x="20" y="78" font-family="monospace" font-size="10" fill="#4ade80">● Kafka Cluster Healthy</text>
      </g>
      <g transform="translate(350, 0)">
        <rect width="320" height="90" rx="10" fill="#0e1828" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">P99 QUERY LATENCY</text>
        <text x="20" y="60" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff">32 ms</text>
        <text x="20" y="78" font-family="monospace" font-size="10" fill="#56d9fe">Sub-second over 100M rows</text>
      </g>
      <g transform="translate(700, 0)">
        <rect width="320" height="90" rx="10" fill="#0e1828" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">DATA COMPRESSION RATIO</text>
        <text x="20" y="60" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff">4.8x (LZ4)</text>
        <text x="20" y="78" font-family="monospace" font-size="10" fill="#4ade80">−60% Storage Infrastructure Cost</text>
      </g>
      <g transform="translate(1050, 0)">
        <rect width="310" height="90" rx="10" fill="#0e1828" stroke="rgba(255,255,255,0.08)"/>
        <text x="20" y="26" font-family="monospace" font-size="11" fill="#7d90a6">GLOBAL AVAILABILITY</text>
        <text x="20" y="60" font-family="sans-serif" font-size="28" font-weight="bold" fill="#4ade80">99.995%</text>
        <text x="20" y="78" font-family="monospace" font-size="10" fill="#7d90a6">Multi-region active-active</text>
      </g>

      <!-- Big Realtime Telemetry Chart -->
      <g transform="translate(0, 115)">
        <rect width="1360" height="550" rx="12" fill="#0b1320" stroke="rgba(255,255,255,0.08)"/>
        <text x="24" y="36" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">REALTIME EVENT STREAM VOLUMETRICS (CLICKHOUSE ENGINE)</text>

        <!-- Wave Charts -->
        <g opacity="0.12" stroke="#56d9fe" stroke-width="1">
          <line x1="40" y1="100" x2="1320" y2="100"/><line x1="40" y1="200" x2="1320" y2="200"/>
          <line x1="40" y1="300" x2="1320" y2="300"/><line x1="40" y1="400" x2="1320" y2="400"/>
        </g>
        <path d="M40,380 Q 200,240 360,310 T 680,180 T 1000,260 T 1320,120" fill="none" stroke="url(#cyanLine)" stroke-width="4"/>
        <circle cx="1320" cy="120" r="8" fill="#4ade80"/>
        <rect x="1220" y="75" width="110" height="32" rx="6" fill="#132034" stroke="#4ade80"/>
        <text x="1230" y="96" font-family="monospace" font-size="11" font-weight="bold" fill="#4ade80">● 18,400 RPS</text>
      </g>
    </g>
  </g>
</svg>`
}

// --------------------------------------------------------------------------
// 7. AI-2: Enterprise RAG Knowledge Base & Smart Assistant
// --------------------------------------------------------------------------
function genAi2() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bgAi2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#040609"/><stop offset="100%" stop-color="#080e18"/></linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bgAi2)"/>

  <g transform="translate(80, 60)">
    <rect width="1440" height="880" rx="16" fill="#070c14" stroke="rgba(86,217,254,0.25)" stroke-width="1.5"/>
    <rect width="1440" height="48" rx="16" fill="#0d1422"/>
    <text x="24" y="29" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">DOCUMIND RAG // ENTERPRISE SEMANTIC SEARCH &amp; GROUNDED REASONING</text>
    <rect x="1260" y="12" width="150" height="24" rx="4" fill="rgba(86,217,254,0.15)"/>
    <text x="1275" y="28" font-family="monospace" font-size="11" font-weight="bold" fill="#56d9fe">● HYBRID SEARCH</text>

    <g transform="translate(40, 75)">
      <!-- Left: Vector Knowledge Base Sources -->
      <g>
        <rect width="400" height="740" rx="12" fill="#0b121e" stroke="rgba(255,255,255,0.08)"/>
        <text x="24" y="36" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">INDEXED REPOSITORIES (PGVECTOR)</text>

        <g transform="translate(20, 60)">
          <rect width="360" height="80" rx="8" fill="#101928"/>
          <text x="16" y="26" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">Corporate Contracts &amp; NDAs</text>
          <text x="16" y="48" font-family="monospace" font-size="11" fill="#4ade80">● 14,200 chunks • text-embedding-3</text>
        </g>
        <g transform="translate(20, 155)">
          <rect width="360" height="80" rx="8" fill="#101928"/>
          <text x="16" y="26" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">Technical API &amp; Architecture Specs</text>
          <text x="16" y="48" font-family="monospace" font-size="11" fill="#4ade80">● 9,840 chunks • BM25 indexed</text>
        </g>
        <g transform="translate(20, 250)">
          <rect width="360" height="80" rx="8" fill="#101928"/>
          <text x="16" y="26" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">CRM Support &amp; Precedents History</text>
          <text x="16" y="48" font-family="monospace" font-size="11" fill="#56d9fe">● 32,400 tickets • Hybrid Reciprocal</text>
        </g>
      </g>

      <!-- Right: Live RAG Execution Pipeline -->
      <g transform="translate(430, 0)">
        <rect width="930" height="740" rx="12" fill="#0b121e" stroke="rgba(255,255,255,0.08)"/>
        <text x="24" y="36" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">EXECUTION FLOW &amp; CITATION GROUNDING</text>

        <!-- Prompt Card -->
        <g transform="translate(24, 60)">
          <rect width="880" height="90" rx="8" fill="#101928" stroke="rgba(86,217,254,0.2)"/>
          <text x="16" y="26" font-family="monospace" font-size="10.5" fill="#56d9fe">USER QUERY</text>
          <text x="16" y="52" font-family="sans-serif" font-size="15" fill="#ffffff">"What is the liability limitation clause in our Q3 cloud partnership agreement?"</text>
        </g>

        <!-- Semantic Retrieval Chunks -->
        <g transform="translate(24, 170)">
          <rect width="880" height="150" rx="8" fill="#0f1724" stroke="rgba(74,222,128,0.2)"/>
          <text x="16" y="26" font-family="monospace" font-size="10.5" fill="#4ade80">RETRIEVED CONTEXT (COSINE SCORE: 0.942 · 3 CHUNKS MERGED)</text>
          <text x="16" y="52" font-family="monospace" font-size="11.5" fill="#cbd5e1">[Doc ID: #AGR-2024-C8, Section 14.2]: "Neither party shall be liable for aggregate</text>
          <text x="16" y="74" font-family="monospace" font-size="11.5" fill="#cbd5e1">damages exceeding 12 months fees paid. SLA uptime target: 99.98%."</text>
          <rect x="16" y="100" width="140" height="26" rx="4" fill="rgba(74,222,128,0.15)"/>
          <text x="26" y="118" font-family="monospace" font-size="11" font-weight="bold" fill="#4ade80">● Source Verified</text>
        </g>

        <!-- Grounded Synthesis Answer -->
        <g transform="translate(24, 340)">
          <rect width="880" height="180" rx="8" fill="#101928" stroke="rgba(255,255,255,0.1)"/>
          <text x="16" y="26" font-family="monospace" font-size="10.5" fill="#ffd166">GROUNDED LLM RESPONSE (CONFIDENCE: 98.7%)</text>
          <text x="16" y="56" font-family="sans-serif" font-size="14.5" fill="#ffffff">Under Section 14.2 of Agreement #AGR-2024-C8, total liability is capped at the sum of</text>
          <text x="16" y="80" font-family="sans-serif" font-size="14.5" fill="#ffffff">fees paid over the preceding 12 months. Uptime commitments are guaranteed at 99.98%.</text>
          <text x="16" y="140" font-family="monospace" font-size="11" fill="#56d9fe">Latency: 380ms • Tokens: 124 prompt / 42 completion • Zero hallucination</text>
        </g>
      </g>
    </g>
  </g>
</svg>`
}

// --------------------------------------------------------------------------
// 8. AI-3: Computer Vision Defect Detection (YOLO / Streams)
// --------------------------------------------------------------------------
function genAi3() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bgAi3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#05070a"/><stop offset="100%" stop-color="#0a1218"/></linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bgAi3)"/>

  <g transform="translate(80, 60)">
    <rect width="1440" height="880" rx="16" fill="#080c14" stroke="rgba(74,222,128,0.25)" stroke-width="1.5"/>
    <rect width="1440" height="48" rx="16" fill="#0e1622"/>
    <text x="24" y="29" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">VISIONQC // REAL-TIME IN-LINE DEFECT DETECTION (YOLOV8 ONNX RUNTIME)</text>
    <text x="800" y="29" font-family="monospace" font-size="11" fill="#7d90a6">[RTSP CAMERA STREAM #04 · 45.2 FPS · LOCAL INFERENCE]</text>

    <!-- Camera viewport -->
    <g transform="translate(40, 75)">
      <rect width="900" height="640" rx="12" fill="#040608" stroke="rgba(255,255,255,0.1)"/>

      <!-- Camera crosshair & overlay -->
      <g stroke="rgba(255,255,255,0.15)" stroke-width="1">
        <line x1="450" y1="20" x2="450" y2="620"/><line x1="20" y1="320" x2="880" y2="320"/>
      </g>

      <!-- Target Object 1 (Passed inspection) -->
      <rect x="140" y="140" width="280" height="240" rx="6" fill="rgba(74,222,128,0.06)" stroke="#4ade80" stroke-width="2.5"/>
      <rect x="140" y="115" width="160" height="25" fill="#4ade80"/>
      <text x="148" y="132" font-family="monospace" font-size="11" font-weight="bold" fill="#000000">COMPONENT #01 [99.4% OK]</text>

      <!-- Target Object 2 (Passed inspection) -->
      <rect x="480" y="220" width="320" height="260" rx="6" fill="rgba(86,217,254,0.06)" stroke="#56d9fe" stroke-width="2.5"/>
      <rect x="480" y="195" width="180" height="25" fill="#56d9fe"/>
      <text x="488" y="212" font-family="monospace" font-size="11" font-weight="bold" fill="#000000">ALIGNMENT [98.9% PASS]</text>

      <text x="30" y="610" font-family="monospace" font-size="12" fill="#4ade80">● INFERENCE SPEED: 14.8 ms • ZERO MISSED DEFECTS</text>
    </g>

    <!-- Right Side Telemetry -->
    <g transform="translate(970, 75)">
      <rect width="430" height="640" rx="12" fill="#0b121e" stroke="rgba(255,255,255,0.08)"/>
      <text x="24" y="36" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">INSPECTION STATS</text>

      <g transform="translate(20, 60)">
        <rect width="390" height="80" rx="8" fill="#101928"/>
        <text x="16" y="26" font-family="monospace" font-size="11" fill="#7d90a6">SHIFT PRODUCTION</text>
        <text x="16" y="56" font-family="sans-serif" font-size="24" font-weight="bold" fill="#ffffff">42,800 Units</text>
      </g>
      <g transform="translate(20, 160)">
        <rect width="390" height="80" rx="8" fill="#101928"/>
        <text x="16" y="26" font-family="monospace" font-size="11" fill="#7d90a6">ACCURACY / RECALL</text>
        <text x="16" y="56" font-family="sans-serif" font-size="24" font-weight="bold" fill="#4ade80">98.6% Recall</text>
      </g>
      <g transform="translate(20, 260)">
        <rect width="390" height="80" rx="8" fill="#101928"/>
        <text x="16" y="26" font-family="monospace" font-size="11" fill="#7d90a6">REPLACED MANUAL STATIONS</text>
        <text x="16" y="56" font-family="sans-serif" font-size="24" font-weight="bold" fill="#56d9fe">4 Manual Checks</text>
      </g>
    </g>
  </g>
</svg>`
}

// --------------------------------------------------------------------------
// 9. MOBILE-2: Courier & Field Operations Offline App
// --------------------------------------------------------------------------
function genMobile2() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bgMob2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#05070a"/><stop offset="100%" stop-color="#0a121c"/></linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bgMob2)"/>

  <g transform="translate(100, 140)">
    <rect width="1400" height="720" rx="20" fill="#090d15" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>

    <g transform="translate(60, 60)">
      <text x="0" y="30" font-family="monospace" font-size="12" font-weight="bold" fill="#56d9fe">● HIGH-RELIABILITY FLUTTER CLIENT</text>
      <text x="0" y="70" font-family="sans-serif" font-size="34" font-weight="bold" fill="#ffffff">Field Operations &amp; Courier</text>
      <text x="0" y="105" font-family="sans-serif" font-size="16" fill="#8fa2b8">Offline-First Synchronisation Engine</text>

      <g transform="translate(0, 150)">
        <rect width="380" height="90" rx="10" fill="#0f1622" stroke="rgba(255,255,255,0.06)"/>
        <text x="20" y="28" font-family="monospace" font-size="11" fill="#7d90a6">ZERO CONNECTION RESILIENCE</text>
        <text x="20" y="56" font-family="sans-serif" font-size="17" font-weight="bold" fill="#ffffff">Two-Way SQLite Queue</text>
        <text x="20" y="76" font-family="monospace" font-size="10" fill="#4ade80">● 100% data preservation offline</text>
      </g>

      <g transform="translate(0, 260)">
        <rect width="380" height="90" rx="10" fill="#0f1622" stroke="rgba(255,255,255,0.06)"/>
        <text x="20" y="28" font-family="monospace" font-size="11" fill="#7d90a6">GPS &amp; BATTERY EFFICIENCY</text>
        <text x="20" y="56" font-family="sans-serif" font-size="17" font-weight="bold" fill="#ffffff">Smart Geofence Polling</text>
        <text x="20" y="76" font-family="monospace" font-size="10" fill="#56d9fe">Full 12-hour shift on single charge</text>
      </g>

      <g transform="translate(0, 370)">
        <rect width="380" height="90" rx="10" fill="#0f1622" stroke="rgba(255,255,255,0.06)"/>
        <text x="20" y="28" font-family="monospace" font-size="11" fill="#7d90a6">DIGITAL SIGNATURE &amp; PROOF</text>
        <text x="20" y="56" font-family="sans-serif" font-size="17" font-weight="bold" fill="#ffffff">Instant Customer Signoff</text>
        <text x="20" y="76" font-family="monospace" font-size="10" fill="#4ade80">Geotagged photos + SHA hash</text>
      </g>
    </g>

    <!-- Phone mockup -->
    <g transform="translate(620, 40)">
      <rect width="360" height="640" rx="42" fill="#030508" stroke="#1f2d3d" stroke-width="4"/>
      <rect x="10" y="10" width="340" height="620" rx="34" fill="#0b1017"/>
      <rect x="120" y="20" width="100" height="22" rx="11" fill="#000000"/>

      <text x="35" y="36" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">9:41</text>
      <text x="280" y="36" font-family="monospace" font-size="10" fill="#ffffff">5G 98%</text>

      <g transform="translate(26, 60)">
        <text x="0" y="18" font-family="monospace" font-size="10" font-weight="bold" fill="#56d9fe">● ROUTE ACTIVE</text>
        <text x="0" y="40" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff">Delivery #EXP-482</text>
        <text x="0" y="56" font-family="sans-serif" font-size="11" fill="#64748b">12 drops completed • 4 remaining</text>
      </g>

      <!-- Current Drop Card -->
      <g transform="translate(26, 130)">
        <rect width="288" height="150" rx="14" fill="#111824" stroke="rgba(86,217,254,0.3)" stroke-width="1.5"/>
        <text x="16" y="26" font-family="monospace" font-size="10.5" fill="#56d9fe">NEXT DESTINATION • 1.2 KM</text>
        <text x="16" y="50" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff">Harbor View Tower, Suite 402</text>
        <text x="16" y="72" font-family="sans-serif" font-size="12" fill="#94a3b8">Customer: Sarah L. [Prepaid]</text>
        <rect x="16" y="95" width="256" height="38" rx="8" fill="#4ade80"/>
        <text x="50" y="119" font-family="sans-serif" font-size="12" font-weight="bold" fill="#000000">SWIPE TO CONFIRM DELIVERY</text>
      </g>

      <!-- Offline Sync Badge -->
      <g transform="translate(26, 300)">
        <rect width="288" height="50" rx="10" fill="#0e1724" stroke="rgba(74,222,128,0.2)"/>
        <text x="16" y="30" font-family="monospace" font-size="11" fill="#4ade80">● OFFLINE QUEUE: 0 PENDING (SYNCED)</text>
      </g>
    </g>
  </g>
</svg>`
}

// Write the files
writeFileSync(resolve(outDir, 'web-1.svg'), genWeb1())
writeFileSync(resolve(outDir, 'web-2.svg'), genWeb2())
writeFileSync(resolve(outDir, 'web-3.svg'), genWeb3())
writeFileSync(resolve(outDir, 'web-4.svg'), genWeb4())
writeFileSync(resolve(outDir, 'ai-1.svg'), genAi1())
writeFileSync(resolve(outDir, 'ai-2.svg'), genAi2())
writeFileSync(resolve(outDir, 'ai-3.svg'), genAi3())
writeFileSync(resolve(outDir, 'mobile-1.svg'), genMobile1())
writeFileSync(resolve(outDir, 'mobile-2.svg'), genMobile2())

console.log('Successfully generated all 9 high-fidelity UI vector mockups!')
