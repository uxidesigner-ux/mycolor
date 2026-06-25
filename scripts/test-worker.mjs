import worker from "../worker/src/index.js";

const originalFetch = globalThis.fetch;
let capturedRequest;
const limiterKeys = [];

globalThis.fetch = async (url, options) => {
  capturedRequest = { url, body: JSON.parse(options.body) };
  const analysis = {
    imageUsable: true,
    quality: { score: 88, lighting: "good", faceVisibility: "clear", notes: "자연광에서 얼굴이 선명하게 보여요." },
    faceShape: "uncertain",
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
    body: JSON.stringify({ image: "data:image/jpeg;base64,AAAA", clientId: "client_test_12345" })
  });
  const response = await worker.fetch(request, {
    OPENAI_API_KEY: "test-key",
    OPENAI_MODEL: "gpt-5.4-mini",
    ANALYSIS_RATE_LIMITER: {
      async limit({ key }) {
        limiterKeys.push(key);
        return { success: true };
      }
    }
  });
  const result = await response.json();

  if (response.status !== 200) throw new Error(`Unexpected worker status: ${response.status}`);
  if (result.faceShape !== "unknown" || result.personalColor !== "summer") throw new Error("Worker did not normalize structured analysis.");
  if (capturedRequest?.url !== "https://api.openai.com/v1/responses") throw new Error("Worker did not call the Responses API.");
  if (capturedRequest.body.model !== "gpt-5.4-mini") throw new Error("Worker did not use the configured model.");
  if (capturedRequest.body.store !== false) throw new Error("Worker must disable response storage.");
  if (capturedRequest.body.text?.format?.type !== "json_schema") throw new Error("Worker must request Structured Outputs.");
  const schemaSource = JSON.stringify(capturedRequest.body.text.format.schema);
  if (schemaSource.includes("minimum") || schemaSource.includes("maximum") || schemaSource.includes("maxItems")) {
    throw new Error("Worker schema must stay within the strict Structured Outputs subset.");
  }
  if (capturedRequest.body.input?.[0]?.content?.[1]?.type !== "input_image") throw new Error("Worker must send an image input.");
  if (!limiterKeys.includes("client:client_test_12345")) throw new Error("Worker must rate limit by stable client id when available.");

  const limitedRequest = new Request("https://moi-style-analysis.example/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": "https://uxidesigner-ux.github.io" },
    body: JSON.stringify({ image: "data:image/jpeg;base64,AAAA", clientId: "client_test_12345" })
  });
  const limitedResponse = await worker.fetch(limitedRequest, {
    OPENAI_API_KEY: "test-key",
    ANALYSIS_RATE_LIMITER: { async limit() { return { success: false }; } }
  });
  if (limitedResponse.status !== 429) throw new Error("Worker must reject rate-limited analysis requests.");

  globalThis.fetch = async () => new Response(JSON.stringify({
    error: {
      type: "insufficient_quota",
      code: "insufficient_quota",
      message: "You exceeded your current quota."
    }
  }), { status: 429, headers: { "Content-Type": "application/json" } });

  const quotaRequest = new Request("https://moi-style-analysis.example/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": "https://uxidesigner-ux.github.io" },
    body: JSON.stringify({ image: "data:image/jpeg;base64,AAAA", clientId: "client_test_12345" })
  });
  const quotaResponse = await worker.fetch(quotaRequest, { OPENAI_API_KEY: "test-key" });
  const quotaResult = await quotaResponse.json();
  if (quotaResponse.status !== 503 || !quotaResult.message.includes("OpenAI 사용량")) {
    throw new Error("Worker must explain OpenAI quota setup failures.");
  }

  console.log("Worker analysis contract verified.");
} finally {
  globalThis.fetch = originalFetch;
}
