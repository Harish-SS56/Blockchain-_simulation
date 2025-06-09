const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        const dataString = `${this.index}${this.timestamp}${JSON.stringify(this.data)}${this.previousHash}${this.nonce}`;
        return crypto.createHash('sha256').update(dataString).digest('hex');
    }
}

// Create blockchain with 3 linked blocks
const createBlockchain = () => {
    const chain = [new Block(0, Date.now(), { info: 'Genesis Block' }, '0')];
    
    // Add blocks
    chain.push(new Block(1, Date.now(), { amount: 5 }, chain[0].hash));
    chain.push(new Block(2, Date.now(), { amount: 10 }, chain[1].hash));
    
    return chain;
};

// Display blockchain
const displayBlockchain = (chain) => {
    chain.forEach(block => {
        console.log(`Block ${block.index}:`);
        console.log(`  Hash: ${block.hash}`);
        console.log(`  Previous Hash: ${block.previousHash}`);
        console.log(`  Data: ${JSON.stringify(block.data)}`);
        console.log('------------------------');
    });
};

// Tamper and verify chain integrity
const simulateTampering = (chain) => {
    console.log('\n### Tampering with Block 1...');
    chain[1].data = { amount: 1000 }; // Malicious change
    chain[1].hash = chain[1].calculateHash();
    
    console.log('### Verifying Chain Integrity:');
    for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const prevBlock = chain[i - 1];
        
        // Recompute current hash for validation
        const validHash = currentBlock.calculateHash() === currentBlock.hash;
        const validLink = currentBlock.previousHash === prevBlock.hash;
        
        console.log(`Block ${currentBlock.index}:`);
        console.log(`  Valid Hash? ${validHash}`);
        console.log(`  Valid Link to Previous? ${validLink}`);
    }
};

// Execute
console.log('### Initial Blockchain:');
const blockchain = createBlockchain();
displayBlockchain(blockchain);
simulateTampering(blockchain);