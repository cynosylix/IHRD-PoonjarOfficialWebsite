const fs = require("fs");

function safeDecode(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function findImages(text) {
  const found = new Set();
  const patterns = [
    /https?:\/\/api\.cep\.ac\.in\/media\/[^\s"'<>\\]+/g,
    /\/media\/photos\/[^\s"'<>\\]+/g,
    /\/images\/[^\s"'<>\\]+\.(?:jpg|jpeg|png|webp)/gi,
    /%2Fimages%2F[^&"']+/gi,
    /%2Fmedia%2F[^&"']+/gi,
  ];
  for (const p of patterns) {
    for (const m of text.matchAll(p)) {
      let u = m[0].replace(/&amp;/g, "&");
      u = safeDecode(u);
      if (u.startsWith("%2F") || u.startsWith("/media")) u = safeDecode(u.startsWith("%") ? u : encodeURI(u));
      if (u.startsWith("/")) u = `https://cep.ac.in${u}`;
      if (u.startsWith("media/")) u = `https://api.cep.ac.in/${u}`;
      found.add(u);
    }
  }
  return [...found];
}

async function fetchFacility(cep) {
  const res = await fetch(`https://cep.ac.in/facilities/${cep}`);
  const html = await res.text();
  const scripts = [...html.matchAll(/src="(\/_next\/static\/[^"]+)"/g)].map((m) => m[1]);
  const images = findImages(html);
  const chunks = [];
  for (const s of scripts) {
    const url = `https://cep.ac.in${s}`;
    const r = await fetch(url);
    const js = await r.text();
    chunks.push({ url, images: findImages(js) });
    images.push(...findImages(js));
  }
  return { cep, images: [...new Set(images)], scripts: chunks.map((c) => c.url) };
}

async function main() {
  const slugs = ["computer", "library", "seminar", "transport", "hostel", "canteen"];
  for (const cep of slugs) {
    const data = await fetchFacility(cep);
    console.log(`\n=== ${cep} ===`);
    data.images.forEach((i) => console.log(" ", i));
    if (!data.images.length) {
      console.log(" scripts:", data.scripts.slice(0, 5));
    }
  }

  const home = await fetch("https://cep.ac.in/");
  const homeHtml = await home.text();
  console.log("\n=== home ===");
  findImages(homeHtml).forEach((i) => console.log(" ", i));
}

main();
