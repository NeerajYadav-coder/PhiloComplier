import React, { useState, useEffect, useRef } from "react";
import { Scale, ArrowRight, Loader2, BookOpen, AlertCircle } from "lucide-react";
import { ClaimCritiqueResult } from "../types";
import { ClaimCritiqueCard } from "./ClaimCritiqueCard";
import { directCritiqueClaim, findCanonicalCritique } from "../services/directEngine";

interface ClaimCritiqueViewProps {
  apiKey?: string;
  model?: string;
  onSaveCritiqueToNotebook: (critique: ClaimCritiqueResult) => void;
  onOpenSettings?: () => void;
}

const HISTORICAL_SAMPLES = [
  {
    author: "René Descartes",
    quote: "I think, therefore I am (an immaterial thinking substance)."
  },
  {
    author: "David Hume",
    quote: "Because the sun has risen every morning so far, it is guaranteed to rise tomorrow."
  },
  {
    author: "St. Anselm",
    quote: "God is that than which nothing greater can be conceived; since existing in reality is greater than existing merely in thought, God must exist in reality."
  },
  {
    author: "Zeno of Elea",
    quote: "To reach a destination, an object must first reach halfway, and before that, a quarter way; therefore, motion can never begin or finish."
  },
  {
    author: "Nāgārjuna",
    quote: "Neither from itself, nor from another, nor from both, nor without cause, does anything anywhere ever arise."
  },
  {
    author: "Parmenides",
    quote: "What is not cannot be thought or spoken of, for nothing can come from nothing."
  }
];

