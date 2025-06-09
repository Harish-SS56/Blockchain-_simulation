const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = '';
    }

    calculateHash() {
        const dataString = `${this.index}${this.timestamp}${JSON.stringify(this.data)}${this.previousHash}${this.nonce}`;
        return crypto.createHash('sha256').update(dataString).digest('hex');
    }

    mineBlock(difficulty) {
        const target = '0'.repeat(difficulty);
        let startTime = Date.now();
        let attempts = 0;
        
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
            attempts++;
        }
        
        const endTime = Date.now();
        console.log(`Block mined: ${this.hash}`);
        console.log(`Attempts: ${attempts}`);
        console.log(`Time: ${(endTime - startTime)/1000} seconds`);
    }
}

// Mine a block with difficulty 4
console.log('### Mining Block with Difficulty 4:');
const block = new Block(1, Date.now(), { amount: 5 }, '0xprev123');
block.mineBlock(4);