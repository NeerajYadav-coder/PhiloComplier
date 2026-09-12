import {
  PhilosophicalAnalysisResult,
  NagarjunaDiagnosticResult,
  ComparativeDiagnosticResult,
  AnalysisMode
} from "../core/types.js";
import { getCanonicalPreset, CANONICAL_PRESETS } from "../core/canonicalData.js";
import {
  getCanonicalNagarjuna,
  getCanonicalComparative,
  CANONICAL_NAGARJUNA,
  CANONICAL_COMPARATIVE
} from "../core/canonicalNagarjuna.js";
import {
  callLLMAnalysis,
  callNagarjunaAnalysis,
  callComparativeAnalysis,
  LLMConfig
} from "./llmService.js";

export type AnyAnalysisResult =
  | PhilosophicalAnalysisResult
  | NagarjunaDiagnosticResult
  | ComparativeDiagnosticResult;

export interface AnalyzeRequestOptions {
  input: string;
  mode?: AnalysisMode;
  forceCanonical?: boolean;
  apiKey?: string;
  model?: string;
}

export async function orchestrateAnalysis(
  options: AnalyzeRequestOptions
): Promise<AnyAnalysisResult> {
  const { input, forceCanonical, apiKey, model } = options;
  const mode: AnalysisMode = options.mode || "wittgenstein";
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error("Input statement cannot be empty.");
  }

  const hasConfiguredKey = Boolean(
    apiKey ||
    process.env.GROQ_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY
  );

  // =========================================================================
  // 1. NĀGĀRJUNA & KĀRIKĀ MODES
  // =========================================================================
  if (mode === "nagarjuna" || mode === "karika") {
    const canonicalMatch = getCanonicalNagarjuna(trimmed);

    if (canonicalMatch && (forceCanonical || !hasConfiguredKey)) {
      return {
        ...canonicalMatch,
        id: `canonical-${Date.now()}`,
        input: trimmed,
        timestamp: new Date().toISOString(),
        engineUsed: "canonical_offline",
        mode: mode === "karika" ? "karika" : "nagarjuna"
      };
    }

    if (hasConfiguredKey && !forceCanonical) {
      try {
        const result = await callNagarjunaAnalysis(trimmed, { apiKey, model }, mode === "karika");
        return result;
      } catch (err: any) {
        console.warn("Live Nāgārjuna LLM analysis failed, falling back:", err.message);
        if (canonicalMatch) {
          return {
            ...canonicalMatch,
            id: `fallback-canonical-${Date.now()}`,
            input: trimmed,
            timestamp: new Date().toISOString(),
            engineUsed: "canonical_offline"
          };
        }
      }
    }

    if (canonicalMatch) {
      return {
        ...canonicalMatch,
        id: `preset-${Date.now()}`,
        input: trimmed,
        timestamp: new Date().toISOString(),
        engineUsed: "canonical_offline"
      };
    }

    return generateHeuristicNagarjuna(trimmed, mode === "karika");
  }

  // =========================================================================
  // 2. COMPARATIVE MODE (Wittgenstein × Nāgārjuna)
  // =========================================================================
  if (mode === "comparative") {
    const canonicalMatch = getCanonicalComparative(trimmed);

    if (canonicalMatch && (forceCanonical || !hasConfiguredKey)) {
      return {
        ...canonicalMatch,
        id: `canonical-${Date.now()}`,
        input: trimmed,
        timestamp: new Date().toISOString(),
        engineUsed: "canonical_offline"
      };
    }

    if (hasConfiguredKey && !forceCanonical) {
      try {
        const result = await callComparativeAnalysis(trimmed, { apiKey, model });
        return result;
      } catch (err: any) {
        console.warn("Live Comparative LLM analysis failed, falling back:", err.message);
        if (canonicalMatch) {
          return {
            ...canonicalMatch,
            id: `fallback-canonical-${Date.now()}`,
            input: trimmed,
            timestamp: new Date().toISOString(),
            engineUsed: "canonical_offline"
          };
        }
      }
    }

    if (canonicalMatch) {
      return {
        ...canonicalMatch,
        id: `preset-${Date.now()}`,
        input: trimmed,
        timestamp: new Date().toISOString(),
        engineUsed: "canonical_offline"
      };
    }

    return generateHeuristicComparative(trimmed);
  }

  // =========================================================================
  // 3. WITTGENSTEIN MODE (Default)
  // =========================================================================
  const canonicalMatch = getCanonicalPreset(trimmed);

  if (canonicalMatch && (forceCanonical || !hasConfiguredKey)) {
    return ensureToneVoicesAndStressTest({
      ...canonicalMatch.analysis,
      id: `canonical-${Date.now()}`,
      input: trimmed,
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline"
    });
  }

  if (hasConfiguredKey && !forceCanonical) {
    try {
      const result = await callLLMAnalysis(trimmed, { apiKey, model });
      return ensureToneVoicesAndStressTest(result);
    } catch (err: any) {
      console.warn("Live LLM analysis failed, falling back to heuristic engine:", err.message);
      if (canonicalMatch) {
        return ensureToneVoicesAndStressTest({
          ...canonicalMatch.analysis,
          id: `fallback-canonical-${Date.now()}`,
          input: trimmed,
          timestamp: new Date().toISOString(),
          engineUsed: "canonical_offline"
        });
      }
    }
  }

  if (canonicalMatch) {
    return ensureToneVoicesAndStressTest({
      ...canonicalMatch.analysis,
      id: `preset-${Date.now()}`,
      input: trimmed,
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline"
    });
  }

  return generateHeuristicAnalysis(trimmed);
}

