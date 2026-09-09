import React from "react";
import { WittgensteinianDiagnostic } from "../types";
import { BookMarked, ArrowLeftRight } from "lucide-react";

interface WittgensteinLensViewProps {
  diagnostic: WittgensteinianDiagnostic;
}

export const WittgensteinLensView: React.FC<WittgensteinLensViewProps> = ({ diagnostic }) => {
  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm space-y-4">
      <div className="flex items-center space-x-2 pb-3 border-b border-apple-border/50 dark:border-apple-darkBorder/50">
        <BookMarked className="w-4 h-4 text-apple-accent" />
        <h3 className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
          Dedicated Wittgensteinian Lens
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-apple-secondary">
          Early vs. Later Heuristics
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Early Wittgenstein */}
        <div className="p-4 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/60 dark:border-apple-darkBorder/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase text-apple-text dark:text-zinc-100">
              Early Wittgenstein (Tractatus)
            </span>
            <span className="text-[10px] font-mono text-apple-secondary">
              Logical Form & Picturing
            </span>
          </div>
          <p className="text-xs text-apple-text/85 dark:text-zinc-300 font-sans leading-relaxed">
            {diagnostic.earlyWittgensteinPerspective}
          </p>
        </div>

        {/* Later Wittgenstein */}
        <div className="p-4 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/60 dark:border-apple-darkBorder/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase text-apple-text dark:text-zinc-100">
              Later Wittgenstein (Investigations)
            </span>
            <span className="text-[10px] font-mono text-apple-secondary">
              Language-Games & Grammar
            </span>
          </div>
          <p className="text-xs text-apple-text/85 dark:text-zinc-300 font-sans leading-relaxed">
            {diagnostic.laterWittgensteinPerspective}
          </p>
        </div>
      </div>

      {/* Primary Tension */}
      <div className="p-3.5 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 border border-apple-border/50 dark:border-apple-darkBorder/50 text-xs text-apple-text/90 dark:text-zinc-300 space-y-1">
        <div className="flex items-center space-x-1.5 font-mono text-[10px] uppercase text-apple-secondary font-semibold">
          <ArrowLeftRight className="w-3 h-3 text-apple-accent" />
          <span>Core Philosophical Tension</span>
        </div>
        <p className="font-sans leading-relaxed">
          {diagnostic.primaryTension}
        </p>
      </div>
    </div>
  );
};
