import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Loader2, ChevronDown } from "lucide-react";
import { CanonicalPresetMeta } from "../types";

interface PropositionInputProps {
  onAnalyze: (input: string) => void;
  isLoading: boolean;
  presets?: CanonicalPresetMeta[];
  currentInput: string;
  onInputChange: (val: string) => void;
}

export const PropositionInput: React.FC<PropositionInputProps> = ({
  onAnalyze,
  isLoading,
  presets = [],
  currentInput,
  onInputChange,
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

  const curatedPresets = [
    "Nature wants equilibrium.",
    "Time flows.",
    "Thoughts arise without my choosing them.",
    "The universe has a cause."
  ];

  return (
    <div className="space-y-3 max-w-3xl mx-auto w-full">

      {/* Main Clean Input Box */}
      <div className="rounded-2xl p-5 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple hover:border-apple-accent/40 focus-within:border-apple-accent transition-all">
        <textarea
          ref={textareaRef}
          value={currentInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type any thought, belief, or observation... (e.g. 'Nature wants balance', 'Time is flowing by', 'Thoughts come on their own')"
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
                <span>Debugging...</span>
              </>
            ) : (
              <>
                <span>✦ Debug Thought</span>
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
          {curatedPresets.map((presetText, idx) => (
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

        {presets.length > 0 && (
          <button
            onClick={() => setShowAllPresets(!showAllPresets)}
            className="text-[11px] font-mono text-apple-accent hover:underline flex items-center space-x-1 ml-auto"
          >
            <span>{showAllPresets ? "Hide standard cases" : "Standard benchmark cases"}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showAllPresets ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {/* Expandable compact benchmark cases drawer */}
      {showAllPresets && (
        <div className="p-3 rounded-2xl bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm animate-in fade-in duration-200">
          <div className="text-[10px] font-mono uppercase tracking-wider text-apple-secondary font-semibold mb-2 px-1">
            Standard Benchmark Cases:
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
