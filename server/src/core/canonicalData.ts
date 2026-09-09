import { PhilosophicalAnalysisResult } from "./types.js";

export interface CanonicalPreset {
  id: string;
  title: string;
  category: "Grammatical Illusion" | "Anthropomorphism" | "Observation & Inference" | "Domain Overextension" | "Malformed Question" | "Poetic vs Scientific";
  input: string;
  previewSummary: string;
  analysis: PhilosophicalAnalysisResult;
}

export const CANONICAL_PRESETS: Record<string, CanonicalPreset> = {
  "time-flows": {
    id: "time-flows",
    title: "Time flows",
    category: "Grammatical Illusion",
    input: "Time flows.",
    previewSummary: "Examines whether 'time' is an entity capable of flow like a river, or a grammatical substantivization of temporal relations.",
    analysis: {
      id: "preset-time-flows",
      input: "Time flows.",
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline",
      statementModes: [
        {
          mode: "metaphorical",
          explanation: "Borrows hydraulic/fluid dynamics ('flows') to describe the experiential succession of events.",
        },
        {
          mode: "ordinary",
          explanation: "Common linguistic idiom used to express the passage of events and transience.",
        },
        {
          mode: "metaphysical",
          explanation: "Often reified in philosophy as the 'A-theory of time' (substantive river of time).",
        }
      ],
      verdict: "METAPHORICAL",
      verdictRationale: "Meaningful as an experiential metaphor and phenomenological shorthand, but philosophically misleading if taken as an assertion that 'Time' is a substance possessing velocity.",
      termsInUse: [
        {
          term: "Time",
          roleInSentence: "Grammatical subject, appearing as an autonomous entity or fluid medium.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Substantivization: converting a coordinate or relational metric between events into a concrete noun that can act."
        },
        {
          term: "flows",
          roleInSentence: "Active verb describing fluid motion through space across time.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Flow requires a rate (e.g. distance per second). Flow of time would require 'seconds per what?'"
        }
      ],
      grammaticalAnalysis: {
        isGrammarMisleading: true,
        summary: "The grammatical structure of 'Time flows' is identical to 'The river flows', deceptively suggesting both subjects denote objects capable of movement.",
        grammaticalVsLogicalForm: "Grammatically: Subject (Noun) + Intransitive Verb. Logically: Events succeed one another in temporal order (t1 < t2 < t3); there is no secondary container 'Time' that translates relative to something else.",
        analogousMisleadingUse: "Compare 'The river flows' (water molecules moving relative to riverbanks) vs 'Time flows' (events changing, but no medium flowing through higher-order time)."
      },
      typeErrorAnalysis: {
        hasTypeError: true,
        conceptAnalogy: {
          syntaxIssue: "Applying a kinetic vector operator ('flow(x)') to the temporal dimension itself.",
          semanticTypeExpected: "PhysicalSubstance | LiquidMedium",
          semanticTypeProvided: "TemporalCoordinateSystem",
          scopeDomain: "Fluid Dynamics / Kinematics",
          operatorOrReferenceMismatch: "Rate operator (dx/dt) applied where x = t, yielding dt/dt = 1 (vacuous/circular).",
          explanation: "Flow is defined with respect to time. Treating time as flowing either generates an infinite regress of meta-times ('time flows at 1 second per meta-second') or is a category mistake."
        }
      },
      truthConditions: {
        applicable: false,
        falsificationCategory: "METAPHORICAL_NOT_APPLICABLE",
        falsificationAnalysis: "As a literal empirical proposition, it lacks truth conditions because no measurement apparatus can detect 'time' separate from physical changes. As a metaphor, it is apt rather than true/false."
      },
      epistemicLadder: [
        {
          level: "OBSERVATION",
          content: "I observe sequential changes: the clock hand moves, shadows lengthen, sensations shift.",
          isInferenceJump: false
        },
        {
          level: "DESCRIPTION",
          content: "Events exhibit an irreversible order of succession and duration.",
          isInferenceJump: false
        },
        {
          level: "INTERPRETATION",
          content: "This succession feels continuous, analogous to the continuous motion of water.",
          isInferenceJump: false
        },
        {
          level: "INFERENCE",
          content: "Therefore, there is an underlying current or progression passing over reality.",
          isInferenceJump: true,
          jumpAlert: "⚠️ INFERENCE JUMP DETECTED: Transitioned from the observation of changing events to postulating an invisible entity ('Time') that moves."
        },
        {
          level: "METAPHYSICAL_CLAIM",
          content: "Time is a metaphysical river or substantive medium flowing from future to past.",
          isInferenceJump: true,
          jumpAlert: "⚠️ METAPHYSICAL LEAP: Substantival reification of the temporal metric."
        }
      ],
      hasInferenceJump: true,
      hiddenAssumptions: [
        {
          id: "HA-1",
          assumption: "'Time' refers to an independent substance or medium rather than a relation between physical changes.",
          isExplicit: false,
          dependencyRationale: "The verb 'flows' requires an entity that possesses kinetic properties.",
          domainBoundaryWarning: "Conflates relational time (Leibniz/Wittgenstein) with substantive fluid time.",
          isIndependentlyJustified: "UNJUSTIFIED"
        },
        {
          id: "HA-2",
          assumption: "Motion can occur without a background coordinate framework.",
          isExplicit: false,
          dependencyRationale: "If time flows, what background metric measures the velocity of that flow?",
          domainBoundaryWarning: "Regress problem: requires higher-order time to define speed of flow.",
          isIndependentlyJustified: "UNJUSTIFIED"
        }
      ],
      wittgensteinDiagnostic: {
        earlyWittgensteinPerspective: "In the Tractatus (6.3611), Wittgenstein notes that we cannot compare any process with the 'passage of time'—we can only compare processes with other processes (e.g. the movement of the sun with the clock). 'Time flows' fails to picture a verifiable state of affairs.",
        laterWittgensteinPerspective: "In the Blue Book and Philosophical Investigations, Wittgenstein warns of the bewitchment of our intelligence by means of language: because 'time' is a noun like 'cheese' or 'river', we seek an elusive substance called 'time' and wonder how it flows.",
        primaryTension: "Grammar treats 'time' as a thing that does something, whereas in actual life we only ever measure changes between observable states."
      },
      intuitionPreservation: {
        originalThought: "Time flows.",
        apparentLinguisticProblem: "Reifies time into a moving liquid, creating logical and physical paradoxes of measurement.",
        underlyingIntuition: "Human experience is marked by transience, continuous succession, and the irreversibility of physical processes.",
        preservedCore: "The experiential reality of dynamic change, entropy, and temporal ordering.",
        lostOrDistortedElements: "The poetic imagery of a river or fluid medium.",
        addedElements: "Conceptual clarity regarding the relational nature of time.",
        qualitativeConfidence: "HIGH",
        confidenceRationale: "The intuition is fully accounted for by relational change without requiring a substantial river of time."
      },
      reformulations: [
        {
          id: "ref-emp",
          mode: "empirical",
          label: "Relational / Physical",
          proposition: "Physical systems undergo continuous, irreversible changes in entropy and configuration relative to standard periodic references.",
          nonEquivalenceNote: "Replaces the substantive agent 'time' with physical entropy and relative motions.",
          whatIsPreserved: "The directionality and continuity of physical transformation.",
          whatIsAlteredOrLost: "The romantic/poetic feeling of being carried along by a current."
        },
        {
          id: "ref-phen",
          mode: "phenomenological",
          label: "Phenomenological",
          proposition: "Conscious experience presents a continuous horizon of retention, primal impression, and protention (Husserlian internal time-consciousness).",
          nonEquivalenceNote: "Shifts from physical claims to experiential structure.",
          whatIsPreserved: "The subjective sense of transience and passing presence.",
          whatIsAlteredOrLost: "Any claim about the objective cosmos possessing a flowing substance."
        },
        {
          id: "ref-ord",
          mode: "ordinary_language",
          label: "Ordinary Language Idiom",
          proposition: "Things change rapidly, and past moments cannot be relived.",
          nonEquivalenceNote: "Restores the phrase to its harmless conversational role.",
          whatIsPreserved: "Everyday communication and emotional resonance.",
          whatIsAlteredOrLost: "The pretense of asserting a deep cosmological thesis."
        }
      ],
      linterWarnings: [
        {
          code: "W001",
          severity: "warning",
          title: "Ambiguous Use of Noun as Substantive Medium",
          message: "'Time' is deployed as a concrete actor rather than a relational dimension or indexing variable.",
          suggestion: "Reformulate in terms of 'events changing relative to each other'."
        },
        {
          code: "W003",
          severity: "warning",
          title: "Philosophical Type Error / Category Shift",
          message: "Kinetic predicate 'flows' requires spatial coordinates and fluid substance, but is applied to temporal coordinates.",
          suggestion: "Recognize 'flows' as a phenomenological metaphor rather than physical mechanics."
        },
        {
          code: "INFO",
          severity: "info",
          title: "Intuition Preserved",
          message: "The experiential sense of transience survives without positing metaphysical fluid time.",
          suggestion: "Adopt the phenomenological or relational reformulation."
        }
      ],
      unresolvedQuestions: [
        "Why is human internal time-consciousness so persistently experienced as fluid motion?",
        "Does the thermodynamic arrow of time provide an objective basis for the asymmetry of past and future?"
      ],
      humilityNote: "Classifying 'Time flows' as metaphorical does not diminish the profound phenomenological reality of transience; it merely clarifies that grammar has substituted an imaginary substance for relative change."
    }
  },

  "nature-wants-equilibrium": {
    id: "nature-wants-equilibrium",
    title: "Nature wants equilibrium",
    category: "Anthropomorphism",
    input: "Nature wants equilibrium.",
    previewSummary: "Diagnoses anthropomorphic intentionality ('wants') attributed to an abstract collective ('Nature').",
    analysis: {
      id: "preset-nature-wants",
      input: "Nature wants equilibrium.",
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline",
      statementModes: [
        {
          mode: "metaphorical",
          explanation: "Personifies natural dynamics using the psychological language of desire and intent.",
        },
        {
          mode: "metaphysical",
          explanation: "Teleological framing reminiscent of Aristotelian final causes.",
        },
        {
          mode: "empirical",
          explanation: "Gestures toward physical equilibrium, Le Chatelier's principle, and homeostatic biological systems.",
        }
      ],
      verdict: "CATEGORYALLY PROBLEMATIC",
      verdictRationale: "Category mistake: attributes volitional intentionality ('wants') to non-conscious thermodynamic and ecological systems.",
      termsInUse: [
        {
          term: "Nature",
          roleInSentence: "Grammatical agent treated as a unified, purposeful entity.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Hypostatization: treating the sum of all natural phenomena as a single intentional macro-agent."
        },
        {
          term: "wants",
          roleInSentence: "Intentional mental state predicate denoting preference, aim, or volition.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Attributing cognitive goal-directedness to blind physical regularities."
        },
        {
          term: "equilibrium",
          roleInSentence: "Objective state of thermodynamic, chemical, or ecological balance.",
          isPhilosophicallyLoaded: false
        }
      ],
      grammaticalAnalysis: {
        isGrammarMisleading: true,
        summary: "The sentence has the same grammatical form as 'The engineer wants equilibrium', deceptively suggesting an entity with forethought seeking an outcome.",
        grammaticalVsLogicalForm: "Grammatically: Agent (Nature) + Volitional Verb (wants) + Target Object (equilibrium). Logically: Physical systems governed by thermodynamic laws tend toward states of maximum entropy or minimal free energy.",
        analogousMisleadingUse: "Compare 'The computer wants to restart' or 'The water wants to find its lowest level'—convenient telegraphic speech, but false if taken as literal psychology."
      },
      typeErrorAnalysis: {
        hasTypeError: true,
        conceptAnalogy: {
          syntaxIssue: "Invoking a volition operator ('desires(agent, state)') on an impersonal collective set.",
          semanticTypeExpected: "ConsciousAgent | IntentionalBeing",
          semanticTypeProvided: "NaturalSystemCollection",
          scopeDomain: "Psychology / Philosophy of Action",
          operatorOrReferenceMismatch: "Category mismatch: Teleological operator applied to mechanistic / thermodynamic phase space.",
          explanation: "Systems relax into equilibrium due to statistical probability and energy gradients, not psychological motivation."
        }
      },
      truthConditions: {
        applicable: true,
        whatWouldMakeItTrue: "If there existed an overarching conscious demiurge or planetary mind holding conscious goals for cosmic balance.",
        whatWouldMakeItFalse: "Showing that equilibrium occurs purely as a statistical attractor of particulate interactions without conscious intent.",
        falsificationCategory: "CATEGORY_CONFUSED",
        falsificationAnalysis: "Taken literally, it is false; taken teleologically, it relies on unevidenced animism; taken as shorthand for attractor dynamics, it is empirically accurate."
      },
      epistemicLadder: [
        {
          level: "OBSERVATION",
          content: "Disturbed ecosystems, pendulums, and chemical solutions repeatedly return to stable or resting states.",
          isInferenceJump: false
        },
        {
          level: "DESCRIPTION",
          content: "Certain natural systems possess negative feedback loops and attractors.",
          isInferenceJump: false
        },
        {
          level: "INTERPRETATION",
          content: "The return to stability looks purposeful, as if aiming for safety or rest.",
          isInferenceJump: false
        },
        {
          level: "INFERENCE",
          content: "Therefore, natural systems are driven by an intrinsic preference for balance.",
          isInferenceJump: true,
          jumpAlert: "⚠️ INFERENCE JUMP DETECTED: Teleological projection. Conflating a mathematical attractor with a conscious desire."
        },
        {
          level: "METAPHYSICAL_CLAIM",
          content: "Nature is an animate or teleological entity with intentions and ethical balance.",
          isInferenceJump: true,
          jumpAlert: "⚠️ METAPHYSICAL LEAP: Full personification of the cosmos."
        }
      ],
      hasInferenceJump: true,
      hiddenAssumptions: [
        {
          id: "HA-1",
          assumption: "'Nature' designates a unified entity capable of having goals.",
          isExplicit: false,
          dependencyRationale: "The predicate 'wants' requires an unified subject of desire.",
          domainBoundaryWarning: "Conflates an aggregate of physical processes with a unified sentient organism.",
          isIndependentlyJustified: "UNJUSTIFIED"
        },
        {
          id: "HA-2",
          assumption: "Equilibrium is universally favored by all natural systems.",
          isExplicit: true,
          dependencyRationale: "Ignores dissipative structures, cosmological expansion, stellar collapse, and non-equilibrium thermodynamics.",
          domainBoundaryWarning: "Equilibrium is often thermodynamic death; living systems maintain non-equilibrium homeodynamics.",
          isIndependentlyJustified: "UNJUSTIFIED"
        }
      ],
      wittgensteinDiagnostic: {
        earlyWittgensteinPerspective: "In the Tractatus, the only necessity is logical necessity (6.37). A proposition like 'Nature wants equilibrium' attempts to introduce a metaphysical purpose into the world of facts, where all facts are equally contingent and devoid of value or desire.",
        laterWittgensteinPerspective: "Wittgenstein would point out that we often borrow the language-game of human motives ('the wind tried to blow the door open', 'the engine is resisting') as convenient anthropomorphic pictures. Trouble begins when we forget the picture is a picture and start building metaphysics on it.",
        primaryTension: "Teleological vocabulary borrowed from human agency applied to non-agentic statistical physics."
      },
      intuitionPreservation: {
        originalThought: "Nature wants equilibrium.",
        apparentLinguisticProblem: "Attributes psychological volition ('wants') to an abstract collective ('Nature').",
        underlyingIntuition: "Natural and physical systems frequently exhibit self-stabilizing feedback processes and thermodynamic attractors.",
        preservedCore: "The presence of robust stabilizing dynamics, negative feedback loops, and attractor states in physical systems.",
        lostOrDistortedElements: "Any claim that nature experiences desire, moral preference, or intentional care.",
        addedElements: "Mechanistic precision regarding feedback loops, thermodynamic gradients, and boundary conditions.",
        qualitativeConfidence: "HIGH",
        confidenceRationale: "The functional insight (stabilizing tendencies) is preserved cleanly while shedding the anthropomorphic error."
      },
      reformulations: [
        {
          id: "ref-emp",
          mode: "empirical",
          label: "Empirical / Systems Dynamics",
          proposition: "Many physical and biological systems exhibit negative feedback loops that drive them toward stable attractor states or thermodynamic equilibrium.",
          nonEquivalenceNote: "Completely eliminates the agent 'Nature' and intentional verb 'wants' in favor of feedback mechanics.",
          whatIsPreserved: "The observed tendency toward stability.",
          whatIsAlteredOrLost: "Anthropomorphic emotional warmth and teleological purpose."
        },
        {
          id: "ref-phen",
          mode: "phenomenological",
          label: "Observational / Phenomenological",
          proposition: "When I observe natural systems after a disturbance, I repeatedly witness them settling into recurrent configurations of balance.",
          nonEquivalenceNote: "Grounds the statement strictly in what is witnessed from an observational standpoint.",
          whatIsPreserved: "Direct observational integrity without unverified causal assertions.",
          whatIsAlteredOrLost: "Cosmological scope."
        },
        {
          id: "ref-meta",
          mode: "metaphysical",
          label: "Impersonal Metaphysical",
          proposition: "Cosmic processes are characterized by an inherent teleological tendency toward thermodynamic and formal harmony.",
          nonEquivalenceNote: "Maintains a philosophical tilt, but strips individual psychological volition.",
          whatIsPreserved: "The metaphysical grandeur of the original intuition.",
          whatIsAlteredOrLost: "Empirical testability."
        }
      ],
      linterWarnings: [
        {
          code: "W001",
          severity: "warning",
          title: "Anthropomorphic Projection",
          message: "Psychological verb 'wants' attributed to impersonal thermodynamic processes.",
          suggestion: "Replace 'wants' with 'tends toward' or 'is constrained toward'."
        },
        {
          code: "W003",
          severity: "warning",
          title: "Category Mistake (Hypostatization)",
          message: "'Nature' treated as a solitary entity capable of holding preferences.",
          suggestion: "Specify the exact system (e.g. ecosystem, chemical solution, stellar cluster)."
        },
        {
          code: "INFO",
          severity: "info",
          title: "Intuition Recoverable",
          message: "The core insight regarding feedback loops and attractor states can be formulated with complete scientific rigor.",
          suggestion: "Use the Systems Dynamics reformulation."
        }
      ],
      unresolvedQuestions: [
        "Why do living systems fight thermodynamic equilibrium (which is death) while non-living systems relax into it?",
        "Is teleological language ever genuinely indispensable in biology (teleonomy), or merely an eliminable crutch?"
      ],
      humilityNote: "Diagnosing the category mistake in 'wants' does not dispute that stabilizing patterns are ubiquitous; it only clarifies that nature doesn't need to 'feel' a desire in order for gravity or thermodynamics to operate."
    }
  },

  "thoughts-arise-without-choosing": {
    id: "thoughts-arise-without-choosing",
    title: "Thoughts arise without my choosing them",
    category: "Observation & Inference",
    input: "Thoughts arise without my choosing them.",
    previewSummary: "Examines the exact boundary between phenomenological observation of thought-emergence and subsequent metaphysical inferences about an 'unconscious mind' or lack of agency.",
    analysis: {
      id: "preset-thoughts-arise",
      input: "Thoughts arise without my choosing them.",
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline",
      statementModes: [
        {
          mode: "phenomenological",
          explanation: "Direct description of first-person meditative or introspective awareness of mental events.",
        },
        {
          mode: "philosophical",
          explanation: "Touches on philosophy of mind, agency, volition, and the Cartesian ego.",
        },
        {
          mode: "empirical",
          explanation: "Aligns with cognitive science findings on pre-conscious neural processing (e.g. Libet-style readiness potentials).",
        }
      ],
      verdict: "CLEAR",
      verdictRationale: "High degree of phenomenological clarity when understood as a report of first-person introspection, though susceptible to inferential overreach if converted into metaphysical fatalism.",
      termsInUse: [
        {
          term: "Thoughts",
          roleInSentence: "Grammatical subject referring to cognitive tokens (words, images, concepts) appearing in consciousness.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Treating thoughts as discrete object-like packages passing before an observer."
        },
        {
          term: "arise",
          roleInSentence: "Intransitive verb indicating spontaneous emergence into awareness.",
          isPhilosophicallyLoaded: false
        },
        {
          term: "my choosing",
          roleInSentence: "Prepositional phrase designating an antecedent act of conscious volition by an ego ('my').",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Assumes that in order for an action to be 'chosen', there must be an overt second-order thought 'I choose X' prior to thought X."
        }
      ],
      grammaticalAnalysis: {
        isGrammarMisleading: false,
        summary: "The grammatical structure accurately mirrors the phenomenological disconnect between spontaneous thought emergence and conscious deliberation.",
        grammaticalVsLogicalForm: "Grammatically and logically consistent as a negative phenomenological report: in direct awareness, one does not author a thought before it appears, for to do so would require thinking it before thinking it.",
        analogousMisleadingUse: "Watch for the subsequent jump: 'If I didn't choose it, an unconscious 'IT' must have secretly chosen it'."
      },
      typeErrorAnalysis: {
        hasTypeError: false,
        conceptAnalogy: {
          explanation: "No direct type error. The terms stay within their phenomenological domains, though care is required regarding the regressive nature of 'choosing a thought'."
        }
      },
      truthConditions: {
        applicable: true,
        whatWouldMakeItTrue: "First-person verification where mental contents appear without any conscious experience of antecedent authoring.",
        whatWouldMakeItFalse: "Consistently experiencing a conscious, deliberative selection process *before* any cognitive content emerges into awareness.",
        falsificationCategory: "FALSIFIABLE",
        falsificationAnalysis: "Readily verifiable in first-person phenomenological inquiry; universally confirmed by sustained introspective observation."
      },
      epistemicLadder: [
        {
          level: "OBSERVATION",
          content: "I experience the appearance of a thought without consciously noticing an antecedent act of choosing it.",
          isInferenceJump: false
        },
        {
          level: "DESCRIPTION",
          content: "Thought emergence occurs without an introspectively reported preceding intention.",
          isInferenceJump: false
        },
        {
          level: "INTERPRETATION",
          content: "Conscious intention is not a necessary prerequisite for a thought to enter awareness.",
          isInferenceJump: false
        },
        {
          level: "INFERENCE",
          content: "Some neural/cognitive generative processes operate completely outside conscious awareness.",
          isInferenceJump: false
        },
        {
          level: "METAPHYSICAL_CLAIM",
          content: "Therefore, there is an autonomous unconscious agent creating my thoughts, and free will is an illusion.",
          isInferenceJump: true,
          jumpAlert: "⚠️ INFERENCE JUMP DETECTED: Jumped from the phenomenological absence of a choosing-act to positing an entity ('unconscious generator') and a total metaphysical negation of agency."
        }
      ],
      hasInferenceJump: true,
      hiddenAssumptions: [
        {
          id: "HA-1",
          assumption: "'Choosing a thought' is even logically coherent.",
          isExplicit: false,
          dependencyRationale: "To choose a thought before having it, one would need to know what it is—meaning one has already thought it (infinite regress of choosing thoughts).",
          domainBoundaryWarning: "Exposes the conceptual incoherence of the idea of 'choosing one's next thought'.",
          isIndependentlyJustified: "JUSTIFIED"
        },
        {
          id: "HA-2",
          assumption: "The 'I' who observes is separate from the cognitive processes generating the thoughts.",
          isExplicit: false,
          dependencyRationale: "Phrasing 'without my choosing' sets up a subtle duality between the observing 'I' and the arriving thoughts.",
          domainBoundaryWarning: "Dualistic grammar separating the self from mental activity.",
          isIndependentlyJustified: "FRAMEWORK_ASSUMPTION"
        }
      ],
      wittgensteinDiagnostic: {
        earlyWittgensteinPerspective: "In the Tractatus (5.631), Wittgenstein famously wrote: 'There is no such thing as the subject that thinks or entertains ideas.' The philosophical self is not an object in the world, but the limit of the world. 'Thoughts arise without my choosing' directly highlights that the thinking subject is not an entity standing behind thoughts pulling strings.",
        laterWittgensteinPerspective: "In Philosophical Investigations (§§293-308), Wittgenstein examines our grammar of 'intending' and 'thinking'. We are misled by the grammar of 'I chose this apple' into expecting an identical inner mental act 'I chose this thought'. When we don't find it, we feel surprised, as if something missing has occurred.",
        primaryTension: "Grammar creates the expectation of a homunculus chooser inside the head; observation reveals only the arising thoughts themselves."
      },
      intuitionPreservation: {
        originalThought: "Thoughts arise without my choosing them.",
        apparentLinguisticProblem: "None inherently in the raw report, but easily distorted into fatalistic metaphysics or unconscious homunculus models.",
        underlyingIntuition: "In direct phenomenological experience, cognition is an ongoing, spontaneous generative flow rather than a deliberate mechanical production by a separate ego.",
        preservedCore: "The direct observational discovery that thoughts present themselves autonomously rather than through pre-thought deliberations.",
        lostOrDistortedElements: "Avoids losing the reality of second-order critical reflection (e.g. noticing a thought and deciding whether to act on it).",
        addedElements: "Protection against ungrounded metaphysical fatalism.",
        qualitativeConfidence: "HIGH",
        confidenceRationale: "The statement is sound when kept to its observational station; the debugger protects it from illegitimate metaphysical extrapolation."
      },
      reformulations: [
        {
          id: "ref-phen",
          mode: "phenomenological",
          label: "Pure Observational",
          proposition: "Upon close introspection, the emergence of a thought is witnessed without any preceding conscious act that designated its content.",
          nonEquivalenceNote: "Keeps strictly to first-person phenomenological reporting without metaphysical extrapolations.",
          whatIsPreserved: "Direct observational fidelity.",
          whatIsAlteredOrLost: "Casual simplicity."
        },
        {
          id: "ref-emp",
          mode: "empirical",
          label: "Cognitive Science",
          proposition: "Cortical language production and ideation occur sub-consciously before reaching threshold activation for conscious broadcast in the global workspace.",
          nonEquivalenceNote: "Translates first-person observation into third-person neuroscience terminology.",
          whatIsPreserved: "The functional separation of generation from conscious reception.",
          whatIsAlteredOrLost: "First-person immediacy."
        }
      ],
      linterWarnings: [
        {
          code: "W004",
          severity: "warning",
          title: "Watch for Inference Jump",
          message: "Do not leap from 'I did not consciously choose this thought' to 'An unconscious homunculus chose it' or 'Agency does not exist'.",
          suggestion: "Maintain the distinction between the observed phenomenon and subsequent theories of determinism."
        },
        {
          code: "INFO",
          severity: "info",
          title: "Observationally Robust",
          message: "This statement accurately describes first-person phenomenology and avoids grammatical confusion when properly bounded.",
          suggestion: "Use as a foundation for observational inquiry rather than speculative metaphysics."
        }
      ],
      unresolvedQuestions: [
        "If thoughts arise spontaneously, what is the nature of subsequent deliberate reasoning, error-correction, and cognitive veto?",
        "Does the concept of 'choice' retain any meaning if applied only after thought emergence?"
      ],
      humilityNote: "This statement represents a legitimate triumph of disciplined observation over grammatical habit; the purpose of debugging here is not to debunk it, but to protect it from runaway metaphysical conclusions."
    }
  },

  "universe-has-a-cause": {
    id: "universe-has-a-cause",
    title: "The universe has a cause",
    category: "Domain Overextension",
    input: "The universe has a cause.",
    previewSummary: "Deconstructs the extension of intra-cosmic causal relations to the universe as a totality (composition error / domain boundary overextension).",
    analysis: {
      id: "preset-universe-cause",
      input: "The universe has a cause.",
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline",
      statementModes: [
        {
          mode: "metaphysical",
          explanation: "Classic cosmological proposition asserting causal dependency for the totality of reality.",
        },
        {
          mode: "philosophical",
          explanation: "Central to cosmological arguments (Kalam, Leibnizian contingency, Russell-Copleston debate).",
        },
        {
          mode: "under-specified",
          explanation: "Fails to specify whether 'cause' means efficient temporal causation, sustaining ontological ground, or logical condition.",
        }
      ],
      verdict: "UNDER-SPECIFIED",
      verdictRationale: "Under-specified and domain-problematic: extends the concept of 'cause' (which is defined between events within space-time) to the totality of space-time itself.",
      termsInUse: [
        {
          term: "The universe",
          roleInSentence: "Grammatical subject denoting the totality of all physical entities, space, and time.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Fallacy of composition: treating the collection of all events as if it were simply another event inside a larger space."
        },
        {
          term: "has a cause",
          roleInSentence: "Relational predicate linking an effect to an antecedent producer or condition.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Causation typically requires a temporal relation (cause precedes effect in time) and a physical context. What does 'cause' mean prior to time?"
        }
      ],
      grammaticalAnalysis: {
        isGrammarMisleading: true,
        summary: "Grammatically parallels 'The car has an engine' or 'The fire has a cause', deceptively implying the universe is an ordinary object inside a broader environment.",
        grammaticalVsLogicalForm: "Grammatically: Concrete Subject + Relational Predicate. Logically: Overextends a two-place relation R(x, y) where x, y ∈ Universe to R(z, Universe), where z must belong outside the totality of all that exists.",
        analogousMisleadingUse: "Russell's famous analogy: 'Every man has a mother, but the human race does not have a mother.'"
      },
      typeErrorAnalysis: {
        hasTypeError: true,
        conceptAnalogy: {
          syntaxIssue: "Domain scope violation / type boundary error.",
          semanticTypeExpected: "IntraCosmicEvent | PhysicalStateChange",
          semanticTypeProvided: "TotalityOfAllStates (Universe)",
          scopeDomain: "Local Spatiotemporal Physics",
          operatorOrReferenceMismatch: "Causal operator defined over subsets of space-time applied to the set containing all space-time.",
          explanation: "Causation is an operator that maps event A to event B within a spatiotemporal frame. Applying it to the frame itself is an out-of-scope domain error."
        }
      },
      truthConditions: {
        applicable: true,
        whatWouldMakeItTrue: "If there existed a meta-spatiotemporal manifold in which the inception of our universe was observed to follow from an antecedent meta-physical state.",
        whatWouldMakeItFalse: "Showing that temporal metrics originate with the universe (Hawking: 'asking what came before is like asking what is north of the North Pole'), or that quantum vacuum fluctuations occur without efficient causes.",
        falsificationCategory: "FRAMEWORK_DEPENDENT",
        falsificationAnalysis: "Cannot be settled empirically without stepping outside the universe, making the claim dependent on metaphysical definitions of 'cause'."
      },
      epistemicLadder: [
        {
          level: "OBSERVATION",
          content: "Everyday physical occurrences (a match lighting, a billiard ball moving) are preceded by identifying conditions.",
          isInferenceJump: false
        },
        {
          level: "DESCRIPTION",
          content: "Local phenomena exhibit predictable regularities and causal chains.",
          isInferenceJump: false
        },
        {
          level: "INTERPRETATION",
          content: "Causality is a universal organizing principle of intelligibility within nature.",
          isInferenceJump: false
        },
        {
          level: "INFERENCE",
          content: "Therefore, all things require an explanation or cause.",
          isInferenceJump: true,
          jumpAlert: "⚠️ INFERENCE JUMP DETECTED: Universalized an inductive heuristic into an absolute metaphysical law (Principle of Sufficient Reason)."
        },
        {
          level: "METAPHYSICAL_CLAIM",
          content: "The totality of the universe itself must have been brought about by an external cause.",
          isInferenceJump: true,
          jumpAlert: "⚠️ METAPHYSICAL LEAP: Extended intra-universe causation across the boundary of all existence."
        }
      ],
      hasInferenceJump: true,
      hiddenAssumptions: [
        {
          id: "HA-1",
          assumption: "Causal rules that apply to parts of the universe apply equally to the universe as a whole.",
          isExplicit: false,
          dependencyRationale: "Classic fallacy of composition (Russell's mother analogy).",
          domainBoundaryWarning: "Parts of a wall are small; the wall is not necessarily small.",
          isIndependentlyJustified: "UNJUSTIFIED"
        },
        {
          id: "HA-2",
          assumption: "'Cause' has a coherent meaning in the absence of pre-existing time.",
          isExplicit: false,
          dependencyRationale: "If time began with the Big Bang, 'cause' cannot mean 'event occurring at t-1'.",
          domainBoundaryWarning: "Requires introducing non-temporal or atemporal causation, which is controversial.",
          isIndependentlyJustified: "OPEN_QUESTION"
        },
        {
          id: "HA-3",
          assumption: "An uncaused state is less acceptable than a postulating a transcendent cause.",
          isExplicit: false,
          dependencyRationale: "If the universe needs a cause, why doesn't the cause of the universe need a cause?",
          domainBoundaryWarning: "Special pleading if the chain is arbitrarily halted.",
          isIndependentlyJustified: "UNJUSTIFIED"
        }
      ],
      wittgensteinDiagnostic: {
        earlyWittgensteinPerspective: "Tractatus 6.362: 'What can be described can also happen, and what is to be excluded by the law of causality cannot even be described.' And 6.44: 'Not how the world is, is the mystical, but that it is.' For early Wittgenstein, the existence of the world is not an empirical fact with a causal explanation inside logic; it is the boundary condition of all facts.",
        laterWittgensteinPerspective: "In later thought, Wittgenstein would examine the language-game of 'cause'. We ask 'What caused the window to break?' because we have criteria for an answer. But when we ask 'What caused the universe?', the language-game has lost its moorings—we don't know what would count as looking for the answer.",
        primaryTension: "Taking a word ('cause') whose application is learned in mundane physical settings and applying it outside any possible context of verification."
      },
      intuitionPreservation: {
        originalThought: "The universe has a cause.",
        apparentLinguisticProblem: "Overextends spatiotemporal causal vocabulary to the non-spatiotemporal boundary of existence.",
        underlyingIntuition: "Wonder at the contingency of existence: that there is something rather than nothing, and that reality exhibits structured intelligibility.",
        preservedCore: "The philosophical recognition of contingency and the shock of existence.",
        lostOrDistortedElements: "The neat mechanistic model of a billiard-ball maker knocking the universe into existence.",
        addedElements: "Epistemic humility regarding the limits of causal language.",
        qualitativeConfidence: "HIGH",
        confidenceRationale: "The wonder at existence is preserved, but freed from the vulnerable machinery of causal overreach."
      },
      reformulations: [
        {
          id: "ref-emp",
          mode: "empirical",
          label: "Physical / Cosmological",
          proposition: "The observable universe expanded from an initial high-density state (Big Bang), prior to which our current formulations of general relativity and space-time break down.",
          nonEquivalenceNote: "Replaces metaphysical 'cause' with physical boundary state.",
          whatIsPreserved: "Physical origins and temporal horizons.",
          whatIsAlteredOrLost: "Any metaphysical answer about why reality exists at all."
        },
        {
          id: "ref-phen",
          mode: "phenomenological",
          label: "Existential / Mystical",
          proposition: "I experience profound wonder at the sheer fact of existence, which feels contingent rather than self-evident.",
          nonEquivalenceNote: "Grounds the feeling in first-person existential awareness.",
          whatIsPreserved: "The emotional and philosophical core of the intuition.",
          whatIsAlteredOrLost: "The assertoric cosmological claim."
        }
      ],
      linterWarnings: [
        {
          code: "W005",
          severity: "warning",
          title: "Causal Domain Overextension",
          message: "'Cause' extended beyond the empirical domain in which causal relations are defined.",
          suggestion: "Clarify whether 'cause' means temporal antecedent, logical ground, or existential wonder."
        },
        {
          code: "W003",
          severity: "warning",
          title: "Fallacy of Composition Risk",
          message: "Assuming that because elements within the universe have causes, the set itself must have a cause.",
          suggestion: "Distinguish intra-cosmic relations from cosmic boundary questions."
        }
      ],
      unresolvedQuestions: [
        "Can a satisfactory account of existence ever be given in terms of causation without infinite regress?",
        "Is the question 'Why does anything exist?' an authentic question or a grammatical illusion?"
      ],
      humilityNote: "Rejecting 'The universe has a cause' as under-specified is not an assertion that the universe is causeless; it is an acknowledgement that our concept of cause is tied to spatiotemporal events within the universe."
    }
  },

  "north-of-north-pole": {
    id: "north-of-north-pole",
    title: "What is north of the North Pole?",
    category: "Malformed Question",
    input: "What is north of the North Pole?",
    previewSummary: "Classic Wittgensteinian malformed question: the grammar requests a location, but the coordinate system has reached its mathematical boundary.",
    analysis: {
      id: "preset-north-pole",
      input: "What is north of the North Pole?",
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline",
      statementModes: [
        {
          mode: "ordinary",
          explanation: "Grammatically structured as a routine spatial inquiry.",
        },
        {
          mode: "logical",
          explanation: "A boundary condition in a coordinate metric system.",
        },
        {
          mode: "under-specified",
          explanation: "A pseudo-question arising from confusing grammatical flexibility with geometric validity.",
        }
      ],
      verdict: "PSEUDO-PROPOSITION SUSPECTED",
      verdictRationale: "Malformed pseudo-question: syntax mimics legitimate questions like 'What is north of Paris?', but 'north' is defined as the gradient toward the North Pole. At the pole, the directional gradient terminates.",
      termsInUse: [
        {
          term: "north of",
          roleInSentence: "Directional vector predicate defined on the surface of an oblate spheroid.",
          isPhilosophicallyLoaded: false,
          potentialGrammaticalIllusion: "Assuming a directional operator can be applied recursively indefinitely."
        },
        {
          term: "North Pole",
          roleInSentence: "The singular coordinate point at latitude 90°N where all meridians converge.",
          isPhilosophicallyLoaded: false
        }
      ],
      grammaticalAnalysis: {
        isGrammarMisleading: true,
        summary: "Language permits any place name to be slotted into 'What is north of X?'. But geometry does not permit all points to have a northerly direction.",
        grammaticalVsLogicalForm: "Grammatically: Interrogative pronoun + Verb + Prepositional phrase. Logically: The function North(x) is undefined at x = North Pole, because North(x) = {y | Latitude(y) > Latitude(x)}, and Max(Latitude) = 90°.",
        analogousMisleadingUse: "Compare 'What is colder than absolute zero?' or 'What is smaller than zero size?' or 'What happened before time began?'"
      },
      typeErrorAnalysis: {
        hasTypeError: true,
        conceptAnalogy: {
          syntaxIssue: "Boundary overflow / index out of bounds error.",
          semanticTypeExpected: "Latitude < 90°",
          semanticTypeProvided: "Latitude = 90° (Extremum)",
          scopeDomain: "Spherical Coordinate Geometry",
          operatorOrReferenceMismatch: "Applying an incremental operator (y > x) at the supremum of the closed interval [-90°, +90°].",
          explanation: "In software terms: an off-by-one or domain boundary exception. The question attempts to index beyond the array bound of the coordinate system."
        }
      },
      questionDiagnostic: {
        isQuestion: true,
        requestedExplanationType: "DOMAIN_ERROR",
        spatialOrMetaphoricalShift: "Confuses a local directional vector with an infinite Euclidean plane.",
        whatWouldCountAsAnAnswer: "Nothing can count as a spatial answer because every direction from the North Pole is South. An answer can only be a correction of the coordinate misconception.",
        clarificationSubQuestions: [
          "Do you mean leaving the spherical surface into space (altitude)?",
          "Are you assuming Euclidean flat geometry rather than spherical geometry?"
        ],
        wellFormednessVerdict: "MALFORMED_BOUNDARY_ERROR",
        diagnosticAdvice: "Before attempting to answer a question, examine whether the terms of the question permit any valid state of affairs to constitute an answer."
      },
      truthConditions: {
        applicable: false,
        falsificationCategory: "CATEGORY_CONFUSED",
        falsificationAnalysis: "Questions do not have truth values, but its presupposition ('There exists a location north of the North Pole') is geometrically impossible under spherical navigation."
      },
      epistemicLadder: [
        {
          level: "OBSERVATION",
          content: "Wherever I stand on Earth, I can turn north and move toward higher latitudes.",
          isInferenceJump: false
        },
        {
          level: "DESCRIPTION",
          content: "The north-facing direction is consistently available at my temperate coordinates.",
          isInferenceJump: false
        },
        {
          level: "INTERPRETATION",
          content: "I conceptualize 'north' as an endless direction running across an infinite plane.",
          isInferenceJump: false
        },
        {
          level: "INFERENCE",
          content: "Therefore, every point on Earth must have another point north of it.",
          isInferenceJump: true,
          jumpAlert: "⚠️ INFERENCE JUMP DETECTED: Illegitimate extrapolation from local flat experience to global spherical topology."
        },
        {
          level: "METAPHYSICAL_CLAIM",
          content: "There must be a mysterious 'somewhere' beyond the pole that our geography conceals.",
          isInferenceJump: true,
          jumpAlert: "⚠️ PSEUDO-MYSTERY GENERATED: Fabricating a mystery out of a grammar failure."
        }
      ],
      hasInferenceJump: true,
      hiddenAssumptions: [
        {
          id: "HA-1",
          assumption: "The topology of Earth is an infinite Euclidean plane rather than a closed spherical manifold.",
          isExplicit: false,
          dependencyRationale: "Only on a plane does an arrow have infinite extension without termination.",
          domainBoundaryWarning: "Spherical geometry wraps lines of longitude to a singularity at the poles.",
          isIndependentlyJustified: "UNJUSTIFIED"
        }
      ],
      wittgensteinDiagnostic: {
        earlyWittgensteinPerspective: "In the Tractatus (4.003): 'Most of the propositions and questions to be found in philosophical works are not false but nonsensical... And it is not surprising that the deepest problems are in fact not problems at all.' 'What is north of the North Pole' is the archetypal model of a pseudo-question.",
        laterWittgensteinPerspective: "Wittgenstein in Philosophical Investigations repeatedly notes that our grammar produces questions where our language 'goes on holiday'. The gears are turning without engaging the machine. The grammar allows us to ask it, but no rule in the game assigns an answer.",
        primaryTension: "Grammar permits the question; geometry forbids the answer."
      },
      intuitionPreservation: {
        originalThought: "What is north of the North Pole?",
        apparentLinguisticProblem: "Syntactic structure requests a coordinate that does not exist in the coordinate system.",
        underlyingIntuition: "Inquiry into what lies beyond the boundary of a closed system.",
        preservedCore: "The desire to explore boundary conditions and understand what happens at extremes.",
        lostOrDistortedElements: "The literal spatial direction 'north'.",
        addedElements: "Topological understanding that boundaries of coordinate systems are not walls, but singularities.",
        qualitativeConfidence: "HIGH",
        confidenceRationale: "Stephen Hawking used this exact analogy to explain the beginning of time: asking what happened before the Big Bang is like asking what is north of the North Pole."
      },
      reformulations: [
        {
          id: "ref-geo",
          mode: "ordinary_language",
          label: "Geometric Clarification",
          proposition: "At the North Pole, every direction along the surface of the Earth is South; the coordinate 'north' reaches its supremum at 90°N.",
          nonEquivalenceNote: "Replaces the interrogative search for a location with an explanation of coordinate structure.",
          whatIsPreserved: "Clarity on coordinate limits.",
          whatIsAlteredOrLost: "The puzzle."
        }
      ],
      linterWarnings: [
        {
          code: "W002",
          severity: "warning",
          title: "Coordinate Boundary Exception",
          message: "Spatial vector applied at the coordinate singularity where the metric terminates.",
          suggestion: "Recognize that 'north' is not an entity or infinite space, but a direction defined toward the pole."
        }
      ],
      unresolvedQuestions: [
        "How many famous philosophical mysteries (e.g. 'What happened before time?') are identical in structure to 'What is north of the North Pole?'"
      ],
      humilityNote: "Demonstrating that the question is malformed is not a dismissal of curiosity, but the ultimate philosophical service: saving the mind from looking for a room in a house that doesn't exist."
    }
  },

  "self-behind-consciousness": {
    id: "self-behind-consciousness",
    title: "The self is behind consciousness",
    category: "Grammatical Illusion",
    input: "The self is behind consciousness.",
    previewSummary: "Diagnoses spatial prepositions ('behind') applied to the subject-object structure of consciousness.",
    analysis: {
      id: "preset-self-behind",
      input: "The self is behind consciousness.",
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline",
      statementModes: [
        {
          mode: "phenomenological",
          explanation: "Attempts to describe the feeling of an observer witnessing sensory experience.",
        },
        {
          mode: "metaphysical",
          explanation: "Cartesian or Vedantic postulation of a transcendental witnessing self (sāksin / res cogitans).",
        },
        {
          mode: "metaphorical",
          explanation: "Spatial metaphor ('behind') borrowed from visual theater or the body.",
        }
      ],
      verdict: "CATEGORYALLY PROBLEMATIC",
      verdictRationale: "Category mistake and spatial metaphor: 'behind' is a spatial coordinate in physical space, here used metaphorically to posit an observer standing outside awareness.",
      termsInUse: [
        {
          term: "The self",
          roleInSentence: "Grammatical subject treated as an entity or agent possessing a position.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Homunculus fallacy: treating the observer of experience as a mini-person inside experience."
        },
        {
          term: "behind",
          roleInSentence: "Spatial relational preposition.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Converts an epistemic condition (awareness) into an architectural space with a front and back."
        },
        {
          term: "consciousness",
          roleInSentence: "Object of the preposition, treated as a screen or room.",
          isPhilosophicallyLoaded: true
        }
      ],
      grammaticalAnalysis: {
        isGrammarMisleading: true,
        summary: "Models consciousness on a theatrical stage where the 'self' sits backstage or in the audience watching the show.",
        grammaticalVsLogicalForm: "Grammatically: Object A is behind Object B. Logically: Experience contains objects (sounds, sights, thoughts), but the witnessing capacity is not another object situated in a spatial coordinate.",
        analogousMisleadingUse: "Compare 'The eye is behind the visual field'. The eye is not in the visual field; you cannot see the eye that sees."
      },
      typeErrorAnalysis: {
        hasTypeError: true,
        conceptAnalogy: {
          syntaxIssue: "Spatial predicate applied to non-spatial epistemic field.",
          semanticTypeExpected: "PhysicalCoordinate | SpatialObject",
          semanticTypeProvided: "ConsciousSubject",
          scopeDomain: "Euclidean Spatial Geometry",
          operatorOrReferenceMismatch: "Spatial locator 'behind(x, y)' requires x and y to share a coordinate frame.",
          explanation: "Consciousness is the domain within which spatial concepts arise. Situating the self 'behind' consciousness attempts to locate the container inside its own contents."
        }
      },
      truthConditions: {
        applicable: false,
        falsificationCategory: "CATEGORY_CONFUSED",
        falsificationAnalysis: "Cannot be verified or falsified because 'behind' has no operational meaning when applied to consciousness. No instrument can travel behind awareness to check."
      },
      epistemicLadder: [
        {
          level: "OBSERVATION",
          content: "I notice thoughts, sensations, and sights appearing, and there is a sense of knowing them.",
          isInferenceJump: false
        },
        {
          level: "DESCRIPTION",
          content: "There is a subjective asymmetry between known objects and the knowing faculty.",
          isInferenceJump: false
        },
        {
          level: "INTERPRETATION",
          content: "I experience this knowing as if looking from a vantage point located behind my eyes.",
          isInferenceJump: false
        },
        {
          level: "INFERENCE",
          content: "Therefore, there is an entity called 'the self' stationed behind experience.",
          isInferenceJump: true,
          jumpAlert: "⚠️ INFERENCE JUMP DETECTED: Conflated bodily sensation (behind the eyes) with an ontological entity ('the self') behind consciousness."
        },
        {
          level: "METAPHYSICAL_CLAIM",
          content: "An immortal or transcendental witness exists in a metaphysical space behind awareness.",
          isInferenceJump: true,
          jumpAlert: "⚠️ METAPHYSICAL LEAP: Substantive Cartesian ego postulation."
        }
      ],
      hasInferenceJump: true,
      hiddenAssumptions: [
        {
          id: "HA-1",
          assumption: "Consciousness has a front and a back (spatial dimensions).",
          isExplicit: false,
          dependencyRationale: "The preposition 'behind' requires a directional orientation in space.",
          domainBoundaryWarning: "Spatializing conscious experience.",
          isIndependentlyJustified: "UNJUSTIFIED"
        },
        {
          id: "HA-2",
          assumption: "Every act of knowing requires a separate entity that does the knowing.",
          isExplicit: false,
          dependencyRationale: "Grammar requires a subject for every verb ('I see'), leading to the postulation of a separate seer.",
          domainBoundaryWarning: "Wittgenstein/Nāgārjuna critique of the substantial subject.",
          isIndependentlyJustified: "FRAMEWORK_ASSUMPTION"
        }
      ],
      wittgensteinDiagnostic: {
        earlyWittgensteinPerspective: "Tractatus 5.632-5.6331: 'The subject does not belong to the world: rather, it is a limit of the world. Where in the world is a metaphysical subject to be found? You will say that this is like the case of the eye and the visual field. But you do not really see the eye. And nothing in the visual field allows you to infer that it is seen by an eye.'",
        laterWittgensteinPerspective: "In the Blue Book, Wittgenstein analyzes the use of the word 'I' as object vs 'I' as subject. When we try to locate the 'I' as an object, we find ourselves pointing to our chest or head, confusing bodily sensations with the grammatical subject.",
        primaryTension: "Attempting to locate the subject of experience as if it were an object inside (or behind) the experience."
      },
      intuitionPreservation: {
        originalThought: "The self is behind consciousness.",
        apparentLinguisticProblem: "Uses a spatial preposition ('behind') to reify an introspective vantage point into an architectural entity.",
        underlyingIntuition: "The asymmetry of awareness: you cannot turn consciousness into an object you can inspect from the outside, because it is the very ground of inspection.",
        preservedCore: "The non-objectifiable nature of conscious awareness.",
        lostOrDistortedElements: "The imagery of a little man sitting in a control room behind the brain.",
        addedElements: "Rigorous clarity on the limit-nature of the subject.",
        qualitativeConfidence: "HIGH",
        confidenceRationale: "Preserves the profound insight of subjectivity without the clumsy homunculus error."
      },
      reformulations: [
        {
          id: "ref-phen",
          mode: "phenomenological",
          label: "Phenomenological",
          proposition: "Awareness is the non-objective horizon within which all experiences appear; it cannot itself be encountered as an object within that horizon.",
          nonEquivalenceNote: "Replaces spatial 'behind' with the horizon of appearance.",
          whatIsPreserved: "The ungraspable nature of the witness.",
          whatIsAlteredOrLost: "The spatial theatre metaphor."
        }
      ],
      linterWarnings: [
        {
          code: "W002",
          severity: "warning",
          title: "Spatial Predicate Metaphysically Extended",
          message: "'Behind' is a spatial coordinate applied to consciousness, which has no spatial boundaries.",
          suggestion: "Replace with 'is the condition for' or 'is the non-objective ground of'."
        },
        {
          code: "W003",
          severity: "warning",
          title: "Homunculus Fallacy Risk",
          message: "Treating the self as an observer stationed behind the show of consciousness.",
          suggestion: "Examine whether the observer is anything other than the awareness of the observed."
        }
      ],
      unresolvedQuestions: [
        "Why does human introspection so persistently generate the bodily sensation of looking from behind the eyes?",
        "Can there be awareness without an 'I' who is aware (Buddhistic anattā)?"
      ],
      humilityNote: "Deconstructing 'behind' does not dismiss the mystery of the first-person perspective; it frees it from an erroneous spatial geography."
    }
  },

  "nothing-exists-outside-consciousness": {
    id: "nothing-exists-outside-consciousness",
    title: "Nothing exists outside consciousness",
    category: "Grammatical Illusion",
    input: "Nothing exists outside consciousness.",
    previewSummary: "Examines multiple ambiguities in 'nothing', 'exists', 'outside', and 'consciousness' (Idealism vs Phenomenological boundary).",
    analysis: {
      id: "preset-nothing-outside",
      input: "Nothing exists outside consciousness.",
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline",
      statementModes: [
        {
          mode: "metaphysical",
          explanation: "Subjective Idealism (solipsism or Berkeleyan idealism).",
        },
        {
          mode: "phenomenological",
          explanation: "Tautological reflection that whatever is experienced is, by definition, within consciousness.",
        },
        {
          mode: "ambiguous",
          explanation: "Heavily ambiguous between an epistemic claim ('We can only know what enters consciousness') and an ontological claim ('Matter does not exist unperceived').",
        }
      ],
      verdict: "AMBIGUOUS",
      verdictRationale: "Equivocates between an epistemic truism (we cannot consciously experience what is outside consciousness) and a radical metaphysical assertion (unobserved reality does not exist).",
      termsInUse: [
        {
          term: "Nothing",
          roleInSentence: "Universal negative quantifier treated as if it denotes an emptiness or totality.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Treating 'nothing' as a thing that does not exist, or using it to mask an epistemic limit as an ontological fact."
        },
        {
          term: "outside",
          roleInSentence: "Spatial / topological exteriority operator.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Does consciousness have a spatial container boundary with an 'inside' and an 'outside'?"
        },
        {
          term: "consciousness",
          roleInSentence: "Container noun.",
          isPhilosophicallyLoaded: true
        }
      ],
      grammaticalAnalysis: {
        isGrammarMisleading: true,
        summary: "Uses container grammar ('inside/outside consciousness') and negative quantification to create an appearance of an absolute cosmological boundary.",
        grammaticalVsLogicalForm: "Grammatically: Quantifier (Nothing) + Verb (exists) + Spatial condition (outside X). Logically: For any x, if x is experienced, x is an element of conscious experience. This does not entail that non-experienced entities are impossible.",
        analogousMisleadingUse: "Like someone wearing blue glasses claiming 'Nothing non-blue exists in the room'."
      },
      typeErrorAnalysis: {
        hasTypeError: true,
        conceptAnalogy: {
          syntaxIssue: "Confusing quantifier scope and domain of discourse.",
          semanticTypeExpected: "OntologicalReality",
          semanticTypeProvided: "EpistemicAccessHorizon",
          scopeDomain: "Epistemology vs Ontology",
          operatorOrReferenceMismatch: "Conflating ~∃x (Outside(x, C)) with ∀x (Known(x) → Inside(x, C)).",
          explanation: "From the fact that you cannot step outside your mind to verify what is outside, you cannot deduce that there is no outside."
        }
      },
      truthConditions: {
        applicable: true,
        whatWouldMakeItTrue: "If reality is fundamentally mental (idealism) and physical objects are solely perceptions.",
        whatWouldMakeItFalse: "Geological/astronomical evidence that stars, planets, and dinosaurs existed millions of years prior to the evolution of conscious nervous systems.",
        falsificationCategory: "FRAMEWORK_DEPENDENT",
        falsificationAnalysis: "Under empirical realism, it is decisively false (the Earth existed before consciousness). Under strict solipsism, it is unfalsifiable and vacuous."
      },
      epistemicLadder: [
        {
          level: "OBSERVATION",
          content: "Everything I ever experience or talk about is an event appearing within my consciousness.",
          isInferenceJump: false
        },
        {
          level: "DESCRIPTION",
          content: "Consciousness is my inescapable epistemic horizon.",
          isInferenceJump: false
        },
        {
          level: "INTERPRETATION",
          content: "I cannot conceive of an unexperienced object without thereby conceiving it in consciousness.",
          isInferenceJump: false
        },
        {
          level: "INFERENCE",
          content: "Therefore, unperceived objects cannot exist.",
          isInferenceJump: true,
          jumpAlert: "⚠️ INFERENCE JUMP DETECTED: Jumped from an epistemic limitation (Berkeley's master argument) to an ontological negation."
        },
        {
          level: "METAPHYSICAL_CLAIM",
          content: "Consciousness is the sole constituent of all reality; external material reality is an illusion.",
          isInferenceJump: true,
          jumpAlert: "⚠️ METAPHYSICAL LEAP: Dogmatic idealism."
        }
      ],
      hasInferenceJump: true,
      hiddenAssumptions: [
        {
          id: "HA-1",
          assumption: "To exist is to be perceived (esse est percipi).",
          isExplicit: false,
          dependencyRationale: "Equates existence with conscious appearance.",
          domainBoundaryWarning: "Reduces ontology to epistemology without independent justification.",
          isIndependentlyJustified: "UNJUSTIFIED"
        },
        {
          id: "HA-2",
          assumption: "'Outside' is a valid concept when applied to consciousness.",
          isExplicit: true,
          dependencyRationale: "Assumes consciousness is an enclosure with an interior and exterior.",
          domainBoundaryWarning: "Topological container metaphor.",
          isIndependentlyJustified: "FRAMEWORK_ASSUMPTION"
        }
      ],
      wittgensteinDiagnostic: {
        earlyWittgensteinPerspective: "Tractatus 5.62: 'What the solipsist means is quite correct; only it cannot be said, but makes itself manifest. The world is my world: this is manifest in the fact that the limits of language (of that language which alone I understand) mean the limits of my world.' The moment solipsism tries to state itself as a proposition about the world, it fails.",
        laterWittgensteinPerspective: "Wittgenstein in Philosophical Investigations (§§24-26) shows how solipsism is born from a confusion in our grammar of 'private experience'. The words 'consciousness', 'exist', and 'outside' only get their meaning from our shared public language.",
        primaryTension: "Using public language (which presupposes an external shared world) to assert that nothing exists outside private awareness."
      },
      intuitionPreservation: {
        originalThought: "Nothing exists outside consciousness.",
        apparentLinguisticProblem: "Equivocates between an epistemic condition and an ontological negation, while using an unexamined container metaphor.",
        underlyingIntuition: "The inescapable primacy of first-person experience: all knowledge, physics, and philosophy are ultimately phenomena witnessed in awareness.",
        preservedCore: "The experiential primacy of consciousness as the medium through which all reality is known.",
        lostOrDistortedElements: "The dogmatic denial of the mind-independent universe.",
        addedElements: "Epistemic rigor distinguishing what is known from what exists.",
        qualitativeConfidence: "HIGH",
        confidenceRationale: "The phenomenological reality of awareness as the epistemic medium is preserved without falling into solipsistic absurdity."
      },
      reformulations: [
        {
          id: "ref-phen",
          mode: "phenomenological",
          label: "Epistemic / Phenomenological",
          proposition: "No entity, theory, or object can be known or discussed except as it appears within the field of conscious awareness.",
          nonEquivalenceNote: "Binds the claim to knowledge and appearance rather than denying physical reality.",
          whatIsPreserved: "The inescapable primacy of experience.",
          whatIsAlteredOrLost: "The radical metaphysical assertion of idealism."
        }
      ],
      linterWarnings: [
        {
          code: "W001",
          severity: "warning",
          title: "Epistemic-to-Ontological Equivocation",
          message: "Conflating 'cannot be experienced outside consciousness' with 'cannot exist outside consciousness'.",
          suggestion: "Separate what is empirically accessible from what ontologically exists."
        },
        {
          code: "W002",
          severity: "warning",
          title: "Spatial Container Metaphor for Mind",
          message: "'Outside consciousness' treats mind as a bounded box.",
          suggestion: "Clarify whether you mean 'independent of mind' or 'non-conscious'."
        }
      ],
      unresolvedQuestions: [
        "Can a sentence like 'Reality is independent of consciousness' have any verifiable empirical sense?",
        "Does the hard problem of consciousness arise from the very container metaphor we use to define it?"
      ],
      humilityNote: "Rejecting this proposition as ambiguous is not a dismissal of the marvel of awareness; it is an insistence that we do not mistake our epistemic doorway for the entire house of reality."
    }
  },

  "why-something-rather-than-nothing": {
    id: "why-something-rather-than-nothing",
    title: "Why is there something rather than nothing?",
    category: "Malformed Question",
    input: "Why is there something rather than nothing?",
    previewSummary: "Leibniz's ultimate question diagnosed: what kind of answer is requested, and does causal language apply to the totality of being?",
    analysis: {
      id: "preset-why-something",
      input: "Why is there something rather than nothing?",
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline",
      statementModes: [
        {
          mode: "metaphysical",
          explanation: "The primordial metaphysical question of Leibniz, Heidegger, and Schelling.",
        },
        {
          mode: "existential",
          explanation: "Expression of radical ontological vertigo.",
        },
        {
          mode: "under-specified",
          explanation: "Under-specified because the conditions for what would count as a satisfactory answer are structurally impossible to fulfill.",
        }
      ],
      verdict: "UNDER-SPECIFIED",
      verdictRationale: "Structurally problematic question: any proposed answer ('There is something because of X') either introduces another 'something' (leaving the question unanswered) or appeals to 'nothing' (which by definition has no causal powers).",
      termsInUse: [
        {
          term: "Why",
          roleInSentence: "Interrogative adverb requesting a reason, cause, or justification.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Assuming that because 'why' is valid for events within reality, it must be valid for reality itself."
        },
        {
          term: "something",
          roleInSentence: "Universal existential quantifier representing all of existence.",
          isPhilosophicallyLoaded: true
        },
        {
          term: "nothing",
          roleInSentence: "Absolute absence of being, deceptively reified as an alternative baseline state.",
          isPhilosophicallyLoaded: true,
          potentialGrammaticalIllusion: "Treating 'nothing' as a default background state that requires less explanation than 'something'."
        }
      ],
      grammaticalAnalysis: {
        isGrammarMisleading: true,
        summary: "Presents 'nothing' as a default state and 'something' as an improbable deviation requiring a special explanation.",
        grammaticalVsLogicalForm: "Grammatically: Interrogative of reason comparing State A to State B. Logically: An inescapable explanatory regress: any explanation E for 'something' must itself be 'something'.",
        analogousMisleadingUse: "Asking 'Why do rules exist?' where any justification must appeal to a rule."
      },
      typeErrorAnalysis: {
        hasTypeError: true,
        conceptAnalogy: {
          syntaxIssue: "Self-referential explanatory regress.",
          semanticTypeExpected: "ExternalCauseNotIncludedInDomain",
          semanticTypeProvided: "TotalDomainOfBeing",
          scopeDomain: "Metaphysical Epistemology",
          operatorOrReferenceMismatch: "The 'Why' operator requires an antecedent outside the explanandum, but the explanandum includes everything.",
          explanation: "If answer X explains why there is something, X is either part of 'something' (circular) or 'nothing' (non-explanatory)."
        }
      },
      questionDiagnostic: {
        isQuestion: true,
        requestedExplanationType: "ONTOLOGICAL",
        spatialOrMetaphoricalShift: "Treating non-existence as a default canvas upon which existence was painted.",
        whatWouldCountAsAnAnswer: "Nothing can count as an answer in standard causal or logical terms, because any factor cited to explain existence is already existent.",
        clarificationSubQuestions: [
          "Are you asking for a causal mechanism (which requires existing laws)?",
          "Are you asking for a purpose (which requires an existing mind)?",
          "Are you expressing existential vertigo at the fact that reality is?"
        ],
        wellFormednessVerdict: "STRUCTURALLY_REGRESSIVE_QUESTION",
        diagnosticAdvice: "Recognize that the question requests a type of answer that language and logic cannot coherently provide without self-contradiction."
      },
      truthConditions: {
        applicable: false,
        falsificationCategory: "UNDER_SPECIFIED",
        falsificationAnalysis: "A question has no truth conditions. As an explanatory demand, it cannot be satisfied within formal or empirical logic."
      },
      epistemicLadder: [
        {
          level: "OBSERVATION",
          content: "Things exist, and their presence is palpable and inescapable.",
          isInferenceJump: false
        },
        {
          level: "DESCRIPTION",
          content: "Individual items come into existence and perish according to causal laws.",
          isInferenceJump: false
        },
        {
          level: "INTERPRETATION",
          content: "Because individual things can fail to exist, perhaps all of existence could have failed to exist.",
          isInferenceJump: false
        },
        {
          level: "INFERENCE",
          content: "Therefore, non-existence ('nothing') is the default baseline state of reality.",
          isInferenceJump: true,
          jumpAlert: "⚠️ INFERENCE JUMP DETECTED: Treating 'nothing' as a natural baseline rather than a human conceptual negation."
        },
        {
          level: "METAPHYSICAL_CLAIM",
          content: "There must be a transcendent explanation or reason why being overcame nothingness.",
          isInferenceJump: true,
          jumpAlert: "⚠️ METAPHYSICAL LEAP: Demanding an explanation outside the totality of all possible explanations."
        }
      ],
      hasInferenceJump: true,
      hiddenAssumptions: [
        {
          id: "HA-1",
          assumption: "'Nothing' is a default baseline state, and 'Something' is an anomaly requiring explanation.",
          isExplicit: false,
          dependencyRationale: "Why not assume 'Something' is the necessary baseline?",
          domainBoundaryWarning: "Asymmetric prejudice favoring non-being over being.",
          isIndependentlyJustified: "UNJUSTIFIED"
        },
        {
          id: "HA-2",
          assumption: "The Principle of Sufficient Reason applies beyond contingent things to the totality of existence.",
          isExplicit: false,
          dependencyRationale: "Assumes existence itself is an effect that demands a reason.",
          domainBoundaryWarning: "Extrapolates conversational 'Why' to universal ontology.",
          isIndependentlyJustified: "OPEN_QUESTION"
        }
      ],
      wittgensteinDiagnostic: {
        earlyWittgensteinPerspective: "Tractatus 6.44: 'Not how the world is, is the mystical, but that it is.' And 6.5: 'When the answer cannot be put into words, neither can the question be put into words. The riddle does not exist. If a question can be framed at all, it is also possible to answer it.' For Wittgenstein, the existence of the world is the mystical limit, not an empirical problem.",
        laterWittgensteinPerspective: "In later reflections, Wittgenstein would note that we are gripped by the form of our question 'Why is X so?'. Because we can ask 'Why is the chair green?', we think we can ask 'Why is there a world?'. But the language-game of giving reasons has an end—it ends in forms of life and facts that are simply there.",
        primaryTension: "Demanding a reason for the existence of the very framework within which reasons exist."
      },
      intuitionPreservation: {
        originalThought: "Why is there something rather than nothing?",
        apparentLinguisticProblem: "Demands a cause or reason outside the domain of all causes and reasons, leading to infinite regress.",
        underlyingIntuition: "The profound existential vertigo and awe that reality is fundamentally present and gratuitous.",
        preservedCore: "The astonishment that existence is.",
        lostOrDistortedElements: "The demand for a neat causal story or cosmic mechanic.",
        addedElements: "Clarity that the riddle is an expression of awe rather than an unanswered equation.",
        qualitativeConfidence: "HIGH",
        confidenceRationale: "Honors the depth of the feeling while liberating the intellect from chasing a phantom causal answer."
      },
      reformulations: [
        {
          id: "ref-phen",
          mode: "phenomenological",
          label: "Existential / Wonder",
          proposition: "I am struck by the sheer gratuitousness of existence, which is not necessitated by any prior justification I can conceptualize.",
          nonEquivalenceNote: "Converts the impossible explanatory demand into an authentic statement of existential awe.",
          whatIsPreserved: "The emotional and philosophical shock of being.",
          whatIsAlteredOrLost: "The demand for a deductive proof or cause."
        }
      ],
      linterWarnings: [
        {
          code: "W005",
          severity: "warning",
          title: "Explanatory Horizon Regress",
          message: "Asking for a reason outside the domain of all possible reasons generates a circular regress.",
          suggestion: "Debug the question: clarify what would count as an answer before seeking one."
        },
        {
          code: "INFO",
          severity: "info",
          title: "The Mystical Boundary",
          message: "This question marks the boundary of language where explanations stop and contemplation begins.",
          suggestion: "Treat as an existential reflection rather than a technical problem."
        }
      ],
      unresolvedQuestions: [
        "Is 'existence' a brute fact, or does it make sense to speak of reality as self-necessitating?",
        "Why does non-existence feel simpler to human intuition than existence?"
      ],
      humilityNote: "Debugging the question 'Why is there something?' does not trivialize it; it clarifies that the deepest philosophical response to existence is not a cosmological formula, but contemplative awareness."
    }
  },

  "mountain-is-silent": {
    id: "mountain-is-silent",
    title: "The mountain is silent",
    category: "Poetic vs Scientific",
    input: "The mountain is silent.",
    previewSummary: "Crucial test case: ensures the debugger does NOT destroy poetic/aesthetic language or reduce it to scientific acoustic measurements.",
    analysis: {
      id: "preset-mountain-silent",
      input: "The mountain is silent.",
      timestamp: new Date().toISOString(),
      engineUsed: "canonical_offline",
      statementModes: [
        {
          mode: "poetic",
          explanation: "Evocative aesthetic expression conveying majesty, stillness, and presence.",
        },
        {
          mode: "phenomenological",
          explanation: "Reflects the subjective atmosphere of standing in a massive alpine landscape.",
        },
        {
          mode: "ordinary",
          explanation: "Natural everyday poetic observation.",
        }
      ],
      verdict: "POETIC",
      verdictRationale: "Completely legitimate and meaningful as a poetic, aesthetic, and phenomenological expression; only problematic if misconstrued as a strict acoustic physics assertion (zero decibels).",
      termsInUse: [
        {
          term: "The mountain",
          roleInSentence: "Geological feature treated as an aesthetic presence.",
          isPhilosophicallyLoaded: false
        },
        {
          term: "is silent",
          roleInSentence: "Predicate attributing absence of speech or profound stillness.",
          isPhilosophicallyLoaded: false,
          potentialGrammaticalIllusion: "Silence in human terms means refraining from speech; applied to rock, it signifies stillness rather than intentional withholding of voice."
        }
      ],
      grammaticalAnalysis: {
        isGrammarMisleading: false,
        summary: "The grammar is completely transparent and natural within its proper poetic language-game.",
        grammaticalVsLogicalForm: "Grammatically: Subject + Copula + Adjective. Poetically: Evokes the stillness and majesty of nature. Scientifically: The geological mass produces minimal acoustic emissions above ambient threshold.",
        analogousMisleadingUse: "Only problematic if someone pedantically argues: 'Incorrect! Wind is whistling over the rocks at 45 dB, and seismic vibrations are occurring, so the mountain is not silent!'"
      },
      typeErrorAnalysis: {
        hasTypeError: false,
        conceptAnalogy: {
          explanation: "No type error exists within the poetic or phenomenological mode. A type error only occurs if a scientific verificationist insists on treating it as a laboratory acoustic measurement."
        }
      },
      truthConditions: {
        applicable: true,
        whatWouldMakeItTrue: "In poetry/phenomenology: The experiential presence of deep alpine stillness. In acoustics: Total absence of sound vibrations (impossible in terrestrial atmosphere).",
        whatWouldMakeItFalse: "If rockfalls, avalanches, or howling gales dominate the auditory field.",
        falsificationCategory: "METAPHORICAL_NOT_APPLICABLE",
        falsificationAnalysis: "Aesthetic appropriateness rather than binary empirical falsification."
      },
      epistemicLadder: [
        {
          level: "OBSERVATION",
          content: "I stand before the mountain; there is an absence of human chatter, machinery, or loud commotion.",
          isInferenceJump: false
        },
        {
          level: "DESCRIPTION",
          content: "The acoustic environment is calm, with low ambient noise.",
          isInferenceJump: false
        },
        {
          level: "INTERPRETATION",
          content: "The mountain feels ancient, unmoved, and peacefully still.",
          isInferenceJump: false
        },
        {
          level: "INFERENCE",
          content: "Silence is an intrinsic virtue or quality of this landscape.",
          isInferenceJump: false
        },
        {
          level: "METAPHYSICAL_CLAIM",
          content: "The mountain possesses a conscious spiritual presence that chooses silence.",
          isInferenceJump: true,
          jumpAlert: "⚠️ METAPHYSICAL LEAP: Converting an aesthetic perception of stillness into an animist attribution of conscious restraint."
        }
      ],
      hasInferenceJump: false,
      hiddenAssumptions: [
        {
          id: "HA-1",
          assumption: "'Silence' can meaningfully describe an environment rather than an agent who refrains from talking.",
          isExplicit: false,
          dependencyRationale: "Standard poetic and ordinary language usage.",
          domainBoundaryWarning: "Harmless metaphor that causes no philosophical confusion unless animism is asserted.",
          isIndependentlyJustified: "JUSTIFIED"
        }
      ],
      wittgensteinDiagnostic: {
        earlyWittgensteinPerspective: "In the Tractatus (6.522): 'There are, indeed, things that cannot be put into words. They make themselves manifest. They are what is mystical.' And the preface: 'What can be said at all can be said clearly; and whereof one cannot speak thereof one must be silent.' Poetic language often gestures toward what shows itself.",
        laterWittgensteinPerspective: "Wittgenstein in Philosophical Investigations vigorously defends ordinary and poetic language against scientific reductionism. The language-game of poetry has its own life, criteria, and beauty. To attack 'The mountain is silent' with a decibel meter is a misunderstanding of how words work.",
        primaryTension: "Preserving the dignity and legitimacy of aesthetic language without forcing it through a narrow scientific verification mill."
      },
      intuitionPreservation: {
        originalThought: "The mountain is silent.",
        apparentLinguisticProblem: "None in ordinary/poetic life. Only becomes problematic if animism or strict acoustic literalism is forced upon it.",
        underlyingIntuition: "The profound aesthetic and phenomenological experience of stillness, scale, and quiet majesty in nature.",
        preservedCore: "The evocative power of the aesthetic experience.",
        lostOrDistortedElements: "None.",
        addedElements: "Protection against scientistic reductionism.",
        qualitativeConfidence: "HIGH",
        confidenceRationale: "The application honors the user's poetic voice and guards it against dogmatic over-analysis."
      },
      reformulations: [
        {
          id: "ref-poet",
          mode: "poetic",
          label: "Poetic / Aesthetic (Original)",
          proposition: "The mountain is silent.",
          nonEquivalenceNote: "Needs no reduction. Perfect as it stands.",
          whatIsPreserved: "Everything.",
          whatIsAlteredOrLost: "Nothing."
        },
        {
          id: "ref-emp",
          mode: "empirical",
          label: "Scientific Acoustic (Non-Equivalent)",
          proposition: "The geological formation is currently producing acoustic pressure fluctuations below 20 micro-pascals.",
          nonEquivalenceNote: "Utterly strips the aesthetic meaning; included only to illustrate what scientism does to poetry.",
          whatIsPreserved: "Acoustic physics.",
          whatIsAlteredOrLost: "The entire human meaning of silence."
        }
      ],
      linterWarnings: [
        {
          code: "INFO",
          severity: "info",
          title: "Poetic Language Respected",
          message: "This statement operates within the aesthetic and phenomenological mode. It is NOT defective.",
          suggestion: "Do not allow metaphor to silently transform into a claim about rock telepathy, but enjoy the poetic expression freely."
        }
      ],
      unresolvedQuestions: [
        "What is the difference between an evocative metaphor that illuminates experience and a misleading metaphor that creates a pseudo-problem?",
        "Why does silence in vast natural spaces feel qualitative rather than merely a negative absence of sound?"
      ],
      humilityNote: "PhiloCompiler is not a machine for eradicating poetry or turning every thought into a sterile laboratory report. Its mission is to illuminate how language functions—and poetry is one of language's highest functions."
    }
  }
};

export function getCanonicalPreset(query: string): CanonicalPreset | null {
  const normalized = query.trim().toLowerCase().replace(/[.?!,;:"']/g, "");
  for (const key of Object.keys(CANONICAL_PRESETS)) {
    const preset = CANONICAL_PRESETS[key];
    const presetNorm = preset.input.trim().toLowerCase().replace(/[.?!,;:"']/g, "");
    if (normalized === presetNorm || normalized.includes(presetNorm) || presetNorm.includes(normalized)) {
      return preset;
    }
  }
  return null;
}
