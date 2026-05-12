import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;

export const db = drizzle(
  new Pool({
    connectionString: process.env.DATABASE_URL,
  })
);

export async function connectDB() {
  try {
    await db.execute("SELECT 1");
    console.log("Database connected:");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}
