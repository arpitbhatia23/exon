import fs from "fs-extra";
import path from "path";

import type { ExonConfig } from "../../types/exonConfig.js";
import { cancel } from "@clack/prompts";

export const loadProjectConfig = async (): Promise<ExonConfig> => {
  const configPath = path.join(process.cwd(), "exon.config.json");

  if (!fs.existsSync(configPath)) {
    cancel("Not an exon project. Missing exon.config.json");
    process.exit(1);
  }

  return fs.readJSON(configPath);
};
