const REG = {
  Americas: ["#1d4ed8", "AMERICAS"], Europe: ["#7e22ce", "EUROPE"],
  "Middle East": ["#c2410c", "M. EAST"], "Asia-Pacific": ["#0f766e", "ASIA-PAC"],
  Oceania: ["#15803d", "OCEANIA"], World: ["#a16207", "WORLD"], Africa: ["#78716c", "AFRICA"]
};
const esc = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
function city(place) {
  const raw = place.split(",")[0].replace(" region", "").trim();
  const m = { "Strait of Hormuz": "HORMUZ", "Northern Gaza": "GAZA", "North Carolina": "N. CAROLINA", "Al Hudaydah": "HODEIDA" };
  return (m[raw] || raw).toUpperCase();
}
function srcOf(source) {
  const parts = source.split(";").map(s => s.trim());
  const key = (parts.find(p => !/wikipedia/i.test(p)) || parts[0]).replace(/^The /, "");
  const m = { "CBS News": "CBS", "BBC News": "BBC", "Moscow Times": "Moscow Times", "Kyiv Independent": "Kyiv Ind.", "Anadolu Agency": "Anadolu", "Democracy Now": "Dem. Now", "Daily Star": "Daily Star", "Colombia Reports": "Col. Reports", "SeismoWatch (USGS)": "USGS", "Wall Street Journal": "WSJ" };
  return m[key] || key;
}
const DEK = {
  4: "Five generals sanctioned; fuel bill pledged.",
  5: "Dozens hurt, five guards among them; no deaths.",
  6: "Four killed, including UNRWA worker Al-Helo.",
  7: "Houthis say Hodeida strikes killed 17.",
  8: "Ahmadi and four colleagues each got 74 lashes.",
  9: "Last case closed after nearly nine years.",
  10: "Americas host 2031; a UK bid takes 2035.",
  11: "FBI probes a second breach of the NCIC.",
  12: "Megaspeed barred from buying advanced chips.",
  13: "Hubbard beat Foxx; three races still uncalled."
};
const FIG = [
  ["+6.5%", "#15803d", "Nasdaq close", "Santa Clara, after Huang"],
  ["192", "#b91c1c", "Ukrainian drones downed", "Russia's overnight count"],
  ["3", "#c2410c", "tankers Iran says mined", "Strait of Hormuz"],
  ["74", "#7e22ce", "lashes given in Qom", "a singer and four men"],
  ["259", "#1d4ed8", "Democratic House seats", "North Carolina called"],
  ["647", "#9a3412", "Yemen strikes claimed", "anti-Houthi government"]
];
const ALSO = [
  [14, "CUCUTA", "Drone hits a police station; 3 hurt, 60 homes.", "Colombia Reports"],
  [15, "GOPALGANJ", "Four bombs; 30 hurt and 12 shops wrecked.", "Daily Star"],
  [16, "JHENAIDAH", "BNP factions fight; 15 hurt, 28 buildings.", "Daily Star"],
  [17, "BAHAWALPUR", "A stone truck overturns and kills seven.", "Xinhua"],
  [18, "VANUATU", "Magnitude 6.5 quake at 598 km; no damage.", "USGS"],
  [19, "DUSHANBE", "Tajikistan starts leaving the ICC.", "Reuters"],
  [20, "ERBIL", "Turkey says the PKK left 14 more bases.", "AFP"],
  [21, "BERLIN", "Bomb threats hit hundreds of schools.", "Reuters"],
  [22, "QUEBEC", "Legislators must again swear to the king.", "AFP"],
  [23, "ROME", "A hunger-striking student, 58, dies.", "Fanpage"],
  [24, "WASHINGTON", "Democrats schedule 12 primary debates.", "CBS"],
  [25, "DYMER", "Sunday's strike toll rises to 11.", "Moscow Times"],
  [26, "MIDDLETOWN", "Five tons of lead azide delayed to Wednesday.", "CBS"],
  [27, "LOS ANGELES", "Rep. Gomez to resign on 1 December.", "BBC"],
  [28, "WASHINGTON", "Nearly 6,000 ICE officers trained in 10 days.", "Dem. Now"],
  [29, "BRUSSELS", "NATO answers a nuclear-satellite report.", "BBC"],
  [30, "PARIS", "Pelicot will sue over nude promo photos.", "BBC"],
  [31, "WASHINGTON", "US suspects cyber hits on up to 50 ships.", "WSJ"],
  [32, "TATARSTAN", "A pump station reportedly burns; unverified.", "Kyiv Ind."],
  [33, "WASHINGTON", "Qatar's prime minister meets Marco Rubio.", "CBS"],
  [34, "WASHINGTON", "Treasury sanctions about two dozen banks.", "CBS"],
  [35, "ADEN", "The government claims 647 coalition strikes.", "CBS"],
  [36, "TEHRAN", "Courts claim $290 billion in US damages.", "CBS"],
  [37, "JERUSALEM", "Eisenkot sees no immediate strike on Iran.", "CBS"],
  [38, "TEHRAN", "Araghchi says a land blockade cannot work.", "CBS"],
  [39, "CANBERRA", "Australia accepts the ICJ Rohingya finding.", "BBC"]
];
const LEFT = [
  ["Sun 22", "COP31 closed in Antalya with no deal"],
  ["Sun 22", "Verstappen wins the Las Vegas Grand Prix"],
  ["Sun 22", "Alcaraz beats Zverev in the ATP Finals"],
  ["Sun 22", "Wembanyama scores 50 against New Orleans"],
  ["Sun 22", "Corvette Merkury sinks at Benghazi"],
  ["Sun 22", "About 12,000 evacuated at Co-op Live"],
  ["Sun 22", "Dymer strike itself (Monday is the toll: 11)"],
  ["Sun 22", "Melbourne Olympics 70th anniversary"],
  ["Sun 22", "Delta delays about 1,300 flights"],
  ["Sat 21", "Serang candy-factory fire kills 24"],
  ["Sat 21", "Cargo-ship fire in the Gulf of Finland"],
  ["Sat 21", "Guasave shootout: 4 soldiers and 16 gunmen"],
  ["Fri 20", "Arrest of Fausto Isidro Meza Flores"],
  ["Fri 20", "Bayelsa funeral boat capsizes; 24 killed"],
  ["Fri 20", "Peru quake, magnitude 6.7, kills one"],
  ["Fri 20", "US stocks enter a correction"],
  ["Fri 20", "Rikers plan unveiled; Chambers bailed"],
  ["Thu 19", "ICJ Rohingya judgment; Shenzhen summit"],
  ["Weekend", "Earlier Hormuz strikes; Gaza deaths Sat–Sun"],
  ["Sat 21", "ICE arrest of a father and daughter, Sea-Tac"]
];
function cardHtml(s, kind) {
  const col = REG[s.region][0];
  const art = kind === "lead" ? artLead(s.n) : artCard(s.n);
  const dek = kind === "lead" ? s.dek : DEK[s.n];
  return `<article class="${kind}" style="border-top-color:${col};border-left-color:${col}">
    <div class="ill">${art}<b class="ban">${esc(s.banner)}</b><i class="cred">${esc(srcOf(s.source))}</i></div>
    <div class="body"><div class="meta"><b class="num">${s.n}</b><b class="city" style="color:${col}">${esc(city(s.place))}</b><span class="field">${esc(s.field.toUpperCase())}</span><span class="st st-${s.status.toLowerCase()}">${s.status}</span></div>
    <h2 class="h">${esc(s.headline)}</h2><p class="dek">${esc(dek)}</p><p class="src">${esc(srcOf(s.source))}</p></div></article>`;
}
function regionBar() {
  const rows = [["Americas", 11], ["Europe", 9], ["Middle East", 11], ["Asia-Pacific", 5], ["Oceania", 2], ["World", 1], ["Africa", 0]];
  const w = { Americas: 249, Europe: 204, "Middle East": 249, "Asia-Pacific": 114, Oceania: 72, World: 58, Africa: 60 };
  return `<div class="rbar">${rows.map(([k, n]) => `<div class="rseg" style="width:${w[k]}px;background:${REG[k][0]}">${REG[k][1]} ${n}</div>`).join("")}</div>`;
}
async function boot() {
  const data = await (await fetch("/data/stories.json")).json();
  const leads = data.stories.filter(s => s.tier === "lead");
  const mains = data.stories.filter(s => s.tier === "main");
  const figs = FIG.map(([v, c, a, b]) => `<div class="fig"><b style="color:${c}">${v}</b><span>${a}</span><span>${b}</span></div>`).join("");
  const also = ALSO.map(([n, c, t, src]) => `<li><b>${n} ${c}</b> ${esc(t)} <i>${esc(src)}</i></li>`).join("");
  const ticks = data.timeline.map(t => `<div class="tick"><b>${t.utc}</b><span>${esc(t.text)}</span></div>`).join("");
  const left = LEFT.map(([d, e]) => `<li><b>${d}</b> ${esc(e)}</li>`).join("");
  document.getElementById("app").innerHTML = `
    <div class="krow"><div class="kicker">THE WORLD IN ONE DAY</div><div class="count">39 STORIES · 6 REGIONS · EVERY ONE DATED MONDAY 23 NOVEMBER 2026</div></div>
    <h1 class="date">${esc(data.date)}</h1>
    <p class="tag">${esc(data.tagline)}</p>
    <section class="figs">${figs}</section>
    ${regionBar()}
    <section class="leads">${leads.map(s => cardHtml(s, "lead")).join("")}</section>
    <section class="cards">${mains.map(s => cardHtml(s, "card")).join("")}</section>
    <section class="mid"><div class="mapwrap"><div class="lbl">WHERE IT HAPPENED</div><div id="mapbox"></div></div>
      <div class="also"><div class="lbl">ALSO ON MONDAY 23 NOVEMBER</div><ul class="alsolist">${also}</ul></div></section>
    <section class="utc"><div class="ulbl">THE DAY IN UTC</div><div class="rail">${ticks}</div></section>
    <section class="check"><p class="clbl">DATE CHECK · LEFT OUT · FIRST REPORTED SATURDAY 21 NOVEMBER OR EARLIER, AND SUNDAY 22</p>
      <p class="csub">Not drawn as Monday news. The Dymer strike was Sunday; Monday’s new fact, the toll rising to 11, is story 25. Africa: no Monday story confirmed.</p>
      <ul>${left}</ul></section>
    <footer class="foot"><p>REPORTED press account · CLAIM one side, not confirmed · OFFICIAL a state, court or body · RESULT a count that was decided</p>
      <p>Every story here happened, or was first reported, on Monday 23 November 2026. Disputed claims are attributed. Sources: CBS, BBC, Moscow Times, Kyiv Independent, Anadolu, Democracy Now, CNN, Daily Star, Xinhua, Colombia Reports, USGS, Reuters, AFP, WSJ. Original drawings.</p></footer>`;
  drawMap(data.stories, document.getElementById("mapbox"));
}
boot();
