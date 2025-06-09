const validators = {
    PoW: [
        { id: 'MinerA', power: 85 },
        { id: 'MinerB', power: 42 },
        { id: 'MinerC', power: 67 }
    ],
    PoS: [
        { id: 'StakerX', stake: 1500 },
        { id: 'StakerY', stake: 900 },
        { id: 'StakerZ', stake: 2100 }
    ],
    DPoS: {
        delegates: [
            { id: 'Delegate1', votes: 0 },
            { id: 'Delegate2', votes: 0 },
            { id: 'Delegate3', votes: 0 }
        ],
        voters: [
            { id: 'Voter1', vote: null },
            { id: 'Voter2', vote: null },
            { id: 'Voter3', vote: null }
        ]
    }
};

// Simulate consensus mechanisms
const simulateConsensus = () => {
    // Proof-of-Work: Highest computational power
    const powValidator = validators.PoW.reduce((prev, current) => 
        (prev.power > current.power) ? prev : current
    );
    console.log(`PoW Validator: ${powValidator.id} (Power: ${powValidator.power})`);
    console.log('  Selection Logic: Validator with highest computational power wins.\n');

    // Proof-of-Stake: Highest stake
    const posValidator = validators.PoS.reduce((prev, current) => 
        (prev.stake > current.stake) ? prev : current
    );
    console.log(`PoS Validator: ${posValidator.id} (Stake: ${posValidator.stake})`);
    console.log('  Selection Logic: Validator with highest cryptocurrency stake wins.\n');

    // Delegated Proof-of-Stake: Most votes
    validators.DPoS.voters.forEach(voter => {
        const randomDelegate = Math.floor(Math.random() * 3); // Random vote
        validators.DPoS.delegates[randomDelegate].votes++;
    });

    const dposValidator = validators.DPoS.delegates.reduce((prev, current) => 
        (prev.votes > current.votes) ? prev : current
    );
    console.log(`DPoS Validator: ${dposValidator.id} (Votes: ${dposValidator.votes})`);
    console.log('  Selection Logic: Delegates are elected by token holders via voting.');
};

// Execute
simulateConsensus();