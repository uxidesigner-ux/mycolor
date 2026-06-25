const DEFAULT_ORIGINS = [
  "https://uxidesigner-ux.github.io",
  "http://localhost:4173",
  "http://127.0.0.1:4173"
];

const DEFAULT_MODEL = "gpt-5.4-mini";
const MAX_IMAGE_DATA_URL_LENGTH = 4_500_000;
const FALLBACK_RATE_LIMIT_KEY = "anonymous-photo-analysis";
const UNKNOWN_VALUES = new Set(["unknown", "uncertain"]);
const VALID_FACE_SHAPES = new Set(["oval", "round", "square", "long", "heart", "unknown"]);
const VALID_PERSONAL_COLORS = new Set(["spring", "summer", "autumn", "winter", "unknown"]);
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer"
};

const STYLE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    imageUsable: { type: "boolean" },
    quality: {
      type: "object",
      additionalProperties: false,
      properties: {
        score: { type: "integer" },
        lighting: { type: "string", enum: ["good", "uneven", "poor"] },
        faceVisibility: { type: "string", enum: ["clear", "partial", "not_found"] },
        notes: { type: "string" }
      },
      required: ["score", "lighting", "faceVisibility", "notes"]
    },
    faceShape: { type: "string", enum: ["oval", "round", "square", "long", "heart", "unknown"] },
    faceConfidence: { type: "integer" },
    faceEvidence: { type: "array", items: { type: "string" } },
    personalColor: { type: "string", enum: ["spring", "summer", "autumn", "winter", "unknown"] },
    colorConfidence: { type: "integer" },
    colorEvidence: { type: "array", items: { type: "string" } },
    undertone: { type: "string", enum: ["warm", "cool", "neutral", "uncertain"] },
    contrast: { type: "string", enum: ["low", "medium", "high", "uncertain"] },
    summary: { type: "string" }
  },
  required: [
    "imageUsable",
    "quality",
    "faceShape",
    "faceConfidence",
    "faceEvidence",
    "personalColor",
    "colorConfidence",
    "colorEvidence",
    "undertone",
    "contrast",
    "summary"
  ]
};

const ANALYSIS_INSTRUCTIONS = `
You are MOI, a careful personal styling assistant. Analyze only visible, styling-relevant cues in the supplied portrait.

Important boundaries:
- Never identify the person or infer race, ethnicity, nationality, health, disability, age, emotion, personality, attractiveness, gender identity, or any other sensitive trait.
- Do not score beauty or make negative judgments about appearance.
- Face shape is a tentative geometric styling category, not a biological fact.
- Personal color from one photo is only an estimate because lighting, makeup, camera white balance, and filters distort color.
- If the face is obscured, too small, strongly filtered, overexposed, underexposed, or lit with strong colored light, set imageUsable to false or use unknown with low confidence.
- Use oval, round, square, long, or heart only when visible evidence supports it.
- Use spring, summer, autumn, or winter only as a tentative styling palette suggestion.
- Use unknown when there is not enough evidence for face shape or personal color.
- Write evidence and summary in concise, warm Korean. Describe neutral visual observations, not judgments.
- Mention lighting uncertainty in the color evidence when relevant.
`;

function allowedOrigins(env) {
  const configured = String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return new Set(configured.length ? configured : DEFAULT_ORIGINS);
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...SECURITY_HEADERS,
      ...headers
    }
  });
}

function readOutputText(response) {
  if (typeof response.output_text === "string") return response.output_text;
  for (const item of response.output || []) {
    if (item.type !== "message") continue;
    for (const content of item.content || []) {
      if (content.type === "output_text" && typeof content.text === "string") return content.text;
    }
  }
  return "";
}

async function readOpenAIError(response) {
  const text = await response.text().catch(() => "");
  try {
    const parsed = JSON.parse(text);
    const error = parsed.error || {};
    return {
      type: typeof error.type === "string" ? error.type : "",
      param: typeof error.param === "string" ? error.param : "",
      code: typeof error.code === "string" ? error.code : "",
      message: typeof error.message === "string" ? error.message.slice(0, 240) : ""
    };
  } catch {
    return { type: "", param: "", code: "", message: text.slice(0, 240) };
  }
}

function isValidImageDataUrl(value) {
  return typeof value === "string" && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(value);
}

function isValidClientId(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]{12,64}$/.test(value);
}

function rateLimitKey(request, body) {
  if (isValidClientId(body.clientId)) return `client:${body.clientId}`;
  const fallback = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || FALLBACK_RATE_LIMIT_KEY;
  return `fallback:${fallback.slice(0, 96)}`;
}

async function enforceRateLimit(request, env, body, origin) {
  if (!env.ANALYSIS_RATE_LIMITER?.limit) return null;

  try {
    const { success } = await env.ANALYSIS_RATE_LIMITER.limit({ key: rateLimitKey(request, body) });
    if (success) return null;
    return json(
      { message: "사진 분석 요청이 잠시 많아요. 1분 뒤 다시 시도해 주세요." },
      429,
      { ...corsHeaders(origin), "Retry-After": "60" }
    );
  } catch (error) {
    console.error("Rate limit check failed", error instanceof Error ? error.message : "unknown-error");
    return null;
  }
}

function normalizeChoice(value, validValues) {
  if (validValues.has(value)) return value;
  if (UNKNOWN_VALUES.has(value)) return "unknown";
  return "unknown";
}

