// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const electron = require ("electron");
const updateApp = require('update-electron-app')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let splash;

app.on('ready', () => {
  updateApp({
    repo: 'https://github.com/TrvstxdAb/public-bloxified',
    updateInterval: '1 hour',
    notifyUser: true
  })
  console.log('App Started');
  // create main browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    title: "Bloxified",
    backgroundColor: '#FFF',
    show: false,
    webPreferences: {
        nodeIntegration: true
    }
});
 
  // create a new `splash`-Window 
  splash = new BrowserWindow({
      width: 600, 
      height: 240, 
       transparent: true, 
       frame: false, 
       resizable: false,
       title: "Loading",
       alwaysOnTop: false,
       webPreferences: {
        nodeIntegration: true
       }
    });
  splash.loadURL('https://abpro2.sirv.com/Images/Bloxified/Loading');
  mainWindow.loadURL('https://www.bloxified.gq/app/');
    // if main window is ready to show, then hide the splash window and show up the main window
  mainWindow.webContents.once('ready-to-show', () => {
    console.log('Main window loaded');
    splash.hide();
    mainWindow.show();
  });
  mainWindow.webContents.once('unresponsive', () => {
    console.log('Unresponsive, showing splash');
  });
  mainWindow.webContents.once('responsive', () => {
    console.log('Responsive, hiding splash');
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.