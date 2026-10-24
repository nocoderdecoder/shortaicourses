# AI First Win: setup, cost, and outreach readiness

Planning note dated 19 October 2026. This document describes a proposed feature branch, not a production launch. Do not deploy, change production environment settings, send/schedule emails, add billing-enabled services, or upgrade Vercel without the owner's approval.

## Architecture and manual setup

The current repository is a Next.js App Router site with courses, articles, and the GTM Lab. Keep its course routes and GTM endpoint intact. AI First Win should use a small versioned catalog and deterministic server recommendation policy. A server-only route may send an eligible trial to OpenAI and validate its bounded response. User text remains data, not a policy instruction. The browser never receives `OPENAI_API_KEY`; no input or generated draft is stored by the application by default. OpenAI receives the supplied trial facts; tell visitors this before they submit and offer sample facts. Provider handling and platform request metadata may have their own retention rules, so do not claim zero retention.

The intended environment contract is:

| Variable | Purpose | Handling |
| --- | --- | --- |
| `OPENAI_API_KEY` | Server-side provider authorization, already used by the GTM Lab. | Secret setting on the host; local development only in ignored `.env.local`. Never `NEXT_PUBLIC_`, source, screenshots, logs, or PR text. |
| `AI_FIRST_WIN_ENABLED` | Production generation kill switch. | Set to `true` only after the deployment and safeguards are approved and verified; unset/false disables provider calls. No production value is changed by this PR. |
| `RATE_LIMIT_SECRET` | Existing secret for Vercel Firewall SDK quota keys. | Reuse the host's existing secret; do not print or duplicate it. For previews without this protection, production-style generation should fail closed. |

