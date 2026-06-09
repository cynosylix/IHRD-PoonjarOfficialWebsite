/**
 * Compare local site-data wordings vs cep.ac.in production pages.
 */
const fs = require("fs");
const path = require("path");

const BASE = "https://cep.ac.in";
const ROOT = path.join(__dirname, "..");

const PAGES = [
  ["/about/aboutUs", "aboutInstitution"],
  ["/about/principal", "principal"],
  ["/placement", "placement"],
  ["/iqac", "iqac"],
  ["/council", "council"],
  ["/admission", "admission"],
  ["/student", "students"],
  ["/programs", "programs"],
  ["/alumni", "alumni"],
  ["/pta", "pta"],
  ["/senate", "senate"],
  ["/ieee", "ieee"],
  ["/iedc", "iedc"],
  ["/nss", "nss"],
  ["/facilities/computer", "facility-computer"],
  ["/facilities/library", "facility-library"],
  ["/facilities/seminar", "facility-seminar"],
  ["/facilities/transport", "facility-transport"],
  ["/facilities/hostel", "facility-hostel"],
  ["/facilities/canteen", "facility-canteen"],
  ["/departments/cs", "dept-cse"],
  ["/departments/ca", "dept-ca"],
  ["/departments/ec", "dept-ece"],
  ["/departments/ee", "dept-eee"],
  ["/departments/am", "dept-ae"],
  ["/departments/sah", "dept-as"],
  ["/syllabus", "syllabus"],
];

function decode(s) {
  return s
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function strip(html) {
  return decode(html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " "));
}

function extractMain(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return m ? m[1] : html;
}

function paragraphs(html) {
  const main = extractMain(html);
  return [...main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => strip(m[1]))
    .filter((p) => p.length > 40 && !p.includes("Home About"));
}

function visionMission(html) {
  const text = strip(html);
  const vision = text.match(/Vision\s+(.+?)\s+Mission/i)?.[1]?.trim();
  const missionItems = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => strip(m[1]));
  return { vision, missionItems: missionItems.filter((i) => i.length > 20) };
}

async function fetchPage(path) {
  const res = await fetch(BASE + path);
  return await res.text();
}

(async () => {
  const out = {};
  for (const [p, key] of PAGES) {
    const html = await fetchPage(p);
    out[key] = {
      path: p,
      paragraphs: paragraphs(html),
      visionMission: visionMission(html),
    };
  }
  fs.writeFileSync(path.join(__dirname, ".cep-wordings-audit.json"), JSON.stringify(out, null, 2));
  console.log("Wrote audit with", Object.keys(out).length, "pages");
  for (const [k, v] of Object.entries(out)) {
    console.log(`\n--- ${k} (${v.path}) ---`);
    console.log("paragraphs:", v.paragraphs.length);
    if (v.paragraphs[0]) console.log("  first:", v.paragraphs[0].slice(0, 120) + "...");
    if (v.visionMission.vision) console.log("  vision:", v.visionMission.vision.slice(0, 100) + "...");
  }
})();
