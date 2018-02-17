pragma solidity ^0.4.19;

contract Vote {
  address public owner;
  bool public votingHasStarted;
  bool public votingHasEnded;
  string public votingPublicKey;
  string public votingPrivateKey;
  Candidate[] public candidates;

  mapping (address => string) addressEncryptedPrivateKeyMapping;
  mapping (address => bool) canVoteMapping;

  string[] public encryptedVotes;

  // for storing a potential candidate
  struct Candidate {
    string description;
    string image; // base64 encoded (small!) image
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
  function publishWallet(address addr, string encryptedPrivateKey) restricted() preVotingPeriod() public {
    addressEncryptedPrivateKeyMapping[addr] = encryptedPrivateKey;
  }

  // add a new candidate
  function addCandidate(string description, string image) restricted() preVotingPeriod() public returns (uint candidateId) {
    candidateId = candidates.length++;
    Candidate storage c = candidates[candidateId];
    c.description = description;
    c.image = image;
    return candidateId;
  }

  // begin the voting period
  function beginVoting(address[] votingAddresses, string publicKey) restricted() preVotingPeriod() public {
    votingHasStarted = true;
    for (uint i = 0; i < votingAddresses.length; i++) {
      canVoteMapping[votingAddresses[i]] = true;
    }
    votingPublicKey = publicKey;
  }

  // end the voting period
  function endVoting(string privateKey) restricted() votingPeriod() public {
    votingHasEnded = true;
    votingPrivateKey = privateKey;
  }

  /* CITIZENS */

  function getWallet(address addr) public view returns (string encryptedPrivateKey) {
    return addressEncryptedPrivateKeyMapping[addr];
  }

  function submitVote(string encryptedVote) votingPeriod() canVote() public {
    encryptedVotes.push(encryptedVote);
    canVoteMapping[msg.sender] = false;
  }

  function isVoteAvailable(address addr) public view returns (bool isVoteAvailable) {
    if (!votingHasStarted || votingHasEnded) {
      return false;
    }
    return canVoteMapping[addr];
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
