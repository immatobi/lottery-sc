// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.12;

contract Lottery {

    address public manager;
    address payable [] public players;

    //constructor
    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }

    function pickWinner() public restricted{

        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address payable [](0); // reset players so a new lottery can run;
    }

    function getPlayers() public view returns(address payable [] memory){
        return players;
    }

    // Pseudo-random: not truly random, it can be figured out
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    // use modifiers to create function modifiers
    modifier restricted() {
        require(msg.sender == manager); //make sure only a manager can pick a winner
        _; // this means, run all the other code in that function
    }

}