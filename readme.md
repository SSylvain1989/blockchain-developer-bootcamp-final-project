# Final project - School Manager with blockchain

## Deployed version url:

## How to run this project locally:

### Prerequisites

- Node.js >= v14
- Truffle and Ganache
- Yarn
- `git checkout master`

### Contracts

- Run `yarn install` in project root ( back file ) to install Truffle build and smart contract dependencies
- Run local testnet in port `7545` with an Ethereum client, e.g. Ganache
- `truffle migrate --network development`
- `truffle console --network development`
- Run tests in Truffle console: `test`
- `development` network id is 1337, remember to change it in Metamask as well!

### Frontend

- `cd client`
- `yarn install`
- `yarn start`
- Open `http://localhost:3000`

### How to populate locally deployed contract with listings

- `truffle migrate --network development`
- `truffle console --network development`

- dont know what is this below : 
- `let rr = await Rentals.deployed()`
- Add two listings:
- `rr.addProperty(web3.utils.toWei("0.00156"), "Hämeentie 77", "Duplex with a nice view", "https://google.com","https://www.hermannikuvia.fi/wp-content/uploads/Hameentie-77-sisapiha.jpg")`
- `rr.addProperty(web3.utils.toWei("0.002"), "Mannerheimintie 30 A", "Duplex with a really bad view", "https://google.com","https://www.finna.fi/Cover/Show?id=hkm.HKMS000005%3Akm002zsb&index=0&size=large&source=Solr")`
- Send ETH to local wallet: `web3.eth.sendTransaction({ from: "<your local address>", to: "<your local network wallet>", value: web3.utils.toWei("10") })`
- *********
- `cd client && yarn start`
- Open local ui from `http://localhost:3000`
- Make sure your Metamask localhost network is in port `8545` and chain id is `1337`.
- If you get `TXRejectedError` when sending a transaction, reset your Metamask account from Advanced settings.

## Screencast link


## Public Ethereum wallet for certification:


## Project description

Your a the teacher of a class , 

## Simple workflow

1. Enter service web site
2. Login with Metamask
3. Add a student with his public ethereum wallet and his first name
4. Add a grade to this same student , 10 or egal to 10 will graduated the student 
5. The student can check on the website with his public ethereum wallet his grade and if is graduate or not 
6. You can see the counter of registered students increament when you add one 
7. You can see the list of registered students grow when you add one

## Directory structure

- `client`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.

## Environment variables (not needed for running project locally)

```
ROPSTEN_INFURA_PROJECT_ID=
ROPSTEN_MNEMONIC=
```

## TODO features

1. Add a workflow for send a nft of the diploma to the gratuade student
