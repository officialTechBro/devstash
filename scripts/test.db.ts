import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🔍 Testing database connection...\n");

  // ─── User ──────────────────────────────────────────────────────
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
  });
  console.log("👤 User:", user ? `${user.name} (${user.email})` : "NOT FOUND");

  // ─── Item types ────────────────────────────────────────────────
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });
  console.log(`\n🏷️  Item types (${itemTypes.length}):`);
  for (const t of itemTypes) {
    console.log(`   ${t.icon}  ${t.name}  ${t.color}`);
  }

  // ─── Collections ──────────────────────────────────────────────
  const collections = await prisma.collection.findMany({
    where: { userId: user!.id },
    include: { _count: { select: { items: true } } },
    orderBy: { name: "asc" },
  });
  console.log(`\n📁 Collections (${collections.length}):`);
  for (const c of collections) {
    const fav = c.isFavorite ? "⭐" : "  ";
    console.log(`   ${fav} ${c.name} — ${c._count.items} items`);
  }

  // ─── Items with type + tags ────────────────────────────────────
  const items = await prisma.item.findMany({
    where: { userId: user!.id },
    include: {
      type: true,
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: "asc" },
  });
  console.log(`\n📦 Items (${items.length}):`);
  for (const item of items) {
    const pinned = item.isPinned ? "📌" : "  ";
    const fav = item.isFavorite ? "⭐" : "  ";
    const tagList = item.tags.map((t) => t.tag.name).join(", ");
    console.log(`   ${pinned}${fav} [${item.type.name}] ${item.title}`);
    if (tagList) console.log(`         tags: ${tagList}`);
  }

  console.log("\n✅ All checks passed.");
}

main()
  .catch((e) => {
    console.error("❌ Database test failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
