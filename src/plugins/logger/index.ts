import path from "node:path";
import fs from "fs-extra";
import { ROOT_DIR } from "../../core/rootRes.js";
import type { Plugin } from "../types/index.js";
import { removeCode } from "../utils/injectCode.js";
import { injectlogger } from "./injectLogger.js";
import { execSync } from "node:child_process";

export const loggerPlugin: Plugin = {
  name: "logger",
  type: "feature",
  shouldRun(context) {
    return !!context.options?.logger;
  },
  files: [
    "src/middleware/morgan.middleware.ts",
    "src/middleware/morgan.middleware.js",
    "src/utils/logger.ts",
    "src/utils/logger.js",
  ],
  async run(context) {
    const templatedir = path.resolve(
      ROOT_DIR,
      "plugins/templates/logger",
      context.language === "TypeScript" ? "ts/src" : "js/src",
    );
    const ext = context.language === "TypeScript" ? "ts" : "js";
    await injectlogger(templatedir, context.targetDir, ext);
  },
  async install(context) {
    const templatedir = path.resolve(
      ROOT_DIR,
      "plugins/templates/logger",
      context.language === "TypeScript" ? "ts" : "js",
    );

    const data = JSON.parse(
      fs.readFileSync(path.join(templatedir, "deps.json"), "utf-8"),
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
      "plugins/templates/logger",
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
      const isTS = context.language === "TypeScript";
      const appFile = isTS ? "src/app.ts" : "src/app.js";
      const appPath = path.join(context.targetDir, appFile);
      const importCode = `import morganLogger from "./middleware/morgan.middleware.js";`;

      await removeCode(appPath, importCode);
      await removeCode(appPath, `app.use(morganLogger);`);
    } catch (error) {
      console.log(error);
    }
  },
  // async uninstall(context) {
  //   const pluginInfo = await untrackPlugin(context.targetDir, this.name);
  //   if (pluginInfo) {
  //     for (const file of pluginInfo.files) {
  //       await fs.remove(path.join(context.targetDir, file));
  //     }
  //   }

  //   const isTS = context.language === "TypeScript";
  //   const appFile = isTS ? "src/app.ts" : "src/app.js";
  //   const appPath = path.join(context.targetDir, appFile);
  //   const importCode = `import morganLogger from "./middleware/morgan.middleware.js";`;

  //   await removeCode(appPath, importCode);
  //   await removeCode(appPath, `app.use(morganLogger);`);
  // },
};
