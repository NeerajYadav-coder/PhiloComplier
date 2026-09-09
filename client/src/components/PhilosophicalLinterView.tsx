import React from "react";
import { LinterWarning } from "../types";
import { AlertTriangle, Info, AlertOctagon, Terminal } from "lucide-react";

interface PhilosophicalLinterViewProps {
  warnings: LinterWarning[];
}

export const PhilosophicalLinterView: React.FC<PhilosophicalLinterViewProps> = ({ warnings }) => {
  if (warnings.length === 0) return null;

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "warning":
        return {
          bg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
        };
      case "caution":
        return {
          bg: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
          icon: <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />,
        };
      case "info":
      default:
        return {
          bg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
          icon: <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
        };
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-apple-accent" />
          <h3 className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
            Logic & Language Checks
          </h3>
        </div>
        <span className="text-xs font-mono text-apple-secondary">
          {warnings.length} {warnings.length === 1 ? "Notice" : "Notices"}
        </span>
      </div>

      <div className="space-y-2.5">
        {warnings.map((warn, idx) => {
          const badge = getSeverityBadge(warn.severity);
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-apple-border/60 dark:border-apple-darkBorder/60 bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 space-y-1.5"
            >
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center space-x-1 font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                  {badge.icon}
                  <span>{warn.code}</span>
                </span>
                <span className="text-xs font-semibold text-apple-text dark:text-zinc-100 font-mono">
                  {warn.title}
                </span>
              </div>

              <p className="text-xs text-apple-text/85 dark:text-zinc-300 font-sans leading-relaxed pl-1">
                {warn.message}
              </p>

              {warn.suggestion && (
                <div className="text-[11px] text-apple-secondary font-mono pt-1 border-t border-apple-border/30 dark:border-apple-darkBorder/30 pl-1">
                  💡 Tip: {warn.suggestion}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
