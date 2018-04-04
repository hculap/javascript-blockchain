import crypto2 from 'crypto2'

function getBlockPayload(block){
  return JSON.stringify({
    haight: block.haight,
    prevBlockHash: block.prevBlockHash,
    transactions: block.transactions,
    nonce: block.nonce
  })
}

const DIFFICULTY = 6

async function main(){
  const block = {
    haight: 99,
    prevBlockHash: 'xxxxxxxx',
    transactions: [],
    nonce: 0
  }

  const startAt = new Date()

  let payload = getBlockPayload(block);
  block.hash =  await crypto2.hash(payload)

  while(block.hash.substring(0, DIFFICULTY) !== new Array(DIFFICULTY + 1).join('0') && block.nonce >= 0){
    block.nonce += 1
    payload = getBlockPayload(block)
    block.hash = await crypto2.hash(payload)
  }

  const endAt = new Date()

  console.log(block)
  console.log(new Array(40).join('-'))
  console.log('MINING TIME:', endAt - startAt);

}

main()
