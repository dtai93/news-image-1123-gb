import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync(new URL("../data/stories.json", import.meta.url)));
const words = (s) => String(s).trim().split(/\s+/).filter(Boolean);
const errors = [];
const tiers = {};
const regions = {};
const fields = {};
const keys = ["n", "tier", "status", "region", "field", "place", "lat", "lon", "headline", "dek", "source", "scene", "banner", "url"];
const statuses = new Set(["REPORTED", "CLAIM", "OFFICIAL", "RESULT"]);
const regionsOk = new Set(["Europe", "Americas", "Asia-Pacific", "Middle East", "Africa", "Oceania", "World"]);

if (data.date !== "Monday 23 November 2026") errors.push("date");
if (words(data.tagline).length < 3) errors.push("tagline");
if (!Array.isArray(data.figures) || data.figures.length !== 6) errors.push("figures length");
if (!Array.isArray(data.timeline) || data.timeline.length < 6 || data.timeline.length > 7) errors.push("timeline length");
if (!Array.isArray(data.stories) || data.stories.length < 36 || data.stories.length > 40) errors.push("story count " + (data.stories || []).length);
if (!Array.isArray(data.date_check) || data.date_check.length < 1) errors.push("date_check");
if (!Array.isArray(data.sources) || data.sources.length < 5) errors.push("sources");

for (const f of data.figures || []) {
  if (!f.value || !f.label || !Number.isInteger(f.story)) errors.push("figure keys");
}
for (const t of data.timeline || []) {
  if (!/^\d{2}:\d{2}$/.test(t.utc || "")) errors.push("utc " + t.utc);
  if (words(t.text).length > 5) errors.push("timeline words: " + t.text);
  if (!Number.isInteger(t.story)) errors.push("timeline story");
}

(data.stories || []).forEach((s, i) => {
  for (const k of keys) if (s[k] === undefined || s[k] === "") errors.push("missing " + k + " at " + i);
  if (s.n !== i + 1) errors.push("n sequence " + s.n);
  tiers[s.tier] = (tiers[s.tier] || 0) + 1;
  regions[s.region] = (regions[s.region] || 0) + 1;
  fields[s.field] = (fields[s.field] || 0) + 1;
  if (!["lead", "main", "also"].includes(s.tier)) errors.push("tier " + s.n);
  if (!statuses.has(s.status)) errors.push("status " + s.n);
  if (!regionsOk.has(s.region)) errors.push("region " + s.n);
  if (words(s.headline).length > 8) errors.push("headline " + s.n + " (" + words(s.headline).length + ") " + s.headline);
  if (words(s.dek).length > 22) errors.push("dek " + s.n + " (" + words(s.dek).length + ") " + s.dek);
  if (words(s.banner).length > 3) errors.push("banner " + s.n + " " + s.banner);
  if (typeof s.lat !== "number" || typeof s.lon !== "number") errors.push("coords " + s.n);
  if (!/^https?:\/\//.test(s.url)) errors.push("url " + s.n);
});

const ids = new Set((data.stories || []).map((s) => s.n));
for (const f of data.figures || []) if (!ids.has(f.story)) errors.push("figure story " + f.story);
for (const t of data.timeline || []) if (!ids.has(t.story)) errors.push("timeline story " + t.story);
if (tiers.lead !== 3) errors.push("leads " + tiers.lead);
if (tiers.main !== 10) errors.push("mains " + tiers.main);

console.log(JSON.stringify({ stories: data.stories.length, tiers, regions, fields, errors }, null, 2));
if (errors.length) process.exit(1);
console.log("ok");
