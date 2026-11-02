# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` - Install dependencies
- `npm run dev` - Development server (port 3000)
- `npm run build` - Production build, including the TypeScript check
- `npm run lint` - Type check only
- `npm run pretty` - Format code with Prettier

## Architecture

A Next.js (App Router) site deployed on Vercel, styled with the Graphite design system. See README.md for the full layout.

- **Content**: every fact lives in `content/site.ts` (experience, projects, education, organizations, awards, photos) and `content/pages.ts` (Contact and Privacy copy). Change facts there, never in page files, so the HTML, the Markdown copies, llms.txt and the Ask about Will prompt stay in sync.
- **Pages**: `app/<route>/page.tsx`, pre-rendered. Work detail pages come from `app/work/[slug]`. Only Classmate has its own project page.
- **Styles**: `app/styles/tokens.css` (Graphite tokens, light and dark), `graphite.css` (Graphite components, `.gr-*`), `motion.css` (entrances, loops, button states, all with reduced-motion fallbacks) and `site.css` (site layout). Use tokens, not raw colors.
- **Agent readability**: `lib/markdown.ts` renders each page as Markdown. `proxy.ts` serves it for `Accept: text/markdown`, `app/md` serves `<path>.md`, and `app/llms.txt` and `app/llms-full.txt` build from it. Every page has one H1, a canonical URL and JSON-LD (`lib/structured-data.tsx`).
- **Ask about Will**: `components/AskPanel.tsx` (UI), `lib/ask-answers.ts` (prewritten answers to the suggested questions), `app/api/ask/route.ts` (model call through the AI Gateway) and `lib/ask-budget.ts` (credit floor, daily cap and rate limit). When Ask is unavailable the hero shows `components/CardStack.tsx`.

## Static assets

Images live in `public/src/` (logos, screenshots, `ig/` photos) and `public/img/projects/` (project card images). Reference them with root-relative paths.
