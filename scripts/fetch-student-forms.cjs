const BASE = "https://cep.ac.in";

(async () => {
  const html = await (await fetch(BASE + "/student")).text();
  const start = html.indexOf("Application Forms");
  const end = html.indexOf("Faculty Feedback Forms", start);
  const chunk = html.slice(start, end > start ? end + 2000 : start + 8000);
  const rows = [];
  for (const tr of chunk.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...tr[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) =>
      c[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    );
    const hrefs = [...tr[1].matchAll(/href="([^"]+)"/gi)].map((m) => m[1]);
    if (cells.length >= 2 && cells[0] && !cells[0].includes("Feedback")) {
      rows.push({ title: cells[0], action: cells[1], href: hrefs[0] ?? null });
    }
  }
  console.log(JSON.stringify(rows, null, 2));
})();
