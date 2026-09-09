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
  userNotes?: string;
  diffFromPrevious?: VersionDiff;
}

export interface NotebookEntry {
  id: string;
  title: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  versions: ThoughtVersion[];
}
