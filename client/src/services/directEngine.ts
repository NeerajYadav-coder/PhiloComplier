import {
  PhilosophicalAnalysisResult,
  ClaimCritiqueResult,
  ToneVoices,
  StressTestAnalysis
} from "../types/index";
import { CANONICAL_PRESETS, CANONICAL_CRITIQUES } from "../data/canonicalPresets";

export interface DirectEngineConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
}

// -----------------------------------------------------------------------------
// 1. Prompts
// -----------------------------------------------------------------------------

export const WITTGENSTEIN_SYSTEM_PROMPT = `
You are the reasoning core of PHILOCOMPILER: A Computational Instrument for Philosophical-Linguistic Debugging.
You act as a rigorous philosophical diagnostic compiler for human thought, inspired by Ludwig Wittgenstein and analytical philosophy.

Your mission:
Subject the user's input to a structured philosophical debugging process.

CRITICAL RULES:
1. NEVER reduce analysis to binary TRUE / FALSE or simple LOGICAL / ILLOGICAL.
2. Identify linguistic object: empirical, phenomenological, metaphorical, poetic, normative, metaphysical, existential, performative, under-specified, ambiguous.
3. Distinguish Early Wittgenstein (picturing facts) from Later Wittgenstein (language-games, grammar bewitching intelligence).
4. INTUITION PRESERVATION: Preserve the core human intuition, diagnose the linguistic trap, and formulate clearer alternatives.
5. EPISTEMIC LADDER: Track: OBSERVATION -> DESCRIPTION -> INTERPRETATION -> INFERENCE -> METAPHYSICAL CLAIM.
6. HIDDEN ASSUMPTIONS: Expose both explicit and implicit presuppositions.
7. PHILOSOPHICAL TYPE ERROR ANALOGY: Use programming analogies (syntax, semantic types, scope domains) as metaphors.
8. IF THE INPUT IS A QUESTION: Debug the question first (what counts as an answer?).
9. IF THE INPUT IS A PROPOSITION: What state of affairs would falsify it?
10. RESPECT POETIC & METAPHORICAL LANGUAGE: Prevent metaphor from masquerading as metaphysics.
11. PHILOSOPHICAL LINTER CODES: W001, W002, W003, W004, W005, INFO.
12. STRICT RULE ON LANGUAGE (SIMPLE, DIRECT & HUMAN):
    Explain all reasons, assumptions, traps, and reformulations in direct, simple, conversational everyday English.
    NEVER use dense academic or scholastic jargon. Write for an intelligent friend seeking clear insight.
13. CRITICAL CHECK FOR ALREADY SOUND / LOGICAL PROPOSITIONS:
    If the user's input is ALREADY logically sound, empirically clear, or well-bounded according to Wittgensteinian logic (e.g. "The cup is on the table", "Water freezes at 0°C at sea level", "If it rains, the ground gets wet"):
    - Set "isAlreadySound": true.
    - Set "verdict": "CLEAR" or "EMPIRICALLY TESTABLE".
    - In "verdictRationale", state: "This statement is already logically sound, empirically testable, and free of grammatical illusions."
    - In "intuitionPreservation.apparentLinguisticProblem", state: "None: This statement is already clear, well-bounded, and free of grammatical illusions."
    - Keep the proposition identical in the primary reformulation.

Output STRICT, VALID JSON only. No markdown fences.
`;

