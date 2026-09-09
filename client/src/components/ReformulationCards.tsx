import React from "react";
import { Reformulation } from "../types";
import { Sparkles, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";

interface ReformulationCardsProps {
  reformulations: Reformulation[];
  onSelectReformulation: (prop: string) => void;
}

export const ReformulationCards: React.FC<ReformulationCardsProps> = ({
  reformulations,
  onSelectReformulation,
}) => {
  const getModeBadge = (mode: string) => {
    switch (mode) {
      case "empirical":
        return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "phenomenological":
        return "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "metaphysical":
        return "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "poetic":
        return "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
      case "ordinary_language":
      default:
        return "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700";
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
            Alternative Ways to Say This
          </h3>
          <p className="text-xs text-apple-secondary mt-0.5">
            Different clear ways to express what you really meant
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span className="font-sans">
          <strong>Helpful Note:</strong> Each version has a slightly different focus—pick the one that best captures what you want to communicate.
        </span>
      </div>

      <div className="space-y-4">
        {reformulations.map((ref) => (
          <div
            key={ref.id}
            className="p-5 rounded-xl border border-apple-border/70 dark:border-apple-darkBorder/70 bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded border ${getModeBadge(
                    ref.mode
                  )}`}
                >
                  {ref.label}
                </span>
              </div>
              <button
                onClick={() => onSelectReformulation(ref.proposition)}
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-apple-accent hover:text-apple-accentHover transition-colors self-start sm:self-auto"
              >
                <span>Try this version</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-base font-serif italic text-apple-text dark:text-zinc-100 pl-3 border-l-2 border-apple-accent/50 leading-relaxed">
              "{ref.proposition}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-apple-border/40 dark:border-apple-darkBorder/40">
                <span className="font-mono text-[10px] uppercase text-emerald-700 dark:text-emerald-400 block font-semibold">
                  What this keeps:
                </span>
                <span className="text-apple-text/80 dark:text-zinc-300 font-sans">{ref.whatIsPreserved}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-apple-border/40 dark:border-apple-darkBorder/40">
                <span className="font-mono text-[10px] uppercase text-rose-700 dark:text-rose-400 block font-semibold">
                  What changes or drops:
                </span>
                <span className="text-apple-text/80 dark:text-zinc-300 font-sans">{ref.whatIsAlteredOrLost}</span>
              </div>
            </div>

            <p className="text-[11px] text-apple-secondary italic">
              Note: {ref.nonEquivalenceNote}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
