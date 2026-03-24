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

function preview(text: string | null | undefined, max = 60): string {
  if (!text) return "";
  const oneLine = text.replace(/\s+/g, " ").trim();
  return oneLine.length > max ? oneLine.slice(0, max) + "…" : oneLine;
}

async function main() {
  console.log("🔍 Testing database connection…\n");

  // ─── User ──────────────────────────────────────────────────────
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
  });

  if (!user) {
    console.error("❌ Demo user not found. Run: npx tsx prisma/seed.ts");
    process.exit(1);
  }

  console.log(`👤 User:     ${user.name} (${user.email})`);
  console.log(`   isPro:    ${user.isPro}`);
  console.log(`   verified: ${user.emailVerified?.toISOString() ?? "—"}`);
  console.log(`   password: ${user.password ? "✔ hashed" : "✘ missing"}`);

  // ─── Item types ────────────────────────────────────────────────
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });

  console.log(`\n🏷️  Item types (${itemTypes.length}):`);
  for (const t of itemTypes) {
    console.log(`   ${String(t.icon).padEnd(12)} ${t.name.padEnd(10)} ${t.color}`);
  }

  // ─── Collections ──────────────────────────────────────────────
  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    include: { _count: { select: { items: true } } },
    orderBy: { name: "asc" },
  });

  console.log(`\n📁 Collections (${collections.length}):`);
  for (const c of collections) {
    const fav = c.isFavorite ? "⭐" : "  ";
    console.log(`   ${fav} ${c.name.padEnd(20)} ${c._count.items} items  — ${c.description}`);
  }

  // ─── Items grouped by collection ──────────────────────────────
  const items = await prisma.item.findMany({
    where: { userId: user.id },
    include: {
      type: true,
      collection: true,
      tags: { include: { tag: true } },
    },
    orderBy: [{ collectionId: "asc" }, { createdAt: "asc" }],
  });

  console.log(`\n📦 Items (${items.length}):`);

  let lastCollection: string | null = undefined!;
  for (const item of items) {
    const colName = item.collection?.name ?? "(no collection)";
    if (colName !== lastCollection) {
      console.log(`\n   ── ${colName} ──`);
      lastCollection = colName;
    }

    const pinned = item.isPinned ? "📌" : "  ";
    const fav = item.isFavorite ? "⭐" : "  ";
    const typePad = `[${item.type.name}]`.padEnd(11);
    const tagList = item.tags.map((t) => t.tag.name).join(", ");

    console.log(`   ${pinned}${fav} ${typePad} ${item.title}`);
    if (item.url)     console.log(`            url:  ${item.url}`);
    if (item.content) console.log(`            preview: ${preview(item.content)}`);
    if (tagList)      console.log(`            tags: ${tagList}`);
  }

  // ─── Totals ────────────────────────────────────────────────────
  const tagCount = await prisma.tag.count({ where: { userId: user.id } });
  console.log(`\n📊 Totals: ${items.length} items · ${collections.length} collections · ${tagCount} tags · ${itemTypes.length} item types`);
  console.log("\n✅ All checks passed.");
}

main()
  .catch((e) => {
    console.error("❌ Database test failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
