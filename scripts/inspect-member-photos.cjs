const PAGES = [
  "/pta",
  "/iqac",
  "/placements",
  "/student",
];

(async () => {
  for (const path of PAGES) {
    const html = await (await fetch(`https://cep.ac.in${path}`)).text();
    const portraits = [...html.matchAll(/alt="([^"]+) portrait"/gi)].map((m) => m[1]);
    console.log(`\n=== ${path} (${portraits.length} portraits) ===`);
    console.log(portraits.slice(0, 12).join(" | "));
  }
})();
