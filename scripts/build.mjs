import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const files = ["index.html", "styles.css", "config.js", "app.js", "manifest.webmanifest", "icon.svg"];
const packageInfo = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of files) {
  await cp(resolve(root, file), resolve(output, file));
}

const analysisEndpoint = process.env.MOI_ANALYSIS_ENDPOINT?.trim();
const photoAnalysisEnabled = Boolean(analysisEndpoint) && process.env.MOI_PHOTO_ANALYSIS_ENABLED !== "false";

// Google OAuth Client ID is a public value. Source it from the env var if set,
// otherwise carry over the value committed in the source config.js so the build
// does not drop it.
const sourceConfig = await readFile(resolve(root, "config.js"), "utf8");
const sourceClientId = sourceConfig.match(/googleClientId:\s*"([^"]*)"/)?.[1] ?? "";
const googleClientId = process.env.MOI_GOOGLE_CLIENT_ID?.trim() || sourceClientId;

const productionConfig = `window.MOI_CONFIG = ${JSON.stringify({
  analysisEndpoint: analysisEndpoint ?? "",
  photoAnalysisEnabled,
  demoMode: false,
  appVersion: packageInfo.version,
  googleClientId
}, null, 2)};\n`;
await writeFile(resolve(output, "config.js"), productionConfig, "utf8");

if (analysisEndpoint) {
  console.log(`Configured photo analysis endpoint: ${analysisEndpoint}`);
}

console.log(`Photo analysis enabled: ${photoAnalysisEnabled ? "yes" : "no"}`);
console.log(`Configured app version: ${packageInfo.version}`);
console.log(`Built ${files.length} files into ${output}`);
