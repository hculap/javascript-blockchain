import express from 'express'
import minimist from 'minimist'
import bodyParser from 'body-parser'
import State from './State'

const {port, peerPort} = minimist(process.argv);

if(!port){
  throw Error('Port is undefined!')
}

const state = new State(port, peerPort)

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}));

// @param state
app.post('/gossip', (req, res) => {
  state.updatePeers(req.body.peersList)
  res.send({peersList: state.peersList})
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

setInterval(() => {
  state.fetchPeers()
}, 3000)

setInterval(() => {
  state.print()
}, 1000)
