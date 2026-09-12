import React, { useState } from "react";
import { NotebookEntry, ThoughtVersion } from "../types/notebook";
import {
  BookOpen,
  Search,
  RotateCcw,
  FileText,
  Trash2,
  Download,
  Upload,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Shield,
  Coffee,
  Scale,
  Zap,
  ArrowLeftRight
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
  const [showDeepDive, setShowDeepDive] = useState<boolean>(false);

  const activeEntry = entries.find((e) => e.id === selectedEntryId) || entries[0];
  const activeVersion: ThoughtVersion | undefined =
    activeEntry?.versions[selectedVersionIndex] ?? activeEntry?.versions[activeEntry?.versions.length - 1];

  const handleExportEntryMarkdown = () => {
    if (!activeEntry || !activeVersion) return;
    const md = `# ${activeEntry.title}
Tag: #${activeEntry.tag}
Date: ${new Date(activeEntry.updatedAt).toLocaleDateString()}

## Current Version (v${activeVersion.versionNumber})
**Original Thought:**
> "${activeVersion.rawThought}"

**Clear Refined Version:**
> "${activeVersion.transformedThought}"

**Status:** ${activeVersion.isAlreadySound ? "Already Clear & Sound" : activeVersion.verdict}
**Why this works:**
${activeVersion.reasonSummary}

**Key Assumptions:**
${activeVersion.keyAssumptions.map(a => `- ${a}`).join("\n")}

${activeVersion.toneVoices ? `**Clarity Voices:**
- **Everyday:** "${activeVersion.toneVoices.everyday}"
- **Balanced:** "${activeVersion.toneVoices.balanced}"
- **Airtight:** "${activeVersion.toneVoices.airtight}"
` : ""}${activeVersion.stressTest ? `**The Friendly Skeptic Check:**
- **Solidity:** ${activeVersion.stressTest.solidityRating}
- **Objection:** "${activeVersion.stressTest.skepticObjection}"
- **Shield:** "${activeVersion.stressTest.shieldResponse}"
- **Tip:** ${activeVersion.stressTest.solidityNote}
` : ""}${activeVersion.userNotes ? `**Personal Notes:**\n${activeVersion.userNotes}\n` : ""}---
*Exported from PhiloCompiler*
`;
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeEntry.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredEntries = entries.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.versions.some(
        v =>
          v.rawThought.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.transformedThought.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesTag = selectedTag === "All" || e.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const tags = ["All", ...Array.from(new Set(entries.map((e) => e.tag)))];

  if (entries.length === 0) {
    return (
      <div className="rounded-3xl p-12 text-center bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm space-y-4 max-w-xl mx-auto animate-fade-in">
        <div className="w-12 h-12 rounded-2xl bg-apple-subtle dark:bg-apple-darkSubtle flex items-center justify-center mx-auto text-apple-secondary">
          <BookOpen className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h3 className="text-xl font-serif font-medium text-apple-text dark:text-white">
          Your Notebook is Empty
        </h3>
        <p className="text-sm text-apple-secondary max-w-sm mx-auto leading-relaxed font-sans">
          Test any thought with the debugger, then save it to your notebook to track your thoughts and clear versions over time.
        </p>
        <button
          onClick={onGoToDebugger}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-apple-text dark:bg-white dark:text-black hover:opacity-90 transition-all shadow-apple-sm"
        >
          <span>Open Debugger</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  const isSound =
    activeVersion?.isAlreadySound ||
    activeVersion?.verdict?.toLowerCase().includes("clear") ||
    activeVersion?.verdict?.toLowerCase().includes("empirical");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top action / search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-apple-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search thoughts..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-white dark:bg-apple-darkSurface text-xs text-apple-text dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-apple-accent transition-colors shadow-apple-sm"
            />
          </div>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            aria-label="Filter by tag"
            className="px-3 py-2 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-white dark:bg-apple-darkSurface text-xs font-sans text-apple-secondary focus:outline-none focus:border-apple-accent shadow-apple-sm"
          >
            {tags.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All Tags" : `#${t}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-1.5 self-start sm:self-auto">
          <button
            onClick={onExport}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs text-apple-secondary hover:text-apple-text dark:hover:text-white bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm transition-all"
            title="Export Notebook JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={onImport}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs text-apple-secondary hover:text-apple-text dark:hover:text-white bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm transition-all"
            title="Import Notebook JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Import</span>
          </button>
        </div>
      </div>

      {/* Main split: Left list + Right details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Quiet & Serene Thoughts List */}
        <div className="md:col-span-4 space-y-2 max-h-[75vh] overflow-y-auto pr-1 custom-scrollbar">
          {filteredEntries.map((entry) => {
            const isSelected = entry.id === (activeEntry?.id || "");
            const latestVer = entry.versions[entry.versions.length - 1];
            const entryIsSound =
              latestVer?.isAlreadySound ||
              latestVer?.verdict?.toLowerCase().includes("clear") ||
              latestVer?.verdict?.toLowerCase().includes("empirical");

            return (
              <button
                key={entry.id}
                onClick={() => {
                  setSelectedEntryId(entry.id);
                  setSelectedVersionIndex(entry.versions.length - 1);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 space-y-2 ${
                  isSelected
                    ? "bg-white dark:bg-apple-darkSurface border-apple-accent/50 shadow-apple ring-1 ring-apple-accent/20"
                    : "bg-white/60 dark:bg-apple-darkSurface/50 border-apple-border/60 dark:border-apple-darkBorder/60 hover:bg-white dark:hover:bg-apple-darkSurface hover:border-apple-secondary/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-apple-subtle dark:bg-apple-darkSubtle text-apple-secondary">
                    #{entry.tag}
                  </span>
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-apple-secondary">
                    {entryIsSound && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-sans" title="Already Sound">
                        ✓ Sound
                      </span>
                    )}
                    {entry.versions.length > 1 && (
                      <span className="px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10">
                        v{entry.versions.length}
                      </span>
                    )}
                  </div>
                </div>

                <div className="font-serif font-medium text-sm text-apple-text dark:text-zinc-100 line-clamp-1">
                  {entry.title}
                </div>

                <div className="text-xs font-serif italic text-apple-secondary line-clamp-2 leading-relaxed">
                  "{latestVer.rawThought}"
                </div>

                <div className="text-[10px] text-apple-secondary/70 font-mono pt-1">
                  {new Date(entry.updatedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Thought - Tranquil & Elegant */}
        {activeEntry && activeVersion && (
          <div className="md:col-span-8 rounded-3xl p-6 sm:p-8 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-lg space-y-6">
            {/* Header: Title, Tag, and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-apple-border/40 dark:border-apple-darkBorder/40 pb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-apple-subtle dark:bg-apple-darkSubtle text-apple-secondary">
                    #{activeEntry.tag}
                  </span>
                  <span className="text-xs text-apple-secondary font-mono">
                    {new Date(activeEntry.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif text-apple-text dark:white font-medium">
                  {activeEntry.title}
                </h2>
              </div>

              <div className="flex items-center space-x-1.5 self-start sm:self-auto">
                <button
                  onClick={() => onLoadIntoDebugger(activeVersion.rawThought)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white bg-apple-text dark:bg-white dark:text-black hover:opacity-90 transition-all shadow-apple-sm"
                  title="Open in Debugger"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Open in Debugger</span>
                </button>

                <button
                  onClick={handleExportEntryMarkdown}
                  className="p-2 rounded-xl text-apple-secondary hover:text-apple-text bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/50 transition-colors"
                  title="Export Markdown"
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeleteEntry(activeEntry.id)}
                  className="p-2 rounded-xl text-apple-secondary hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                  title="Delete Thought"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Version Stepper (only visible if multiple versions exist) */}
            {activeEntry.versions.length > 1 && (
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                <span className="text-[11px] font-mono text-apple-secondary mr-1">Version:</span>
                {activeEntry.versions.map((ver, idx) => (
                  <button
                    key={ver.versionNumber}
                    onClick={() => setSelectedVersionIndex(idx)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                      selectedVersionIndex === idx
                        ? "bg-apple-text text-white dark:bg-white dark:text-black font-medium shadow-apple-sm"
                        : "bg-apple-subtle dark:bg-apple-darkSubtle text-apple-secondary hover:text-apple-text border border-apple-border/50"
                    }`}
                  >
                    <span>v{ver.versionNumber}</span>
                    {idx === 0 && <span className="opacity-60 text-[10px]">(First)</span>}
                    {idx === activeEntry.versions.length - 1 && idx > 0 && (
                      <span className="opacity-60 text-[10px]">(Latest)</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* THE CORE THOUGHT DISPLAY */}
            {isSound ? (
              /* Already Sound Affirmation Card */
              <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-mono font-medium tracking-wide uppercase">
                    Already Clear & Sound
                  </span>
                </div>

                <div className="space-y-1.5">
                  <p className="font-serif text-lg sm:text-xl text-apple-text dark:text-white leading-relaxed">
                    "{activeVersion.transformedThought || activeVersion.rawThought}"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-200/80 font-sans leading-relaxed border-t border-emerald-500/20 pt-3">
                  {activeVersion.reasonSummary ||
                    "This sentence is already clear and grounded in observable reality. PhiloCompiler kept it exactly as you wrote it—no debugging needed."}
                </p>
              </div>
            ) : (
              /* Transformation Card: Before and After */
              <div className="rounded-2xl border border-apple-border dark:border-apple-darkBorder overflow-hidden divide-y divide-apple-border/50 dark:divide-apple-darkBorder/50 shadow-apple-sm">
                {/* Original Starting Wording */}
                <div className="p-5 sm:p-6 bg-apple-subtle/30 dark:bg-apple-darkSubtle/20 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-apple-secondary font-medium">
                    Original Thought:
                  </span>
                  <p className="font-serif italic text-base sm:text-lg text-apple-text/80 dark:text-zinc-300 leading-relaxed">
                    "{activeVersion.rawThought}"
                  </p>
                </div>

                {/* Refined Proposition */}
                <div className="p-5 sm:p-6 bg-white dark:bg-apple-darkSurface space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-medium text-apple-accent dark:text-apple-accent">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Clear Refined Thought:</span>
                  </div>
                  <p className="font-serif text-lg sm:text-xl text-apple-text dark:text-white leading-relaxed">
                    "{activeVersion.transformedThought}"
                  </p>
                  {activeVersion.reasonSummary && (
                    <p className="text-xs text-apple-secondary font-sans leading-relaxed pt-2 border-t border-apple-border/30 dark:border-apple-darkBorder/30">
                      <span className="font-medium text-apple-text/80 dark:text-zinc-200">Why this works: </span>
                      {activeVersion.reasonSummary}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE: Deep Dive Toggle */}
            <div className="pt-2">
              <button
                onClick={() => setShowDeepDive(!showDeepDive)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-apple-border/70 dark:border-apple-darkBorder/70 bg-apple-subtle/40 dark:bg-apple-darkSubtle/30 hover:bg-apple-subtle dark:hover:bg-apple-darkSubtle text-xs text-apple-secondary hover:text-apple-text dark:hover:text-zinc-200 transition-all font-sans"
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-3.5 h-3.5 text-apple-secondary" />
                  <span className="font-medium">
                    {showDeepDive
                      ? "Hide Deep Dive Details"
                      : "Explore Deep Dive: Skeptic Check, Clarity Voices & Assumptions"}
                  </span>
                </div>
                {showDeepDive ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* COLLAPSED / EXPANDED SECTION */}
              {showDeepDive && (
                <div className="mt-4 space-y-5 animate-fade-in">
                  {/* 1. What Changed (Diff from previous version) */}
                  {activeVersion.diffFromPrevious && (
                    <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-900/30 space-y-2">
                      <div className="flex items-center space-x-2 text-xs font-mono font-medium text-indigo-700 dark:text-indigo-400">
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                        <span>Evolution from Version {activeVersion.versionNumber - 1}</span>
                      </div>
                      <p className="text-xs text-apple-text/90 dark:text-zinc-200 font-sans leading-relaxed">
                        {activeVersion.diffFromPrevious.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeVersion.diffFromPrevious.intentionalityRemoved && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300">
                            ✓ Removed Intentional Words
                          </span>
                        )}
                        {activeVersion.diffFromPrevious.empiricalSpecificityIncreased && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                            ✓ More Specific & Observable
                          </span>
                        )}
                        {activeVersion.diffFromPrevious.observationalBoundaryClarified && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                            ✓ Clearer Boundary
                          </span>
                        )}
                        {activeVersion.diffFromPrevious.metaphysicalScopeReduced && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                            ✓ Kept Grounded & Realistic
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 2. Clarity Voices (Everyday, Balanced, Airtight) */}
                  {activeVersion.toneVoices && (
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] uppercase text-apple-secondary font-medium tracking-wider block">
                        3 Clarity Voices:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div className="p-3 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/20 border border-apple-border/50 dark:border-apple-darkBorder/50 space-y-1">
                          <div className="flex items-center space-x-1 text-apple-secondary text-[11px] font-medium">
                            <Coffee className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            <span>Everyday</span>
                          </div>
                          <p className="text-apple-text dark:text-zinc-200 font-serif italic text-xs leading-relaxed">
                            "{activeVersion.toneVoices.everyday}"
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/20 border border-apple-border/50 dark:border-apple-darkBorder/50 space-y-1">
                          <div className="flex items-center space-x-1 text-apple-secondary text-[11px] font-medium">
                            <Scale className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            <span>Balanced</span>
                          </div>
                          <p className="text-apple-text dark:text-zinc-200 font-serif text-xs leading-relaxed">
                            "{activeVersion.toneVoices.balanced}"
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/20 border border-apple-border/50 dark:border-apple-darkBorder/50 space-y-1">
                          <div className="flex items-center space-x-1 text-apple-secondary text-[11px] font-medium">
                            <Shield className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>Airtight</span>
                          </div>
                          <p className="text-apple-text dark:text-zinc-200 font-serif text-xs leading-relaxed">
                            "{activeVersion.toneVoices.airtight}"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. The Friendly Skeptic Check */}
                  {activeVersion.stressTest && (
                    <div className="p-4 rounded-xl bg-amber-50/40 dark:bg-amber-950/10 border border-amber-500/20 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-amber-900 dark:text-amber-200 font-medium">
                          The Friendly Skeptic Check
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-500/30 bg-white/70 dark:bg-black/30 text-amber-900 dark:text-amber-200">
                          {activeVersion.stressTest.solidityRating === "ROCK_SOLID"
                            ? "🟢 Rock Solid"
                            : activeVersion.stressTest.solidityRating === "NEEDS_BOUNDARY"
                            ? "🟡 Needs Boundary"
                            : "🟣 Subjective"}
                        </span>
                      </div>
                      <div className="space-y-1.5 font-sans">
                        <div>
                          <span className="font-medium text-amber-800 dark:text-amber-300 block text-[11px]">
                            The Objection:
                          </span>
                          <p className="italic text-apple-text dark:text-zinc-200 text-xs">
                            "{activeVersion.stressTest.skepticObjection}"
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-emerald-800 dark:text-emerald-400 block text-[11px]">
                            The Shield:
                          </span>
                          <p className="text-apple-text dark:text-zinc-200 text-xs">
                            {activeVersion.stressTest.shieldResponse}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. Assumptions Behind Thought */}
                  {activeVersion.keyAssumptions.length > 0 && (
                    <div className="p-4 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/20 border border-apple-border/50 dark:border-apple-darkBorder/50 space-y-1.5 text-xs">
                      <span className="font-mono text-[10px] uppercase text-apple-secondary font-medium tracking-wider block">
                        Assumptions Behind the Thought:
                      </span>
                      <div className="text-apple-text/80 dark:text-zinc-300 font-sans space-y-1">
                        {activeVersion.keyAssumptions.map((a, i) => (
                          <div key={i} className="flex items-start space-x-1.5">
                            <span className="text-apple-secondary">•</span>
                            <span>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Personal Notes (if recorded) */}
            {activeVersion.userNotes && (
              <div className="p-4 rounded-xl bg-apple-subtle/20 dark:bg-apple-darkSubtle/20 border-l-2 border-apple-secondary/40 text-xs space-y-1">
                <span className="font-mono text-[10px] uppercase text-apple-secondary font-medium block">
                  Personal Note:
                </span>
                <p className="italic text-apple-text/90 dark:text-zinc-300 font-sans leading-relaxed">
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
