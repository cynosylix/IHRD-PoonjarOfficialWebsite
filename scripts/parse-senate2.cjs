const fs = require("fs");
const html = fs.readFileSync("scripts/tmp-senate.html", "utf8");
const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;

const parts = main.split(/alt="/);
const members = [];
for (const part of parts.slice(1)) {
  const nameMatch = part.match(/^([^"]+) portrait/);
  if (!nameMatch) continue;
  const name = nameMatch[1];
  const after = part.slice(nameMatch[0].length);
  const roles = [...after.matchAll(/<p[^>]*class="[^"]*text-sm[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim(),
  );
  const role = roles.find((r) => r && r.length < 80) ?? roles[0] ?? "Member";
  members.push({ name, role });
}
console.log(JSON.stringify(members, null, 2));