export function buildAnalysisUserPrompt(input: string): string {
  return `
Analyze the following philosophical input using the Wittgensteinian Debugging Pipeline:

INPUT:
"${input}"

Return a single complete JSON object with all fields:
{
  "id": "analysis-${Date.now()}",
  "input": "${input.replace(/"/g, '\\"')}",
  "timestamp": "${new Date().toISOString()}",
  "engineUsed": "groq_live",
  "statementModes": [
    { "mode": "empirical", "explanation": "..." }
  ],
  "verdict": "CLEAR" | "AMBIGUOUS" | "UNDER-SPECIFIED" | "CATEGORYALLY PROBLEMATIC" | "PSEUDO-PROPOSITION SUSPECTED" | "FRAMEWORK-DEPENDENT" | "INTERPRETIVELY CONTESTED" | "METAPHORICAL" | "POETIC" | "NORMATIVE" | "EMPIRICALLY TESTABLE" | "UNRESOLVED",
  "verdictRationale": "...",
  "isAlreadySound": true,
  "termsInUse": [
    { "term": "...", "roleInSentence": "...", "isPhilosophicallyLoaded": false, "potentialGrammaticalIllusion": "None" }
  ],
  "grammaticalAnalysis": {
    "isGrammarMisleading": false,
    "summary": "...",
    "grammaticalVsLogicalForm": "...",
    "analogousMisleadingUse": "None"
  },
  "typeErrorAnalysis": {
    "hasTypeError": false,
    "conceptAnalogy": {
      "syntaxIssue": "None",
      "semanticTypeExpected": "...",
      "semanticTypeProvided": "...",
      "scopeDomain": "...",
      "operatorOrReferenceMismatch": "None",
      "explanation": "..."
    }
  },
  "questionDiagnostic": {
    "isQuestion": false,
    "requestedExplanationType": "CAUSAL",
    "spatialOrMetaphoricalShift": "",
    "whatWouldCountAsAnAnswer": "",
    "clarificationSubQuestions": [],
    "wellFormednessVerdict": "",
    "diagnosticAdvice": ""
  },
  "truthConditions": {
    "applicable": true,
    "whatWouldMakeItTrue": "...",
    "whatWouldMakeItFalse": "...",
    "falsificationCategory": "FALSIFIABLE",
    "falsificationAnalysis": "..."
  },
  "epistemicLadder": [
    { "level": "OBSERVATION", "content": "...", "isInferenceJump": false, "jumpAlert": "" }
  ],
  "hasInferenceJump": false,
  "hiddenAssumptions": [
    { "id": "HA-1", "assumption": "...", "isExplicit": false, "dependencyRationale": "...", "domainBoundaryWarning": "", "isIndependentlyJustified": "JUSTIFIED" }
  ],
  "wittgensteinDiagnostic": {
    "earlyWittgensteinPerspective": "...",
    "laterWittgensteinPerspective": "...",
    "primaryTension": "..."
  },
  "intuitionPreservation": {
    "originalThought": "${input.replace(/"/g, '\\"')}",
    "apparentLinguisticProblem": "None",
    "underlyingIntuition": "...",
    "preservedCore": "...",
    "lostOrDistortedElements": "None",
    "addedElements": "...",
    "qualitativeConfidence": "HIGH",
    "confidenceRationale": "..."
  },
  "reformulations": [
    {
      "id": "ref-emp",
      "mode": "empirical",
      "label": "Empirical / Relational",
      "proposition": "${input.replace(/"/g, '\\"')}",
      "nonEquivalenceNote": "",
      "whatIsPreserved": "...",
      "whatIsAlteredOrLost": "None"
    }
  ],
  "toneVoices": {
    "everyday": "Plain English phrasing...",
    "balanced": "Balanced proposition...",
    "airtight": "Shielded against edge cases..."
  },
  "stressTest": {
    "skepticObjection": "The #1 objection...",
    "shieldResponse": "The conversational shield...",
    "solidityRating": "ROCK_SOLID" | "NEEDS_BOUNDARY" | "SUBJECTIVE_EXPERIENCE",
    "solidityNote": "Why..."
  },
  "linterWarnings": [],
  "unresolvedQuestions": [],
  "humilityNote": "..."
}
`;
}

