const LAND = [
  "-168,71 -165,64 -156,58 -150,60 -140,59 -132,55 -125,49 -124,40 -120,34 -115,32 -110,24 -105,21 -98,17 -92,15 -87,16 -90,21 -96,25 -97,29 -90,30 -84,29 -81,25 -80,28 -81,31 -76,35 -74,40 -70,42 -66,45 -60,47 -56,53 -66,60 -84,65 -108,71 -140,70 -158,71 -168,71",
  "-80,9 -71,12 -62,8 -51,2 -35,-5 -35,-12 -40,-22 -48,-28 -62,-40 -68,-48 -74,-52 -75,-42 -71,-20 -76,-12 -81,-2 -78,6 -80,9",
  "-9,36 -9,43 -2,44 -5,48 -5,52 -4,58 1,59 5,62 8,58 12,55 15,54 12,48 16,46 18,41 12,42 8,44 3,43 5,37 12,38 16,40 22,37 28,41 24,46 16,48 10,46 4,44 -2,43 -9,36",
  "5,57 5,63 12,66 18,69 26,71 31,70 26,61 18,58 10,57 5,57",
  "-8,50 -6,54 -4,58 -1,58 2,53 1,50 -5,50 -8,50",
  "-17,15 -16,22 -10,32 -1,36 10,37 20,32 32,31 34,27 36,20 43,12 51,12 43,2 39,-8 34,-20 32,-30 20,-35 18,-32 13,-12 10,2 4,5 -6,5 -15,10 -17,15",
  "34,30 38,32 44,30 48,26 56,27 58,24 54,16 48,13 43,13 40,18 36,24 34,30",
  "28,42 36,37 44,39 52,38 58,30 66,27 72,26 82,28 92,26 104,24 116,24 124,31 132,36 140,46 152,56 166,66 180,70 145,74 100,76 60,73 32,68 26,50 28,42",
  "70,29 74,22 77,8 82,11 88,26 78,30 70,29",
  "92,27 98,14 104,2 109,6 107,16 113,22 102,28 92,27",
  "130,32 134,34 138,36 141,40 139,42 134,35 130,32",
  "113,-22 124,-18 132,-14 142,-11 148,-16 153,-28 150,-38 138,-38 128,-33 116,-34 113,-26 113,-22",
  "166,-46 170,-40 175,-37 178,-41 172,-46 166,-46",
  "-68,76 -58,82 -42,83 -22,80 -20,72 -34,66 -48,62 -60,68 -68,76",
  "43,-12 50,-16 48,-25 43,-25 43,-16"
];
function ring(s) {
  const pts = s.trim().split(/\s+/).map(p => p.split(",").map(Number));
  return pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${(-p[1]).toFixed(1)}`).join("") + "Z";
}
function project(lon, lat, W, H) {
  return [(lon + 180) / 360 * W, (90 - lat) / 180 * H];
}
function spread(pins) {
  const big = pins.filter(p => p.n <= 13);
  for (let k = 0; k < 14; k++) {
    for (let i = 0; i < big.length; i++) {
      for (let j = i + 1; j < big.length; j++) {
        const dx = big[j].x - big[i].x, dy = big[j].y - big[i].y;
        const d = Math.hypot(dx, dy) || 0.1;
        if (d < 15) {
          const p = (15 - d) / 2;
          big[i].x -= dx / d * p; big[i].y -= dy / d * p;
          big[j].x += dx / d * p; big[j].y += dy / d * p;
        }
      }
    }
  }
}
function drawMap(stories, el) {
  const W = 392, H = 220;
  const pins = stories.map(s => {
    const [x, y] = project(s.lon, s.lat, W, H);
    return { x, y, n: s.n, region: s.region };
  });
  spread(pins);
  const col = { Americas:"#1d4ed8", Europe:"#7e22ce", "Middle East":"#c2410c", "Asia-Pacific":"#0f766e", Oceania:"#15803d", World:"#a16207", Africa:"#78716c" };
  const land = LAND.map(ring).join("");
  const mark = (p, big) => {
    const fill = col[p.region] || "#111";
    const c = `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${big ? 5.3 : 2.2}" fill="${big ? "#fff" : fill}" stroke="${fill}" stroke-width="${big ? 1.4 : 0}"/>`;
    return big ? c + `<text x="${p.x.toFixed(1)}" y="${(p.y + 2.1).toFixed(1)}" text-anchor="middle" font-size="6.4" font-family="Source Sans 3" font-weight="800" fill="#111">${p.n}</text>` : c;
  };
  const dots = pins.filter(p => p.n > 13).map(p => mark(p, false)).join("") + pins.filter(p => p.n <= 13).map(p => mark(p, true)).join("");
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#163a5e"/>
    <g stroke="#2a5680" stroke-width="0.4" opacity="0.55">
      ${[-60,0,60].map(lon => { const x = project(lon, 0, W, H)[0]; return `<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`; }).join("")}
      ${[-60,-30,0,30,60].map(lat => { const y = project(0, lat, W, H)[1]; return `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`; }).join("")}
    </g>
    <g transform="translate(${W / 2} ${H / 2}) scale(${W / 360} ${H / 180})">
      <path d="${land}" fill="#e7d7b1" stroke="#e7d7b1" stroke-width="1.4"/>
    </g>
    ${dots}
  </svg>`;
}
