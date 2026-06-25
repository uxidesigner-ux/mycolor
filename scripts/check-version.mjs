import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const packageInfo = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const configSource = await readFile(resolve(root, "config.js"), "utf8");

const semverPattern = /^\d+\.\d+\.\d+$/;
const version = packageInfo.version;

if (!semverPattern.test(version)) {
  console.error(`package.json version must use x.x.x format. Found: ${version}`);
  process.exit(1);
}

const configMatch = configSource.match(/appVersion:\s*"([^"]+)"/);
if (!configMatch) {
  console.error("config.js must expose window.MOI_CONFIG.appVersion.");
  process.exit(1);
}

if (configMatch[1] !== version) {
  console.error(`Version mismatch: package.json=${version}, config.js=${configMatch[1]}`);
  process.exit(1);
}

console.log(`Version verified: ${version}`);
