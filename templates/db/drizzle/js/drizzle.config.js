import { defineConfig } from "drizzle-kit";

console.log("DATABASE_URL =", process.env.DATABASE_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgress", // change with your database
  dbCredentials: {
    url: process.env.DATABASE_URL, // drizzle-kit v0.5+ uses `url` instead of `connectionString`
  },
});