export const ClaimCritiqueView: React.FC<ClaimCritiqueViewProps> = ({
  apiKey,
  model,
  onSaveCritiqueToNotebook,
  onOpenSettings
}) => {
  const [claimText, setClaimText] = useState<string>("");
  const [authorText, setAuthorText] = useState<string>("");
  const [critique, setCritique] = useState<ClaimCritiqueResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(90, textareaRef.current.scrollHeight)}px`;
    }
  }, [claimText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (claimText.trim() && !isLoading) {
        handleRunCritique(claimText, authorText);
      }
    }
  };

  const handleRunCritique = async (inputStr: string, authorStr?: string) => {
    const trimmed = inputStr.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);

    // 1. Instant check for matching canonical critique preset
    const preset = findCanonicalCritique(trimmed, authorStr);
    if (preset) {
      setCritique(preset);
      setIsLoading(false);
      return;
    }

    // 2. Direct client-side execution if user entered their API key
    if (apiKey && apiKey.trim()) {
      try {
        const result = await directCritiqueClaim(trimmed, authorStr, apiKey, model);
        setCritique(result);
      } catch (err: any) {
        console.error("Direct critique failed:", err);
        setError(err.message || "Failed to audit the claim with your API key.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // 3. Fallback to local dev backend if available
    try {
      const res = await fetch("/api/critique", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: trimmed,
          author: authorStr?.trim() || undefined,
          model
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${res.status}`);
      }

      const result: ClaimCritiqueResult = await res.json();
      setCritique(result);
    } catch (err: any) {
      console.warn("Backend critique unavailable:", err);
      setError(
        "To critique your own custom claims, please add your free Groq or Gemini API key in Settings (⚙️). Or try any of the historical thinker benchmarks below!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sample: { author: string; quote: string }) => {
    setClaimText(sample.quote);
    setAuthorText(sample.author);
    handleRunCritique(sample.quote, sample.author);
  };

  const handleReset = () => {
    setCritique(null);
    setClaimText("");
    setAuthorText("");
    setError(null);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto w-full">
      {/* Hero Banner when no critique is active */}
      {!critique && (
        <div className="text-center max-w-xl mx-auto space-y-2 py-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300 text-xs font-mono mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Check Any Saying or Quote</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-apple-text dark:text-white">
            Critique Claim
          </h2>
          <p className="text-xs sm:text-sm text-apple-secondary leading-relaxed">
            Paste any quote or saying from any thinker (like Descartes, Nāgārjuna, Kant, or Spinoza).
            Check if it really makes sense, see exactly where the wording trips up, and get the clean, corrected version.
          </p>
        </div>
      )}

      {/* Main Critique Input Box (visible when no critique or can reset) */}
      {!critique && (
        <div className="space-y-3">
          <div className="rounded-2xl p-5 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple hover:border-indigo-400 focus-within:border-indigo-500 transition-all space-y-3">
            {/* The Text / Quote Area */}
            <textarea
              ref={textareaRef}
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste any quote or saying here... (e.g. 'I think, therefore I am.', 'What is not cannot be thought', 'Everything happens for a reason')"
              rows={2}
              className="w-full resize-none bg-transparent font-serif text-lg sm:text-xl text-apple-text dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none leading-relaxed"
            />

            {/* Optional Thinker Attribution */}
            <div className="pt-3 border-t border-apple-border/40 dark:border-apple-darkBorder/40 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
                <BookOpen className="w-3.5 h-3.5 text-apple-secondary" />
                <input
                  type="text"
                  value={authorText}
                  onChange={(e) => setAuthorText(e.target.value)}
                  placeholder="Who said this? (optional: e.g. René Descartes, Nāgārjuna, Kant)"
                  className="w-full text-xs font-sans bg-transparent text-apple-text dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 ml-auto">
                <span className="text-[11px] font-mono text-apple-secondary hidden sm:inline">
                  <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-apple-border dark:border-apple-darkBorder">⌘</kbd> + <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-apple-border dark:border-apple-darkBorder">↵</kbd>
                </span>

                <button
                  onClick={() => handleRunCritique(claimText, authorText)}
                  disabled={!claimText.trim() || isLoading}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-apple-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Checking Logic...</span>
                    </>
                  ) : (
                    <>
                      <span>⚖ Check & Correct Logic</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Historical Samples */}
          <div className="flex flex-wrap items-center gap-1.5 px-1 text-xs">
            <span className="text-[11px] font-mono uppercase tracking-wider text-apple-secondary mr-1">
              Sample Thinkers:
            </span>
            {HISTORICAL_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSample(sample)}
                className="px-2.5 py-1 rounded-full bg-apple-subtle dark:bg-apple-darkSubtle hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 border border-apple-border/60 dark:border-apple-darkBorder text-apple-text dark:text-zinc-200 transition-colors text-[11px] font-serif italic truncate max-w-[200px]"
                title={`${sample.author}: "${sample.quote}"`}
              >
                "{sample.quote.slice(0, 30)}..."
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Notice with Open Settings link */}
      {error && (
        <div className="rounded-2xl p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{error}</span>
          </div>
          <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="px-3 py-1 rounded-lg bg-amber-200/70 dark:bg-amber-800/50 text-amber-900 dark:text-amber-100 font-medium text-[11px] hover:bg-amber-200 transition-colors"
              >
                Open Settings (⚙️)
              </button>
            )}
            <button
              onClick={() => handleRunCritique(claimText, authorText)}
              className="font-mono underline text-amber-700 dark:text-amber-300 text-[11px]"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading state indicator */}
      {isLoading && (
        <div className="rounded-3xl p-10 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder text-center space-y-3 animate-in fade-in">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
          <div className="space-y-1">
            <h4 className="text-sm font-serif font-medium text-apple-text dark:text-white">
              Checking the logic & spotting hidden tricks...
            </h4>
            <p className="text-xs text-apple-secondary max-w-md mx-auto">
              Looking for false leaps, words used like physical objects, and hidden assumptions to show you where the reasoning trips up.
            </p>
          </div>
        </div>
      )}

      {/* Critique Result Card */}
      {critique && (
        <ClaimCritiqueCard
          critique={critique}
          onReset={handleReset}
          onSaveToNotebook={() => onSaveCritiqueToNotebook(critique)}
        />
      )}
    </div>
  );
};
