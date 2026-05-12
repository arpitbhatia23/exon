import { Command } from "commander";
import { loadProjectConfig } from "../core/project/loadProjectConfig.js";
import { plugins } from "../plugins/index.js";
import { runPlugins } from "../plugins/runPlugin.js";
import { cancel, intro, outro, spinner } from "@clack/prompts";
import { saveProjectConfig } from "../core/project/saveProjectConfig.js";

const addcommand = new Command("add");

addcommand
  .argument("<plugin>")
  .description("add new plugin to current project")
  .action(async (pluginName: string) => {
    const config = await loadProjectConfig();
    const plugin = plugins.find((p) => p.name === pluginName);

    if (!plugin) {
      cancel(`Plugin "${pluginName}" not found`);
      return;
    }
    intro(`adding plugin: ${pluginName}`);
    const s = spinner({ indicator: "timer" });

    if (config.plugins.includes(pluginName)) {
      cancel("plugin already installed");
      return;
    }
    const context = {
      language: config.language,
      projectName: process.cwd(),
      targetDir: process.cwd(),
    };
    // const targetDir = process.cwd();
    // const pkgPath = path.join(targetDir, "package.json");
    s.start();
    s.message("pluging start to install");
    try {
      await runPlugins(plugin, context, { force: true });
    } catch (error) {
      s.stop(`${pluginName} installation failed`, 1);

      cancel("Plugin installation failed");

      process.exit(1);
    }
    config.plugins.push(pluginName);

    if (plugin.install) {
      await plugin.install(context);
    }
    if (plugin.type === "database") {
      config.database = pluginName.toUpperCase();
    }
    s.stop(`${pluginName} plugin installed`);
    await saveProjectConfig(config);
    outro(`✅ Plugin "${pluginName}" added successfully`);
  });

export { addcommand };
