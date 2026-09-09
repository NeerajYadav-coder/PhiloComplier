import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { orchestrateAnalysis } from "./services/analyzer.js";
import { CANONICAL_PRESETS } from "./core/canonicalData.js";
import { CANONICAL_NAGARJUNA, CANONICAL_COMPARATIVE } from "./core/canonicalNagarjuna.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check and environment inspection
app.get("/api/health", (_req, res) => {
  const hasEnvKey = Boolean(
    process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  );
  const activeProvider = process.env.GROQ_API_KEY
    ? "groq"
    : process.env.GEMINI_API_KEY
    ? "gemini"
    : "offline";

  res.json({
    status: "ok",
    instrument: "PhiloCompiler",
    version: "0.2.0-v2",
    hasServerApiKey: hasEnvKey,
    activeProvider,
    defaultModel: process.env.DEFAULT_GROQ_MODEL || "openai/gpt-oss-120b",
    supportedModes: ["wittgenstein", "nagarjuna", "comparative", "karika"],
    timestamp: new Date().toISOString()
  });
});

// Canonical benchmark presets list (supports ?mode=wittgenstein|nagarjuna|comparative|karika)
app.get("/api/canonical", (req, res) => {
  const mode = req.query.mode as string | undefined;

  if (mode === "nagarjuna" || mode === "karika") {
    return res.json(
      Object.entries(CANONICAL_NAGARJUNA).map(([key, val]) => ({
        id: key,
        title: val.input.length > 50 ? val.input.slice(0, 48) + "..." : val.input,
        category: "Madhyamaka / MMK",
        input: val.input,
        previewSummary: val.transformedRelationalProposition.slice(0, 100) + "..."
      }))
    );
  }

  if (mode === "comparative") {
    return res.json(
      Object.entries(CANONICAL_COMPARATIVE).map(([key, val]) => ({
        id: key,
        title: val.input.length > 50 ? val.input.slice(0, 48) + "..." : val.input,
        category: "Wittgenstein × Nāgārjuna",
        input: val.input,
        previewSummary: val.wittgensteinTransformation.slice(0, 100) + "..."
      }))
    );
  }

  const presets = Object.values(CANONICAL_PRESETS).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    input: p.input,
    previewSummary: p.previewSummary,
  }));
  res.json(presets);
});

// Full canonical preset detail
app.get("/api/canonical/:id", (req, res) => {
  const preset = CANONICAL_PRESETS[req.params.id];
  if (!preset) {
    return res.status(404).json({ error: `Canonical preset '${req.params.id}' not found.` });
  }
  res.json(preset);
});

// Main philosophical debugging endpoint
app.post("/api/analyze", async (req, res) => {
  try {
    const { input, mode, forceCanonical, apiKey, model } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res.status(400).json({ error: "A valid philosophical proposition or question is required." });
    }

    const customKeyFromHeader = req.headers["x-gemini-api-key"] as string | undefined;
    const effectiveKey = apiKey || customKeyFromHeader;

    const result = await orchestrateAnalysis({
      input: input.trim(),
      mode,
      forceCanonical: Boolean(forceCanonical),
      apiKey: effectiveKey,
      model
    });

    return res.json(result);
  } catch (error: any) {
    console.error("Analysis endpoint error:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred during philosophical analysis."
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`☵ PHILOCOMPILER ENGINE ONLINE [Port ${PORT}]`);
  console.log(`A Computational Instrument for Philosophical Debugging`);
  console.log(`======================================================\n`);
});
