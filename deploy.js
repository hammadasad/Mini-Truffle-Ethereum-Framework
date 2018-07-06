const HDWalletProvider = require('truffle-hdwallet-provider'); // To connect to a target network
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// Single mnemonic can be used to generate many accounts
// Infura allows us to connect to a real node on the network instead of setting up one manually
const provider = new HDWalletProvider(
    '<insert 12 word mnemonic',
    'https://rinkeby.infura.io/<key>'
);

const web3 = new Web3(provider);

// Function to utilize await / async
const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log("Deploying from account " + accounts[0]);

    const instance = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data : bytecode, arguments : ["Hello!"] })
        .send({ gas : '1000000', from : accounts[0] });

    // Address our contract got deployed to
    console.log("Contract was deployed to " + instance.options.address);
};

deploy();
