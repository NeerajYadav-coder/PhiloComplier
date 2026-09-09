import React, { useState } from "react";
import {
  Check,
  Copy,
  Bookmark,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info
} from "lucide-react";
import { ClaimCritiqueResult } from "../types";

interface ClaimCritiqueCardProps {
  critique: ClaimCritiqueResult;
  onReset: () => void;
  onSaveToNotebook: () => void;
}

export const ClaimCritiqueCard: React.FC<ClaimCritiqueCardProps> = ({
  critique,
  onReset,
  onSaveToNotebook,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(critique.correctedProposition);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveToNotebook();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Verdict badge formatting
  const getVerdictBadge = () => {
    switch (critique.verdict) {
      case "SOUND":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
          dot: "bg-emerald-500",
          label: "Logically Sound"
        };
      case "VALID_UNDER_RESTRICTED_SCOPE":
        return {
          bg: "bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200",
          dot: "bg-teal-500",
          label: "Valid Under Restricted Scope"
        };
      case "CATEGORY_ERROR":
        return {
          bg: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200",
          dot: "bg-rose-500",
          label: "Category Error"
        };
      case "CIRCULAR_ARGUMENT":
        return {
          bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200",
          dot: "bg-purple-500",
          label: "Circular Argument"
        };
      case "LOGICALLY_FLAWED":
      default:
        return {
          bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200",
          dot: "bg-amber-500",
          label: "Logically Flawed"
        };
    }
  };

  const badge = getVerdictBadge();

  return (
    <div className="space-y-6 max-w-3xl mx-auto w-full">
      {/* Top Header Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple space-y-6">
        {/* Author / Source & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-apple-border/50 dark:border-apple-darkBorder/50">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-mono text-xs">
              ⚖
            </span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-apple-secondary">
              Philosophical Claim Critic
            </span>
            {critique.authorOrTradition && (
              <>
                <span className="text-apple-secondary/50">•</span>
                <span className="text-xs font-medium text-apple-text dark:text-zinc-200">
                  {critique.authorOrTradition}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.bg}`}
            >
              <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
              <span>{badge.label}</span>
            </span>
          </div>
        </div>

        {/* The Original Claim Quoted */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-apple-secondary">
            Original Text / Claim Examined:
          </div>
          <blockquote className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border-l-4 border-indigo-400 dark:border-indigo-600 font-serif text-lg sm:text-xl text-apple-text dark:text-zinc-100 italic leading-relaxed">
            "{critique.input}"
          </blockquote>
        </div>

        {/* Verdict Summary */}
        <div className="p-4 rounded-2xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/60 dark:border-apple-darkBorder space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-apple-secondary font-semibold">
            Audit Verdict
          </div>
          <p className="text-sm font-medium text-apple-text dark:text-zinc-100 leading-snug">
            {critique.verdictSummary}
          </p>
        </div>

        {/* 1. WHERE IS THE PROBLEM? */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-apple-text dark:text-zinc-200 font-bold">
              Where Is The Problem?
            </h4>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60 space-y-3">
            {/* Problematic Phrase & Flaw Name */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-amber-800 dark:text-amber-200">
                Problematic Step:
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-200/60 dark:bg-amber-900/60 font-mono text-xs font-bold text-amber-900 dark:text-amber-100 border border-amber-300 dark:border-amber-800">
                "{critique.whereIsTheProblem.problematicPhrase}"
              </span>
              <span className="text-xs text-apple-secondary">→</span>
              <span className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                [{critique.whereIsTheProblem.flawType}]
              </span>
            </div>

            {/* Explanation */}
            <p className="text-sm text-apple-text dark:text-zinc-200 leading-relaxed font-sans">
              {critique.whereIsTheProblem.explanation}
            </p>
          </div>
        </div>

        {/* 2. SMUGGLED ASSUMPTIONS */}
        {critique.smuggledAssumptions && critique.smuggledAssumptions.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-blue-500" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-apple-text dark:text-zinc-200 font-bold">
                Smuggled / Unjustified Assumptions
              </h4>
            </div>

            <ul className="space-y-2">
              {critique.smuggledAssumptions.map((assumption, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2.5 text-xs sm:text-sm text-apple-secondary dark:text-zinc-300 bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 p-3 rounded-xl border border-apple-border/50 dark:border-apple-darkBorder/50"
                >
                  <span className="text-apple-secondary font-mono font-bold mt-0.5">•</span>
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. THE CORRECTED PROPOSITION */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-bold">
              The Corrected Proposition
            </h4>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 space-y-3">
            <p className="font-serif text-lg sm:text-xl text-emerald-950 dark:text-emerald-100 font-medium leading-relaxed">
              "{critique.correctedProposition}"
            </p>

            <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-900/60 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold">
                Why this is logically sound:
              </span>
              <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-sans">
                {critique.correctionRationale}
              </p>
            </div>
          </div>
        </div>

        {/* 4. SIMPLE EVERYDAY EXPLANATION */}
        <div className="space-y-2 pt-2">
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-apple-secondary font-semibold">
            Simple Plain-Language Breakdown
          </h4>
          <p className="text-xs sm:text-sm text-apple-secondary dark:text-zinc-300 leading-relaxed italic bg-black/[0.02] dark:bg-white/[0.02] p-4 rounded-xl border border-apple-border/40 dark:border-apple-darkBorder/40">
            "{critique.simpleExplanation}"
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="pt-4 border-t border-apple-border/50 dark:border-apple-darkBorder/50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-medium text-apple-secondary hover:text-apple-text hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Critique Another Claim</span>
          </button>

          <div className="flex items-center space-x-2 ml-auto">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-medium text-apple-text dark:text-white bg-apple-subtle dark:bg-apple-darkSubtle hover:bg-black/10 dark:hover:bg-white/15 transition-all border border-apple-border dark:border-apple-darkBorder"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Correction</span>
                </>
              )}
            </button>

            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-apple-sm"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Saved in Notebook</span>
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
    </div>
  );
};
