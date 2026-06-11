/**
 * Discover hero/content images from cep.ac.in for every main tab.
 */
const fs = require("fs");
const path = require("path");

const BASE = "https://cep.ac.in";

const ROUTES = [
  ["/", "home"],
  ["/about/aboutUs", "about-institution"],
  ["/about/principal", "principal"],
  ["/about/contact", "contact"],
  ["/admission", "admission"],
  ["/placement", "placement"],
  ["/programs", "programs"],
  ["/iqac", "iqac"],
  ["/council", "council"],
  ["/syllabus", "syllabus"],
  ["/student", "students"],
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
];

function extractImages(html) {
  const urls = new Set();
  for (const m of html.matchAll(/(?:src|srcSet|href)=["']([^"']+)["']/gi)) {
    let u = m[1];
    if (u.includes("_next/image?url=")) {
      const q = u.match(/url=([^&]+)/);
      if (q) u = decodeURIComponent(q[1]);
    }
    if (
      /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(u) ||
      u.includes("/media/photos/") ||
      u.includes("/images/")
    ) {
      if (!u.includes("logo") && !u.includes("footer-logo") && !u.includes("vission")) {
        urls.add(u.startsWith("http") ? u : u.startsWith("/") ? BASE + u : u);
      }
    }
  }
  return [...urls];
}

function mainHero(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  const imgs = extractImages(main);
  // prefer large content images
  return imgs.filter(
    (u) =>
      !u.includes("portrait") &&
      !u.includes("/hod/") &&
      !u.includes("photos/desk") &&
      !u.includes("photos/alumni/HER") === false,
  );
}

(async () => {
  const out = {};
  for (const [route, key] of ROUTES) {
    const res = await fetch(BASE + route);
    const html = await res.text();
    const all = extractImages(html);
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const mainImgs = extractImages(main);
    const hero = mainImgs.find(
      (u) =>
        u.includes("/images/") ||
        u.includes("/media/photos/slides/") ||
        u.includes("/media/photos/events/") ||
        u.includes("/media/photos/hod/"),
    );
    out[key] = {
      route,
      hero: hero ?? mainImgs[0] ?? all[0],
      mainImages: mainImgs.slice(0, 8),
      allImages: all.slice(0, 15),
    };
    console.log(`\n=== ${key} ===`);
    console.log("hero:", out[key].hero);
    console.log("main:", mainImgs.slice(0, 5).join("\n       "));
  }
  fs.writeFileSync(path.join(__dirname, ".cep-all-images.json"), JSON.stringify(out, null, 2));
})();
