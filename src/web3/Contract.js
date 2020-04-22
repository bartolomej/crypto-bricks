import Web3 from 'web3';
import artifact from './build/contracts/CryptoBricks.json';


export default class Contract {

  constructor () {
    this.web3 = null;
  }

  async initWeb3 () {
    const devProvider = process.env.REACT_APP_WEB3_PROVIDER;
    if (process.env.NODE_ENV === 'development' && devProvider) {
      this.web3 = new Web3(new Web3.providers.HttpProvider(devProvider));
    } else if (Web3.givenProvider) {
      this.web3 = new Web3(Web3.givenProvider);
    } else {
      throw new Error('No web3 providers')
    }
    try {
      const accounts = await this.web3.eth.getAccounts();
      this.account = accounts[0];
      console.log(accounts)
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async initContract () {
    const networkId = await this.web3.eth.net.getId();
    const deployedNetwork = artifact.networks[networkId];
    this.contract = new this.web3.eth.Contract(
      artifact.abi,
      process.env.REACT_APP_CONTRACT_ADDRESS || deployedNetwork.address,
    );
  }

  async getChallenges () {
    const { getNumberOfChallenges, getChallenge } = this.contract.methods;
    let results = [];
    const maxId =  Number.parseInt(await getNumberOfChallenges().call());
    for (let i = 0; i < maxId; i++) {
      const tuple = await getChallenge(i).call();
      results.push({
        reward: parseFloat(tuple[0]),
        params: tuple[1],
        time: parseFloat(tuple[2]),
        player: tuple[3]
      });
    }
    return results;
  }

}
