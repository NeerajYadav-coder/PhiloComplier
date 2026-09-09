import React, { useState } from "react";
import { PhilosophicalAnalysisResult, Reformulation } from "../types";
import { Check, Copy, RotateCcw, Sparkles, AlertCircle, Key, ChevronDown, ChevronUp, Bookmark } from "lucide-react";

interface CleanTransformationCardProps {
  analysis: PhilosophicalAnalysisResult;
  onReset: () => void;
  onOpenSaveModal: () => void;
  showDeepInspection: boolean;
  onToggleDeepInspection: () => void;
}

export const CleanTransformationCard: React.FC<CleanTransformationCardProps> = ({
  analysis,
  onReset,
  onOpenSaveModal,
  showDeepInspection,
  onToggleDeepInspection,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedReformulationIndex, setSelectedReformulationIndex] = useState<number>(0);

  const activeReformulation: Reformulation | undefined =
    analysis.reformulations[selectedReformulationIndex] || analysis.reformulations[0];

  const handleCopy = () => {
    if (!activeReformulation) return;
    navigator.clipboard.writeText(activeReformulation.proposition);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "CLEAR":
      case "EMPIRICALLY TESTABLE":
        return {
          bg: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20",
          label: "Logically Sound",
        };
      case "CATEGORYALLY PROBLEMATIC":
      case "PSEUDO-PROPOSITION SUSPECTED":
        return {
          bg: "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/20",
          label: "Grammatical Category Trap",
        };
      case "METAPHORICAL":
      case "POETIC":
        return {
          bg: "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/20",
          label: "Metaphorical Expression",
        };
      case "AMBIGUOUS":
      case "UNDER-SPECIFIED":
      default:
        return {
          bg: "bg-zinc-500/10 text-zinc-800 dark:text-zinc-300 border-zinc-500/20",
          label: "Clarification Required",
        };
    }
  };

  const badge = getVerdictBadge(analysis.verdict);

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-lg space-y-6">
      {/* Top action row */}
      <div className="flex items-center justify-between gap-2 border-b border-apple-border/40 dark:border-apple-darkBorder/40 pb-4">
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${badge.bg}`}>
            {badge.label}
          </span>
          <span className="text-[11px] font-mono text-apple-secondary hidden sm:inline">
            • Wittgensteinian Reformulation
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-apple-secondary hover:text-apple-text bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder transition-all"
            title="Copy transformed proposition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Result</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenSaveModal}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-apple-secondary hover:text-apple-text bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder transition-all"
            title="Save thought to your Philosophical Notebook"
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

      {/* 1. The Core Transformation (Original -> Transformed) */}
      <div className="space-y-4">
        {/* Original */}
        <div className="text-xs text-apple-secondary flex items-center space-x-2">
          <span className="uppercase font-mono tracking-wider text-[10px] font-semibold text-apple-secondary">
            Original Formulation:
          </span>
          <span className="font-serif italic text-apple-text/70 dark:text-zinc-400">
            "{analysis.input}"
          </span>
        </div>

        {/* Transformed Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-apple-accent flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transformed into Clear Logical Form</span>
            </span>

            {/* Mode toggles if multiple reformulations exist */}
            {analysis.reformulations.length > 1 && (
              <div className="flex items-center space-x-1">
                {analysis.reformulations.map((ref, idx) => (
                  <button
                    key={ref.id}
                    onClick={() => setSelectedReformulationIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                      selectedReformulationIndex === idx
                        ? "bg-apple-text text-white dark:bg-white dark:text-black font-semibold shadow-apple-sm"
                        : "text-apple-secondary hover:text-apple-text bg-black/5 dark:bg-white/5"
                    }`}
                  >
                    {ref.mode}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-lg sm:text-xl font-serif text-apple-text dark:text-white leading-relaxed font-normal">
            "{activeReformulation?.proposition || analysis.input}"
          </p>

          {activeReformulation?.nonEquivalenceNote && (
            <p className="text-[11px] text-apple-secondary italic">
              Note: {activeReformulation.nonEquivalenceNote}
            </p>
          )}
        </div>
      </div>

      {/* 2. The Reason & The Assumptions in Simple, Human Words */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Why this transformation? */}
        <div className="p-4 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-xs font-mono uppercase text-apple-secondary font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Why the change?</span>
          </div>
          <p className="text-xs sm:text-sm text-apple-text/90 dark:text-zinc-300 font-sans leading-relaxed">
            {analysis.intuitionPreservation.apparentLinguisticProblem || analysis.verdictRationale}
          </p>
        </div>

        {/* What it presupposes (Core Assumption) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-xs font-mono uppercase text-apple-secondary font-semibold">
            <Key className="w-3.5 h-3.5 text-indigo-500" />
            <span>Assumptions in your wording:</span>
          </div>
          <div className="text-xs sm:text-sm text-apple-text/90 dark:text-zinc-300 font-sans leading-relaxed space-y-1">
            {analysis.hiddenAssumptions.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start space-x-1.5">
                <span className="text-apple-secondary select-none">•</span>
                <span>{item.assumption}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Intuition Preserved Assurance */}
      <div className="p-4 rounded-2xl bg-emerald-500/[0.04] dark:bg-emerald-500/[0.08] border border-emerald-500/20 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 flex items-start space-x-3">
        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold font-mono text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
            Your Core Intuition Is Preserved
          </span>
          <p className="leading-relaxed opacity-95">
            "{analysis.intuitionPreservation.underlyingIntuition}"
          </p>
        </div>
      </div>

      {/* 4. Freedom to inspect deeper or leave it simple */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={onToggleDeepInspection}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono text-apple-secondary hover:text-apple-text hover:bg-apple-subtle dark:hover:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder transition-all"
        >
          <span>{showDeepInspection ? "Hide Deep Diagnostics" : "Inspect Deep Analytical Machinery (Ladder, Terms, Type Errors)"}</span>
          {showDeepInspection ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
