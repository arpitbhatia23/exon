import fs from "fs-extra";
import path from "path";
import type { ExonConfig } from "../../types/exonConfig.js";

export const createProjectConfig = async (
  targetDir: string,
  config: ExonConfig,
): Promise<void> => {
  const configPath = path.join(targetDir, "exon.config.json");

  await fs.writeJSON(configPath, config, {
    spaces: 2,
  });
};
