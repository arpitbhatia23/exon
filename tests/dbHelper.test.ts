import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import fs from "fs-extra";
import path from "node:path";
import os from "node:os";
import { mergeDeps, appendEnv } from "../src/core/dbHelper.js";

describe("dbHelper", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "exon-test-"));
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  test("mergeDeps should merge dependencies correctly", async () => {
    const pkgPath = path.join(tempDir, "package.json");
    const depsPath = path.join(tempDir, "deps.json");

    const initialPkg = {
      name: "test-app",
      dependencies: {
        express: "^4.18.2",
      },
      devDependencies: {},
      scripts: {
        test: "echo test",
      },
    };

    const newDeps = {
      dependencies: {
        mongoose: "^8.0.0",
      },
      devDependencies: {
        "@types/mongoose": "^5.0.0",
      },
      scripts: {
        "db:seed": "node seed.js",
      },
    };

    await fs.writeJson(pkgPath, initialPkg);
    await fs.writeJson(depsPath, newDeps);

    mergeDeps(tempDir, depsPath);

    const updatedPkg = await fs.readJson(pkgPath);

    assert.strictEqual(updatedPkg.dependencies.mongoose, "^8.0.0");
    assert.strictEqual(updatedPkg.dependencies.express, "^4.18.2");
    assert.strictEqual(updatedPkg.devDependencies["@types/mongoose"], "^5.0.0");
    assert.strictEqual(updatedPkg.scripts["db:seed"], "node seed.js");
  });

  test("appendEnv should append content to .env file", async () => {
    const envPath = path.join(tempDir, ".env");
    const appendPath = path.join(tempDir, "env.append");

    await fs.writeFile(envPath, "PORT=3000\n");
    await fs.writeFile(appendPath, "DB_URI=mongodb://localhost:27017/test");

    appendEnv(tempDir, appendPath);

    const updatedEnv = await fs.readFile(envPath, "utf-8");
    assert.ok(updatedEnv.includes("PORT=3000"));
    assert.ok(updatedEnv.includes("DB_URI=mongodb://localhost:27017/test"));
  });
});
