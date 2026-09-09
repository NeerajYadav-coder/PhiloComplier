import { NotebookEntry, ThoughtVersion, VersionDiff } from "../types/notebook";
import { PhilosophicalAnalysisResult, AnyAnalysisResult } from "../types";

const STORAGE_KEY = "philocompiler_notebook_v1";

export function calculateVersionDiff(prev: ThoughtVersion, nextRaw: string, nextTransformed: string): VersionDiff {
  const prevLower = (prev.rawThought + " " + prev.transformedThought).toLowerCase();
  const nextLower = (nextRaw + " " + nextTransformed).toLowerCase();

  const intentionalWords = ["wants", "wants to", "desires", "choosing", "intends", "purpose"];
  const prevHadIntent = intentionalWords.some(w => prevLower.includes(w));
  const nextHasIntent = intentionalWords.some(w => nextLower.includes(w));
  const intentionalityRemoved = prevHadIntent && !nextHasIntent;

  const observationalWords = ["observe", "witness", "notice", "experience", "introspect", "reported"];
  const prevHadObs = observationalWords.some(w => prevLower.includes(w));
  const nextHasObs = observationalWords.some(w => nextLower.includes(w));
  const observationalBoundaryClarified = !prevHadObs && nextHasObs;

  const physicalWords = ["systems", "feedback", "dynamics", "relative", "entropy", "processes"];
  const nextHasPhysical = physicalWords.some(w => nextLower.includes(w));
  const prevHasPhysical = physicalWords.some(w => prevLower.includes(w));
  const empiricalSpecificityIncreased = !prevHasPhysical && nextHasPhysical;

  const metaphysicalScopeReduced = prevLower.includes("universe") || prevLower.includes("nature") || prevLower.includes("nothing");

  // Human-readable summary
  const summaryParts: string[] = [];
  if (intentionalityRemoved) {
    summaryParts.push("Removed psychological intentionality (nature doesn't 'desire' things)");
  }
  if (empiricalSpecificityIncreased) {
    summaryParts.push("Grounded the claim in physical feedback dynamics rather than abstract will");
  }
  if (observationalBoundaryClarified) {
    summaryParts.push("Clarified direct observation vs mental inference");
  }

  const summary = summaryParts.length > 0
    ? summaryParts.join("; ") + "."
    : "Refined linguistic precision and clarified the logical boundaries of the assertion.";

  return {
    summary,
    intentionalityRemoved,
    metaphysicalScopeReduced,
    observationalBoundaryClarified,
    empiricalSpecificityIncreased
  };
}

