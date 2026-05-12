import { injectDb } from "../../core/applydb.js";
import { ROOT_DIR } from "../../core/rootRes.js";
import type { pluginContext } from "../types/index.js";
import path from "path";
export const injectPrisma = async (context: pluginContext): Promise<void> => {
  const dbDir = path.resolve(
    ROOT_DIR,
    "plugins/templates/prisma",
    context.language === "TypeScript" ? "ts" : "js",
  );

  await injectDb(dbDir, context.targetDir);
};
