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

Get message from `HelloWorld.sol` contract:
```bash
→ truffle develop

truffle(develop)> HelloWorld.deployed().then(function(instance){return instance.get.call();}).then(function(value){return value.toString()});
```

Update message of `HelloWorld.sol` contract:
```bash
truffle(develop)> HelloWorld.deployed().then(function(instance){return instance.update("Hello World 2!!");});
```
