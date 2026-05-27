# User Interviews — Credex AI Spend Audit

## Interview 1 — Priya M., CTO, 28-person B2B SaaS startup

**Date:** May 22, 2026
**Duration:** 14 minutes  
**Context:** Reached out via LinkedIn after seeing her post about engineering costs

### Background
- Series A funded, 12 engineers, 16 total employees
- Using ChatGPT Team (15 seats), Cursor Pro (12 seats), and Claude Pro (3 seats)
- Monthly AI spend: ~$1,200
- No formal tracking of who uses what

### Direct Quotes

> "We approved ChatGPT Team for everyone back in March, but honestly I have no idea who actually uses it. I know the engineers do, but marketing and sales? No clue."

> "Our CFO asked me last week how much we're spending on AI tools and I had to go dig through Stripe receipts. It was embarrassing."

> "I didn't realize Cursor and Copilot were basically the same thing. We almost bought Copilot too because one engineer asked for it."

> "The problem isn't the money — $1,200 a month is nothing compared to AWS. The problem is I can't answer basic questions about utilization when the board asks."

### Most Surprising Thing
She thought Cursor and GitHub Copilot were different categories of tools — one for "AI coding" and one for "code completion." When I explained they overlap significantly, she immediately said "oh shit, we almost wasted money there."

This validated the redundancy detection rule as a high-priority feature.

### What It Changed About the Design

**Before this interview:** I was planning to show savings as the primary metric.

**After this interview:** I realized the real pain point is **visibility and defensibility**. The audit report needs to be something she can forward to her CFO or board with confidence. This led to:

1. Adding the "show the math" feature — every savings estimate shows the formula
2. Making the shareable report URL a first-class feature, not an afterthought
3. Adding confidence scores so she can say "we're 87% confident in this recommendation"
4. Prioritizing the "already optimized" case — if she's spending well, the tool should celebrate that

### Key Insight
The tool isn't just for finding savings. It's for **answering questions from stakeholders** with data instead of guesses.

---

## Interview 2 — Marcus T., Engineering Manager, 85-person fintech company

**Date:** May 24, 2026  
**Duration:** 11 minutes  
**Context:** Cold DM on Twitter after he posted about "AI tool sprawl"

### Background
- Series B funded, 40 engineers, 85 total employees
- Using GitHub Copilot Business (40 seats), ChatGPT Team (25 seats), Claude API (direct billing)
- Monthly AI spend: ~$4,500
- Has been asked to "find 10% savings" in Q1 budget

### Direct Quotes

> "We have 40 Copilot seats but I'd bet money that only 20 engineers use it daily. The rest installed it, tried it once, and forgot about it."

> "The finance team sees $4,500/month and freaks out, but they don't understand that half of that is API usage which is actually productive. It's the subscriptions that are wasteful."

> "I need a number I can take to my VP. Not a guess, not a 'probably,' an actual defensible estimate with reasoning."

> "If I cancel seats and someone complains they needed it, I'm the bad guy. I need data to back up the decision."

### Most Surprising Thing
He said the hardest part isn't identifying waste — it's **getting buy-in to act on it**. Even when he knows 10 Copilot seats are unused, canceling them requires justification to finance, approval from his VP, and communication to the team.

This was a huge insight I hadn't considered: the tool needs to generate **artifacts for internal communication**, not just insights for the user.

### What It Changed About the Design

**Before this interview:** The audit output was just a list of recommendations.

**After this interview:** I realized the audit report needs to be a **stakeholder communication tool**. This led to:

1. Making the public report URL look professional and polished — it's going to be forwarded to VPs and CFOs
2. Adding priority classification (Critical/High/Medium/Low) so he can say "these 3 are Critical, let's start here"
3. Including the "reason" field in every recommendation so it's not just "cancel 10 seats" but "cancel 10 seats because they've been inactive for 30+ days"
4. Adding annual savings alongside monthly — "$2,400/year" is easier to justify than "$200/month"

### Key Insight
The tool's output needs to be **forwarded-able**. It's not just for the person running the audit — it's for their boss, their CFO, and their finance team.

---

## Interview 3 — Alex K., Solo Founder, 8-person startup

**Date:** May 26, 2026  
**Duration:** 9 minutes  
**Context:** Reached out via Indie Hackers after seeing his post about bootstrapping costs

### Background
- Bootstrapped, profitable, 3 engineers + 5 non-technical
- Using ChatGPT Plus (8 individual accounts), Claude Pro (2 accounts), Cursor Pro (3 accounts)
- Monthly AI spend: ~$450
- Paying out of pocket, very cost-conscious

