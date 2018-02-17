pragma solidity ^0.4.19;

contract Vote {
  address public owner;
  bool public votingHasStarted;
  bool public votingHasEnded;
  Candidate[] public candidates;

  mapping (address => string) addressEncryptedPrivateKeyMapping;
  mapping (address => bool) canVoteMapping;

  // for storing a potential candidate
  struct Candidate {
    string description;
    uint votes;
  }

  // only owner can call
  modifier restricted() {
    if (msg.sender == owner) _;
  }

  // can only be called pre voting period
  modifier preVotingPeriod() {
    if (!votingHasStarted) _;
  }

  // can only be called during voting period
  modifier votingPeriod() {
    if (votingHasStarted && !votingHasEnded) _;
  }

  // can only be called if the sender is allowed to vote and has not already
  modifier canVote() {
    if (canVoteMapping[msg.sender]) _;
  }

  // constructor
  function Vote() public {
    owner = msg.sender;
  }

  /* GOVERNMENT */

  // publish the encrypted voting wallet for a given citizen address
  function publishWallet(address addr, address votingAddr, string encryptedPrivateKey) restricted() preVotingPeriod() public {
    addressEncryptedPrivateKeyMapping[addr] = encryptedPrivateKey;
    canVoteMapping[votingAddr] = true;
  }

  // add a new candidate
  function addCandidate(string description) restricted() preVotingPeriod() public returns (uint candidateId) {
    candidateId = candidates.length++;
    Candidate storage c = candidates[candidateId];
    c.description = description;
    c.votes = 0;
    return candidateId;
  }

  // begin the voting period
  function beginVoting() restricted() preVotingPeriod() public {
    votingHasStarted = true;
  }

  // end the voting period
  function endVoting() restricted() votingPeriod() public {
    votingHasEnded = true;
  }

  /* CITIZENS */

  function getWallet(address addr) public view returns (string encryptedPrivateKey) {
    return addressEncryptedPrivateKeyMapping[addr];
  }

  function submitVote(uint candidateId) votingPeriod() canVote() public {
    require(candidateId < candidates.length);
    candidates[candidateId].votes++;
    canVoteMapping[msg.sender] = false;
  }

  /* ANYBODY */

  function getNumberOfCandidates() public view returns (uint numberOfCandidates) {
    return candidates.length;
  }

  function getCandidate(uint candidateId) public view returns (Candidate candidate) {
    require(candidateId < candidates.length);
    return candidates[candidateId];
  }
}
