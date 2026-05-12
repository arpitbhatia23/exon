import type { Plugin } from "../types/index.js";
import { addDocker } from "./dockerHelper.js";

export const dockerPlugin: Plugin = {
  name: "docker",
  type: "deployment",
  shouldRun(context) {
    return !!context.options?.docker;
  },
  files: ["Dockerfile", ".dockerignore", "docker-compose.yml"],
  async run(context) {
    await addDocker(
      context.language,
      context.targetDir,
      context.projectName,
      context.database || "",
    );
  },
};
