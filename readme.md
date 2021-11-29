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

## Screencast link


## Public Ethereum wallet for certification:


## Project description

Your a the teacher of a class , you will add your students and grade their job .

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
