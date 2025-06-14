import { ethers } from 'ethers';

const VOTE_ABI = [
  'function setCandidate(address, string, string, string, string)',
  'function getCandidate() public view returns (address[])',
  'function getCandidateData(address) public view returns (string, string, uint256, string, uint256, string, address)'
];
const VOTE_ADDR = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
export const setCandidate = async (addr, name, age, avatar) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const voteContract = new ethers.Contract(
    VOTE_ADDR,
    VOTE_ABI,
    signer,
  );

  const tx = await voteContract.setCandidate(
    addr,
    name,
    `${age}`,
    avatar,
    '',
  );

  await tx.wait();

  return tx;
}

export const getCandidates = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  // const signer = await provider.getSigner();

  const voteContract = new ethers.Contract(
    VOTE_ADDR,
    VOTE_ABI,
    provider,
  );

  const candidateAddrs = await voteContract.getCandidate();

  const details = await Promise.all(candidateAddrs.map(async (addr) => {
    const [age, name, id, avatar, totalVote, ipfs, address] = await voteContract.getCandidateData(addr);

    return {
      age,
      name,
      id,
      avatar,
      totalVote,
      ipfs,
      address,
      key: address,
    };
  }));

  return details;

}