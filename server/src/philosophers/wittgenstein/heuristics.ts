/**
 * Wittgensteinian Analytical Heuristics
 * Distinguishes Early (Tractatus) from Later (Philosophical Investigations) analytical methods
 */

export interface WittgensteinHeuristic {
  id: string;
  name: string;
  phase: "EARLY" | "LATER" | "BOTH";
  description: string;
  diagnosticQuestions: string[];
}

export const WITTGENSTEIN_HEURISTICS: WittgensteinHeuristic[] = [
  {
    id: "H-PROP-ASSERTION",
    name: "Propositional Articulation (What is asserted?)",
    phase: "BOTH",
    description: "Determines whether the statement actually asserts a clear proposition or merely mimics the surface syntax of one.",
    diagnosticQuestions: [
      "What exactly is being asserted?",
      "Does the statement picture a distinct state of affairs?",
      "Could the world be different while this statement remains unchanged?"
    ]
  },
  {
    id: "H-TERMS-IN-USE",
    name: "Dissection of Terms in Use",
    phase: "LATER",
    description: "Examines what work each word is performing in the concrete sentence, rather than assuming words have fixed metaphysical essences.",
    diagnosticQuestions: [
      "Which terms are doing philosophical heavy lifting?",
      "Are words being used in their ordinary life-context, or has language gone on holiday?",
      "Is an abstract noun being treated like a tangible substance?"
    ]
  },
  {
    id: "H-GRAMMATICAL-ILLUSION",
    name: "Grammatical Illusion / Surface vs Logical Form",
    phase: "BOTH",
    description: "Identifies where the surface grammar of a phrase leads thought astray by mirroring completely different grammatical structures.",
    diagnosticQuestions: [
      "Does the grammatical form mislead us? (e.g. 'Time flows' vs 'The river flows')",
      "Has a coordinate or relation been turned into an autonomous actor?",
      "Is an apparent mystery simply created by grammatical accidents?"
    ]
  },
  {
    id: "H-TRUTH-FALSIFICATION",
    name: "State of Affairs & Falsification Conditions",
    phase: "EARLY",
    description: "Asks what possible state of affairs would make the statement true, and what possible state of affairs would make it false.",
    diagnosticQuestions: [
      "What would make this proposition true or false?",
      "Can we conceive of a concrete state of affairs that would falsify it?",
      "If nothing can falsify it, is it a tautology, a framework definition, or under-specified?"
    ]
  },
  {
    id: "H-CATEGORY-MISTAKE",
    name: "Philosophical Type Error / Category Mistake",
    phase: "BOTH",
    description: "Detects category shifts, such as treating an epistemic horizon as a physical container, or a mathematical limit as a spatial coordinate.",
    diagnosticQuestions: [
      "Is an abstraction being treated as a physical object?",
      "Is an operator defined on parts being applied to the whole totality?",
      "Is there a domain violation (type mismatch) in the predicates?"
    ]
  },
  {
    id: "H-QUESTION-WELLFORMEDNESS",
    name: "Question Well-Formedness ('What would count as an answer?')",
    phase: "BOTH",
    description: "Before attempting to answer a philosophical question, investigates whether the question is well-formed or fundamentally malformed.",
    diagnosticQuestions: [
      "What would count as an answer to this question?",
      "Is the question requesting a type of answer that language cannot coherently support?",
      "Is the question hiding multiple contradictory sub-questions?"
    ]
  },
  {
    id: "H-INTUITION-PRESERVATION",
    name: "Intuition Preservation with Linguistic Debugging",
    phase: "BOTH",
    description: "Refuses to destroy a genuine human observation simply because its initial linguistic formulation was defective.",
    diagnosticQuestions: [
      "What was the user's authentic phenomenological or intellectual intuition?",
      "Where did language fail that intuition?",
      "How can the intuition be expressed in rigorous empirical or phenomenological terms?"
    ]
  }
];
