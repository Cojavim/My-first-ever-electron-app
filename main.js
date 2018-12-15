const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// init win
let win;

function createWindow() {
  // create browset window
  win = new BrowserWindow({
    width: 810,
    height: 810,
    frame: false
  });

  // load index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open devtools
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

// Run create window finction
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit();
  }
});