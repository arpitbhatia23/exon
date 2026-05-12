import fs from "fs-extra";
import path from "path";

import type { ExonConfig } from "../../types/exonConfig.js";

export const saveProjectConfig = async (config: ExonConfig): Promise<void> => {
  const configPath = path.join(process.cwd(), "exon.config.json");

  await fs.writeJSON(configPath, config, {
    spaces: 2,
  });
};
