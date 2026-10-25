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

## Release ledger

| Date | Change | Search Console evaluation window |
| --- | --- | --- |
| 24 Oct 2026 | Prior indexing and Resources work was live; individual crawls confirmed on meeting lesson, Resources, and GTM Lab | Too recent for the baseline period above |
| Pending review | Competitor-brief improvements in PR #8 | Start after deployment, if approved |
| Pending review | Sales lesson, course, navigation, and mobile layout package | Start after deployment, if approved |

Do not claim a traffic increase from an index count or a small change in impressions. A useful conclusion needs a dated release, a later complete measurement window, and a comparable prior window.
