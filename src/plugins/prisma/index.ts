import { execSync } from "node:child_process";
import type { Plugin } from "../types/index.js";
import { injectPrisma } from "./injectPrisma.js";
import path from "node:path";
import { ROOT_DIR } from "../../core/rootRes.js";
import fs from "fs";
export const prismaPlugin: Plugin = {
  name: "prisma",
  shouldRun(context) {
    return context.database === "Prisma";
  },
  async run(context) {
    await injectPrisma(context);
  },
  type: "database",
  files: ["src/db/index.js", "src/db/index.js", "src/db/index.ts"],
  async install(context) {
    const dbDir = path.resolve(
      ROOT_DIR,
      "plugins/templates/prisma",
      context.language === "TypeScript" ? "ts" : "js",
    );

    const data = JSON.parse(
      fs.readFileSync(path.join(dbDir, "deps.json"), "utf-8"),
    );
    if (!data) {
      console.log("deps not found");
      return;
    }
    const deps = data?.dependencies;
    const packages = Object.entries(deps)
      .map(([pkg, ver]) => `${pkg}@${ver}`)
      .join(" ");

    if (!packages) {
      console.log("no dependencies found in file");
    }

    try {
      execSync(`npm install ${packages}`, { stdio: "ignore" });
    } catch (error) {
      console.log(error);
    }
  },
  async uninstall(context) {
    const dbDir = path.resolve(
      ROOT_DIR,
      "plugins/templates/prisma",
      context.language === "TypeScript" ? "ts" : "js",
    );

    const data = JSON.parse(
      fs.readFileSync(path.join(dbDir, "deps.json"), "utf-8"),
    );
    if (!data) {
      console.log("deps not found");
      return;
    }
    const deps = data?.dependencies;
    const packages = Object.entries(deps)
      .map(([pkg]) => `${pkg}`)
      .join(" ");

    if (!packages) {
      console.log("no dependencies found in file");
    }

    try {
      execSync(`npm uninstall ${packages}`, { stdio: "ignore" });
    } catch (error) {
      console.log(error);
    }
  },
};
