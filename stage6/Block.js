import crypto2 from 'crypto2'

const DIFFICULTY = 4

export default class Block{
  constructor(prevBlock = {}){

    this.prevBlockHash = prevBlock.hash || null
    this.height = prevBlock.height + 1 || 0
    this.transactions = []
    this.nonce = 0
  }

  addTransaction(transaction){
    this.transactions.push(transaction)
  }

  get payload(){
    return JSON.stringify({
      prevBlockHash: this.prevBlockHash,
      height: this.height,
      transactions: this.transactions,
      nonce: this.nonce,
    })
  }

  async mine(){
    this.hash =  await crypto2.hash(this.payload)

    while(this.hash.substring(0, DIFFICULTY) !== new Array(DIFFICULTY + 1).join('0') && this.nonce >= 0){
      this.nonce += 1
      this.hash = await crypto2.hash(this.payload)
    }
  }

  async isValid(){
    if(await crypto2.hash(this.payload) !== this.hash){
      throw new Error('Block hash is invalid')
    }

    for(let transaction of this.transactions){
      await transaction.isValid()
    }
  }
}
