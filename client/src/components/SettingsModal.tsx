import React, { useState } from "react";
import { X, Key, Check, Server, Sparkles, ShieldCheck } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  model: string;
  onSaveModel: (model: string) => void;
  serverHasKey: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  model,
  onSaveModel,
  serverHasKey,
}) => {
  const [tempKey, setTempKey] = useState(apiKey);
  const [tempModel, setTempModel] = useState(model);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(tempKey);
    onSaveModel(tempModel);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder rounded-3xl p-6 shadow-apple-lg space-y-5">
        <div className="flex items-center justify-between border-b border-apple-border/50 dark:border-apple-darkBorder/50 pb-3">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-apple-accent" />
            <h3 className="text-sm font-semibold tracking-tight text-apple-text dark:text-white uppercase font-mono">
              Engine & LLM Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-apple-secondary hover:text-apple-text hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Server status banner */}
        <div className="p-3.5 rounded-xl bg-apple-subtle dark:bg-apple-darkSubtle border border-apple-border/60 dark:border-apple-darkBorder/60 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-apple-secondary" />
            <span>Server Active Provider:</span>
          </div>
          {serverHasKey ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
              <Check className="w-3.5 h-3.5" />
              <span>Groq (Active in .env)</span>
            </span>
          ) : (
            <span className="text-apple-secondary">Offline / Fallback</span>
          )}
        </div>

        {/* API Key Override */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-apple-text dark:text-zinc-200 block">
            API Key (Groq or Gemini Override)
          </label>
          <input
            type="password"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            placeholder="gsk_... or AIza..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 text-xs font-mono text-apple-text dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-apple-accent"
          />
          <p className="text-[11px] text-apple-secondary">
            Supports Groq keys (starting with <code className="font-mono text-[10px]">gsk_</code>) and Google Gemini keys.
          </p>
        </div>

        {/* Model Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-apple-text dark:text-zinc-200 block">
            Reasoning Model
          </label>
          <select
            value={tempModel}
            onChange={(e) => setTempModel(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 text-xs font-mono text-apple-text dark:text-zinc-100 focus:outline-none focus:border-apple-accent"
          >
            <optgroup label="Groq High-Speed Engines">
              <option value="openai/gpt-oss-120b">openai/gpt-oss-120b (Deep Philosophical Reasoning)</option>
              <option value="qwen/qwen3.8-27b">qwen/qwen3.8-27b (Ultra-Fast 0.04s)</option>
              <option value="qwen/qwen3.6-27b">qwen/qwen3.6-27b</option>
              <option value="openai/gpt-oss-20b">openai/gpt-oss-20b</option>
            </optgroup>
            <optgroup label="Google Gemini">
              <option value="gemini-2.5-flash">gemini-2.5-flash</option>
              <option value="gemini-1.5-pro">gemini-1.5-pro</option>
            </optgroup>
          </select>
        </div>

        {/* Canonical Offline Mode Guarantee */}
        <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 flex items-start space-x-2 text-[11px] text-emerald-900 dark:text-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <strong>Zero-Config Offline Mode:</strong> Even without an API key, all 9 Canonical Benchmark test cases run fully locally with pre-compiled philosophical diagnostics!
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-apple-secondary hover:text-apple-text transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-medium text-white bg-apple-accent hover:bg-apple-accentHover transition-colors flex items-center space-x-1.5 shadow-apple-sm"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
