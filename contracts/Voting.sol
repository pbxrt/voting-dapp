// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Counters.sol";
import "hardhat/console.sol";

contract Voting {
  using Counters for Counters.Counter;

  Counters.Counter public _voterId;
  Counters.Counter public _candidateId;

  address public votingOrganizer;

  // candidate
  struct Candidate {
    uint256 candidateId;
    string age;
    string name;
    string image;
    uint256 voteCount;
    address _address;
    string _ipfs; // 去中心化存储的服务
  }

  event CandidateCreate(
    uint256 indexed candidateId,
    string age,
    string name,
    string image,
    uint256 voteCount,
    address _address,
    string _ipfs
  );

  address[] public candidateAddress;
  mapping(address => Candidate) public candidates;
  // end of candidate

  struct Voter {
    uint256 voter_voterId;
    string voter_name;
    string voter_image;
    address voter_address;
    uint256 voter_allowed;
    bool voter_voted;
    uint256 voter_vote;
    string voter_ipfs;
  }

  address[] public votedVoters;
  address[] public votersAddress;
  mapping(address => Voter) public voters;

  event VoterCreate(
    uint256 indexed voter_voterId,
    string voter_name,
    string voter_image,
    address voter_address,
    uint256 voter_allowed,
    bool voter_voted,
    uint256 voter_vote,
    string voter_ipfs
  );

  constructor() {
    votingOrganizer = msg.sender;
  }

  function setCandidate(
    address _address,
    string memory _name,
    string memory _age,
    string memory _image,
    string memory _ipfs
  ) public {
    require(votingOrganizer == msg.sender, "Only organizer can set candidates");

    _candidateId.increment();

    candidateAddress.push(_address);

    Candidate storage candidate = candidates[_address];
    candidate.candidateId = _candidateId._value;
    candidate.age = _age;
    candidate.name = _name;
    candidate.image = _image;
    candidate.voteCount = 0;
    candidate._address = _address;
    candidate._ipfs = _ipfs;

    emit CandidateCreate(
      _candidateId._value,
      _age,
      _name,
      _image,
      0,
      _address,
      _ipfs
    );
  }

  function getCandidate() public view returns (address[] memory) {
    return candidateAddress;
  }

  function getCandidateLength() public view returns (uint256) {
    return candidateAddress.length;
  }

  // 获取候选人详细信息
  function getCandidateData(address _address) public view returns (
    string memory,
    string memory,
    uint256,
    string memory,
    uint256,
    string memory,
    address
  ) {
    return (
      candidates[_address].age,
      candidates[_address].name,
      candidates[_address].candidateId,
      candidates[_address].image,
      candidates[_address].voteCount,
      candidates[_address]._ipfs,
      candidates[_address]._address
    );
  }


  function voterRight(address _address, string memory _name, string memory _image, string memory _ipfs) public {
    require(votingOrganizer == msg.sender, "only organizer can add voter");
    _voterId.increment();

    uint256 idNum = _voterId.current();
    Voter storage voter = voters[_address];

    require(voter.voter_allowed == 0);

    voter.voter_allowed = 1;
    voter.voter_name = _name;
    voter.voter_image = _image;
    voter.voter_address = _address;
    voter.voter_voterId = idNum;
    voter.voter_vote = 1000;

    voter.voter_voted = false;

    voter.voter_ipfs = _ipfs;
    votersAddress.push(_address);

    emit VoterCreate(
      _voterId.current(),
      _name,
      _image,
      _address,
      1,
      false,
      1000,
      _ipfs
    );
  }

  function vote(address _candidateAddress, uint _candidateVoteId) external {
    Voter storage voter = voters[msg.sender];
    require(voter.voter_voted == false, "You have already voted");
    require(voter.voter_allowed != 0, "You are not allowed to vote");

    voter.voter_voted = true;
    voter.voter_vote = _candidateVoteId;
    votedVoters.push(msg.sender);

    candidates[_candidateAddress].voteCount += voter.voter_allowed;
  }

  function getVoterLength() public view returns (uint256) {
    return votersAddress.length;
  }

  function getVoterData(address _address) public view returns (
    uint256,
    string memory,
    string memory,
    address,
    string memory,
    uint256,
    bool
  ) {
    return (
      voters[_address].voter_voterId,
      voters[_address].voter_name,
      voters[_address].voter_image,
      voters[_address].voter_address,
      voters[_address].voter_ipfs,
      voters[_address].voter_allowed,
      voters[_address].voter_voted
    );
  }

  function getVotedVotersList() public view returns (address[] memory) {
    return votedVoters;
  }

  function getVoterList() public view returns (address[] memory) {
    return votersAddress;
  }

  function getWinner() public view returns (string memory winnerName, address winnerAddress, uint256 winnerId) {
    uint voteCount = 0;

    for (uint i = 0; i < candidateAddress.length; i++) {
      if (candidates[candidateAddress[i]].voteCount > voteCount) {
        winnerName = candidates[candidateAddress[i]].name;
        winnerAddress = candidateAddress[i];
        winnerId = candidates[candidateAddress[i]].candidateId;
      }
    }
  }
}