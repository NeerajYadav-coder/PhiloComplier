import React, { useState } from "react";
import { PhilosophicalAnalysisResult, Reformulation } from "../types";
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
  GitBranch,
  Zap,
  Volume2,
  CheckCircle2
} from "lucide-react";

interface CleanTransformationCardProps {
  analysis: PhilosophicalAnalysisResult;
  onReset: () => void;
  onOpenSaveModal: () => void;
  showDeepInspection: boolean;
  onToggleDeepInspection: () => void;
  onEvolveThought?: (refinedText: string) => void;
}

export const CleanTransformationCard: React.FC<CleanTransformationCardProps> = ({
  analysis,
  onReset,
  onOpenSaveModal,
  showDeepInspection,
  onToggleDeepInspection,
  onEvolveThought,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedReformulationIndex, setSelectedReformulationIndex] = useState<number>(0);
  const [activeVoice, setActiveVoice] = useState<"everyday" | "balanced" | "airtight">("balanced");
  const [showStressTest, setShowStressTest] = useState<boolean>(false);

  const isSound = Boolean(
    analysis.isAlreadySound ||
    analysis.verdict === "CLEAR" ||
    analysis.verdict === "EMPIRICALLY TESTABLE"
  );

  const activeReformulation: Reformulation | undefined =
    analysis.reformulations[selectedReformulationIndex] || analysis.reformulations[0];

  // Derive the active proposition based on chosen clarity voice or default reformulation
  const currentProposition = (() => {
    if (isSound) return analysis.input;
    if (analysis.toneVoices) {
      if (activeVoice === "everyday") return analysis.toneVoices.everyday;
      if (activeVoice === "airtight") return analysis.toneVoices.airtight;
      if (activeVoice === "balanced") return analysis.toneVoices.balanced;
    }
    return activeReformulation?.proposition || analysis.input;
  })();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentProposition);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVerdictBadge = (verdict: string) => {
    if (isSound) {
      return {
        bg: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20",
        label: "✓ Already Clear & Sound (No Debugging Needed)",
      };
    }
    switch (verdict) {
      case "CLEAR":
      case "EMPIRICALLY TESTABLE":
        return {
          bg: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20",
          label: "✓ Already Clear & Sound",
        };
      case "CATEGORYALLY PROBLEMATIC":
      case "PSEUDO-PROPOSITION SUSPECTED":
        return {
          bg: "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/20",
          label: "Confusing Grammar with Reality",
        };
      case "METAPHORICAL":
      case "POETIC":
        return {
          bg: "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/20",
          label: "Metaphor, Not Literal Fact",
        };
      case "AMBIGUOUS":
      case "UNDER-SPECIFIED":
      default:
        return {
          bg: "bg-zinc-500/10 text-zinc-800 dark:text-zinc-300 border-zinc-500/20",
          label: "Needs More Specific Details",
        };
    }
  };

  const badge = getVerdictBadge(analysis.verdict);

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-lg space-y-6">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-apple-border/40 dark:border-apple-darkBorder/40 pb-4">
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${badge.bg}`}>
            {badge.label}
          </span>
          <span className="text-[11px] font-mono text-apple-secondary hidden sm:inline">
            • {isSound ? "Verified Sound Logic" : "Refined Formulation"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {analysis.stressTest && (
            <button
              onClick={() => setShowStressTest(!showStressTest)}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                showStressTest
                  ? "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/35 shadow-apple-sm"
                  : "bg-apple-subtle dark:bg-apple-darkSubtle text-apple-secondary hover:text-apple-text border-apple-border/60 dark:border-apple-darkBorder"
              }`}
              title="Test this thought against real-world counter-arguments"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>{showStressTest ? "Hide Skeptic Check" : "⚡ Stress-Test"}</span>
            </button>
          )}

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
                <span>Copy</span>
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

          {onEvolveThought && (
            <button
              onClick={() => onEvolveThought(currentProposition)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-apple-accent hover:text-white hover:bg-apple-accent bg-apple-accent/10 border border-apple-accent/25 transition-all"
              title="Debug a further refinement of this proposition (Next Version)"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Evolve</span>
            </button>
          )}

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
        {isSound ? (
          /* Already Sound Affirmation Card */
          <div className="p-6 sm:p-7 rounded-2xl bg-emerald-500/[0.05] dark:bg-emerald-500/[0.09] border border-emerald-500/25 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>This Thought Is Already Logically Sound</span>
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 font-medium">
                No Correction Needed
              </span>
            </div>

            <p className="text-xl sm:text-2xl font-serif text-apple-text dark:text-white leading-relaxed font-normal">
              "{analysis.input}"
            </p>

            <p className="text-xs sm:text-sm text-emerald-950/90 dark:text-emerald-200/90 font-sans leading-relaxed pt-2 border-t border-emerald-500/20">
              ✨ According to Wittgensteinian logic, your proposition is already grounded in verifiable observation and unambiguous language. It pictures reality clearly without grammatical illusions or unproven metaphysical jumps.
            </p>
          </div>
        ) : (
          /* Standard Transformation Card */
          <>
            <div className="text-xs text-apple-secondary flex items-center space-x-2">
              <span className="uppercase font-mono tracking-wider text-[10px] font-semibold text-apple-secondary">
                What You Said:
              </span>
              <span className="font-serif italic text-apple-text/70 dark:text-zinc-400">
                "{analysis.input}"
              </span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-apple-accent flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clear, Refined Version</span>
                </span>

                {/* Tone Voice Selector: Everyday | Balanced | Airtight */}
                {analysis.toneVoices ? (
                  <div className="flex items-center space-x-1 p-0.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-apple-border/40 dark:border-apple-darkBorder/40">
                    <button
                      onClick={() => setActiveVoice("everyday")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                        activeVoice === "everyday"
                          ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white shadow-apple-sm font-semibold"
                          : "text-apple-secondary hover:text-apple-text"
                      }`}
                      title="How you'd explain it to a friend over coffee"
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
                      title="Explicit boundaries preventing edge-case attacks"
                    >
                      🛡 Airtight
                    </button>
                  </div>
                ) : analysis.reformulations.length > 1 ? (
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
                ) : null}
              </div>

              <p className="text-lg sm:text-xl font-serif text-apple-text dark:text-white leading-relaxed font-normal">
                "{currentProposition}"
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-apple-border/40 dark:border-apple-darkBorder/40">
                {activeReformulation?.nonEquivalenceNote ? (
                  <p className="text-[11px] text-apple-secondary italic">
                    Note: {activeReformulation.nonEquivalenceNote}
                  </p>
                ) : <div />}

                {onEvolveThought && (
                  <button
                    onClick={() => onEvolveThought(currentProposition)}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono text-apple-accent hover:text-apple-accentHover transition-colors ml-auto"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Evolve into next version →</span>
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* The Friendly Skeptic (Stress-Test Card) - Hidden by default, smooth disclosure */}
      {showStressTest && analysis.stressTest && (
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
              {analysis.stressTest.solidityRating === "ROCK_SOLID"
                ? "🟢 Rock Solid (Common Sense & Logic)"
                : analysis.stressTest.solidityRating === "NEEDS_BOUNDARY"
                ? "🟡 Needs Clear Boundaries"
                : "🟣 Subjective Perspective"}
            </span>
          </div>

          <div className="space-y-3">
            {/* The Skeptic's Objection */}
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-300 font-semibold">
                The #1 objection someone will raise:
              </div>
              <p className="text-sm font-sans text-apple-text dark:text-zinc-100 leading-relaxed italic bg-white/60 dark:bg-black/20 p-3.5 rounded-xl border border-amber-500/15">
                "{analysis.stressTest.skepticObjection}"
              </p>
            </div>

            {/* Your Shield */}
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold">
                How to defend your statement in conversation:
              </div>
              <p className="text-sm font-sans text-apple-text dark:text-zinc-100 leading-relaxed bg-white/60 dark:bg-black/20 p-3.5 rounded-xl border border-emerald-500/20">
                {analysis.stressTest.shieldResponse}
              </p>
            </div>

            {/* Advice Note */}
            {analysis.stressTest.solidityNote && (
              <p className="text-[11px] text-apple-secondary italic pt-0.5">
                Tip: {analysis.stressTest.solidityNote}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 2. The Reason & The Assumptions in Simple, Human Words */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Why this transformation? */}
        <div className="p-4 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-xs font-mono uppercase text-apple-secondary font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>What was confusing before & why this is clearer:</span>
          </div>
          <p className="text-xs sm:text-sm text-apple-text/90 dark:text-zinc-300 font-sans leading-relaxed">
            {analysis.intuitionPreservation.apparentLinguisticProblem || analysis.verdictRationale}
          </p>
        </div>

        {/* What it presupposes (Core Assumption) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border/70 dark:border-apple-darkBorder/70 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-xs font-mono uppercase text-apple-secondary font-semibold">
            <Key className="w-3.5 h-3.5 text-indigo-500" />
            <span>Assumptions you might be making:</span>
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
            What You Really Meant (Intuition Kept Intact)
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
          <span>{showDeepInspection ? "Hide Detailed Breakdown" : "Explore Detailed Breakdown (Step-by-Step Logic, Words & Checks)"}</span>
          {showDeepInspection ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
