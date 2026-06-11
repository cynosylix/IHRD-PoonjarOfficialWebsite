fetch("https://cep.ac.in/")
  .then((r) => r.text())
  .then((h) => {
    fs = require("fs");
    fs.writeFileSync("scripts/tmp-home.html", h);
    const blocks = h.split(/swiper-slide|carousel|slide/i).slice(0, 20);
    const pairs = [];
    for (const m of h.matchAll(
      /slides%2F([^&]+)[\s\S]{0,500}?(?:Placement|Hall Of|KALIKA|YUGA|Anti-Ragging|THRIKONAM|EXCELLENCE|Industry|EKTHARA|College Day|College Arts|College Sports|Graduation|Onam)/gi,
    )) {
      pairs.push(m[0].slice(0, 200));
    }
    console.log("pairs", pairs.length);

    const decoded = [...h.matchAll(/slides%2F([^&\"]+)/gi)].map((m) =>
      decodeURIComponent(m[1].replace(/%2F/g, "/")),
    );
    console.log("slide files in order:", decoded.filter((x) => x.includes(".")));

    const alts = [...h.matchAll(/alt=\"([^\"]+)\"/gi)].map((m) => m[1]);
    const relevant = alts.filter(
      (a) =>
        /placement|achievement|kalika|yuga|ragging|onam|excellence|industry|ekthara|arts|sports|graduation/i.test(
          a,
        ),
    );
    console.log("alts:", relevant);

    const text = h.replace(/<[^>]+>/g, "|").replace(/\|+/g, " ");
    const idx = text.indexOf("Placement");
    console.log(text.slice(Math.max(0, idx - 50), idx + 800));
  });
