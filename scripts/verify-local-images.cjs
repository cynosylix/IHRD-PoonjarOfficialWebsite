/**
 * Verify every /images/ path referenced by the site exists under public/images.
 * Run after sync:images — fails the build if production assets were not mirrored locally.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const publicImages = path.join(root, "public", "images");

const SCAN_DIRS = [
  path.join(root, "app"),
  path.join(root, "components"),
  path.join(root, "data"),
  path.join(root, "lib"),
];

const IMAGE_RE = /\/images\/[a-zA-Z0-9_./-]+\.(?:jpg|jpeg|png|webp|svg)/g;
const REMOTE_IMAGE_RE =
  /https?:\/\/(?:api\.)?cep\.ac\.in\/[^"'\s)]+\.(?:jpg|jpeg|png|webp|gif)/gi;

function collectReferencedPaths() {
  const paths = new Set();

  function scanFile(file) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(IMAGE_RE)) paths.add(match[0]);
  }

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (/\.(tsx?|jsx?)$/.test(name)) scanFile(full);
    }
  }

  for (const dir of SCAN_DIRS) walk(dir);

  // Faculty portraits (computed paths, not always literal in source)
  const deptSlugs = [
    "computer-science-engineering",
    "computer-applications",
    "electronics-communication-engineering",
    "electrical-electronics-engineering",
    "automobile-engineering",
    "applied-science",
  ];
  const facultyCounts = { "computer-science-engineering": 17, "computer-applications": 17, "electronics-communication-engineering": 10, "electrical-electronics-engineering": 9, "automobile-engineering": 6, "applied-science": 4 };
  for (const slug of deptSlugs) {
    for (let i = 1; i <= facultyCounts[slug]; i++) {
      paths.add(`/images/faculty/${slug}/${i}.jpg`);
    }
  }

  // Senate member portraits
  for (let i = 1; i <= 22; i++) paths.add(`/images/community/senate/${i}.jpg`);

  return [...paths].sort();
}

function collectRemoteImageRefs() {
  const hits = [];
  function scanFileRemote(file) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(REMOTE_IMAGE_RE)) {
      hits.push({ file: path.relative(root, file), url: match[0] });
    }
  }
  function walkRemote(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walkRemote(full);
      else if (/\.(tsx?|jsx?)$/.test(name)) scanFileRemote(full);
    }
  }
  for (const dir of SCAN_DIRS) walkRemote(dir);
  return hits;
}

function main() {
  const referenced = collectReferencedPaths();
  const remoteRefs = collectRemoteImageRefs();
  const missing = [];

  for (const webPath of referenced) {
    const disk = path.join(root, "public", webPath.replace(/^\//, "").replace(/\//g, path.sep));
    if (!fs.existsSync(disk)) missing.push(webPath);
  }

  const localCount = (function count(dir) {
    let n = 0;
    if (!fs.existsSync(dir)) return 0;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) n += count(full);
      else if (/\.(jpg|jpeg|png|webp|svg)$/i.test(name)) n++;
    }
    return n;
  })(publicImages);

  console.log(`Local image files: ${localCount}`);
  console.log(`Referenced paths checked: ${referenced.length}`);

  if (missing.length > 0) {
    console.error("\nMissing local images (run npm run sync:images):");
    for (const p of missing) console.error(`  ${p}`);
    process.exit(1);
  }

  if (remoteRefs.length > 0) {
    console.error("\nRemote cep.ac.in image URLs in app source (use /images/... instead):");
    for (const { file, url } of remoteRefs) console.error(`  ${file}: ${url}`);
    process.exit(1);
  }

  console.log("All referenced images are available locally.");
  console.log("No remote cep.ac.in image URLs in app source.");
}

main();
