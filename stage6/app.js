import crypto2 from 'crypto2'
import request from 'request'
import Blockchain from './Blockchain'
import Transaction from './Transaction'

const users = []
const blockchain = new Blockchain()

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
  // setInterval(() => { console.log(blockchain.blocks); }, 3000)
  setInterval(() => { blockchain.createBlock() }, 2000)

}

main()
