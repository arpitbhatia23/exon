import { cancel, isCancel, outro, select } from "@clack/prompts";
import { DB_OPTIONS, LANG_OPTION } from "./options.js";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { appendEnv, mergeDbConfigToRoot, mergeDeps } from "./dbHelper.js";
import { spawn } from "child_process";
import color from "picocolors";
import { createDockerFile } from "./dockerHelper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type langType = {
  ts?: string;
  js?: string;
};

export const selectLanguage = async (options: langType): Promise<string> => {
  if (options.ts && options.js) {
    cancel("❌ Choose either --ts or --js, not both.");
    process.exit(1);
  }

  if (options.js) return "JavaScript";
  if (options.ts) return "TypeScript";

  const selected = await select({
    message: "Which language do you want to use?",
    options: LANG_OPTION,
  });

  if (isCancel(selected)) {
    cancel("Project creation cancelled.");
    process.exit(0);
  }

  return selected as string;
};

type dbTypes = {
  mongoose?: string;
  prisma?: string;
  drizzle?: string;
  none?: string;
};
export const selectDatabase = async (options: dbTypes): Promise<string> => {
  const dbKeys: (keyof dbTypes)[] = ["mongoose", "prisma", "drizzle"];

  // Filter only selected DB flags
  const dbFlags: (keyof dbTypes)[] = dbKeys.filter((key) =>
    Boolean(options[key]),
  );

  if (dbFlags.length > 1) {
    cancel("❌ Choose only one database option.");
    process.exit(1);
  }

  // Return selected database if a flag is set
  if (options.mongoose) return "Mongoose";
  if (options.prisma) return "Prisma";
  if (options.drizzle) return "Drizzle";

  // Otherwise, prompt user interactively
  const selected = await select({
    message: "Which database ORM do you want to use?",
    options: DB_OPTIONS,
  });

  if (isCancel(selected)) {
    cancel("Project creation cancelled.");
    process.exit(0);
  }

  return selected as string;
};

export const copyTemplate = async (
  language: string,
  name: string,
  targetDir: string,
  s: any,
): Promise<void> => {
  const templateName: string =
    language === "TypeScript"
      ? "node-express-template-ts"
      : "node-express-template-js";

  const templateDir = path.resolve(__dirname, "../templates", templateName);
  if (!fs.existsSync(templateDir)) {
    cancel("Template Not Found!");
  }
  try {
    s.start("Creating project structure...");
    fs.copySync(templateDir, targetDir, {
      overwrite: true,
      filter: (src) => {
        const basename = path.basename(src);
        return basename !== "node_modules" && basename !== "dist";
      },
    });
    s.stop("Project structure created");
  } catch (error) {
    s.stop("Failed to create project structure", 1);
  }

  if (!fs.existsSync(targetDir)) {
    cancel(`something went wrong while creating ${targetDir}`);
  }
};

export const injectDb = async (
  dbTemplate: string | null,
  targetDir: string,
): Promise<void> => {
  if (dbTemplate) {
    const dbDir = path.join(__dirname, "../templates/db", dbTemplate);
    fs.copySync(dbDir, `${targetDir}/src/db`, {
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
  }
};

export const installdependencies = async (
  s: any,
  pkgPath: string,
  targetDir: string,
): Promise<void> => {
  if (fs.existsSync(pkgPath)) {
    s.start("Installing dependencies...");

    try {
      await new Promise<void>((resolve, reject) => {
        const child = spawn("npm", ["install", "--loglevel=error"], {
          cwd: targetDir,
          stdio: "ignore",
          shell: true,
        });

        child.on("close", (code) => {
          if (code !== 0) reject(new Error("Install failed"));
          else resolve();
        });
      });

      s.stop("Dependencies installed successfully!");
    } catch (err) {
      s.stop("Failed to install dependencies.", 1);
      process.exit(1);
    }
  }
  outro(
    color.green(`🚀 exon-cli just saved you 30 minutes of setup!`) +
      "\n" +
      color.dim(`Star the repo to support the project: `) +
      color.cyan(color.underline("https://github.com/arpitbhatia23/exon")),
  );
};

export const addDocker = async (
  options: {
    docker?: string;
  },
  language: string,
  targetDir: string,
): Promise<void> => {
  let useDocker: boolean;
  if (options.docker) {
    useDocker = true;
  }
  const USE_DOCKER_OPTIONS = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const selected = await select({
    message: "Do you want to use Docker?",
    options: USE_DOCKER_OPTIONS,
  });

  useDocker = selected as boolean;

  if (useDocker) {
    await createDockerFile(language, targetDir);
  }
};
