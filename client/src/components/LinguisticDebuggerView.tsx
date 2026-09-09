import React from "react";
import { LinguisticTerm, GrammaticalFormAnalysis, PhilosophicalTypeError } from "../types";
import { Code2, AlertCircle, Sparkles, Terminal } from "lucide-react";

interface LinguisticDebuggerViewProps {
  terms: LinguisticTerm[];
  grammar: GrammaticalFormAnalysis;
  typeError: PhilosophicalTypeError;
}

export const LinguisticDebuggerView: React.FC<LinguisticDebuggerViewProps> = ({
  terms,
  grammar,
  typeError,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Terms in Use */}
      <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm">
        <div className="mb-4">
          <h3 className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
            Terms in Use & Grammatical Roles
          </h3>
          <p className="text-xs text-apple-secondary mt-0.5">
            What philosophical work is each word performing in this concrete proposition?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {terms.map((term, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/60 dark:border-apple-darkBorder/60 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-apple-text dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">
                  {term.term}
                </span>
                {term.isPhilosophicallyLoaded && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    Philosophically Loaded
                  </span>
                )}
              </div>

              <div className="text-xs text-apple-text/80 dark:text-zinc-300">
                <span className="text-apple-secondary font-mono text-[11px] block">Role:</span>
                {term.roleInSentence}
              </div>

              {term.potentialGrammaticalIllusion && (
                <div className="text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/20 p-2 rounded-lg border border-rose-200 dark:border-rose-900/40 mt-1">
                  <span className="font-semibold block text-[10px] uppercase font-mono text-rose-600 dark:text-rose-400">
                    Grammatical Illusion Risk:
                  </span>
                  {term.potentialGrammaticalIllusion}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Grammatical Form Analysis (Surface vs Logical) */}
      <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
              Surface Grammar vs. Logical Form
            </h3>
            {grammar.isGrammarMisleading && (
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
                Misleading Grammar Detected
              </span>
            )}
          </div>
          <p className="text-xs text-apple-secondary mt-0.5">
            Examines whether the grammatical construction tricks thought into mistaking linguistic syntax for ontological structure
          </p>
        </div>

        <div className="p-4 rounded-xl bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 border border-apple-border/60 dark:border-apple-darkBorder/60 space-y-3 text-sm">
          <p className="text-apple-text dark:text-zinc-200 leading-relaxed font-sans">
            {grammar.summary}
          </p>

          <div className="p-3.5 rounded-lg bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder text-xs space-y-1 font-mono">
            <span className="text-apple-secondary text-[10px] uppercase tracking-wider block">
              Formal Comparison
            </span>
            <p className="text-apple-text/90 dark:text-zinc-200">
              {grammar.grammaticalVsLogicalForm}
            </p>
          </div>

          {grammar.analogousMisleadingUse && (
            <div className="text-xs text-apple-secondary italic bg-black/[0.02] dark:bg-white/[0.02] p-2.5 rounded-lg border border-apple-border/40 dark:border-apple-darkBorder/40">
              <span className="font-semibold not-italic text-apple-text dark:text-zinc-300 font-sans">Wittgensteinian Analogy: </span>
              {grammar.analogousMisleadingUse}
            </div>
          )}
        </div>
      </div>

      {/* 3. Philosophical Type Error Analogy */}
      {typeError.hasTypeError && typeError.conceptAnalogy && (
        <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-indigo-200 dark:border-indigo-900/60 shadow-apple-sm">
          <div className="flex items-center space-x-2 mb-3">
            <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs uppercase font-mono tracking-wider text-indigo-950 dark:text-indigo-300 font-semibold">
              Philosophical Type Error Analogy
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Compiler Diagnostic
            </span>
          </div>
          <p className="text-xs text-apple-secondary mb-4">
            Software engineering metaphor evaluating categories, scope, domains, and operators without equating language to literal code
          </p>

          <div className="space-y-2 font-mono text-xs p-4 rounded-xl bg-zinc-950 text-zinc-100 dark:bg-black border border-zinc-800">
            {typeError.conceptAnalogy.scopeDomain && (
              <div className="flex flex-col sm:flex-row sm:space-x-2">
                <span className="text-zinc-500 select-none">Domain Scope:</span>
                <span className="text-amber-400">{typeError.conceptAnalogy.scopeDomain}</span>
              </div>
            )}
            {typeError.conceptAnalogy.semanticTypeExpected && (
              <div className="flex flex-col sm:flex-row sm:space-x-2">
                <span className="text-zinc-500 select-none">Expected Type:</span>
                <span className="text-emerald-400">{typeError.conceptAnalogy.semanticTypeExpected}</span>
              </div>
            )}
            {typeError.conceptAnalogy.semanticTypeProvided && (
              <div className="flex flex-col sm:flex-row sm:space-x-2">
                <span className="text-zinc-500 select-none">Provided Type:</span>
                <span className="text-rose-400">{typeError.conceptAnalogy.semanticTypeProvided}</span>
              </div>
            )}
            {typeError.conceptAnalogy.operatorOrReferenceMismatch && (
              <div className="flex flex-col sm:flex-row sm:space-x-2 pt-1 border-t border-zinc-800">
                <span className="text-zinc-500 select-none">Operator Mismatch:</span>
                <span className="text-sky-300">{typeError.conceptAnalogy.operatorOrReferenceMismatch}</span>
              </div>
            )}
            <div className="pt-2 text-zinc-300 font-sans text-xs leading-relaxed">
              {typeError.conceptAnalogy.explanation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