function clampScore(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(100, Math.round(number)));
}

function normalizeEvidence(value, fallback) {
  if (!Array.isArray(value)) return [fallback];
  return value
    .filter((item) => typeof item === "string" && item.trim())
    .slice(0, 3)
    .map((item) => item.trim().slice(0, 120));
}

function normalizeAnalysis(analysis) {
  return {
    ...analysis,
    quality: {
      score: clampScore(analysis?.quality?.score),
      lighting: ["good", "uneven", "poor"].includes(analysis?.quality?.lighting) ? analysis.quality.lighting : "poor",
      faceVisibility: ["clear", "partial", "not_found"].includes(analysis?.quality?.faceVisibility) ? analysis.quality.faceVisibility : "not_found",
      notes: typeof analysis?.quality?.notes === "string" ? analysis.quality.notes.slice(0, 160) : "사진 단서가 충분하지 않아요."
    },
    faceShape: normalizeChoice(analysis?.faceShape, VALID_FACE_SHAPES),
    faceConfidence: clampScore(analysis?.faceConfidence),
    faceEvidence: normalizeEvidence(analysis?.faceEvidence, "사진 속 얼굴 윤곽 단서를 충분히 찾지 못했어요."),
    personalColor: normalizeChoice(analysis?.personalColor, VALID_PERSONAL_COLORS),
    colorConfidence: clampScore(analysis?.colorConfidence),
    colorEvidence: normalizeEvidence(analysis?.colorEvidence, "사진의 조명과 색감 단서가 충분하지 않아요."),
    summary: typeof analysis?.summary === "string" ? analysis.summary.slice(0, 180) : "사진에서 확인 가능한 스타일 단서를 정리했어요."
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const originAllowed = allowedOrigins(env).has(origin);

    if (request.method === "OPTIONS") {
      return originAllowed
        ? new Response(null, { status: 204, headers: corsHeaders(origin) })
        : json({ message: "허용되지 않은 요청이에요." }, 403);
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/analyze") {
      return json({ message: "Not found" }, 404, originAllowed ? corsHeaders(origin) : {});
    }
    if (!originAllowed) return json({ message: "허용되지 않은 출처예요." }, 403);
    if (!env.OPENAI_API_KEY) return json({ message: "분석 서버 설정이 완료되지 않았어요." }, 503, corsHeaders(origin));

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ message: "사진 요청 형식이 올바르지 않아요." }, 400, corsHeaders(origin));
    }

    if (!isValidImageDataUrl(body.image)) {
      return json({ message: "지원하지 않는 사진 형식이에요." }, 400, corsHeaders(origin));
    }
    if (body.image.length > MAX_IMAGE_DATA_URL_LENGTH) {
      return json({ message: "사진이 너무 커요. 더 작은 사진으로 다시 시도해 주세요." }, 413, corsHeaders(origin));
    }

    const rateLimitResponse = await enforceRateLimit(request, env, body, origin);
    if (rateLimitResponse) return rateLimitResponse;

    const model = env.OPENAI_MODEL || DEFAULT_MODEL;
    let openAIResponse;
    try {
      openAIResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          store: false,
          instructions: ANALYSIS_INSTRUCTIONS,
          input: [{
            role: "user",
            content: [
              { type: "input_text", text: "이 사진에서 스타일 추천에 필요한 얼굴 윤곽과 색감 단서를 조심스럽게 분석해 주세요." },
              { type: "input_image", image_url: body.image, detail: "high" }
            ]
          }],
          text: {
            format: {
              type: "json_schema",
              name: "moi_style_analysis",
              strict: true,
              schema: STYLE_SCHEMA
            }
          }
        })
      });
    } catch (error) {
      console.error("OpenAI request failed", error instanceof Error ? error.message : "unknown-error");
      return json({ message: "분석 서버 연결이 잠시 불안정해요. 다시 시도해 주세요." }, 502, corsHeaders(origin));
    }

    if (!openAIResponse.ok) {
      const requestId = openAIResponse.headers.get("x-request-id");
      const openAIError = await readOpenAIError(openAIResponse);
      console.error("OpenAI analysis failed", openAIResponse.status, requestId || "no-request-id", openAIError);
      const retryAfter = openAIResponse.headers.get("retry-after");
      const status = openAIResponse.status === 429 ? 429 : 502;
      return json(
        { message: status === 429 ? "분석 요청이 잠시 많아요. 잠시 후 다시 시도해 주세요." : "사진 분석이 잠시 원활하지 않아요. 잠시 후 다시 시도해 주세요." },
        status,
        retryAfter ? { ...corsHeaders(origin), "Retry-After": retryAfter } : corsHeaders(origin)
      );
    }

    const openAIData = await openAIResponse.json();
    const outputText = readOutputText(openAIData);
    let analysis;
    try {
      analysis = JSON.parse(outputText);
    } catch {
      console.error("OpenAI returned an unreadable structured response", openAIData.id || "no-response-id");
      return json({ message: "분석 결과를 정리하지 못했어요. 다시 시도해 주세요." }, 502, corsHeaders(origin));
    }

    return json({
      ...normalizeAnalysis(analysis),
      meta: { model, analyzedAt: new Date().toISOString() }
    }, 200, corsHeaders(origin));
  }
};
