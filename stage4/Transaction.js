import crypto2 from 'crypto2'

class Transaction{
  constructor(args){
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

  sign(privateKey){

  }
}
