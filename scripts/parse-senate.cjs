const fs = require("fs");
const html = fs.readFileSync("scripts/tmp-senate.html", "utf8");
const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;

const members = [];
for (const block of main.matchAll(
  /alt="([^"]+) portrait"[\s\S]{0,800}?<p[^>]*>([\s\S]*?)<\/p>/gi,
)) {
  const name = block[1];
  const role = block[2].replace(/<[^>]+>/g, "").trim();
  if (name && role) members.push({ name, role });
}

if (!members.length) {
  const names = [...main.matchAll(/alt="([^"]+) portrait"/gi)].map((m) => m[1]);
  console.log("names only:", names);
} else {
  console.log(JSON.stringify(members, null, 2));
}
