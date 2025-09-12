import "dotenv/config";
console.log("DATABASE_URL =", process.env.DATABASE_URL);
import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  schema: path.join("prisma"), // パスの指定
} satisfies PrismaConfig;