function ensureToneVoicesAndStressTest(analysis: PhilosophicalAnalysisResult): PhilosophicalAnalysisResult {
  const primaryReformulation = analysis.reformulations[0]?.proposition || analysis.input;
  const empiricalReformulation = analysis.reformulations.find(r => r.mode === "empirical")?.proposition;

  const toneVoices = analysis.toneVoices || {
    everyday: analysis.intuitionPreservation?.underlyingIntuition
      ? `In plain terms: "${analysis.intuitionPreservation.underlyingIntuition}"`
      : primaryReformulation,
    balanced: primaryReformulation,
    airtight: empiricalReformulation || `${primaryReformulation} (bounded strictly by observable contexts).`
  };

  const stressTest = analysis.stressTest || {
    skepticObjection: `A skeptic would ask: "How do you know this isn't just an arbitrary preference or an oversimplified metaphor?"`,
    shieldResponse: `You can answer: "We are not asserting a cosmic dogma; we are simply separating our direct observation from grammatical traps."`,
    solidityRating: (analysis.verdict === "CLEAR" || analysis.verdict === "EMPIRICALLY TESTABLE") ? "ROCK_SOLID" : "NEEDS_BOUNDARY",
    solidityNote: analysis.verdictRationale || "Grounded when kept within its proper everyday language context."
  };

  return {
    ...analysis,
    toneVoices,
    stressTest
  };
}