const SEED_ENTRIES: NotebookEntry[] = [
  {
    id: "entry-nature-equilibrium",
    title: "Nature and Equilibrium",
    tag: "Nature",
    createdAt: "2026-09-08T10:15:00.000Z",
    updatedAt: "2026-09-08T11:30:00.000Z",
    versions: [
      {
        versionNumber: 1,
        rawThought: "Nature wants balance.",
        transformedThought: "Natural processes tend toward equilibrium.",
        verdict: "CATEGORY MISTAKE",
        reasonSummary: "The word 'wants' treats nature like a person who has goals. Physics operates by thermodynamic regularities, not psychological desire.",
        keyAssumptions: ["Assumes Nature is an active agent capable of desire."],
        preservedIntuition: "Systems exhibit stabilizing tendencies after disturbance.",
        timestamp: "2026-09-08T10:15:00.000Z",
        userNotes: "First spontaneous thought while watching a pendulum come to rest."
      },
      {
        versionNumber: 2,
        rawThought: "Nature tends toward balance.",
        transformedThought: "Certain ecological and thermodynamic systems exhibit negative feedback loops that stabilize against perturbation.",
        verdict: "EMPIRICALLY TESTABLE",
        reasonSummary: "Much better: strips intentionality, but still treats 'Nature' as a single collective whole.",
        keyAssumptions: ["Assumes balance is universal rather than local to homeostatic systems."],
        preservedIntuition: "Negative feedback stabilizes open thermodynamic systems.",
        timestamp: "2026-09-08T11:00:00.000Z",
        userNotes: "Refined to remove 'wants'. Still needed more empirical specificity.",
        diffFromPrevious: {
          summary: "Removed psychological intentionality ('wants'); replaced with physical tendencies.",
          intentionalityRemoved: true,
          empiricalSpecificityIncreased: true
        }
      },
      {
        versionNumber: 3,
        rawThought: "Certain natural systems exhibit stabilizing dynamics under specific conditions.",
        transformedThought: "Disturbed homeostatic and dissipative systems repeatedly relax into stable attractor basins.",
        verdict: "CLEAR",
        reasonSummary: "Fully rigorous proposition: distinguishes specific feedback systems from cosmological generalities.",
        keyAssumptions: ["Applies specifically to systems with attractor basins."],
        preservedIntuition: "The authentic phenomenon of stabilizing feedback loops is preserved with complete scientific clarity.",
        timestamp: "2026-09-08T11:30:00.000Z",
        userNotes: "Final formulation: intuition completely intact without any anthropomorphic baggage.",
        diffFromPrevious: {
          summary: "Grounded in specific dynamical systems; eliminated vague cosmic generalizations.",
          metaphysicalScopeReduced: true,
          empiricalSpecificityIncreased: true
        }
      }
    ]
  },
  {
    id: "entry-thought-emergence",
    title: "Thought Emergence & Agency",
    tag: "Mind",
    createdAt: "2026-09-08T14:20:00.000Z",
    updatedAt: "2026-09-08T14:45:00.000Z",
    versions: [
      {
        versionNumber: 1,
        rawThought: "Thoughts arise without my choosing them.",
        transformedThought: "In direct introspective observation, thoughts appear in awareness without an antecedent conscious act of authoring.",
        verdict: "CLEAR",
        reasonSummary: "Sound phenomenological description of introspective awareness, though vulnerable to being misinterpreted as fatalism.",
        keyAssumptions: ["Choosing a thought beforehand is conceptually incoherent (infinite regress)."],
        preservedIntuition: "Cognition is a spontaneous flow rather than deliberate homunculus puppetry.",
        timestamp: "2026-09-08T14:20:00.000Z",
        userNotes: "Noticed during breath meditation."
      },
      {
        versionNumber: 2,
        rawThought: "Introspective observation witnesses thought emergence without an antecedent choosing act.",
        transformedThought: "First-person awareness reports thought emergence as spontaneous, while second-order cognitive reflection governs subsequent evaluation and veto.",
        verdict: "CLEAR",
        reasonSummary: "Carefully separates spontaneous thought emergence from subsequent deliberate reasoning.",
        keyAssumptions: ["Distinguishes generation from subsequent evaluation."],
        preservedIntuition: "Keeps observational truth without collapsing into fatalistic determinism.",
        timestamp: "2026-09-08T14:45:00.000Z",
        userNotes: "Protected the observation from turning into fatalism.",
        diffFromPrevious: {
          summary: "Clarified direct observation vs mental inference; added distinction between emergence and evaluation.",
          observationalBoundaryClarified: true
        }
      }
    ]
  }
];

export function getNotebookEntries(): NotebookEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial examples
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ENTRIES));
      return SEED_ENTRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_ENTRIES;
  } catch (err) {
    console.error("Failed to read notebook from storage:", err);
    return SEED_ENTRIES;
  }
}

export function saveNotebookEntries(entries: NotebookEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error("Failed to save notebook entries:", err);
  }
}

