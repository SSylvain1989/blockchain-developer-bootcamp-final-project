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

export default function ConnectMetamaskButton({childToParent}) {
  const { activate, deactivate  } = useWeb3React()

  // @active: is there a wallet actively connected right now?
  // @account: broadcast the blockchain account / address
  // @library: web3 ou etherJs 
  // @connector: the current connector ? injected here
  // @activate: is the method to connect the wallet
  // @deactivate: is the method to disconnect the wallet
  const [isConnected, setIsConnected] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ownerMessage, setOwnerMessage] = useState("");
  const [networkMessage, setNetworkMessage] = useState("");
  const [urlMessage, setUrlMessage] = useState("");
  const [metamaskMessage, setMetamaskMessage] = useState("");
  useEffect(() => {
    checkIfuserIsLog();
    getTheOwner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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
  web3.eth.net.getId().then(netId => {
    let url = window.location.href;
    switch (netId) {
      case 1:
        if ( url.includes('netlify') ) {
          setUrlMessage('We support only Ropsten network, and you are on :')
          setNetworkMessage('Ropsten network ');
        }
        else {
          setUrlMessage('We support only localhost network, and you are on :')
          setNetworkMessage('mainnet network 🙁');
        }
        break
      case 2:
        break
      case 3:
        if ( url.includes('netlify') ) {
          setUrlMessage('We support only Ropsten network, and you are on :')
          setNetworkMessage('Ropsten network 🙂');
        }
        else {
          setUrlMessage('We support only localhost network, and you are on :')
          setNetworkMessage('Ropsten network 🙁');
        }
        break
        case 4:
          if ( url.includes('netlify') ) {
            setUrlMessage('We support only Ropsten network, and you are on :')
            setNetworkMessage('Rinkeby network 🙁');
          }
          else {
            setUrlMessage('We support only localhost network, and you are on :')
            setNetworkMessage('Rinkeby network 🙁');
          }
          break
        case 42:
          if ( url.includes('netlify') ) {
            setUrlMessage('We support only Ropsten network, and you are on :')
            setNetworkMessage('Kovan network 🙁 ');
          }
          else {
            setUrlMessage('We support only localhost network, and you are on :')
            setNetworkMessage('Ropsten network 🙁');
          }
        break
      default:
        if ( url.includes('netlify') ) {
          setUrlMessage('We support only Ropsten network, and you are on :')
          setNetworkMessage('localhost or unknow network 🙁');
        }
        else {
          setUrlMessage('We support only localhost network, and you are on : ')
          setNetworkMessage('localhost network 🙂');
        }
    }
  })

  window.ethereum.on('chainChanged', handleChainChanged);
  function handleChainChanged(_chainId) {
    window.location.reload();
  }

  async function getTheOwner() {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    await contract.methods.owner().call()
      .then(receipt => {
        if (receipt.toLowerCase() === account) {
          setOwnerMessage("Wonderfull you are the owner of this contrat 😉")
          childToParent(true);
        }
        else {
          setOwnerMessage("❗️ You are not the owner of this contrat you can yourself as a student and wait for your teacher to get a grade 😉")
          childToParent(false);
        }
      })
      .catch(err => {
        console.log('error , maybe you have no gas on this account ?  ', err)
      })
  };

  window.ethereum.on('accountsChanged', function (accounts) {
    setAccountNumber(accounts[0]);
    setIsConnected(true);
    getTheOwner();
  })

  async function connect() {
    try {
      await activate(injected)
      setIsConnected(true);
      getTheOwner();
      setMetamaskMessage("");
    } catch (error) {
      console.log(error)
    }
  }
  async function disconnect() {
    try {
      deactivate(injected)
      setIsConnected(false);
      setOwnerMessage("");
      setMetamaskMessage("Please connect to your Metamask account 👇");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="connectDiv">
      <div className="">
        <p className="connectMessage">{urlMessage}</p>
        <p className="connectMessage">{networkMessage}</p>
        <p className="connectMessage">{ownerMessage}</p>
        <br />
        <p className="connectMessage">{metamaskMessage}</p>
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