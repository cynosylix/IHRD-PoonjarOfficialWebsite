/**
 * Download faculty portrait photos from cep.ac.in into public/images/faculty/{dept}/{order}.jpg
 * Run: node scripts/sync-faculty-photos.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const facultyDir = path.join(root, "public", "images", "faculty");
const jsonPath = path.join(__dirname, ".cep-faculty-photos.json");

const MAP = [
  ["computer-science-engineering", "cs"],
  ["computer-applications", "ca"],
  ["electronics-communication-engineering", "ec"],
  ["electrical-electronics-engineering", "ee"],
  ["automobile-engineering", "am"],
  ["applied-science", "sah"],
];

function decodeNextImageSrc(src) {
  const normalized = src.replace(/&amp;/g, "&");
  const match = normalized.match(/url=([^&]+)/);
  if (!match) return src.startsWith("http") ? src : null;
  return decodeURIComponent(match[1]);
}

async function extract(cep) {
  const html = await (await fetch(`https://cep.ac.in/departments/${cep}`)).text();
  const portraits = [];
  const re = /<img[^>]+src="([^"]+)"[^>]+alt="([^"]+) portrait"/gi;
  let m;
  while ((m = re.exec(html))) {
    portraits.push({ name: m[2].trim(), url: decodeNextImageSrc(m[1]) });
  }
  if (portraits.length === 0) {
    const re2 = /alt="([^"]+) portrait"[^>]*src="([^"]+)"/gi;
    while ((m = re2.exec(html))) {
      portraits.push({ name: m[1].trim(), url: decodeNextImageSrc(m[2]) });
    }
  }
  return portraits.filter((p) => p.url);
}

async function download(url) {
  const candidates = [url];
  if (url.includes("api.cep.ac.in")) candidates.push(url.replace("api.cep.ac.in", "cep.ac.in"));
  for (const u of candidates) {
    const res = await fetch(u);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`Failed: ${url}`);
}

async function main() {
  const manifest = {};

  for (const [slug] of MAP) {
    fs.mkdirSync(path.join(facultyDir, slug), { recursive: true });
  }

  for (const [slug, cep] of MAP) {
    const portraits = await extract(cep);
    manifest[slug] = [];
    console.log(`\n${slug} (${portraits.length} portraits)`);

    for (let i = 0; i < portraits.length; i++) {
      const { name, url } = portraits[i];
      const order = i + 1;
      const dest = path.join(facultyDir, slug, `${order}.jpg`);
      const tmp = `${dest}.tmp`;
      try {
        const buf = await download(url);
        await sharp(buf)
          .rotate()
          .jpeg({ quality: 93, mozjpeg: true, chromaSubsampling: "4:4:4" })
          .toFile(tmp);
        fs.renameSync(tmp, dest);
        const publicPath = `/images/faculty/${slug}/${order}.jpg`;
        manifest[slug].push({ order, name, src: publicPath });
        console.log(`  ${order}. ${name}`);
      } catch (e) {
        console.warn(`  SKIP ${name}: ${e.message}`);
      }
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(manifest, null, 2));
  console.log("\nFaculty photos synced.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
