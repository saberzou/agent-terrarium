---
name: ideation
description: Structured ideation and product thinking — brainstorming, first principles decomposition, cross-pollination, opportunity mapping, and idea evaluation. Use when generating product ideas, exploring solution spaces, or turning vague problems into actionable concepts.
---

# Ideation Skill

Techniques for generating, exploring, and evaluating ideas. Not "give me 10 ideas" — structured thinking that produces non-obvious solutions.

## When to Use What

| Situation | Technique |
|-----------|-----------|
| "I have a vague problem" | First Principles Decomposition |
| "I need fresh product ideas" | Cross-Pollination |
| "I have too many ideas, which one?" | Idea Tournament |
| "What should we build for users?" | Opportunity Solution Tree |
| "I'm stuck, nothing feels new" | Constraint Flipping |
| "Brainstorm with me" | Diverge → Cluster → Converge |
| "Is this idea any good?" | Idea Stress Test |

---

## 1. First Principles Decomposition

Break the problem down to fundamental truths. Rebuild from there.

**Process:**
1. **State the problem** as clearly as possible
2. **List assumptions** — what does everyone "know" about this space?
3. **Challenge each assumption** — is it actually true, or just convention?
4. **Identify fundamentals** — what's irreducibly true?
5. **Rebuild** — what solutions emerge when you only keep the fundamentals?

**Prompt pattern:**
> "What are the 5 biggest assumptions in [domain]? For each: is it physically/logically necessary, or just how things have been done? What happens if we remove it?"

**Example:**
- Problem: "Movie recommendations are bad"
- Assumptions: Users know what genre they like. Ratings predict enjoyment. Similar users like similar things.
- Challenge: Most people can't articulate taste. Ratings are post-hoc rationalization. Mood matters more than history.
- Rebuild: Recommend based on current emotional state, not viewing history → Movie Oracle's approach.

---

## 2. Cross-Pollination

Steal structures from unrelated domains. The best ideas are often familiar solutions applied to unfamiliar problems.

**Process:**
1. **Define the core function** of what you're building (verb, not noun)
2. **Find 3-5 unrelated domains** that solve the same core function differently
3. **Extract the mechanism** — how does each domain solve it?
4. **Transplant** — what happens when you apply that mechanism to your problem?

**Prompt pattern:**
> "My product does [core function]. What are 5 completely unrelated fields that also do [core function]? For each, what's their unique mechanism, and what would it look like applied to [my domain]?"

