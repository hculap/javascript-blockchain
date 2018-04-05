import Block from './Block'

export default class Blockchain{
  constructor(){
    this.blocks = []
    this.transactions = {}
  }

  get lastBlock(){
    return this.blocks[this.blocks.length - 1]
  }

  async addTransaction(transaction){
    await transaction.isValid()
    if(!this.transactions[transaction.signature]){
      this.transactions[transaction.signature] = transaction
    }
  }

  async createBlock(){
    const block = new Block(this.lastBlock)
    const transactions = Object.values(this.transactions)
    if(transactions.length > 0){
      for(let transaction of transactions){
        block.addTransaction(transaction)
        delete this.transactions[transaction.signature]
      }

      await block.mine()
      this.blocks.push(block)
    }
  }

  async isValid(){
    for(let i = this.blocks.length - 1; i >= 0; i--){
      const block = this.blocks[i]

      await block.isValid()

      const prevBlock = this.blocks[block.height - 1]

      if(prevBlock && prevBlock.hash !== block.prevBlockHash){
        throw new Error(`Invalid prevBlockHash in block ${block.height}`)
      }
    }
  }
}
