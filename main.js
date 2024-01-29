const { app, BrowserWindow } = require('electron')
const path = require('node:path')
require('@electron/remote/main').initialize()
const foo = require('bindings')('foo');

global.foo = foo;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  require('@electron/remote/main').enable(win.webContents)
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})