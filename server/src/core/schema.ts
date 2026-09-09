import { z } from "zod";

export const StatementModeEnum = z.enum([
  "empirical",
  "mathematical",
  "logical",
  "ordinary",
  "metaphorical",
  "poetic",
  "ethical",
  "aesthetic",
  "phenomenological",
  "normative",
  "metaphysical",
  "existential",
  "performative",
  "philosophical",
  "under-specified",
  "ambiguous",
]);

export const EpistemicVerdictEnum = z.enum([
  "CLEAR",
  "AMBIGUOUS",
  "UNDER-SPECIFIED",
  "CATEGORYALLY PROBLEMATIC",
  "PSEUDO-PROPOSITION SUSPECTED",
  "FRAMEWORK-DEPENDENT",
  "INTERPRETIVELY CONTESTED",
  "METAPHORICAL",
  "POETIC",
  "NORMATIVE",
  "EMPIRICALLY TESTABLE",
  "UNRESOLVED",
]);

export const LinguisticTermSchema = z.object({
  term: z.string(),
  roleInSentence: z.string(),
  isPhilosophicallyLoaded: z.boolean(),
  potentialGrammaticalIllusion: z.string().optional(),
});

export const GrammaticalFormAnalysisSchema = z.object({
  isGrammarMisleading: z.boolean(),
  summary: z.string(),
  grammaticalVsLogicalForm: z.string(),
  analogousMisleadingUse: z.string().optional(),
});

export const PhilosophicalTypeErrorSchema = z.object({
  hasTypeError: z.boolean(),
  conceptAnalogy: z
    .object({
      syntaxIssue: z.string().optional(),
      semanticTypeExpected: z.string().optional(),
      semanticTypeProvided: z.string().optional(),
      scopeDomain: z.string().optional(),
      operatorOrReferenceMismatch: z.string().optional(),
      explanation: z.string(),
    })
    .optional(),
});

export const EpistemicLadderStepSchema = z.object({
  level: z.enum([
    "OBSERVATION",
    "DESCRIPTION",
    "INTERPRETATION",
    "INFERENCE",
    "METAPHYSICAL_CLAIM",
  ]),
  content: z.string(),
  isInferenceJump: z.boolean(),
  jumpAlert: z.string().optional(),
});

export const HiddenAssumptionSchema = z.object({
  id: z.string(),
  assumption: z.string(),
  isExplicit: z.boolean(),
  dependencyRationale: z.string(),
  domainBoundaryWarning: z.string().optional(),
  isIndependentlyJustified: z.enum([
    "JUSTIFIED",
    "UNJUSTIFIED",
    "FRAMEWORK_ASSUMPTION",
    "OPEN_QUESTION",
  ]),
});

export const TruthFalsityConditionsSchema = z.object({
  applicable: z.boolean(),
  whatWouldMakeItTrue: z.string().optional(),
  whatWouldMakeItFalse: z.string().optional(),
  falsificationCategory: z.enum([
    "FALSIFIABLE",
    "UNFALSIFIABLE",
    "UNDER_SPECIFIED",
    "CATEGORY_CONFUSED",
    "FRAMEWORK_DEPENDENT",
    "METAPHORICAL_NOT_APPLICABLE",
  ]),
  falsificationAnalysis: z.string(),
});

export const QuestionDiagnosticSchema = z.object({
  isQuestion: z.boolean(),
  requestedExplanationType: z
    .enum([
      "CAUSAL",
      "ONTOLOGICAL",
      "TELEOLOGICAL",
      "EPISTEMIC",
      "LINGUISTIC",
      "DOMAIN_ERROR",
    ])
    .optional(),
  spatialOrMetaphoricalShift: z.string().optional(),
  whatWouldCountAsAnAnswer: z.string().optional(),
  clarificationSubQuestions: z.array(z.string()).optional(),
  wellFormednessVerdict: z.string().optional(),
  diagnosticAdvice: z.string().optional(),
});

export const ReformulationSchema = z.object({
  id: z.string(),
  mode: z.enum([
    "empirical",
    "phenomenological",
    "metaphysical",
    "ordinary_language",
    "poetic",
  ]),
  label: z.string(),
  proposition: z.string(),
  nonEquivalenceNote: z.string(),
  whatIsPreserved: z.string(),
  whatIsAlteredOrLost: z.string(),
});

