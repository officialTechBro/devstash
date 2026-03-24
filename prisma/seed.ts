import path from "path";
import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

// Load .env (Prisma 7 no longer auto-loads)
try {
  process.loadEnvFile(path.resolve(process.cwd(), ".env"));
} catch {
  // already loaded or not found
}

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Clean slate ─────────────────────────────────────────────
  await prisma.itemTag.deleteMany();
  await prisma.item.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.itemType.deleteMany();
  await prisma.user.deleteMany();
  console.log("✔ Cleared existing data");

  // ─── User ────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("12345678", 12);
  const user = await prisma.user.create({
    data: {
      email: "demo@devstash.io",
      name: "Demo User",
      password: passwordHash,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`✔ User: ${user.email}`);

  // ─── System item types ───────────────────────────────────────
  const itemTypeData = [
    { name: "snippet", icon: "Code",       color: "#3b82f6" },
    { name: "prompt",  icon: "Sparkles",   color: "#8b5cf6" },
    { name: "command", icon: "Terminal",   color: "#f97316" },
    { name: "note",    icon: "StickyNote", color: "#fde047" },
    { name: "file",    icon: "File",       color: "#6b7280" },
    { name: "image",   icon: "Image",      color: "#ec4899" },
    { name: "link",    icon: "Link",       color: "#10b981" },
  ];

  const itemTypes: Record<string, string> = {};
  for (const t of itemTypeData) {
    const type = await prisma.itemType.create({
      data: {
        id: `system_${t.name}`,
        name: t.name,
        icon: t.icon,
        color: t.color,
        isSystem: true,
      },
    });
    itemTypes[t.name] = type.id;
  }
  console.log(`✔ Item types: ${Object.keys(itemTypes).join(", ")}`);

  // ─── Collections ─────────────────────────────────────────────
  const collectionData = [
    { id: "col_react",    name: "React Patterns",    description: "Reusable React patterns and hooks",          isFavorite: true  },
    { id: "col_ai",       name: "AI Workflows",       description: "AI prompts and workflow automations",        isFavorite: true  },
    { id: "col_devops",   name: "DevOps",             description: "Infrastructure and deployment resources",    isFavorite: false },
    { id: "col_terminal", name: "Terminal Commands",  description: "Useful shell commands for everyday development", isFavorite: false },
    { id: "col_design",   name: "Design Resources",   description: "UI/UX resources and references",            isFavorite: false },
  ];

  for (const c of collectionData) {
    await prisma.collection.create({ data: { ...c, userId: user.id } });
  }
  console.log(`✔ Collections: ${collectionData.length}`);

  // ─── Tags ─────────────────────────────────────────────────────
  const tagNames = [
    "react", "hooks", "typescript", "patterns", "context",
    "ai", "prompts", "code-review", "documentation", "refactoring",
    "docker", "ci-cd", "devops", "deployment",
    "git", "shell", "terminal", "process", "npm",
    "css", "tailwind", "ui", "components", "icons",
  ];

  const tags: Record<string, string> = {};
  for (const name of tagNames) {
    const tag = await prisma.tag.create({ data: { name, userId: user.id } });
    tags[name] = tag.id;
  }
  console.log(`✔ Tags: ${tagNames.length}`);

  // ─── Items ────────────────────────────────────────────────────
  const itemsData = [
    // ── React Patterns ──────────────────────────────────────────
    {
      id: "item_react_1",
      title: "useDebounce & useLocalStorage Hooks",
      description: "Custom utility hooks for debouncing values and persisting state to localStorage",
      contentType: "text",
      content: `import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}`,
      language: "typescript",
      typeId: itemTypes["snippet"],
      collectionId: "col_react",
      isFavorite: true,
      isPinned: true,
      tags: ["react", "hooks", "typescript"],
    },
    {
      id: "item_react_2",
      title: "Context Provider & Compound Components",
      description: "Patterns for Context providers and compound component architecture",
      contentType: "text",
      content: `import { createContext, useContext, useState, ReactNode } from 'react'

// ── Context Provider Pattern ──────────────────────────────────
interface ThemeContextValue {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

// ── Compound Component Pattern ────────────────────────────────
interface CardProps { children: ReactNode }

function Card({ children }: CardProps) {
  return <div className="rounded-lg border p-4">{children}</div>
}
Card.Header = ({ children }: CardProps) => <div className="font-semibold mb-2">{children}</div>
Card.Body = ({ children }: CardProps) => <div className="text-sm">{children}</div>

export { Card }`,
      language: "typescript",
      typeId: itemTypes["snippet"],
      collectionId: "col_react",
      isFavorite: false,
      isPinned: false,
      tags: ["react", "patterns", "context", "typescript"],
    },
    {
      id: "item_react_3",
      title: "React Utility Functions",
      description: "Common utility functions for React apps: classNames, formatDate, truncate",
      contentType: "text",
      content: `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date for display
export function formatDate(date: Date | string, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

// Truncate long strings
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

// Group array by key
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const group = String(item[key])
    return { ...acc, [group]: [...(acc[group] ?? []), item] }
  }, {} as Record<string, T[]>)
}`,
      language: "typescript",
      typeId: itemTypes["snippet"],
      collectionId: "col_react",
      isFavorite: false,
      isPinned: false,
      tags: ["react", "typescript", "hooks"],
    },

    // ── AI Workflows ─────────────────────────────────────────────
    {
      id: "item_ai_1",
      title: "Code Review Prompt",
      description: "Thorough AI code review covering bugs, performance, and security",
      contentType: "text",
      content: `Review the following code and provide structured feedback covering:

1. **Bugs & Edge Cases** — Logic errors, unhandled exceptions, off-by-one errors
2. **Performance** — Unnecessary re-renders, N+1 queries, inefficient algorithms
3. **Security** — Input validation, injection risks, exposed secrets, auth gaps
4. **Readability** — Naming clarity, complexity, missing abstractions
5. **Best Practices** — Patterns specific to the language/framework in use

Be concise. Prioritize critical issues first. Suggest concrete fixes with short code examples where helpful.`,
      language: null,
      typeId: itemTypes["prompt"],
      collectionId: "col_ai",
      isFavorite: true,
      isPinned: true,
      tags: ["ai", "prompts", "code-review"],
    },
    {
      id: "item_ai_2",
      title: "Documentation Generation Prompt",
      description: "Generate comprehensive docs for functions, components, or modules",
      contentType: "text",
      content: `Generate documentation for the following code. Include:

- **Summary** — One sentence describing what it does
- **Parameters / Props** — Name, type, description, and whether required
- **Return value** — Type and description
- **Usage example** — A minimal, realistic code snippet
- **Notes** — Edge cases, caveats, or important constraints

Output in Markdown. Keep it developer-friendly and scannable.`,
      language: null,
      typeId: itemTypes["prompt"],
      collectionId: "col_ai",
      isFavorite: false,
      isPinned: false,
      tags: ["ai", "prompts", "documentation"],
    },
    {
      id: "item_ai_3",
      title: "Refactoring Assistance Prompt",
      description: "AI-guided refactoring for cleaner, more maintainable code",
      contentType: "text",
      content: `Refactor the following code with these goals:

1. **Reduce complexity** — Break down large functions, simplify conditionals
2. **Improve naming** — Variables, functions, and types should be self-documenting
3. **Remove duplication** — Extract shared logic into reusable helpers
4. **Apply patterns** — Suggest relevant design patterns if applicable
5. **Preserve behaviour** — Do not change what the code does, only how it does it

Show the refactored version with a brief explanation of each change made.`,
      language: null,
      typeId: itemTypes["prompt"],
      collectionId: "col_ai",
      isFavorite: false,
      isPinned: false,
      tags: ["ai", "prompts", "refactoring"],
    },

    // ── DevOps ───────────────────────────────────────────────────
    {
      id: "item_devops_1",
      title: "Docker + GitHub Actions CI/CD",
      description: "Multi-stage Dockerfile and GitHub Actions workflow for Node.js apps",
      contentType: "text",
      content: `# Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]

---
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - run: npm run test -- --passWithNoTests`,
      language: "dockerfile",
      typeId: itemTypes["snippet"],
      collectionId: "col_devops",
      isFavorite: false,
      isPinned: false,
      tags: ["docker", "ci-cd", "devops"],
    },
    {
      id: "item_devops_2",
      title: "Deploy to Production",
      description: "Zero-downtime deployment script with health check",
      contentType: "text",
      content: `docker pull ghcr.io/$IMAGE_NAME:latest && \
docker stop app || true && \
docker rm app || true && \
docker run -d --name app --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env.production \
  ghcr.io/$IMAGE_NAME:latest && \
docker ps | grep app`,
      language: "bash",
      typeId: itemTypes["command"],
      collectionId: "col_devops",
      isFavorite: false,
      isPinned: false,
      tags: ["docker", "deployment", "devops"],
    },
    {
      id: "item_devops_3",
      title: "Docker Documentation",
      description: "Official Docker documentation — reference for Dockerfile syntax and CLI",
      contentType: "text",
      content: null,
      url: "https://docs.docker.com",
      language: null,
      typeId: itemTypes["link"],
      collectionId: "col_devops",
      isFavorite: false,
      isPinned: false,
      tags: ["docker", "devops"],
    },
    {
      id: "item_devops_4",
      title: "GitHub Actions Documentation",
      description: "Official GitHub Actions docs — workflows, triggers, and marketplace actions",
      contentType: "text",
      content: null,
      url: "https://docs.github.com/en/actions",
      language: null,
      typeId: itemTypes["link"],
      collectionId: "col_devops",
      isFavorite: false,
      isPinned: false,
      tags: ["ci-cd", "devops"],
    },

    // ── Terminal Commands ─────────────────────────────────────────
    {
      id: "item_term_1",
      title: "Git Essentials",
      description: "Most-used git commands for daily workflow",
      contentType: "text",
      content: `# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Squash last N commits
git rebase -i HEAD~N

# Stash with a description
git stash push -m "WIP: feature description"

# Show commits not yet pushed
git log @{u}..

# Find which commit introduced a bug
git bisect start
git bisect bad
git bisect good <commit-hash>`,
      language: "bash",
      typeId: itemTypes["command"],
      collectionId: "col_terminal",
      isFavorite: true,
      isPinned: false,
      tags: ["git", "shell", "terminal"],
    },
    {
      id: "item_term_2",
      title: "Docker Commands",
      description: "Everyday Docker commands for container management",
      contentType: "text",
      content: `# Remove all stopped containers
docker container prune -f

# Remove unused images, containers, networks
docker system prune -af

# Follow logs for a container
docker logs -f <container>

# Exec into running container
docker exec -it <container> sh

# List containers with size
docker ps -as`,
      language: "bash",
      typeId: itemTypes["command"],
      collectionId: "col_terminal",
      isFavorite: false,
      isPinned: false,
      tags: ["docker", "shell", "terminal"],
    },
    {
      id: "item_term_3",
      title: "Process Management",
      description: "Find and kill processes by port or name",
      contentType: "text",
      content: `# Find process using a port (macOS/Linux)
lsof -i :3000

# Kill process on a port
kill -9 $(lsof -t -i :3000)

# Find process by name
ps aux | grep node

# Kill all node processes
pkill -f node

# Show CPU/memory usage (interactive)
htop`,
      language: "bash",
      typeId: itemTypes["command"],
      collectionId: "col_terminal",
      isFavorite: false,
      isPinned: false,
      tags: ["process", "shell", "terminal"],
    },
    {
      id: "item_term_4",
      title: "Package Manager Utilities",
      description: "npm, pnpm, and npx shortcuts for managing dependencies",
      contentType: "text",
      content: `# List outdated packages
npm outdated

# Update all packages to latest (respects semver)
npm update

# Check for security vulnerabilities
npm audit --fix

# Clean install (delete node_modules first)
rm -rf node_modules package-lock.json && npm install

# Run a one-off package without installing
npx <package-name>

# List globally installed packages
npm list -g --depth=0`,
      language: "bash",
      typeId: itemTypes["command"],
      collectionId: "col_terminal",
      isFavorite: false,
      isPinned: false,
      tags: ["npm", "shell", "terminal"],
    },

    // ── Design Resources ──────────────────────────────────────────
    {
      id: "item_design_1",
      title: "Tailwind CSS Documentation",
      description: "Official Tailwind CSS docs — utility classes, configuration, and plugins",
      contentType: "text",
      content: null,
      url: "https://tailwindcss.com/docs",
      language: null,
      typeId: itemTypes["link"],
      collectionId: "col_design",
      isFavorite: true,
      isPinned: false,
      tags: ["css", "tailwind", "ui"],
    },
    {
      id: "item_design_2",
      title: "shadcn/ui Components",
      description: "Beautifully designed components built with Radix UI and Tailwind CSS",
      contentType: "text",
      content: null,
      url: "https://ui.shadcn.com",
      language: null,
      typeId: itemTypes["link"],
      collectionId: "col_design",
      isFavorite: true,
      isPinned: false,
      tags: ["ui", "components", "tailwind"],
    },
    {
      id: "item_design_3",
      title: "Radix UI Primitives",
      description: "Unstyled, accessible component primitives for building design systems",
      contentType: "text",
      content: null,
      url: "https://www.radix-ui.com/primitives",
      language: null,
      typeId: itemTypes["link"],
      collectionId: "col_design",
      isFavorite: false,
      isPinned: false,
      tags: ["ui", "components"],
    },
    {
      id: "item_design_4",
      title: "Lucide Icons",
      description: "Beautiful & consistent icon library — open source, React-compatible",
      contentType: "text",
      content: null,
      url: "https://lucide.dev/icons",
      language: null,
      typeId: itemTypes["link"],
      collectionId: "col_design",
      isFavorite: false,
      isPinned: false,
      tags: ["icons", "ui"],
    },
  ];

  for (const { tags: itemTags, ...item } of itemsData) {
    await prisma.item.create({
      data: {
        ...item,
        userId: user.id,
        tags: {
          create: itemTags.map((name) => ({ tagId: tags[name] })),
        },
      },
    });
  }
  console.log(`✔ Items: ${itemsData.length}`);

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
