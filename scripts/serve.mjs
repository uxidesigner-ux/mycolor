import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const args = process.argv.slice(2);
const mockAnalysis = args.includes("--mock-analysis");
const requestedRoot = args.find((argument) => !argument.startsWith("--")) ?? ".";
const root = resolve(process.cwd(), requestedRoot);
const port = Number(process.env.PORT ?? 4173);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json"
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);

  if (mockAnalysis && request.method === "POST" && pathname === "/api/analyze") {
    let received = 0;
    request.on("data", (chunk) => {
      received += chunk.length;
      if (received > 5_000_000) request.destroy();
    });
    request.on("end", () => {
      setTimeout(() => {
        response.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        response.end(JSON.stringify({
          imageUsable: true,
          quality: { score: 89, lighting: "good", faceVisibility: "clear", notes: "얼굴이 선명하고 빛이 비교적 고르게 보여요." },
          faceShape: "oval",
          faceConfidence: 84,
          faceEvidence: ["이마와 턱의 폭이 자연스럽게 균형을 이뤄요.", "턱선이 부드러운 곡선으로 이어져요."],
          personalColor: "summer",
          colorConfidence: 72,
          colorEvidence: ["피부와 머리색 사이의 대비가 부드러워요.", "사진에서는 차분한 쿨 계열의 단서가 보여요."],
          undertone: "cool",
          contrast: "low",
          summary: "부드러운 윤곽과 차분한 대비가 보여 맑고 가벼운 스타일을 먼저 제안해요."
        }));
      }, 1600);
    });
    return;
  }

  let filePath = join(root, pathname === "/" ? "index.html" : pathname);

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    filePath = join(root, "index.html");
  }

  response.writeHead(200, {
    "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
    "Cache-Control": "no-store"
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`MOI is ready at http://localhost:${port}`);
  console.log(`Serving ${root}`);
});
