const fs = require("node:fs");
const path = require("node:path");
const { chromium, firefox, webkit } = require("playwright");

const root = path.resolve(__dirname, "..");
const target = `file://${path.join(root, "src", "index.html").replace(/\\/g, "/")}`;
const browsers = [
  { name: "edge", type: chromium, executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" },
  { name: "firefox", type: firefox, executablePath: "C:\\Program Files\\Mozilla Firefox\\firefox.exe" },
  { name: "chromium", type: chromium },
  { name: "webkit-safari-like", type: webkit },
];

async function inspect(entry) {
  let browser;
  try {
    browser = await entry.type.launch({
      headless: true,
      ...(entry.executablePath && fs.existsSync(entry.executablePath)
        ? { executablePath: entry.executablePath }
        : {}),
    });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(target);
    const result = await page.evaluate(() => ({
      title: document.title,
      heading: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
      inspectorInitiallyHidden: document.querySelector("#inspector")?.hidden,
      hasSearch: Boolean(document.querySelector("#search-form")),
      userAgent: navigator.userAgent,
      supportsGrid: CSS.supports("display", "grid"),
    }));
    return { engine: entry.name, status: "passed", ...result };
  } catch (error) {
    return { engine: entry.name, status: "unavailable", reason: error.message.split("\n")[0] };
  } finally {
    await browser?.close();
  }
}

(async () => {
  const results = [];
  for (const entry of browsers) results.push(await inspect(entry));
  const output = { generatedAt: new Date().toISOString(), target, results };
  console.log(JSON.stringify(output, null, 2));
  if (!results.some((result) => result.status === "passed")) process.exitCode = 1;
})();
