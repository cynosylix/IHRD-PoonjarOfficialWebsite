/**
 * Verify every /documents/ path referenced by the site exists under public/documents.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const docsDir = path.join(root, "public", "documents");

const SCAN_DIRS = [
  path.join(root, "data"),
];

const DOC_RE = /\/documents\/[a-zA-Z0-9_./-]+\.pdf/g;
const REMOTE_CEP_DOC_RE = /https?:\/\/(?:api\.)?cep\.ac\.in\/[^"'\s)]+\.pdf/gi;

function collectReferencedDocs() {
  const paths = new Set();
  const remote = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (/\.(tsx?|jsx?)$/.test(name)) {
        const text = fs.readFileSync(full, "utf8");
        for (const match of text.matchAll(DOC_RE)) paths.add(match[0]);
        for (const match of text.matchAll(REMOTE_CEP_DOC_RE)) {
          remote.push({ file: path.relative(root, full), url: match[0] });
        }
      }
    }
  }

  for (const dir of SCAN_DIRS) walk(dir);
  return { paths: [...paths].sort(), remote };
}

function main() {
  const { paths, remote } = collectReferencedDocs();
  const missing = paths.filter((webPath) => {
    const disk = path.join(root, "public", webPath.replace(/^\//, "").replace(/\//g, path.sep));
    return !fs.existsSync(disk);
  });

  console.log(`Referenced document paths: ${paths.length}`);

  if (missing.length > 0) {
    console.error("\nMissing local documents (run npm run sync:images):");
    for (const p of missing) console.error(`  ${p}`);
    process.exit(1);
  }

  if (remote.length > 0) {
    console.error("\nRemote cep.ac.in PDF URLs in data (use /documents/... instead):");
    for (const { file, url } of remote) console.error(`  ${file}: ${url}`);
    process.exit(1);
  }

  const localCount = fs.existsSync(docsDir)
    ? fs.readdirSync(docsDir).filter((f) => f.endsWith(".pdf")).length
    : 0;
  console.log(`Local PDF files: ${localCount}`);
  console.log("All referenced CEP documents are available locally.");
}

main();
