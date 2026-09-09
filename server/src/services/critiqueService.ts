import { ClaimCritiqueResult } from "../core/types.js";
import { ClaimCritiqueResultSchema } from "../core/schema.js";
import { LLMConfig } from "./llmService.js";

export const CRITIQUE_SYSTEM_PROMPT = `
You are the Philosophical Text & Claim Critic of PHILOCOMPILER ("You Should Correct").
Your purpose is to take any quote, philosophical argument, verse, or claim from previous thinkers (historical or modern: e.g. Nāgārjuna, René Descartes, Immanuel Kant, Spinoza, Plato, David Hume, etc.) and subject it to a strict logical-linguistic audit.

CRITICAL INSTRUCTIONS:
1. EVALUATE LOGICAL SOUNDNESS:
   Determine whether the claim holds logically, or whether it commits a logical fallacy, reification, category mistake, circularity, or illicit inference jump.
2. POINT OUT WHERE IS THE PROBLEM:
   Pinpoint the EXACT phrase, term, or premise where the argument breaks down. Do not speak in vague generalities. Show exactly where the thinker leapt from observation to unverified metaphysics or conflated grammar with reality.
3. EXPOSE SMUGGLED ASSUMPTIONS:
   Reveal what the thinker presupposed or smuggled in without justification.
4. PROVIDE THE CORRECTED PROPOSITION:
   Re-formulate the claim so that what is genuinely true or insightful in it is preserved, but the logical flaw or category error is completely removed.
5. SIMPLE, DIRECT, HUMAN LANGUAGE:
   Explain the diagnosis in plain everyday words without unnecessary academic jargon.

You must output STRICT, VALID JSON conforming to ClaimCritiqueResultSchema. No markdown fences, ONLY pure JSON.
`;

export function buildCritiqueUserPrompt(input: string, author?: string): string {
  return `
Analyze and critique the following philosophical claim/text:

CLAIM / WORK:
"${input}"
${author ? `ATTRIBUTED AUTHOR / TRADITION: ${author}` : ""}

Return a single complete JSON object with all required fields:
{
  "id": "critique-${Date.now()}",
  "input": "${input.replace(/"/g, '\\"')}",
  "authorOrTradition": "${author || "Historical or contemporary philosophical claim"}",
  "timestamp": "${new Date().toISOString()}",
  "engineUsed": "groq_live",
  "isLogicallyValid": false,
  "verdict": "LOGICALLY_FLAWED" | "VALID_UNDER_RESTRICTED_SCOPE" | "CATEGORY_ERROR" | "CIRCULAR_ARGUMENT" | "SOUND",
  "verdictSummary": "Crisp one-sentence summary of whether this claim is logically sound...",
  "whereIsTheProblem": {
    "problematicPhrase": "The exact phrase or step in the quote that fails...",
    "flawType": "Name of the logical error (e.g. Subject-Reification, False Dichotomy, Category Mistake, Illicit Inference Jump)...",
    "explanation": "Clear explanation of exactly why this step fails logically..."
  },
  "smuggledAssumptions": [
    "Smuggled assumption 1...",
    "Smuggled assumption 2..."
  ],
  "correctedProposition": "The corrected, logically sound formulation...",
  "correctionRationale": "Why this corrected version is logically sound...",
  "simpleExplanation": "Simple everyday language explanation of the error and the fix..."
}
`;
}

