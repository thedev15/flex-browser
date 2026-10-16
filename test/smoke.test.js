const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

test("Flex Browser shell includes the core workspace surfaces", () => {
  const html = fs.readFileSync(path.join(root, "src", "index.html"), "utf8");
  for (const marker of ["address-form", "search-form", "inspector", "new-tab"]) {
    assert.match(html, new RegExp(`id="${marker}"`));
  }
});

test("renderer escapes navigation labels before inserting them", () => {
  const renderer = fs.readFileSync(path.join(root, "src", "renderer.js"), "utf8");
  assert.match(renderer, /escapeHtml/);
  assert.match(renderer, /window\.flex\.validateUrl/);
});

test("Electron runs with isolation boundaries", () => {
  const main = fs.readFileSync(path.join(root, "main.js"), "utf8");
  assert.match(main, /contextIsolation:\s*true/);
  assert.match(main, /sandbox:\s*true/);
  assert.match(main, /nodeIntegration:\s*false/);
});
