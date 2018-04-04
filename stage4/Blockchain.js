export default class Blockchain{
  constructor(){
    this.blocks = []
  }

  addBlock(block){
    this.blocks.push(block)
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
