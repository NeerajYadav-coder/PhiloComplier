import React, { useState } from "react";
import { HiddenAssumption } from "../types";
import { Key, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";

interface HiddenAssumptionsViewProps {
  assumptions: HiddenAssumption[];
}

export const HiddenAssumptionsView: React.FC<HiddenAssumptionsViewProps> = ({ assumptions }) => {
  const [expandedId, setExpandedId] = useState<string | null>(assumptions[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getJustificationBadge = (justification: string) => {
    switch (justification) {
      case "JUSTIFIED":
        return {
          color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-600" />,
          label: "Independently Justified",
        };
      case "UNJUSTIFIED":
        return {
          color: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
          icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
          label: "Unjustified Presupposition",
        };
      case "FRAMEWORK_ASSUMPTION":
        return {
          color: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
          icon: <Key className="w-3 h-3 text-amber-600" />,
          label: "Framework Axiom",
        };
      case "OPEN_QUESTION":
      default:
        return {
          color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
          icon: <HelpCircle className="w-3 h-3 text-zinc-500" />,
          label: "Open Philosophical Question",
        };
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
            Hidden Assumptions & Presuppositions
          </h3>
          <p className="text-xs text-apple-secondary mt-0.5">
            Exposing the implicit axioms upon which the claim's apparent coherence depends
          </p>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border dark:border-apple-darkBorder text-apple-secondary">
          {assumptions.length} {assumptions.length === 1 ? "Assumption" : "Assumptions"}
        </span>
      </div>

      <div className="space-y-3">
        {assumptions.map((item) => {
          const isExpanded = expandedId === item.id;
          const badge = getJustificationBadge(item.isIndependentlyJustified);

          return (
            <div
              key={item.id}
              className="rounded-xl border border-apple-border/70 dark:border-apple-darkBorder/70 bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-apple-secondary uppercase font-semibold">
                      {item.isExplicit ? "Explicit" : "Implicit"}
                    </span>
                    <span className={`inline-flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded border ${badge.color}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                  </div>
                  <p className="text-sm font-medium text-apple-text dark:text-zinc-100 font-sans">
                    {item.assumption}
                  </p>
                </div>
                <div className="text-apple-secondary pt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-apple-border/40 dark:border-apple-darkBorder/40 space-y-2.5 text-xs text-apple-text/90 dark:text-zinc-300">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-apple-secondary block">
                      Why the argument depends on this:
                    </span>
                    <p className="font-sans leading-relaxed">{item.dependencyRationale}</p>
                  </div>

                  {item.domainBoundaryWarning && (
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                      <span className="font-semibold block text-[10px] uppercase font-mono text-amber-700 dark:text-amber-400">
                        Domain Boundary Risk:
                      </span>
                      {item.domainBoundaryWarning}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
