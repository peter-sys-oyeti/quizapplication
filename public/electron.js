const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
var Registry = require("winreg");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

ipcMain.on("get-username", (event, arg) => {
    var regKey = new Registry({
        hive: Registry.HKCU,
        key: "\\Volatile Environment"
    });

    //event.sender.send("username-reply", "this is response from the back");
    // list autostart programs
    regKey.values(function(err, items) {
        if (err) event.sender.send("username-reply", "ERROR: " + err);
        else
            for (var i = 0; i < items.length; i++) {
                if (items[i].name === "USERNAME") {
                    event.sender.send("username-reply", items[i].value);
                }
            }
    });
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: { nodeIntegration: true }
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    if (isDev) {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.setMenuBarVisibility(false);
        //mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
