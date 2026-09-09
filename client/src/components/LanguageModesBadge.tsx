import React from "react";
import { StatementMode } from "../types";

interface LanguageModesBadgeProps {
  modes: {
    mode: StatementMode;
    explanation: string;
  }[];
}

export const LanguageModesBadge: React.FC<LanguageModesBadgeProps> = ({ modes }) => {
  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm">
      <div className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold mb-3">
        Detected Modes of Language
      </div>
      <div className="flex flex-wrap gap-2">
        {modes.map((item, idx) => (
          <div
            key={idx}
            className="group relative inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/70 dark:border-apple-darkBorder text-apple-text dark:text-zinc-200 cursor-default transition-all hover:border-apple-secondary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-apple-secondary mr-2 group-hover:bg-apple-accent transition-colors" />
            <span className="capitalize font-mono">{item.mode}</span>

            {/* Subtle floating detail */}
            <span className="hidden sm:inline-block ml-2 text-[11px] text-apple-secondary">
              — {item.explanation.length > 60 ? `${item.explanation.slice(0, 60)}…` : item.explanation}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
