import { test, describe, mock } from "node:test";
import assert from "node:assert";
import { runPlugins } from "../src/plugins/runPlugin.js";
import type { Plugin, pluginContext } from "../src/plugins/types/index.js";

describe("runPlugin", () => {
  const context: pluginContext = {
    language: "typescript",
    projectName: "test-project",
    targetDir: "/tmp/test",
    database: "NONE",
    options: {},
  };

  test("runPlugins should execute plugin if shouldRun returns true", async () => {
    let executed = false;
    const mockPlugin: Plugin = {
      name: "mock-plugin",
      type: "feature",
      shouldRun: () => true,
      run: async () => {
        executed = true;
      },
    };

    await runPlugins(mockPlugin, context);
    assert.strictEqual(executed, true);
  });

  test("runPlugins should not execute plugin if shouldRun returns false", async () => {
    let executed = false;
    const mockPlugin: Plugin = {
      name: "mock-plugin",
      type: "feature",
      shouldRun: () => false,
      run: async () => {
        executed = true;
      },
    };

    await runPlugins(mockPlugin, context);
    assert.strictEqual(executed, false);
  });

  test("runPlugins should execute plugin if force is true even if shouldRun is false", async () => {
    let executed = false;
    const mockPlugin: Plugin = {
      name: "mock-plugin",
      type: "feature",
      shouldRun: () => false,
      run: async () => {
        executed = true;
      },
    };

    await runPlugins(mockPlugin, context, { force: true });
    assert.strictEqual(executed, true);
  });

  test("runPlugins should handle array of plugins", async () => {
    let count = 0;
    const mockPlugin1: Plugin = {
      name: "plugin1",
      type: "feature",
      shouldRun: () => true,
      run: async () => {
        count++;
      },
    };
    const mockPlugin2: Plugin = {
      name: "plugin2",
      type: "feature",
      shouldRun: () => true,
      run: async () => {
        count++;
      },
    };

    await runPlugins([mockPlugin1, mockPlugin2], context);
    assert.strictEqual(count, 2);
  });
});
