const { app, BrowserWindow } = require('electron')
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev')

let win;

function createWindow(){
  win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, '/icons/png/128x128.png'),
      webPreferences: {
        nodeIntegration: true
      }})
  
  //Show app
  console.log(fs.readdirSync(path.join(__dirname)))
  win.loadURL(isDev? "http://localhost:3000": `file://${path.join(__dirname, "../webui/build/index.html")}`);
  
//  win.webContents.openDevTools()

}

let peers = []
app.on('ready', async () => {
 
  createWindow()

  try{

    win.webContents.on('did-finish-load', () => {
      console.log("FINISHED LOAD", peers)     
      win.webContents.send('devices-found', peers)
    })

  }catch(err) {
    console.error(err)
  }
})


