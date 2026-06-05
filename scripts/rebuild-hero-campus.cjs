/**
 * Rebuild hero campus photos from production college.jpg (sharper than old export).
 * Usage: node scripts/rebuild-hero-campus.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const imagesDir = path.join(root, "public", "images");
const SOURCE_URL = "https://cep.ac.in/images/college.jpg";
const tmpSource = path.join(imagesDir, ".college-source.jpg");

const OUTPUTS = [
  { file: "collageOutDoor-2.jpg", format: "jpeg", quality: 92 },
  { file: "collageOutDoor-2.webp", format: "webp", quality: 92 },
];

const TARGET_WIDTH = 1920;

async function downloadSource() {
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${SOURCE_URL}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(tmpSource, buf);
  const meta = await sharp(tmpSource).metadata();
  console.log("Source:", meta.width, "×", meta.height, `(${Math.round(buf.length / 1024)}KB)`);
}

async function writeOutputs() {
  for (const { file, format, quality } of OUTPUTS) {
    const out = path.join(imagesDir, file);
    const tmp = `${out}.tmp`;

    let pipeline = sharp(tmpSource)
      .rotate()
      .resize({
        width: TARGET_WIDTH,
        fit: "inside",
        withoutEnlargement: false,
        kernel: sharp.kernel.lanczos3,
      })
      .sharpen({ sigma: 0.6, m1: 0.5, m2: 0.5 });

    if (format === "jpeg") {
      await pipeline
        .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:4:4" })
        .toFile(tmp);
    } else {
      await pipeline.webp({ quality, effort: 4, smartSubsample: true }).toFile(tmp);
    }

    fs.renameSync(tmp, out);
    const meta = await sharp(out).metadata();
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`→ ${file}: ${meta.width}×${meta.height} (${kb}KB)`);
  }
}

async function main() {
  await downloadSource();
  await writeOutputs();
  fs.unlinkSync(tmpSource);
  console.log("Done. Run: node scripts/refresh-image-assets.cjs");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
