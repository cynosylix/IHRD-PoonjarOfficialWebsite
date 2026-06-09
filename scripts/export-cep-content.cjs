/**
 * Export main content blocks from cep.ac.in as JSON for site-data sync.
 */
const fs = require("fs");
const path = require("path");
const BASE = "https://cep.ac.in";

const PAGES = {
  aboutUs: "/about/aboutUs",
  principal: "/about/principal",
  placement: "/placement",
  iqac: "/iqac",
  council: "/council",
  alumni: "/alumni",
  pta: "/pta",
  senate: "/senate",
  ieee: "/ieee",
  iedc: "/iedc",
  nss: "/nss",
  computer: "/facilities/computer",
  library: "/facilities/library",
  seminar: "/facilities/seminar",
  transport: "/facilities/transport",
  hostel: "/facilities/hostel",
  canteen: "/facilities/canteen",
};

function decodeEntities(s) {
  return s
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractMain(html) {
  const m =
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
    html.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  return m ? m[1] : html;
}

function paragraphs(html) {
  const main = extractMain(html);
  const ps = [...main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) =>
    decodeEntities(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
  );
  return ps.filter(Boolean);
}

function lists(html) {
  const main = extractMain(html);
  const uls = [...main.matchAll(/<ul[^>]*>([\s\S]*?)<\/ul>/gi)].map((m) => {
    const items = [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((li) =>
      decodeEntities(li[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
    );
    return items.filter(Boolean);
  });
  return uls;
}

function tableRows(html) {
  const main = extractMain(html);
  const rows = [];
  for (const tr of main.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...tr[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) =>
      decodeEntities(c[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
    );
    if (cells.length) rows.push(cells);
  }
  return rows;
}

function toHtmlParagraphs(ps) {
  return ps.map((p) => `<p>${p.replace(/&/g, "&amp;")}</p>`).join("");
}

function toHtmlList(items) {
  return `<ul>${items.map((i) => `<li>${i.replace(/&/g, "&amp;")}</li>`).join("")}</ul>`;
}

async function fetchPage(path) {
  const res = await fetch(BASE + path);
  return await res.text();
}

(async () => {
  const out = {};
  for (const [key, p] of Object.entries(PAGES)) {
    const html = await fetchPage(p);
    out[key] = {
      paragraphs: paragraphs(html),
      lists: lists(html),
      tables: tableRows(html),
    };
  }
  const dest = path.join(__dirname, ".cep-content-export.json");
  fs.writeFileSync(dest, JSON.stringify(out, null, 2));
  console.log("Wrote", dest);
})();
