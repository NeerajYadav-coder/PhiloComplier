import { NagarjunaDiagnosticResult, ComparativeDiagnosticResult } from "./types.js";

export const CANONICAL_NAGARJUNA: Record<string, NagarjunaDiagnosticResult> = {
  "mmk-24-18": {
    id: "canonical-mmk-24-18",
    input: "Whatever is dependently co-arisen, that is explained to be emptiness.",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    mode: "karika",
    transformedRelationalProposition: "Entities do not possess independent, fixed essence (svabhāva); their very existence and identity are constituted entirely through mutual, relational dependence (pratītyasamutpāda).",
    svabhavaCritiqueSummary: "If things possessed fixed, independent essence, they could never change, interact, be born, or cease. Emptiness is not nothingness—it is the relational open-endedness that allows the world to function.",
    assumedIntrinsicEntity: "Svabhāva (any assumed self-sufficient, non-relational, permanent substance).",
    dependentConditionsUncovered: [
      "Prior causes (hetu)",
      "Cooperating auxiliary conditions (pratyaya)",
      "Parts and constituents",
      "Conceptual imputation and linguistic designation (prajñapti-upādāya)"
    ],
    prasangaContradiction: "If an entity has inherent existence (svabhāva), it must be uncaused and unalterable. But we observe change and interaction. Therefore, asserting inherent existence contradicts observable reality.",
    catuskotiAnalysis: {
      isAssertion: "It is not an independently existing substantial thing (not existent with svabhāva).",
      isNegation: "It is not an absolute void or hallucination (not non-existent).",
      isBoth: "It is not both real and unreal at the same time.",
      isNeither: "It is not an ineffable third category beyond existence and non-existence.",
      dialecticConclusion: "Reality transcends the rigid fourfold conceptual grid: it is conventionally functional and ultimately empty of essence."
    },
    prajnaptiNominalDesignation: "Words like 'chariot', 'tree', or 'self' are pragmatic verbal designations that work in life, without requiring an underlying metaphysical substance.",
    madhyamakaVerdict: "CONVENTIONALLY_VALID",
    verdictRationale: "This kārikā (MMK 24.18) is the foundational synthesis of Madhyamaka: equating dependent arising with emptiness and conceptual designation, establishing the Middle Way between eternalism and nihilism.",
    humilityNote: "Classical commentators (Candrakīrti, Bhāviveka) interpret this verse with slight methodological divergences, but all agree that emptiness is the condition of possibility for all dynamic phenomena."
  },

  "mmk-1-1": {
    id: "canonical-mmk-1-1",
    input: "Neither from itself, nor from another, nor from both, nor without cause, does anything anywhere ever arise.",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    mode: "karika",
    transformedRelationalProposition: "Events do not arise through the mechanical collision of self-existent substances, but occur relationally as conditions converge.",
    svabhavaCritiqueSummary: "Causation cannot be an interaction between two self-standing things. If the effect were already in the cause, it wouldn't need to arise. If it were completely alien to the cause, light could arise from darkness.",
    assumedIntrinsicEntity: "Substantial causation (treating cause and effect as two independent, self-existent objects).",
    dependentConditionsUncovered: [
      "Causal conditions (hetu-pratyaya)",
      "Objective support (ālambana-pratyaya)",
      "Immediate antecedent condition (anantara-pratyaya)",
      "Dominant condition (adhipati-pratyaya)"
    ],
    prasangaContradiction: "Self-causation is redundant (an entity cannot produce itself if it already exists); other-causation is impossible (if cause and effect are inherently separate, no bridge can connect them).",
    prajnaptiNominalDesignation: "Causality is a conventional linguistic description of regular sequences, not a metaphysical glue binding substances.",
    madhyamakaVerdict: "SVABHAVA_DECONSTRUCTED",
    verdictRationale: "Nāgārjuna opens the MMK with this famous fourfold negation of production to establish that causation is dependently designated, not an inherent metaphysical mechanism.",
    humilityNote: "This analysis targets Indian philosophical opponents (Sāṃkhya self-causation and Nyāya other-causation) and should be understood within that dialectical debate."
  },

  "fire-and-fuel": {
    id: "canonical-fire-fuel",
    input: "If fire were identical with fuel, the consumer and consumed would be one.",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    mode: "karika",
    transformedRelationalProposition: "Fire and fuel exist in mutual, co-dependent definition: fire is not fuel, fire is not separate from fuel, and neither possesses independent essence.",
    svabhavaCritiqueSummary: "You cannot have fire without burning fuel, nor fuel without its relation to combustion. Neither can exist on its own first and then 'meet' the other.",
    assumedIntrinsicEntity: "Fire as an autonomous substance existing independently of its combustible fuel.",
    dependentConditionsUncovered: [
      "Oxygen and heat energy",
      "Combustible matter (fuel)",
      "Mutual definition: something is only called 'fuel' in relation to the possibility of fire"
    ],
    prasangaContradiction: "If fire is identical to fuel, the actor and the act merge into absurdity. If fire is completely separate from fuel, fire could exist in cold space without burning anything.",
    prajnaptiNominalDesignation: "'Fire' and 'fuel' are functional linguistic labels for an ongoing process, not static atomic substances.",
    madhyamakaVerdict: "SVABHAVA_DECONSTRUCTED",
    verdictRationale: "MMK Chapter 10 uses the fire-and-fuel metaphor to deconstruct the relation between the self (ātman) and the aggregates (skandhas).",
    humilityNote: "Demonstrates that identity and difference are both conceptual designations rather than inherent metaphysical truths."
  }
};

