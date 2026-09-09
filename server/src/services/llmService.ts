import {
  PhilosophicalAnalysisResult,
  NagarjunaDiagnosticResult,
  ComparativeDiagnosticResult
} from "../core/types.js";
import {
  PhilosophicalAnalysisResultSchema,
  NagarjunaDiagnosticResultSchema,
  ComparativeDiagnosticResultSchema
} from "../core/schema.js";
import { WITTGENSTEIN_SYSTEM_PROMPT, buildAnalysisUserPrompt } from "../philosophers/wittgenstein/prompts.js";
import { NAGARJUNA_SYSTEM_PROMPT, buildNagarjunaUserPrompt } from "../philosophers/nagarjuna/prompts.js";
import { COMPARATIVE_SYSTEM_PROMPT, buildComparativeUserPrompt } from "../philosophers/comparative/prompts.js";

export interface LLMConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
}

function resolveApiKey(config: LLMConfig): string {
  const apiKey =
    config.apiKey ||
    process.env.GROQ_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("No API key configured (neither Groq nor Gemini).");
  }
  return apiKey;
}

function isGroqKey(apiKey: string, config: LLMConfig): boolean {
  return apiKey.startsWith("gsk_") || Boolean(process.env.GROQ_API_KEY && !config.apiKey?.startsWith("AIza"));
}

// -----------------------------------------------------------------------------
// 1. Wittgenstein Analysis LLM Call
// -----------------------------------------------------------------------------
export async function callLLMAnalysis(
  input: string,
  config: LLMConfig
): Promise<PhilosophicalAnalysisResult> {
  const apiKey = resolveApiKey(config);
  const isGroq = isGroqKey(apiKey, config);
  const userPrompt = buildAnalysisUserPrompt(input);

  if (isGroq) {
    const raw = await callGroqChat(apiKey, config, WITTGENSTEIN_SYSTEM_PROMPT, userPrompt);
    return sanitizeAndValidate(raw, input, "groq_live", PhilosophicalAnalysisResultSchema);
  } else {
    const raw = await callGeminiChat(apiKey, config, WITTGENSTEIN_SYSTEM_PROMPT, userPrompt);
    return sanitizeAndValidate(raw, input, "gemini_live", PhilosophicalAnalysisResultSchema);
  }
}

// -----------------------------------------------------------------------------
// 2. Nāgārjuna Analysis LLM Call
// -----------------------------------------------------------------------------
export async function callNagarjunaAnalysis(
  input: string,
  config: LLMConfig,
  isKarika: boolean = false
): Promise<NagarjunaDiagnosticResult> {
  const apiKey = resolveApiKey(config);
  const isGroq = isGroqKey(apiKey, config);
  const userPrompt = buildNagarjunaUserPrompt(input, isKarika);

  if (isGroq) {
    const raw = await callGroqChat(apiKey, config, NAGARJUNA_SYSTEM_PROMPT, userPrompt);
    return sanitizeAndValidate(raw, input, "groq_live", NagarjunaDiagnosticResultSchema);
  } else {
    const raw = await callGeminiChat(apiKey, config, NAGARJUNA_SYSTEM_PROMPT, userPrompt);
    return sanitizeAndValidate(raw, input, "gemini_live", NagarjunaDiagnosticResultSchema);
  }
}

// -----------------------------------------------------------------------------
// 3. Comparative Analysis LLM Call (Wittgenstein × Nāgārjuna)
// -----------------------------------------------------------------------------
export async function callComparativeAnalysis(
  input: string,
  config: LLMConfig
): Promise<ComparativeDiagnosticResult> {
  const apiKey = resolveApiKey(config);
  const isGroq = isGroqKey(apiKey, config);
  const userPrompt = buildComparativeUserPrompt(input);

  if (isGroq) {
    const raw = await callGroqChat(apiKey, config, COMPARATIVE_SYSTEM_PROMPT, userPrompt);
    return sanitizeAndValidate(raw, input, "groq_live", ComparativeDiagnosticResultSchema);
  } else {
    const raw = await callGeminiChat(apiKey, config, COMPARATIVE_SYSTEM_PROMPT, userPrompt);
    return sanitizeAndValidate(raw, input, "gemini_live", ComparativeDiagnosticResultSchema);
  }
}

// -----------------------------------------------------------------------------
// Helper: Generic Groq API Chat
// -----------------------------------------------------------------------------
async function callGroqChat(
  apiKey: string,
  config: LLMConfig,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const model =
    config.model && config.model.includes("/")
      ? config.model
      : process.env.DEFAULT_GROQ_MODEL || "openai/gpt-oss-120b";

  const url = "https://api.groq.com/openai/v1/chat/completions";
  const requestBody = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" },
    temperature: config.temperature ?? 0.2
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as any;
  const rawText = data.choices?.[0]?.message?.content;
  if (!rawText) {
    throw new Error("Groq returned empty response content.");
  }
  return rawText;
}

// -----------------------------------------------------------------------------
// Helper: Generic Gemini API Chat
// -----------------------------------------------------------------------------
async function callGeminiChat(
  apiKey: string,
  config: LLMConfig,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const model = config.model || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: userPrompt }]
      }
    ],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      temperature: config.temperature ?? 0.2,
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as any;
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("Gemini returned empty response.");
  }
  return rawText;
}

// -----------------------------------------------------------------------------
// Helper: Sanitize JSON & Validate Zod
// -----------------------------------------------------------------------------
function sanitizeAndValidate<T>(
  rawText: string,
  input: string,
  engine: "groq_live" | "gemini_live",
  schema: any
): T {
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  const parsedJson = JSON.parse(cleaned);
  const validation = schema.safeParse(parsedJson);

  if (!validation.success) {
    console.warn("Zod validation notice on LLM output:", validation.error);
    return {
      ...parsedJson,
      id: parsedJson.id || `analysis-${Date.now()}`,
      input,
      timestamp: new Date().toISOString(),
      engineUsed: engine
    } as T;
  }

  return {
    ...validation.data,
    engineUsed: engine
  } as T;
}
