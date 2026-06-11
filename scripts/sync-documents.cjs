/**
 * Mirror CEP-hosted PDFs into public/documents for offline/static hosting.
 * Usage: node scripts/sync-documents.cjs
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const docsDir = path.join(root, "public", "documents");

const SOURCES = [
  { url: "https://cep.ac.in/docs/fee.pdf", file: "fee.pdf" },
  { url: "https://cep.ac.in/docs/EOA_2025_2026.pdf", file: "EOA_2025_2026.pdf" },
  { url: "https://cep.ac.in/docs/EOA_2024_2025%20.pdf", file: "EOA_2024_2025.pdf" },
  { url: "https://cep.ac.in/docs/EOA_2000_2024.pdf", file: "EOA_2000_2024.pdf" },
  {
    url: "https://api.cep.ac.in/media/students_forms/CEP_common_application_form.pdf",
    file: "CEP_common_application_form.pdf",
  },
  {
    url: "https://api.cep.ac.in/media/students_forms/CEP_Student_No_Dues_Certificate.pdf",
    file: "CEP_Student_No_Dues_Certificate.pdf",
  },
  {
    url: "https://api.cep.ac.in/media/students_forms/CEP-Sem_Registration-all_courses.pdf",
    file: "CEP-Sem_Registration-all_courses.pdf",
  },
  {
    url: "https://api.cep.ac.in/media/students_forms/NO_DUES_CERTIFICATE_FOR_FACULTY_7_STAFF.pdf",
    file: "NO_DUES_CERTIFICATE_FOR_FACULTY_7_STAFF.pdf",
  },
  {
    url: "https://api.cep.ac.in/media/students_forms/CE_Poonjar_Student_Permission_Form_with_Parent_Consent.pdf",
    file: "CE_Poonjar_Student_Permission_Form_with_Parent_Consent.pdf",
  },
];

async function download(url) {
  const candidates = [url];
  if (url.includes("api.cep.ac.in")) candidates.push(url.replace("api.cep.ac.in", "cep.ac.in"));
  for (const u of candidates) {
    const res = await fetch(u);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`Failed: ${url}`);
}

async function main() {
  fs.mkdirSync(docsDir, { recursive: true });
  const manifest = {};

  for (const { url, file } of SOURCES) {
    const dest = path.join(docsDir, file);
    const buf = await download(url);
    fs.writeFileSync(dest, buf);
    manifest[file] = `/documents/${file}`;
    console.log(`${file} (${Math.round(buf.length / 1024)} KB)`);
  }

  fs.writeFileSync(
    path.join(__dirname, ".cep-document-manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  console.log("\nDocuments synced locally.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
