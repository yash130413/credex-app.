# Development Log — Credex AI Spend Audit Tool

---

## Day 1 — 2026-05-21

**Hours worked:** 0

**What I did:**
Nothing. I received the assignment today but didn't start. I spent time on other commitments and told myself I'd start tomorrow.

**What I learned:**
N/A

**Blockers / what I'm stuck on:**
Procrastination. I underestimated how much work this would be and thought I could do it later in the week.

**Plan for tomorrow:**
Read through the full assignment document carefully. Research pricing for all required AI tools. Set up the project structure.

---

## Day 2 — 2026-05-22

**Hours worked:** 0

**What I did:**
Nothing again. I read through the assignment briefly but didn't start coding. I was busy with other work and kept pushing this off.

**What I learned:**
I'm falling behind. The assignment requires 7 days of work and I've already wasted 2 days.

**Blockers / what I'm stuck on:**
Poor time management. I need to start immediately or I won't finish in time.

**Plan for tomorrow:**
Actually start. Set up Next.js project, research pricing data, and begin building the audit engine.

---

## Day 3 — 2026-05-23

**Hours worked:** 0

**What I did:**
Still nothing. I kept telling myself I'd start "later today" but never did. This is becoming a serious problem.

**What I learned:**
I've now wasted 3 days. The assignment is testing discipline and I'm failing that test badly.

**Blockers / what I'm stuck on:**
Fear of starting. The scope feels overwhelming so I keep avoiding it.

**Plan for tomorrow:**
No excuses. Start coding tomorrow morning. Even if I can only work 2-3 hours, I need to make progress.

---

## Day 4 — 2026-05-24

**Hours worked:** 0

**What I did:**
Nothing. I've now wasted 4 out of 7 days. I'm in serious trouble.

**What I learned:**
I've completely mismanaged this assignment. I should have started on Day 1 and worked steadily. Now I'm going to have to cram everything into the last 2-3 days.

**Blockers / what I'm stuck on:**
Panic is setting in. I know I need to start but I'm paralyzed by how much work is left.

**Plan for tomorrow:**
Start immediately. Work all day. Focus on core features first.

---

## Day 5 — 2026-05-25

**Hours worked:** 0

**What I did:**
Nothing. I've now wasted 5 days. I have 2 days left before the deadline.

**What I learned:**
This is a disaster. I'm going to have to work non-stop for the next 48 hours to have any chance of finishing.

**Blockers / what I'm stuck on:**
I've dug myself into a hole. The only way out is to work intensively for the next 2 days.

**Plan for tomorrow:**
Work from morning to night. Build the entire MVP in one day. No breaks.

---

## Day 6 — 2026-05-26

**Hours worked:** 14

**What I did:**
- Read through the full assignment document multiple times
- Researched current pricing for ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and Windsurf
- Set up Next.js 16 project with TypeScript, Tailwind CSS, and Supabase
- Created initial project structure and configured environment variables
- Built the entire audit engine with 13 rules across 6 providers
- Implemented confidence scoring and priority classification logic
- Set up Supabase schema with organizations, audits, and recommendations tables
- Configured Row Level Security policies
- Built authentication flow with Supabase Auth
- Created dashboard layout with sidebar navigation
- Started building audit results visualization with Recharts
- Documented pricing sources in PRICING_DATA.md
- Wrote initial versions of ARCHITECTURE.md and GTM.md
- Reached out to 3 people for user interviews (scheduled for tomorrow)

**What I learned:**
- Working 14 hours straight is exhausting and leads to mistakes
- I caught several bugs in the audit logic because I was rushing
- Deterministic rules are better than LLM-generated recommendations for financial audits
- The "already optimized" case is important — don't manufacture fake savings
- I should have built public-first flow instead of auth-first (realized this too late)
- Most AI tool pricing is per-seat monthly, but API pricing is usage-based
- Companies don't track seat utilization at all — this is the core insight

**Blockers / what I'm stuck on:**
- Exhausted from working all day
- Realized I built auth-first when assignment requires public-first — need to pivot
- Haven't done user interviews yet (scheduled for tomorrow morning)
- Still need to build landing page, public audit flow, emails, and all remaining docs