export const CRITIQUE_SYSTEM_PROMPT = `
You are the Philosophical Text & Claim Critic of PHILOCOMPILER ("You Should Correct").
Your purpose is to take any quote, philosophical argument, verse, or claim from previous thinkers (e.g. Nāgārjuna, René Descartes, Immanuel Kant, Spinoza, Plato, David Hume, St. Anselm, Zeno, etc.) and subject it to a strict logical audit.

CRITICAL INSTRUCTIONS:
1. EVALUATE LOGICAL SOUNDNESS: Determine whether the claim holds logically, makes a false leap, or confuses words with reality.
2. POINT OUT WHERE IS THE PROBLEM: Pinpoint the EXACT phrase or step in the quote where the logic breaks down.
3. PREMISE STEP-FLOW: Break into a 3-step logical progression (Step 1 -> Step 2 -> Conclusion) with status ("sound", "unproven_leap", "flawed").
4. EXPOSE SMUGGLED ASSUMPTIONS: Reveal what was taken for granted without proof.
5. PROVIDE THE CORRECTED PROPOSITION: Re-formulate so that genuine truth is kept, but the logical flaw is removed.
6. AUTHOR DEFENSE: Explain in 1-2 simple sentences how the author defended their claim.
7. STRICT RULE ON LANGUAGE: Simple, conversational, everyday English. NO academic jargon.

Output STRICT, VALID JSON only. No markdown fences.
`;

export function buildCritiqueUserPrompt(input: string, author?: string): string {
  return `
Analyze and critique the following philosophical claim/text:

CLAIM / WORK:
"${input}"
${author ? `ATTRIBUTED AUTHOR / TRADITION: ${author}` : ""}

Return a single complete JSON object:
{
  "id": "critique-${Date.now()}",
  "input": "${input.replace(/"/g, '\\"')}",
  "authorOrTradition": "${author || "Historical or contemporary philosophical claim"}",
  "timestamp": "${new Date().toISOString()}",
  "engineUsed": "groq_live",
  "isLogicallyValid": false,
  "verdict": "LOGICALLY_FLAWED" | "VALID_UNDER_RESTRICTED_SCOPE" | "CATEGORY_ERROR" | "CIRCULAR_ARGUMENT" | "SOUND",
  "verdictSummary": "Crisp one-sentence answer...",
  "whereIsTheProblem": {
    "problematicPhrase": "The exact phrase that fails...",
    "flawType": "Plain-English name of the error...",
    "explanation": "Simple explanation of why this step fails..."
  },
  "stepByStepFlow": [
    { "stepNumber": 1, "statement": "Premise 1...", "status": "sound", "note": "Plain explanation..." },
    { "stepNumber": 2, "statement": "Premise 2...", "status": "sound", "note": "Plain explanation..." },
    { "stepNumber": 3, "statement": "Conclusion...", "status": "unproven_leap", "note": "Where the leap occurs..." }
  ],
  "authorCounterDefense": "How the author defended their claim...",
  "smuggledAssumptions": ["Assumption 1...", "Assumption 2..."],
  "correctedProposition": "The corrected, logically sound formulation...",
  "correctionRationale": "Why this works...",
  "simpleExplanation": "Everyday language explanation...",
  "toneVoices": {
    "everyday": "Plain English conversation...",
    "balanced": "Clear grounded proposition...",
    "airtight": "Shielded against edge-case attacks..."
  },
  "stressTest": {
    "skepticObjection": "The #1 real-world objection...",
    "shieldResponse": "How to answer...",
    "solidityRating": "ROCK_SOLID" | "NEEDS_BOUNDARY" | "SUBJECTIVE_EXPERIENCE",
    "solidityNote": "Rationale..."
  }
}
`;
}

// -----------------------------------------------------------------------------
// 2. Direct API Callers (Browser to LLM Provider)
// -----------------------------------------------------------------------------

export async function callGroqDirect(
  apiKey: string,
  model: string = "llama-3.3-70b-versatile",
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const requestBody = {
    model: model || "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.2
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    let parsedMsg = errorText;
    try {
      const errObj = JSON.parse(errorText);
      parsedMsg = errObj.error?.message || errorText;
    } catch (_) {}
    throw new Error(`Groq API Error (${response.status}): ${parsedMsg}`);
  }

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content;
  if (!rawText) {
    throw new Error("Groq returned an empty response.");
  }
  return rawText;
}

