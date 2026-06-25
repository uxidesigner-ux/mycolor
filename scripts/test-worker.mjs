import worker from "../worker/src/index.js";

const originalFetch = globalThis.fetch;
let capturedRequest;

globalThis.fetch = async (url, options) => {
  capturedRequest = { url, body: JSON.parse(options.body) };
  const analysis = {
    imageUsable: true,
    quality: { score: 88, lighting: "good", faceVisibility: "clear", notes: "자연광에서 얼굴이 선명하게 보여요." },
    faceShape: "oval",
    faceConfidence: 82,
    faceEvidence: ["이마와 턱의 폭이 균형을 이뤄요."],
    personalColor: "summer",
    colorConfidence: 71,
    colorEvidence: ["부드럽고 차분한 대비가 보여요."],
    undertone: "cool",
    contrast: "low",
    summary: "부드러운 곡선과 차분한 색의 조화가 잘 보여요."
  };
  return new Response(JSON.stringify({
    id: "resp_test",
    output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(analysis) }] }]
  }), { status: 200, headers: { "Content-Type": "application/json", "x-request-id": "req_test" } });
};

try {
  const forbiddenRequest = new Request("https://moi-style-analysis.example/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": "https://malicious.example" },
    body: JSON.stringify({ image: "data:image/jpeg;base64,AAAA" })
  });
  const forbiddenResponse = await worker.fetch(forbiddenRequest, { OPENAI_API_KEY: "test-key" });
  if (forbiddenResponse.status !== 403) throw new Error("Worker must reject unknown origins.");

  const request = new Request("https://moi-style-analysis.example/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": "https://uxidesigner-ux.github.io" },
    body: JSON.stringify({ image: "data:image/jpeg;base64,AAAA" })
  });
  const response = await worker.fetch(request, { OPENAI_API_KEY: "test-key", OPENAI_MODEL: "gpt-5.5" });
  const result = await response.json();

  if (response.status !== 200) throw new Error(`Unexpected worker status: ${response.status}`);
  if (result.faceShape !== "oval" || result.personalColor !== "summer") throw new Error("Worker did not return structured analysis.");
  if (capturedRequest?.url !== "https://api.openai.com/v1/responses") throw new Error("Worker did not call the Responses API.");
  if (capturedRequest.body.store !== false) throw new Error("Worker must disable response storage.");
  if (capturedRequest.body.text?.format?.type !== "json_schema") throw new Error("Worker must request Structured Outputs.");
  if (capturedRequest.body.input?.[0]?.content?.[1]?.type !== "input_image") throw new Error("Worker must send an image input.");

  console.log("Worker analysis contract verified.");
} finally {
  globalThis.fetch = originalFetch;
}
