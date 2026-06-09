fetch("https://cep.ac.in/syllabus")
  .then((r) => r.text())
  .then((h) => {
    const main = h.match(/<main[^>]*>([\s\S]*?)<\/main>/i)[1];
    const items = [];
    for (const tr of main.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
      const cells = [...tr[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) =>
        c[1].replace(/<[^>]+>/g, "").trim(),
      );
      const href = [...tr[1].matchAll(/href="([^"]+)"/gi)].map((m) => m[1])[0];
      if (cells[0] && cells[0] !== "Course" && cells[1]) {
        items.push({ title: cells[0], href });
      }
    }
    console.log(JSON.stringify(items, null, 2));
  });
