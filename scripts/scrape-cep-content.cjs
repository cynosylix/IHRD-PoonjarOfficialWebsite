/**
 * Scrape text content hints from cep.ac.in pages (for content parity audit).
 */
const BASE = "https://cep.ac.in";

const PATHS = [
  ["/about/aboutUs", "About Institution"],
  ["/about/principal", "Principal"],
  ["/about/contact", "Contact"],
  ["/admission", "Admission"],
  ["/placement", "Placement"],
  ["/programs", "Programs"],
  ["/iqac", "IQAC"],
  ["/council", "Council"],
  ["/syllabus", "Syllabus"],
  ["/student", "Students"],
  ["/alumni", "Alumni"],
  ["/pta", "PTA"],
  ["/senate", "Senate"],
  ["/ieee", "IEEE"],
  ["/iedc", "IEDC"],
  ["/nss", "NSS"],
  ["/facilities/computer", "Facility Computer"],
  ["/facilities/library", "Facility Library"],
  ["/facilities/seminar", "Facility Seminar"],
  ["/facilities/transport", "Facility Transport"],
  ["/facilities/hostel", "Facility Hostel"],
  ["/facilities/canteen", "Facility Canteen"],
  ["/departments/cs", "Dept CSE"],
  ["/departments/ca", "Dept CA"],
  ["/departments/ec", "Dept ECE"],
  ["/departments/ee", "Dept EEE"],
  ["/departments/am", "Dept Auto"],
  ["/departments/sah", "Dept Applied Science"],
];

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  for (const [path, label] of PATHS) {
    const res = await fetch(BASE + path);
    const html = await res.text();
    const text = stripTags(html).slice(0, 600);
    console.log(`\n=== ${label} (${path}) ${res.status} ===`);
    console.log(text);
  }
}

main();
