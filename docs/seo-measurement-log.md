# Organic search measurement log

Use this log to judge whether changes are helping. Search Console counts search impressions and clicks; it does not measure course starts, completions, or all website visits. Compare equal 28-day periods and record the dates of releases before attributing changes to them. Small samples can swing sharply.

## Baseline recorded 25 October 2026

| Source and period | Observation | Interpretation |
| --- | --- | --- |
| Search Console, 26 September–23 October 2026 | 31 impressions, 0 clicks, 0% CTR, average position 32.1 | The report predates the 24 October releases, so it cannot measure their impact. |
| Query: `free ai courses for sales professionals`, same period | 8 impressions | A directional signal for the sales course, not proof of search volume or demand. |
| Page: `/courses/ai-for-sales`, same period | 9 impressions | Best current course page to improve and monitor. |
| Page indexing overview, last updated 15 October 2026 | 30 indexed, 38 not indexed | Historical aggregate. The 24 redirect entries include alternate URLs; review canonical examples before treating exclusions as errors. |
| Submitted sitemap report, read 24 October 2026 | `www` sitemap: Success, 38 discovered pages; apex sitemap: Success, 39 discovered pages | Sitemap processing succeeded. A submitted URL is not guaranteed to be indexed. |

Individual URL inspections on 25 October showed these **canonical `www` URLs indexed**, with successful smartphone crawls on 24 October and Google-selected canonicals matching the inspected URLs:

- `/courses/ai-for-productivity/ai-for-meetings`
- `/resources`
- `/tools/gtm-strategy-lab`

The aggregate indexing report is older than those crawls. Do not use its 15 October exclusions to contradict newer per-URL inspections.

## Query-to-page map

| Search intent to monitor | Preferred page | Improvement to assess |
| --- | --- | --- |
| Free AI courses for sales professionals | `/courses/ai-for-sales` | Clear free/no-signup promise, distinct lesson outcomes, crawlable lesson links. |
| AI prospect research with sources | `/courses/ai-for-sales/ai-for-prospect-research` | Worked brief, source ledger, explicit unknowns. |
| AI sales outreach prompt | `/courses/ai-for-sales/ai-for-outreach-and-prospecting` | Checked fictional example, copyable prompt and review worksheet. |
| AI course options and practical resources | `/courses` and `/resources` | Clear course navigation and contextual links to the relevant lessons. |

These are editorial targets, not assertions that each exact phrase has measurable demand. The goal is to answer the learner's task clearly, not to repeat a phrase.

## Weekly check

Every Monday, capture the latest complete 28-day Search Console period and the same period immediately before it. Record clicks, impressions, CTR, and average position for the site, the sales course, and the two sales lessons. Review queries and country/device segments only when the sample is large enough to be useful. Inspect the canonical URL status for the sales course, both upgraded lessons, Resources, and the GTM Lab. Note any crawl or mobile usability problem with the exact affected URL. If a page has impressions but no clicks, first check whether its title and snippet match the task; if a page is not indexed, inspect the live canonical and crawl result before requesting indexing or changing code.

| Check date | Complete 28-day period | Site clicks / impressions / CTR | Sales course clicks / impressions | Priority URL state | Release or change since prior check | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| 25 Oct 2026 | 26 Sep–23 Oct 2026 | 0 / 31 / 0% | 0 / 9 | Meeting lesson, Resources, and GTM Lab indexed; sales pages to inspect next | Earlier technical and content releases fell after this reporting period | Baseline; no lift conclusion yet |
| 3 Nov 2026 | 5 Oct–1 Nov 2026 | 1 / 48 / 2.1% | 0 / 9 | Sales course, prospect lesson, outreach lesson, Resources, and GTM Lab individually indexed | PR #8 and PR #9 deployed 25 Oct, inside this 28-day period | First recorded search click was on the marketing course. Keep monitoring; sample is too small and mixed-period for a release-impact claim. |
| 18 Nov 2026 | 20 Oct–16 Nov 2026 | 1 / 193 / 0.5% | 0 / 15 | All five priority URLs individually indexed; the two sales lessons still show older September crawls | PR #8 and PR #9 deployed 25 Oct, inside this 28-day period | Impressions rose, but the one-click sample cannot establish traffic growth or release impact. Check the first full post-release 28-day period after 21 Nov. |
| 23 Nov 2026 | 25 Oct–21 Nov 2026 | 1 / 213 / 0.5% | 0 / 13 | All five priority URLs individually indexed; both upgraded sales lessons still show September crawls | PR #8 and PR #9 deployed on the first day of this period | One click remains too small for a traffic-gain claim. Continue monitoring relevant searches and lesson recrawls. |

For the **prior comparable 28 days, 7 September–4 October**, Search Console reported 0 clicks, 8 impressions, 0% CTR, and average position 49.9. For 5 October–1 November it reported average position 28.3. The site and its indexing were still changing across both windows, so these figures do not isolate the effect of the 25 October releases. In the latest period, the query `free ai courses for sales professionals` had 9 impressions and `ai short courses` had 5; neither showed a click in the visible query table. The sales course had 9 impressions and 0 clicks. The marketing course recorded the site's one click, on one impression. Query-level rows do not account for all site impressions.

Individual URL inspections on 3 November showed all five priority `www` pages indexed. The sales course was last crawled on 28 October with a successful smartphone fetch and matching selected canonical. The prospect and outreach lessons were last crawled on 23 September, before their 25 October rewrites; both had successful older fetches and Google selected the inspected URLs. The current live lesson pages load and declare their own `www` canonicals. The outreach lesson also passed Search Console's live URL test on 3 November. Resources and GTM Lab remained indexed with successful 24 October smartphone crawls and matching selected canonicals.

