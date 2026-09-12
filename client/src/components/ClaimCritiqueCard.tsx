import React, { useState } from "react";
import {
  Check,
  Copy,
  Bookmark,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  Workflow,
  Zap
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
  const [activeVoice, setActiveVoice] = useState<"everyday" | "balanced" | "airtight">("balanced");
  const [showStressTest, setShowStressTest] = useState<boolean>(false);

  const currentCorrectedProposition = (() => {
    if (critique.toneVoices) {
      if (activeVoice === "everyday") return critique.toneVoices.everyday;
      if (activeVoice === "airtight") return critique.toneVoices.airtight;
      if (activeVoice === "balanced") return critique.toneVoices.balanced;
    }
    return critique.correctedProposition;
  })();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCorrectedProposition);
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
          label: "Logically Sound & Clear"
        };
      case "VALID_UNDER_RESTRICTED_SCOPE":
        return {
          bg: "bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200",
          dot: "bg-teal-500",
          label: "True Only in a Specific Context"
        };
      case "CATEGORY_ERROR":
        return {
          bg: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200",
          dot: "bg-rose-500",
          label: "Confusing Grammar with Reality"
        };
      case "CIRCULAR_ARGUMENT":
        return {
          bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200",
          dot: "bg-purple-500",
          label: "Circular Reasoning (Proving A with A)"
        };
      case "LOGICALLY_FLAWED":
      default:
        return {
          bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200",
          dot: "bg-amber-500",
          label: "Flawed Logic / Unproven Leap"
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
              Claim Critic
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
            The Original Claim:
          </div>
          <blockquote className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border-l-4 border-indigo-400 dark:border-indigo-600 font-serif text-lg sm:text-xl text-apple-text dark:text-zinc-100 italic leading-relaxed">
            "{critique.input}"
          </blockquote>
        </div>

        {/* Verdict Summary */}
        <div className="p-4 rounded-2xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/60 dark:border-apple-darkBorder space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-apple-secondary font-semibold">
            Verdict: Is this logically sound?
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
              Where is the problem?
            </h4>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60 space-y-3">
            {/* Problematic Phrase & Flaw Name */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-amber-800 dark:text-amber-200">
                The exact phrase where it trips up:
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

        {/* 1b. STEP-BY-STEP LOGIC FLOW */}
        {critique.stepByStepFlow && critique.stepByStepFlow.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2">
              <Workflow className="w-4 h-4 text-apple-accent" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-apple-text dark:text-zinc-200 font-bold">
                Step-by-Step Logic Flow:
              </h4>
            </div>

            <div className="space-y-2">
              {critique.stepByStepFlow.map((step) => {
                const isLeap = step.status === "unproven_leap" || step.status === "flawed";
                return (
                  <div
                    key={step.stepNumber}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                      isLeap
                        ? "bg-rose-50/70 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60"
                        : "bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border-apple-border/70 dark:border-apple-darkBorder/70"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                        isLeap
                          ? "bg-rose-500 text-white"
                          : "bg-apple-text text-white dark:bg-white dark:text-black"
                      }`}
                    >
                      {step.stepNumber}
                    </span>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-xs sm:text-sm font-medium text-apple-text dark:text-zinc-100 font-sans">
                          {step.statement}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-semibold shrink-0 self-start sm:self-auto ${
                            isLeap
                              ? "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                              : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                          }`}
                        >
                          {step.status === "sound" ? "Sound Step" : "Unproven Jump"}
                        </span>
                      </div>
                      <p className="text-xs text-apple-secondary dark:text-zinc-300 font-sans leading-relaxed">
                        {step.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 1c. AUTHOR DEFENSE / CONTEXT */}
        {critique.authorCounterDefense && (
          <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-apple-border/50 dark:border-apple-darkBorder/50 space-y-1 text-xs">
            <span className="text-[10px] font-mono uppercase text-apple-secondary font-semibold block">
              How the Author Defended This:
            </span>
            <p className="text-apple-secondary dark:text-zinc-300 font-sans italic leading-relaxed">
              "{critique.authorCounterDefense}"
            </p>
          </div>
        )}

        {/* 2. SMUGGLED ASSUMPTIONS */}
        {critique.smuggledAssumptions && critique.smuggledAssumptions.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-blue-500" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-apple-text dark:text-zinc-200 font-bold">
                Hidden assumptions taken for granted without proof:
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
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-bold">
                The Corrected, Sound Version
              </h4>
            </div>

            <div className="flex items-center space-x-2">
              {/* Tone Voice Selector: Everyday | Balanced | Airtight */}
              {critique.toneVoices && (
                <div className="flex items-center space-x-1 p-0.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-apple-border/40 dark:border-apple-darkBorder/40">
                  <button
                    onClick={() => setActiveVoice("everyday")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      activeVoice === "everyday"
                        ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white shadow-apple-sm font-semibold"
                        : "text-apple-secondary hover:text-apple-text"
                    }`}
                    title="Plain conversational English"
                  >
                    ☕ Everyday
                  </button>
                  <button
                    onClick={() => setActiveVoice("balanced")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      activeVoice === "balanced"
                        ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white shadow-apple-sm font-semibold"
                        : "text-apple-secondary hover:text-apple-text"
                    }`}
                    title="Balanced logical proposition"
                  >
                    ⚖ Balanced
                  </button>
                  <button
                    onClick={() => setActiveVoice("airtight")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      activeVoice === "airtight"
                        ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white shadow-apple-sm font-semibold"
                        : "text-apple-secondary hover:text-apple-text"
                    }`}
                    title="Strict boundary guardrails"
                  >
                    🛡 Airtight
                  </button>
                </div>
              )}

              {critique.stressTest && (
                <button
                  onClick={() => setShowStressTest(!showStressTest)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all border ${
                    showStressTest
                      ? "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/35 shadow-apple-sm"
                      : "bg-apple-subtle dark:bg-apple-darkSubtle text-apple-secondary hover:text-apple-text border-apple-border/60 dark:border-apple-darkBorder"
                  }`}
                  title="Test this corrected claim against counter-arguments"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{showStressTest ? "Hide Skeptic Check" : "⚡ Stress-Test"}</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 space-y-3">
            <p className="font-serif text-lg sm:text-xl text-emerald-950 dark:text-emerald-100 font-medium leading-relaxed">
              "{currentCorrectedProposition}"
            </p>

            <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-900/60 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold">
                Why this version actually works:
              </span>
              <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-sans">
                {critique.correctionRationale}
              </p>
            </div>
          </div>

          {/* The Friendly Skeptic Check Card (Hidden by default) */}
          {showStressTest && critique.stressTest && (
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/[0.04] dark:bg-amber-500/[0.07] border border-amber-500/25 space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 flex items-center justify-center text-xs font-mono">
                    ⚡
                  </span>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                    The Friendly Skeptic Check
                  </span>
                </div>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border bg-white/70 dark:bg-black/30 border-amber-500/30 text-amber-900 dark:text-amber-200">
                  {critique.stressTest.solidityRating === "ROCK_SOLID"
                    ? "🟢 Rock Solid"
                    : critique.stressTest.solidityRating === "NEEDS_BOUNDARY"
                    ? "🟡 Needs Clear Boundaries"
                    : "🟣 Subjective Perspective"}
                </span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-300 font-semibold">
                    The #1 objection someone will raise:
                  </div>
                  <p className="text-sm font-sans text-apple-text dark:text-zinc-100 leading-relaxed italic bg-white/60 dark:bg-black/20 p-3.5 rounded-xl border border-amber-500/15">
                    "{critique.stressTest.skepticObjection}"
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold">
                    How the corrected statement holds up:
                  </div>
                  <p className="text-sm font-sans text-apple-text dark:text-zinc-100 leading-relaxed bg-white/60 dark:bg-black/20 p-3.5 rounded-xl border border-emerald-500/20">
                    {critique.stressTest.shieldResponse}
                  </p>
                </div>

                {critique.stressTest.solidityNote && (
                  <p className="text-[11px] text-apple-secondary italic pt-0.5">
                    Tip: {critique.stressTest.solidityNote}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 4. SIMPLE EVERYDAY EXPLANATION */}
        <div className="space-y-2 pt-2">
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-apple-secondary font-semibold">
            Everyday Translation
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
