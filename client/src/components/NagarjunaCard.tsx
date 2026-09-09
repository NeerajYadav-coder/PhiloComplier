import React, { useState } from "react";
import { NagarjunaDiagnosticResult } from "../types";
import {
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Key,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Layers,
  HelpCircle,
  Compass
} from "lucide-react";

interface NagarjunaCardProps {
  analysis: NagarjunaDiagnosticResult;
  onReset: () => void;
  onOpenSaveModal: () => void;
}

export const NagarjunaCard: React.FC<NagarjunaCardProps> = ({
  analysis,
  onReset,
  onOpenSaveModal,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showDeepDialectic, setShowDeepDialectic] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis.transformedRelationalProposition);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "SVABHAVA_DECONSTRUCTED":
        return {
          bg: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20",
          label: "Svabhāva Deconstructed",
        };
      case "CONVENTIONALLY_VALID":
        return {
          bg: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20",
          label: "Conventionally Valid (Saṃvṛti)",
        };
      case "ESSENTIALIST_ERROR":
        return {
          bg: "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/20",
          label: "Essentialist Fallacy Exposed",
        };
      case "INTERPRETIVELY_CONTESTED":
      default:
        return {
          bg: "bg-zinc-500/10 text-zinc-800 dark:text-zinc-300 border-zinc-500/20",
          label: "Dialectically Open",
        };
    }
  };

  const badge = getVerdictBadge(analysis.madhyamakaVerdict);
  const isKarika = analysis.mode === "karika";

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-lg space-y-6 animate-fade-in">
      {/* Top action row */}
      <div className="flex items-center justify-between gap-2 border-b border-apple-border/40 dark:border-apple-darkBorder/40 pb-4">
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${badge.bg}`}>
            {badge.label}
          </span>
          <span className="text-[11px] font-mono text-apple-secondary hidden sm:inline">
            • {isKarika ? "Classical Kārikā Dialectic" : "Madhyamaka Dependent Arising"}
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

      {/* 1. The Core Transformation (Original -> Relational Form) */}
      <div className="space-y-4">
        {/* Original Thought */}
        <div className="text-xs text-apple-secondary flex items-center space-x-2">
          <span className="uppercase font-mono tracking-wider text-[10px] font-semibold text-apple-secondary">
            {isKarika ? "Verse / Classical Statement:" : "Original Formulation:"}
          </span>
          <span className="font-serif italic text-apple-text/70 dark:text-zinc-400">
            "{analysis.input}"
          </span>
        </div>

        {/* Transformed Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/[0.04] dark:bg-amber-500/[0.06] border border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Transformed into Relational Dependent Arising (Pratītyasamutpāda)</span>
            </span>
          </div>

          <p className="text-lg sm:text-xl font-serif text-apple-text dark:text-white leading-relaxed font-normal">
            "{analysis.transformedRelationalProposition}"
          </p>
        </div>
      </div>

      {/* 2. Direct Human Reasons in Simple Everyday Words */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Why this transformation? (Svabhāva Critique) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-xs font-mono uppercase text-apple-secondary font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Why the change? (Critique of Independence)</span>
          </div>
          <p className="text-xs sm:text-sm text-apple-text/90 dark:text-zinc-300 font-sans leading-relaxed">
            {analysis.svabhavaCritiqueSummary}
          </p>
        </div>

        {/* What was treated as independent & what conditions were uncovered */}
        <div className="p-4 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-mono uppercase text-apple-secondary font-semibold">
            <Key className="w-3.5 h-3.5 text-amber-600" />
            <span>Assumed independent essence (Svabhāva):</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-apple-text dark:text-zinc-200">
            {analysis.assumedIntrinsicEntity}
          </p>

          <div className="pt-1 border-t border-apple-border/40 dark:border-apple-darkBorder/40">
            <span className="text-[10px] font-mono uppercase text-apple-secondary font-semibold block mb-1.5">
              Relational conditions it actually depends on:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.dependentConditionsUncovered.map((cond, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-lg text-[11px] font-sans bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder text-apple-secondary dark:text-zinc-300"
                >
                  {cond}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Way / Emptiness Reassurance */}
      <div className="p-4 rounded-2xl bg-amber-500/[0.04] dark:bg-amber-500/[0.08] border border-amber-500/20 text-xs sm:text-sm text-amber-950 dark:text-amber-200 flex items-start space-x-3">
        <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold font-mono text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
            The Middle Way (Madhyamaka) Assurance
          </span>
          <p className="leading-relaxed opacity-95">
            Emptiness (śūnyatā) is not nothingness or nihilism. It is the open, dynamic lack of fixed independent essence that makes change, causal efficacy, and practical experience possible.
          </p>
        </div>
      </div>

      {/* 4. Deep Dialectics Disclosure Button */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={() => setShowDeepDialectic(!showDeepDialectic)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono text-apple-secondary hover:text-apple-text hover:bg-apple-subtle dark:hover:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder transition-all"
        >
          <span>
            {showDeepDialectic
              ? "Hide Classical Dialectics"
              : "Inspect Classical Dialectic & Reductio (Prasaṅga / Catuṣkoṭi)"}
          </span>
          {showDeepDialectic ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 5. Collapsed Classical Dialectics Drawer */}
      {showDeepDialectic && (
        <div className="space-y-5 pt-4 border-t border-apple-border/50 dark:border-apple-darkBorder/50 animate-fade-in">
          {/* Prasaṅga Reductio */}
          <div className="p-5 rounded-2xl bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 border border-apple-border dark:border-apple-darkBorder space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-apple-secondary flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>Dialectical Reductio (Prasaṅga Contradiction)</span>
            </span>
            <p className="text-sm font-serif text-apple-text dark:text-zinc-200 leading-relaxed">
              {analysis.prasangaContradiction}
            </p>
          </div>

          {/* Catuṣkoṭi (Four-Corner Grid) */}
          {analysis.catuskotiAnalysis && (
            <div className="p-5 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-apple-secondary flex items-center space-x-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                <span>The Four-Corner Negation (Catuṣkoṭi Analysis)</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/50 dark:border-apple-darkBorder/50 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-apple-secondary block">
                    1. Is (Existent with Svabhāva)
                  </span>
                  <p className="text-xs text-apple-text dark:text-zinc-300">
                    {analysis.catuskotiAnalysis.isAssertion}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/50 dark:border-apple-darkBorder/50 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-apple-secondary block">
                    2. Is Not (Absolute Non-existence)
                  </span>
                  <p className="text-xs text-apple-text dark:text-zinc-300">
                    {analysis.catuskotiAnalysis.isNegation}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/50 dark:border-apple-darkBorder/50 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-apple-secondary block">
                    3. Both (Existent & Non-existent)
                  </span>
                  <p className="text-xs text-apple-text dark:text-zinc-300">
                    {analysis.catuskotiAnalysis.isBoth}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/50 dark:border-apple-darkBorder/50 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-apple-secondary block">
                    4. Neither (Ineffable Third State)
                  </span>
                  <p className="text-xs text-apple-text dark:text-zinc-300">
                    {analysis.catuskotiAnalysis.isNeither}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-500/[0.04] dark:bg-indigo-500/[0.08] border border-indigo-500/20 text-xs text-indigo-950 dark:text-indigo-200">
                <span className="font-semibold font-mono uppercase text-[10px] block mb-0.5">
                  Dialectic Conclusion:
                </span>
                <p>{analysis.catuskotiAnalysis.dialecticConclusion}</p>
              </div>
            </div>
          )}

          {/* Prajñapti (Nominal Designation) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-1.5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-apple-secondary block">
              Conventional Designation (Prajñapti-Upādāya)
            </span>
            <p className="text-xs sm:text-sm text-apple-text/90 dark:text-zinc-300 font-sans leading-relaxed">
              {analysis.prajnaptiNominalDesignation}
            </p>
          </div>

          {/* Humility & Commentarial Note */}
          {analysis.humilityNote && (
            <div className="p-3.5 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 border border-apple-border/40 dark:border-apple-darkBorder/40 text-[11px] text-apple-secondary leading-relaxed font-sans">
              <span className="font-semibold font-mono uppercase text-[10px] block text-apple-secondary mb-0.5">
                Scholarly & Commentarial Note
              </span>
              {analysis.humilityNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
