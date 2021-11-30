import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import { schoolManager } from "../abi/abi";
import Web3 from "web3";
import { injected } from './wallet/connectors';
import { reduceAddress } from '../util/reduceAddress';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x9Bc3ad57d23F81a97edB77473D65800B8222F55c";
// @notice: contract contain address contract and ABI 
const contract = new web3.eth.Contract(schoolManager, contractAddress);

export default function ConnectMetamaskButton({text}) {
  const { activate, deactivate } = useWeb3React()

  // @active: is there a wallet actively connected right now?
  // @account: broadcast the blockchain account / address
  // @library: web3 ou etherJs 
  // @connector: the current connector ? injected here
  // @activate: is the method to connect the wallet
  // @deactivate: is the method to disconnect the wallet
  const [isConnected, setIsConnected] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ownerMessage, setOwnerMessage] = useState("");
  useEffect(() => {
    checkIfuserIsLog();
    getTheOwner();
  }, [accountNumber]);
  async function checkIfuserIsLog() {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    if (account.length > 0) {
      setIsConnected(true);
      setAccountNumber(accounts[0]);
    }
    else {
      setIsConnected(false);
    }
  }

  async function getTheOwner() {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log('je pass là')
    await contract.methods.owner().call()
      .then(receipt => {
        console.log('is connected user is owner :', receipt.toLowerCase() === account)
        if (receipt.toLowerCase() === account) {
          setOwnerMessage("Wonderfull you are the owner of this contrat 😉")
        }
        else {
          setOwnerMessage("❗️ You are not the owner of this contrat you can only check view function below 😉")
        }
      })
      .catch(err => {
        alert('error , maybe you have no gas on this account ?  ', err)
      })
  };

  window.ethereum.on('accountsChanged', function (accounts) {
    setAccountNumber(accounts[0]);
    setIsConnected(true);
  })

  async function connect() {
    try {
      await activate(injected)
      setIsConnected(true);
      console.log("je passe ici")
      getTheOwner();
    } catch (error) {
      console.log(error)
    }
  }
  async function disconnect() {
    try {
      deactivate(injected)
      setIsConnected(false);
      setOwnerMessage("");
    } catch (error) {
      console.log(error)
    }
  }
  console.log(isConnected)
  return (
    <div className="connectDiv">
      <div className="ownerMessage">
      <p>{ownerMessage}</p>
      </div>
    <div className="buttonMetamask">
      <br />
      {isConnected
        ?
        <div>
          <button className="metamaskButton" onClick={disconnect}>Disconnect Metamask</button>
          <br />
          <span className="metamaskSpan">Connected with {reduceAddress(accountNumber)}</span>
        </div>
        :
        <div>
          <button className="metamaskButton" onClick={connect}>Connect Metamask</button>
        </div>
      }
      <br />
      </div>
    </div>
  )

}