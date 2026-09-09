import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Loader2, ChevronDown, Sparkles, Scale, Compass, ScrollText } from "lucide-react";
import { CanonicalPresetMeta, AnalysisMode } from "../types";

interface PropositionInputProps {
  onAnalyze: (input: string) => void;
  isLoading: boolean;
  presets: CanonicalPresetMeta[];
  currentInput: string;
  onInputChange: (val: string) => void;
  activeMode: AnalysisMode;
  onModeChange: (mode: AnalysisMode) => void;
}

export const PropositionInput: React.FC<PropositionInputProps> = ({
  onAnalyze,
  isLoading,
  presets,
  currentInput,
  onInputChange,
  activeMode,
  onModeChange,
}) => {
  const [showAllPresets, setShowAllPresets] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(88, textareaRef.current.scrollHeight)}px`;
    }
  }, [currentInput]);

  // Handle Cmd+Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (currentInput.trim() && !isLoading) {
        onAnalyze(currentInput);
      }
    }
  };

  // Dynamic curated presets per mode
  const modePresets: Record<AnalysisMode, string[]> = {
    wittgenstein: [
      "Nature wants equilibrium.",
      "Time flows.",
      "Thoughts arise without my choosing them."
    ],
    nagarjuna: [
      "The soul is an independent entity.",
      "The seed produces the sprout by its own inherent power.",
      "Suffering is an intrinsic quality of life."
    ],
    comparative: [
      "The observer exists independently of what is observed.",
      "Language mirrors the fundamental structure of reality.",
      "Mind exists prior to and separate from external objects."
    ],
    karika: [
      "Whatever is dependently co-arisen, that is explained to be emptiness.",
      "Neither from itself, nor from another... does anything arise.",
      "If fire were identical with fuel, the consumer and consumed would be one."
    ]
  };

  const placeholders: Record<AnalysisMode, string> = {
    wittgenstein: "Enter a thought, observation, or question... (e.g. 'Nature wants equilibrium.')",
    nagarjuna: "Enter an assumption of independent existence... (e.g. 'The soul is an independent entity.')",
    comparative: "Enter a proposition to examine through both lenses... (e.g. 'The observer exists independently of what is observed.')",
    karika: "Enter a classical verse or philosophical claim... (e.g. 'Whatever is dependently co-arisen, that is explained to be emptiness.')"
  };

  const buttonLabels: Record<AnalysisMode, string> = {
    wittgenstein: "Debug Proposition",
    nagarjuna: "Deconstruct Svabhāva",
    comparative: "Compare Lenses",
    karika: "Analyze Kārikā"
  };

  const featuredPresets = modePresets[activeMode] || modePresets.wittgenstein;

  return (
    <div className="space-y-3 max-w-3xl mx-auto w-full">
      {/* Mode Selector Pill Bar */}
      <div className="flex items-center justify-center sm:justify-start space-x-1.5 p-1 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-apple-border/50 dark:border-apple-darkBorder/50 w-fit mx-auto sm:mx-0">
        <button
          onClick={() => onModeChange("wittgenstein")}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeMode === "wittgenstein"
              ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white shadow-apple-sm font-semibold"
              : "text-apple-secondary hover:text-apple-text"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Wittgenstein</span>
        </button>

        <button
          onClick={() => onModeChange("nagarjuna")}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeMode === "nagarjuna"
              ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white shadow-apple-sm font-semibold"
              : "text-apple-secondary hover:text-apple-text"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span>Nāgārjuna</span>
        </button>

        <button
          onClick={() => onModeChange("comparative")}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeMode === "comparative"
              ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white shadow-apple-sm font-semibold"
              : "text-apple-secondary hover:text-apple-text"
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-indigo-500" />
          <span>Comparative</span>
        </button>

        <button
          onClick={() => onModeChange("karika")}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeMode === "karika"
              ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white shadow-apple-sm font-semibold"
              : "text-apple-secondary hover:text-apple-text"
          }`}
        >
          <ScrollText className="w-3.5 h-3.5 text-emerald-500" />
          <span>Kārikā</span>
        </button>
      </div>

      {/* Main Clean Input Box */}
      <div className="rounded-2xl p-5 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple hover:border-apple-accent/40 focus-within:border-apple-accent transition-all">
        <textarea
          ref={textareaRef}
          value={currentInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[activeMode]}
          rows={2}
          className="w-full resize-none bg-transparent font-serif text-lg sm:text-xl text-apple-text dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none leading-relaxed"
        />

        <div className="mt-3 pt-3 border-t border-apple-border/40 dark:border-apple-darkBorder/40 flex items-center justify-between">
          <span className="text-[11px] font-mono text-apple-secondary hidden sm:inline">
            <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-apple-border dark:border-apple-darkBorder">⌘</kbd> + <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-apple-border dark:border-apple-darkBorder">↵</kbd>
          </span>

          <button
            onClick={() => onAnalyze(currentInput)}
            disabled={!currentInput.trim() || isLoading}
            className="ml-auto inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white bg-apple-text dark:bg-white dark:text-black hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-apple-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>{buttonLabels[activeMode]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Minimal, single-line clean example pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 text-apple-secondary">
          <span className="text-[11px] font-mono uppercase tracking-wider text-apple-secondary/80 mr-1">
            Try:
          </span>
          {featuredPresets.map((presetText, idx) => (
            <button
              key={idx}
              onClick={() => {
                onInputChange(presetText);
                onAnalyze(presetText);
              }}
              className="px-2.5 py-1 rounded-full bg-apple-subtle dark:bg-apple-darkSubtle hover:bg-black/10 dark:hover:bg-white/10 border border-apple-border/60 dark:border-apple-darkBorder text-apple-text dark:text-zinc-200 transition-colors text-[11px] font-serif italic truncate max-w-[200px]"
            >
              "{presetText}"
            </button>
          ))}
        </div>

        {presets.length > 3 && (
          <button
            onClick={() => setShowAllPresets(!showAllPresets)}
            className="text-[11px] font-mono text-apple-accent hover:underline flex items-center space-x-1 ml-auto"
          >
            <span>{showAllPresets ? "Hide benchmark cases" : `Canonical benchmark cases`}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showAllPresets ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {/* Expandable compact benchmark cases drawer */}
      {showAllPresets && (
        <div className="p-3 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm animate-in fade-in duration-200">
          <div className="text-[10px] font-mono uppercase tracking-wider text-apple-secondary font-semibold mb-2 px-1">
            {activeMode === "nagarjuna" || activeMode === "karika"
              ? "Madhyamaka / MMK Canonical Cases:"
              : activeMode === "comparative"
              ? "Comparative Benchmark Cases:"
              : "Wittgensteinian Benchmark Cases:"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  onInputChange(preset.input);
                  onAnalyze(preset.input);
                  setShowAllPresets(false);
                }}
                className="text-left px-3 py-2 rounded-xl hover:bg-apple-subtle dark:hover:bg-apple-darkSubtle border border-transparent hover:border-apple-border/60 transition-all group"
              >
                <div className="text-[10px] font-mono text-apple-secondary truncate">{preset.category}</div>
                <div className="text-xs font-serif text-apple-text dark:text-zinc-100 group-hover:text-apple-accent truncate">
                  "{preset.input}"
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
