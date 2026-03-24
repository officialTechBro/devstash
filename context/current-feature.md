# Current Feature

## Neon PostgreSQL + Prisma Setup

## Status

Complete — build passes, migration pending (`npx prisma migrate dev --name init` once DATABASE_URL is set)

## Goals

- Set up Prisma 7 ORM with Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Use `prisma migrate dev` for all schema changes (never `db push`)
- Configure separate development and production database branches

## Notes

- Use Prisma 7 — has breaking changes from v6, read the upgrade guide before implementing
- DATABASE_URL points to the development branch; production branch used separately
- Always create migrations, never push schema directly unless specified

## History

- **2026-03-20** — Initial Next.js 16 project setup with React 19, TypeScript, Tailwind CSS v4, and ESLint 9
- **2026-03-22** — Added mock data file and dashboard UI reference screenshots
- **2026-03-23** — Dashboard UI Phase 1 complete: ShadCN initialized, /dashboard route with top bar (search + buttons), sidebar and main placeholders, dark mode by default, Geist font via geist npm package
- **2026-03-23** — Dashboard UI Phase 2 complete: collapsible sidebar with types/collections nav, favorites, all collections, user avatar area, mobile sheet drawer, tooltips on collapsed icons
- **2026-03-23** — Dashboard UI Phase 3 complete: stats cards (items, collections, favorites), collections grid, pinned items and recent items sections
- **2026-03-24** — Neon PostgreSQL + Prisma 7 setup complete: prisma/schema.prisma with all models + NextAuth models, prisma.config.ts, src/lib/prisma.ts singleton with @prisma/adapter-neon, build passes