### Direct Quotes

> "I'm paying for 8 ChatGPT Plus accounts because everyone wanted it, but I have no idea if they actually use it. I just see the Stripe charge every month."

> "We're bootstrapped so every $50 matters. If I can cut $100/month that's $1,200/year I can reinvest in the product."

> "I don't have time to audit this stuff manually. I need something that just tells me 'you're wasting money here' in 5 minutes."

> "The problem is I don't know what 'good' looks like. Is $450/month for 8 people normal? Am I overspending or underspending?"

### Most Surprising Thing
He said he'd **pay for this tool** if it ran automatically every month and alerted him to changes. "Like a smoke detector for AI spend."

This was completely unexpected. I thought this was purely a lead-gen tool for Credex's credit business, but there's a potential SaaS product here for recurring monitoring.

### What It Changed About the Design

**Before this interview:** I assumed everyone would want detailed breakdowns and explanations.

**After this interview:** I realized some users just want the **bottom line fast**. This led to:

1. Adding a "hero" savings number at the top of the audit results — "$1,200/year in identified savings" — before any details
2. Making the audit form as short as possible — every extra field is friction for someone like Alex
3. Adding the "already optimized" case with positive messaging — if he's spending well, tell him that clearly
4. Noting in METRICS.md that "recurring monitoring" is a potential paid feature to explore

### Key Insight
There are two user types:
1. **Enterprise users** (Priya, Marcus) who need detailed reports for stakeholders
2. **Bootstrapped founders** (Alex) who just want the answer fast

The tool needs to serve both without feeling bloated.

---

## Cross-Interview Patterns

### What All Three Said
1. **Visibility is the core problem** — not knowing who uses what
2. **Stakeholder communication is hard** — need defensible numbers
3. **Annual savings > monthly savings** — bigger number, easier to justify
4. **Speed matters** — if it takes more than 5 minutes, they won't do it

### What None of Them Said
- No one mentioned wanting AI-generated recommendations (they want deterministic, explainable logic)
- No one asked about integrations with billing systems (too much friction for a free tool)
- No one cared about historical trends (they want a point-in-time snapshot)

### Biggest Surprise Across All Interviews
The tool is not primarily about **saving money**. It's about **answering questions from stakeholders with confidence**.

The savings are the hook, but the real value is the defensible, shareable report they can forward to their CFO, board, or VP.

---

## How These Interviews Shaped the Product

| Feature | Why It Exists | Which Interview |
|---|---|---|
| Shareable public URL | Priya needs to forward to CFO | Interview 1 |
| "Show the math" in recommendations | Marcus needs to justify to VP | Interview 2 |
| Hero savings number at top | Alex wants the answer fast | Interview 3 |
| Confidence scores | Priya needs defensibility | Interview 1 |
| Priority classification | Marcus needs to prioritize actions | Interview 2 |
| "Already optimized" positive messaging | Alex needs to know if he's doing well | Interview 3 |
| Annual + monthly savings | All three said annual is easier to justify | All |

---

## What I'd Ask in Future Interviews

1. How often would you run this audit? (Monthly? Quarterly? Only when asked by finance?)
2. What would make you trust the savings estimates? (Formulas? Case studies? Third-party validation?)
3. If this tool cost $X/month for recurring monitoring, would you pay for it?
4. What other tools would you want audited? (Figma? Notion? Slack?)

---

## Validation of Core Assumptions

**Assumption 1:** Companies don't track AI tool utilization.  
**Validated:** All three confirmed this. No one had visibility into who uses what.

**Assumption 2:** The pain point is significant enough to act on.  
**Partially validated:** Priya and Marcus said yes. Alex said "maybe" — depends on the savings amount.

**Assumption 3:** Users will share the audit report with stakeholders.  
**Validated:** Priya and Marcus both said they'd forward it. This is a key distribution mechanism.

**Assumption 4:** Users want AI-generated recommendations.  
**Invalidated:** No one asked for this. They want explainable, deterministic logic. AI is useful for narrative polish, not the core recommendations.

---

## Conclusion

These three conversations fundamentally shaped the product. The biggest insight: **this is a stakeholder communication tool disguised as a spend audit**.

The user running the audit is not the end user of the output. The CFO, VP, or board member reading the forwarded report is the real audience.

That realization changed everything about how I designed the public report page, the recommendation format, and the shareable URL feature.
