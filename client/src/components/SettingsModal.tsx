import React, { useState } from "react";
import { X, Key, Check, ShieldCheck, ExternalLink, Sparkles } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  model: string;
  onSaveModel: (model: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  model,
  onSaveModel,
}) => {
  const [tempKey, setTempKey] = useState(apiKey);
  const [tempModel, setTempModel] = useState(model || "llama-3.3-70b-versatile");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(tempKey.trim());
    onSaveModel(tempModel);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const hasKey = Boolean(tempKey.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-apple-darkSurface border border-apple-border dark:border-apple-darkBorder rounded-3xl p-6 shadow-apple-lg space-y-5">
        <div className="flex items-center justify-between border-b border-apple-border/50 dark:border-apple-darkBorder/50 pb-3">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-apple-accent" />
            <h3 className="text-sm font-semibold tracking-tight text-apple-text dark:text-white uppercase font-mono">
              API Key & Engine Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-apple-secondary hover:text-apple-text hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Client-Side Privacy Notice */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/30 flex items-start space-x-2 text-xs text-emerald-900 dark:text-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold">100% Private & Client-Side</p>
            <p className="text-[11px] text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed font-sans">
              Your API key is saved solely on this device in your browser's private <code className="font-mono text-[10px]">localStorage</code>. Requests are sent directly from your browser to your AI provider.
            </p>
          </div>
        </div>

        {/* API Key Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-apple-text dark:text-zinc-200">
              Your Personal API Key (Groq or Gemini)
            </label>
            {hasKey ? (
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>Ready</span>
              </span>
            ) : (
              <span className="text-[10px] font-mono text-apple-secondary">No key set</span>
            )}
          </div>
          <input
            type="password"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            placeholder="gsk_... or AIza..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-apple-border dark:border-apple-darkBorder bg-apple-subtle/40 dark:bg-apple-darkSubtle/40 text-xs font-mono text-apple-text dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-apple-accent"
          />

          {/* Quick link to free Groq key */}
          <div className="flex items-center justify-between text-[11px] text-apple-secondary pt-0.5">
            <span>Don't have an API key?</span>
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apple-accent hover:underline inline-flex items-center space-x-1 font-medium"
            >
              <span>Get a free Groq key in 30s</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
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
            <optgroup label="Groq High-Speed Engines (Free & Instant)">
              <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Recommended)</option>
              <option value="llama-3.1-8b-instant">llama-3.1-8b-instant (Fastest)</option>
              <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
            </optgroup>
            <optgroup label="Google Gemini">
              <option value="gemini-2.5-flash">gemini-2.5-flash</option>
              <option value="gemini-1.5-pro">gemini-1.5-pro</option>
            </optgroup>
          </select>
        </div>

        {/* Offline Presets Guarantee */}
        <div className="p-3 rounded-xl bg-apple-subtle/50 dark:bg-apple-darkSubtle/30 border border-apple-border/50 flex items-start space-x-2 text-[11px] text-apple-secondary">
          <Sparkles className="w-4 h-4 text-apple-secondary shrink-0 mt-0.5" />
          <p>
            <strong>Built-In Presets:</strong> You can test all 15+ built-in thought benchmarks and thinker claim critiques (Descartes, Hume, Anselm, Nāgārjuna, Zeno) anytime completely offline with zero API key!
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