**Example:**
- Core function: "Help people discover things they'll love"
- Unrelated domains: Wine sommelier (asks about your meal), museum curator (creates journeys), DJ (reads the room's energy), matchmaker (understands unstated preferences), bookshop owner (asks what you just finished)
- Transplant: A movie recommender that "reads the room" like a DJ → asks about your current vibe, not your history

---

## 3. Opportunity Solution Tree (Teresa Torres)

Move from vague goals to structured discovery. Prevents "feature factory" syndrome.

**Structure:**
```
         Desired Outcome
                |
    +-----------+-----------+
    |           |           |
Opportunity  Opportunity  Opportunity
    |           |           |
  Solutions   Solutions   Solutions
    |           |           |
Experiments  Experiments  Experiments
```

**Process:**
1. **Define desired outcome** — one measurable business/user metric
2. **Generate opportunities** (3-5) — customer problems, needs, pain points that drive the outcome. These are PROBLEMS, not solutions.
3. **Generate solutions** (2-3 per opportunity) — ways to address each
4. **Design experiments** — cheapest way to validate each solution
5. **Select POC** — evaluate on feasibility × impact × evidence

**Key rule:** Opportunities are always phrased as problems customers face, never as features ("users can't find relevant movies" not "add a recommendation engine").

---

## 4. Diverge → Cluster → Converge

Classic brainstorming done right. Three distinct phases — never mix them.

### Phase 1: DIVERGE (quantity, no judgment)
- Generate as many ideas as possible
- Wild ideas welcome — they unlock adjacent possibilities
- Build on others' ideas ("yes, and...")
- Aim for 15-30 raw ideas
- **No evaluation.** Not even "that's interesting."

### Phase 2: CLUSTER (find patterns)
- Group similar ideas into themes
- Name each cluster with a provocative label
- Look for surprising clusters — ideas that shouldn't go together but do
- Identify gaps — what theme is missing?

### Phase 3: CONVERGE (select and refine)
- Pick 2-3 strongest clusters
- For each: synthesize the best version combining multiple ideas
- Apply the Idea Stress Test (section 7)

---

## 5. Constraint Flipping

When stuck, flip the constraints. What you assume is fixed usually isn't.

**Process:**
1. List every constraint ("must be mobile", "needs login", "real-time", "free tier")
2. For each: flip it completely
3. Ask: "What becomes possible now?"

**Variations:**
- **Remove a constraint:** "What if it didn't need to be real-time?"
- **Reverse a constraint:** "What if users created content for US instead?"
- **Extreme a constraint:** "What if it was ONLY mobile? Only one screen?"
- **Time-shift:** "What if you had to build it in 1 day? What would you cut?"
- **Anti-problem:** "How would we make this product WORSE?" (then invert)

---

## 6. Idea Tournament (Monte Carlo-inspired)

Structured evaluation for when you have many ideas. Inspired by [ai-brainstorm](https://github.com/mikecreighton/ai-brainstorm).

**Process:**
1. **Seed:** Start with 8-12 raw ideas
2. **Score each idea** on 4 criteria (1-10):
   - **Novelty** — how different from existing solutions?
   - **Feasibility** — can it be built with available resources?
   - **Impact** — how much does it improve the user's life?
   - **Delight** — would someone tell a friend about this?
3. **Rank** by composite score
4. **Branch:** Take top 3, generate 2-3 variations of each
5. **Score variations** against same criteria
6. **Final pick:** Best scoring variation + gut check

**The gut check matters.** If the highest-scoring idea doesn't excite you, something's wrong with the criteria, not the idea.

---

## 7. Idea Stress Test

Before committing to any idea, pressure-test it:

1. **Who specifically wants this?** Name a real person or archetype. "Everyone" = no one.
2. **What's the current alternative?** If it's "nothing," be skeptical — maybe the problem isn't real.
3. **Why now?** What changed that makes this possible/necessary today?
4. **What's the smallest version?** Can you test the core hypothesis in a weekend?
5. **What kills it?** Name the #1 risk. If you can't, you haven't thought hard enough.
6. **Would YOU use it?** Honest answer only.

If you can't answer all 6 crisply, the idea needs more baking.

---

## 8. Jobs To Be Done (JTBD)

Understand what people actually hire your product to do.

**Framework:**
> "When [situation], I want to [motivation], so I can [expected outcome]."

**Process:**
1. Interview or observe: What was happening when someone started using a solution?
2. What were they trying to accomplish? (functional job)
3. How did they want to feel? (emotional job)
4. How did they want to be perceived? (social job)
5. What did they use before? Why did they switch?

**Product insight comes from the switch moment** — what was so painful about the old way that they bothered to change?

---

## Running an Ideation Session

When the user says "brainstorm with me" or "I need ideas for X":

1. **Clarify the space** — ask 2-3 sharp questions to understand the domain, user, and constraints
2. **Pick the right technique** (use the table above)
3. **Run the technique** — follow the steps, don't skip phases
4. **Push for non-obvious** — if an idea sounds like it already exists, push harder
5. **Stress test the winners** — apply the Idea Stress Test before declaring winners
6. **Output:** Top 2-3 ideas, each with: one-line pitch, who it's for, why it's different, smallest testable version

### Anti-Patterns to Avoid
- ❌ Listing 10 generic ideas with no structure
- ❌ Evaluating during divergence
- ❌ Falling in love with the first idea
- ❌ Solutions without problems
- ❌ "AI-powered [existing thing]" as innovation
- ❌ Skipping the "who specifically wants this" question
