const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (index , timestamp, data, prevhash =  '', hash){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevhash = prevhash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.prevhash + JSON.stringify(this.data)).toString();
    }
}   

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, '01/01/2019', '0')
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.prevhash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.prevhash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let MarkCoin = new Blockchain();
MarkCoin.addBlock(new Block(1, '25/03/2019', {amount: 14}));
MarkCoin.addBlock(new Block(2, '26/03/2019', {amount: 12}));
MarkCoin.addBlock(new Block(3, '27/03/2019', {amount: 4}));
MarkCoin.addBlock(new Block(4, '28/03/2019', {amount: 10}));
MarkCoin.addBlock(new Block(5, '29/03/2019', {amount: 9}));


console.log('Klopt deze blockchain?' + MarkCoin.isChainValid());
MarkCoin.chain[3].data = {amount: 100};
MarkCoin.chain[3].hash = MarkCoin.chain[3].calculateHash();
console.log(MarkCoin.chain[4].prevhash);
console.log(MarkCoin.chain[3].hash);
console.log('Klopt de blockchain met de vervalste data nog steeds?' + MarkCoin.isChainValid());