The currently published GTM Lab has one Vercel Hobby rate-limit rule: API ID `gtm-generation`, **10 valid attempts per 600 seconds**. Reusing this quota for AI First Win requires the **same API ID and the same custom `rateLimitKey: 'gtm-lab-shared-v1'`** in both routes; a different custom key would have its own counter. The quota is shared with GTM traffic, so it is a safety brake and a capacity constraint. Rate-limit failures, missing secret/rule, and quota-check errors should stop before an OpenAI request. [Vercel documents per-region counters and one Hobby rate-limit rule](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting); the repository pins compute to `iad1`, but this is not an absolute billing ceiling. Keep a short provider timeout, explicit input/output caps, no automatic retry, generic provider errors, and status-only diagnostic logs. The global hard OpenAI project spend limit and alert should be reviewed by the owner before outreach. [OpenAI Docs explains that an alert does not stop traffic and that hard-limit enforcement can lag](https://developers.openai.com/api/docs/guides/spend-limits).

For local testing, use the current ignored `.env.local` setup only if an explicitly approved live provider test is needed; routine tests should mock the provider and quota. A preview build can verify static pages, rules, validation, and error states without a secret. Do not copy a production secret into code or a PR to make a preview work. Before an approved launch, verify the deployed branch's environment and quota separately, then perform a small real browser smoke test and inspect the provider dashboard. The first visitor result is free to the visitor. The site owner pays API and hosting usage; no external subscription is presented as necessary to the visitor.

## AI cost and capacity estimate

As of 19 October 2026, [OpenAI Docs lists `gpt-4.1-mini` at $0.40 per million input tokens and $1.60 per million output tokens](https://developers.openai.com/api/docs/models/gpt-4.1-mini). It is **marked deprecated** there, although the existing GTM Lab has used it successfully. Test model access and quality in the pilot; reassess migration before broad outreach. The numbers below are estimates for uncached text generation, excluding hosting, observability, failed calls that consume tokens, tax, model changes, and any other OpenAI tools. Actual usage must be checked in the provider dashboard.

Assume **1,000 input tokens + 500 output tokens per call**: `1,000 × $0.40/1,000,000 + 500 × $1.60/1,000,000 = $0.00120` per call. A more cautious **2,000 input + 700 output** assumption is `$0.00192` per call. These are planning assumptions, not guarantees or hard maximums; meter actual token usage and enforce sensible request and output caps.

| Scenario | Implied provider calls | At 1,000/500 tokens | At 2,000/700 tokens |
| --- | ---: | ---: | ---: |
| Pilot: 50 visitors × 40% try × 1.2 calls/try | 24 | $0.029 | $0.046 |
| Modest invitation: 20,000 emails × 80% delivered × 5% visit × 50% try × 1.2 calls/try | 480 | $0.58 | $0.92 |
| Stress: 20,000 **visitors** × 50% try × 1.2 calls/try | 12,000 | $14.40 | $23.04 |
| Abuse illustration without controls: 100,000 calls | 100,000 | $120 | $192 |

The modest case includes hypothetical delivery/visit/try rates solely to estimate demand; none is a forecast. The existing shared quota allows at most about **60 attempts/hour or 1,440/day per region** if perfectly spread, before GTM demand, failures, per-process limits, and downtime. Thus 480 attempts in one hour would mostly meet a busy/limit response, while a 12,000-call stress case cannot fit in a one-day campaign under this configuration. Do a small pilot, measure actual completion, token use, peak request timing, rejection rates, and error rates, then decide whether the experience and capacity can support a wider invitation. A rate limit reduces exposure but does not substitute for an owner-set OpenAI spend control or prevent all platform costs.

## Privacy-conscious operating measures

Send only allowlisted event types and categories to the structured event route: landing/source cohort, start, selected category, recommendation outcome/framework/catalog version, generation attempt/result or error class, copy/edit, and optional usefulness rating. Never send raw text, generated drafts, contact details, full referral URLs, or recipient IDs. Keep campaign `src` values at **cohort** level, such as `pilot-local-2026q4`, and strip unknown query values rather than recording them. This route's function logs are short-lived and do **not** constitute durable analytics. Hosting may retain request metadata. Without persistent visitor IDs, do not claim unique businesses or sustained use. See [research-plan.md](research-plan.md) for denominators, consent, and the decision to add a durable data store only after a separate privacy/cost review. [Vercel custom Web Analytics events are not available on Hobby](https://vercel.com/docs/analytics/custom-events); do not make a paid plan a hidden dependency.

## Pilot before outreach

1. Internal walkthroughs: home-service owner, shop owner, professional service owner, very sparse facts, unsuitable/unsafe task, and sample-data visitor. Check that the page explains the offer without a guide, yields a draft only for eligible tasks, and leaves a usable non-AI path.
2. Ask 5–7 owners for optional, consented walkthroughs; do not require research participation to use the tool. Fix observed confusion, invented facts, review-step failures, mobile layout, and error recovery.
3. Pilot with a **small, deliberately paced** invitation cohort only after approval. Record sending and delivery separately from page visits and completions. Observe provider cost and limit responses. Do not infer “businesses helped” from clicks.
4. Before any broader send, review rate-limit capacity, hard project spend setting, sender-domain authentication, suppression list, jurisdiction-specific legal basis, privacy notice, and actual usefulness evidence. Increase no paid limits or hosting plan without approval.

No outreach is sent or scheduled in this project.

## Legal and sender-readiness questions for later review

The audience's countries, source of addresses, consent records, sender service, and marketing message content are not yet specified. A qualified reviewer should decide which rules apply before any campaign. Current primary guidance includes:

- **United States:** The [FTC CAN-SPAM guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) explicitly covers business-to-business commercial email. It calls for accurate sender/subject, a postal address, clear opt-out, and honoring opt-outs; no B2B exemption should be assumed.
- **Canada:** [CRTC CASL guidance](https://web.crtc.gc.ca/eng/com500/guide.htm) generally requires consent, sender identification, and unsubscribe for commercial electronic messages, with fact-specific conditions for implied consent. A public business email alone is not blanket permission.
- **United Kingdom:** [ICO B2B guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/) distinguishes corporate subscribers from sole traders and some partnerships; UK GDPR still applies when processing personal business contact data. If subscriber status is unclear, obtain tailored advice and use the stricter path.
- **Deliverability:** [Gmail sender requirements](https://support.google.com/mail/answer/81126) require authentication; at roughly 5,000+ daily messages to personal Gmail accounts they require SPF, DKIM, DMARC and one-click unsubscribe for marketing/subscribed messages. Other mail providers and countries can have additional requirements. Check these rules again at the time of sending.

Use a non-personal campaign/cohort code in a public URL; never put an email address, hashed email, recipient token, or other linkable identifier in query parameters. Maintain contact, consent, and suppression records in an authorized private system separate from the product. Do not use marketing signup as research consent or vice versa. The public site should offer a first result without either.
