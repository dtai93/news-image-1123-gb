function leadSvg(inner) {
  return `<svg viewBox="0 0 360 130" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
}
function candles() {
  const tops = [96, 90, 86, 78, 80, 68, 60, 48, 36];
  return tops.map((y, i) => {
    const x = 22 + i * 20, h = Math.max(16, 112 - y), up = i === 0 || y <= tops[i - 1];
    const c = up ? "#22c55e" : "#ef4444";
    return `<line x1="${x + 6}" y1="${y - 7}" x2="${x + 6}" y2="${y + h + 5}" stroke="${c}" stroke-width="1.4"/>
      <rect x="${x}" y="${y}" width="12" height="${h}" fill="${c}"/>`;
  }).join("");
}
function artHuang() {
  return leadSvg(`<rect width="360" height="130" fill="#0c1730"/>
    <rect x="8" y="22" width="200" height="100" rx="2" fill="#101e38" stroke="#3d6490"/>
    <g stroke="#23415f">${[40, 58, 76, 94].map(y => `<line x1="8" y1="${y}" x2="208" y2="${y}"/>`).join("")}</g>
    ${candles()}
    <text x="16" y="36" fill="#8fb4d8" font-family="Source Sans 3" font-size="9" font-weight="700">NASDAQ</text>
    <text x="214" y="58" fill="#4ade80" font-family="Source Sans 3" font-size="30" font-weight="800">+6.5%</text>
    <text x="214" y="76" fill="#e8f1fb" font-family="Source Sans 3" font-size="13" font-weight="700">24,090</text>
    <text x="214" y="90" fill="#9eb6d0" font-family="Source Sans 3" font-size="9">S&amp;P +4.7% · Dow +3%</text>
    <rect x="214" y="98" width="136" height="24" rx="2" fill="#f3e2b8" stroke="#8a7040"/>
    <rect x="220" y="103" width="16" height="14" rx="1" fill="#166534" stroke="#bbf7d0"/>
    <text x="242" y="114" fill="#1a140c" font-family="Source Serif Pro" font-size="12" font-weight="700">J. HUANG · CEO</text>`);
}
function artRefinery() {
  const tower = (x, h, flame) => `<rect x="${x}" y="${118 - h}" width="16" height="${h}" fill="#4b5568"/>
    <rect x="${x - 4}" y="${118 - h - 6}" width="24" height="6" fill="#6b7280"/>
    <ellipse cx="${x + 8}" cy="${112 - h}" rx="7" ry="12" fill="${flame}"/>
    <ellipse cx="${x + 8}" cy="${106 - h}" rx="3" ry="6" fill="#fde68a"/>`;
  return leadSvg(`<rect width="360" height="130" fill="#070b16"/>
    <rect y="96" width="360" height="34" fill="#e8eef6"/>
    ${tower(36, 62, "#f97316")}${tower(70, 78, "#ef4444")}${tower(104, 54, "#fb923c")}
    <rect x="150" y="70" width="70" height="40" fill="#374151"/>
    <polygon points="150,70 185,52 220,70" fill="#1f2937"/>
    <rect x="168" y="88" width="22" height="22" fill="#111827"/>
    <text x="156" y="114" fill="#111" font-family="Source Sans 3" font-size="8" font-weight="800">HALTED</text>
    <g fill="#cbd5e1">${[0, 1, 2, 3].map(i => `<ellipse cx="${250 + i * 22}" cy="${28 + (i % 2) * 8}" rx="10" ry="3"/>`).join("")}</g>
    <rect x="248" y="78" width="100" height="28" rx="2" fill="#7f1d1d"/>
    <text x="256" y="97" fill="#fff" font-family="Source Sans 3" font-size="14" font-weight="800">192 DOWN</text>`);
}
function artHormuz() {
  const ship = (x, y) => `<g>
    <polygon points="${x},${y} ${x + 54},${y} ${x + 46},${y + 12} ${x + 8},${y + 12}" fill="#334155"/>
    <rect x="${x + 14}" y="${y - 10}" width="22" height="10" fill="#475569"/>
    <ellipse cx="${x + 22}" cy="${y - 16}" rx="6" ry="8" fill="#f97316"/>
    <ellipse cx="${x + 36}" cy="${y - 12}" rx="4" ry="6" fill="#fde68a"/>
  </g>`;
  return leadSvg(`<rect width="360" height="130" fill="#7c5a32"/>
    <polygon points="0,0 150,0 118,130 0,130" fill="#c4a574"/>
    <polygon points="250,0 360,0 360,130 230,130" fill="#b8956a"/>
    <polygon points="150,0 250,0 230,130 118,130" fill="#1d4e73"/>
    ${ship(150, 36)}${ship(168, 64)}${ship(146, 92)}
    ${[40, 58, 76].map(y => `<circle cx="200" cy="${y}" r="4" fill="#111" stroke="#e5e7eb" stroke-width="1"/>`).join("")}
    <g fill="#64748b">${[0, 1, 2, 3].map(i => `<rect x="${20 + i * 22}" y="108" width="16" height="5"/>`).join("")}</g>
    <text x="10" y="42" fill="#1c140f" font-family="Source Sans 3" font-size="9" font-weight="800">IRAN</text>
    <text x="312" y="16" fill="#1c140f" font-family="Source Sans 3" font-size="8" font-weight="800">OMAN</text>`);
}
function artLead(n) {
  if (n === 1) return artHuang();
  if (n === 2) return artRefinery();
  return artHormuz();
}
