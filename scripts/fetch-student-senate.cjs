const BASE = "https://cep.ac.in";

async function studentForms() {
  const html = await (await fetch(BASE + "/student")).text();
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  const items = [];
  for (const m of main.matchAll(
    /<h[34][^>]*>([\s\S]*?)<\/h[34]>[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>[\s\S]*?Download/gi,
  )) {
    items.push({
      title: m[1].replace(/<[^>]+>/g, "").trim(),
      url: m[2],
    });
  }
  if (!items.length) {
    for (const m of main.matchAll(/>([^<]{5,80})<\/[^>]+>[\s\S]{0,200}?Download/gi)) {
      items.push({ title: m[1].trim(), url: "" });
    }
  }
  console.log("STUDENT FORMS:", JSON.stringify(items, null, 2));
}

async function senateMembers() {
  const html = await (await fetch(BASE + "/senate")).text();
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  const cards = [...main.matchAll(
    /<div[^>]*class="[^"]*(?:card|member|grid)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi,
  )];
  const pairs = [];
  for (const block of main.matchAll(/<p[^>]*class="[^"]*font[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)) {
    const t = block[1].replace(/<[^>]+>/g, "").trim();
    if (t && t.length < 60) pairs.push(t);
  }
  const alt = [...main.matchAll(/alt="([^"]+)"/gi)].map((m) => m[1]).filter((a) => !a.includes("logo") && !a.includes("icon"));
  console.log("SENATE blocks:", cards.length);
  console.log("SENATE text:", pairs.slice(0, 50));
  console.log("SENATE alt:", [...new Set(alt)].slice(0, 30));
  const rows = [...main.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((tr) =>
    [...tr[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) =>
      c[1].replace(/<[^>]+>/g, "").trim(),
    ),
  );
  console.log("SENATE table:", JSON.stringify(rows.filter((r) => r.length), null, 2));
}

(async () => {
  await studentForms();
  await senateMembers();
})();
