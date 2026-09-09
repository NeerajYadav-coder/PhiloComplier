import React from "react";
import { X, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder rounded-3xl p-6 sm:p-8 shadow-apple-lg space-y-6 max-h-[88vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-apple-border/50 dark:border-apple-darkBorder/50 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-apple-text text-white dark:bg-white dark:text-black flex items-center justify-center font-serif text-sm font-semibold">
              ☵
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-apple-text dark:text-white uppercase font-mono">
                PhiloCompiler Ethos & Architecture
              </h3>
              <p className="text-[11px] text-apple-secondary">
                A Personal Philosophical Laboratory & Engineering Instrument
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-apple-secondary hover:text-apple-text hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Central Idea */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-apple-secondary font-semibold">
            The Core Question
          </h4>
          <blockquote className="p-4 rounded-2xl bg-apple-subtle/60 dark:bg-apple-darkSubtle/60 border border-apple-border/70 dark:border-apple-darkBorder/70 text-sm font-serif italic text-apple-text dark:text-zinc-100 leading-relaxed">
            "Can philosophical methods for examining language, propositions, assumptions, logical form, and pseudo-problems be operationalized into an interactive computational instrument?"
          </blockquote>
        </div>

        {/* Guiding Axioms */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-apple-secondary font-semibold">
            Guiding Axioms & Rules of Inquiry
          </h4>
          <div className="space-y-2 text-xs text-apple-text/90 dark:text-zinc-300">
            <div className="p-3 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 border border-apple-border/40 dark:border-apple-darkBorder/40 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-apple-accent shrink-0 mt-0.5" />
              <div>
                <strong>Do not mistake grammatical form for ontological structure.</strong> Language allows us to slot abstract nouns ("time", "nature", "nothing") into subject positions, deceiving thought into treating them as moving substances or agents.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 border border-apple-border/40 dark:border-apple-darkBorder/40 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-apple-accent shrink-0 mt-0.5" />
              <div>
                <strong>Do not mistake an inference for an observation.</strong> Distinguish what was directly experienced in observation from what the mind subsequently constructed around it.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 border border-apple-border/40 dark:border-apple-darkBorder/40 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-apple-accent shrink-0 mt-0.5" />
              <div>
                <strong>Before answering, debug the question.</strong> Never rush to answer a question before examining what the question presupposes and what kind of answer could count.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 border border-apple-border/40 dark:border-apple-darkBorder/40 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-apple-accent shrink-0 mt-0.5" />
              <div>
                <strong>Preserve the intuition, debug the formulation.</strong> Never discard a profound human insight merely because its initial linguistic formulation was defective or clumsy.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 border border-apple-border/40 dark:border-apple-darkBorder/40 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-apple-accent shrink-0 mt-0.5" />
              <div>
                <strong>Do not destroy poetic language.</strong> Poetic and aesthetic statements ("The mountain is silent") are not defective physics; avoid scientistic reductionism.
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Preview */}
        <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-apple-border/60 dark:border-apple-darkBorder/60 space-y-2 text-xs">
          <span className="font-mono text-[10px] uppercase text-apple-secondary font-semibold block">
            Incremental Development Strategy
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
            <div className="p-2 rounded bg-white dark:bg-apple-darkSurface border border-apple-accent/40 text-apple-accent font-semibold">
              V0 • Wittgenstein (Current)
            </div>
            <div className="p-2 rounded bg-white dark:bg-apple-darkSurface border border-apple-border text-apple-secondary">
              V1 • Notebook & Versions
            </div>
            <div className="p-2 rounded bg-white dark:bg-apple-darkSurface border border-apple-border text-apple-secondary">
              V2 • Nāgārjuna & Kārikā
            </div>
            <div className="p-2 rounded bg-white dark:bg-apple-darkSurface border border-apple-border text-apple-secondary">
              V3 • Argument Graph
            </div>
            <div className="p-2 rounded bg-white dark:bg-apple-darkSurface border border-apple-border text-apple-secondary">
              V4 • Multi-Philosopher
            </div>
            <div className="p-2 rounded bg-white dark:bg-apple-darkSurface border border-apple-border text-apple-secondary">
              V5 • Research Dataset
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-medium text-white bg-apple-text dark:bg-white dark:text-black hover:opacity-90 transition-opacity"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
