import React from "react";
import { Sliders, BookOpen, ShieldCheck, Sparkles, Bookmark, Terminal } from "lucide-react";

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  hasCustomKey: boolean;
  engineUsed?: string;
  currentView: "debugger" | "notebook";
  onSelectView: (view: "debugger" | "notebook") => void;
  notebookCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onOpenAbout,
  hasCustomKey,
  engineUsed,
  currentView,
  onSelectView,
  notebookCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-apple-border/60 dark:border-apple-darkBorder/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSelectView("debugger")}
            className="w-8 h-8 rounded-xl bg-apple-text text-white dark:bg-white dark:text-black flex items-center justify-center font-serif text-lg font-semibold shadow-apple-sm select-none hover:opacity-90 transition-opacity"
          >
            ☵
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-semibold tracking-tight text-apple-text dark:text-white uppercase font-sans">
                PhiloCompiler
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-apple-secondary font-medium">
                V1 • Laboratory
              </span>
            </div>
            <p className="text-[11px] text-apple-secondary hidden sm:block">
              A Computational Instrument for Philosophical-Linguistic Debugging
            </p>
          </div>
        </div>

        {/* Center: View Switcher (Debugger vs Notebook) */}
        <div className="flex items-center p-1 rounded-xl bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/70 dark:border-apple-darkBorder text-xs font-mono">
          <button
            onClick={() => onSelectView("debugger")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              currentView === "debugger"
                ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white font-semibold shadow-apple-sm"
                : "text-apple-secondary hover:text-apple-text"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Debugger</span>
          </button>
          <button
            onClick={() => onSelectView("notebook")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              currentView === "notebook"
                ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white font-semibold shadow-apple-sm"
                : "text-apple-secondary hover:text-apple-text"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            <span>Notebook</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/5 dark:bg-white/10 text-apple-secondary">
              {notebookCount}
            </span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {engineUsed && (
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border border-apple-border/80 dark:border-apple-darkBorder bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 text-apple-secondary">
              {engineUsed === "groq_live" ? (
                <>
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span className="text-apple-text dark:text-zinc-200">Groq Reasoning Live</span>
                </>
              ) : engineUsed === "gemini_live" ? (
                <>
                  <Sparkles className="w-3 h-3 text-apple-accent" />
                  <span>Gemini Live</span>
                </>
              ) : engineUsed === "canonical_offline" ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Canonical Benchmark</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Offline Heuristics</span>
                </>
              )}
            </div>
          )}

          <button
            onClick={onOpenAbout}
            className="p-2 rounded-lg text-apple-secondary hover:text-apple-text hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Philosophical Ethos & Guide"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-apple-text dark:text-white bg-apple-subtle dark:bg-apple-darkSubtle hover:bg-black/10 dark:hover:bg-white/15 transition-all border border-apple-border/50 dark:border-apple-darkBorder"
          >
            <Sliders className="w-3.5 h-3.5 text-apple-secondary" />
            <span className="hidden sm:inline">Settings</span>
            {hasCustomKey && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