**Plan for tomorrow:**
- Conduct 3 user interviews in the morning
- Build public landing page and audit form
- Create public results pages with shareable URLs
- Add Anthropic API integration for summaries
- Set up Resend for transactional emails
- Write all remaining documentation files
- Write 25 tests for audit engine
- Deploy to production
- Submit before deadline

---

## Day 7 — 2026-05-27

**Hours worked:** 16

**What I did:**
- Conducted 3 user interviews (Priya, Marcus, Alex) — 10-15 minutes each
- Built public landing page with hero section and clear value proposition
- Created public audit form at /audit-form with localStorage persistence
- Implemented public audit results page accessible without login
- Added shareable URL generation with unique IDs and Open Graph tags
- Integrated Anthropic API for personalized summaries with fallback
- Set up Resend for transactional emails
- Built email templates with React Email
- Implemented lead capture form with honeypot spam protection
- Added Framer Motion animations throughout the app
- Wrote 25 unit tests for audit engine covering all edge cases
- Wrote USER_INTERVIEWS.md with detailed notes from conversations
- Wrote PROMPTS.md documenting all LLM prompts and what didn't work
- Completed TESTS.md documenting all test cases
- Wrote REFLECTION.md answering all 5 questions
- Completed ECONOMICS.md with unit economics breakdown
- Completed LANDING_COPY.md with hero copy and FAQs
- Completed METRICS.md with North Star metric definition
- Set up GitHub Actions CI workflow
- Deployed to Vercel production
- Tested entire flow end-to-end as a cold visitor
- Ran Lighthouse audits (Performance: 92, Accessibility: 95, Best Practices: 100)
- Fixed bugs found during testing
- Prepared submission

**What I learned:**
- Working 16 hours straight is brutal and not sustainable
- The user interviews were incredibly valuable — they completely changed my design priorities
- The public audit flow is the most important feature — everything else supports it
- Documentation quality matters as much as code quality for this assignment
- Testing the full user journey as a stranger reveals UX issues you miss as the builder
- Compressing 7 days of work into 2 days leads to corners being cut and quality compromises
- I should have started on Day 1 and worked steadily across the full week
- The assignment is testing discipline and consistency as much as technical skill
- My poor time management and procrastination cost me the discipline score

**Blockers / what I'm stuck on:**
None — ready to submit, but fully aware that I failed the discipline and consistency dimension of the evaluation.

**Plan for tomorrow:**
Submit the assignment. Reflect on what went wrong with my time management. Learn from this mistake.

---

## Honest Reflection on This DEVLOG

**The truth:**
I wasted the first 5 days of the assignment window due to procrastination and poor time management. I then worked intensively for 14-16 hours on Days 6-7 to complete everything.

**What this means:**
- My git history only shows 2 days of commits (May 26-27)
- This violates the requirement of "commits on at least 5 distinct calendar days"
- I failed the discipline and consistency test
- The compressed timeline is obvious and undermines the credibility of my submission

**What I learned:**
The assignment is not just testing my ability to code — it's testing my ability to plan, execute consistently, and manage my time like a professional. I failed that test. Even though I built a working product with good code quality and comprehensive documentation, the lack of consistent daily progress shows poor discipline.

**What I would do differently:**
- Start on Day 1 of the assignment window, no excuses
- Work 3-4 hours per day across 7 days instead of 30 hours across 2 days
- Conduct user interviews early (Day 2-3) to inform design decisions
- Make meaningful commits daily to show steady progress
- Build public-first flow from the start, not auth-first
- Allocate proper time for documentation throughout the week

**Key takeaway:**
Consistent daily progress beats last-minute heroics. This is true in startups and it's true in this assignment. I learned this lesson the hard way.

**Honest assessment:**
I built a working product with good code quality and comprehensive documentation, but I failed the discipline and consistency dimension of the evaluation. The compressed timeline is obvious in the git history and undermines the credibility of the submission. If I could do this again, I would start immediately and work steadily across the full 7-day window.