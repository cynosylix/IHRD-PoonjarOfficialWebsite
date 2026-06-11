/**
 * Extract faculty portrait URLs from cep.ac.in department pages.
 */
const MAP = [
  ["computer-science-engineering", "cs"],
  ["computer-applications", "ca"],
  ["electronics-communication-engineering", "ec"],
  ["electrical-electronics-engineering", "ee"],
  ["automobile-engineering", "am"],
  ["applied-science", "sah"],
];

async function extract(cep) {
  const html = await (await fetch(`https://cep.ac.in/departments/${cep}`)).text();
  const portraits = [];
  const re = /<img[^>]+src="([^"]+)"[^>]+alt="([^"]+) portrait"/gi;
  let m;
  while ((m = re.exec(html))) {
    portraits.push({ name: m[2].trim(), url: m[1] });
  }
  if (portraits.length === 0) {
    const re2 = /alt="([^"]+) portrait"[^>]*src="([^"]+)"/gi;
    while ((m = re2.exec(html))) {
      portraits.push({ name: m[1].trim(), url: m[2] });
    }
  }
  return portraits;
}

(async () => {
  const all = {};
  for (const [slug, cep] of MAP) {
    const portraits = await extract(cep);
    all[slug] = portraits;
    console.log(`\n${slug} (${portraits.length})`);
    for (const p of portraits) console.log(`  ${p.name} -> ${p.url}`);
  }
  require("fs").writeFileSync(
    require("path").join(__dirname, ".cep-faculty-photos.json"),
    JSON.stringify(all, null, 2),
  );
})();
