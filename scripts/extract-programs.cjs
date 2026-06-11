const BASE = "https://cep.ac.in";

function strip(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

(async () => {
  const html = await (await fetch(BASE + "/programs")).text();
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  const text = strip(main);
  console.log(text.slice(0, 3000));

  const html2 = await (await fetch(BASE + "/admission")).text();
  const main2 = html2.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html2;
  const h3s = [...main2.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) => strip(m[1]));
  console.log("\nADMISSION H3:", h3s);
})();
