# Final project - School Manager with blockchain

## Deployed version url:
https://blockchain-developer-bootcamp-final-project-ssylvain1989.netlify.app/

## How to run this project locally:

### Prerequisites

- Node.js >= v14
- Truffle and Ganache
- Yarn
- `git checkout master`

### Contracts

- Run `yarn install` in project root ( back file ) to install Truffle build and smart contract dependencies
- Run local testnet in port `8545` with an Ethereum client, e.g. Ganache
- `truffle migrate --network development`
- `truffle console --network development`
- Run tests in Truffle console: `test`
- `development` network id is "*" in congif file!

### Frontend

- `cd client`
- `yarn install`
- `yarn start`
- Open `http://localhost:3000`
- make sure you have put the contract address in app.js and ConnectMetamaskButton as well !

## Screencast link


## Public Ethereum wallet for certification:


## Project description

As a class teacher, you will add a grade for your students' work.
The students will be added to the contract themselves, but you can also add them.
The idea here was that today many students cheat on their diplomas and grades to get a job or not to be punished more by their parents, with the blockchain we are solving this problem.

## Simple workflow

1. Enter service web site
2. Login with Metamask
3. If you are not thre owner you can add yoursel to the class as a student with your public ethereum wallet address and first name
4. If you are the owner you can add a grade to a student who is already registered , 10 or egal to 10 will graduated the student . If the student is not registered yet you can add him yourself.
5. The student can check on the website with his public ethereum wallet his grade and if is graduate or not 
6. You can see the counter of registered students increament when a new student is registered
7. You can see the list of registered students grow when you a new student is registered

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
