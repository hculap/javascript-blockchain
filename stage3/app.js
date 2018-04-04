import crypto2 from 'crypto2'

function getTransactionPayload(transaction){
  return JSON.stringify({
    from: transaction.from,
    to: transaction.to,
    amount: transaction.amount,
  })
}

async function main(){
  const { privateKey, publicKey } = await crypto2.createKeyPair()

  console.log(privateKey)
  console.log(new Array(40).join('-'))

  console.log(publicKey)
  console.log(new Array(40).join('-'))

  const transaction = {
    from: 'szymon',
    to: 'tomek',
    amount: 100
  }

  let payload = getTransactionPayload(transaction)

  console.log('TRANSACTION: ', payload)
  console.log(new Array(40).join('-'))

  transaction.signature = await crypto2.sign(payload, privateKey)

  console.log('SIGNATURE: ', transaction.signature)
  console.log(new Array(40).join('-'))

  let isSignatureValid = await crypto2.verify(payload, publicKey, transaction.signature)

  console.log('IS SIGNATURE VALID: ', isSignatureValid)
  console.log(new Array(40).join('-'))

  transaction.to = 'karol'
  payload = getTransactionPayload(transaction)

  isSignatureValid = await crypto2.verify(payload, publicKey, transaction.signature)

  console.log('IS SIGNATURE VALID: ', isSignatureValid)
  console.log(new Array(40).join('-'))
}

main()
