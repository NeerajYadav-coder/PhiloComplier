import { NotebookEntry, ThoughtVersion, VersionDiff } from "../types/notebook";
import { PhilosophicalAnalysisResult, AnyAnalysisResult, ClaimCritiqueResult } from "../types";

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
    summaryParts.push("Removed human-like intentions (nature doesn't 'desire' things)");
  }
  if (empiricalSpecificityIncreased) {
    summaryParts.push("Made the description more concrete and testable by observation");
  }
  if (observationalBoundaryClarified) {
    summaryParts.push("Separated what is directly seen from what is assumed");
  }

  const summary = summaryParts.length > 0
    ? summaryParts.join("; ") + "."
    : "Made the wording clearer and removed confusing assumptions.";

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
    title: "Nature and Balance",
    tag: "Nature",
    createdAt: "2026-09-08T10:15:00.000Z",
    updatedAt: "2026-09-08T11:30:00.000Z",
    versions: [
      {
        versionNumber: 1,
        rawThought: "Nature wants balance.",
        transformedThought: "Natural processes tend toward equilibrium.",
        verdict: "CONFUSING GRAMMAR WITH REALITY",
        reasonSummary: "The word 'wants' treats nature like a person with conscious desires. Natural processes follow physical laws, not personal intentions.",
        keyAssumptions: ["Assumes Nature is an active person capable of desire."],
        preservedIntuition: "Systems naturally tend to stabilize after being disturbed.",
        timestamp: "2026-09-08T10:15:00.000Z",
        userNotes: "First spontaneous thought while watching a pendulum come to rest."
      },
      {
        versionNumber: 2,
        rawThought: "Nature tends toward balance.",
        transformedThought: "Many natural systems have self-regulating cycles that help restore balance when disturbed.",
        verdict: "TESTABLE BY EXPERIENCE",
        reasonSummary: "Much clearer: removes personal desires, focusing instead on how actual physical systems work.",
        keyAssumptions: ["Assumes balance applies everywhere rather than to specific systems."],
        preservedIntuition: "Natural feedback loops keep systems stable.",
        timestamp: "2026-09-08T11:00:00.000Z",
        userNotes: "Refined to remove 'wants'. Still needed more specific details.",
        diffFromPrevious: {
          summary: "Removed personal desires ('wants'); replaced with observable system tendencies.",
          intentionalityRemoved: true,
          empiricalSpecificityIncreased: true
        }
      },
      {
        versionNumber: 3,
        rawThought: "Certain natural systems return to balance under specific conditions.",
        transformedThought: "When balanced systems like forests or temperatures are disturbed, feedback loops work to restore equilibrium.",
        verdict: "CLEAR & SOUND",
        reasonSummary: "Crystal clear: focuses on specific, observable feedback rather than vague claims about the whole universe.",
        keyAssumptions: ["Applies specifically to systems with stabilizing feedback."],
        preservedIntuition: "The authentic insight—that natural systems regulate themselves—is kept with total clarity.",
        timestamp: "2026-09-08T11:30:00.000Z",
        userNotes: "Final wording: genuine insight kept intact without confusing personification.",
        diffFromPrevious: {
          summary: "Grounded in specific observable systems; eliminated vague cosmic generalizations.",
          metaphysicalScopeReduced: true,
          empiricalSpecificityIncreased: true
        }
      }
    ]
  },
  {
    id: "entry-thought-emergence",
    title: "How Thoughts Arise",
    tag: "Mind",
    createdAt: "2026-09-08T14:20:00.000Z",
    updatedAt: "2026-09-08T14:45:00.000Z",
    versions: [
      {
        versionNumber: 1,
        rawThought: "Thoughts come into my head on their own.",
        transformedThought: "When paying attention to the mind, thoughts appear in awareness spontaneously before we actively decide to think them.",
        verdict: "CLEAR & SOUND",
        reasonSummary: "Accurately describes what you notice when observing your own mind, without making unproven leaps.",
        keyAssumptions: ["You cannot choose a thought before it occurs."],
        preservedIntuition: "Thoughts emerge spontaneously rather than being planned step-by-step in advance.",
        timestamp: "2026-09-08T14:20:00.000Z",
        userNotes: "Noticed during quiet reflection."
      },
      {
        versionNumber: 2,
        rawThought: "Observing the mind shows thoughts pop up on their own, even though we can still evaluate them.",
        transformedThought: "Thoughts pop up spontaneously in awareness, but we can still reflect on them and choose how to act.",
        verdict: "CLEAR & SOUND",
        reasonSummary: "Carefully separates the spontaneous arrival of thoughts from our conscious ability to reflect and choose actions.",
        keyAssumptions: ["Distinguishes where thoughts begin from how we respond to them."],
        preservedIntuition: "Keeps the real observation without mistakenly concluding that we have zero control over our choices.",
        timestamp: "2026-09-08T14:45:00.000Z",
        userNotes: "Protected the observation from turning into helplessness.",
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
        `Assumed fixed essence: ${analysis.assumedIntrinsicEntity}`,
        ...analysis.dependentConditionsUncovered.slice(0, 2)
      ],
      preservedIntuition: "Everything exists in connection with other things, rather than having a rigid, isolated existence.",
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
      preservedIntuition: "Both perspectives untangle tricky grammar and bring thought back to what can be clearly observed or experienced.",
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
    diffFromPrevious: diff,
    toneVoices: analysis.toneVoices,
    stressTest: analysis.stressTest ? {
      skepticObjection: analysis.stressTest.skepticObjection,
      shieldResponse: analysis.stressTest.shieldResponse,
      solidityRating: analysis.stressTest.solidityRating,
      solidityNote: analysis.stressTest.solidityNote
    } : undefined
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

export function createEntryFromCritique(
  critique: ClaimCritiqueResult,
  userNotes?: string
): NotebookEntry {
  const entries = getNotebookEntries();
  const version: ThoughtVersion = {
    versionNumber: 1,
    rawThought: critique.input,
    transformedThought: critique.correctedProposition,
    verdict: critique.verdict.replace(/_/g, " "),
    reasonSummary: `${critique.whereIsTheProblem.problematicPhrase} (${critique.whereIsTheProblem.flawType}): ${critique.whereIsTheProblem.explanation}`,
    keyAssumptions: critique.smuggledAssumptions,
    preservedIntuition: critique.simpleExplanation,
    timestamp: critique.timestamp || new Date().toISOString(),
    userNotes: userNotes?.trim() || undefined,
    toneVoices: critique.toneVoices,
    stressTest: critique.stressTest ? {
      skepticObjection: critique.stressTest.skepticObjection,
      shieldResponse: critique.stressTest.shieldResponse,
      solidityRating: critique.stressTest.solidityRating,
      solidityNote: critique.stressTest.solidityNote
    } : undefined
  };

  const authorTag = critique.authorOrTradition
    ? critique.authorOrTradition.split(/[\s(]/)[0].replace(/[^a-zA-Z0-9]/g, "")
    : "Critique";

  const newEntry: NotebookEntry = {
    id: `critique-${Date.now()}`,
    title: critique.authorOrTradition
      ? `${critique.authorOrTradition.split("(")[0].trim()}: "${critique.input.slice(0, 24)}..."`
      : `Critique: "${critique.input.slice(0, 28)}..."`,
    tag: authorTag || "Critique",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    versions: [version]
  };

  const updated = [newEntry, ...entries];
  saveNotebookEntries(updated);
  return newEntry;
}

