/**
 * Core type definitions for PhiloCompiler
 * A Computational Instrument for Philosophical-Linguistic Debugging
 */

export type StatementMode =
  | "empirical"
  | "mathematical"
  | "logical"
  | "ordinary"
  | "metaphorical"
  | "poetic"
  | "ethical"
  | "aesthetic"
  | "phenomenological"
  | "normative"
  | "metaphysical"
  | "existential"
  | "performative"
  | "philosophical"
  | "under-specified"
  | "ambiguous";

export type EpistemicVerdict =
  | "CLEAR"
  | "AMBIGUOUS"
  | "UNDER-SPECIFIED"
  | "CATEGORYALLY PROBLEMATIC"
  | "PSEUDO-PROPOSITION SUSPECTED"
  | "FRAMEWORK-DEPENDENT"
  | "INTERPRETIVELY CONTESTED"
  | "METAPHORICAL"
  | "POETIC"
  | "NORMATIVE"
  | "EMPIRICALLY TESTABLE"
  | "UNRESOLVED";

export interface LinguisticTerm {
  term: string;
  roleInSentence: string;
  isPhilosophicallyLoaded: boolean;
  potentialGrammaticalIllusion?: string;
}

export interface GrammaticalFormAnalysis {
  isGrammarMisleading: boolean;
  summary: string;
  grammaticalVsLogicalForm: string;
  analogousMisleadingUse?: string; // e.g. "Time flows" compared to "The river flows"
}

export interface PhilosophicalTypeError {
  hasTypeError: boolean;
  conceptAnalogy?: {
    syntaxIssue?: string;
    semanticTypeExpected?: string;
    semanticTypeProvided?: string;
    scopeDomain?: string;
    operatorOrReferenceMismatch?: string;
    explanation: string;
  };
}

export type EpistemicLadderLevel =
  | "OBSERVATION"
  | "DESCRIPTION"
  | "INTERPRETATION"
  | "INFERENCE"
  | "METAPHYSICAL_CLAIM";

export interface EpistemicLadderStep {
  level: EpistemicLadderLevel;
  content: string;
  isInferenceJump: boolean;
  jumpAlert?: string;
}

export interface HiddenAssumption {
  id: string;
  assumption: string;
  isExplicit: boolean; // explicit or implicit
  dependencyRationale: string;
  domainBoundaryWarning?: string;
  isIndependentlyJustified: "JUSTIFIED" | "UNJUSTIFIED" | "FRAMEWORK_ASSUMPTION" | "OPEN_QUESTION";
}

export interface TruthFalsityConditions {
  applicable: boolean;
  whatWouldMakeItTrue?: string;
  whatWouldMakeItFalse?: string;
  falsificationCategory:
    | "FALSIFIABLE"
    | "UNFALSIFIABLE"
    | "UNDER_SPECIFIED"
    | "CATEGORY_CONFUSED"
    | "FRAMEWORK_DEPENDENT"
    | "METAPHORICAL_NOT_APPLICABLE";
  falsificationAnalysis: string;
}

export interface QuestionDiagnostic {
  isQuestion: boolean;
  requestedExplanationType?: "CAUSAL" | "ONTOLOGICAL" | "TELEOLOGICAL" | "EPISTEMIC" | "LINGUISTIC" | "DOMAIN_ERROR";
  spatialOrMetaphoricalShift?: string;
  whatWouldCountAsAnAnswer?: string;
  clarificationSubQuestions?: string[];
  wellFormednessVerdict?: string;
  diagnosticAdvice?: string;
}

export interface Reformulation {
  id: string;
  mode: "empirical" | "phenomenological" | "metaphysical" | "ordinary_language" | "poetic";
  label: string;
  proposition: string;
  nonEquivalenceNote: string;
  whatIsPreserved: string;
  whatIsAlteredOrLost: string;
}

export interface IntuitionPreservation {
  originalThought: string;
  apparentLinguisticProblem: string;
  underlyingIntuition: string;
  preservedCore: string;
  lostOrDistortedElements: string;
  addedElements: string;
  qualitativeConfidence: "HIGH" | "MODERATE" | "LOW" | "CONTESTED";
  confidenceRationale: string;
}

export interface LinterWarning {
  code: "W001" | "W002" | "W003" | "W004" | "W005" | "INFO";
  severity: "warning" | "info" | "caution";
  title: string;
  message: string;
  suggestion?: string;
}

