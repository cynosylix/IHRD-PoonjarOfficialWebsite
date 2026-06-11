/**
 * Fetch department pages from cep.ac.in and emit faculty portrait names.
 */
const MAP = [
  ["computer-science-engineering", "cs"],
  ["computer-applications", "ca"],
  ["electronics-communication-engineering", "ec"],
  ["electrical-electronics-engineering", "ee"],
  ["automobile-engineering", "am"],
  ["applied-science", "sah"],
];

async function facultyNames(cep) {
  const html = await (await fetch(`https://cep.ac.in/departments/${cep}`)).text();
  return [...html.matchAll(/alt="([^"]+) portrait"/gi)].map((m) => m[1]);
}

(async () => {
  for (const [slug, cep] of MAP) {
    const names = await facultyNames(cep);
    console.log(slug, names.length, names.join(" | "));
  }
})();
