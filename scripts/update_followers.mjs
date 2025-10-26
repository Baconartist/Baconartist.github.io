import fs from "node:fs";
import path from "node:path";

const CSV_URL = process.env.SHEET_CSV_URL;
if (!CSV_URL) {
  console.error("Missing SHEET_CSV_URL env var.");
  process.exit(1);
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  lines.shift(); // drop header
  const data = {};
  for (const line of lines) {
    const [rawHandle, rawFollowers = ""] = line.split(",");
    if (!rawHandle) continue;
    const handle = rawHandle.trim().replace(/^@/, "");
    const num = Number(String(rawFollowers).replace(/[^0-9.]/g, ""));
    if (Number.isFinite(num)) data[handle] = num;
  }
  return data;
}

async function main() {
  const res = await fetch(CSV_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const csv = await res.text();
  const parsed = parseCSV(csv);

  const followers = {
    vmmatica: parsed.vmmatica ?? null,
    vpolariss: parsed.vpolariss ?? null,
    vjubzzs: parsed.vjubzzs ?? null,
  };

  const outPath = path.join(process.cwd(), "followers.json");
  const pretty = JSON.stringify(followers, null, 2) + "\n";

  let current = "";
  try { current = fs.readFileSync(outPath, "utf8"); } catch {}
  if (current === pretty) {
    console.log("followers.json unchanged. Nothing to commit.");
    return;
  }

  fs.writeFileSync(outPath, pretty, "utf8");
  console.log("followers.json updated:", followers);
}

main().catch((e) => {
  console.error("Update failed:", e);
  process.exit(1);
});
