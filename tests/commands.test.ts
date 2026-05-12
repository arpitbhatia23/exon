import { test, describe,  } from "node:test";
import assert from "node:assert";
import { addcommand } from "../src/commands/addCommand.js";
import { removeCommand } from "../src/commands/removeCommand.js";

// Mocking loadProjectConfig and saveProjectConfig would be complex without a proper mock library
// but we can try to test the command structure and basic actions.

describe("Exon CLI Commands", () => {
  test("add command should be defined", () => {
    assert.strictEqual(addcommand.name(), "add");
    assert.strictEqual(addcommand.description(), "add new plugin to current project");
  });

  test("remove command should be defined", () => {
    assert.strictEqual(removeCommand.name(), "remove");
    assert.strictEqual(removeCommand.description(), "Remove plugin from project");
  });

  // More detailed tests would require mocking the core logic which is heavily tied to the filesystem.
  // For a basic test case, we ensure the commands are correctly integrated into the program.
});
