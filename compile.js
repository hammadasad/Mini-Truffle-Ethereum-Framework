// This is the compile script that compiles our smart contract(s)

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

const source = fs.readFileSync(inboxPath, 'utf8');

// So now whenever we require this file, we get our contract info
module.exports = solc.compile(source, 1).contracts[':Inbox'];