function generateHeuristicAnalysis(input: string): PhilosophicalAnalysisResult {
  const isQuestion = input.endsWith("?");
  const words = input.split(/\s+/).filter(Boolean);

  return {
    id: `heuristic-${Date.now()}`,
    input,
    timestamp: new Date().toISOString(),
    engineUsed: "heuristic_fallback",
    statementModes: [
      {
        mode: isQuestion ? "under-specified" : "philosophical",
        explanation: isQuestion
          ? "Interrogative phrasing requiring decomposition of presuppositions before an answer can be evaluated."
          : "Assertoric claim requiring propositional analysis and domain verification."
      },
      {
        mode: "ordinary",
        explanation: "Formulated using natural language grammar whose surface structure may conceal logical commitments."
      }
    ],
    verdict: "UNDER-SPECIFIED",
    verdictRationale: "Under-specified prior to live LLM or manual decomposition. Requires examination of key terms and truth/falsity criteria.",
    termsInUse: words.slice(0, 4).map((word) => ({
      term: word.replace(/[^a-zA-Z]/g, ""),
      roleInSentence: "Constituent term in proposition.",
      isPhilosophicallyLoaded: ["self", "time", "cause", "nothing", "nature", "mind", "consciousness", "exists", "truth", "reality", "why", "meaning"].includes(word.toLowerCase()),
      potentialGrammaticalIllusion: ["self", "time", "nothing", "nature"].includes(word.toLowerCase())
        ? `Potential hypostatization: treating '${word}' as an autonomous substance rather than a relational concept.`
        : undefined
    })),
    grammaticalAnalysis: {
      isGrammarMisleading: isQuestion,
      summary: isQuestion
        ? "Grammatically poses an interrogative, but may presuppose non-existent entities or invalid categories."
        : "Grammatical subject-predicate construction that may tempt thought to reify abstract concepts.",
      grammaticalVsLogicalForm: "Surface grammar treats terms as standard physical objects; logical form requires relational unpacking."
    },
    typeErrorAnalysis: {
      hasTypeError: false,
      conceptAnalogy: {
        explanation: "Potential type error inspection: check if predicates defined for localized observables are being applied globally."
      }
    },
    questionDiagnostic: isQuestion
      ? {
          isQuestion: true,
          requestedExplanationType: "LINGUISTIC",
          whatWouldCountAsAnAnswer: "Clarification of key definitions and boundary criteria is needed before an answer can count.",
          clarificationSubQuestions: [
            "What criteria must a valid answer satisfy?",
            "Are the terms being used in an empirical, phenomenological, or metaphysical sense?"
          ],
          wellFormednessVerdict: "CLARIFICATION_REQUIRED",
          diagnosticAdvice: "Before attempting to answer, debug the question's presuppositions."
        }
      : undefined,
    truthConditions: {
      applicable: !isQuestion,
      falsificationCategory: "UNDER_SPECIFIED",
      falsificationAnalysis: "Formulate a concrete possible state of affairs that would make this false to verify empirical content."
    },
    epistemicLadder: [
      {
        level: "OBSERVATION",
        content: `Direct subjective occurrence or inquiry: "${input}"`,
        isInferenceJump: false
      },
      {
        level: "DESCRIPTION",
        content: "Linguistic formulation of the observation.",
        isInferenceJump: false
      },
      {
        level: "INTERPRETATION",
        content: "Conceptual framework applied to the experience.",
        isInferenceJump: false
      },
      {
        level: "INFERENCE",
        content: "Inferential claims derived from the formulation.",
        isInferenceJump: true,
        jumpAlert: "⚠️ INFERENCE JUMP CHECK: Ensure that what is inferred does not exceed what was directly observed."
      },
      {
        level: "METAPHYSICAL_CLAIM",
        content: "Metaphysical assertion if terms are absolutized.",
        isInferenceJump: true,
        jumpAlert: "⚠️ METAPHYSICAL LEAP: Watch for unverified ontological conclusions."
      }
    ],
    hasInferenceJump: true,
    hiddenAssumptions: [
      {
        id: "HA-GEN-1",
        assumption: "The terms used correspond to distinct ontological categories rather than linguistic conventions.",
        isExplicit: false,
        dependencyRationale: "Foundational assumption of assertoric philosophical language.",
        domainBoundaryWarning: "Wittgensteinian critique of essentialism.",
        isIndependentlyJustified: "OPEN_QUESTION"
      }
    ],
    wittgensteinDiagnostic: {
      earlyWittgensteinPerspective: "Tractatus: A proposition is a picture of reality. If this cannot be resolved into elementary propositions depicting possible states of affairs, it is not an empirical proposition.",
      laterWittgensteinPerspective: "Philosophical Investigations: Look at the use of these words in everyday life. Ask: In what language-game does this sentence actually work?",
      primaryTension: "Grammar creates an appearance of meaningfulness; rigorous inquiry requires clarifying the rules of the language-game."
    },
    intuitionPreservation: {
      originalThought: input,
      apparentLinguisticProblem: "Under-specified or ambiguous phrasing.",
      underlyingIntuition: "Inquiry into the structure of experience or reality.",
      preservedCore: "The genuine human curiosity or observation behind the thought.",
      lostOrDistortedElements: "None yet lost; awaiting precise reformulation.",
      addedElements: "Epistemic caution and boundary awareness.",
      qualitativeConfidence: "MODERATE",
      confidenceRationale: "Heuristic diagnostic awaiting live LLM or detailed human refinement."
    },
    reformulations: [
      {
        id: "ref-phen",
        mode: "phenomenological",
        label: "Phenomenological Refinement",
        proposition: `In my direct experience, I observe conditions associated with "${input}".`,
        nonEquivalenceNote: "Grounds the statement in first-person witnessing.",
        whatIsPreserved: "Experiential immediacy.",
        whatIsAlteredOrLost: "Objective cosmological certainty."
      }
    ],
    toneVoices: {
      everyday: `In everyday life, what we usually mean when we say "${input}" is that our experience feels consistent and meaningful.`,
      balanced: `In direct experience, conditions associated with "${input}" are observed, without asserting an absolute metaphysical rule.`,
      airtight: `Under specific local observational conditions, events corresponding to "${input}" occur, though this does not imply an unconditional universal law.`
    },
    stressTest: {
      skepticObjection: `A skeptic would ask: "How do you know this isn't just subjective wishful thinking or a trick of language rather than an objective fact?"`,
      shieldResponse: `You can answer: "I am not claiming an absolute cosmic rule; I am simply pointing out how this pattern reliably shows up in our practical experience."`,
      solidityRating: "NEEDS_BOUNDARY",
      solidityNote: "Sound as a practical observation, but needs a clear boundary so it doesn't get mistaken for a mathematical certainty."
    },
    linterWarnings: [
      {
        code: "W001",
        severity: "warning",
        title: "Under-specified Terms",
        message: "Key terms require contextual definition to prevent equivocation.",
        suggestion: "Specify the exact domain of reference for each major noun."
      },
      {
        code: "INFO",
        severity: "info",
        title: "Heuristic Engine Active",
        message: "Add a Gemini API key in Settings for full LLM reasoning, or select any of the 9 Canonical Benchmark presets for exhaustive analysis.",
        suggestion: "Explore canonical presets or enter an API key."
      }
    ],
    unresolvedQuestions: [
      "What concrete difference in experience or reality would confirm or disconfirm this claim?"
    ],
    humilityNote: "This initial diagnostic was produced by the offline heuristic engine. Connect a Gemini API key in Settings to unleash dynamic generative analysis."
  };
}

