import { ClaimCritiqueResult } from "../core/types.js";
import { ClaimCritiqueResultSchema } from "../core/schema.js";
import { LLMConfig } from "./llmService.js";

export const CRITIQUE_SYSTEM_PROMPT = `
You are the Philosophical Text & Claim Critic of PHILOCOMPILER ("You Should Correct").
Your purpose is to take any quote, philosophical argument, verse, or claim from previous thinkers (historical or modern: e.g. Nāgārjuna, René Descartes, Immanuel Kant, Spinoza, Plato, David Hume, etc.) and subject it to a strict logical audit.

CRITICAL INSTRUCTIONS:
1. EVALUATE LOGICAL SOUNDNESS:
   Determine whether the claim holds logically, or whether it makes a false leap, confuses everyday grammar with reality, assumes what it hasn't proven, or argues in circles.
2. POINT OUT WHERE IS THE PROBLEM:
   Pinpoint the EXACT phrase or step in the quote where the logic breaks down. Never speak in vague generalities. Show precisely where the thinker jumped from what is actually observed to an unproven assumption.
3. EXPOSE SMUGGLED ASSUMPTIONS:
   Reveal what the thinker took for granted without showing proof.
4. PROVIDE THE CORRECTED PROPOSITION:
   Re-formulate the quote so that whatever was genuinely true or insightful in it is kept, but the logical flaw is completely removed.
5. STRICT RULE ON LANGUAGE (SIMPLE & HUMAN):
   Explain everything in simple, conversational everyday English that ANY curious reader can easily understand.
   DO NOT use dense academic or scholastic jargon (never use phrases like "illicit subject reification", "ontological status", "epistemic closure").
   Describe flaws using clear common-sense words (e.g. "Inventing a thinker where there is only thought", "Treating an empty word like a physical object", "Stretching an everyday observation into a cosmic rule").

You must output STRICT, VALID JSON conforming to ClaimCritiqueResultSchema. No markdown fences, ONLY pure JSON.
`;

