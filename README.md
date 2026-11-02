# willfeldman.com

Will Feldman's personal site: experience, projects, photos and an "Ask about Will" chat. Built with Next.js on Vercel and styled with the Graphite design system.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build and type check
```

The Ask about Will panel needs AI Gateway credentials. On Vercel they come from the project's OIDC token automatically. Locally, run `vercel env pull` to get one, or start the dev server with `ASK_ASSUME_AVAILABLE=1` to work on the panel's UI (typed questions will then fall back to the card pile).

## How it's put together

- `content/site.ts` holds every fact on the site: roles and dates, projects, education, organizations, awards and photos. `content/pages.ts` holds the Contact and Privacy copy.
- `app/` has one folder per page. Pages are pre-rendered HTML; the home page re-checks AI credit every few minutes.
- `app/styles/` has the Graphite tokens (light and dark, following the visitor's system setting), Graphite's component CSS, the motion rules and the site's own layout styles.
- `lib/markdown.ts` writes a Markdown copy of every page from the same content. Agents get it by sending `Accept: text/markdown` (handled in `proxy.ts`) or by adding `.md` to a path. `/llms.txt` and `/llms-full.txt` come from the same place.
- `app/api/ask/route.ts` answers typed questions with `anthropic/claude-haiku-5.5` through the Vercel AI Gateway, falling back to Gemini 2.5 Flash-Lite, GPT-5 nano and DeepSeek V4 Flash (the gateway's free credits don't cover Claude), using the site's Markdown as its only source. The three suggested questions are answered in the browser from `lib/ask-answers.ts` and cost nothing.

## Ask about Will limits

`lib/ask-budget.ts` turns the panel off (the hero shows the card pile instead) when any of these is true:

| Limit | Default | Environment variable |
| --- | --- | --- |
| Gateway balance at or below | $0.05 | `ASK_MIN_BALANCE_USD` |
| Spent since the first check of the UTC day | $0.25 | `ASK_DAILY_BUDGET_USD` |
| Questions per visitor per 10 minutes, per server instance | 8 | — |

Before any of that, `app/api/ask/route.ts` turns away requests that don't come from the site's own pages (`Origin` and `Sec-Fetch-Site`) and requests [Vercel BotID](https://vercel.com/docs/botid) flags as bots. BotID's browser check is set up in `instrumentation-client.ts`.

Set `ASK_DISABLED=1` to turn the panel off, or `ASK_MODEL` to use a different gateway model.
