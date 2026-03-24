import path from "path";
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

  // ─── Dev user ───────────────────────────────────────────────
  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: {
      email: "demo@devstash.io",
      name: "John Doe",
      isPro: false,
    },
  });
  console.log(`✔ User: ${user.email}`);

  // ─── System item types ───────────────────────────────────────
  const itemTypeData = [
    { name: "Snippet", icon: "code-2",    color: "#3b82f6" },
    { name: "Prompt",  icon: "sparkles",  color: "#a855f7" },
    { name: "Command", icon: "terminal",  color: "#f59e0b" },
    { name: "Note",    icon: "file-text", color: "#22c55e" },
    { name: "File",    icon: "file",      color: "#64748b" },
    { name: "Image",   icon: "image",     color: "#ec4899" },
    { name: "URL",     icon: "link",      color: "#06b6d4" },
  ];

  const itemTypes: Record<string, string> = {};
  for (const t of itemTypeData) {
    const type = await prisma.itemType.upsert({
      where: { id: `system_${t.name.toLowerCase()}` },
      update: { icon: t.icon, color: t.color },
      create: {
        id: `system_${t.name.toLowerCase()}`,
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
    { id: "col_react",     name: "React Patterns",   description: "Common React patterns and hooks",        isFavorite: true  },
    { id: "col_python",    name: "Python Snippets",   description: "Useful Python code snippets",            isFavorite: false },
    { id: "col_context",   name: "Context Files",     description: "AI context files for projects",         isFavorite: true  },
    { id: "col_interview", name: "Interview Prep",    description: "Technical interview preparation",       isFavorite: false },
    { id: "col_git",       name: "Git Commands",      description: "Frequently used git commands",          isFavorite: true  },
    { id: "col_ai",        name: "AI Prompts",        description: "Curated AI prompts for coding",         isFavorite: false },
  ];

  for (const c of collectionData) {
    await prisma.collection.upsert({
      where: { id: c.id },
      update: { name: c.name, description: c.description, isFavorite: c.isFavorite },
      create: { id: c.id, userId: user.id, ...c },
    });
  }
  console.log(`✔ Collections: ${collectionData.length}`);

  // ─── Tags ─────────────────────────────────────────────────────
  const tagNames = [
    "react", "auth", "hooks", "api", "error-handling", "fetch",
    "ai", "code-review", "chatgpt", "git", "rebase",
    "architecture", "docs", "python", "list-comprehension",
  ];

  const tags: Record<string, string> = {};
  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { userId_name: { userId: user.id, name } },
      update: {},
      create: { name, userId: user.id },
    });
    tags[name] = tag.id;
  }
  console.log(`✔ Tags: ${tagNames.length}`);

  // ─── Items ────────────────────────────────────────────────────
  const itemsData = [
    {
      id: "item_1",
      title: "useAuth Hook",
      description: "Custom authentication hook for React applications",
      contentType: "text",
      content: `import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}`,
      language: "typescript",
      typeId: itemTypes["Snippet"],
      collectionId: "col_react",
      isFavorite: true,
      isPinned: true,
      tags: ["react", "auth", "hooks"],
    },
    {
      id: "item_2",
      title: "API Error Handling Pattern",
      description: "Fetch wrapper with exponential backoff retry logic",
      contentType: "text",
      content: `async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(res.statusText)
      return res
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, 2 ** i * 1000))
    }
  }
  throw new Error('Max retries reached')
}`,
      language: "typescript",
      typeId: itemTypes["Snippet"],
      collectionId: "col_react",
      isFavorite: false,
      isPinned: true,
      tags: ["api", "error-handling", "fetch"],
    },
    {
      id: "item_3",
      title: "ChatGPT Code Review Prompt",
      description: "Prompt for getting thorough code reviews from AI",
      contentType: "text",
      content:
        "Review the following code for: 1) bugs and edge cases, 2) performance issues, 3) security vulnerabilities, 4) readability improvements. Be concise and prioritize critical issues.",
      language: null,
      typeId: itemTypes["Prompt"],
      collectionId: "col_ai",
      isFavorite: true,
      isPinned: false,
      tags: ["ai", "code-review", "chatgpt"],
    },
    {
      id: "item_4",
      title: "Git Interactive Rebase",
      description: "Squash last N commits into one",
      contentType: "text",
      content: "git rebase -i HEAD~N",
      language: "bash",
      typeId: itemTypes["Command"],
      collectionId: "col_git",
      isFavorite: false,
      isPinned: false,
      tags: ["git", "rebase"],
    },
    {
      id: "item_5",
      title: "Project Architecture Notes",
      description: "High-level notes on the current system design",
      contentType: "text",
      content: "## Architecture\n\nThe app follows a monorepo structure with Next.js App Router...",
      language: null,
      typeId: itemTypes["Note"],
      collectionId: null,
      isFavorite: false,
      isPinned: false,
      tags: ["architecture", "docs"],
    },
    {
      id: "item_6",
      title: "Python List Comprehension Patterns",
      description: "Common list comprehension patterns in Python",
      contentType: "text",
      content: `# Filter and transform
evens_squared = [x**2 for x in range(10) if x % 2 == 0]

# Nested
matrix = [[i * j for j in range(5)] for i in range(5)]

# Dict comprehension
word_lengths = {word: len(word) for word in ['hello', 'world']}`,
      language: "python",
      typeId: itemTypes["Snippet"],
      collectionId: "col_python",
      isFavorite: false,
      isPinned: false,
      tags: ["python", "list-comprehension"],
    },
  ];

  for (const { tags: itemTags, ...item } of itemsData) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: {
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
