import path from "path";
import { defineConfig } from "prisma/config";

// Prisma 7 no longer auto-loads .env — load it explicitly for CLI commands
try {
  process.loadEnvFile(path.resolve(process.cwd(), ".env"));
} catch {
  // .env not found or already loaded — safe to ignore
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
