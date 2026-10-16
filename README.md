# Flex Browser

Flex Browser is an original, privacy-first browser workspace for inspecting responsive web experiences across multiple rendering engines. It is **not** a copy of Edge, Firefox, or Safari and does not include proprietary browser code, branding, or assets.

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
```

The prototype intentionally keeps arbitrary remote navigation outside the privileged Electron page. Future iterations can add isolated web contents views with explicit permissions.

## Responsible implementation

Flex uses original UI and naming. It models common browser workflows and tests standards compatibility; it does not reproduce proprietary implementation details or present itself as an official Microsoft, Mozilla, or Apple product.
