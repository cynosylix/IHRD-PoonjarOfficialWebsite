const BASE = "https://cep.ac.in";

function safeDecode(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function findImages(text) {
  const found = new Set();
  const blob = text + safeDecode(text);
  const patterns = [
    /https?:\/\/api\.cep\.ac\.in\/media\/[^\s"'<>\\)]+/g,
    /https?:\/\/cep\.ac\.in\/images\/[^\s"'<>\\)]+/g,
    /\/images\/[a-zA-Z0-9_.-]+\.(?:jpg|jpeg|png|webp)/gi,
    /%2Fimages%2F[^&"')]+/gi,
    /%2Fmedia%2Fphotos%2F[^&"')]+/gi,
  ];
  for (const p of patterns) {
    for (const m of blob.matchAll(p)) {
      let u = m[0].replace(/&amp;/g, "&");
      u = safeDecode(u);
      if (u.startsWith("/images/") || u.startsWith("/media/")) u = `${BASE}${u}`;
      if (u.startsWith("media/")) u = `https://api.cep.ac.in/${u}`;
      if (/\.(jpg|jpeg|png|webp)/i.test(u)) found.add(u.split("?")[0]);
    }
  }
  return [...found].filter((u) => !u.includes("logo") && !u.includes("footer-logo") && !u.includes("admission_poster"));
}

async function pageImages(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) return { path, status: res.status, images: [] };
  const html = await res.text();
  const scripts = [...html.matchAll(/src="(\/_next\/static\/[^"]+)"/g)].map((m) => m[1]);
  const images = findImages(html);
  for (const s of scripts.slice(0, 12)) {
    try {
      const js = await (await fetch(`${BASE}${s}`)).text();
      images.push(...findImages(js));
    } catch {
      // ignore
    }
  }
  return { path, status: res.status, images: [...new Set(images)] };
}

const PATHS = [
  "/",
  "/about/aboutUs",
  "/about/principal",
  "/about/contact",
  "/admission",
  "/placement",
  "/programs",
  "/iqac",
  "/council",
  "/syllabus",
  "/student",
  "/alumni",
  "/pta",
  "/senate",
  "/ieee",
  "/iedc",
  "/nss",
  "/departments/cs",
  "/departments/ca",
  "/departments/ec",
  "/departments/ee",
  "/departments/am",
  "/departments/sah",
  "/facilities/computer",
  "/facilities/library",
  "/facilities/seminar",
  "/facilities/transport",
  "/facilities/hostel",
  "/facilities/canteen",
];

(async () => {
  for (const p of PATHS) {
    const data = await pageImages(p);
    console.log(`\n=== ${p} (${data.status}) ===`);
    data.images.forEach((i) => console.log(" ", i));
  }
})();
