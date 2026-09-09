import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { orchestrateAnalysis } from "./services/analyzer.js";
import { orchestrateClaimCritique, CANONICAL_CRITIQUES } from "./services/critiqueService.js";
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
    version: "0.3.0",
    hasServerApiKey: hasEnvKey,
    activeProvider,
    defaultModel: process.env.DEFAULT_GROQ_MODEL || "openai/gpt-oss-120b",
    features: ["thought_debugger", "claim_critic", "notebook"],
    timestamp: new Date().toISOString()
  });
});

// Canonical benchmark presets list
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

// Canonical critique benchmarks list for Feature 3
app.get("/api/canonical-critiques", (_req, res) => {
  res.json(
    Object.entries(CANONICAL_CRITIQUES).map(([key, val]) => ({
      id: key,
      author: val.authorOrTradition,
      input: val.input,
      verdict: val.verdict,
      problemSummary: val.whereIsTheProblem.flawType
    }))
  );
});

// Full canonical preset detail
app.get("/api/canonical/:id", (req, res) => {
  const preset = CANONICAL_PRESETS[req.params.id];
  if (!preset) {
    return res.status(404).json({ error: `Canonical preset '${req.params.id}' not found.` });
  }
  res.json(preset);
});

// Feature 1: Main philosophical debugging endpoint (prompt your intuition)
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

// Feature 3: Evaluate and correct previous thinkers' work ("You Should Correct")
app.post("/api/critique", async (req, res) => {
  try {
    const { input, author, apiKey, model } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res.status(400).json({ error: "A valid philosophical claim or quote is required to critique." });
    }

    const customKeyFromHeader = req.headers["x-gemini-api-key"] as string | undefined;
    const effectiveKey = apiKey || customKeyFromHeader;

    const result = await orchestrateClaimCritique(input.trim(), author, {
      apiKey: effectiveKey,
      model
    });

    return res.json(result);
  } catch (error: any) {
    console.error("Critique endpoint error:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred during claim critique."
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`☵ PHILOCOMPILER ENGINE ONLINE [Port ${PORT}]`);
  console.log(`A Computational Instrument for Philosophical Debugging`);
  console.log(`======================================================\n`);
});

