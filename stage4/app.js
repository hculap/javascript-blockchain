import crypto2 from 'crypto2'
import request from 'request'
import Blockchain from './Blockchain'
import Block from './Block'
import Transaction from './Transaction'

async function main(){
  const users = []
  for(let i = 0; i < 2; i++){
    users.push(await crypto2.createKeyPair())
  }

  const blockchain = new Blockchain()
  let prevBlock;

  for(let i = 0; i < 4; i++){
    const block = new Block(prevBlock)

    for(let i = 0; i < 4; i++){
      const transaction = new Transaction({
        from: users[0].publicKey,
        to: users[1].publicKey,
        amount: 100
      })
      await transaction.sign(users[0].privateKey)
      block.addTransaction(transaction)
      prevBlock = block
    }

    await block.generateHash()
    blockchain.addBlock(block)
  }

  console.log('BLOCKCHAIN: ', blockchain)
  console.log(new Array(40).join('-'))


  await blockchain.isValid()
  console.log('IS VALID: ', true)
  console.log(new Array(40).join('-'))

}

main()
