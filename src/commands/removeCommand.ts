import { Command } from "commander";

import { loadProjectConfig } from "../core/project/loadProjectConfig.js";
import { saveProjectConfig } from "../core/project/saveProjectConfig.js";
import { plugins } from "../plugins/index.js";
import fsExtra from "fs-extra/esm";
import path from "node:path";
import { cancel, intro, outro, spinner } from "@clack/prompts";

export const removeCommand = new Command("remove");

removeCommand
  .argument("<plugin>")
  .description("Remove plugin from project")

  .action(async (pluginName: string) => {
    const config = await loadProjectConfig();
    const exists = config.plugins.includes(pluginName);

    if (!exists) {
      cancel(`⚠ Plugin "${pluginName}" is not installed`);

      return;
    }
    intro(`Removing plugin: ${pluginName}`);
    const s = spinner({ indicator: "timer" });
    config.plugins = config.plugins.filter((p) => p !== pluginName);
    const plugin = plugins.find((p) => p.name === pluginName);
    const context = {
      language: config.language,
      projectName: process.cwd(),
      targetDir: process.cwd(),
    };
    const targetDir = process.cwd();
    s.start("Removing plugin files..");
    await Promise.all(
      plugin?.files?.map(async (file) => {
        const filePath = path.join(targetDir, file);

        if (await fsExtra.pathExists(filePath)) {
          await fsExtra.remove(filePath);

          s.message(`🗑 Removed: ${file}`);
        }
      }) || [],
    );
    s.stop("Plugin files removed");
    await saveProjectConfig(config);

    if (plugin?.uninstall) {
      await plugin.uninstall(context);
    }
    outro(`✅ Plugin "${pluginName}" removed`);
  });
