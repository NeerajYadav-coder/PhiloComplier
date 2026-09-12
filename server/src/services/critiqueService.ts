import { ClaimCritiqueResult } from "../core/types.js";
import { ClaimCritiqueResultSchema } from "../core/schema.js";
import { LLMConfig } from "./llmService.js";

export const CRITIQUE_SYSTEM_PROMPT = `
You are the Philosophical Text & Claim Critic of PHILOCOMPILER ("You Should Correct").
Your purpose is to take any quote, philosophical argument, verse, or claim from previous thinkers (historical or modern: e.g. Nāgārjuna, René Descartes, Immanuel Kant, Spinoza, Plato, David Hume, St. Anselm, Zeno, etc.) and subject it to a strict logical audit.

CRITICAL INSTRUCTIONS:
1. EVALUATE LOGICAL SOUNDNESS:
   Determine whether the claim holds logically, or whether it makes a false leap, confuses everyday grammar with reality, assumes what it hasn't proven, or argues in circles.
2. POINT OUT WHERE IS THE PROBLEM:
   Pinpoint the EXACT phrase or step in the quote where the logic breaks down. Never speak in vague generalities. Show precisely where the thinker jumped from what is actually observed to an unproven assumption.
3. PREMISE STEP-FLOW:
   Break the thinker's claim into a 3-step logical progression (Step 1 -> Step 2 -> Conclusion). Mark each step's status as "sound", "unproven_leap", or "flawed", and provide a plain-English note explaining it.
4. EXPOSE SMUGGLED ASSUMPTIONS:
   Reveal what the thinker took for granted without showing proof.
5. PROVIDE THE CORRECTED PROPOSITION:
   Re-formulate the quote so that whatever was genuinely true or insightful in it is kept, but the logical flaw is completely removed.
6. AUTHOR DEFENSE:
   Briefly explain in 1-2 simple sentences how the author defended their claim and why they believed it was sound.
7. STRICT RULE ON LANGUAGE (SIMPLE & HUMAN):
   Explain everything in simple, conversational everyday English that ANY curious reader can easily understand.
   DO NOT use dense academic or scholastic jargon (never use phrases like "illicit subject reification", "ontological status", "epistemic closure").
   Describe flaws using clear common-sense words (e.g. "Inventing a thinker where there is only thought", "Treating an empty word like a physical object", "Stretching an everyday observation into a cosmic rule").

You must output STRICT, VALID JSON conforming to ClaimCritiqueResultSchema. No markdown fences, ONLY pure JSON.
`;

export function buildCritiqueUserPrompt(input: string, author?: string): string {
  return `
Analyze and critique the following philosophical claim/text:

CLAIM / WORK:
"${input}"
${author ? `ATTRIBUTED AUTHOR / TRADITION: ${author}` : ""}

Return a single complete JSON object with all required fields in simple, plain-English language:
{
  "id": "critique-${Date.now()}",
  "input": "${input.replace(/"/g, '\\"')}",
  "authorOrTradition": "${author || "Historical or contemporary philosophical claim"}",
  "timestamp": "${new Date().toISOString()}",
  "engineUsed": "groq_live",
  "isLogicallyValid": false,
  "verdict": "LOGICALLY_FLAWED" | "VALID_UNDER_RESTRICTED_SCOPE" | "CATEGORY_ERROR" | "CIRCULAR_ARGUMENT" | "SOUND",
  "verdictSummary": "Crisp one-sentence answer to whether this claim is logically sound...",
  "whereIsTheProblem": {
    "problematicPhrase": "The exact phrase or step in the quote that fails...",
    "flawType": "Plain-English name of the error (e.g. Inventing a Thinker Where There Is Only Thought, Treating 'Nothing' like a Real Object, False Leap from Observation to Cosmic Rule)...",
    "explanation": "Simple, crystal-clear explanation of exactly why this step fails logically..."
  },
  "stepByStepFlow": [
    { "stepNumber": 1, "statement": "Premise 1 statement...", "status": "sound", "note": "Plain explanation..." },
    { "stepNumber": 2, "statement": "Premise 2 statement...", "status": "sound", "note": "Plain explanation..." },
    { "stepNumber": 3, "statement": "Conclusion statement...", "status": "unproven_leap", "note": "Where the logic leaps..." }
  ],
  "authorCounterDefense": "How the author defended their claim in their own words...",
  "smuggledAssumptions": [
    "Hidden assumption 1 taken for granted without proof...",
    "Hidden assumption 2..."
  ],
  "correctedProposition": "The corrected, logically sound formulation...",
  "correctionRationale": "Why this corrected version actually works...",
  "simpleExplanation": "Simple everyday language explanation of the error and the fix...",
  "toneVoices": {
    "everyday": "How to phrase the corrected proposition in warm, casual conversational English...",
    "balanced": "Clear, grounded proposition with natural boundary criteria...",
    "airtight": "Explicitly guarded formulation with clear conditions preventing edge-case attacks..."
  },
  "stressTest": {
    "skepticObjection": "The #1 real-world counter-example or objection someone would raise against this corrected claim...",
    "shieldResponse": "How the corrected claim easily answers this objection...",
    "solidityRating": "ROCK_SOLID" | "NEEDS_BOUNDARY" | "SUBJECTIVE_EXPERIENCE",
    "solidityNote": "Plain English rationale for the rating..."
  }
}
`;
}

