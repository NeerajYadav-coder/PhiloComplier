import React from "react";
import { IntuitionPreservation } from "../types";
import { HeartHandshake, ShieldCheck, Check, Minus, Plus } from "lucide-react";

interface IntuitionPreservationViewProps {
  preservation: IntuitionPreservation;
}

export const IntuitionPreservationView: React.FC<IntuitionPreservationViewProps> = ({
  preservation,
}) => {
  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "HIGH":
        return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "MODERATE":
        return "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "LOW":
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "CONTESTED":
      default:
        return "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700";
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-apple-border/50 dark:border-apple-darkBorder/50 pb-3">
        <div className="flex items-center space-x-2">
          <HeartHandshake className="w-4 h-4 text-apple-accent" />
          <h3 className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
            Keeping What You Really Meant
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-apple-secondary">Match Accuracy:</span>
          <span
            className={`text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border ${getConfidenceBadge(
              preservation.qualitativeConfidence
            )}`}
          >
            {preservation.qualitativeConfidence}
          </span>
        </div>
      </div>

      {/* Underlying Intuition vs Linguistic Trap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/60 dark:border-apple-darkBorder/60 space-y-1.5">
          <span className="text-[10px] uppercase font-mono text-apple-secondary font-semibold block">
            What You Really Meant
          </span>
          <p className="text-sm font-medium text-apple-text dark:text-zinc-100 font-sans leading-relaxed">
            "{preservation.underlyingIntuition}"
          </p>
        </div>

        <div className="p-4 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/60 dark:border-apple-darkBorder/60 space-y-1.5">
          <span className="text-[10px] uppercase font-mono text-apple-secondary font-semibold block">
            Where Words Got In the Way
          </span>
          <p className="text-xs text-apple-text/80 dark:text-zinc-300 font-sans leading-relaxed">
            {preservation.apparentLinguisticProblem}
          </p>
        </div>
      </div>

      {/* 3-Column Diff Table: Preserved, Lost, Added */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        {/* Preserved Core */}
        <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 space-y-1">
          <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-mono font-semibold uppercase text-[10px]">
            <Check className="w-3.5 h-3.5" />
            <span>Kept in the Clear Version</span>
          </div>
          <p className="text-apple-text/90 dark:text-zinc-200 font-sans leading-relaxed">
            {preservation.preservedCore}
          </p>
        </div>

        {/* Lost or Altered */}
        <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 space-y-1">
          <div className="flex items-center space-x-1.5 text-rose-700 dark:text-rose-400 font-mono font-semibold uppercase text-[10px]">
            <Minus className="w-3.5 h-3.5" />
            <span>Removed (Misleading or Extra)</span>
          </div>
          <p className="text-apple-text/90 dark:text-zinc-200 font-sans leading-relaxed">
            {preservation.lostOrDistortedElements}
          </p>
        </div>

        {/* Added Elements */}
        <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/40 space-y-1">
          <div className="flex items-center space-x-1.5 text-blue-700 dark:text-blue-400 font-mono font-semibold uppercase text-[10px]">
            <Plus className="w-3.5 h-3.5" />
            <span>Added for Clarity</span>
          </div>
          <p className="text-apple-text/90 dark:text-zinc-200 font-sans leading-relaxed">
            {preservation.addedElements}
          </p>
        </div>
      </div>

      <div className="text-xs text-apple-secondary italic">
        <span className="font-semibold not-italic font-sans text-apple-text dark:text-zinc-300">Why This Keeps Your True Meaning: </span>
        {preservation.confidenceRationale}
      </div>
    </div>
  );
};
