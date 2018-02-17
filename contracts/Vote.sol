pragma solidity ^0.4.19;

contract Vote {
  address public owner;

  function Vote() {
    owner = msg.sender;
  }
}
