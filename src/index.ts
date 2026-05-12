#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import path from "path";
import pkg from "../package.json" with { type: "json" };
import fs from "fs";
import { cancel, intro, spinner } from "@clack/prompts";
import {
  copyTemplate,
  installdependencies,
  selectDatabase,
  selectLanguage,
} from "./core/prompt.js";
import type { pluginContext } from "./plugins/types/index.js";
import { plugins } from "./plugins/index.js";
import { runPlugins } from "./plugins/runPlugin.js";
import { createProjectConfig } from "./core/project/createProjectConfig.js";
import { addcommand } from "./commands/addCommand.js";
import { removeCommand } from "./commands/removeCommand.js";
const program = new Command();
program.addCommand(addcommand);
program.addCommand(removeCommand);
/* This part of the code is setting up the configuration for the CLI program using the `Command` class
from the `commander` package. Here's a breakdown of what it's doing: */
program
  .name("exon-cli")
  .description("⚡ Generate production-ready Express.js APIs in seconds")
  .version(pkg.version, "-v, --version", "output the current version")
  .addHelpText(
    "after",
    `
Examples:
  $ exon-cli create my-api           # Create project interactively
  $ exon-cli create blog-backend -t   # Create with TypeScript
  $ exon-cli create shop-api -j -m    # Create with JS and Mongoose
  $ exon-cli create crm -t -p -D      # Create with TS, Prisma, and Docker enabled
  $ exon-cli create app -t -d         # Create with TS and Drizzle ORM

Docs:
  https://www.npmjs.com/package/exon-cli

🚀 exon-cli just saved you 30 minutes of setup!

Star the repo to support the project: https://github.com/arpitbhatia23/exon
`,
  );

console.log(
  chalk.yellow(figlet.textSync("EXON-CLI", { horizontalLayout: "full" })),
);

program
  .command("create <name>")
  .description("create a new express project")
  .option("--ts, -t", "use TypeScript")
  .option("--js, -j", "use JavaScript")
  .option("--mongoose, -m", "use Mongoose ODM")
  .option("--prisma, -p", "use Prisma ORM")
  .option("--drizzle, -d", "use Drizzle ORM")
  .option("--docker, -D", "enable Docker support")
  .option("--logger, -L", "enable Morgan & Winston logging")
  .option("--swagger, -S", "enable Swagger API documentation")
  .action(async (name: string, options) => {
    intro(chalk.cyan("EXON → Initializing project...."));

    const s = spinner({ indicator: "dots" });

    try {
      const targetDir = path.resolve(process.cwd(), name);
      if (fs.existsSync(targetDir)) {
        cancel(
          ` A folder named "${name}" already exists.\n` +
            `Please choose a different project name.`,
        );
        process.exit(1);
      }
      let language: string = await selectLanguage(options);
      let database: string = await selectDatabase(options);
      await copyTemplate(language, name, targetDir, s);

      const context: pluginContext = {
        language,
        projectName: name,
        targetDir,
        database,
        options,
      };

      // await addDocker(options, language, targetDir, name, database);
      await runPlugins(plugins, context);
      await createProjectConfig(targetDir, {
        language,
        database,

        plugins: plugins
          .filter((plugin) => plugin.shouldRun(context))
          .map((plugin) => plugin.name),
      });

      const pkgPath = path.join(targetDir, "package.json");
      await installdependencies(s, pkgPath, targetDir);
    } catch (error) {
      if (error) {
        cancel("\n👋 Project creation cancelled by user.");
        process.exit(0); // Exit cleanly
      }
    }
  });
await program.parseAsync(process.argv);
