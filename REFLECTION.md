# Credex — Project Reflection

> This document is intentionally left partially blank.
>
> The prompts below are structured questions about real decisions made during this project.
> Answer them honestly — vague or aspirational answers defeat the purpose.
> A recruiter or collaborator reading this should come away with a clearer picture of
> how you actually think, not a polished narrative of how you wish the project had gone.

---

## The Hardest Bug

> A good answer names a specific file, a specific symptom, and the moment you realized
> what was actually wrong — not just "it was a tricky async issue."

**Prompt:** What was the single most frustrating bug you hit during this project?

- What were you trying to build when it broke?
- What did the error message say, and why was it misleading?
- What did you try first that didn't work?
- How long did it take before you found the real cause?
- What was the actual root cause — and was it something you should have caught earlier?
- What would you check first if you hit the same symptom again?

**Your answer:**

```
[Write here]
```

---

## Where AI Assistance Made Things Worse

> The honest version of this section is more useful than the polished version.
> "AI was great" tells a reader nothing. A specific case where it confidently gave you
> wrong code — and you shipped it — tells them a lot about how you work.

**Prompt:** Describe a moment where AI-generated code or suggestions caused a real problem.

- What were you asking for help with?
- What did the AI suggest, and why did it seem reasonable at the time?
- When did you realize it was wrong — before or after it caused a problem?
- What was the actual cost: time lost, a bug shipped, a wrong architectural decision?
- What do you now verify manually that you used to accept from AI output?

**Your answer:**

```
[Write here]
```

---

## A Decision You Reversed

> Every non-trivial project has at least one decision that seemed right at the time
> and turned out to be wrong. The interesting part is not that you reversed it —
> it is why you held onto it longer than you should have.

**Prompt:** What is one technical or product decision you made early that you later changed?

- What was the original decision and what was the reasoning behind it?
- What was the first sign it was wrong — and did you ignore that sign initially?
- What finally made you change it?
- What did reversing it cost you in time or complexity?
- If you were starting the project today, would you make the same initial decision again,
  knowing that you would eventually reverse it? Why or why not?

**Your answer:**

```
[Write here]
```

---

## What the Audit Engine Doesn't Handle Well

> The audit engine has 13 rules across 5 providers. Every rule has a threshold.
> Every threshold was a judgment call. Some of those calls are probably wrong.

**Prompt:** Where does the audit engine produce recommendations you don't fully trust?

- Which rule fires most often in your test data — and does the output feel accurate?
- Which rule are you least confident in? What would make you more confident?
- Is there a real-world scenario where the engine would produce a recommendation
  that is technically correct but practically useless or misleading?
- What data would you need to make the confidence scores actually meaningful
  rather than hardcoded constants?
- If a CFO acted on every recommendation the engine produced, what is the worst
  realistic outcome?

**Your answer:**

```
[Write here]
```

---

## The Feature You Cut (and Whether That Was Right)

> Scope decisions under time pressure reveal more about engineering judgment
> than the features that shipped.

**Prompt:** What is one feature you planned to build but cut, and was that the right call?

- What was the feature and why did it seem important when you planned it?
- What made you cut it — time, complexity, uncertainty about whether it mattered?
- Did cutting it affect the product in a way you can observe (missing signups,
  user feedback, a gap in the demo)?
- In hindsight, was it the right cut? Or did you cut it because it was hard,
  not because it wasn't valuable?

**Your answer:**

```
[Write here]
```

---

## The Part of the Codebase You'd Rewrite First

> "I'd rewrite everything" is not an answer. Pick one thing.

**Prompt:** If you had one week to improve the codebase without adding features, what would you change?

- Which file or module makes you uncomfortable when you open it?
- Is the discomfort about correctness, readability, testability, or performance?
- What specifically would the rewrite look like — not "clean it up" but what
  would the new structure actually be?
- Why didn't you write it that way the first time?

**Your answer:**

```
[Write here]
```

---

## Lessons Learned

> Three prompts. Answer each in 2–4 sentences maximum.
> Longer answers usually mean the lesson hasn't been fully distilled yet.

**On building in public:**
What did you learn about sharing work-in-progress that you didn't expect?

```
[Write here]
```

**On scoping:**
What did you underestimate about the time or complexity of this project,
and what did that teach you about how you estimate?

```
[Write here]
```

**On the problem space:**
After building this, do you believe the problem Credex solves is
painful enough that people will pay to solve it — or did building it
change your view on that?

```
[Write here]
```

---

## Self-Rating

> Rate yourself on each dimension from 1–5.
> 1 = significant gaps, 3 = solid but room to grow, 5 = genuinely strong.
> A row of 5s is a red flag. So is a row of 2s with no explanation.
> The number matters less than the one-line justification next to it.

| Dimension | Rating (1–5) | One-line justification |
|---|---|---|
| TypeScript and type safety | | |
| Next.js App Router patterns | | |
| Database schema and RLS design | | |
| Audit engine logic and rule design | | |
| Test coverage and test quality | | |
| UI/UX execution | | |
| Security decisions | | |
| Documentation quality | | |
| Scoping and prioritization | | |
| Knowing when to stop and ship | | |

**The one thing you would want a senior engineer reviewing this project to know
before they form an opinion:**

```
[Write here]
```

---

## What This Project Is Not

> This section exists to prevent the project from being misread.

**Prompt:** What would be a fair criticism of this project that you agree with?

Not a criticism you'd defend against — one you'd nod at.

```
[Write here]
```

---

*Fill this in after the project is complete, not before. The answers written under
pressure at the end of a build are more honest than the ones written speculatively
at the start.*
