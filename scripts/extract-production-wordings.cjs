/**
 * Deep extraction of production wordings from cep.ac.in
 */
const fs = require("fs");
const path = require("path");

const BASE = "https://cep.ac.in";

function decode(s) {
  return s
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(html) {
  return decode(html.replace(/<[^>]+>/g, " "));
}

function mainHtml(html) {
  return html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
}

function h1Text(html) {
  const main = mainHtml(html);
  const h1 = main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  return h1 ? stripTags(h1) : null;
}

function sectionAfterHeading(html, heading) {
  const main = mainHtml(html);
  const re = new RegExp(`${heading}[\\s\\S]*?(?=<h[12]|$)`, "i");
  const chunk = main.match(re)?.[0] ?? main;
  const ps = [...chunk.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => stripTags(m[1]));
  const lis = [...chunk.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => stripTags(m[1]));
  return { paragraphs: ps.filter((p) => p.length > 15), lists: lis.filter((l) => l.length > 10) };
}

async function get(path) {
  return await (await fetch(BASE + path)).text();
}

async function principalMessage(html) {
  const main = mainHtml(html);
  const idx = main.search(/As we gather|From The Principal/i);
  const chunk = idx >= 0 ? main.slice(idx) : main;
  const ps = [...chunk.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripTags(m[1]))
    .filter((p) => p.length > 80 && !p.includes("Home About") && !p.includes("Contact Details"));
  return ps;
}

async function admissionContent(html) {
  const main = mainHtml(html);
  const ps = [...main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => stripTags(m[1]));
  const h2s = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => stripTags(m[1]));
  const h3s = [...main.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) => stripTags(m[1]));
  return {
    headings: [...h2s, ...h3s].filter(Boolean),
    paragraphs: ps.filter((p) => p.length > 20 && !p.includes("Home About")),
  };
}

async function programBlocks(html) {
  const main = mainHtml(html);
  const blocks = [];
  for (const m of main.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/gi)) {
    const title = stripTags(m[1]);
    const body = m[2];
    const ps = [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((x) => stripTags(x[1]));
    const intake = body.match(/Intake[\s:]*(\d+)/i)?.[1];
    blocks.push({ title, intake, paragraphs: ps.filter((p) => p.length > 30) });
  }
  return blocks;
}

async function deptContent(html) {
  const main = mainHtml(html);
  const welcome = main.match(/Welcome to[\s\S]*?(?=<h2|<div class="[^"]*vision|$)/i)?.[0];
  const intro = welcome ? stripTags(welcome.replace(/<[^>]+>/g, " ")) : null;
  const vision = stripTags(main.match(/Vision[\s\S]*?(?=Mission|$)/i)?.[0] ?? "").replace(/^Vision\s*/i, "");
  const missionItems = [...main.matchAll(/Mission[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/i)]
    .flatMap((m) => [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((li) => stripTags(li[1])));
  const missionPara = stripTags(main.match(/Mission[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "");
  return { intro, vision, missionItems, missionPara };
}

(async () => {
  const out = {};

  const aboutHtml = await get("/about/aboutUs");
  out.about = {
    history: sectionAfterHeading(aboutHtml, "About The Institution").paragraphs,
    visionMission: sectionAfterHeading(aboutHtml, "Vision"),
  };
  const vm = stripTags(aboutHtml);
  const visionMatch = vm.match(/Vision\s+(.+?)\s+Mission/i);
  const missionMatch = [...aboutHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => stripTags(m[1]));
  out.about.vision = visionMatch?.[1];
  out.about.mission = missionMatch.filter((m) => m.length > 30).slice(0, 5);

  const principalHtml = await get("/about/principal");
  out.principal = {
    messages: await principalMessage(principalHtml),
    name: stripTags(principalHtml.match(/Dr\.\s*M\s*V\s*Rajesh/i)?.[0] ?? "Dr. M V Rajesh"),
  };

  out.admission = await admissionContent(await get("/admission"));
  out.programs = await programBlocks(await get("/programs"));

  for (const [slug, path] of [
    ["cse", "/departments/cs"],
    ["ca", "/departments/ca"],
    ["ece", "/departments/ec"],
    ["eee", "/departments/ee"],
    ["ae", "/departments/am"],
    ["as", "/departments/sah"],
  ]) {
    out[`dept_${slug}`] = await deptContent(await get(path));
  }

  out.placement = sectionAfterHeading(await get("/placement"), "About CGPU");
  out.iqac = sectionAfterHeading(await get("/iqac"), "About IQAC");
  out.council = sectionAfterHeading(await get("/council"), "Academic Council");

  for (const [key, p] of [
    ["alumni", "/alumni"],
    ["pta", "/pta"],
    ["senate", "/senate"],
    ["ieee", "/ieee"],
    ["iedc", "/iedc"],
    ["nss", "/nss"],
  ]) {
    const html = await get(p);
    const main = mainHtml(html);
    const ps = [...main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((m) => stripTags(m[1]))
      .filter((p) => p.length > 60 && !p.includes("Home About") && !p.includes("Office (Landline)"));
    out[key] = ps;
  }

  for (const [key, p] of [
    ["computer", "/facilities/computer"],
    ["library", "/facilities/library"],
    ["seminar", "/facilities/seminar"],
    ["transport", "/facilities/transport"],
    ["hostel", "/facilities/hostel"],
    ["canteen", "/facilities/canteen"],
  ]) {
    out[`facility_${key}`] = sectionAfterHeading(await get(p), "").paragraphs.filter(
      (x) => x.length > 40,
    );
  }

  const syllabusHtml = await get("/syllabus");
  out.syllabus = [...mainHtml(syllabusHtml).matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ href: m[1], label: stripTags(m[2]) }))
    .filter((x) => x.label.toLowerCase().includes("download") || x.label.length > 8);

  fs.writeFileSync(path.join(__dirname, ".cep-production-wordings.json"), JSON.stringify(out, null, 2));
  console.log("Extracted keys:", Object.keys(out).join(", "));
})();