function generateHeuristicNagarjuna(input: string, isKarika: boolean = false): NagarjunaDiagnosticResult {
  return {
    id: `nagarjuna-heuristic-${Date.now()}`,
    input,
    timestamp: new Date().toISOString(),
    engineUsed: "heuristic_fallback",
    mode: isKarika ? "karika" : "nagarjuna",
    transformedRelationalProposition: `The phenomenon referenced in "${input}" does not exist with intrinsic independence (svabhāva); its occurrence is conditioned entirely by mutual relations (pratītyasamutpāda).`,
    svabhavaCritiqueSummary: "If this entity possessed an autonomous, self-sufficient essence, it could neither change, affect other things, nor arise from causes. Its functional reality is possible precisely because it is empty of inherent existence.",
    assumedIntrinsicEntity: "Autonomous substance or independent entity assumed in the proposition.",
    dependentConditionsUncovered: [
      "Prior causal antecedents (hetu)",
      "Co-existing relational conditions (pratyaya)",
      "Conceptual labeling and linguistic imputation (prajñapti-upādāya)"
    ],
    prasangaContradiction: "Assuming independent essence contradicts the dynamic, interconnected observation of the phenomenon.",
    catuskotiAnalysis: {
      isAssertion: "It cannot be asserted as an inherently existing entity.",
      isNegation: "It cannot be negated into non-existent voidness.",
      isBoth: "It is not both inherently existent and non-existent.",
      isNeither: "It is not an ineffable third ontological state.",
      dialecticConclusion: "It is conventionally functional and empty of fixed metaphysical substance."
    },
    prajnaptiNominalDesignation: "The term serves as a pragmatic conventional signpost for navigation, not an ontological anchor.",
    madhyamakaVerdict: "SVABHAVA_DECONSTRUCTED",
    verdictRationale: "Heuristic Madhyamaka reduction deconstructing assumed self-existence into relational dependence.",
    humilityNote: "Generated by offline heuristic engine. Connect Groq or Gemini API key for live dynamic dialectical deconstruction."
  };
}

function generateHeuristicComparative(input: string): ComparativeDiagnosticResult {
  return {
    id: `comp-heuristic-${Date.now()}`,
    input,
    timestamp: new Date().toISOString(),
    engineUsed: "heuristic_fallback",
    mode: "comparative",
    wittgensteinTransformation: `In our language-games, "${input}" reflects a grammatical picture that tempts thought to imagine metaphysical objects behind ordinary words.`,
    wittgensteinReason: "Surface grammar treats abstract concepts as substantive things; we must look at how words are actually used in everyday life.",
    nagarjunaTransformation: `The terms in "${input}" arise in relational co-dependence (pratītyasamutpāda) and are devoid of inherent self-existence (svabhāva).`,
    nagarjunaReason: "No entity can stand alone; assuming independence leads to the logical contradiction that things cannot change or interact.",
    convergences: [
      "Both expose the illusion of treating conventional signs as autonomous metaphysical substances.",
      "Both employ philosophical inquiry as a therapeutic practice to dissolve pseudo-problems rather than build metaphysical systems."
    ],
    divergences: [
      "Wittgenstein operates through grammatical clarification of shared human language-games.",
      "Nāgārjuna operates through dialectical reductio (prasaṅga) demonstrating universal relational dependence (śūnyatā)."
    ],
    falseEquivalenceWarning: "Caution: Wittgenstein is addressing Western linguistic and logical confusion in ordinary life; Nāgārjuna is addressing classical Indian ontology within a Buddhist soteriological framework. Do not collapse their methods into one.",
    verdict: "COMPLEMENTARY_DIAGNOSTICS",
    comparativeVerdictRationale: "Dual diagnostic reveals that both thinkers deconstruct essentialist reification, approaching the illusion from language-games and relational dependence respectively."
  };
}

