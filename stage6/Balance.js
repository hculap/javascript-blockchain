export default class Balance{
  constructor(blockchain){
    this.transactions = []

    for(let block of blockchain.blocks){
      this.transactions = this.transactions.concat(block.transactions)
    }
  }

  getBalances(){
    const balances = {}
    console.log(this.transactions);
    this.transactions.forEach( transaction => {
      balances[transaction.from] = balances[transaction.from] || 0
      balances[transaction.to] = balances[transaction.to] || 0

      balances[transaction.from] = balances[transaction.from] - transaction.amount
      balances[transaction.to] = balances[transaction.to] + transaction.amount

    })
    return balances
  }


}