export async function callGeminiDirect(
  apiKey: string,
  model: string = "gemini-2.5-flash",
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const selectedModel = model.includes("gemini") ? model : "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey.trim()}`;

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
      temperature: 0.2,
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
    let parsedMsg = errorText;
    try {
      const errObj = JSON.parse(errorText);
      parsedMsg = errObj.error?.message || errorText;
    } catch (_) {}
    throw new Error(`Gemini API Error (${response.status}): ${parsedMsg}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("Gemini returned an empty response.");
  }
  return rawText;
}

// Clean JSON text (strip markdown code blocks if present)
function sanitizeJsonString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

// -----------------------------------------------------------------------------
// 3. Post-Processors (Ensure Soundness & Tone Voices)
// -----------------------------------------------------------------------------

function ensureAnalysisSoundnessAndVoices(
  result: PhilosophicalAnalysisResult,
  originalInput: string
): PhilosophicalAnalysisResult {
  const isSound =
    result.isAlreadySound === true ||
    result.verdict === "CLEAR" ||
    result.verdict === "EMPIRICALLY TESTABLE" ||
    (result.intuitionPreservation?.apparentLinguisticProblem || "").toLowerCase().includes("none");

  if (isSound) {
    result.isAlreadySound = true;
    result.verdict = result.verdict === "CLEAR" ? "CLEAR" : "EMPIRICALLY TESTABLE";
    result.intuitionPreservation.apparentLinguisticProblem = "None: This statement is already clear, well-bounded, and free of grammatical illusions.";
    if (!result.toneVoices) {
      result.toneVoices = {
        everyday: originalInput,
        balanced: originalInput,
        airtight: originalInput
      };
    }
    if (!result.stressTest) {
      result.stressTest = {
        skepticObjection: "Does this statement rely on unstated standard environmental conditions?",
        shieldResponse: "The statement describes an observable physical fact or clear practical rule under normal everyday conditions.",
        solidityRating: "ROCK_SOLID",
        solidityNote: "The proposition is precise, grounded, and verified by everyday observation."
      };
    }
    return result;
  }

  const primaryRefined =
    result.reformulations?.[0]?.proposition ||
    result.intuitionPreservation?.preservedCore ||
    originalInput;

  if (!result.toneVoices) {
    result.toneVoices = {
      everyday: primaryRefined,
      balanced: primaryRefined,
      airtight: `Under specified observable conditions: ${primaryRefined}`
    };
  }

  if (!result.stressTest) {
    result.stressTest = {
      skepticObjection: "How do you know this holds true beyond immediate everyday observation?",
      shieldResponse: "This proposition only claims validity within observable everyday boundaries, avoiding speculative leaps.",
      solidityRating: "ROCK_SOLID",
      solidityNote: "Clear, grounded, and well-bounded against speculative overreach."
    };
  }

  return result;
}

function ensureCritiqueVoicesAndStressTest(
  result: ClaimCritiqueResult,
  originalInput: string
): ClaimCritiqueResult {
  const corrected = result.correctedProposition || originalInput;

  if (!result.toneVoices) {
    result.toneVoices = {
      everyday: corrected,
      balanced: corrected,
      airtight: `Under restricted empirical criteria: ${corrected}`
    };
  }

  if (!result.stressTest) {
    result.stressTest = {
      skepticObjection: "Does dropping the traditional claim overlook a deeper hidden truth?",
      shieldResponse: "Dropping the unproven leap actually protects whatever genuine insight was in the observation, without confusing words for reality.",
      solidityRating: "ROCK_SOLID",
      solidityNote: "Maintains clear boundaries between observable experience and unproven philosophical metaphysics."
    };
  }

  return result;
}

// -----------------------------------------------------------------------------
// 4. Public Direct Analysis Functions
// -----------------------------------------------------------------------------

export function findCanonicalPreset(input: string): PhilosophicalAnalysisResult | null {
  const trimmed = input.trim().toLowerCase();
  for (const key of Object.keys(CANONICAL_PRESETS)) {
    const preset = CANONICAL_PRESETS[key];
    if (
      preset.input.toLowerCase() === trimmed ||
      preset.title.toLowerCase() === trimmed ||
      trimmed.includes(preset.input.toLowerCase().slice(0, 20))
    ) {
      return {
        ...preset.analysis,
        timestamp: new Date().toISOString()
      };
    }
  }
  return null;
}

export function findCanonicalCritique(input: string, author?: string): ClaimCritiqueResult | null {
  const trimmed = input.trim().toLowerCase();
  const authorTrimmed = author?.trim().toLowerCase() || "";

  for (const key of Object.keys(CANONICAL_CRITIQUES)) {
    const preset = CANONICAL_CRITIQUES[key];
    const quoteMatches =
      preset.input.toLowerCase() === trimmed ||
      trimmed.includes(preset.input.toLowerCase().slice(0, 25)) ||
      preset.input.toLowerCase().includes(trimmed.slice(0, 25));

    const authorMatches =
      authorTrimmed &&
      (preset.authorOrTradition?.toLowerCase().includes(authorTrimmed) ||
        authorTrimmed.includes(preset.authorOrTradition?.toLowerCase().slice(0, 10) || ""));

    if (quoteMatches || (authorMatches && trimmed.length < 5)) {
      return {
        ...preset,
        timestamp: new Date().toISOString()
      };
    }
  }
  return null;
}

export async function directAnalyzeThought(
  input: string,
  apiKey: string,
  model?: string
): Promise<PhilosophicalAnalysisResult> {
  // Check preset first
  const preset = findCanonicalPreset(input);
  if (preset) {
    return preset;
  }

  if (!apiKey || !apiKey.trim()) {
    throw new Error("No API key provided. Please add your free Groq or Gemini API key in Settings.");
  }

  const cleanKey = apiKey.trim();
  const isGroq = cleanKey.startsWith("gsk_") || !cleanKey.startsWith("AIza");
  const userPrompt = buildAnalysisUserPrompt(input);

  let rawJson: string;
  if (isGroq) {
    rawJson = await callGroqDirect(cleanKey, model || "llama-3.3-70b-versatile", WITTGENSTEIN_SYSTEM_PROMPT, userPrompt);
  } else {
    rawJson = await callGeminiDirect(cleanKey, model || "gemini-2.5-flash", WITTGENSTEIN_SYSTEM_PROMPT, userPrompt);
  }

  const parsed = JSON.parse(sanitizeJsonString(rawJson)) as PhilosophicalAnalysisResult;
  parsed.engineUsed = isGroq ? "groq_live" : "gemini_live";
  return ensureAnalysisSoundnessAndVoices(parsed, input);
}

export async function directCritiqueClaim(
  input: string,
  author?: string,
  apiKey?: string,
  model?: string
): Promise<ClaimCritiqueResult> {
  // Check preset first
  const preset = findCanonicalCritique(input, author);
  if (preset) {
    return preset;
  }

  if (!apiKey || !apiKey.trim()) {
    throw new Error("No API key provided. Please add your free Groq or Gemini API key in Settings to critique custom claims.");
  }

  const cleanKey = apiKey.trim();
  const isGroq = cleanKey.startsWith("gsk_") || !cleanKey.startsWith("AIza");
  const userPrompt = buildCritiqueUserPrompt(input, author);

  let rawJson: string;
  if (isGroq) {
    rawJson = await callGroqDirect(cleanKey, model || "llama-3.3-70b-versatile", CRITIQUE_SYSTEM_PROMPT, userPrompt);
  } else {
    rawJson = await callGeminiDirect(cleanKey, model || "gemini-2.5-flash", CRITIQUE_SYSTEM_PROMPT, userPrompt);
  }

  const parsed = JSON.parse(sanitizeJsonString(rawJson)) as ClaimCritiqueResult;
  parsed.engineUsed = isGroq ? "groq_live" : "gemini_live";
  return ensureCritiqueVoicesAndStressTest(parsed, input);
}
