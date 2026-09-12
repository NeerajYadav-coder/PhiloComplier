export interface VersionDiff {
  summary: string;
  intentionalityRemoved?: boolean;
  metaphysicalScopeReduced?: boolean;
  observationalBoundaryClarified?: boolean;
  empiricalSpecificityIncreased?: boolean;
}

export interface ThoughtVersion {
  versionNumber: number;
  rawThought: string;
  transformedThought: string;
  verdict: string;
  reasonSummary: string;
  keyAssumptions: string[];
  preservedIntuition: string;
  timestamp: string;
  isAlreadySound?: boolean;
  userNotes?: string;
  diffFromPrevious?: VersionDiff;
  toneVoices?: {
    everyday: string;
    balanced: string;
    airtight: string;
  };
  stressTest?: {
    skepticObjection: string;
    shieldResponse: string;
    solidityRating: string;
    solidityNote: string;
  };
}

export interface NotebookEntry {
  id: string;
  title: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  versions: ThoughtVersion[];
}
