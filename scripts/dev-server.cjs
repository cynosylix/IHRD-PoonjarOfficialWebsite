/**
 * Start Next.js dev server with a clean .next cache.
 * Prevents Internal Server Error after `npm run build` while dev was running,
 * or from multiple dev instances corrupting the cache.
 */
const fs = require("fs");
const path = require("path");
const { spawn, execSync } = require("child_process");

const root = path.join(__dirname, "..");
const cacheDir = path.join(root, ".next");

function killPort(port) {
  try {
    if (process.platform === "win32") {
      const out = execSync(`netstat -ano | findstr :${port}`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      });
      const pids = new Set();
      for (const line of out.split(/\r?\n/)) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && /^\d+$/.test(pid) && pid !== "0") pids.add(pid);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        } catch {
          // ignore
        }
      }
    } else {
      execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null || true`, {
        shell: true,
        stdio: "ignore",
      });
    }
  } catch {
    // port not in use
  }
}

killPort(3000);
killPort(3001);

try {
  fs.rmSync(cacheDir, { recursive: true, force: true });
} catch {
  // ignore
}

const child = spawn("next", ["dev", "--turbopack"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
