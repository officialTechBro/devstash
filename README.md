# 🗂️ DevStash

> A developer knowledge hub for snippets, commands, prompts, notes, files, images, links, and custom item types — all in one searchable, organized workspace.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![NeonDB](https://img.shields.io/badge/Neon-Serverless_Postgres-00E699?logo=postgresql)](https://neon.tech/)

---

## The Problem

Developers keep their essentials scattered across VS Code snippets, browser bookmarks, chat histories, bash history, Notion pages, and random folders. There's no single place to save, search, and organize everything you need day-to-day.

## The Solution

**DevStash** brings everything into one fast, searchable hub — save code snippets, terminal commands, AI prompts, notes, links, and more with tagging, categorization, and instant search.

---

## Features

- **📝 Multi-Type Items** — Save snippets, commands, prompts, notes, files, images, links, and custom types
- **🔍 Instant Search** — Find anything across all your stashed items in milliseconds
- **🏷️ Tags & Categories** — Organize items with flexible tagging and categorization
- **🔐 Secure Auth** — bcrypt-hashed passwords with session-based authentication
- **⚡ Serverless Database** — NeonDB (serverless PostgreSQL) for instant cold starts and global scale
- **🎨 Modern UI** — Shadcn/ui components with Tailwind CSS v4 and smooth animations

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Frontend** | React 19, React Compiler, Tailwind CSS v4 |
| **Language** | TypeScript 5 |
| **Database** | NeonDB (Serverless PostgreSQL) via Prisma 7 |
| **Auth** | bcryptjs for password hashing |
| **UI Components** | Shadcn/ui, Lucide Icons, Base UI |
| **Styling** | Tailwind CSS v4 + tw-animate-css |
| **Font** | Geist Sans & Geist Mono |

---

## Getting Started

### Prerequisites

- Node.js 18+
- NeonDB account (or any PostgreSQL database)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/officialTechBro/devstash.git
cd devstash

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your DATABASE_URL (Neon connection string)

# Run database migrations
npx prisma migrate dev

# Seed item types (snippet, prompt, command, note, file, image, link)
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
src/
├── app/           # Next.js App Router pages, layouts & API routes
├── components/    # Reusable UI components
├── lib/           # Utilities, helpers & configurations
prisma/
├── schema.prisma  # Database schema & models
├── seed.ts        # Seed system item types
context/           # Project documentation & standards
scripts/           # Utility scripts
```

---

## Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint (flat config) |

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## Contact

**Taiwo Oladosu** — Full Stack Engineer

- Portfolio: [oladosutaiwo.vercel.app](https://oladosutaiwo.vercel.app/)
- LinkedIn: [linkedin.com/in/oladosu-taiwo](https://www.linkedin.com/in/oladosu-taiwo)
- GitHub: [@officialTechBro](https://github.com/officialTechBro)
- Email: taiwooladosu1@gmail.com

---

## License

This project is open source and available under the [MIT License](LICENSE).
