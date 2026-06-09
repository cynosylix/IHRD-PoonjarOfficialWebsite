const BASE = "https://cep.ac.in";

(async () => {
  const html = await (await fetch(BASE + "/")).text();
  const links = [...new Set([...html.matchAll(/href="(\/[^"#?]+)"/g)].map((m) => m[1]))].sort();
  console.log("All internal links from homepage:");
  links.forEach((l) => console.log(l));
})();
