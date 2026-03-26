# Current Feature

## Status

Completed

## Goals

## Notes

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
- **2026-03-24** — Item detail drawer implemented: clicking any item row opens a right-side Sheet drawer showing title, type/language badges, action buttons, description, content block, tags, collection, and created/updated dates
- **2026-03-26** — Seed data finalized per spec: demo@devstash.io user, 7 system item types, 5 collections, 18 items (snippets, prompts, commands, links), 24 tags; seed is idempotent (wipes before re-seeding)
- **2026-03-26** — Dashboard items wired to Neon DB: created src/lib/db/items.ts with getPinnedItems(), getRecentItems(), getItemStats(); ItemRow updated to use DB type icon/color directly; dashboard page fetches all data from DB, mock data fully replaced
- **2026-03-26** — Stats & sidebar wired to Neon DB: added getItemTypes() with custom sort order; layout split into server component + DashboardShell client component; SidebarContent now accepts real item types and collections as props; colored circles for non-favorite collections; "View all collections" link added; mock data fully removed
