/**
 * Mirror all production images into public/images, then verify nothing is missing.
 * Usage: npm run sync:images
 */
const { spawnSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");
const node = process.execPath;

function run(script) {
  console.log(`\n>>> node scripts/${script}`);
  const res = spawnSync(node, [path.join(__dirname, script)], { stdio: "inherit", cwd: root });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

run("download-cep-images.cjs");
run("sync-faculty-photos.cjs");
run("sync-senate-photos.cjs");
run("sync-documents.cjs");
run("regenerate-image-sizes.cjs");
run("verify-local-images.cjs");
run("verify-local-documents.cjs");

console.log("\nAll images and CEP documents synced and verified locally.");
