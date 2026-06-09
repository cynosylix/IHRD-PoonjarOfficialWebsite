const fs = require("fs");
const html = fs.readFileSync("scripts/tmp-senate.html", "utf8");
const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;

const members = [];
for (const block of main.matchAll(
  /alt="([^"]+) portrait"[\s\S]*?<span class="text-dark[^"]*">([^<]*)<\/span><span class="block font-medium">([^<]*)<\/span>/gi,
)) {
  members.push({ name: block[1].trim(), role: block[3].trim() });
}
console.log(JSON.stringify(members, null, 2));
