const fs = require("fs");
const h = fs.readFileSync("scripts/tmp-home.html", "utf8");

const slides = [];
for (const m of h.matchAll(
  /<img[^>]+alt="([^"]*)"[^>]+src="([^"]+)"|<img[^>]+src="([^"]+)"[^>]+alt="([^"]*)"/gi,
)) {
  const alt = m[1] || m[4];
  const src = m[2] || m[3];
  if (src && src.includes("slides") && alt && !alt.includes("logo")) {
    const file = decodeURIComponent(src.match(/slides%2F([^&]+)/i)?.[1] || src.split("/").pop());
    slides.push({ alt: alt.replace(/&#x27;/g, "'").replace(/&amp;/g, "&"), file });
  }
}

console.log(JSON.stringify(slides, null, 2));

// Also check next/image srcSet order in carousel
const carousel = h.match(/Placement 2025-26[\s\S]{0,15000}/i)?.[0] || "";
const imgTags = [...carousel.matchAll(/srcSet="([^"]+)"/gi)].map((m) => m[1]);
console.log("\nfirst carousel srcSets:", imgTags.slice(0, 9).map((s) => {
  const d = decodeURIComponent(s);
  const f = d.match(/slides%2F([^&]+)/i)?.[1] || d.match(/slides\/([^&?]+)/i)?.[1];
  return f;
}));
