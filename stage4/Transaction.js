import crypto2 from 'crypto2'

export default class Transaction{
  constructor(args = {}){
    this.from = args.from
    this.to = args.to
    this.amount = args.amount
    this.signature = args.signature
  }

  get payload(){
    return JSON.stringify({
      from: this.from,
      to: this.to,
      amount: this.amount
    });
  }

  async sign(privateKey){
    this.signature = await crypto2.sign(this.payload, privateKey)
  }

  async isValid(){
    if(! await crypto2.verify(this.payload, this.from, this.signature)){
      throw new Error(`Transaction signature is invalid`)
    }
  }
}
