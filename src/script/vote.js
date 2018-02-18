import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import VoteJSON from '../../dist/contracts/Vote.json'
import NodeRSA from 'node-rsa'
import EthereumTx from 'ethereumjs-tx'
import keythereum from 'keythereum'

// const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

class Vote {
  /**
   * Citizen private key
   */
  privKey

  /**
   * Citizen public key
   */
  pubKey

  /**
   * Web3 instance.
   */
  web3

  /**
   * TruffleContract instance for Vote contract.
   */
  contract

  /**
   * Represents a Vote client instance.
   *
   * @class
   */
  constructor () {
    // hack for using Web3 v1.0 with TruffleContract
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send

    // initialise our Web3 instance
    if (window && window.web3) {
      console.info('[Web3] Using browser Web3 provider')
      this.web3 = new Web3(window.web3.currentProvider)
    } else {
      console.info(`[Web3] Using RPC Web3 provider (http://localhost:7545)`)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
    }

    // initialise our contract reference
    this.contract = TruffleContract(VoteJSON)
    this.contract.setProvider(this.web3.currentProvider)
    this.contract.defaults({
      gas: 900000
    })

    // RSA key generation
    this.privKey = window.localStorage.getItem('privateKey')
    if (this.privKey == null) {
      let key = new NodeRSA({b: 512})
      window.localStorage.setItem('privateKey', key.exportKey('private'))
      this.privKey = key.exportKey('private')
      window.localStorage.setItem('publicKey', key.exportKey('public'))
    }
    this.pubKey = window.localStorage.getItem('publicKey')
  }

  /* GOVERNMENT */

  async generateEncryptedWallet (identityPublicKey) {
    const dk = keythereum.create()
    const id = new NodeRSA()
    id.importKey(identityPublicKey, 'public')
    return id.encrypt(dk.privateKey)
  }

  async publishWallet (addr, encryptedPrivateKey) {
    const instance = await this.contract.deployed()
    const accounts = await this.web3.eth.getAccounts()

    await instance.publishWallet(addr, encryptedPrivateKey, {from: accounts[0]})
  }

  async addCandidate (description, image) {
    const instance = await this.contract.deployed()
    const accounts = await this.web3.eth.getAccounts()

    return await instance.addCandidate(description, image, {from: accounts[0]})
  }

  async beginVoting () {
    const instance = await this.contract.deployed()
    const accounts = await this.web3.eth.getAccounts()

    // TODO: get addresses (from localstorage?)
    const votingAddresses = []

    await instance.beginVoting(votingAddresses, this.pubKey, {from: accounts[0]})
  }

  async endVoting () {
    const instance = await this.contract.deployed()
    const accounts = await this.web3.eth.getAccounts()

    await instance.endVoting(this.privKey, {from: accounts[0]})
  }

  /* CITIZENS */

  async getWallet () {
    const instance = await this.contract.deployed()
    const accounts = await this.web3.eth.getAccounts()

    return await instance.getWallet(accounts[0], {from: accounts[0]})
  }

  async submitVote (candidateId) {
    const instance = await this.contract.deployed()
    const accounts = await this.web3.eth.getAccounts()
    const votingPublicKey = await instance.votingPublicKey() // TODO: does this work?

    let vote = {
      choice: candidateId,
      nonce: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    vote = JSON.stringify(vote)
    console.log(votingPublicKey)

    let votingKey = new NodeRSA()
    votingKey.importKey(votingPublicKey, 'public')
    let encryptedVote = votingKey.encrypt(vote)

    let citizenKey = new NodeRSA(this.privKey)
    const wallet = await instance.getWallet(accounts[0], {from: accounts[0]})
    const privateKey = Buffer.from(citizenKey.decrypt(wallet), 'hex')
    const contract = new this.web3.eth.Contract(this.contract.abi)
    const data = contract.methods.submitVote(encryptedVote).encodeABI()

    const txParams = {
      gasPrice: '0x09184e72a000',
      gasLimit: '0x2710',
      data: data,
      to: instance.address
    }

    const tx = new EthereumTx(txParams)
    tx.sign(privateKey)
    const stx = tx.serialize()

    return await this.web3.eth.sendRawTransaction('0x' + stx.toString('hex'))
  }

  async publishedWallet () {
    const instance = await this.contract.deployed()
    const accounts = await this.web3.eth.getAccounts()
    let wallet = await instance.getWallet(accounts[0], {from: accounts[0]})
    console.log(wallet)
    return wallet
  }

  async canVote () {
    const instance = await this.contract.deployed()
    const accounts = await this.web3.eth.getAccounts()
    if (await !this.publishedWallet()) {
      return false
    }
    return await instance.isVoteAvailable(accounts[0], {from: accounts[0]})
  }

  /* ANYBODY */

  async getCandidates () {
    const instance = await this.contract.deployed()
    const accounts = await this.web3.eth.getAccounts()
    let numberOfCandidates = await instance.getNumberOfCandidates({from: accounts[0]})
    let candidates = []

    for (let i = 0; i < numberOfCandidates.toNumber(); i++) {
      let c = await instance.getCandidate(i, {from: accounts[0]})
      candidates.push({
        description: c[0],
        image: c[1]
      })
    }

    return candidates
  }

  async getVotes () {
    const instance = await this.contract.deployed()
    const votingPrivateKey = await instance.votingPrivateKey() // TODO: does this work?

    let encryptedVotes = await instance.encryptedVotes() // TODO: does this work?
    // TODO: decrypt votes
    console.log(encryptedVotes, votingPrivateKey)
    let votes = []

    return votes
  }
}

// class Web3Error extends Error {
//   constructor (...args) {
//     super(...args)
//
//     this.name = this.constructor.name
//
//     if (Error.captureStackTrace) {
//       Error.captureStackTrace(this, this.constructor)
//     }
//   }
// }

export default Vote
