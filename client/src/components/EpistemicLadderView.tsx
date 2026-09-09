import React from "react";
import { EpistemicLadderStep } from "../types";
import { AlertTriangle, ArrowDown, Eye, FileText, Layers, GitCommit, Sparkles } from "lucide-react";

interface EpistemicLadderViewProps {
  ladder: EpistemicLadderStep[];
  hasInferenceJump: boolean;
}

export const EpistemicLadderView: React.FC<EpistemicLadderViewProps> = ({
  ladder,
  hasInferenceJump,
}) => {
  const getStepIcon = (level: string) => {
    switch (level) {
      case "OBSERVATION":
        return <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case "DESCRIPTION":
        return <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "INTERPRETATION":
        return <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
      case "INFERENCE":
        return <GitCommit className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
      case "METAPHYSICAL_CLAIM":
        return <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />;
      default:
        return null;
    }
  };

  const getStepBadgeColor = (level: string) => {
    switch (level) {
      case "OBSERVATION":
        return "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900";
      case "DESCRIPTION":
        return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900";
      case "INTERPRETATION":
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900";
      case "INFERENCE":
        return "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900";
      case "METAPHYSICAL_CLAIM":
        return "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
            Epistemic Ladder & Inferential Boundary
          </h3>
          <p className="text-xs text-apple-secondary mt-0.5">
            Deconstructing direct observation from mental interpretation and metaphysical assertions
          </p>
        </div>
        {hasInferenceJump && (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Inferential Jump Detected</span>
          </span>
        )}
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-apple-border dark:before:bg-apple-darkBorder">
        {ladder.map((step, idx) => (
          <div key={idx} className="relative group">
            {/* Step node dot */}
            <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white dark:bg-apple-darkSurface border-2 border-apple-border dark:border-apple-darkBorder flex items-center justify-center group-hover:border-apple-accent transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-apple-secondary group-hover:bg-apple-accent" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono uppercase font-medium border ${getStepBadgeColor(step.level)}`}>
                  {getStepIcon(step.level)}
                  <span>{step.level.replace(/_/g, " ")}</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-apple-subtle/60 dark:bg-apple-darkSubtle/60 border border-apple-border/50 dark:border-apple-darkBorder/50 text-sm text-apple-text dark:text-zinc-200">
                {step.content}
              </div>

              {step.isInferenceJump && step.jumpAlert && (
                <div className="flex items-start space-x-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300/50 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs mt-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold font-mono tracking-tight block">
                      BOUNDARY CROSSING ALERT
                    </span>
                    <p className="leading-relaxed opacity-95">{step.jumpAlert}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
