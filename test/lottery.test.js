const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require('../compile');

let accounts, contract;
beforeEach( async () => {

    // console.log(abi);

    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of the accounts to deploy the contract
    // calling deploy() only creates the object to be deployed
    // send() does the real work
    contract = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode.object })
    .send({ from: accounts[0], gas: '1000000' });

    // 
})

// test
describe('Lottery Contract', () => {

    // test if a contract is deployed
    it('deploys contract', () => {
        assert.ok(contract.options.address);
    });
    
    it('allows one account to enter', async () => {

        await contract.methods.enter().send({
            from: accounts[0], 
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await contract.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);

    });

    it('allows multiple accounts to enter', async () => {

        await contract.methods.enter().send({
            from: accounts[0], 
            value: web3.utils.toWei('0.02', 'ether')
        });

        await contract.methods.enter().send({
            from: accounts[1], 
            value: web3.utils.toWei('0.02', 'ether')
        });

        await contract.methods.enter().send({
            from: accounts[2], 
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await contract.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);

    });

    it('requires a minimum amount of ether enter', async () => {

        try {

            await contract.methods.enter().send({
                from: accounts[0],
                value: 200 // 200 wei
            });

            assert(false); // make sure our test fails to move to catch block
            
        } catch (err) {
            assert(err);
        }

    })

    it('requires manager to pick a winner', async () => {

        try {

            await contract.methods.pickWinner().send({
                from: accounts[1] // not the manager
            })

            assert(false); // make sure our test fails to move to catch block
            
        } catch (err) {
            assert(err);
        }

    })

    it('plays the game and sends money to winner', async () => {

        // enter with the manager
        await contract.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        // get initial balance
        const initBal = await web3.eth.getBalance(accounts[0])

        // pick winner
        await contract.methods.pickWinner().send({ from: accounts[0] });

        // get final balance
        const finalBal = await web3.eth.getBalance(accounts[0])

        const diff = finalBal - initBal;
        
        assert(diff > web3.utils.toWei('1.8', 'ether'));

    })

})