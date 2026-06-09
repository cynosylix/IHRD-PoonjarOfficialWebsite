/**
 * Download all tab-related images from cep.ac.in into public/images.
 * Usage: npm run sync:images
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const {
  FACILITY_SOURCES,
  PAGE_SOURCES,
  COMMUNITY_SOURCES,
  DEPARTMENT_SOURCES,
  DEPARTMENT_BANNER_SOURCES,
  SLIDE_SOURCES,
} = require("./cep-image-map.cjs");

const root = path.join(__dirname, "..");
const imagesDir = path.join(root, "public", "images");
const facilitiesDir = path.join(imagesDir, "facilities");
const slidesDir = path.join(imagesDir, "slides");
const eventsDir = path.join(imagesDir, "events");
const pagesDir = path.join(imagesDir, "pages");
const communityDir = path.join(imagesDir, "community");
const departmentsDir = path.join(imagesDir, "departments");

const SITE_SOURCES = [
  { url: "https://cep.ac.in/images/college.jpg", out: "collageOutDoor-2", formats: ["jpg", "webp"] },
  { url: "https://cep.ac.in/images/logo.png", out: "logo", formats: ["webp"] },
  { url: "https://cep.ac.in/images/footer-logo.png", out: "footer-logo", formats: ["webp", "png"] },
];

const EVENT_SOURCES = [
  { url: "https://api.cep.ac.in/media/photos/events/placements_and_passouts_2k25.jpg", file: "placements-2k25", ext: "jpg" },
  { url: "https://api.cep.ac.in/media/photos/events/1.png", file: "eduai-school", ext: "png" },
  { url: "https://api.cep.ac.in/media/photos/events/2.png", file: "eduai-workshop", ext: "png" },
];

async function download(url) {
  const candidates = [url];
  if (url.includes("api.cep.ac.in")) candidates.push(url.replace("api.cep.ac.in", "cep.ac.in"));
  for (const u of candidates) {
    const res = await fetch(u);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`Failed: ${url}`);
}

async function saveFile(buf, destBase, ext) {
  const out = `${destBase}.${ext}`;
  const tmp = `${out}.tmp`;
  if (ext === "webp") {
    await sharp(buf).rotate().webp({ quality: 92, effort: 4 }).toFile(tmp);
  } else if (ext === "png") {
    await fs.promises.writeFile(tmp, buf);
  } else {
    await sharp(buf)
      .rotate()
      .jpeg({ quality: 93, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(tmp);
  }
  fs.renameSync(tmp, out);
  return out;
}

async function saveFacility(buf, destBase, url) {
  const ext = (url.split(".").pop() || "jpg").split("?")[0].toLowerCase();
  const normalized = ext === "jpeg" ? "jpg" : ext;
  await saveFile(buf, destBase, normalized);
  if (normalized === "jpg") await saveFile(buf, destBase, "webp");
  return normalized;
}

async function main() {
  for (const dir of [facilitiesDir, slidesDir, eventsDir, pagesDir, communityDir, departmentsDir]) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const manifest = { facilities: {}, pages: {}, community: {}, departments: {}, departmentBanners: {}, slides: [], events: {} };

  console.log("=== Facilities ===");
  for (const f of FACILITY_SOURCES) {
    const dest = path.join(facilitiesDir, f.file);
    let ext;
    if (f.local && fs.existsSync(f.local)) {
      const buf = fs.readFileSync(f.local);
      ext = "webp";
      await saveFile(buf, dest, ext);
    } else {
      const buf = await download(f.url);
      ext = await saveFacility(buf, dest, f.url);
    }
    const publicPath = `/images/facilities/${f.file}.${ext}`;
    manifest.facilities[f.slug] = publicPath;
    console.log(`${f.slug}: ${publicPath}`);
  }

  console.log("\n=== Page heroes ===");
  for (const p of PAGE_SOURCES) {
    const buf = await download(p.url);
    const ext = p.ext === "jpeg" ? "jpg" : p.ext;
    await saveFile(buf, path.join(pagesDir, p.file), ext);
    const publicPath = `/images/pages/${p.file}.${ext}`;
    manifest.pages[p.key] = publicPath;
    console.log(`${p.key}: ${publicPath}`);
  }

  console.log("\n=== Community ===");
  for (const c of COMMUNITY_SOURCES) {
    const buf = await download(c.url);
    const ext = c.url.endsWith(".png") ? "png" : "jpg";
    await saveFile(buf, path.join(communityDir, c.file), ext);
    const publicPath = `/images/community/${c.file}.${ext}`;
    manifest.community[c.kind] = publicPath;
    console.log(`${c.kind}: ${publicPath}`);
  }

  console.log("\n=== Departments (HOD portraits) ===");
  for (const d of DEPARTMENT_SOURCES) {
    const buf = await download(d.url);
    const ext = d.url.endsWith(".jpeg") ? "jpg" : d.url.split(".").pop().split("?")[0];
    const normalized = ext === "jpeg" ? "jpg" : ext;
    await saveFile(buf, path.join(departmentsDir, d.file), normalized);
    const publicPath = `/images/departments/${d.file}.${normalized}`;
    manifest.departments[d.slug] = publicPath;
    console.log(`${d.slug}: ${publicPath}`);
  }

  console.log("\n=== Department banners (lab/facility) ===");
  for (const d of DEPARTMENT_BANNER_SOURCES) {
    const buf = await download(d.url);
    const ext = d.url.endsWith(".jpeg") ? "jpg" : d.url.split(".").pop().split("?")[0];
    const normalized = ext === "jpeg" ? "jpg" : ext;
    await saveFile(buf, path.join(departmentsDir, d.file), normalized);
    const publicPath = `/images/departments/${d.file}.${normalized}`;
    manifest.departmentBanners[d.slug] = publicPath;
    console.log(`${d.slug} banner: ${publicPath}`);
  }

  console.log("\n=== Site branding / hero ===");
  for (const s of SITE_SOURCES) {
    const buf = await download(s.url);
    const dest = path.join(imagesDir, s.out);
    for (const fmt of s.formats) await saveFile(buf, dest, fmt);
  }

  console.log("\n=== Campus album slides ===");
  for (const s of SLIDE_SOURCES) {
    const buf = await download(s.url);
    await saveFile(buf, path.join(slidesDir, s.file), s.ext);
    manifest.slides.push(`/images/slides/${s.file}.${s.ext}`);
  }

  console.log("\n=== Event images ===");
  for (const e of EVENT_SOURCES) {
    const buf = await download(e.url);
    await saveFile(buf, path.join(eventsDir, e.file), e.ext);
    manifest.events[e.file] = `/images/events/${e.file}.${e.ext}`;
  }

  fs.writeFileSync(path.join(root, "scripts", ".cep-image-manifest.json"), JSON.stringify(manifest, null, 2));
  console.log("\nWrote manifest");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
