# Development Log — Credex AI Spend Audit Tool

## Honest Timeline Note

This project was completed in an intensive 2-day sprint (May 26-27, 2026) rather than spread across the recommended 7-day timeline. This was a mistake in planning and time management. The entries below represent the work phases and learnings, but they occurred in a compressed timeframe.

---

## Day 1 — 2026-05-26 (Morning)

**Hours worked:** 6

**What I did:**
- Read through the full assignment document multiple times to understand requirements
- Researched current pricing for ChatGPT, Claude, Cursor, GitHub Copilot, and Gemini
- Set up Next.js 16 project with TypeScript, Tailwind CSS, and Supabase
- Created initial project structure and configured environment variables
- Started building the audit engine rule logic
- Created Supabase schema with organizations, audits, and recommendations tables

**What I learned:**
- Most AI tool pricing is per-seat monthly, but API pricing is usage-based
- The key insight is that many companies don't track seat utilization at all
- Deterministic rules are better than LLM-generated recommendations for financial audits
- I should have started this project earlier to spread the work properly

**Blockers / what I'm stuck on:**
- Time pressure is real — need to prioritize core features
- Need to decide on the exact threshold values for "inactive seat" and "low utilization"

**Plan for rest of day:**
- Finish core audit engine with all provider rules
- Build authentication and basic dashboard structure
- Start on documentation files

---

## Day 1 — 2026-05-26 (Afternoon/Evening)

**Hours worked:** 8

**What I did:**
- Completed audit engine with 13 rules across 5 providers
- Built confidence scoring and priority classification logic
- Set up Row Level Security policies in Supabase
- Built authentication flow with Supabase Auth
- Created dashboard layout with sidebar navigation
- Started building audit results visualization with Recharts
- Documented pricing sources in PRICING_DATA.md
- Wrote initial versions of ARCHITECTURE.md and GTM.md

**What I learned:**
- Confidence scoring needs to be transparent — users won't trust a black box number
- The "already optimized" case is important — don't manufacture fake savings
- Working this intensively leads to mistakes — caught several bugs in audit logic
- Should have built public-first flow instead of auth-first

**Blockers / what I'm stuck on:**
- Realized I built auth-first when assignment requires public-first
- Running out of time to pivot architecture
- Haven't done user interviews yet (critical requirement)

**Plan for tomorrow:**
- Build public landing page and audit form
- Create public results pages with shareable URLs
- Write all remaining documentation files
- Conduct user interviews (even if rushed)
- Deploy and test

---

## Day 2 — 2026-05-27 (Morning)

**Hours worked:** 7

**What I did:**
- Built public landing page with hero section and audit form
- Created public audit results page accessible without login
- Implemented shareable URL generation with unique IDs
- Added Anthropic API integration for personalized summaries
- Set up Resend for transactional emails
- Added Open Graph and Twitter Card meta tags
- Implemented lead capture form with email validation
- Built transactional email templates with React Email

**What I learned:**
- The public audit flow needs to be FAST — any friction kills conversion
- Open Graph tags are essential for social sharing
- Users are skeptical of savings estimates — showing the formula helps
- Rushing user interviews produces lower quality insights

**Blockers / what I'm stuck on:**
- User interviews are rushed — reached out to 3 people but conversations were brief
- Anthropic API rate limits during testing
- Need to add graceful fallback for API failures
- Time pressure affecting documentation quality

**Plan for rest of day:**
- Complete all remaining documentation files
- Write USER_INTERVIEWS.md (even though interviews were rushed)
- Add remaining features (form persistence, abuse protection)
- Deploy to production and test end-to-end
- Final polish and submission prep

---

## Day 2 — 2026-05-27 (Afternoon/Evening)

**Hours worked:** 9

**What I did:**
- Added Gemini and Windsurf provider support to audit engine
- Implemented honeypot field for spam protection
- Added Framer Motion animations throughout the app
- Wrote USER_INTERVIEWS.md with notes from 3 conversations
- Wrote PROMPTS.md documenting all LLM prompts
- Completed TESTS.md documenting all test cases
- Wrote 25 unit tests for audit engine
- Fixed critical bugs in audit engine edge cases
- Added "already optimized" messaging for low-savings audits
- Deployed to Vercel production
- Tested entire flow end-to-end as a cold visitor
- Ran Lighthouse audits (Performance: 92, Accessibility: 95, Best Practices: 100)
- Completed remaining documentation files

**What I learned:**
- The public audit flow is the most important feature — everything else supports it
- Documentation quality matters as much as code quality for this assignment
- Testing the full user journey as a stranger reveals UX issues you miss as the builder
- Compressing 7 days of work into 2 days leads to corners being cut
- I should have started earlier and spread the work across the full week

**Blockers / what I'm stuck on:**
- None — ready to submit, but aware of quality compromises due to time pressure

**Plan for tomorrow:**
- Submit assignment before deadline
- Monitor for any last-minute issues

---

## Reflection on the Timeline

**What went wrong:**
- Started too late — should have begun on Day 1 of the 7-day window
- Compressed 7 days of work into 2 intensive days
- User interviews were rushed and lower quality than they should have been
- Some documentation was written after the fact rather than during development
- Git history doesn't show the recommended 5+ days of commits

**What went well despite the time pressure:**
- Strong audit engine with defensible logic
- Clean architecture and code quality
- Comprehensive documentation (even if rushed)
- Deployed and working product
- All 6 MVP features implemented

**What I'd do differently:**
- Start on Day 1 of the assignment window
- Spread work across 5-7 days as recommended
- Conduct user interviews early (Day 2-3) to inform design decisions
- Build public-first flow from the start, not auth-first
- Allocate proper time for documentation throughout the week
- Make meaningful commits daily to show consistent progress

**Key learning:**
The assignment is testing discipline and consistency as much as technical skill. Compressing the work into 2 days, even if the output is functional, demonstrates poor planning and time management. The git history and DEVLOG are meant to show steady progress, not a last-minute sprint. This was a significant mistake in my approach.

**Honest assessment:**
I built a working product with good code quality and comprehensive documentation, but I failed the discipline and consistency dimension of the evaluation. The compressed timeline is obvious in the git history and undermines the credibility of the submission. If I could do this again, I would start immediately and work steadily across the full 7-day window.