// Canonical critique benchmarks for offline or standard claims
export const CANONICAL_CRITIQUES: Record<string, ClaimCritiqueResult> = {
  "descartes-cogito": {
    id: "canonical-critique-descartes",
    input: "I think, therefore I am (an immaterial thinking substance).",
    authorOrTradition: "René Descartes (Meditations on First Philosophy)",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    isLogicallyValid: false,
    verdict: "CATEGORY_ERROR",
    verdictSummary: "Jumping from noticing that thoughts exist to claiming an invisible, permanent soul is doing the thinking.",
    whereIsTheProblem: {
      problematicPhrase: "therefore I am [a substance]",
      flawType: "Inventing a 'Thinker' Where There Is Only 'Thought'",
      explanation: "Descartes noticed thoughts and doubts happening in immediate awareness. But because language always puts 'I' in front of verbs ('I walk', 'I think'), he assumed there must be an invisible, permanent soul-entity behind the thinking. In direct reality, thinking simply occurs—our grammar tricked him into inventing an invisible thinker."
    },
    stepByStepFlow: [
      {
        stepNumber: 1,
        statement: "Doubts and thoughts are undeniably occurring in awareness right now.",
        status: "sound",
        note: "Direct observation: experiences and thoughts are genuinely happening."
      },
      {
        stepNumber: 2,
        statement: "Our language structure connects actions to actors ('I think').",
        status: "sound",
        note: "Everyday grammar always puts a subject noun in front of a verb."
      },
      {
        stepNumber: 3,
        statement: "Therefore, an invisible, permanent soul-substance exists to do the thinking.",
        status: "unproven_leap",
        note: "Unproven leap: mistaking grammatical convenience for an invisible permanent entity."
      }
    ],
    authorCounterDefense: "Descartes believed that even if a demon deceived him about everything in the world, the act of doubting itself could not occur without an existing thinking soul.",
    smuggledAssumptions: [
      "Assuming that wherever an action happens, a permanent owner or substance must be doing it.",
      "Assuming everyday grammar ('I think') reflects how consciousness actually works.",
      "Assuming thoughts cannot arise and pass on their own without a permanent soul."
    ],
    correctedProposition: "Thoughts and doubts occur in immediate awareness, without needing an invisible permanent soul behind them.",
    correctionRationale: "Preserves the real observation (thoughts are undeniably happening) while dropping the unproven claim that an invisible ghost-entity is doing the thinking.",
    simpleExplanation: "Descartes saw thinking happening, but jumped to the conclusion that an invisible 'soul person' was doing the thinking. Grammar tricked him into creating a thinker where there was only thought.",
    toneVoices: {
      everyday: "I know thoughts and doubts are happening right now, even if I don't know what kind of thing I am.",
      balanced: "Thoughts and doubts occur in immediate awareness, without needing an invisible permanent soul behind them.",
      airtight: "The occurrence of thought strictly confirms experiential awareness, but does not entail an immaterial, indivisible thinking substance."
    },
    stressTest: {
      skepticObjection: "If there is no 'I' doing the thinking, who is experiencing these words right now?",
      shieldResponse: "Experience is happening right now, but calling it an 'I' is just a grammatical shortcut—just like saying 'it is raining' doesn't mean a physical entity called 'It' is pouring water.",
      solidityRating: "ROCK_SOLID",
      solidityNote: "Distinguishing immediate conscious experience from an unproven ghost-entity is completely sound."
    }
  },

  "nagarjuna-causation": {
    id: "canonical-critique-nagarjuna",
    input: "Neither from itself, nor from another, nor from both, nor without cause, does anything anywhere ever arise.",
    authorOrTradition: "Nāgārjuna (Mūlamadhyamakakārikā 1.1)",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    isLogicallyValid: true,
    verdict: "VALID_UNDER_RESTRICTED_SCOPE",
    verdictSummary: "Accurate when proving things are interconnected, but misleading if taken as saying everyday causes don't work.",
    whereIsTheProblem: {
      problematicPhrase: "does anything anywhere ever arise",
      flawType: "Confusing Cosmic Rules with Everyday Reality",
      explanation: "Nāgārjuna proves that things don't exist as isolated, standalone blocks that collide like magic bricks. Everything depends on everything else. But if you take this quote literally in daily life, it sounds like striking a match doesn't cause fire. In everyday life, cause and effect still work in dependable, regular patterns."
    },
    stepByStepFlow: [
      {
        stepNumber: 1,
        statement: "An effect cannot create itself (it would have to already exist beforehand).",
        status: "sound",
        note: "Logical rule: a thing cannot exist before its own creation."
      },
      {
        stepNumber: 2,
        statement: "An effect cannot come from a totally isolated, separate object.",
        status: "sound",
        note: "If two objects were completely isolated, no causal link could connect them."
      },
      {
        stepNumber: 3,
        statement: "Therefore, events emerge through a connected web of conditions rather than standalone objects.",
        status: "sound",
        note: "Valid philosophical insight, though counter-intuitive if applied casually to daily life."
      }
    ],
    authorCounterDefense: "Nāgārjuna argued that if things had fixed independent essences, change and causation would be completely impossible.",
    smuggledAssumptions: [
      "Assumes his opponents define causes and effects as two completely isolated, separate objects.",
      "Assumes that if things aren't permanently separate, they cannot produce each other."
    ],
    correctedProposition: "Things do not arise through the collision of isolated objects; events emerge through connected, dependent conditions.",
    correctionRationale: "Explains causality as a dependable web of conditions rather than a magical collision between isolated objects.",
    simpleExplanation: "Nāgārjuna proves that causes aren't separate magical bricks hitting other bricks. But we must be clear: things still happen dependently in regular, predictable patterns.",
    toneVoices: {
      everyday: "Things don't just appear out of thin air or by magic; everything happens because other things made it happen.",
      balanced: "Things do not arise through the collision of isolated objects; events emerge through connected, dependent conditions.",
      airtight: "Phenomena lack independent, self-contained origination and operate as an interdependent network of dependent conditions."
    },
    stressTest: {
      skepticObjection: "If nothing arises on its own, does that mean nothing is really real?",
      shieldResponse: "No; things are practically real and functional, they just aren't isolated islands. Interdependence makes things work, not fake.",
      solidityRating: "ROCK_SOLID",
      solidityNote: "Interdependence is fully compatible with both daily practical life and scientific causality."
    }
  },

  "parmenides-nothing": {
    id: "canonical-critique-parmenides",
    input: "What is not cannot be thought or spoken of, for nothing can come from nothing.",
    authorOrTradition: "Parmenides (On Nature)",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    isLogicallyValid: false,
    verdict: "LOGICALLY_FLAWED",
    verdictSummary: "Treating the simple word 'nothing' as if it were a mysterious physical object.",
    whereIsTheProblem: {
      problematicPhrase: "What is not cannot be thought",
      flawType: "Treating 'Nothing' Like a Real Object",
      explanation: "Parmenides treats 'nothing' like a spooky, invisible thing that you can't talk about without turning it into a real thing. But 'nothing' isn't an object—it's just a handy word we use to say something is missing (like 'there is no milk in the fridge'). He mistook a simple word of absence for a cosmic puzzle."
    },
    stepByStepFlow: [
      {
        stepNumber: 1,
        statement: "Whenever we speak or think, our words point to something.",
        status: "sound",
        note: "Descriptive truth about how speech and reference typically function."
      },
      {
        stepNumber: 2,
        statement: "If we speak of 'nothing', we are treating it like a target of thought.",
        status: "sound",
        note: "Grammar permits using 'nothing' in the grammatical position of an object."
      },
      {
        stepNumber: 3,
        statement: "Therefore, non-existence is impossible, and change is a total illusion.",
        status: "unproven_leap",
        note: "Confuses a simple everyday word describing absence with an actual cosmic substance."
      }
    ],
    authorCounterDefense: "Parmenides insisted that thinking requires an object of thought, so thinking about what does not exist is a contradiction in terms.",
    smuggledAssumptions: [
      "Assuming every meaningful word must name a physical object.",
      "Assuming the word 'not' refers to an actual empty substance."
    ],
    correctedProposition: "Saying 'nothing' simply describes the absence of specific things; it does not name a mysterious cosmic void.",
    correctionRationale: "Returns the word 'nothing' to its normal everyday job of describing absence, instead of inventing a spooky void.",
    simpleExplanation: "Parmenides thought 'nothing' was a thing that couldn't be talked about without turning it into 'something'. He confused a simple word of absence with an actual physical substance.",
    toneVoices: {
      everyday: "When we say 'there is nothing in the box', we just mean the box is empty—we don't mean a monster named 'Nothing' lives inside.",
      balanced: "Saying 'nothing' simply describes the absence of specific things; it does not name a mysterious cosmic void.",
      airtight: "The term 'nothing' operates as a negative quantifier of absence, not a substantive referring noun denoting a physical entity."
    },
    stressTest: {
      skepticObjection: "Isn't empty space in quantum physics considered 'nothing' that produces particles?",
      shieldResponse: "A quantum vacuum is filled with energy and physical fields—it is very much a 'something', not an empty word on paper.",
      solidityRating: "ROCK_SOLID",
      solidityNote: "Completely resolves the ancient riddle by treating 'nothing' as an everyday word for absence."
    }
  },

  "hume-induction": {
    id: "canonical-critique-hume",
    input: "Because the sun has risen every morning so far, it is guaranteed to rise tomorrow.",
    authorOrTradition: "David Hume (An Enquiry Concerning Human Understanding)",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    isLogicallyValid: false,
    verdict: "LOGICALLY_FLAWED",
    verdictSummary: "Confusing past habits and expectations with mathematical certainty.",
    whereIsTheProblem: {
      problematicPhrase: "it is guaranteed to rise tomorrow",
      flawType: "Assuming the Future Must Mirror the Past Without Proof",
      explanation: "We expect the sun to rise tomorrow because it has risen every day in human history. That is a dependable practical habit, but it is not a 100% mathematical guarantee. To claim it is logically guaranteed assumes nature will always behave the same, which is the very thing being debated."
    },
    stepByStepFlow: [
      {
        stepNumber: 1,
        statement: "The sun has risen every single morning observed in human history.",
        status: "sound",
        note: "Direct, consistent observation of past events."
      },
      {
        stepNumber: 2,
        statement: "Humans naturally form a strong expectation that this pattern will continue.",
        status: "sound",
        note: "A helpful and necessary psychological habit of mind."
      },
      {
        stepNumber: 3,
        statement: "Therefore, the sun is logically guaranteed to rise tomorrow.",
        status: "unproven_leap",
        note: "Unproven jump: mistaking a strong practical expectation for a mathematical certainty."
      }
    ],
    authorCounterDefense: "Common sense says that if a physical regularity has held true without exception for billions of days, doubting tomorrow's sunrise is completely unreasonable.",
    smuggledAssumptions: [
      "Assuming the laws of nature can never shift or change.",
      "Assuming that because something happened 1,000 times before, it is impossible for it not to happen."
    ],
    correctedProposition: "Based on past observations, we reasonably expect the sun to rise tomorrow, but it is a strong expectation, not a mathematical certainty.",
    correctionRationale: "Correctly distinguishes between highly reliable practical experience and strict logical proof.",
    simpleExplanation: "Expecting the sun to rise is a smart habit, but we can't prove mathematically that the future will always repeat the past without exception.",
    toneVoices: {
      everyday: "We can be super confident the sun will rise tomorrow, but it's based on daily habit, not mathematical proof.",
      balanced: "Based on past observations, we reasonably expect the sun to rise tomorrow, but it is a strong expectation, not a mathematical certainty.",
      airtight: "Inductive generalizations provide high empirical probability based on observed regularities, but lack deductive logical necessity."
    },
    stressTest: {
      skepticObjection: "If tomorrow's sunrise isn't logically certain, why should we plan our lives around it?",
      shieldResponse: "Because practical habits and scientific probabilities are the smartest way to live, even without 100% mathematical guarantees.",
      solidityRating: "ROCK_SOLID",
      solidityNote: "Separates practical everyday confidence from strict logical certainty without disrupting daily life."
    }
  },

  "anselm-ontological": {
    id: "canonical-critique-anselm",
    input: "God is that than which nothing greater can be conceived; since existing in reality is greater than existing merely in thought, God must exist in reality.",
    authorOrTradition: "St. Anselm of Canterbury (Proslogion)",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    isLogicallyValid: false,
    verdict: "CATEGORY_ERROR",
    verdictSummary: "Trying to define something into physical reality purely through words.",
    whereIsTheProblem: {
      problematicPhrase: "since existing in reality is greater than existing merely in thought",
      flawType: "Defining an Idea into Real Existence",
      explanation: "Anselm builds the property of 'real existence' into his definition of a supreme idea. But you cannot prove a real entity exists outside your mind just by adding the word 'existing' to your mental definition. Otherwise, you could define a 'perfect island' and claim it must physically exist in the ocean."
    },
    stepByStepFlow: [
      {
        stepNumber: 1,
        statement: "We can conceive of an idea of the greatest possible being.",
        status: "sound",
        note: "A clear mental concept can be held in thought."
      },
      {
        stepNumber: 2,
        statement: "Existing in the real world is considered greater than existing only in thought.",
        status: "sound",
        note: "A comparison between an idea and an actual thing."
      },
      {
        stepNumber: 3,
        statement: "Therefore, this greatest being must physically exist in reality.",
        status: "unproven_leap",
        note: "You cannot leap from a mental definition to real-world existence without actual evidence."
      }
    ],
    authorCounterDefense: "Anselm argued that if God existed only in the mind, you could imagine a greater being who also lived in reality, which contradicts the definition of God as the greatest.",
    smuggledAssumptions: [
      "Assuming 'existence' is an optional quality (like 'blue' or 'tall') that can be attached to an idea.",
      "Assuming that having an idea in your head proves a matching object exists out in the world."
    ],
    correctedProposition: "We can imagine the concept of a greatest possible being, but whether such a being actually exists outside our minds requires evidence beyond definitions.",
    correctionRationale: "Separates mental concepts and definitions from whether something physically exists in reality.",
    simpleExplanation: "You can't prove something is real in the physical world just by defining it as 'the greatest thing ever'. Thinking of something perfect doesn't make it real outside your head.",
    toneVoices: {
      everyday: "You can't prove something exists in the real world just by defining it as the greatest thing you can imagine.",
      balanced: "We can imagine the concept of a greatest possible being, but whether such a being actually exists outside our minds requires evidence beyond definitions.",
      airtight: "Conceptual perfection is an intensional attribute of thought, which cannot deductively entail extensional reality without empirical demonstration."
    },
    stressTest: {
      skepticObjection: "If God is truly the greatest, wouldn't existing in reality be part of that definition?",
      shieldResponse: "Definitions describe what an idea means in your head; they cannot force the physical universe to create a matching object.",
      solidityRating: "ROCK_SOLID",
      solidityNote: "Correctly protects against the fallacy of defining mental ideas into physical existence."
    }
  },

  "zeno-dichotomy": {
    id: "canonical-critique-zeno",
    input: "To reach a destination, an object must first reach halfway, and before that, a quarter way; therefore, motion can never begin or finish.",
    authorOrTradition: "Zeno of Elea (Dichotomy Paradox)",
    timestamp: new Date().toISOString(),
    engineUsed: "canonical_offline",
    isLogicallyValid: false,
    verdict: "LOGICALLY_FLAWED",
    verdictSummary: "Confusing dividing numbers on paper with walking across a real room.",
    whereIsTheProblem: {
      problematicPhrase: "therefore, motion can never begin or finish",
      flawType: "Mistaking Infinite Math Divisions for Physical Obstacles",
      explanation: "On paper, you can divide any distance into infinite fractions (1/2, 1/4, 1/8...). But an infinite series of fractions can add up to a simple, finite number (like 1 meter), which a walking person crosses in a finite amount of time (e.g. 1 second). Zeno confused mental math divisions with real-world roadblocks."
    },
    stepByStepFlow: [
      {
        stepNumber: 1,
        statement: "Any distance between two points can be split into half, quarter, eighth, and so on.",
        status: "sound",
        note: "Mathematically, any continuous distance is infinitely divisible on paper."
      },
      {
        stepNumber: 2,
        statement: "To reach the end, an object must continuously traverse through this space.",
        status: "sound",
        note: "A moving body continuously traverses the space between start and finish."
      },
      {
        stepNumber: 3,
        statement: "Therefore, completing the journey requires an infinite amount of time and is impossible.",
        status: "flawed",
        note: "A sum of infinite decreasing fractions (1/2 + 1/4 + 1/8...) equals a finite number (1), crossed in finite time."
      }
    ],
    authorCounterDefense: "Zeno argued that performing an infinite number of tasks in a finite time is an impossible contradiction for any physical body.",
    smuggledAssumptions: [
      "Assuming an infinite number of math steps requires an infinite amount of physical time.",
      "Assuming that dividing space conceptually prevents physical movement."
    ],
    correctedProposition: "Distance can be divided into infinite mathematical fractions, but a moving object crosses those finite fractions continuously in finite time.",
    correctionRationale: "Recognizes that continuous physical motion easily covers mathematically divisible space.",
    simpleExplanation: "You can slice a 1-meter walk into infinite fractions on a piece of paper, but that doesn't stop your foot from taking one simple step across the room in one second.",
    toneVoices: {
      everyday: "You can cut a 1-meter walk into infinite fractions on paper, but your foot still crosses the room in one second.",
      balanced: "Distance can be divided into infinite mathematical fractions, but a moving object crosses those finite fractions continuously in finite time.",
      airtight: "Continuous physical motion traverses a continuum whose infinite sub-intervals converge to a finite spatial sum within finite time."
    },
    stressTest: {
      skepticObjection: "How can a physical object finish an infinite number of tasks?",
      shieldResponse: "Walking is one single physical movement. The 'infinite tasks' exist only in the way we choose to count fractions on paper.",
      solidityRating: "ROCK_SOLID",
      solidityNote: "Solves the paradox cleanly using modern calculus and common-sense motion."
    }
  }
};

