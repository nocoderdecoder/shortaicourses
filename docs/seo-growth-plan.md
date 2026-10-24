# SEO growth plan — 24 October 2026

## Measured starting point

Source: Google Search Console domain property `shortaicourses.com`, Web search, 23 July–22 October 2026. The performance report showed **23 impressions, 0 clicks, 0% CTR, and average position 30.2**. These are very small samples; position and CTR are not useful page-level targets yet. Search Console measures search visibility, not visits from every source or course conversions.

The shorter **25 September–22 October 2026** Web report also showed **23 impressions and 0 clicks**. It ended before the 24 October Resources deployment, so it cannot measure that release. The visible query rows had just one impression each, including “ai short course,” “business prompt templates,” “prompt templates for business,” and “ai pipeline forecast from crm data.” These are topic clues, not evidence that any individual page is winning or failing. Do not sum the report's apex and www URL rows as distinct content pages.

The Page indexing report was last updated **15 October 2026**, before the canonical-host fix. It showed **30 indexed URLs**, **24 “Page with redirect” URLs**, and **14 “Discovered – currently not indexed” URLs.** All 14 listed examples were apex (`https://shortaicourses.com/...`) URLs with no recorded crawl. Proper apex-to-www redirects should remain; the redirect count is not itself a defect. The canonical `https://www.shortaicourses.com/sitemap.xml` was submitted on 24 October. Its detail page reported “Sitemap processed successfully” and **38 discovered pages**, while the summary table still showed “Couldn't fetch.” Recheck the table and indexing report after Google updates them; discovered is not the same as indexed.

The production site has no aggregate course-start, completion, or signup analytics. Browser-local events in the older static MVP cannot measure overall visitor behavior.

The 24 October production deployment of [PR #5](https://github.com/nocoderdecoder/shortaicourses/pull/5) added the Resources hub and linked guides; the live canonical sitemap then contained **39 URLs**. Search Console's newer URL inspection showed the canonical **www `/courses` page indexed**, last crawled by Googlebot smartphone on **24 October at 10:41 Pacific** with a successful fetch, the www sitemap detected, and Google's selected canonical matching the inspected URL. The canonical www business-prompt lesson was also indexed. Immediately after deployment, `/resources` was unknown to Google's index, but its live test said it could be indexed and a request for indexing was submitted. These point checks do not prove site-wide indexing or a traffic increase.

On **24 October 2026**, Search Console's first live URL test for `https://www.shortaicourses.com/tools/gtm-strategy-lab` reported **“URL is not available to Google”** and **“Page fetch: Failed: Server error (5xx)”**. An independent crawl saw a Vercel Security Checkpoint challenge. The Vercel custom rule `Verify GTM Lab visitors` challenges both the public landing page and `/api/gtm-strategy`; Google could not complete the page challenge. An API-only challenge would break first-time browser submissions because Vercel requires a prior challenge session for a challenged API call. With user approval, a higher-priority bypass was published for **GET `/tools/gtm-strategy-lab`** when the user agent contains `Googlebot` or `Google-InspectionTool`. The API challenge and independent 10-per-IP-per-10-minute generation quota remain enabled. User-agent strings can be spoofed, so this rule exposes only the already-public GET page. Search Console's repeat live test at **10:10 Pacific** reported **“URL is available to Google”** and **“Page can be indexed.”** This confirms live fetchability, not that Google has indexed the page.

## One-time work, in priority order

| Priority | Action | Completion evidence |
| --- | --- | --- |
| 1 | Connect the glossary and three resource guides from the homepage, a Resources page, navigation, and relevant courses/lessons. | **Done in PR #5:** important guides have crawlable inbound links from the site. |
| 2 | Repair the two glossary lesson links, one of which points to a nonexistent route. | **Done in PR #5:** both resolve to lesson pages. |
| 3 | Correct outdated or unsupported ChatGPT, Claude, Perplexity, labor-market, and numerical claims; fix the 50-versus-48 use-case discrepancy. | **Done in PR #5:** editorial corrections are published; revisit claims as tools change. |
| 4 | Replace the nonexistent `EducationalArticle` schema type on lesson pages with valid learning-resource markup. | **Done in PR #5:** lessons use `LearningResource` markup. |
| 5 | Keep the narrow GTM Lab public-GET crawler bypass ahead of the existing Vercel challenge rule, and monitor its effect. | **Done:** Google's live test can fetch the public page. The generation API challenge and 10-per-IP-per-10-minute quota remain enabled. Recheck first-time human generation after any future firewall edits. |
| 6 | Inspect representative **www** URLs in Search Console after deployment and repeat when reports refresh. | **In progress:** `/courses` and the business-prompt lesson are indexed; `/resources` and GTM Lab passed live fetchability tests but indexing remains unconfirmed. |
| 7 | Improve a small set of task pages with original, checked examples: a prompt, synthetic input, output, review checklist, and downloadable or copyable artifact. Start with AI meetings, outreach, and competitive intelligence. | Each page helps a reader complete a real task and links to the relevant course/tool. Human review of AI-generated advice is required. |
| 8 | Set up aggregate privacy-conscious visitor and conversion measurement once a free analytics property and ID are available. | Visits, course starts, lesson completions, and signup outcomes can be measured across visitors without relying on browser-local counters. |
| 9 | Run one small distribution experiment for a genuinely useful published workflow. | A reviewed message, canonical tagged URL, distribution date, and observable referral/action result are recorded; see [the pipeline workflow experiment](seo-pipeline-experiment.md). |

The worked business-prompt and meeting examples were merged in [PR #6](https://github.com/nocoderdecoder/shortaicourses/pull/6). The pipeline lesson improvement is in [PR #7](https://github.com/nocoderdecoder/shortaicourses/pull/7). Items 6–9 still need follow-up, measurement, content review, or distribution. A sitemap submission does not guarantee crawl, indexing, or ranking.

## Repeatable work

- **Weekly (15–30 minutes):** Record Search Console Web clicks, impressions, CTR, indexed URLs, and indexing reasons. Compare trailing 28 days with the previous 28 days. Export Queries and Pages with the same date range; group pages into homepage, catalog, courses, lessons, resources, and tools. Flag valuable www URLs that remain unindexed after the current sitemap has been processed for several weeks.
- **Release ledger:** Record each deployment date, canonical URL changed, Search Console report end date, live URL inspection result, and first later indexed inspection. Compare a full 28-day window after the 24 October release once available; earlier reports cannot evaluate its impact. Do not count an indexing request as an indexed page.
- **Monthly:** Choose one existing page with a meaningful query/page signal or strong user task. Improve the actual workflow and evidence on that page, link it from related content, and record the change. Review volatile product features, availability, and prices against official sources; update only when the content truly changed.
- **Quarterly:** Replay key tutorials with current tools, check internal links and sitemap URLs, review Core Web Vitals and mobile usability if data exists, and prune or combine pages that add little value. Avoid publishing many near-duplicate AI pages solely to target keywords.
- **Distribution, with your direction:** Share reviewed lessons and original examples through your own professional channels, partners, and relevant communities. Track referral traffic separately. Outreach or posting to other people/accounts needs explicit instructions.

## Interpretation rules

- Do not try to “fix” expected redirect exclusions by removing canonical redirects.
- “Discovered – currently not indexed” means found but not yet crawled; it is not proof that Google rejected page quality.
- Requesting indexing or submitting a sitemap is a hint to Google, not a promise of ranking.
- Evaluate changes over weeks, not hours, and keep a dated record so traffic claims have a real baseline.

References: [Google's crawlable-link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), and [request-crawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
