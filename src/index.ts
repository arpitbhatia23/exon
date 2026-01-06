#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execSync, spawn } from "child_process";
import { ExitPromptError } from "@inquirer/core";
import { resolveDbTemplate } from "./resolveDbTemplates.js";
import { appendEnv, mergeDbConfigToRoot, mergeDeps } from "./dbHelper.js";
const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  select,
  cancel,
  isCancel,
  intro,
  outro,
  spinner,
} from "@clack/prompts";
program
  .name("exon")
  .description("CLI to generate Express backend boilerplate")
  .version("1.1.5");

console.log(
  chalk.yellow(figlet.textSync("EXON", { horizontalLayout: "full" }))
);

program
  .command("create <name>")
  .description("create a new express project")
  .action(async (name: string) => {
    intro(chalk.cyan("EXON → Initializing project...."));

    const s = spinner({ indicator: "dots" });

    try {
      const language = await select({
        message: "Which language do you want to use?",
        options: [
          { value: "TypeScript", label: "TypeScript" },
          { value: "JavaScript", label: "JavaScript" },
        ],
      });

      if (isCancel(language)) {
        cancel("Project creation cancelled.");
        process.exit(0);
      }
      const database = await select({
        message: "Which database ORM do you want to use?",
        options: [
          { value: "Mongoose", label: "Mongoose" },
          { value: "Prisma", label: "Prisma" },
          { value: "Drizzle", label: "Drizzle" },
          { value: "None", label: "None" },
        ],
      });

      if (isCancel(database)) {
        cancel("Project creation cancelled.");
        process.exit(0);
      }
      const templateName =
        language === "TypeScript"
          ? "node-express-template-ts"
          : "node-express-template-js";

      const templateDir = path.resolve(__dirname, "../templates", templateName);
      const targetDir = path.resolve(process.cwd(), name);
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

      const dbTemplate = resolveDbTemplate({
        language: language,
        database: database,
      });

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

      const pkgPath = path.join(targetDir, "package.json");

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
      outro(chalk.green("Done! Run 'npm start' inside your project folder."));
    } catch (error) {
      if (error) {
        cancel("\n👋 Project creation cancelled by user.");
        process.exit(0); // Exit cleanly
      }
    }
  });
program.parse(process.argv);
