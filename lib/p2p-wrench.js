const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const WS = require('libp2p-websockets')

const MPLEX = require('libp2p-mplex')
const {NOISE} = require('libp2p-noise')
const MulticastDNS = require('libp2p-mdns')
const DHT = require('libp2p-kad-dht')
const GossipSub = require('libp2p-gossipsub')

async function startNode(){
  const node = await Libp2p.create({
    addresses: {
      listen: [
        '/ip4/0.0.0.0/tcp/0',
        '/ip4/0.0.0.0/tcp/0/ws'
      ]
    },
    modules: {
      transport: [
        TCP,
        WS
      ],
      streamMuxer: [MPLEX],
      connEncryption: [NOISE],
      peerDiscovery: [MulticastDNS],
      dht: DHT,
      pubsub: GossipSub
    },
    config: {
      peerDiscovery: {
        autoDial: true,
        [MulticastDNS.tag]: {
          enabled: true,
          interval: 20e3
        }
      }
    }
  })
  return node;
} 

async function listen(node, cb){
  node.on('peer:discovery', (peer) => {
    let peerId = peer.toB58String();
    cb(peerId)
    console.log('Discovered %s', peer.toB58String()) // Log discovered peer
  })
  
  await node.start()
}


module.exports = {
  listenForPeers: listen,
  startNode:  startNode
}