export async function orchestrateClaimCritique(
  input: string,
  author?: string,
  config?: LLMConfig
): Promise<ClaimCritiqueResult> {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Claim to critique cannot be empty.");
  }

  // Check canonical benchmarks first
  const norm = trimmed.toLowerCase();
  if (norm.includes("think") && norm.includes("am")) {
    return CANONICAL_CRITIQUES["descartes-cogito"];
  }
  if (norm.includes("from itself") || norm.includes("another") || norm.includes("neither from")) {
    return CANONICAL_CRITIQUES["nagarjuna-causation"];
  }
  if (norm.includes("what is not") || norm.includes("nothing can come")) {
    return CANONICAL_CRITIQUES["parmenides-nothing"];
  }
  if (norm.includes("sun has risen") || norm.includes("rise tomorrow") || norm.includes("guaranteed to rise")) {
    return CANONICAL_CRITIQUES["hume-induction"];
  }
  if (norm.includes("greater can be conceived") || norm.includes("anselm") || (norm.includes("god") && norm.includes("thought") && norm.includes("reality"))) {
    return CANONICAL_CRITIQUES["anselm-ontological"];
  }
  if (norm.includes("reach halfway") || norm.includes("quarter way") || norm.includes("zeno") || norm.includes("motion can never")) {
    return CANONICAL_CRITIQUES["zeno-dichotomy"];
  }

  // Live LLM call
  const apiKey =
    config?.apiKey ||
    process.env.GROQ_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;

  if (apiKey) {
    try {
      const isGroq = apiKey.startsWith("gsk_") || Boolean(process.env.GROQ_API_KEY && !config?.apiKey?.startsWith("AIza"));
      const userPrompt = buildCritiqueUserPrompt(trimmed, author);

      if (isGroq) {
        const model = config?.model || process.env.DEFAULT_GROQ_MODEL || "openai/gpt-oss-120b";
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: CRITIQUE_SYSTEM_PROMPT },
              { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2
          })
        });

        if (res.ok) {
          const data = await res.json();
          const raw = data.choices?.[0]?.message?.content;
          if (raw) {
            return sanitizeAndValidateCritique(raw, trimmed, author, "groq_live");
          }
        }
      } else {
        const model = config?.model || "gemini-2.5-flash";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: CRITIQUE_SYSTEM_PROMPT }] },
            generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (raw) {
            return sanitizeAndValidateCritique(raw, trimmed, author, "gemini_live");
          }
        }
      }
    } catch (e) {
      console.warn("Live claim critique LLM error, falling back to heuristic:", e);
    }
  }

  // Fallback heuristic
  return generateHeuristicCritique(trimmed, author);
}

