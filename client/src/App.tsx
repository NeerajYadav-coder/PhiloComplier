import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { PropositionInput } from "./components/PropositionInput";
import { CleanTransformationCard } from "./components/CleanTransformationCard";
import { NagarjunaCard } from "./components/NagarjunaCard";
import { ComparativeCard } from "./components/ComparativeCard";
import { ClaimCritiqueView } from "./components/ClaimCritiqueView";
import { SaveToNotebookModal } from "./components/SaveToNotebookModal";
import { NotebookView } from "./components/NotebookView";
import { EpistemicLadderView } from "./components/EpistemicLadderView";
import { LinguisticDebuggerView } from "./components/LinguisticDebuggerView";
import { QuestionDebuggerView } from "./components/QuestionDebuggerView";
import { HiddenAssumptionsView } from "./components/HiddenAssumptionsView";
import { TruthFalsityView } from "./components/TruthFalsityView";
import { WittgensteinLensView } from "./components/WittgensteinLensView";
import { IntuitionPreservationView } from "./components/IntuitionPreservationView";
import { ReformulationCards } from "./components/ReformulationCards";
import { PhilosophicalLinterView } from "./components/PhilosophicalLinterView";
import { SettingsModal } from "./components/SettingsModal";
import { AboutModal } from "./components/AboutModal";
import {
  PhilosophicalAnalysisResult,
  NagarjunaDiagnosticResult,
  ComparativeDiagnosticResult,
  AnyAnalysisResult,
  AnalysisMode,
  CanonicalPresetMeta,
  ClaimCritiqueResult
} from "./types";
import { NotebookEntry } from "./types/notebook";
import {
  getNotebookEntries,
  createEntryFromAnalysis,
  createEntryFromCritique,
  addVersionToEntry,
  deleteNotebookEntry,
  exportNotebookJson,
  importNotebookJson
} from "./services/notebookStorage";
import { CANONICAL_PRESETS } from "./data/canonicalPresets";
import { directAnalyzeThought, findCanonicalPreset } from "./services/directEngine";
import { GitCommit, Search, Key, Sparkles, BookOpen, AlertCircle } from "lucide-react";

