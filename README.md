# Flex Browser

Flex Browser is an original, privacy-first browser workspace for inspecting responsive web experiences across multiple rendering engines. It is **not** a copy of Edge, Firefox, or Safari and does not include proprietary browser code, branding, or assets.

## REA workflow

Flex is designed to be investigated with the official [morluto/rea](https://github.com/morluto/rea) project:

```powershell
npx rea-agents@latest setup
npm.cmd run rea:inspect
```

The first command registers REA with a supported local agent. The second performs REA's static JavaScript/Electron analysis against this repository and returns modules, imports, Electron boundaries, IPC relationships, and evidence. For browser behavior, use REA's website observation workflow against a locally served target or a permitted test site; do not use it to copy proprietary browser implementation or private user data.

Network access was unavailable while this repository was scaffolded, so REA itself and its browser engines are intentionally not vendored into this repository. Run the commands above on a network-enabled machine, then store only sanitized reports under `reports/`.

## Scope

- polished desktop browser shell with tabs, address/search, navigation controls, bookmarks, and an inspector panel;
- local-only renderer controls and safe URL validation;
- cross-engine compatibility foundation using Playwright Chromium (Edge-compatible), Firefox, and WebKit (Safari-like compatibility target);
- Safari itself is only available on Apple platforms, so Windows testing uses Playwright WebKit rather than Safari.

## Run

```powershell
npm.cmd install
npm.cmd start
npm.cmd run install-engines
npm.cmd run engines:inspect
```

The prototype intentionally keeps arbitrary remote navigation outside the privileged Electron page. Future iterations can add isolated web contents views with explicit permissions.

`engines:inspect` opens the local Flex workspace in Edge, Firefox, Playwright Chromium, and WebKit when those engines are available. On Windows, WebKit is the Safari-like compatibility target; Safari itself is not available.

## Responsible implementation

Flex uses original UI and naming. It models common browser workflows and tests standards compatibility; it does not reproduce proprietary implementation details or present itself as an official Microsoft, Mozilla, or Apple product.
