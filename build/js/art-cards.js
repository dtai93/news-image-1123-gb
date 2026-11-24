function cardSvg(inner) {
  return `<svg viewBox="0 0 200 44" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><g transform="translate(0,4) scale(1,0.56)">${inner}</g></svg>`;
}
const CARD = {
  4: `<rect width="200" height="64" fill="#1e1b4b"/>
    <rect x="18" y="28" width="36" height="28" fill="#7c2d12"/>
    <polygon points="14,28 36,14 58,28" fill="#44403c"/>
    ${[0,1,2,3,4].map(i => `<rect x="${78 + i * 18}" y="22" width="14" height="28" fill="#b91c1c" stroke="#fecaca"/>`).join("")}`,
  5: `<rect width="200" height="64" fill="#44403c"/>
    <rect x="8" y="14" width="70" height="40" fill="#d6d3d1"/>
    <path d="M16 18 H70 M20 28 H64 M18 40 H60" stroke="#1c1917" stroke-width="2"/>
    <ellipse cx="130" cy="40" rx="36" ry="12" fill="#1c1917"/>
    <rect x="108" y="26" width="40" height="12" fill="#292524"/>
    <ellipse cx="148" cy="22" rx="8" ry="10" fill="#f97316"/>`,
  6: `<rect width="200" height="64" fill="#a8a29e"/>
    <circle cx="36" cy="36" r="16" fill="#0e7490" stroke="#cffafe" stroke-width="3"/>
    <rect x="78" y="16" width="22" height="30" rx="2" fill="#0f766e"/>
    <text x="81" y="34" fill="#fff" font-size="7" font-family="Source Sans 3" font-weight="800">UN</text>
    ${[0,1,2,3].map(i => `<rect x="${112 + i * 20}" y="30" width="16" height="8" rx="2" fill="#f5f5f4" stroke="#444"/>`).join("")}
    <text x="112" y="22" fill="#1c1917" font-size="9" font-family="Source Sans 3" font-weight="800">4 KILLED</text>`,
  7: `<rect width="200" height="64" fill="#155e75"/>
    <rect x="20" y="20" width="48" height="36" fill="#57534e"/>
    <ellipse cx="36" cy="16" rx="8" ry="10" fill="#334155"/>
    <ellipse cx="50" cy="18" rx="6" ry="8" fill="#64748b"/>
    <rect x="100" y="28" width="70" height="22" rx="2" fill="#7f1d1d"/>
    <text x="108" y="43" fill="#fff" font-size="12" font-family="Source Sans 3" font-weight="800">TOLL 17</text>`,
  8: `<rect width="200" height="64" fill="#e7e5e4"/>
    <rect x="16" y="8" width="40" height="50" fill="#44403c"/>
    <circle cx="48" cy="34" r="2" fill="#d6d3d1"/>
    <rect x="80" y="18" width="10" height="28" fill="#44403c"/>
    <circle cx="85" cy="16" r="8" fill="#a8a29e"/>
    <path d="M130 18 q20 16 0 36 q-8 -16 0 -36" fill="#1c1917"/>
    <text x="148" y="36" fill="#1c1917" font-size="10" font-family="Source Sans 3" font-weight="800">74</text>`,
  9: `<rect width="200" height="64" fill="#f5f0e6"/>
    <rect x="20" y="16" width="28" height="36" fill="#a16207"/>
    <rect x="24" y="20" width="20" height="16" fill="#fef3c7"/>
    <rect x="70" y="18" width="36" height="32" fill="#e5e7eb" stroke="#111"/>
    <text x="74" y="38" fill="#b91c1c" font-size="9" font-family="Source Sans 3" font-weight="800">SHUT</text>
    <rect x="124" y="22" width="60" height="22" rx="2" fill="#1d4ed8"/>
    <text x="130" y="36" fill="#fff" font-size="8" font-family="Source Sans 3" font-weight="700">BRU → BCN</text>`,
  10: `<rect width="200" height="64" fill="#166534"/>
    <circle cx="36" cy="34" r="16" fill="#fff" stroke="#111" stroke-width="2"/>
    <polygon points="36,22 40,30 36,30 32,30" fill="#111"/>
    <rect x="70" y="14" width="54" height="36" rx="2" fill="#fef3c7"/>
    <text x="76" y="36" fill="#1c1917" font-size="14" font-family="Source Sans 3" font-weight="800">2031</text>
    <rect x="132" y="14" width="54" height="36" rx="2" fill="#dbeafe"/>
    <text x="138" y="36" fill="#1e3a8a" font-size="14" font-family="Source Sans 3" font-weight="800">2035</text>`,
  11: `<rect width="200" height="64" fill="#0f172a"/>
    ${[0,1,2].map(i => `<rect x="${16 + i * 28}" y="14" width="22" height="40" rx="1" fill="#1e293b" stroke="#64748b"/>`).join("")}
    <circle cx="27" cy="24" r="3" fill="#ef4444"/>
    <rect x="110" y="16" width="70" height="32" rx="2" fill="#7f1d1d"/>
    <text x="118" y="36" fill="#fff" font-size="11" font-family="Source Sans 3" font-weight="800">NCIC</text>`,
  12: `<rect width="200" height="64" fill="#0f172a"/>
    ${[0,1,2,3].map(i => `<rect x="${12 + i * 22}" y="16" width="16" height="36" fill="#334155"/>`).join("")}
    <rect x="110" y="18" width="36" height="28" fill="#fbbf24" stroke="#111"/>
    <circle cx="158" cy="32" r="16" fill="none" stroke="#ef4444" stroke-width="4"/>
    <line x1="148" y1="42" x2="168" y2="22" stroke="#ef4444" stroke-width="4"/>`,
  13: `<rect width="200" height="64" fill="#f8fafc"/>
    ${Array.from({length: 40}, (_, i) => {
      const blank = i > 36;
      return `<rect x="${8 + (i % 10) * 10}" y="${8 + Math.floor(i / 10) * 12}" width="8" height="9" fill="${blank ? "#fff" : "#1d4ed8"}" stroke="#94a3b8"/>`;
    }).join("")}
    <text x="116" y="40" fill="#1e3a8a" font-size="22" font-family="Source Sans 3" font-weight="800">259</text>`
};
function artCard(n) { return cardSvg(CARD[n] || `<rect width="200" height="64" fill="#444"/>`); }
