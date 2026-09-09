# PhiloCompiler

> **A Computational Instrument for Philosophical-Linguistic Debugging**  
> *Created by NJ5.0*

PhiloCompiler is an interactive computational instrument for examining language, propositions, assumptions, and logical form. It operationalizes analytical methods from **Ludwig Wittgenstein**, **Nāgārjuna (Madhyamaka)**, and disciplined observation into an Apple-inspired personal laboratory.

The instrument is built upon a fundamental ethos:
> *"Preserve the intuition, debug the formulation, expose assumptions, and return to the phenomenon."*

---

## The Three Core Features

### 1. ✦ Prompt Your Intuition (`Debug Thought`)
- Enter any spontaneous thought, observation, or intuition (e.g. *"Nature wants equilibrium"*, *"Time flows"*).
- The engine preserves your authentic intuitive core while transforming the sentence within sound logical boundaries (inspired by Wittgensteinian ordinary language clarity).
- Gives you a crisp **Logical Transformation**, the **Simple Everyday Reason**, and **Exposed Assumptions**.
- Keeps heavy analytical machinery (Epistemic Ladder, Linguistic Linter, Truth Conditions) peacefully collapsed by default, letting you inspect deeper only when you choose.

### 2. 📓 Notebook (`Thought Lineages & Version Evolution`)
- Preserves your personal contemplations, propositions, and critiques across iterative versions ($v_1 \rightarrow v_2 \rightarrow v_3$).
- Automated differential analysis tracks progress between iterations: *Intentionality Removed*, *Empirical Specificity Increased*, *Observational Boundary Clarified*, and *Metaphysical Scope Reduced*.
- Completely private with local storage, tags, and JSON export/import.

### 3. ⚖ Critique Claim (`You Should Correct`)
- Paste quotes, verses, or arguments from **any historical or modern thinker** (e.g. Nāgārjuna, René Descartes, Immanuel Kant, Baruch Spinoza, David Hume, Parmenides).
- The logical filter determines:
  1. **Is this claim logically correct or not?** (Clear Verdict Badge: *Logically Sound*, *Category Error*, *Logically Flawed*, *Valid Under Restricted Scope*, or *Circular Argument*).
  2. **Where is the problem?** (Pinpoints the exact problematic phrase, names the flaw type, and provides a clear breakdown of where the leap or reification happens).
  3. **Smuggled Assumptions** (Reveals what the thinker presupposed without justification).
  4. **The Corrected Proposition** (Reformulates the quote into a sound, defensible form while keeping what was genuinely insightful).
  5. **Everyday Explanation** (Explains the issue and correction in simple everyday language).
  6. **Save to Notebook** with a single click under `#ThinkerCritique`.

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
