# Current Feature

## Status

Completed

## Goals

Replace dummy collection data in the dashboard main area with real data from the Neon database using Prisma.

- Create `src/lib/db/collections.ts` with data fetching functions
- Fetch collections directly in server component
- Collection card border color derived from most-used content type in that collection
- Show small icons of all types in that collection
- Keep the current design
- Update collection stats display

## Notes

- Do not add items underneath the collections yet — that's a separate feature
- Reference: `context/screenshots/dashboard-ui-main.png`

## History

- **2026-03-20** — Initial Next.js 16 project setup with React 19, TypeScript, Tailwind CSS v4, and ESLint 9
- **2026-03-22** — Added mock data file and dashboard UI reference screenshots
- **2026-03-23** — Dashboard UI Phase 1 complete: ShadCN initialized, /dashboard route with top bar (search + buttons), sidebar and main placeholders, dark mode by default, Geist font via geist npm package
- **2026-03-23** — Dashboard UI Phase 2 complete: collapsible sidebar with types/collections nav, favorites, all collections, user avatar area, mobile sheet drawer, tooltips on collapsed icons
- **2026-03-23** — Dashboard UI Phase 3 complete: stats cards (items, collections, favorites), collections grid, pinned items and recent items sections
- **2026-03-24** — Neon PostgreSQL + Prisma 7 setup complete: prisma/schema.prisma with all models + NextAuth models, prisma.config.ts, src/lib/prisma.ts singleton with @prisma/adapter-neon, build passes
- **2026-03-24** — Initial migration applied (20260324105646_init), dev database seeded with 1 user, 7 system item types, 6 collections, 6 items, 15 tags; scripts/test.db.ts added for DB verification
- **2026-03-24** — Seed data rewritten per spec: demo@devstash.io user (bcrypt password), 7 system item types with Lucide icons, 5 collections (React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources), 18 items, 24 tags; seed now wipes DB before re-seeding for idempotency; scripts/test.db.ts updated with richer output grouped by collection
- **2026-03-24** — Dashboard collections wired to Neon DB: created src/lib/db/collections.ts with getCollections(), CollectionsGrid updated to use real data with type icons colored per DB color and card border color derived from most-used item type