export interface WittgensteinianDiagnostic {
  earlyWittgensteinPerspective: string; // Tractatus angle: logical form, states of affairs, limits of sayability
  laterWittgensteinPerspective: string; // Philosophical Investigations angle: language-games, grammar bewitching intelligence, ordinary use
  primaryTension: string;
}

export interface PhilosophicalAnalysisResult {
  id: string;
  input: string;
  timestamp: string;
  engineUsed: "gemini_live" | "groq_live" | "canonical_offline" | "heuristic_fallback";
  
  // High-level classifications
  statementModes: {
    mode: StatementMode;
    explanation: string;
  }[];
  verdict: EpistemicVerdict;
  verdictRationale: string;

  // Linguistic & Grammatical dissection
  termsInUse: LinguisticTerm[];
  grammaticalAnalysis: GrammaticalFormAnalysis;
  typeErrorAnalysis: PhilosophicalTypeError;

  // Question diagnostics (if applicable)
  questionDiagnostic?: QuestionDiagnostic;

  // Falsifiability & truth conditions
  truthConditions: TruthFalsityConditions;

  // Epistemic Ladder (Observation -> Metaphysics)
  epistemicLadder: EpistemicLadderStep[];
  hasInferenceJump: boolean;

  // Hidden Assumptions
  hiddenAssumptions: HiddenAssumption[];

  // Wittgensteinian Lens
  wittgensteinDiagnostic: WittgensteinianDiagnostic;

  // Intuition Preservation & Reformulation
  intuitionPreservation: IntuitionPreservation;
  reformulations: Reformulation[];

  // Linter warnings
  linterWarnings: LinterWarning[];

  // Epistemic humility & unresolved inquiry
  unresolvedQuestions: string[];
  humilityNote: string;
}

export type AnalysisMode = "wittgenstein" | "nagarjuna" | "comparative" | "karika";

export interface NagarjunaDiagnosticResult {
  id: string;
  input: string;
  timestamp: string;
  engineUsed: "gemini_live" | "groq_live" | "canonical_offline" | "heuristic_fallback";
  mode: "nagarjuna" | "karika";
  
  // Direct human answer
  transformedRelationalProposition: string;
  svabhavaCritiqueSummary: string;
  assumedIntrinsicEntity: string;
  dependentConditionsUncovered: string[];
  
  // Classical Dialectics (for deep inspection)
  prasangaContradiction: string;
  catuskotiAnalysis?: {
    isAssertion: string;
    isNegation: string;
    isBoth: string;
    isNeither: string;
    dialecticConclusion: string;
  };
  prajnaptiNominalDesignation: string;
  madhyamakaVerdict: "SVABHAVA_DECONSTRUCTED" | "CONVENTIONALLY_VALID" | "ESSENTIALIST_ERROR" | "INTERPRETIVELY_CONTESTED";
  verdictRationale: string;
  humilityNote: string;
}

export interface ComparativeDiagnosticResult {
  id: string;
  input: string;
  timestamp: string;
  engineUsed: "gemini_live" | "groq_live" | "canonical_offline" | "heuristic_fallback";
  mode: "comparative";
  
  // Independent results
  wittgensteinTransformation: string;
  wittgensteinReason: string;
  nagarjunaTransformation: string;
  nagarjunaReason: string;
  
  // Comparative synthesis
  convergences: string[];
  divergences: string[];
  falseEquivalenceWarning: string;
  verdict: string;
  comparativeVerdictRationale: string;
}

export type CritiqueVerdict =
  | "LOGICALLY_FLAWED"
  | "VALID_UNDER_RESTRICTED_SCOPE"
  | "CATEGORY_ERROR"
  | "CIRCULAR_ARGUMENT"
  | "SOUND";


export interface StepByStepFlowStep {
  stepNumber: number;
  statement: string;
  status: "sound" | "unproven_leap" | "flawed";
  note: string;
}

export interface ClaimCritiqueResult {
  id: string;
  input: string;
  authorOrTradition?: string;
  timestamp: string;
  engineUsed: "gemini_live" | "groq_live" | "canonical_offline" | "heuristic_fallback";
  isLogicallyValid: boolean;
  verdict: CritiqueVerdict;
  verdictSummary: string;
  whereIsTheProblem: {
    problematicPhrase?: string;
    flawType: string;
    explanation: string;
  };
  smuggledAssumptions: string[];
  correctedProposition: string;
  correctionRationale: string;
  simpleExplanation: string;
  stepByStepFlow?: StepByStepFlowStep[];
  authorCounterDefense?: string;
}


