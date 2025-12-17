import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Drizzle ORM instance
export const db = drizzle(pool);

// Function to connect DB and test
export async function connectDB(): Promise<void> {
  try {
    // Drizzle ORM doesn't have execute() on the ORM instance
    // Use pool.query for test connection
    await pool.query("SELECT 1");
    console.log("🧪 Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // exit process if DB fails
  }
}
