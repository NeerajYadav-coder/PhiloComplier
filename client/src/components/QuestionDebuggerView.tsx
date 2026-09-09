import React from "react";
import { QuestionDiagnostic } from "../types";
import { HelpCircle, AlertCircle, CheckCircle, ArrowRight, CornerDownRight } from "lucide-react";

interface QuestionDebuggerViewProps {
  diagnostic: QuestionDiagnostic;
}

export const QuestionDebuggerView: React.FC<QuestionDebuggerViewProps> = ({ diagnostic }) => {
  if (!diagnostic.isQuestion) return null;

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder shadow-apple-sm space-y-5">
      <div className="flex items-center justify-between border-b border-apple-border/50 dark:border-apple-darkBorder/50 pb-3">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-apple-accent" />
          <h3 className="text-xs uppercase font-mono tracking-wider text-apple-secondary font-semibold">
            Question Breakdown: Checking the Question First
          </h3>
        </div>
        {diagnostic.wellFormednessVerdict && (
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border dark:border-apple-darkBorder text-apple-secondary">
            {diagnostic.wellFormednessVerdict}
          </span>
        )}
      </div>

      {/* 1. What would count as an answer? */}
      {diagnostic.whatWouldCountAsAnAnswer && (
        <div className="p-4 rounded-xl bg-apple-accent/5 dark:bg-apple-accent/10 border border-apple-accent/20 space-y-1">
          <span className="text-xs uppercase font-mono text-apple-accent font-semibold flex items-center space-x-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>What Would Count as an Answer?</span>
          </span>
          <p className="text-sm text-apple-text dark:text-zinc-200 leading-relaxed font-sans">
            {diagnostic.whatWouldCountAsAnAnswer}
          </p>
        </div>
      )}

      {/* 2. Requested explanation type & Spatial shift */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {diagnostic.requestedExplanationType && (
          <div className="p-3.5 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/60 dark:border-apple-darkBorder/60 space-y-1">
            <span className="text-apple-secondary uppercase font-mono text-[10px] block">
              What Kind of Answer Is Needed
            </span>
            <span className="font-mono text-sm font-semibold text-apple-text dark:text-white">
              {diagnostic.requestedExplanationType}
            </span>
          </div>
        )}

        {diagnostic.spatialOrMetaphoricalShift && (
          <div className="p-3.5 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/50 border border-apple-border/60 dark:border-apple-darkBorder/60 space-y-1">
            <span className="text-apple-secondary uppercase font-mono text-[10px] block">
              Hidden Metaphor or Picture
            </span>
            <span className="text-apple-text/90 dark:text-zinc-200 font-sans">
              {diagnostic.spatialOrMetaphoricalShift}
            </span>
          </div>
        )}
      </div>

      {/* 3. Clarification Sub-questions */}
      {diagnostic.clarificationSubQuestions && diagnostic.clarificationSubQuestions.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono text-apple-secondary font-semibold block">
            Better Questions to Ask Instead
          </span>
          <div className="space-y-1.5">
            {diagnostic.clarificationSubQuestions.map((subQ, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2 text-xs text-apple-text/90 dark:text-zinc-300 p-2.5 rounded-lg bg-apple-subtle/30 dark:bg-apple-darkSubtle/30 border border-apple-border/40 dark:border-apple-darkBorder/40"
              >
                <CornerDownRight className="w-3.5 h-3.5 text-apple-secondary shrink-0 mt-0.5" />
                <span className="font-sans">{subQ}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Diagnostic advice */}
      {diagnostic.diagnosticAdvice && (
        <div className="text-xs text-apple-secondary italic pt-2 border-t border-apple-border/40 dark:border-apple-darkBorder/40">
          <span className="font-semibold not-italic font-sans text-apple-text dark:text-zinc-300">Helpful Advice: </span>
          {diagnostic.diagnosticAdvice}
        </div>
      )}
    </div>
  );
};
