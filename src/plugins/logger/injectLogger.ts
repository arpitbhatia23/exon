import path from "node:path";
import fs from "fs-extra";
import { cancel } from "@clack/prompts";
import { injectCode } from "../utils/injectCode.js";
import { mergeDeps } from "../../core/dbHelper.js";
export const injectlogger = async (
  templatedir: string,
  targetdir: string,
  exts: string,
): Promise<void> => {
  const middlewaresrc = path.join(
    templatedir,
    "middleware",
    `morgan.middleware.${exts}`,
  );
  const uitlssrc = path.join(templatedir, "utils", `logger.${exts}`);

  const middlewareExists = await fs.pathExists(middlewaresrc);
  const utilsExists = await fs.pathExists(uitlssrc);
  if (!middlewareExists || !utilsExists) {
    cancel("logger plugin template not found");
    process.exit(1);
  }

  const middlewaredist = path.join(
    targetdir,
    "src",
    "middleware",
    `morgan.middleware.${exts}`,
  );

  const uitlsdist = path.join(targetdir, "src", "utils", `logger.${exts}`);

  try {
    // ensure parent directories exist
    await fs.ensureDir(path.dirname(middlewaredist));
    await fs.ensureDir(path.dirname(uitlsdist));

    // copy files
    await fs.copy(middlewaresrc, middlewaredist);
    await fs.copy(uitlssrc, uitlsdist);
    const isTS = exts === "ts";
    //  Inject into app.ts/js
    const appFile = isTS ? "src/app.ts" : "src/app.js";
    const appPath = path.join(targetdir, appFile);
    const importCode = isTS
      ? `import morganLogger from "./middleware/morgan.middleware.js";`
      : `import morganLogger from "./middleware/morgan.middleware.js";`; // ES Modules for both
    await injectCode(
      appPath,
      "// EXON_INJECTION_LOGGER",
      `${importCode}\napp.use(morganLogger);`,
    );

    const depsPath = path.join(templatedir, "..", "deps.json");
    if (fs.existsSync(depsPath)) {
      mergeDeps(targetdir, depsPath);
    }
  } catch (error) {
    cancel("failed to inject logger plugin");
    console.error(error);
  }
};
