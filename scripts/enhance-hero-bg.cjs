/**
 * Sharpen + upscale hero JPEG for web (run after replacing source with a tiny export).
 * Usage: node scripts/enhance-hero-bg.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const input = path.join(root, "public", "images", "collageOutDoor-2.jpg");
const tmp = path.join(root, "public", "images", "collageOutDoor-2.jpg.tmp");

const MIN_WIDTH = 1600;

async function main() {
  if (!fs.existsSync(input)) {
    console.error("Missing:", input);
    process.exit(1);
  }

  const meta = await sharp(input).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  console.log("Source:", w, "×", h, meta.format);
  if (w < 800) {
    console.warn(
      "Warning: source is low-resolution for full-width heroes; upscale reduces blur but cannot recover true detail. Prefer a 1600px+ wide export if available.",
    );
  }

  let pipeline = sharp(input).rotate();

  if (w < MIN_WIDTH && w > 0 && h > 0) {
    const targetW = MIN_WIDTH;
    const targetH = Math.max(1, Math.round((h / w) * targetW));
    pipeline = pipeline.resize({
      width: targetW,
      height: targetH,
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    });
    console.log("Upscale to:", targetW, "×", targetH);
  }

  await pipeline
    .normalize()
    .modulate({ saturation: 1.06 })
    .sharpen({ sigma: 1.15, m1: 1, m2: 2, x1: 2, y2: 10, y3: 20 })
    .jpeg({ quality: 93, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(tmp);

  fs.renameSync(tmp, input);

  const outMeta = await sharp(input).metadata();
  console.log("Output:", outMeta.width, "×", outMeta.height);
  console.log("Updated:", input);
}

main().catch((err) => {
  console.error(err);
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  process.exit(1);
});
