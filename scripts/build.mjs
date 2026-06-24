import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const files = ["index.html", "styles.css", "config.js", "app.js", "manifest.webmanifest", "icon.svg"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of files) {
  await cp(resolve(root, file), resolve(output, file));
}

const analysisEndpoint = process.env.MOI_ANALYSIS_ENDPOINT?.trim();
if (analysisEndpoint) {
  const productionConfig = `window.MOI_CONFIG = ${JSON.stringify({ analysisEndpoint, demoMode: false }, null, 2)};\n`;
  await writeFile(resolve(output, "config.js"), productionConfig, "utf8");
  console.log(`Configured photo analysis endpoint: ${analysisEndpoint}`);
}

console.log(`Built ${files.length} files into ${output}`);
