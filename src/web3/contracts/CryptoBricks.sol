pragma solidity >=0.4.21 <0.7.0;

contract CryptoBricks {

    address public owner;

    struct Challenge {
        uint reward;
        string parameters;
        uint time;
        address payable player;
    }

    Challenge[] public challenges;

    constructor (address initOwner) public {
        owner = initOwner;
    }

    function publishChallenge(string memory params, uint time, uint reward) public {
        challenges.push(Challenge({
            reward : reward,
            time : time,
            parameters : params,
            player: msg.sender
        }));
    }

    function getChallenge (uint256 id) public view returns (uint, string memory, uint, address) {
        Challenge memory c = challenges[id];
        return (c.reward, c.parameters, c.time, c.player);
    }

    function getNumberOfChallenges() public view returns(uint count) {
        return challenges.length;
    }
}
