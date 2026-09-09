import React, { useState } from "react";
import { NotebookEntry, ThoughtVersion } from "../types/notebook";
import {
  BookOpen,
  Search,
  Tag,
  Clock,
  ArrowRight,
  GitBranch,
  Trash2,
  Download,
  Upload,
  ArrowLeftRight,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface NotebookViewProps {
  entries: NotebookEntry[];
  onLoadIntoDebugger: (text: string) => void;
  onDeleteEntry: (id: string) => void;
  onExport: () => void;
  onImport: () => void;
  onGoToDebugger: () => void;
}

export const NotebookView: React.FC<NotebookViewProps> = ({
  entries,
  onLoadIntoDebugger,
  onDeleteEntry,
  onExport,
  onImport,
  onGoToDebugger,
}) => {
  const [selectedEntryId, setSelectedEntryId] = useState<string>(entries[0]?.id || "");
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const filteredEntries = entries.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.versions.some(v => v.rawThought.toLowerCase().includes(searchQuery.toLowerCase()) || v.transformedThought.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === "All" || e.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const activeEntry = entries.find((e) => e.id === selectedEntryId) || filteredEntries[0];
  const activeVersion: ThoughtVersion | undefined =
    activeEntry?.versions[selectedVersionIndex] || activeEntry?.versions[activeEntry.versions.length - 1];

  const tags = ["All", ...Array.from(new Set(entries.map((e) => e.tag)))];

  if (entries.length === 0) {
    return (
      <div className="rounded-3xl p-12 text-center bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm space-y-4 max-w-xl mx-auto">
        <BookOpen className="w-8 h-8 text-apple-secondary mx-auto" />
        <h3 className="text-lg font-serif font-medium text-apple-text dark:text-white">
          Your Philosophical Notebook is Empty
        </h3>
        <p className="text-xs text-apple-secondary max-w-md mx-auto leading-relaxed">
          Subject a spontaneous thought to the debugger, then click "Save to Notebook" to begin tracking your thoughts and their refinements over time.
        </p>
        <button
          onClick={onGoToDebugger}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-apple-text dark:bg-white dark:text-black hover:opacity-90 transition-all shadow-apple-sm"
        >
          <span>Open Debugger</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top action / search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-apple-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search thoughts, observations, or reformulations..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-white dark:bg-apple-darkSurface text-xs text-apple-text dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-apple-accent shadow-apple-sm"
            />
          </div>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-white dark:bg-apple-darkSurface text-xs font-mono text-apple-secondary focus:outline-none focus:border-apple-accent shadow-apple-sm"
          >
            {tags.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All Tags" : `#${t}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={onExport}
            className="p-2 rounded-xl text-apple-secondary hover:text-apple-text bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm transition-all"
            title="Export Notebook JSON"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onImport}
            className="p-2 rounded-xl text-apple-secondary hover:text-apple-text bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm transition-all"
            title="Import Notebook JSON"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main split: Left list + Right details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Thoughts List */}
        <div className="md:col-span-4 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {filteredEntries.map((entry) => {
            const isSelected = entry.id === (activeEntry?.id || "");
            const latestVersion = entry.versions[entry.versions.length - 1];

            return (
              <button
                key={entry.id}
                onClick={() => {
                  setSelectedEntryId(entry.id);
                  setSelectedVersionIndex(entry.versions.length - 1);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all space-y-2 ${
                  isSelected
                    ? "bg-white dark:bg-apple-darkSurface border-apple-accent/60 shadow-apple"
                    : "bg-white/60 dark:bg-apple-darkSurface/60 border-apple-border/70 dark:border-apple-darkBorder hover:border-apple-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/60 text-apple-secondary">
                    #{entry.tag}
                  </span>
                  <span className="text-[10px] font-mono text-apple-secondary flex items-center space-x-1">
                    <GitBranch className="w-3 h-3" />
                    <span>{entry.versions.length} {entry.versions.length === 1 ? "v" : "versions"}</span>
                  </span>
                </div>

                <div className="font-medium text-sm text-apple-text dark:text-zinc-100 line-clamp-1 font-sans">
                  {entry.title}
                </div>

                <div className="text-xs font-serif italic text-apple-secondary line-clamp-2">
                  "{latestVersion.rawThought}"
                </div>

                <div className="text-[10px] text-apple-secondary/80 font-mono">
                  {new Date(entry.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Thought & Refinement Evolution */}
        {activeEntry && activeVersion && (
          <div className="md:col-span-8 rounded-3xl p-6 sm:p-8 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-lg space-y-6">
            {/* Header: Title, Tag, and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-apple-border/40 dark:border-apple-darkBorder/40 pb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/60 text-apple-secondary">
                    #{activeEntry.tag}
                  </span>
                  <span className="text-xs text-apple-secondary font-mono">
                    Created {new Date(activeEntry.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif text-apple-text dark:text-white font-medium">
                  {activeEntry.title}
                </h2>
              </div>

              <div className="flex items-center space-x-2 self-start sm:self-auto">
                <button
                  onClick={() => onLoadIntoDebugger(activeVersion.rawThought)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white bg-apple-text dark:bg-white dark:text-black hover:opacity-90 transition-all shadow-apple-sm"
                  title="Open this thought in the Debugger"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refine in Debugger</span>
                </button>

                <button
                  onClick={() => onDeleteEntry(activeEntry.id)}
                  className="p-1.5 rounded-xl text-apple-secondary hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Version Stepper Tabs (v1 -> v2 -> v3) */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-apple-secondary font-semibold">
                Refinement Lineage ({activeEntry.versions.length} {activeEntry.versions.length === 1 ? "Version" : "Versions"}):
              </div>
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                {activeEntry.versions.map((ver, idx) => (
                  <button
                    key={ver.versionNumber}
                    onClick={() => setSelectedVersionIndex(idx)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                      (selectedVersionIndex === idx || (!selectedVersionIndex && idx === activeEntry.versions.length - 1))
                        ? "bg-apple-accent text-white font-medium shadow-apple-sm"
                        : "bg-apple-subtle dark:bg-apple-darkSubtle text-apple-secondary hover:text-apple-text border border-apple-border/60"
                    }`}
                  >
                    <span>v{ver.versionNumber}</span>
                    {idx === 0 && <span className="opacity-70 text-[10px]">(Original)</span>}
                    {idx === activeEntry.versions.length - 1 && idx > 0 && <span className="opacity-70 text-[10px]">(Latest)</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* "What Changed Between Versions?" (The Signature Feature) */}
            {activeVersion.diffFromPrevious && (
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-semibold uppercase text-indigo-700 dark:text-indigo-400">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>What Changed from Version {activeVersion.versionNumber - 1}?</span>
                </div>
                <p className="text-xs sm:text-sm text-apple-text/90 dark:text-zinc-200 font-sans leading-relaxed">
                  {activeVersion.diffFromPrevious.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeVersion.diffFromPrevious.intentionalityRemoved && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300">
                      ✓ Intentionality Removed
                    </span>
                  )}
                  {activeVersion.diffFromPrevious.empiricalSpecificityIncreased && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                      ✓ Empirical Specificity Increased
                    </span>
                  )}
                  {activeVersion.diffFromPrevious.observationalBoundaryClarified && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                      ✓ Observational Boundary Clarified
                    </span>
                  )}
                  {activeVersion.diffFromPrevious.metaphysicalScopeReduced && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                      ✓ Metaphysical Scope Reduced
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Version Detail: Raw vs Transformed */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/60 dark:border-apple-darkBorder/60 space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-apple-secondary font-semibold block">
                  Raw Formulation (v{activeVersion.versionNumber}):
                </span>
                <p className="font-serif italic text-sm sm:text-base text-apple-text dark:text-zinc-200">
                  "{activeVersion.rawThought}"
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/[0.04] dark:bg-emerald-500/[0.08] border border-emerald-500/20 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-[10px] uppercase font-mono tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Wittgensteinian Logical Form:</span>
                </div>
                <p className="font-serif text-base sm:text-lg text-apple-text dark:text-white leading-relaxed">
                  "{activeVersion.transformedThought}"
                </p>
              </div>
            </div>

            {/* Reason & Core Assumptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-1">
                <span className="font-mono text-[10px] uppercase text-apple-secondary font-semibold block">
                  Reason for Transformation:
                </span>
                <p className="text-apple-text/90 dark:text-zinc-300 font-sans leading-relaxed">
                  {activeVersion.reasonSummary}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-1">
                <span className="font-mono text-[10px] uppercase text-apple-secondary font-semibold block">
                  Core Assumptions Exposed:
                </span>
                <div className="text-apple-text/90 dark:text-zinc-300 font-sans space-y-0.5">
                  {activeVersion.keyAssumptions.map((a, i) => (
                    <div key={i} className="flex items-start space-x-1">
                      <span className="text-apple-secondary">•</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal contemplative notes */}
            {activeVersion.userNotes && (
              <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-apple-border/50 dark:border-apple-darkBorder/50 text-xs space-y-1">
                <span className="font-mono text-[10px] uppercase text-apple-secondary font-semibold block">
                  Personal Contemplative Context:
                </span>
                <p className="italic text-apple-secondary font-sans leading-relaxed">
                  "{activeVersion.userNotes}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
