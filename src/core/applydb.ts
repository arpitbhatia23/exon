import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
import { appendEnv, mergeDbConfigToRoot, mergeDeps } from "./dbHelper.js";
export const injectDb = async (
  dbDir: string,
  targetDir: string,
): Promise<void> => {
  if (!fs.existsSync(dbDir)) {
    throw new Error(`Template not found: ${dbDir}`);
  }

  fs.copySync(dbDir, path.join(targetDir, "src/db"), {
    filter: (src) =>
      ![
        "env.append",
        "deps.json",
        "drizzle.config.js",
        "drizzle.config.ts",
      ].some((f) => src.includes(f)),
  });

  mergeDeps(targetDir, path.join(dbDir, "deps.json"));

  appendEnv(targetDir, path.join(dbDir, "env.append"));

  mergeDbConfigToRoot(targetDir, dbDir);
};