function extractGenericVersion(
  analysis: AnyAnalysisResult,
  versionNumber: number,
  userNotes?: string,
  diff?: VersionDiff
): ThoughtVersion {
  // 1. Nāgārjuna or Kārikā mode
  if ("transformedRelationalProposition" in analysis) {
    return {
      versionNumber,
      rawThought: analysis.input,
      transformedThought: analysis.transformedRelationalProposition,
      verdict: analysis.madhyamakaVerdict.replace(/_/g, " "),
      reasonSummary: analysis.svabhavaCritiqueSummary,
      keyAssumptions: [
        `Assumed svabhāva: ${analysis.assumedIntrinsicEntity}`,
        ...analysis.dependentConditionsUncovered.slice(0, 2)
      ],
      preservedIntuition: "Emptiness (śūnyatā) as relational open-endedness rather than nothingness.",
      timestamp: new Date().toISOString(),
      userNotes: userNotes?.trim() || undefined,
      diffFromPrevious: diff
    };
  }

  // 2. Comparative mode
  if ("wittgensteinTransformation" in analysis && "nagarjunaTransformation" in analysis) {
    return {
      versionNumber,
      rawThought: analysis.input,
      transformedThought: `Wittgenstein: ${analysis.wittgensteinTransformation} | Nāgārjuna: ${analysis.nagarjunaTransformation}`,
      verdict: analysis.verdict.replace(/_/g, " "),
      reasonSummary: analysis.comparativeVerdictRationale || analysis.falseEquivalenceWarning,
      keyAssumptions: analysis.convergences.slice(0, 3),
      preservedIntuition: "Dual therapeutic deconstruction of essentialist reification.",
      timestamp: new Date().toISOString(),
      userNotes: userNotes?.trim() || undefined,
      diffFromPrevious: diff
    };
  }

  // 3. Wittgenstein mode (PhilosophicalAnalysisResult)
  const transformed = analysis.reformulations[0]?.proposition || analysis.input;
  return {
    versionNumber,
    rawThought: analysis.input,
    transformedThought: transformed,
    verdict: analysis.verdict.replace(/_/g, " "),
    reasonSummary: analysis.intuitionPreservation.apparentLinguisticProblem || analysis.verdictRationale,
    keyAssumptions: analysis.hiddenAssumptions.slice(0, 3).map(a => a.assumption),
    preservedIntuition: analysis.intuitionPreservation.underlyingIntuition,
    timestamp: new Date().toISOString(),
    userNotes: userNotes?.trim() || undefined,
    diffFromPrevious: diff
  };
}

export function createEntryFromAnalysis(
  title: string,
  tag: string,
  analysis: AnyAnalysisResult,
  userNotes?: string
): NotebookEntry {
  const entries = getNotebookEntries();
  const version = extractGenericVersion(analysis, 1, userNotes);

  const newEntry: NotebookEntry = {
    id: `thought-${Date.now()}`,
    title: title.trim() || analysis.input.slice(0, 32),
    tag: tag.trim().replace(/^#/, "") || ("mode" in analysis ? analysis.mode.toUpperCase() : "Observation"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    versions: [version]
  };

  const updated = [newEntry, ...entries];
  saveNotebookEntries(updated);
  return newEntry;
}

export function addVersionToEntry(
  entryId: string,
  analysis: AnyAnalysisResult,
  userNotes?: string
): NotebookEntry | null {
  const entries = getNotebookEntries();
  const targetIndex = entries.findIndex(e => e.id === entryId);
  if (targetIndex === -1) return null;

  const entry = entries[targetIndex];
  const lastVersion = entry.versions[entry.versions.length - 1];

  let nextTransformed = analysis.input;
  if ("transformedRelationalProposition" in analysis) {
    nextTransformed = analysis.transformedRelationalProposition;
  } else if ("wittgensteinTransformation" in analysis) {
    nextTransformed = analysis.wittgensteinTransformation;
  } else if (analysis.reformulations?.[0]?.proposition) {
    nextTransformed = analysis.reformulations[0].proposition;
  }

  const diff = calculateVersionDiff(lastVersion, analysis.input, nextTransformed);
  const newVersion = extractGenericVersion(analysis, entry.versions.length + 1, userNotes, diff);

  const updatedEntry: NotebookEntry = {
    ...entry,
    updatedAt: new Date().toISOString(),
    versions: [...entry.versions, newVersion]
  };

  entries[targetIndex] = updatedEntry;
  saveNotebookEntries(entries);
  return updatedEntry;
}

export function deleteNotebookEntry(entryId: string): void {
  const entries = getNotebookEntries();
  const filtered = entries.filter(e => e.id !== entryId);
  saveNotebookEntries(filtered);
}

export function exportNotebookJson(): string {
  const entries = getNotebookEntries();
  return JSON.stringify(entries, null, 2);
}

export function importNotebookJson(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      saveNotebookEntries(parsed);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
