# REA inspection plan

This is the reproducible plan for using the official REA tool with Flex Browser.

## 1. Install and check readiness

```powershell
npx rea-agents@latest setup
npx -y rea-agents@latest --help
```

REA requires a supported Node.js release and performs analysis locally. Native binary analysis providers are optional; static JavaScript/Electron analysis does not require Hopper, Ghidra, or IDA.

## 2. Inspect Flex Browser

```powershell
npx -y rea-agents@latest analyze-javascript-application `
  "C:\path\to\flex-browser" --json > reports\flex-browser-rea.json
```

Review the report for:

- Electron main/preload/renderer boundaries;
- IPC channels and permission decisions;
- module and import relationships;
- native add-ons and external process launches;
- source maps and packaged artifacts.

## 3. Observe permitted browser behavior

Start Flex Browser or a local fixture site, then use REA's browser-observation workflow. Compare only public, permitted behavior:

| Target | Safe comparison |
|---|---|
| Chromium / Edge-compatible | navigation, tabs, viewport controls, permission prompts |
| Firefox | standards rendering, focus behavior, keyboard shortcuts |
| WebKit / Safari-like | layout, media queries, scrolling, accessibility tree |

Safari itself is not available on Windows. WebKit is a compatibility target, not a claim of Safari equivalence.

Flex also includes a repeatable local engine smoke matrix:

```powershell
npm.cmd run engines:inspect
```

It uses the installed Microsoft Edge and Firefox executables when present, Playwright Chromium, and Playwright WebKit when downloaded. It records availability rather than treating an unavailable engine as a passing result.

## 4. Reconstruction boundary

Use findings to improve original UX and standards compatibility. Do not extract or reproduce proprietary source code, private data, browser branding, security mechanisms, or implementation details that are not necessary for an interoperable feature.

Reports may contain sensitive paths or application details. Review and sanitize them before committing; the repository ignores generated reports by default.
