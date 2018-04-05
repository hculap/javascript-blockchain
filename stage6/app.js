import crypto2 from 'crypto2'
import express from 'express'
import Blockchain from './Blockchain'
import Transaction from './Transaction'
import Balance from './Balance'

const users = []
const blockchain = new Blockchain()

const app = express()

app.get('/blocks', (req, res) => {
  res.send(blockchain.blocks)
})

app.get('/transactions', (req, res) => {
  res.send(blockchain.transactions)
})

app.get('/balance', (req, res) => {
  const balance = new Balance(blockchain)
  res.send(balance.getBalances())
})

app.listen(3000)

async function createTransaction(){
  const transaction = new Transaction({
    from: users[0].publicKey,
    to: users[1].publicKey,
    amount: 100
  })
  await transaction.sign(users[0].privateKey)
  blockchain.addTransaction(transaction)
}

async function main(){

  for(let i = 0; i < 2; i++){
    users.push(await crypto2.createKeyPair())
  }

  setInterval(createTransaction, 1000)
  //setInterval(() => { console.log(blockchain) }, 3000)
  setInterval(() => { blockchain.createBlock() }, 2000)

}

main()