export const CANONICAL_COMPARATIVE: Record<string, ComparativeDiagnosticResult> = {
  "observer-and-observed": {
    id: "canonical-comp-observer",
    input: "The observer exists independently of what is observed.",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    mode: "comparative",
    wittgensteinTransformation: "The subject does not belong to the world, but is a limit of the world; in our actual language-games, 'observer' is a role in human practice, not an entity standing behind awareness.",
    wittgensteinReason: "Surface grammar tricks us into treating 'observer' as a concrete noun like 'camera'. But you can never encounter the observer as an object inside your visual field (Tractatus 5.632).",
    nagarjunaTransformation: "The observer and the observed arise in co-dependent relation (pratītyasamutpāda); neither possesses independent self-existence (svabhāva).",
    nagarjunaReason: "An observer cannot be defined without something being observed, and observed contents cannot be recognized without observing capacity. Claiming one exists independently is an essentialist contradiction.",
    convergences: [
      "Both dismantle the Cartesian illusion of an isolated, self-standing substantial ego.",
      "Both treat philosophical problems as therapeutic confusions generated by mistaking conventions for absolute metaphysical objects.",
      "Both reject the idea of an observer inspecting reality from a god-like vantage point outside of relations."
    ],
    divergences: [
      "Wittgenstein's primary tool is linguistic grammar and the description of shared human language-games.",
      "Nāgārjuna's primary tool is dialectical reductio (prasaṅga) demonstrating the self-contradiction of inherent existence across all phenomena.",
      "Nāgārjuna embeds his analysis within a soteriological path to liberate the mind from grasping; Wittgenstein seeks intellectual peace so the fly can escape the bottle."
    ],
    falseEquivalenceWarning: "Do not equate Wittgenstein's ordinary language philosophy with Buddhist enlightenment, nor assume Nāgārjuna was an early 20th-century linguistic analyst. Their cultural contexts, metaphysical assumptions, and end goals remain distinct.",
    verdict: "COMPLEMENTARY_DIAGNOSTICS",
    comparativeVerdictRationale: "Both traditions arrive at a radical deconstruction of the independent subject, though one operates by clarifying linguistic rules while the other demonstrates relational co-dependence."
  }
};

export function getCanonicalNagarjuna(query: string): NagarjunaDiagnosticResult | null {
  const norm = query.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (norm.includes("dependentlycoarisen") || norm.includes("emptiness") || norm.includes("2418")) {
    return CANONICAL_NAGARJUNA["mmk-24-18"];
  }
  if (norm.includes("fromitself") || norm.includes("another") || norm.includes("cause") || norm.includes("11")) {
    return CANONICAL_NAGARJUNA["mmk-1-1"];
  }
  if (norm.includes("fire") && norm.includes("fuel")) {
    return CANONICAL_NAGARJUNA["fire-and-fuel"];
  }
  return null;
}

export function getCanonicalComparative(query: string): ComparativeDiagnosticResult | null {
  const norm = query.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (norm.includes("observer") && norm.includes("observed")) {
    return CANONICAL_COMPARATIVE["observer-and-observed"];
  }
  return null;
}
