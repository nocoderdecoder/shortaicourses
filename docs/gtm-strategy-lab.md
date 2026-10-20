# AI GTM Strategy Lab

The reviewed Downloads patch is integrated at `/tools/gtm-strategy-lab` with a real server-side OpenAI Chat Completions endpoint at `/api/gtm-strategy`. Existing course content and routes are retained. No deployment or merge is authorized by this change.

## Manual configuration

1. After approving API spending, create a project-scoped OpenAI key with access to Chat Completions. Put `OPENAI_API_KEY=<your key>` in a local `.env.local` in the Next.js repository root. On an approved preview/production host, use its **server-side secret environment settings** instead. Never use a `NEXT_PUBLIC_` prefix or paste keys into source, browser code, issues, or PRs. `.env*` files are ignored.
2. Optionally set `OPENAI_MODEL=gpt-4.1-mini` (the default). Any replacement must support Chat Completions, strict JSON Schema, temperature, and `max_completion_tokens`.
3. For an approved production-mode preview, set `GTM_LAB_ENABLED=true` only after the usage safeguards below are in place. Unset it to disable generation. Local `npm run dev` needs only the key. Restart the server after changing environment settings. No key or service was provisioned during integration.
4. Review your OpenAI project's model permissions, rate limits, usage alerts, and budget settings. Alerts are not a guaranteed spending cap.
5. Before enabling public generation across replicas/serverless instances, configure a durable shared rate limiter or hosting gateway with a global request quota and an anti-bot/access gate. The built-in limiter allows **3 valid generation attempts per minute total and 1 in flight per process**, counts failures, ignores spoofable client-IP headers, and returns `Retry-After: 60`. It resets on restart and does not coordinate instances. There is no external limiter integration or new paid dependency in this PR; keep generation disabled until the public deployment gate is implemented and reviewed.
6. Use a Node.js Next.js host (not static export), with a function/request timeout above the 35-second provider timeout. Verify browser Origin matches the application URL through your proxy. Cross-origin requests are rejected when an Origin header is supplied; this is not authentication.
7. With explicit API-spend approval, run one live smoke test, verify the generated strategy, and review provider usage. Live billing, account/model permissions, and real response quality were not tested by this integration.

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
