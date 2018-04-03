import request from 'request'
import Peer from './Peer'

export default class State{
  constructor(port, peerPort){
    this.peers = {}

    this.client = new Peer(port)
    this.addPeer(this.client)

    setInterval(() => {
      this.client.randomize()
    }, 8000);

    if(peerPort){
      this.addPeer(new Peer(peerPort, null))
    }
  }

  get peersList(){
    return Object.values(this.peers);
  }

  addPeer(peer){
    if(!this.peers[peer.port]){
      this.peers[peer.port] = peer
    }
  }

  updatePeers(peersList){
    peersList.forEach( peer => {
      const statePeer = this.peers[peer.port] || new Peer(peer.port, null);
      if(statePeer.version < parseInt(peer.version)){
        statePeer.movie = peer.movie
        statePeer.version = peer.version
        this.addPeer(statePeer)
      }
    })
  }

  fetchPeers(){
    this.peersList.forEach( peer => {
      if(peer.port != this.client.port){
        request.post({
            url: `http://localhost:${peer.port}/gossip`,
            form: {peersList: this.peersList}
          }, (error, res, body) => {
            if(!error){
              this.updatePeers(JSON.parse(body).peersList)
            }
        })
      }
    })
  }

  print(){
    console.log(new Array(40).join('-'))
    console.log(this.peers);
    console.log(new Array(40).join('-'))
  }
}
