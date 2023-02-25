const path = require('path');
const fs = require('fs');
const solc = require('solc')

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol'); 
const source = fs.readFileSync(lotteryPath, 'utf8');

const input = {
    language:'Solidity',
    sources: {
        'Lottery.sol': {
            content: source
        }
    },
    settings: {
        optimizer:
        {
            enabled: true
        },
        outputSelection: {
            '*' : {
                '*': ['*']
            }
        }
    }
}

// const contract = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol']['Lottery'];
const contract = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'].Lottery;

const { abi, evm } = contract;
const { bytecode, deployedBytecode, gasEstimates } = evm;

module.exports = { abi, bytecode, deployedBytecode, gasEstimates };