function sanitizeAndValidateCritique(
  rawText: string,
  input: string,
  author: string | undefined,
  engine: "groq_live" | "gemini_live"
): ClaimCritiqueResult {
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  const parsed = JSON.parse(cleaned);
  const validated = ClaimCritiqueResultSchema.safeParse(parsed);
  if (!validated.success) {
    console.warn("Zod notice on critique:", validated.error);
    return {
      ...parsed,
      id: parsed.id || `critique-${Date.now()}`,
      input,
      authorOrTradition: author || parsed.authorOrTradition,
      timestamp: new Date().toISOString(),
      engineUsed: engine
    };
  }

  return {
    ...validated.data,
    engineUsed: engine
  };
}

function generateHeuristicCritique(input: string, author?: string): ClaimCritiqueResult {
  return {
    id: `critique-heuristic-${Date.now()}`,
    input,
    authorOrTradition: author || "Historical / Philosophical claim",
    timestamp: new Date().toISOString(),
    engineUsed: "heuristic_fallback",
    isLogicallyValid: false,
    verdict: "LOGICALLY_FLAWED",
    verdictSummary: "The statement makes a big jump from a small observation to a sweeping universal rule.",
    whereIsTheProblem: {
      problematicPhrase: input.slice(0, 30) + "...",
      flawType: "Unproven Leap in Logic",
      explanation: "The sentence takes an idea that makes sense in a specific everyday setting and stretches it into a cosmic rule without showing evidence."
    },
    stepByStepFlow: [
      {
        stepNumber: 1,
        statement: `Observation or starting point: "${input.slice(0, 45)}...".`,
        status: "sound",
        note: "Initial observation or statement."
      },
      {
        stepNumber: 2,
        statement: "A connection is made without specifying the exact conditions required.",
        status: "sound",
        note: "Everyday mental inference."
      },
      {
        stepNumber: 3,
        statement: "Therefore, the claim is asserted as a universal, absolute fact.",
        status: "unproven_leap",
        note: "Unproven leap: going from a specific observation to an absolute cosmic law."
      }
    ],
    authorCounterDefense: "The author believed the statement was self-evident from direct intuition or language conventions.",
    smuggledAssumptions: [
      "Assuming that everyday words describe ultimate cosmic facts.",
      "Assuming an idea that works locally must apply everywhere."
    ],
    correctedProposition: `In clear terms, "${input}" describes a specific situation rather than an absolute rule of the universe.`,
    correctionRationale: "Keeps the assertion grounded in what can actually be seen, tested, or demonstrated.",
    simpleExplanation: "The claim takes an idea that works in a limited situation and turns it into a cosmic law without proving the connection.",
    toneVoices: {
      everyday: `In everyday life, "${input}" is a helpful observation if kept within reasonable limits.`,
      balanced: `In clear terms, "${input}" describes a specific situation rather than an absolute rule of the universe.`,
      airtight: `Under restricted empirical parameters, "${input}" holds, but cannot be generalized into an unconditional law.`
    },
    stressTest: {
      skepticObjection: `A critic would ask: "Why can't we treat this principle as an absolute truth if it feels true in so many situations?"`,
      shieldResponse: `You can answer: "Because stretching a local observation into an absolute cosmic law creates logical contradictions when edge cases appear."`,
      solidityRating: "NEEDS_BOUNDARY",
      solidityNote: "Valid in everyday contexts, but requires clearly stated boundary conditions."
    }
  };
}