The aggregate page-indexing report was last updated on 22 October and listed 30 indexed and 40 not indexed URLs: 24 redirects, 14 discovered but not indexed, and 2 crawled but not indexed. Its two crawled-but-not-indexed examples are Resources and GTM Lab, yet both individual inspections now say indexed. Treat the older aggregate as lagging; do not file a new indexing fix or validate a fix based on those two examples alone. The GTM Lab still showed a Vercel security checkpoint in an automated Chrome session on 3 November. This does not establish whether ordinary visitors are blocked; investigate with a representative visitor session before changing firewall rules. No code change is justified by this week's evidence.

### 18 November check

For **20 October–16 November**, Search Console reported 1 click, 193 impressions, 0.5% CTR, and average position 26.7. The **previous comparable 28 days, 22 September–19 October**, had 0 clicks, 23 impressions, 0% CTR, and average position 30.2. These periods are small and the current one includes the 25 October releases; they do not isolate release impact. Search Console reported 86 impressions and 0 clicks for `gtmlab.ai`, 18 and 0 for `ai short course`, 13 and 0 for `ai short courses`, and 9 and 0 for `free ai courses for sales professionals`. The query table does not account for every site impression.

The GTM Lab page had 88 impressions and 0 clicks; the homepage had 37 and 0; the sales course had 15 and 0, versus 1 and 0 in the prior period; Resources had 4 and 0. The marketing course retained the site's one reported click. The outreach lesson had no impression in the current period and 1 in the prior period; the prospect lesson did not appear among the 27 page rows shown in the comparison. Page and query totals are separate dimensions, so the `gtmlab.ai` query cannot be assigned to the GTM Lab page from these tables alone.

Individual URL inspections on 18 November showed the sales course, prospect lesson, outreach lesson, Resources, and GTM Lab all indexed with Google selecting each inspected `www` URL as canonical. The sales course was last crawled on 10 November with a successful smartphone fetch and matching declared canonical. Both sales lessons still show successful 23 September crawls, before their rewrites; their crawl records show no declared canonical at that time. Resources and GTM Lab retain successful 24 October crawls with matching declared canonicals. The current live ChatGPT for Work course loaded with its own `www` canonical and crawlable lesson links.

The aggregate page-indexing report, last updated 12 November, listed 34 indexed and 30 not indexed URLs: 24 redirects and 6 discovered but not indexed. The six examples were About, the competitive-intelligence lesson, the morning-briefing lesson, the AI-tool-landscape lesson, the ChatGPT for Work course, and its advanced-workflows lesson. This is a smaller exclusion set than the 22 October report, though aggregate counts can change as Google's known URL set changes. The representative live ChatGPT for Work page showed no obvious crawl block. No code change is justified by this check alone.

### 23 November check

For **25 October–21 November**, Search Console reported 1 click, 213 impressions, 0.5% CTR, and average position 27.6. The **previous comparable 28 days, 27 September–24 October**, had 0 clicks, 31 impressions, 0% CTR, and average position 32.1. The one click appeared on the marketing course (2 impressions). The current window begins on the 25 October release date, so it includes that deployment day and cannot isolate the release effect. One click is too little evidence to claim a traffic gain.

The GTM Lab page had 92 impressions and 0 clicks; the homepage 44 and 0; the course catalog 25 and 0; the sales course 13 and 0 (versus 9 and 0 in the prior period); and Resources 6 and 0. The outreach lesson had 1 impression and 0 clicks; the prospect lesson was absent from the 28 visible page rows. The query table showed `gtmlab.ai` at 87 impressions and 0 clicks, `ai short course` at 21 and 0, `ai for business short course` at 16 and 0, `ai short courses` at 13 and 0, and `free ai sales training` at 6 and 0. Query rows omit some impressions, and separate page and query tables cannot establish which page received a given query.

Individual URL inspections on 23 November again showed the sales course, prospect lesson, outreach lesson, Resources, and GTM Lab indexed, with Google selecting each inspected `www` URL as canonical. The sales course's last successful smartphone crawl was 10 November; the two upgraded sales lessons still show successful 23 September crawls, before their 25 October rewrites. Resources and GTM Lab retain successful 24 October crawls. The live sales course loads with its own `www` canonical, clear title and description, and crawlable links to all four lessons. Both submitted sitemaps showed **Success**, last read 21 November, with 39 discovered pages each; occasional per-URL sitemap processing messages therefore do not establish an aggregate sitemap failure.

The page-indexing report, last updated 15 November, remains at 34 indexed and 30 not indexed URLs: 24 redirects and 6 discovered but not indexed. There is no newly observed technical or content defect to justify a code change this week. Keep the existing documentation PR open for review and recheck the older lesson crawls in the next measurement period.

## Release ledger

| Date | Change | Search Console evaluation window |
| --- | --- | --- |
| 24 Oct 2026 | Prior indexing and Resources work was live; individual crawls confirmed on meeting lesson, Resources, and GTM Lab | Too recent for the baseline period above |
| 25 Oct 2026 | Competitor-brief improvements in PR #8 deployed | First 28-day report starting on the deployment date ends 21 Nov 2026; it includes the deployment day |
| 25 Oct 2026 | Sales lesson, course, navigation, and mobile layout package in PR #9 deployed | First 28-day report starting on the deployment date ends 21 Nov 2026; it includes the deployment day |

Do not claim a traffic increase from an index count or a small change in impressions. A useful conclusion needs a dated release, a later complete measurement window, and a comparable prior window.
