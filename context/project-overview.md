# 🏗️ DevStash — Project Overview

> **Store Smarter. Build Faster.**
>
> A centralized developer knowledge hub for code snippets, AI prompts, docs, commands, and more.

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Target Users](#target-users)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Data Model](#data-model)
- [Architecture](#architecture)
- [Auth Flow](#auth-flow)
- [AI Feature Flow](#ai-feature-flow)
- [Monetization](#monetization)
- [UI / UX Guidelines](#ui--ux-guidelines)
- [Development Workflow](#development-workflow)
- [Roadmap](#roadmap)
- [Status](#status)

---

## Problem Statement

Developers keep their essentials scattered across too many tools:

| Knowledge Type       | Where It Ends Up           |
| -------------------- | -------------------------- |
| Code snippets        | VS Code, Notion            |
| AI prompts           | Chat histories             |
| Context files        | Buried in project dirs     |
| Useful links         | Browser bookmarks          |
| Documentation        | Random folders             |
| Terminal commands     | `.txt` files, bash history |
| Project templates    | GitHub Gists               |

This causes **context switching**, **lost knowledge**, and **inconsistent workflows**.

**DevStash provides ONE searchable, AI-enhanced hub for all developer knowledge and resources.**

---

## Target Users

| Persona                      | Primary Needs                                    |
| ---------------------------- | ------------------------------------------------ |
| 🧑‍💻 Everyday Developer       | Quick access to snippets, commands, links        |
| 🤖 AI-First Developer        | Store and manage prompts, workflows, contexts    |
| 🎓 Content Creator / Educator | Save course notes, reusable code examples       |
| 🔧 Full-Stack Builder         | Patterns, boilerplates, API references          |

---

## Core Features

### A) Items & System Item Types

Every piece of knowledge is an **Item**. Items belong to one of the following built-in types:

| Type        | Icon | Description                          |
| ----------- | ---- | ------------------------------------ |
| `Snippet`   | `<>` | Code blocks with syntax highlighting |
| `Prompt`    | 💬   | AI prompts and templates             |
| `Note`      | 📝   | Markdown-formatted notes             |
| `Command`   | ⌨️   | Terminal / CLI commands               |
| `File`      | 📄   | Uploaded documents and templates     |
| `Image`     | 🖼️   | Screenshots, diagrams, assets        |
| `URL`       | 🔗   | Bookmarked links with metadata       |

> **Pro users** can create custom item types with custom icons and colors.

### B) Collections

Organize items into named collections. Mixed item types are allowed within a single collection.

**Examples:** `React Patterns` · `Context Files` · `Python Snippets` · `API References`

### C) Search

Full-text search across content, tags, titles, and types.

### D) Authentication

| Method           | Provider         |
| ---------------- | ---------------- |
| Email + Password | NextAuth (email) |
| OAuth            | GitHub           |

### E) Additional Features

- ⭐ Favorites and pinned items
- 🕐 Recently used items
- 📥 Import from files
- ✍️ Markdown editor for text items
- 📤 File uploads (images, docs, templates)
- 📦 Export as JSON or ZIP
- 🌙 Dark mode (default)

### F) AI Superpowers

| Feature              | Description                               |
| -------------------- | ----------------------------------------- |
| Auto-Tagging         | Suggest relevant tags from item content   |
| AI Summaries         | Generate concise summaries of long items  |
| Explain Code         | Plain-English explanations of code blocks |
| Prompt Optimization  | Improve and refine AI prompts             |

> AI powered by **OpenAI `gpt-5-nano`**

---

## Tech Stack

| Category       | Technology                         | Links                                                              |
| -------------- | ---------------------------------- | ------------------------------------------------------------------ |
| Framework      | **Next.js** (React 19, App Router) | [nextjs.org](https://nextjs.org)                                   |
| Language       | TypeScript                         | [typescriptlang.org](https://www.typescriptlang.org)               |
| Database       | Neon PostgreSQL + Prisma ORM       | [neon.tech](https://neon.tech) · [prisma.io](https://prisma.io)   |
| Caching        | Redis (optional)                   | [redis.io](https://redis.io)                                      |
| File Storage   | Cloudflare R2                      | [cloudflare.com/r2](https://www.cloudflare.com/developer-platform/r2/) |
| CSS / UI       | Tailwind CSS v4 + shadcn/ui       | [tailwindcss.com](https://tailwindcss.com) · [ui.shadcn.com](https://ui.shadcn.com) |
| Authentication | NextAuth v5 (email + GitHub)       | [authjs.dev](https://authjs.dev)                                   |
| AI             | OpenAI `gpt-5-nano`               | [platform.openai.com](https://platform.openai.com)                 |
| Deployment     | Vercel                             | [vercel.com](https://vercel.com)                                   |
| Monitoring     | Sentry (later)                     | [sentry.io](https://sentry.io)                                    |

---

## Data Model

> Prisma schema — this is a starting point and **will evolve** as features are built.

```prisma
// ─── USER ────────────────────────────────────────────────────────
model User {
  id                   String       @id @default(cuid())
  email                String       @unique
  password             String?
  isPro                Boolean      @default(false)
  stripeCustomerId     String?
  stripeSubscriptionId String?

  items                Item[]
  itemTypes            ItemType[]
  collections          Collection[]
  tags                 Tag[]

  createdAt            DateTime     @default(now())
  updatedAt            DateTime     @updatedAt
}

// ─── ITEM ────────────────────────────────────────────────────────
model Item {
  id           String      @id @default(cuid())
  title        String
  contentType  String      // "text" | "file"
  content      String?     // used for text-based types (snippet, prompt, note, etc.)
  fileUrl      String?     // R2 storage URL
  fileName     String?
  fileSize     Int?
  url          String?     // for URL-type items
  description  String?
  isFavorite   Boolean     @default(false)
  isPinned     Boolean     @default(false)
  language     String?     // programming language for syntax highlighting

  userId       String
  user         User        @relation(fields: [userId], references: [id])

  typeId       String
  type         ItemType    @relation(fields: [typeId], references: [id])

  collectionId String?
  collection   Collection? @relation(fields: [collectionId], references: [id])

  tags         ItemTag[]

  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}

// ─── ITEM TYPE ───────────────────────────────────────────────────
model ItemType {
  id       String   @id @default(cuid())
  name     String   // e.g. "Snippet", "Prompt", "Note"
  icon     String?  // emoji or icon identifier
  color    String?  // hex color for UI badges
  isSystem Boolean  @default(false) // true for built-in types

  userId   String?
  user     User?    @relation(fields: [userId], references: [id])

  items    Item[]
}

// ─── COLLECTION ──────────────────────────────────────────────────
model Collection {
  id          String   @id @default(cuid())
  name        String
  description String?
  isFavorite  Boolean  @default(false)

  userId      String
  user        User     @relation(fields: [userId], references: [id])

  items       Item[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// ─── TAG ─────────────────────────────────────────────────────────
model Tag {
  id     String    @id @default(cuid())
  name   String
  userId String
  user   User      @relation(fields: [userId], references: [id])

  items  ItemTag[]
}

// ─── ITEM ↔ TAG (many-to-many) ──────────────────────────────────
model ItemTag {
  itemId String
  tagId  String

  item   Item @relation(fields: [itemId], references: [id])
  tag    Tag  @relation(fields: [tagId], references: [id])

  @@id([itemId, tagId])
}
```

### Entity Relationship Diagram

```
┌──────────┐       ┌──────────────┐       ┌────────────┐
│   User   │──1:N──│     Item     │──N:1──│  ItemType  │
│          │       │              │       │            │
│  id      │       │  id          │       │  id        │
│  email   │       │  title       │       │  name      │
│  isPro   │       │  content     │       │  icon      │
│  stripe* │       │  contentType │       │  color     │
└──────────┘       │  isFavorite  │       │  isSystem  │
     │             │  isPinned    │       └────────────┘
     │             │  language    │
     │1:N          └──────────────┘
     │                   │  N:1 (optional)
┌──────────────┐         │
│  Collection  │─────────┘
│              │
│  id          │       ┌──────────┐
│  name        │       │   Tag    │
│  description │       │          │
│  isFavorite  │       │  id      │
└──────────────┘       │  name    │
                       └──────────┘
                            │
                       ┌──────────┐
                       │ ItemTag  │  (junction table)
                       │          │
                       │  itemId  │
                       │  tagId   │
                       └──────────┘
```

---

## Architecture

```
                    ┌─────────────────────┐
                    │      Client         │
                    │  (Next.js Frontend) │
                    └─────────┬───────────┘
                              │
                    ┌─────────▼───────────┐
                    │   Next.js API        │
                    │   (Route Handlers)   │
                    └──┬──────┬──────┬──┬──┘
                       │      │      │  │
          ┌────────────▼┐  ┌──▼───┐ ┌▼──▼────────┐
          │  Neon        │  │  R2  │ │   OpenAI   │
          │  PostgreSQL  │  │ File │ │ gpt-5-nano │
          │  (Prisma)    │  │ Store│ └────────────┘
          └──────────────┘  └──────┘
                       │
                 ┌─────▼─────┐
                 │   Redis   │
                 │  (Cache)  │
                 └───────────┘
```

---

## Auth Flow

```
User ──▶ Login Page ──▶ NextAuth v5
                            │
                   ┌────────┴────────┐
                   ▼                 ▼
             Email/Password     GitHub OAuth
                   │                 │
                   └────────┬────────┘
                            ▼
                     JWT Session
                            │
                            ▼
                    App Access Granted
```

---

## AI Feature Flow

```
Item Content ──▶ /api/ai/* ──▶ OpenAI (gpt-5-nano)
                                     │
                          ┌──────────┼──────────┐
                          ▼          ▼          ▼
                     Auto-Tags   Summary   Explain Code
                          │          │          │
                          └──────────┼──────────┘
                                     ▼
                              UI Update (client)
```

---

## Monetization

| Plan   | Price              | Item Limit  | Collections | Key Features                                         |
| ------ | ------------------ | ----------- | ----------- | ---------------------------------------------------- |
| 🆓 Free | $0                 | 50 items    | 3           | Basic search, image uploads, no AI                   |
| ⚡ Pro  | $8/mo or $72/yr    | Unlimited   | Unlimited   | AI features, file uploads, custom types, export      |

**Payment infrastructure:** Stripe for subscriptions with webhooks for plan syncing.

---

## UI / UX Guidelines

**Design Principles:**
- Dark mode first
- Minimal, developer-friendly UI
- Syntax highlighting for code (all snippet and command types)
- Inspired by **Notion** · **Linear** · **Raycast**

**Layout:**

```
┌──────────────────────────────────────────────────────┐
│  Sidebar (collapsible)   │   Main Workspace          │
│                          │                            │
│  🔍 Search               │   Grid / List view         │
│  📌 Pinned               │   of items                 │
│  ⭐ Favorites             │                            │
│  🕐 Recent               │                            │
│  ─────────────           │                            │
│  📁 Collections          │                            │
│     React Patterns       │                            │
│     Python Snippets      │                            │
│     Context Files        │                            │
│  ─────────────           │                            │
│  🏷️ Tags                 │                            │
│  ⚙️ Settings             │                            │
└──────────────────────────────────────────────────────┘
                           │
                    Full-screen item editor (overlay)
```

**Responsive behavior:**
- Mobile: drawer-based sidebar
- Touch-optimized icons and buttons

---

## Development Workflow

**Branching strategy:** One branch per lesson (course-oriented build).

```bash
git switch -c lesson-01-setup
git switch -c lesson-02-auth
git switch -c lesson-03-items-crud
# ...
```

**Tooling:**
- Cursor / Claude Code / ChatGPT for AI-assisted development
- Sentry for runtime monitoring and error tracking (added later)
- GitHub Actions for CI (optional)

---

## Roadmap

### Phase 1 — MVP

- [ ] Project setup (Next.js, Prisma, Neon, Tailwind, shadcn/ui)
- [ ] Authentication (NextAuth v5 — email + GitHub)
- [ ] Items CRUD (all system types)
- [ ] Collections CRUD
- [ ] Full-text search
- [ ] Basic tagging
- [ ] Free tier limits enforcement
- [ ] Dark mode UI

### Phase 2 — Pro

- [ ] Stripe billing integration (subscription + webhooks)
- [ ] AI features (auto-tagging, summaries, explain code, prompt optimization)
- [ ] Custom item types (Pro)
- [ ] File uploads to Cloudflare R2
- [ ] Export (JSON / ZIP)
- [ ] Upgrade flow and plan management

### Phase 3 — Future Enhancements

- [ ] Shared collections (public links)
- [ ] Team / Organization plans
- [ ] VS Code extension
- [ ] Browser extension (save from any page)
- [ ] Public API + CLI tool
- [ ] Redis caching layer

---

## Status

> 📋 **In Planning** — Ready for environment setup and UI scaffolding.

---

*DevStash — Store Smarter. Build Faster.* 🚀
