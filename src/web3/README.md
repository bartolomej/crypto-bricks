# Smart contracts docs

You need to install [truffle](https://www.trufflesuite.com/truffle) 
development tool and [ganache](https://www.trufflesuite.com/ganache) test blockchain environment.

## Developing

Compile contracts in `/contracts`: 
```bash
→ truffle compile
```

Deploy contracts:
```bash
→ truffle deploy
```

Get number of challenges:
```bash
→ truffle develop

truffle(develop)> CryptoBricks.deployed().then(instance => instance.getNumberOfChallenges.call()).then(value => value.toNumber());
```

Publish challenge:
```bash
truffle(develop)> CryptoBricks.deployed().then(instance => instance.publishChallenge('someParams', 10, 32))
```

Get challenge by id:
```bash
→ truffle develop

truffle(develop)> CryptoBricks.deployed().then(instance => instance.getChallenge(0)).then(value => value);
```