export function App() {
  const [currentView, setCurrentView] = useState<"debugger" | "critic" | "notebook">("debugger");
  const [activeMode, setActiveMode] = useState<AnalysisMode>("wittgenstein");
  const [input, setInput] = useState<string>("");
  const [analysis, setAnalysis] = useState<AnyAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [presets, setPresets] = useState<CanonicalPresetMeta[]>(() =>
    Object.values(CANONICAL_PRESETS).map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      input: p.input,
      previewSummary: p.previewSummary
    }))
  );

  // Notebook state
  const [notebookEntries, setNotebookEntries] = useState<NotebookEntry[]>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

  // Freedom to inspect deeper: HIDDEN BY DEFAULT per user specification
  const [showDeepInspection, setShowDeepInspection] = useState<boolean>(false);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Settings state
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("philocompiler_gemini_key") || "");
  const [model, setModel] = useState<string>(() => localStorage.getItem("philocompiler_gemini_model") || "llama-3.3-70b-versatile");

  // Active deep tab: strictly ONE tab visible when deep inspection is opened
  const [activeTab, setActiveTab] = useState<"ladder" | "linguistics" | "assumptions" | "reformulations" | "wittgenstein">("ladder");

  // Load notebook entries on mount
  useEffect(() => {
    setNotebookEntries(getNotebookEntries());
  }, []);

  useEffect(() => {
    fetch(`/api/canonical?mode=${activeMode}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPresets(data);
      })
      .catch((err) => console.warn("Could not load canonical presets:", err));
  }, [activeMode]);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("philocompiler_gemini_key", key);
  };

  const handleSaveModel = (m: string) => {
    setModel(m);
    localStorage.setItem("philocompiler_gemini_model", m);
  };

  const handleAnalyze = async (propositionText: string) => {
    const trimmed = propositionText.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);
    setShowDeepInspection(false);

    // 1. Instant check for matching canonical preset
    const preset = findCanonicalPreset(trimmed);
    if (preset) {
      setAnalysis(preset);
      setIsLoading(false);
      return;
    }

    // 2. Direct client-side execution if user entered their API key
    if (apiKey && apiKey.trim()) {
      try {
        const result = await directAnalyzeThought(trimmed, apiKey, model);
        setAnalysis(result);
      } catch (err: any) {
        console.error("Direct analysis failed:", err);
        setError(err.message || "Failed to analyze thought with your API key.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // 3. Fallback to local dev backend if available
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: trimmed,
          mode: activeMode,
          model,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      console.warn("Backend analysis unavailable:", err);
      setError(
        "To debug your own thoughts, please enter your free Groq or Gemini API key in Settings (⚙️). Or try any of the built-in presets below!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setInput("");
    setError(null);
    setShowDeepInspection(false);
  };

  // Notebook Handlers
  const handleSaveNewThought = (title: string, tag: string, notes?: string) => {
    if (!analysis) return;
    createEntryFromAnalysis(title, tag, analysis, notes);
    setNotebookEntries(getNotebookEntries());
  };

  const handleAddVersion = (entryId: string, notes?: string) => {
    if (!analysis) return;
    addVersionToEntry(entryId, analysis, notes);
    setNotebookEntries(getNotebookEntries());
  };

  const handleSaveCritiqueToNotebook = (critique: ClaimCritiqueResult) => {
    createEntryFromCritique(critique);
    setNotebookEntries(getNotebookEntries());
  };

  const handleDeleteEntry = (entryId: string) => {
    deleteNotebookEntry(entryId);
    setNotebookEntries(getNotebookEntries());
  };

  const handleLoadFromNotebook = (rawThought: string) => {
    setCurrentView("debugger");
    setInput(rawThought);
    handleAnalyze(rawThought);
  };

  const handleEvolveThought = (refinedText: string) => {
    if (analysis) {
      const defaultTag = "mode" in analysis ? analysis.mode.toUpperCase() : "Observation";
      const title = analysis.input.length > 36 ? analysis.input.slice(0, 36) + "…" : analysis.input;
      const existing = notebookEntries.find((e) => e.versions.some(v => v.rawThought === analysis.input));
      if (existing) {
        addVersionToEntry(existing.id, analysis, "Saved before evolving to next version");
      } else {
        createEntryFromAnalysis(title, defaultTag, analysis, "Saved before evolving to next version");
      }
      setNotebookEntries(getNotebookEntries());
    }

    setInput(refinedText);
    setAnalysis(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExportNotebook = () => {
    const json = exportNotebookJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `philocompiler_notebook_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportNotebook = () => {
    const inputEl = document.createElement("input");
    inputEl.type = "file";
    inputEl.accept = ".json,application/json";
    inputEl.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content && importNotebookJson(content)) {
            setNotebookEntries(getNotebookEntries());
          }
        };
        reader.readAsText(file);
      }
    };
    inputEl.click();
  };

  return (
    <div className="min-h-screen bg-apple-bg dark:bg-apple-darkBg text-apple-text dark:text-zinc-100 flex flex-col font-sans selection:bg-apple-accent/20 selection:text-apple-accent">
      {/* Navigation Header with Debug Thought vs Critique Claim vs Notebook switcher */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        hasCustomKey={Boolean(apiKey)}
        engineUsed={analysis?.engineUsed}
        currentView={currentView}
        onSelectView={setCurrentView}
        notebookCount={notebookEntries.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        {currentView === "notebook" ? (
          /* ================= FEATURE 2: NOTEBOOK VIEW ================= */
          <NotebookView
            entries={notebookEntries}
            onLoadIntoDebugger={handleLoadFromNotebook}
            onDeleteEntry={handleDeleteEntry}
            onExport={handleExportNotebook}
            onImport={handleImportNotebook}
            onGoToDebugger={() => setCurrentView("debugger")}
          />
        ) : currentView === "critic" ? (
          /* ================= FEATURE 3: CLAIM CRITIQUE VIEW ================= */
          <ClaimCritiqueView
            apiKey={apiKey}
            model={model}
            onSaveCritiqueToNotebook={handleSaveCritiqueToNotebook}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        ) : (
          /* ================= FEATURE 1: PROMPT YOUR INTUITION / DEBUGGER ================= */
          <>
            {/* Minimal Hero (only when no analysis is active) */}
            {!analysis && (
              <div className="text-center max-w-xl mx-auto space-y-2 py-4">
                <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-apple-text dark:text-white">
                  PhiloCompiler
                </h2>
                <p className="text-xs sm:text-sm text-apple-secondary leading-relaxed">
                  Put your thought or observation into words. We'll keep what you really meant, point out tricky grammar or hidden assumptions, and give you a clean, clear version.
                </p>
              </div>
            )}

            {/* Clean Input Box */}
            <PropositionInput
              currentInput={input}
              onInputChange={setInput}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              presets={presets}
            />

            {/* Error notification */}
            {error && (
              <div className="rounded-2xl p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{error}</span>
                </div>
                <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="px-3 py-1 rounded-lg bg-amber-200/70 dark:bg-amber-800/50 text-amber-900 dark:text-amber-100 font-medium text-[11px] hover:bg-amber-200 transition-colors"
                  >
                    Open Settings (⚙️)
                  </button>
                  <button
                    onClick={() => handleAnalyze(input)}
                    className="font-mono underline text-amber-700 dark:text-amber-300 text-[11px]"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* The Result Experience */}
            {analysis && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {"transformedRelationalProposition" in analysis ? (
                  /* 1. NĀGĀRJUNA / KĀRIKĀ MODE */
                  <NagarjunaCard
                    analysis={analysis as NagarjunaDiagnosticResult}
                    onReset={handleReset}
                    onOpenSaveModal={() => setIsSaveModalOpen(true)}
                  />
                ) : "wittgensteinTransformation" in analysis && "nagarjunaTransformation" in analysis ? (
                  /* 2. COMPARATIVE MODE */
                  <ComparativeCard
                    analysis={analysis as ComparativeDiagnosticResult}
                    onReset={handleReset}
                    onOpenSaveModal={() => setIsSaveModalOpen(true)}
                  />
                ) : (
                  /* 3. WITTGENSTEIN MODE */
                  <>
                    <CleanTransformationCard
                      analysis={analysis as PhilosophicalAnalysisResult}
                      onReset={handleReset}
                      onOpenSaveModal={() => setIsSaveModalOpen(true)}
                      showDeepInspection={showDeepInspection}
                      onToggleDeepInspection={() => setShowDeepInspection(!showDeepInspection)}
                      onEvolveThought={handleEvolveThought}
                    />

                    {/* 2. Deep Analytical Machinery (HIDDEN by default, shown only if user clicks) */}
                    {showDeepInspection && (
                      <div className="space-y-6 pt-4 border-t border-apple-border/50 dark:border-apple-darkBorder/50 animate-in fade-in duration-300">
                    <div className="text-center space-y-1">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-apple-secondary font-semibold">
                        Detailed Breakdown & Diagnostics
                      </h3>
                      <p className="text-[11px] text-apple-secondary">
                        Inspect the step-by-step logic, tricky words, and underlying checks.
                      </p>
                    </div>

                    {/* Segmented control: strictly ONE tab at a time */}
                    <div className="flex items-center justify-center p-1 rounded-2xl bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/70 dark:border-apple-darkBorder text-xs overflow-x-auto">
                      <button
                        onClick={() => setActiveTab("ladder")}
                        className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                          activeTab === "ladder"
                            ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white font-medium shadow-apple-sm"
                            : "text-apple-secondary hover:text-apple-text"
                        }`}
                      >
                        <GitCommit className="w-3.5 h-3.5 text-apple-accent" />
                        <span>Step-by-Step Logic</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("linguistics")}
                        className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                          activeTab === "linguistics"
                            ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white font-medium shadow-apple-sm"
                            : "text-apple-secondary hover:text-apple-text"
                        }`}
                      >
                        <Search className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Words & Grammar</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("assumptions")}
                        className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                          activeTab === "assumptions"
                            ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white font-medium shadow-apple-sm"
                            : "text-apple-secondary hover:text-apple-text"
                        }`}
                      >
                        <Key className="w-3.5 h-3.5 text-amber-500" />
                        <span>Hidden Assumptions ({analysis.hiddenAssumptions.length})</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("reformulations")}
                        className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                          activeTab === "reformulations"
                            ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white font-medium shadow-apple-sm"
                            : "text-apple-secondary hover:text-apple-text"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Intuition Kept Intact</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("wittgenstein")}
                        className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                          activeTab === "wittgenstein"
                            ? "bg-white dark:bg-apple-darkSurface text-apple-text dark:text-white font-medium shadow-apple-sm"
                            : "text-apple-secondary hover:text-apple-text"
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                        <span>Logic Checks & Warnings</span>
                      </button>
                    </div>

                    {/* Tab content */}
                    <div className="pt-2">
                      {activeTab === "ladder" && (
                        <EpistemicLadderView
                          ladder={analysis.epistemicLadder}
                          hasInferenceJump={analysis.hasInferenceJump}
                        />
                      )}

                      {activeTab === "linguistics" && (
                        <div className="space-y-6">
                          {analysis.questionDiagnostic?.isQuestion && (
                            <QuestionDebuggerView diagnostic={analysis.questionDiagnostic} />
                          )}
                          <LinguisticDebuggerView
                            terms={analysis.termsInUse}
                            grammar={analysis.grammaticalAnalysis}
                            typeError={analysis.typeErrorAnalysis}
                          />
                        </div>
                      )}

                      {activeTab === "assumptions" && (
                        <HiddenAssumptionsView assumptions={analysis.hiddenAssumptions} />
                      )}

                      {activeTab === "reformulations" && (
                        <div className="space-y-6">
                          <IntuitionPreservationView preservation={analysis.intuitionPreservation} />
                          <ReformulationCards
                            reformulations={analysis.reformulations}
                            onSelectReformulation={(newProp) => {
                              setInput(newProp);
                              handleAnalyze(newProp);
                            }}
                          />
                        </div>
                      )}

                      {activeTab === "wittgenstein" && (
                        <div className="space-y-6">
                          <WittgensteinLensView diagnostic={analysis.wittgensteinDiagnostic} />
                          <TruthFalsityView conditions={analysis.truthConditions} />
                          <PhilosophicalLinterView warnings={analysis.linterWarnings} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-apple-border/50 dark:border-apple-darkBorder/50 py-5 text-center text-[11px] text-apple-secondary font-mono">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>PhiloCompiler • Created by NJ5.0</span>
          <span>"Preserve the intuition, debug the formulation."</span>
        </div>
      </footer>

      {/* Save to Notebook Modal */}
      {analysis && (
        <SaveToNotebookModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          analysis={analysis}
          existingEntries={notebookEntries}
          onSaveNew={handleSaveNewThought}
          onAddVersion={handleAddVersion}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        model={model}
        onSaveModel={handleSaveModel}
      />

      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}
export default App;