// Canonical critique benchmarks for offline or standard claims
export const CANONICAL_CRITIQUES: Record<string, ClaimCritiqueResult> = {
  "descartes-cogito": {
    id: "canonical-critique-descartes",
    input: "I think, therefore I am (an immaterial thinking substance).",
    authorOrTradition: "René Descartes (Meditations on First Philosophy)",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    isLogicallyValid: false,
    verdict: "CATEGORY_ERROR",
    verdictSummary: "Illicit leap from the occurrence of thinking to the existence of a permanent, substantial 'I'.",
    whereIsTheProblem: {
      problematicPhrase: "therefore I am [a substance]",
      flawType: "Illicit Subject Reification & Category Error",
      explanation: "Descartes observes the direct occurrence of doubt/thought, but grammatical subject-predicate structure tricks him into assuming every verb requires an enduring metaphysical subject. As Lichtenberg and Russell observed, the valid observation is merely 'There is thinking going on', not 'There is an immortal ego-entity doing it'."
    },
    smuggledAssumptions: [
      "Every action/process must belong to a permanent substantial entity.",
      "Grammatical structure ('I think') reflects metaphysical reality.",
      "Thinking cannot be a dynamic decentralized process."
    ],
    correctedProposition: "Thoughts and doubts occur in immediate awareness, without necessitating a permanent metaphysical soul-entity behind them.",
    correctionRationale: "Strips the unwarranted metaphysical leap while preserving the undeniable first-person reality of cognitive emergence.",
    simpleExplanation: "Descartes saw thinking happening, but jumped to the conclusion that an invisible 'soul person' was doing the thinking. Grammar tricked him into creating a thinker where there was only thought."
  },

  "nagarjuna-causation": {
    id: "canonical-critique-nagarjuna",
    input: "Neither from itself, nor from another, nor from both, nor without cause, does anything anywhere ever arise.",
    authorOrTradition: "Nāgārjuna (Mūlamadhyamakakārikā 1.1)",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    isLogicallyValid: true,
    verdict: "VALID_UNDER_RESTRICTED_SCOPE",
    verdictSummary: "Logically sound reductio against substantial causation, but invalid if taken as denying conventional causal regularity.",
    whereIsTheProblem: {
      problematicPhrase: "does anything anywhere ever arise",
      flawType: "Scope Ambiguity between Substantial vs Conventional Production",
      explanation: "Nāgārjuna's fourfold negation is airtight against theories of 'inherent' self-causation (Sāṃkhya) and other-causation (Nyāya). However, if generalized carelessly into everyday life, it sounds like an absurd denial that lighting a match produces fire. It is valid only as a critique of metaphysical svabhāva."
    },
    smuggledAssumptions: [
      "Assumes opponents define cause and effect as two self-standing substances.",
      "Relies on the classical Indian excluded middle of production."
    ],
    correctedProposition: "Things do not arise through the collision of self-standing metaphysical substances; events emerge as mutually conditioned relational sequences.",
    correctionRationale: "Clarifies that causality is a useful conventional description of regular relations, not a metaphysical mechanism between isolated objects.",
    simpleExplanation: "Nāgārjuna proves that causes aren't separate magical bricks hitting other bricks. But we must be clear: things still happen dependently in regular patterns."
  },

  "parmenides-nothing": {
    id: "canonical-critique-parmenides",
    input: "What is not cannot be thought or spoken of, for nothing can come from nothing.",
    authorOrTradition: "Parmenides (On Nature)",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    isLogicallyValid: false,
    verdict: "LOGICALLY_FLAWED",
    verdictSummary: "Reification of the word 'nothing' into a mysterious substantive entity.",
    whereIsTheProblem: {
      problematicPhrase: "What is not cannot be thought",
      flawType: "Reification of the Negative Operator",
      explanation: "Parmenides treats 'what is not' as if it were a strange kind of object that fails to be, rather than recognizing 'not' as a logical operator used to deny predicates. Saying 'There is no elephant in the room' does not require a ghostly thing called 'non-elephant' to exist."
    },
    smuggledAssumptions: [
      "Every meaningful word must name an existing object.",
      "Negation is an entity rather than a logical operator."
    ],
    correctedProposition: "Negative statements describe the absence of specific conditions; they do not refer to a metaphysical void or impossible object.",
    correctionRationale: "Restores negation to its proper logical role as a syntactic operator rather than an ontological obstacle.",
    simpleExplanation: "Parmenides thought 'nothing' was a thing that couldn't be talked about without turning it into 'something'. He confused a linguistic negation with a physical substance."
  }
};

