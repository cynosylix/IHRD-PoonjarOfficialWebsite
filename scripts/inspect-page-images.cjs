const BASE = "https://cep.ac.in";
const routes = [
  "/placement",
  "/admission",
  "/student",
  "/facilities/hostel",
  "/alumni",
  "/about/aboutUs",
];

(async () => {
  for (const r of routes) {
    const h = await (await fetch(BASE + r)).text();
    const main = h.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? h;
    const imgs = [...main.matchAll(/<img[^>]+>/gi)].map((m) => m[0]);
    console.log("\n===", r, "img count", imgs.length, "===");
    for (const tag of imgs.slice(0, 12)) {
      const alt = tag.match(/alt="([^"]*)"/)?.[1];
      const src = tag.match(/src="([^"]*)"/)?.[1];
      if (src && !src.includes("logo")) console.log(" ", alt || "(no alt)", "->", src.slice(0, 120));
    }
  }
})();
