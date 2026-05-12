import { defineConfig } from "drizzle-kit";

// Optional: ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in your environment");
}

console.log("DATABASE_URL =", process.env.DATABASE_URL);

export default defineConfig({
  out: "./drizzle", // Where migration files will go
  schema: "./src/db/drizzle/schema.ts", // Path to your schema file
  dialect: "postgress",
  dbCredentials: {
    url: process.env.DATABASE_URL, // drizzle-kit v0.5+ uses `url`
  },
});
