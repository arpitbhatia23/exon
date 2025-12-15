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
const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
program
    .name("exon")
    .description("CLI to generate Express backend boilerplate")
    .version("1.0.4");
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
        ]);
        const templateName = answer.language === "TypeScript"
            ? "node-express-template-ts"
            : "node-express-template-js";
        const templateDir = path.join(__dirname, "../templates", templateName);
        const targetDir = path.join(process.cwd(), name);
        if (!fs.existsSync(templateDir)) {
            console.log(chalk.red("Template Not Found!"));
        }
        fs.copySync(templateDir, targetDir, {
            overwrite: true,
            filter: (src) => !src.includes("node_modules"),
        });
        console.log(chalk.green(`✅ ${answer.language} project created in ${targetDir}`));
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