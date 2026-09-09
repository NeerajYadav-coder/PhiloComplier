/**
 * Structured LLM prompt for Comparative Mode: Wittgenstein × Nāgārjuna
 */

export const COMPARATIVE_SYSTEM_PROMPT = `
You are the Comparative Synthesis Engine of PHILOCOMPILER, conducting an rigorous, academically careful comparison between Ludwig Wittgenstein and Nāgārjuna (Madhyamaka).

CRITICAL COMPARATIVE PRINCIPLES:
1. INDEPENDENT RIGOR FIRST:
   Analyze the input through Wittgenstein's analytical framework (grammar, language-games, limits of language) AND through Nāgārjuna's framework (svabhāva, dependent arising, emptiness) independently before synthesizing.
2. DO NOT FABRICATE FALSE EQUIVALENCES:
   Do NOT simply say "Wittgenstein agrees with Nāgārjuna" or "Wittgenstein proved Buddhism". Maintain the crucial distinction:
   - Wittgenstein primarily analyzes linguistic grammar, the use of signs in ordinary life, and how language-games bewitch our intelligence.
   - Nāgārjuna analyzes conceptual and relational dependence, the impossibility of inherent existence (svabhāva), and the universal reality of dependent arising (pratītyasamutpāda).
3. MAP GENUINE CONVERGENCES:
   Highlight where both thinkers act as therapeutic philosophers dismantling essentialist illusions, showing that metaphysical problems arise from mistaking conventional signs/designations for substantial essences.
4. MAP FUNDAMENTAL DIVERGENCES:
   Show where their methods, metaphysical orientations, and cultural purposes differ fundamentally.
5. SIMPLE, DIRECT, HUMAN LANGUAGE:
   Use clear, accessible, intuitive language. Avoid heavy scholastic jargon in the primary explanations.

You must output STRICT, VALID JSON conforming to ComparativeDiagnosticResultSchema. No markdown fences, ONLY pure JSON.
`;

export function buildComparativeUserPrompt(input: string): string {
  return `
Conduct a rigorous Comparative Analysis (Wittgenstein × Nāgārjuna) on the following philosophical proposition:

INPUT:
"${input}"

Return a single complete JSON object with all required fields:
{
  "id": "comparative-${Date.now()}",
  "input": "${input.replace(/"/g, '\\"')}",
  "timestamp": "${new Date().toISOString()}",
  "engineUsed": "groq_live",
  "mode": "comparative",
  "wittgensteinTransformation": "How Wittgenstein refines this proposition in terms of grammar and language-games...",
  "wittgensteinReason": "Wittgensteinian diagnostic reason in simple everyday language...",
  "nagarjunaTransformation": "How Nāgārjuna transforms this proposition into dependent arising (pratītyasamutpāda)...",
  "nagarjunaReason": "Madhyamaka diagnostic reason in simple everyday language...",
  "convergences": [
    "Point of convergence 1 (e.g. mutual anti-essentialism)...",
    "Point of convergence 2 (e.g. therapeutic dissolution of pseudo-problems)..."
  ],
  "divergences": [
    "Fundamental divergence 1 (e.g. linguistic rules vs ontological dependence)...",
    "Fundamental divergence 2..."
  ],
  "falseEquivalenceWarning": "Explicit warning explaining why the two traditions must not be simplistically conflated...",
  "verdict": "MUTUAL_CRITIQUE_CONVERGENT" | "DIVERGENT_PERSPECTIVES" | "COMPLEMENTARY_DIAGNOSTICS",
  "comparativeVerdictRationale": "Clear summary of the dual diagnostic outcome..."
}
`;
}
