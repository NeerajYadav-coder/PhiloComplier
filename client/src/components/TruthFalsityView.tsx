import React from "react";
import { TruthFalsityConditions } from "../types";
import { Check, X, ShieldAlert, FileQuestion } from "lucide-react";

interface TruthFalsityViewProps {
  conditions: TruthFalsityConditions;
}

export const TruthFalsityView: React.FC<TruthFalsityViewProps> = ({ conditions }) => {
  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
            How to Test This Thought
          </h3>
          <p className="text-xs text-apple-secondary mt-0.5">
            What real-world evidence would prove this right or wrong?
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border dark:border-apple-darkBorder text-apple-secondary">
          {conditions.falsificationCategory.replace(/_/g, " ")}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {conditions.whatWouldMakeItTrue && (
          <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-mono font-semibold uppercase text-[10px]">
              <Check className="w-3.5 h-3.5" />
              <span>What would prove it true:</span>
            </div>
            <p className="text-apple-text/90 dark:text-zinc-200 font-sans leading-relaxed">
              {conditions.whatWouldMakeItTrue}
            </p>
          </div>
        )}

        {conditions.whatWouldMakeItFalse && (
          <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-rose-700 dark:text-rose-400 font-mono font-semibold uppercase text-[10px]">
              <X className="w-3.5 h-3.5" />
              <span>What would prove it false:</span>
            </div>
            <p className="text-apple-text/90 dark:text-zinc-200 font-sans leading-relaxed">
              {conditions.whatWouldMakeItFalse}
            </p>
          </div>
        )}
      </div>

      <div className="p-3.5 rounded-xl bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 border border-apple-border/50 dark:border-apple-darkBorder/50 text-xs text-apple-text/90 dark:text-zinc-300 font-sans leading-relaxed">
        <span className="font-semibold text-apple-secondary font-mono text-[10px] uppercase block mb-1">
          Can this thought actually be tested?
        </span>
        {conditions.falsificationAnalysis}
      </div>
    </div>
  );
};
