import React, { useState } from "react";
import { ComparativeDiagnosticResult } from "../types";
import {
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Scale,
  ChevronDown,
  ChevronUp,
  Bookmark,
  ArrowRightLeft,
  Info
} from "lucide-react";

interface ComparativeCardProps {
  analysis: ComparativeDiagnosticResult;
  onReset: () => void;
  onOpenSaveModal: () => void;
}

export const ComparativeCard: React.FC<ComparativeCardProps> = ({
  analysis,
  onReset,
  onOpenSaveModal,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showDeepVerdict, setShowDeepVerdict] = useState<boolean>(false);

  const handleCopy = () => {
    const textToCopy = `WITTGENSTEIN:\n${analysis.wittgensteinTransformation}\n\nNĀGĀRJUNA:\n${analysis.nagarjunaTransformation}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "COMPLEMENTARY_DIAGNOSTICS":
        return {
          bg: "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/20",
          label: "Both Complement Each Other",
        };
      case "MUTUAL_CRITIQUE_CONVERGENT":
        return {
          bg: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20",
          label: "Both Reach the Same Conclusion",
        };
      case "DIVERGENT_PERSPECTIVES":
      default:
        return {
          bg: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20",
          label: "Different Perspectives",
        };
    }
  };

  const badge = getVerdictBadge(analysis.verdict);

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-lg space-y-6 animate-fade-in">
      {/* Top action row */}
      <div className="flex items-center justify-between gap-2 border-b border-apple-border/40 dark:border-apple-darkBorder/40 pb-4">
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${badge.bg}`}>
            {badge.label}
          </span>
          <span className="text-[11px] font-mono text-apple-secondary hidden sm:inline">
            • Comparing Two Perspectives
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-apple-secondary hover:text-apple-text bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder transition-all"
            title="Copy comparative transformations"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Dual Results</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenSaveModal}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-apple-secondary hover:text-apple-text bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder transition-all"
            title="Save thought to your Notebook"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            <span>Save</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-medium text-apple-secondary hover:text-apple-text bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder transition-all"
            title="Start new inquiry"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Original Thought */}
      <div className="text-xs text-apple-secondary flex items-center space-x-2">
        <span className="uppercase font-mono tracking-wider text-[10px] font-semibold text-apple-secondary">
          What You Said:
        </span>
        <span className="font-serif italic text-apple-text/70 dark:text-zinc-400">
          "{analysis.input}"
        </span>
      </div>

      {/* Dual Side-by-Side Transformations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Ludwig Wittgenstein */}
        <div className="p-5 sm:p-6 rounded-2xl bg-blue-500/[0.03] dark:bg-blue-500/[0.06] border border-blue-500/20 space-y-3.5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wittgenstein's Clear Version</span>
            </div>
            <p className="text-base sm:text-lg font-serif text-apple-text dark:text-white leading-relaxed">
              "{analysis.wittgensteinTransformation}"
            </p>
          </div>

          <div className="pt-2 border-t border-blue-500/15">
            <span className="text-[10px] font-mono uppercase text-apple-secondary font-semibold block mb-1">
              Why This is Clearer:
            </span>
            <p className="text-xs text-apple-text/80 dark:text-zinc-300 font-sans leading-relaxed">
              {analysis.wittgensteinReason}
            </p>
          </div>
        </div>

        {/* Right: Nāgārjuna */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/[0.03] dark:bg-amber-500/[0.06] border border-amber-500/20 space-y-3.5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <Scale className="w-3.5 h-3.5" />
              <span>Nāgārjuna's Connected View</span>
            </div>
            <p className="text-base sm:text-lg font-serif text-apple-text dark:text-white leading-relaxed">
              "{analysis.nagarjunaTransformation}"
            </p>
          </div>

          <div className="pt-2 border-t border-amber-500/15">
            <span className="text-[10px] font-mono uppercase text-apple-secondary font-semibold block mb-1">
              Why This is Clearer:
            </span>
            <p className="text-xs text-apple-text/80 dark:text-zinc-300 font-sans leading-relaxed">
              {analysis.nagarjunaReason}
            </p>
          </div>
        </div>
      </div>

      {/* Synthesis Row: Convergences & Divergences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Convergences */}
        <div className="p-4 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-mono uppercase text-emerald-700 dark:text-emerald-400 font-semibold">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Where Both Agree</span>
          </div>
          <div className="space-y-1.5">
            {analysis.convergences.map((point, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-apple-text/90 dark:text-zinc-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold select-none">•</span>
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divergences */}
        <div className="p-4 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-mono uppercase text-indigo-700 dark:text-indigo-400 font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Where They Differ</span>
          </div>
          <div className="space-y-1.5">
            {analysis.divergences.map((point, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-apple-text/90 dark:text-zinc-300">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold select-none">•</span>
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical False Equivalence Warning */}
      <div className="p-4 rounded-2xl bg-rose-500/[0.04] dark:bg-rose-500/[0.08] border border-rose-500/20 text-xs text-rose-950 dark:text-rose-200 flex items-start space-x-3">
        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold font-mono text-[11px] uppercase tracking-wider text-rose-700 dark:text-rose-400 block">
            Important Difference to Keep in Mind
          </span>
          <p className="leading-relaxed opacity-95">
            {analysis.falseEquivalenceWarning}
          </p>
        </div>
      </div>

      {/* Deep Rationale Disclosure */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={() => setShowDeepVerdict(!showDeepVerdict)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono text-apple-secondary hover:text-apple-text hover:bg-apple-subtle dark:hover:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder transition-all"
        >
          <span>{showDeepVerdict ? "Hide Comparison Notes" : "Show Detailed Comparison & Notes"}</span>
          {showDeepVerdict ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {showDeepVerdict && (
        <div className="p-5 rounded-2xl bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 border border-apple-border dark:border-apple-darkBorder space-y-2 animate-fade-in">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-apple-secondary flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-500" />
            <span>Detailed Comparison Summary</span>
          </span>
          <p className="text-sm font-sans text-apple-text dark:text-zinc-200 leading-relaxed">
            {analysis.comparativeVerdictRationale}
          </p>
        </div>
      )}
    </div>
  );
};
