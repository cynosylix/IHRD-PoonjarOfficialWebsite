const fs = require("fs");
fetch("https://cep.ac.in/council")
  .then((r) => r.text())
  .then((h) => {
    fs.writeFileSync("scripts/tmp-council.html", h);
    const alts = [...h.matchAll(/alt="([^"]+) portrait"/gi)].map((m) => m[1]);
    console.log("portraits", alts);
    const members = [];
    for (const block of h.matchAll(
      /alt="([^"]+) portrait"[\s\S]*?<span class="text-dark[^"]*">([^<]*)<\/span><span class="block font-medium">([^<]*)<\/span>/gi,
    )) {
      members.push({ name: block[1].trim(), role: block[3].trim() });
    }
    console.log(JSON.stringify(members, null, 2));
  });
