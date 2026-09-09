# PhiloCompiler

> **A Computational Instrument for Philosophical-Linguistic Debugging**  
> *Created by NJ5.0*

PhiloCompiler is an interactive computational instrument for examining language, propositions, assumptions, and logical form. It operationalizes analytical methods from **Ludwig Wittgenstein**, **Nāgārjuna (Madhyamaka)**, and disciplined observation into an Apple-inspired personal laboratory.

The instrument is built upon a fundamental ethos:
> *"Preserve the intuition, debug the formulation, expose assumptions, and return to the phenomenon."*

---

## Key Capabilities

### 1. Four Diagnostic Lenses
- **✦ Wittgensteinian Mode**: Examines surface grammar vs. logical form, language-games, category errors, and the epistemic ladder from raw observation to metaphysical leap.
- **☸ Nāgārjuna / Madhyamaka Mode**: Deconstructs assumptions of *svabhāva* (independent, inherent essence) into *pratītyasamutpāda* (relational dependent arising). Exposes logical reductio (*prasaṅga*) and fourfold negation (*catuṣkoṭi*).
- **⚖ Comparative Mode (Wittgenstein × Nāgārjuna)**: Conducts simultaneous independent analyses through both traditions, mapping genuine therapeutic convergences and fundamental methodological divergences while rigorously guarding against false equivalence.
- **📜 Kārikā Dialectical Mode**: Specialized analyzer for classical philosophical verses (e.g. *Mūlamadhyamakakārikā* MMK 1.1, MMK 10.1, MMK 24.18) with opponent-reductio structure.

### 2. Apple-Inspired Calm UX
- **Transformation First**: The user immediately sees their proposition transformed into clear logical or relational form, accompanied by a simple, human explanation in plain everyday words and exposed assumptions.
- **On-Demand Inspection**: All heavy analytical machinery (Epistemic Ladder, Philosophical Linter, Catuṣkoṭi grid, Prasaṅga reductio) remains collapsed by default to keep the experience peaceful and burden-free.

### 3. Personal Philosophical Notebook ($v_1 \rightarrow v_2 \rightarrow v_3$)
- Save diagnosed thoughts with tags and personal contemplation notes.
- Track thought refinements across versions with automatic differential analysis (*Intentionality Removed*, *Empirical Specificity Increased*, *Observational Boundary Clarified*, *Metaphysical Scope Reduced*).
- Export and import private notebooks in JSON format.

### 4. High-Speed Multi-Provider Engine
- **Live Groq LLM Engine**: Fast structured inference via `openai/gpt-oss-120b` and `qwen/qwen3.8-27b`.
- **Google Gemini Provider**: Optional alternative generative engine via Gemini 2.5.
- **Zero-Config Offline Benchmarks**: 13 canonical pre-compiled presets spanning Wittgenstein, Nāgārjuna, and Comparative philosophy.

---

## Architecture & Project Structure

```
PhiloCompiler/
├── client/                     # Frontend Application (React 19 + TypeScript + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # CleanTransformationCard, NagarjunaCard, ComparativeCard, NotebookView, etc.
│   │   ├── services/           # Notebook local persistence & differential analysis
│   │   └── types/              # Comprehensive philosophical type definitions & notebook schemas
├── server/                     # Backend API & Analytical Engine (Express + TypeScript + Zod)
│   ├── src/
│   │   ├── core/               # Canonical benchmarks, types, and Zod schemas
│   │   ├── philosophers/       # Wittgenstein heuristics, Nāgārjuna dialectics, Comparative prompts
│   │   ├── services/           # LLM orchestration (Groq & Gemini) and fallback pipelines
│   │   └── index.ts            # REST API endpoints (/api/health, /api/canonical, /api/analyze)
│   └── test/                   # Automated schema verification suite (13 canonical tests)
```

---

## Quickstart

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation
```bash
# Clone the repository
git clone git@github.com:NeerajYadav-coder/PhiloCompiler.git
cd PhiloCompiler

# Install dependencies for both server and client
npm --prefix server install
npm --prefix client install
```

### Environment Setup
Create a `.env` file in the `server/` directory (see `server/.env.example`):
```bash
cp server/.env.example server/.env
# Add your GROQ_API_KEY or GEMINI_API_KEY
```

### Running Locally
```bash
# In terminal 1: start backend server (Port 3001)
cd server && npm run dev

# In terminal 2: start frontend client (Port 5173)
cd client && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Automated Tests
```bash
cd server && npm test
```

---

## Philosophical Axioms
1. *Do not mistake grammatical form for ontological structure.*
2. *Do not mistake an inference for an observation.*
3. *Do not mistake ambiguity for profundity.*
4. *Do not mistake inability to formulate something clearly for proof that the thing is ineffable.*
5. *Do not destroy an intuition merely because its first linguistic formulation was defective.*
6. *Preserve the intuition, debug the formulation, expose the assumptions, and return to the phenomenon.*

---

## Author & License
Created by **NJ5.0** ([Neeraj Yadav](https://github.com/NeerajYadav-coder)).  
MIT License.
