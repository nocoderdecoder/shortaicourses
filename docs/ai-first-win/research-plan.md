# AI First Win: research and measurement plan

Draft dated 19 October 2026. This is a proposed 3–5 month plan; no owner interviews, study results, or adoption claims have yet been established. The [framework](framework-v0.1.md) is a candidate to test, not a validated instrument.

## Question and prior work

**Question:** Can a short task-level decision aid help owners with little technical support choose a suitable, supervised first AI task, produce a useful draft, and identify when a simpler method or no AI is better? Secondary questions: Which steps confuse owners? Which factual checks do they actually perform? What kinds of tasks fall outside the initial catalog?

[NIST AI RMF](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) supplies task/context, oversight, and risk-management concepts; [OECD's SME adoption paper](https://www.oecd.org/en/publications/ai-adoption-by-small-and-medium-sized-enterprises_426399c1-en.html) and [SME workforce survey](https://www.oecd.org/en/publications/generative-ai-and-the-sme-workforce_2d08b99d-en.html) give the small-business context. AI First Win combines these into an owner-facing task trial; it is not a claim of a novel risk framework or a measured productivity intervention.

## Feasible sequence

| Period | Work and dated artifacts | Decision gate |
| --- | --- | --- |
| Month 1 | Freeze framework/catalog `v0.1`, task examples, interview guide, consent materials, and baseline product event definitions. Dry-run the walkthrough with sample facts. | Confirm appropriate institutional/publication review before collecting interviews for a paper. |
| Months 2–3 | Invite a convenience sample of **5–7** owners from varied tasks/business types. Run 15–25 minute neutral walkthroughs, with a choice to use only sample information. Record only what was affirmatively consented to. Note confusion, time spent, edits/checks, rejected suggestions, and template comparisons. | Pause if sensitive data appears or the tool is unsafe/confusing. Do not stretch to a large experiment the owner cannot recruit. |
| Month 3 | Code observations against the five steps and outcome rules. Build a counterexample table: where the policy recommended a trial owners could not safely/usefully complete, or missed a safe task. Write a dated `v0.2` change log. | Revise both the policy and public language; preserve `v0.1` history. |
| Months 4–5 | If launched, describe aggregate product funnel counts and optional self-reported usefulness with denominator and missingness. Draft paper with prior work, method, examples, revisions, and limitations. | State that observed visits/trials/ratings do not prove time saved, sustained adoption, revenue, or causal impact. |

## Neutral walkthrough guide

Ask permission for notes or recording separately; do not require recording. A participant can stop or skip any question. Suggested prompts:

1. “What is one task in your work that you find repetitive or hard? How do you do it now?” Ask for a recent **non-sensitive** example; offer a fictitious sample.
2. “Before using this tool, what would make a result useful enough to keep?” “What could go wrong if a draft were incorrect?”
3. Invite them to use the tool without instruction. Ask “What do you expect this button/question to do?” and observe where they pause or go back. Do not steer them toward “good first task.”
4. After the recommendation: “Does this fit your task? Why or why not?” “Would a saved template or your current method work better?”
5. If they choose a trial: “What would you change or check before using this?” “What information did the tool leave out or assume?” Invite them to compare total preparation, generation, and review effort with their current method.
6. “Would you use this again for the same task, change the approach, or stop?” “What would the ongoing tool cost or privacy tradeoff mean for you?” “What did we fail to ask?”

Record disconfirming evidence as carefully as positive reactions. A suggestion that leads to a useful draft but takes longer to verify than the current process may challenge the Fit or Decision step. A “skip” that misses an obvious low-risk supporting task may challenge the catalog. An owner who fails to notice an invented fact challenges the review assumption even if they say the tool was useful.

## Product measures and their limits

The product may emit an allowlisted structured event at these points: landing visit and **coarse** campaign source; start; selected business/task categories; recommendation outcome and framework/catalog versions; generation attempt; success or error class; copy; edit; optional “Was this useful?” answer. No event should contain a name, email, URL with recipient token, raw prompt, submitted facts, generated text, or full IP. “Edit” means a change to the on-screen text, not proof that the owner sent or used it. A “copy” is an intent signal, not adoption.

The v0.1 event route writes structured events to **temporary Vercel function logs**; it is useful for debugging and limited spot checks but is not a durable research dataset. Platform logs may retain request metadata even when the application does not store inputs. No tracking cookie or persistent visitor ID is set. This design cannot verify unique businesses or follow a visitor over time. [Vercel's Hobby plan](https://vercel.com/docs/plans/hobby) includes ordinary Web Analytics page-view events, but [custom events require Pro or Enterprise](https://vercel.com/docs/analytics/custom-events); this project must not silently upgrade to obtain them. Any durable event store, retention period, access permissions, deletion method, or consent changes need a separate design and approval before wide outreach or formal funnel analysis.

Use precise denominators if data becomes available:

| Term | Meaning | What cannot be inferred |
| --- | --- | --- |
| Emails sent | Messages handed to a sender | Delivery or human attention. |
| Delivered | Sender reports acceptance/delivery under its definition | Inbox placement, opening, visit, or unique business. |
| Landing visits | Recorded page views, filtered where possible for obvious bots | Unique humans or businesses. |
| Starts | Entry into the decision flow | Completion. |
| Completed trials | Valid AI result displayed after an attempt | The owner reviewed, copied, used, or benefited. |
| Useful ratings | Voluntary response and its denominator | Representative satisfaction or actual effect. |
| Reported use | Owner's later self-report with explicit consent | Independently verified use or causality. |

Bot filtering is imperfect. Campaign cohorts can be identified with a shared, non-personal `src` value, but repeat visits and forwarded links distort counts. Keep optional feedback outside the path to the first result and avoid presenting it as a research consent mechanism.

## Separation, consent, and limits

Three purposes stay separate: (1) operations/debugging, (2) optional research interviews or follow-up, and (3) optional marketing email. None is a condition for a first result. If participant statements, recordings, contact details, or identifiable outcomes will enter a paper, obtain clear affirmative consent specifying purpose, data collected, storage/access, retention/deletion, quotation policy, and withdrawal contact. Keep contact/consent records away from product telemetry, with only authorized owner/research access; avoid placing them in this public repository. Do not repurpose ordinary tool inputs or a marketing signup as research participation.

Before formal collection, consult the relevant institution, publisher, or qualified adviser about applicable research and privacy requirements. [HHS OHRP guidance](https://www.hhs.gov/ohrp/education-and-outreach/online-education/human-research-protection-training/lesson-2-what-is-human-subjects-research/index.html) distinguishes systematic research designed for generalizable knowledge from ordinary improvement and directs investigators to an HRPP/IRB for determinations; this plan does not presume whether that regime applies here. A small convenience sample, self-selection, self-reported usefulness, and an observational funnel cannot establish productivity or business impact. Public reporting should avoid small cells or quotations that could identify an owner.

An owner-held private evidence plan is maintained outside this public GitHub repository. This public document contains no participant records or petition evidence.
