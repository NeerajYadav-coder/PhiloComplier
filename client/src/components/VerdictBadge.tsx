import React from "react";
import { EpistemicVerdict } from "../types";
import { AlertCircle, CheckCircle2, HelpCircle, Eye, Compass, Feather } from "lucide-react";

interface VerdictBadgeProps {
  verdict: EpistemicVerdict;
  rationale: string;
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict, rationale }) => {
  const getBadgeConfig = () => {
    switch (verdict) {
      case "CLEAR":
      case "EMPIRICALLY TESTABLE":
        return {
          bg: "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/20",
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
          label: verdict.replace(/_/g, " "),
        };
      case "CATEGORYALLY PROBLEMATIC":
      case "PSEUDO-PROPOSITION SUSPECTED":
        return {
          bg: "bg-rose-500/10 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/20",
          icon: <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
          label: verdict.replace(/_/g, " "),
        };
      case "METAPHORICAL":
      case "POETIC":
        return {
          bg: "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border-indigo-500/20",
          icon: <Feather className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          label: verdict.replace(/_/g, " "),
        };
      case "FRAMEWORK-DEPENDENT":
      case "INTERPRETIVELY CONTESTED":
        return {
          bg: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/20",
          icon: <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          label: verdict.replace(/_/g, " "),
        };
      case "AMBIGUOUS":
      case "UNDER-SPECIFIED":
      case "UNRESOLVED":
      default:
        return {
          bg: "bg-zinc-500/10 dark:bg-zinc-500/20 text-zinc-800 dark:text-zinc-300 border-zinc-500/20",
          icon: <HelpCircle className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
          label: verdict.replace(/_/g, " "),
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-apple-border/40 dark:border-apple-darkBorder/40">
        <div className="flex items-center space-x-2">
          <span className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
            Epistemic Diagnostic Verdict
          </span>
        </div>
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${config.bg}`}>
          {config.icon}
          <span className="font-mono tracking-wide">{config.label}</span>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-apple-text/90 dark:text-zinc-300 font-sans">
        {rationale}
      </p>
    </div>
  );
};
