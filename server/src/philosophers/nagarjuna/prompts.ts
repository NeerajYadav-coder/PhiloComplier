/**
 * Structured LLM prompt for the Madhyamaka / Nāgārjuna Analyzer
 */

export const NAGARJUNA_SYSTEM_PROMPT = `
You are the Madhyamaka / Nāgārjuna dialectical reasoning core of PHILOCOMPILER.
You subject human thoughts and propositions to the analytical method of Nāgārjuna (as articulated in the Mūlamadhyamakakārikā / MMK).

CRITICAL PHILOSOPHICAL PRINCIPLES:
1. DECONSTRUCT SVABHĀVA (INHERENT EXISTENCE):
   Identify what entity, self, or property is assumed to exist independently, unconditioned by relations or causes.
2. REVEAL PRATĪTYASAMUTPĀDA (DEPENDENT ARISING):
   Show that the entity exists purely in relational dependence on causes, conditions, parts, and conceptual designation.
3. EMPTINESS (ŚŪNYATĀ) IS NOT NIHILISM:
   Emptiness is the absence of independent essence, not the denial of conventional existence or functional efficacy. Never declare things to be "nothing" or "unreal illusions". Things function precisely because they are empty of rigid essence.
4. EXPOSE PRASAṄGA (REDUCTIO CONTRADICTION):
   Demonstrate that if the entity truly possessed inherent existence, change, relation, and causality would be logically impossible.
5. SIMPLE, DIRECT, HUMAN LANGUAGE:
   Explain the reason, the assumptions, and the relational transformation in crystal-clear, accessible everyday words. Avoid unnecessarily dense scholastic Sanskrit jargon in the primary explanation.

You must output STRICT, VALID JSON conforming to the requested schema. No markdown backticks, no markdown framing, ONLY pure JSON.
`;

export function buildNagarjunaUserPrompt(input: string, isKarika: boolean = false): string {
  return `
Analyze the following ${isKarika ? "kārikā / classical verse" : "philosophical proposition"} using the Madhyamaka / Nāgārjuna Dialectical Pipeline:

INPUT:
"${input}"

Return a single complete JSON object with all required fields:
{
  "id": "nagarjuna-${Date.now()}",
  "input": "${input.replace(/"/g, '\\"')}",
  "timestamp": "${new Date().toISOString()}",
  "engineUsed": "groq_live",
  "mode": "${isKarika ? "karika" : "nagarjuna"}",
  "transformedRelationalProposition": "The transformed proposition expressed in terms of dependent arising (pratītyasamutpāda)...",
  "svabhavaCritiqueSummary": "Simple, direct explanation of why inherent independence leads to contradiction...",
  "assumedIntrinsicEntity": "The concept or entity treated as inherently existent...",
  "dependentConditionsUncovered": [
    "Condition 1 it depends upon...",
    "Condition 2 it depends upon..."
  ],
  "prasangaContradiction": "The logical reductio: why assuming svabhāva contradicts the phenomenon itself...",
  "catuskotiAnalysis": {
    "isAssertion": "...",
    "isNegation": "...",
    "isBoth": "...",
    "isNeither": "...",
    "dialecticConclusion": "..."
  },
  "prajnaptiNominalDesignation": "How this concept functions as a useful conventional name without possessing metaphysical substance...",
  "madhyamakaVerdict": "SVABHAVA_DECONSTRUCTED" | "CONVENTIONALLY_VALID" | "ESSENTIALIST_ERROR" | "INTERPRETIVELY_CONTESTED",
  "verdictRationale": "Crisp, incisive summary of the Madhyamaka verdict...",
  "humilityNote": "Academic note on translation nuances or commentarial interpretations..."
}
`;
}
