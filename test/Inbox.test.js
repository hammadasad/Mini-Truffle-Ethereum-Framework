const assert = require('assert');
const ganache = require('ganache-cli');

require('events').EventEmitter.prototype._maxListeners = 100;

// Requiring a constructor function, hence capitalized
const Web3 = require('web3');

// provider is what we use to communicate between web3 and the ganache network
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

// Mocha
// it -> run a test and make assertion
// describe -> group our 'it' functions together
// beforeEach -> excute some general setup code

// Web3 uses unlocked accounts / 100% accessible.
// Freely send and receive ether without concern of public / private keys

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one account to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface)) // Teaches web3 about what methods Inbox contract has
        .deploy({ data : bytecode, arguments : ["Hi"] }) // Tells web3 that we want to deploy a new copy of this contract
        .send({ from : accounts[0], gas : '1000000'}); // Instructs web3 to send out a transaction that creates this contract

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    // Calling a default method like message, we make 2 calls
    // message() -> Takes in the parameters to the method
    // .call() or send() -> actually calls it/sends transaction to network, customizes the transaction too
    // pass in who's going to make the transaction/pay and how much gas used
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi');
    });

    // // inbox.methods is how we access our contract in general
    it('can change the message', async () => {
        await inbox.methods.setMessage("Bye").send(
            {
                from : accounts[0]
            }
        );
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye');
    });
});






