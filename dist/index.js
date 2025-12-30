#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import { execSync } from "child_process";
import { ExitPromptError } from "@inquirer/core";
import { resolveDbTemplate } from "./resolveDbTemplates.js";
import { appendEnv, mergeDbConfigToRoot, mergeDeps } from "./dbHelper.js";
const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
program
    .name("exon")
    .description("CLI to generate Express backend boilerplate")
    .version("1.1.4");
console.log(chalk.yellow(figlet.textSync("EXON", { horizontalLayout: "full" })));
program
    .command("create <name>")
    .description("create a new express project")
    .action(async (name) => {
    try {
        const answer = await inquirer.prompt([
            {
                type: "select",
                name: "language",
                message: chalk.blue("Which language do you want to use?"), // colored question
                choices: ["TypeScript", "JavaScript"],
            },
            {
                type: "select",
                name: "database",
                message: chalk.blue("Which database orm do you want to use?"), // colored question
                choices: ["Mongoose", "Prisma", "Drizzle", "None"],
            },
        ]);
        const templateName = answer.language === "TypeScript"
            ? "node-express-template-ts"
            : "node-express-template-js";
        const db = answer.database;
        const templateDir = path.resolve(__dirname, "../templates", templateName);
        const targetDir = path.resolve(process.cwd(), name);
        if (!fs.existsSync(templateDir)) {
            console.log(chalk.red("Template Not Found!"));
        }
        fs.copySync(templateDir, targetDir, {
            overwrite: true,
            filter: (src) => !["node_modules", "dist"].some((f) => src.includes(f)),
        });
        console.log("template directorand tagert directory", templateDir, targetDir);
        await new Promise((r) => setTimeout(r, 500));
        if (!fs.existsSync(targetDir)) {
            throw Error(`something went wrong while creating ${targetDir}`);
        }
        console.log(chalk.green(`✅ ${answer.language} project created in ${targetDir}`));
        //  merge db with over template
        const dbTemplate = resolveDbTemplate(answer);
        if (dbTemplate) {
            const dbDir = path.join(__dirname, "../templates/db", dbTemplate);
            fs.copySync(dbDir, `${targetDir}/src/db`, {
                filter: (src) => ![
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
            const spinner = ora({
                text: "Installing dependencies...",
                color: "cyan",
            }).start();
            try {
                execSync("npm install", { cwd: targetDir, stdio: "inherit" });
                spinner.succeed(chalk.green("Dependencies installed successfully!"));
            }
            catch (err) {
                spinner.fail(chalk.red("Failed to install dependencies."));
            }
        }
        console.log(chalk.green("Done! Run 'npm start' inside your project folder."));
    }
    catch (error) {
        if (error instanceof ExitPromptError) {
            console.log("\n👋 Project creation cancelled by user.");
            process.exit(0); // Exit cleanly
        }
        throw error;
    }
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map