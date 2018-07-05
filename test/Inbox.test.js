const assert = require('assert');
const ganache = require('ganache-cli');

// Requiring a constructor function, hence capitalized
const Web3 = require('web3');

// provider is what we use to communicate between web3 and the ganache network
const web3 = new Web3(ganache.provider());

// Mocha
// it -> run a test and make assertion
// describe -> group our 'it' functions together
// beforeEach -> excute some general setup code

// Web3 uses unlocked accounts / 100% accessible.
// Freely send and receive ether without concern of public / private keys

beforeEach(() => {
    // Get a list of all accounts
    const list = web3.eth.getAccounts()
        .then(fetchedAccounts => {
            console.log(fetchedAccounts);
        });
    // Use one account to deploy contract
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        
    });
});








