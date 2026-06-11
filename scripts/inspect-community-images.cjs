const PAGES = ["/pta", "/senate"];

(async () => {
  for (const path of PAGES) {
    const html = await (await fetch(`https://cep.ac.in${path}`)).text();
    console.log(`\n=== ${path} ===`);
    const portraits = [...html.matchAll(/alt="([^"]+) portrait"/gi)].map((m) => m[1]);
    console.log("portraits:", portraits.length, portraits.slice(0, 5).join(", "));
    const imgs = [...html.matchAll(/src="([^"]+)"/gi)]
      .map((m) => m[1].replace(/&amp;/g, "&"))
      .filter((s) => s.includes("photo") || s.includes("/images/") || s.includes("api.cep"));
    const unique = [...new Set(imgs)].slice(0, 15);
    for (const u of unique) console.log(" ", u);
  }
})();
