const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');

// use Infura
// make sure to increase rate limiting
// Issue Fix: https://github.com/ChainSafe/web3.js/issues/3145

const provider = new HDWalletProvider(
    'sleep jeans eyebrow cover equal cradle tooth dream hour true travel soldier',
    `https://goerli.infura.io/v3/dfde463782fb4397ad5538a5aecad17e`
);

const web3 = new Web3(provider);

let contract;
const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account ' + accounts[0]);

    contract = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode.object })
    .send({ from: accounts[0], gas: '1000000' });

    console.log(JSON.stringify(abi)) // this is very important (JSON stringify)
    console.log('contract deployed to: ' + contract.options.address);
    provider.engine.stop();

    // Deployed to address: 0x551D6871F19bc14e8593f19CEF1c8A22a430f4a7
    
    // ABI Code
    // [{
    //     "inputs": [],
    //     "stateMutability": "nonpayable",
    //     "type": "constructor",
    //     "signature": "constructor"
    // }, {
    //     "inputs": [],
    //     "name": "enter",
    //     "outputs": [],
    //     "stateMutability": "payable",
    //     "type": "function",
    //     "payable": true,
    //     "signature": "0xe97dcb62"
    // }, {
    //     "inputs": [],
    //     "name": "getPlayers",
    //     "outputs": [{
    //         "internalType": "address payable[]",
    //         "name": "",
    //         "type": "address[]"
    //     }],
    //     "stateMutability": "view",
    //     "type": "function",
    //     "constant": true,
    //     "signature": "0x8b5b9ccc"
    // }, {
    //     "inputs": [],
    //     "name": "manager",
    //     "outputs": [{
    //         "internalType": "address",
    //         "name": "",
    //         "type": "address"
    //     }],
    //     "stateMutability": "view",
    //     "type": "function",
    //     "constant": true,
    //     "signature": "0x481c6a75"
    // }, {
    //     "inputs": [],
    //     "name": "pickWinner",
    //     "outputs": [],
    //     "stateMutability": "nonpayable",
    //     "type": "function",
    //     "signature": "0x5d495aea"
    // }, {
    //     "inputs": [{
    //         "internalType": "uint256",
    //         "name": "",
    //         "type": "uint256"
    //     }],
    //     "name": "players",
    //     "outputs": [{
    //         "internalType": "address payable",
    //         "name": "",
    //         "type": "address"
    //     }],
    //     "stateMutability": "view",
    //     "type": "function",
    //     "constant": true,
    //     "signature": "0xf71d96cb"
    // }]
    

}

deploy();