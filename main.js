const { app, BrowserWindow, ipcMain, session } = require("electron");
const path = require("node:path");

function createWindow() {
  const window = new BrowserWindow({
    width: 1440, height: 920, minWidth: 980, minHeight: 640,
    backgroundColor: "#07101f", title: "Flex Browser",
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, sandbox: true, nodeIntegration: false },
  });
  window.loadFile(path.join(__dirname, "src", "index.html"));
}

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_contents, permission, callback) => {
    callback(permission === "fullscreen" || permission === "clipboard-read");
  });
  ipcMain.handle("validate-url", (_event, value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch { return false; }
  });
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
