import path from "node:path";
import fs from "fs-extra";
import { cancel } from "@clack/prompts";
import { injectCode } from "../utils/injectCode.js";
import { mergeDeps } from "../../core/dbHelper.js";
export const injectswagger = async (
  templatedir: string,
  targetdir: string,
  exts: string,
): Promise<void> => {
  const configfilesrc = path.join(templatedir, `swagger.config.${exts}`);

  const configFileExit = await fs.pathExists(configfilesrc);
  if (!configFileExit) {
    cancel("swagger plugin template not found");
    process.exit(1);
  }

  const configfiledist = path.join(targetdir, "src", `swagger.config.${exts}`);

  try {
    // ensure parent directories exist
    await fs.ensureDir(path.dirname(configfilesrc));

    // copy files
    await fs.copy(configfilesrc, configfiledist);
    const isTS = exts === "ts";
    //  Inject into app.ts/js
    const appFile = isTS ? "src/app.ts" : "src/app.js";
    const appPath = path.join(targetdir, appFile);

    const importCode = `import { swaggerSpec } from "./swagger.config.js";\nimport swaggerUi from "swagger-ui-express";`;
    const usageCode = `app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));`;

    await injectCode(appPath, "// EXON_INJECTION_IMPORT", importCode);
    await injectCode(appPath, "// EXON_INJECTION_SWAGGER", usageCode);

    const depsPath = path.join(templatedir, "..", "deps.json");
    if (fs.existsSync(depsPath)) {
      mergeDeps(targetdir, depsPath);
    }
  } catch (error) {
    cancel("failed to inject logger plugin");
    console.error(error);
  }
};