export function buildCritiqueUserPrompt(input: string, author?: string): string {
  return `
Analyze and critique the following philosophical claim/text:

CLAIM / WORK:
"${input}"
${author ? `ATTRIBUTED AUTHOR / TRADITION: ${author}` : ""}

Return a single complete JSON object with all required fields in simple, plain-English language:
{
  "id": "critique-${Date.now()}",
  "input": "${input.replace(/"/g, '\\"')}",
  "authorOrTradition": "${author || "Historical or contemporary philosophical claim"}",
  "timestamp": "${new Date().toISOString()}",
  "engineUsed": "groq_live",
  "isLogicallyValid": false,
  "verdict": "LOGICALLY_FLAWED" | "VALID_UNDER_RESTRICTED_SCOPE" | "CATEGORY_ERROR" | "CIRCULAR_ARGUMENT" | "SOUND",
  "verdictSummary": "Crisp one-sentence answer to whether this claim is logically sound...",
  "whereIsTheProblem": {
    "problematicPhrase": "The exact phrase or step in the quote that fails...",
    "flawType": "Plain-English name of the error (e.g. Inventing a Thinker Where There Is Only Thought, Treating 'Nothing' like a Real Object, False Leap from Observation to Cosmic Rule)...",
    "explanation": "Simple, crystal-clear explanation of exactly why this step fails logically..."
  },
  "smuggledAssumptions": [
    "Hidden assumption 1 taken for granted without proof...",
    "Hidden assumption 2..."
  ],
  "correctedProposition": "The corrected, logically sound formulation...",
  "correctionRationale": "Why this corrected version actually works...",
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
    verdictSummary: "Jumping from noticing that thoughts exist to claiming an invisible, permanent soul is doing the thinking.",
    whereIsTheProblem: {
      problematicPhrase: "therefore I am [a substance]",
      flawType: "Inventing a 'Thinker' Where There Is Only 'Thought'",
      explanation: "Descartes noticed thoughts and doubts happening in immediate awareness. But because language always puts 'I' in front of verbs ('I walk', 'I think'), he assumed there must be an invisible, permanent soul-entity behind the thinking. In direct reality, thinking simply occurs—our grammar tricked him into inventing an invisible thinker."
    },
    smuggledAssumptions: [
      "Assuming that wherever an action happens, a permanent owner or substance must be doing it.",
      "Assuming everyday grammar ('I think') reflects how consciousness actually works.",
      "Assuming thoughts cannot arise and pass on their own without a permanent soul."
    ],
    correctedProposition: "Thoughts and doubts occur in immediate awareness, without needing an invisible permanent soul behind them.",
    correctionRationale: "Preserves the real observation (thoughts are undeniably happening) while dropping the unproven claim that an invisible ghost-entity is doing the thinking.",
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
    verdictSummary: "Accurate when proving things are interconnected, but misleading if taken as saying everyday causes don't work.",
    whereIsTheProblem: {
      problematicPhrase: "does anything anywhere ever arise",
      flawType: "Confusing Cosmic Rules with Everyday Reality",
      explanation: "Nāgārjuna proves that things don't exist as isolated, standalone blocks that collide like magic bricks. Everything depends on everything else. But if you take this quote literally in daily life, it sounds like striking a match doesn't cause fire. In everyday life, cause and effect still work in dependable, regular patterns."
    },
    smuggledAssumptions: [
      "Assumes his opponents define causes and effects as two completely isolated, separate objects.",
      "Assumes that if things aren't permanently separate, they cannot produce each other."
    ],
    correctedProposition: "Things do not arise through the collision of isolated objects; events emerge through connected, dependent conditions.",
    correctionRationale: "Explains causality as a dependable web of conditions rather than a magical collision between isolated objects.",
    simpleExplanation: "Nāgārjuna proves that causes aren't separate magical bricks hitting other bricks. But we must be clear: things still happen dependently in regular, predictable patterns."
  },

  "parmenides-nothing": {
    id: "canonical-critique-parmenides",
    input: "What is not cannot be thought or spoken of, for nothing can come from nothing.",
    authorOrTradition: "Parmenides (On Nature)",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    isLogicallyValid: false,
    verdict: "LOGICALLY_FLAWED",
    verdictSummary: "Treating the simple word 'nothing' as if it were a mysterious physical object.",
    whereIsTheProblem: {
      problematicPhrase: "What is not cannot be thought",
      flawType: "Treating 'Nothing' Like a Real Object",
      explanation: "Parmenides treats 'nothing' like a spooky, invisible thing that you can't talk about without turning it into a real thing. But 'nothing' isn't an object—it's just a handy word we use to say something is missing (like 'there is no milk in the fridge'). He mistook a simple word of absence for a cosmic puzzle."
    },
    smuggledAssumptions: [
      "Assuming every meaningful word must name a physical object.",
      "Assuming the word 'not' refers to an actual empty substance."
    ],
    correctedProposition: "Saying 'nothing' simply describes the absence of specific things; it does not name a mysterious cosmic void.",
    correctionRationale: "Returns the word 'nothing' to its normal everyday job of describing absence, instead of inventing a spooky void.",
    simpleExplanation: "Parmenides thought 'nothing' was a thing that couldn't be talked about without turning it into 'something'. He confused a simple word of absence with an actual physical substance."
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
    verdictSummary: "The statement makes a big jump from a small observation to a sweeping universal rule.",
    whereIsTheProblem: {
      problematicPhrase: input.slice(0, 30) + "...",
      flawType: "Unproven Leap in Logic",
      explanation: "The sentence takes an idea that makes sense in a specific everyday setting and stretches it into a cosmic rule without showing evidence."
    },
    smuggledAssumptions: [
      "Assuming that everyday words describe ultimate cosmic facts.",
      "Assuming an idea that works locally must apply everywhere."
    ],
    correctedProposition: `In clear terms, "${input}" describes a specific situation rather than an absolute rule of the universe.`,
    correctionRationale: "Keeps the assertion grounded in what can actually be seen, tested, or demonstrated.",
    simpleExplanation: "The claim takes an idea that works in a limited situation and turns it into a cosmic law without proving the connection."
  };
}
