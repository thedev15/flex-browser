const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("flex", {
  validateUrl: (url) => ipcRenderer.invoke("validate-url", url),
  platform: process.platform,
});
