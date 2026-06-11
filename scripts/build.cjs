/**
 * Production build — refuses to run while dev server is active (prevents .next corruption).
 */
const fs = require("fs");
const path = require("path");
const { spawnSync, execSync } = require("child_process");

const root = path.join(__dirname, "..");
const cacheDir = path.join(root, ".next");

function isPortInUse(port) {
  try {
    if (process.platform === "win32") {
      const out = execSync(`netstat -ano | findstr :${port}`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      });
      return out.split(/\r?\n/).some((line) => /LISTENING/i.test(line));
    }
    execSync(`lsof -i:${port}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

if (isPortInUse(3000) || isPortInUse(3001)) {
  console.error("\nBuild blocked: dev server is still running on port 3000 or 3001.");
  console.error("Stop it with Ctrl+C in the dev terminal, then run npm run build again.");
  console.error("(Running build while dev is active corrupts .next and causes Internal Server Error.)\n");
  process.exit(1);
}

try {
  fs.rmSync(cacheDir, { recursive: true, force: true });
} catch {
  // ignore
}

const res = spawnSync(process.platform === "win32" ? "npx.cmd" : "npx", ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(res.status ?? 1);
