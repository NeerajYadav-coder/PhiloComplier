import React, { useState } from "react";
import { X, Bookmark, Plus, GitBranch, Check } from "lucide-react";
import { NotebookEntry } from "../types/notebook";
import { AnyAnalysisResult } from "../types";

interface SaveToNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnyAnalysisResult;
  existingEntries: NotebookEntry[];
  onSaveNew: (title: string, tag: string, notes?: string) => void;
  onAddVersion: (entryId: string, notes?: string) => void;
}

export const SaveToNotebookModal: React.FC<SaveToNotebookModalProps> = ({
  isOpen,
  onClose,
  analysis,
  existingEntries,
  onSaveNew,
  onAddVersion,
}) => {
  const [mode, setMode] = useState<"new" | "version">("new");
  const [title, setTitle] = useState<string>(() => {
    const raw = analysis.input.replace(/[.?!]/g, "").trim();
    return raw.length > 36 ? raw.slice(0, 36) + "…" : raw;
  });
  const defaultTag = "mode" in analysis ? analysis.mode.toUpperCase() : "Observation";
  const [tag, setTag] = useState<string>(defaultTag);
  const [notes, setNotes] = useState<string>("");
  const [selectedEntryId, setSelectedEntryId] = useState<string>(existingEntries[0]?.id || "");
  const [saved, setSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (mode === "new") {
      onSaveNew(title, tag, notes);
    } else {
      if (!selectedEntryId) return;
      onAddVersion(selectedEntryId, notes);
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 500);
  };

  const selectedEntry = existingEntries.find((e) => e.id === selectedEntryId);
  const nextVersionNum = selectedEntry ? selectedEntry.versions.length + 1 : 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder rounded-3xl p-6 shadow-apple-lg space-y-5">
        <div className="flex items-center justify-between border-b border-apple-border/50 dark:border-apple-darkBorder/50 pb-3">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4 text-apple-accent" />
            <h3 className="text-sm font-semibold tracking-tight text-apple-text dark:text-white uppercase font-mono">
              Save to Notebook
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-apple-secondary hover:text-apple-text hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector: New Thought vs Add Version */}
        {existingEntries.length > 0 && (
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder text-xs font-mono">
            <button
              onClick={() => setMode("new")}
              className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                mode === "new"
                  ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white font-semibold shadow-apple-sm"
                  : "text-apple-secondary hover:text-apple-text"
              }`}
            >
              <Plus className="w-3 h-3" />
              <span>New Thought</span>
            </button>
            <button
              onClick={() => setMode("version")}
              className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                mode === "version"
                  ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white font-semibold shadow-apple-sm"
                  : "text-apple-secondary hover:text-apple-text"
              }`}
            >
              <GitBranch className="w-3 h-3" />
              <span>Add as Refinement</span>
            </button>
          </div>
        )}

        {mode === "new" ? (
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-mono text-apple-secondary uppercase text-[10px] font-semibold block">
                Thought Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Nature and Equilibrium"
                className="w-full px-3 py-2 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 text-xs text-apple-text dark:text-zinc-100 focus:outline-none focus:border-apple-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-apple-secondary uppercase text-[10px] font-semibold block">
                Category Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. Nature, Consciousness, Time, Agency"
                className="w-full px-3 py-2 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 text-xs text-apple-text dark:text-zinc-100 focus:outline-none focus:border-apple-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-apple-secondary uppercase text-[10px] font-semibold block">
                Personal Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any notes or context on what made you write this..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 text-xs text-apple-text dark:text-zinc-100 focus:outline-none focus:border-apple-accent resize-none font-sans"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-mono text-apple-secondary uppercase text-[10px] font-semibold block">
                Choose Saved Thought to Update
              </label>
              <select
                value={selectedEntryId}
                onChange={(e) => setSelectedEntryId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 text-xs text-apple-text dark:text-zinc-100 focus:outline-none focus:border-apple-accent"
              >
                {existingEntries.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title} ({e.versions.length} {e.versions.length === 1 ? "version" : "versions"})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-xl bg-apple-accent/5 border border-apple-accent/20 text-apple-accent text-[11px] font-mono">
              Will save as <strong>Version {nextVersionNum}</strong> of "{selectedEntry?.title}". You can see how your thought evolved over time.
            </div>

            <div className="space-y-1">
              <label className="font-mono text-apple-secondary uppercase text-[10px] font-semibold block">
                What changed in this version (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Replaced confusing phrasing with simple, clear wording..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 text-xs text-apple-text dark:text-zinc-100 focus:outline-none focus:border-apple-accent resize-none font-sans"
              />
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-apple-border/40 dark:border-apple-darkBorder/40">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-apple-secondary hover:text-apple-text transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={mode === "new" && !title.trim()}
            className="px-5 py-2 rounded-xl text-xs font-medium text-white bg-apple-accent hover:bg-apple-accentHover transition-all flex items-center space-x-1.5 shadow-apple-sm disabled:opacity-40"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save to Notebook</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
