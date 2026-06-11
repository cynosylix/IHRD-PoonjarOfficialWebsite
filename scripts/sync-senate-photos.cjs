/**
 * Download Senate member portraits from cep.ac.in
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images", "community", "senate");

function decodeNextImageSrc(src) {
  const normalized = src.replace(/&amp;/g, "&");
  const match = normalized.match(/url=([^&]+)/);
  if (!match) return null;
  return decodeURIComponent(match[1]);
}

async function download(url) {
  for (const u of [url, url.replace("api.cep.ac.in", "cep.ac.in")]) {
    const res = await fetch(u);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`Failed: ${url}`);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const html = await (await fetch("https://cep.ac.in/senate")).text();
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

  console.log(`Found ${portraits.length} senate portraits`);
  for (let i = 0; i < portraits.length; i++) {
    const { name, url } = portraits[i];
    const order = i + 1;
    const dest = path.join(outDir, `${order}.jpg`);
    const tmp = `${dest}.tmp`;
    const buf = await download(url);
    await sharp(buf)
      .rotate()
      .jpeg({ quality: 93, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(tmp);
    fs.renameSync(tmp, dest);
    console.log(`  ${order}. ${name}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
