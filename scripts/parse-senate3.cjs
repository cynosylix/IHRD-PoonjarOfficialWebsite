const fs = require("fs");
const html = fs.readFileSync("scripts/tmp-senate.html", "utf8");
const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;

const cards = [...main.matchAll(
  /<div[^>]*class="[^"]*(?:rounded|shadow|border)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi,
)];
console.log("cards", cards.length);

const blocks = main.split(/(?=<img[^>]+alt="[^"]+ portrait")/);
const members = [];
for (const block of blocks.slice(1)) {
  const name = block.match(/alt="([^"]+) portrait"/)?.[1];
  const texts = [...block.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
    .filter((t) => t && t !== name && t.length < 100);
  const role = texts.find((t) => /chair|secretary|member|convener|president|officer/i.test(t)) ?? texts[0] ?? "Member";
  if (name) members.push({ name, role, texts });
}
console.log(JSON.stringify(members.slice(0, 5), null, 2));
console.log("total", members.length);
