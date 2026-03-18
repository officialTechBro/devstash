# DevStash

A developer knowledge hub fir snippets, commands, prompts, notes, files, images, links and custom types

## Context Files

Read the following to get the full context of the project

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- `npm run dev` — Start dev server (Next.js with Turbopack)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint (flat config, `eslint.config.mjs`)

## Tech Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **React Compiler** enabled (`reactCompiler: true` in `next.config.ts`)
- **Tailwind CSS v4** via PostCSS (imported as `@import "tailwindcss"` in `globals.css`)
- **ESLint 9** flat config with `core-web-vitals` and `typescript` presets from `eslint-config-next`

## Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json`). Use `@/` imports instead of relative paths.

## Project Structure

All application code lives under `src/app/` using Next.js App Router conventions. The root layout (`layout.tsx`) loads Geist and Geist Mono fonts.
