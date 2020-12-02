const { app, BrowserWindow } = require('electron')
const IPFS = require('ipfs')
const { startNode, listenForPeers } = require('../lib/p2p-wrench')

let win;

function createWindow(){
  win = new BrowserWindow({width: 800, height: 600,     webPreferences: {
      nodeIntegration: true
    }})
  
  //Show app
  win.loadURL("http://localhost:3000")  
  win.webContents.openDevTools()

}

let peers = []
app.on('ready', async () => {
 
  createWindow()

  let node = await startNode()

  listenForPeers(node, (peer) => {
    peers.push(peer)
    console.log(peers)
    win.webContents.send('devices-found', [peer])
  })
  try{
    const node = await IPFS.create({
      config: {
        Addresses: {
          Swarm: ['/ip4/0.0.0.0/tcp/0', '/ip4/0.0.0.0/tcp/0/ws']
        }
      }
    })
    const id = await node.id()
    
    win.webContents.on('did-finish-load', () => {
      console.log("FINISHED LOAD", peers)     
      win.webContents.send('devices-found', peers)
    })

    console.log(id)
  }catch(err) {
    console.error(err)
  }
})


