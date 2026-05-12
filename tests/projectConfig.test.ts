import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import fs from "fs-extra";
import path from "node:path";
import os from "node:os";
import { createProjectConfig } from "../src/core/project/createProjectConfig.js";
import { loadProjectConfig } from "../src/core/project/loadProjectConfig.js";
import { saveProjectConfig } from "../src/core/project/saveProjectConfig.js";

describe("projectConfig", () => {
  let tempDir: string;
  const originalCwd = process.cwd();

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "exon-config-test-"));
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await fs.remove(tempDir);
  });

  test("should create, load and save project config", async () => {
    const config = {
      language: "typescript",
      database: "PRISMA",
      plugins: ["docker"],
    };

    await createProjectConfig(tempDir, config);

    const configPath = path.join(tempDir, "exon.config.json");
    assert.ok(await fs.pathExists(configPath));

    const loadedConfig = await loadProjectConfig();
    assert.deepStrictEqual(loadedConfig, config);

    loadedConfig.plugins.push("mongoose");
    await saveProjectConfig(loadedConfig);

    const updatedConfig = await fs.readJson(configPath);
    assert.ok(updatedConfig.plugins.includes("mongoose"));
  });
});
