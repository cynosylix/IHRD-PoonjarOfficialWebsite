const BASE = "https://cep.ac.in";
const pages = [
  "/alumni", "/pta", "/senate", "/ieee", "/iedc", "/nss",
  "/departments/cs", "/departments/ca", "/departments/ec",
  "/placement", "/admission", "/programs", "/iqac", "/council", "/student",
  "/facilities/hostel", "/facilities/computer",
];

(async () => {
  for (const p of pages) {
    const h = await (await fetch(BASE + p)).text();
    const banner = h.match(/class="[^"]*banner[^"]*"[\s\S]{0,2000}/i)?.[0];
    const h1area = h.match(/<h1[^>]*>[\s\S]{0,3000}/i)?.[0] ?? "";
    const imgs = [];
    for (const chunk of [banner, h1area].filter(Boolean)) {
      for (const m of chunk.matchAll(/url=([^&\"]+)/g)) {
        imgs.push(decodeURIComponent(m[1]));
      }
    }
    const direct = [...h.matchAll(/\/images\/[a-zA-Z0-9_\-./]+/g)].map((m) => m[0]);
    console.log("\n" + p);
    console.log("  banner imgs:", [...new Set(imgs)].slice(0, 5));
    console.log("  /images/ refs:", [...new Set(direct)].filter((x) => !x.includes("logo")).slice(0, 8));
  }
})();