export async function orchestrateClaimCritique(
  input: string,
  author?: string,
  config?: LLMConfig
): Promise<ClaimCritiqueResult> {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Claim to critique cannot be empty.");
  }

  // Check canonical benchmarks first
  const norm = trimmed.toLowerCase();
  if (norm.includes("think") && norm.includes("am")) {
    return CANONICAL_CRITIQUES["descartes-cogito"];
  }
  if (norm.includes("from itself") || norm.includes("another") || norm.includes("neither from")) {
    return CANONICAL_CRITIQUES["nagarjuna-causation"];
  }
  if (norm.includes("what is not") || norm.includes("nothing can come")) {
    return CANONICAL_CRITIQUES["parmenides-nothing"];
  }

  // Live LLM call
  const apiKey =
    config?.apiKey ||
    process.env.GROQ_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;

  if (apiKey) {
    try {
      const isGroq = apiKey.startsWith("gsk_") || Boolean(process.env.GROQ_API_KEY && !config?.apiKey?.startsWith("AIza"));
      const userPrompt = buildCritiqueUserPrompt(trimmed, author);

      if (isGroq) {
        const model = config?.model || process.env.DEFAULT_GROQ_MODEL || "openai/gpt-oss-120b";
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: CRITIQUE_SYSTEM_PROMPT },
              { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2
          })
        });

        if (res.ok) {
          const data = await res.json();
          const raw = data.choices?.[0]?.message?.content;
          if (raw) {
            return sanitizeAndValidateCritique(raw, trimmed, author, "groq_live");
          }
        }
      } else {
        const model = config?.model || "gemini-2.5-flash";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: CRITIQUE_SYSTEM_PROMPT }] },
            generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (raw) {
            return sanitizeAndValidateCritique(raw, trimmed, author, "gemini_live");
          }
        }
      }
    } catch (e) {
      console.warn("Live claim critique LLM error, falling back to heuristic:", e);
    }
  }

  // Fallback heuristic
  return generateHeuristicCritique(trimmed, author);
}

function sanitizeAndValidateCritique(
  rawText: string,
  input: string,
  author: string | undefined,
  engine: "groq_live" | "gemini_live"
): ClaimCritiqueResult {
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  const parsed = JSON.parse(cleaned);
  const validated = ClaimCritiqueResultSchema.safeParse(parsed);
  if (!validated.success) {
    console.warn("Zod notice on critique:", validated.error);
    return {
      ...parsed,
      id: parsed.id || `critique-${Date.now()}`,
      input,
      authorOrTradition: author || parsed.authorOrTradition,
      timestamp: new Date().toISOString(),
      engineUsed: engine
    };
  }

  return {
    ...validated.data,
    engineUsed: engine
  };
}

function generateHeuristicCritique(input: string, author?: string): ClaimCritiqueResult {
  return {
    id: `critique-heuristic-${Date.now()}`,
    input,
    authorOrTradition: author || "Historical / Philosophical claim",
    timestamp: new Date().toISOString(),
    engineUsed: "heuristic_fallback",
    isLogicallyValid: false,
    verdict: "LOGICALLY_FLAWED",
    verdictSummary: "Claim contains an unverified inference leap or treats a grammatical abstraction as an ontological entity.",
    whereIsTheProblem: {
      problematicPhrase: input.slice(0, 30) + "...",
      flawType: "Unwarranted Categorical Inference",
      explanation: "The proposition moves from a localized observation or linguistic convention to an unrestricted metaphysical conclusion without sufficient justification."
    },
    smuggledAssumptions: [
      "Assumes surface grammar maps directly to ontological structure.",
      "Presupposes categorical boundaries without providing falsification criteria."
    ],
    correctedProposition: `Under clarified logical boundaries, "${input}" reflects a contextual convention rather than an absolute metaphysical truth.`,
    correctionRationale: "Restricts the assertion to its defensible empirical or phenomenological domain.",
    simpleExplanation: "The claim takes a concept that makes sense in a limited situation and stretches it into a cosmic rule without proving the connection."
  };
}
