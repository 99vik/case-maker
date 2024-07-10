import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
  tablesFilter: ["casemaker_*"],
  verbose: true,
  strict: true,
});