export const IntuitionPreservationSchema = z.object({
  originalThought: z.string(),
  apparentLinguisticProblem: z.string(),
  underlyingIntuition: z.string(),
  preservedCore: z.string(),
  lostOrDistortedElements: z.string(),
  addedElements: z.string(),
  qualitativeConfidence: z.enum(["HIGH", "MODERATE", "LOW", "CONTESTED"]),
  confidenceRationale: z.string(),
});

export const LinterWarningSchema = z.object({
  code: z.enum(["W001", "W002", "W003", "W004", "W005", "INFO"]),
  severity: z.enum(["warning", "info", "caution"]),
  title: z.string(),
  message: z.string(),
  suggestion: z.string().optional(),
});

export const WittgensteinianDiagnosticSchema = z.object({
  earlyWittgensteinPerspective: z.string(),
  laterWittgensteinPerspective: z.string(),
  primaryTension: z.string(),
});

export const PhilosophicalAnalysisResultSchema = z.object({
  id: z.string(),
  input: z.string(),
  timestamp: z.string(),
  engineUsed: z.enum(["gemini_live", "groq_live", "canonical_offline", "heuristic_fallback"]),
  statementModes: z.array(
    z.object({
      mode: StatementModeEnum,
      explanation: z.string(),
    })
  ),
  verdict: EpistemicVerdictEnum,
  verdictRationale: z.string(),
  termsInUse: z.array(LinguisticTermSchema),
  grammaticalAnalysis: GrammaticalFormAnalysisSchema,
  typeErrorAnalysis: PhilosophicalTypeErrorSchema,
  questionDiagnostic: QuestionDiagnosticSchema.optional(),
  truthConditions: TruthFalsityConditionsSchema,
  epistemicLadder: z.array(EpistemicLadderStepSchema),
  hasInferenceJump: z.boolean(),
  hiddenAssumptions: z.array(HiddenAssumptionSchema),
  wittgensteinDiagnostic: WittgensteinianDiagnosticSchema,
  intuitionPreservation: IntuitionPreservationSchema,
  reformulations: z.array(ReformulationSchema),
  linterWarnings: z.array(LinterWarningSchema),
  unresolvedQuestions: z.array(z.string()),
  humilityNote: z.string(),
});

export const NagarjunaDiagnosticResultSchema = z.object({
  id: z.string(),
  input: z.string(),
  timestamp: z.string(),
  engineUsed: z.enum(["gemini_live", "groq_live", "canonical_offline", "heuristic_fallback"]),
  mode: z.enum(["nagarjuna", "karika"]),
  transformedRelationalProposition: z.string(),
  svabhavaCritiqueSummary: z.string(),
  assumedIntrinsicEntity: z.string(),
  dependentConditionsUncovered: z.array(z.string()),
  prasangaContradiction: z.string(),
  catuskotiAnalysis: z
    .object({
      isAssertion: z.string(),
      isNegation: z.string(),
      isBoth: z.string(),
      isNeither: z.string(),
      dialecticConclusion: z.string(),
    })
    .optional(),
  prajnaptiNominalDesignation: z.string(),
  madhyamakaVerdict: z.enum([
    "SVABHAVA_DECONSTRUCTED",
    "CONVENTIONALLY_VALID",
    "ESSENTIALIST_ERROR",
    "INTERPRETIVELY_CONTESTED",
  ]),
  verdictRationale: z.string(),
  humilityNote: z.string(),
});

export const ComparativeDiagnosticResultSchema = z.object({
  id: z.string(),
  input: z.string(),
  timestamp: z.string(),
  engineUsed: z.enum(["gemini_live", "groq_live", "canonical_offline", "heuristic_fallback"]),
  mode: z.literal("comparative"),
  wittgensteinTransformation: z.string(),
  wittgensteinReason: z.string(),
  nagarjunaTransformation: z.string(),
  nagarjunaReason: z.string(),
  convergences: z.array(z.string()),
  divergences: z.array(z.string()),
  falseEquivalenceWarning: z.string(),
  verdict: z.string(),
  comparativeVerdictRationale: z.string(),
});

