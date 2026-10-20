# AI GTM Strategy Lab

The reviewed Downloads patch is integrated at `/tools/gtm-strategy-lab` with a real server-side OpenAI Chat Completions endpoint at `/api/gtm-strategy`. Existing course content and routes are retained. Production publication and OpenAI API usage were subsequently approved by the owner in chat.

## Manual configuration

1. After approving API spending, create a project-scoped OpenAI key with access to Chat Completions. Put `OPENAI_API_KEY=<your key>` in a local `.env.local` in the Next.js repository root. On an approved preview/production host, use its **server-side secret environment settings** instead. Never use a `NEXT_PUBLIC_` prefix or paste keys into source, browser code, issues, or PRs. `.env*` files are ignored.
2. Optionally set `OPENAI_MODEL=gpt-4.1-mini` (the default). Any replacement must support Chat Completions, strict JSON Schema, temperature, and `max_completion_tokens`.
3. For an approved production-mode preview, set `GTM_LAB_ENABLED=true` only after the usage safeguards below are in place. Unset it to disable generation. Local `npm run dev` needs only the key. Restart the server after changing environment settings. The owner saved the OpenAI key directly in Vercel; its value was not retrieved during enablement.
4. Review your OpenAI project's model permissions, rate limits, usage alerts, and budget settings. Alerts are not a guaranteed spending cap.
5. Production now requires the shared Vercel Firewall SDK quota `gtm-generation` and a sensitive `RATE_LIMIT_SECRET` (generated server-side and saved in Vercel, never committed). The published fixed-window rule allows **10 valid generation attempts per 600 seconds shared across instances per region**. The function's outbound quota checks run from the `iad1` region, configured in `vercel.json`. Vercel counters are regional, so this is not an absolute account-wide spending ceiling. Quota failures, missing rules, and a 3-second check timeout **fail closed** before OpenAI. The original 3 attempts/minute and 1 active generation/process limits remain as additional safeguards. Failures consume quota, with no automatic retries.
   A second free custom firewall rule challenges visitors to the Lab page and its API; standard browsers verify before submission. Other pages and courses are not challenged. The account was confirmed as Hobby with an included rate-limit rule; no Vercel paid service or subscription was enabled. Quota configuration lives in Vercel and is not automatically recreated by cloning this repository. Never upgrade the hosting plan or change quota pricing without approval.
6. Use a Node.js Next.js host (not static export), with a function/request timeout above the 35-second provider timeout. Verify browser Origin matches the application URL through your proxy. Cross-origin requests are rejected when an Origin header is supplied; this is not authentication.
7. With the owner's explicit API-spend approval, run a live browser smoke test and inspect the report. Review usage in the OpenAI project. Keep `GTM_LAB_ENABLED=false` as the operational kill switch if unexpected usage occurs; changing environment values requires redeployment.

## Data and failure behavior

Inputs go to OpenAI; avoid confidential information. The application does not persist submissions or reports. `store: false` disables completion storage for this call; it is not a promise of zero provider retention. Responses use `Cache-Control: no-store`. Logs include status/error class only, never inputs, API keys, or provider response bodies.

Request bodies are capped at 32,000 actual UTF-8 bytes (including chunked bodies); exactly five nonblank strings are required, each at most 1,200 characters. Output uses strict JSON Schema plus runtime validation of counts, field types, priorities and ordered weeks. Refusal, truncation, malformed output, timeout, network failures and upstream errors return a generic recoverable error. No automatic retries that could multiply charges. The client times out after 45 seconds and prevents repeat submissions while busy.

## Verification

```sh
npm ci --ignore-scripts
npm run test:gtm
npm run lint
npm run typecheck
npm run build
npm run start
```

Backend tests mock fetch; they never contact OpenAI. Browser QA uses mocked reports for successful, loading, and failure paths. The report is AI-generated hypotheses, not verified market research. Review safety/compliance claims independently.

Lint cleanup replaces existing internal anchors with Next Link and escapes JSX punctuation without changing course copy. The shared navigation wraps on small screens and now links to the Lab.

Build uses the supported Next.js webpack builder: Turbopack repeatedly failed to bind its PostCSS worker port in this execution environment. The webpack production build avoids that environment-specific failure. The existing Open Graph image now uses the Node.js runtime: its Edge bundle exceeded the existing Vercel plan limit (1.08 MB versus 1 MB), blocking deployment. Node.js retains the image without a plan upgrade.

## Quota operations

In Vercel → shortaicourses → Firewall, retain the `GTM shared generation quota` rule with Rate Limit API ID `gtm-generation`, fixed window 600 seconds, 10 allowed requests and a 429 action. The SDK overrides the dashboard IP key with the constant `gtm-lab-shared-v1`, salted with the sensitive `RATE_LIMIT_SECRET`. Keep that secret stable across redeployments; rotating it changes the counter key. The `Verify GTM Lab visitors` challenge rule is scoped to `/tools/gtm-strategy-lab` or `/api/gtm-strategy`. Missing/broken quota configuration returns a generic 503 without contacting OpenAI. Do not use quota-consuming live provider calls to test rate limiting; mocked tests cover that behavior.
