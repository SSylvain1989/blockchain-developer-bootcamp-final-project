import React, { useState, useEffect } from "react";
// import { useWeb3React } from '@web3-react/core';
import { schoolManager } from "../abi/abi";
import Web3 from "web3";
import {ethers} from 'ethers'

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x9Bc3ad57d23F81a97edB77473D65800B8222F55c";
// @notice: contract contain address contract and ABI 
const contract = new web3.eth.Contract(schoolManager, contractAddress);

export default function ConnectMetamaskButton({childToParent}) {
  // @active: is there a wallet actively connected right now?
  // @account: broadcast the blockchain account / address
  // @library: web3 ou etherJs 
  // @connector: the current connector ? injected here
  // @activate: is the method to connect the wallet
  // @deactivate: is the method to disconnect the wallet
  const [ownerMessage, setOwnerMessage] = useState("");
  const [networkMessage, setNetworkMessage] = useState("");
  const [urlMessage, setUrlMessage] = useState("");
  const[errorMessage, setErrorMessage] = useState(null);
  const[defaultAccount, setDefaultAccount]=useState(null);
  const[userBalance, setUserBalance]=useState(null);
  const[connButtonText, setConnButtonText] = useState('Connect Wallet');

  const connectWalletHandler = async () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
    console.log('MetaMask Here!');
      // listen for account changes
window.ethereum.on('accountsChanged', accountChangedHandler, getTheOwner);

window.ethereum.on('chainChanged', chainChangedHandler);

getTheOwner();
web3.eth.net.getId().then(netId => {
  let url = window.location.href;
  switch (netId) {
    case 1:
      if ( url.includes('netlify') ) {
        setUrlMessage('👉 We only support Ropsten network, and you are on :')
        setNetworkMessage('Mainnet network  🛑  change network for continue please');
      }
      else {
        setUrlMessage('👉 We only support localhost network, and you are on :')
        setNetworkMessage('Mainnet network  🛑  change network for continue please');
      }
      break
    case 2:
      break
    case 3:
      if ( url.includes('netlify') ) {
        setUrlMessage('👉 We only support Ropsten network, and you are on :')
        setNetworkMessage('Ropsten network 🙂 good to go 💪');
      }
      else {
        setUrlMessage('👉 We only support Localhost network, and you are on :')
        setNetworkMessage('Ropsten network  🛑  change network for continue please');
      }
      break
      case 4:
        if ( url.includes('netlify') ) {
          setUrlMessage('👉 We only support Ropsten network, and you are on :')
          setNetworkMessage('Rinkeby network  🛑  change network for continue please');
        }
        else {
          setUrlMessage('👉 We only support localhost network, and you are on :')
          setNetworkMessage('Rinkeby network  🛑  change network for continue please ');
        }
        break
      case 42:
        if ( url.includes('netlify') ) {
          setUrlMessage('👉 We only support Ropsten network, and you are on :')
          setNetworkMessage('Kovan network  🛑  change network for continue please');
        }
        else {
          setUrlMessage('👉 We only support localhost network, and you are on :')
          setNetworkMessage('Kovan network  🛑  change network for continue please');
        }
      break
    default:
      if ( url.includes('netlify') ) {
        setUrlMessage('👉 We only support Ropsten network, and you are on :')
        setNetworkMessage('Localhost or unknow network  🛑  change network for continue please');
      }
      else {
        setUrlMessage('👉 We only support localhost network, and you are on : ')
        setNetworkMessage('Localhost network 🙂');
      }
  }
})

    let chainId= await window.ethereum.request({method: 'eth_chainId'})
    if(chainId!== '3') {
      setNetworkMessage("This dapp only works on the Ropsten testnet for now. Please switch to Ropsten to interact with the dapp.");
    } else {
      setNetworkMessage("");
    }

    window.ethereum.request({ method: 'eth_requestAccounts'})
    .then(result => {
      accountChangedHandler(result[0]);
      setConnButtonText('Wallet Connected');
      getAccountBalance(result[0]);
      setErrorMessage('');
    })
    .catch(error => {
      setErrorMessage('Wallet not connected');
      setConnButtonText('Connect Wallet');
      setUserBalance('');
      setDefaultAccount('Need to connect your wallet to interact ❗️')
      console.log(error)
    
    });

  } else {
    console.log('Need to install MetaMask');
    setErrorMessage('Please install MetaMask browser extension to interact');
  }
  }

  const accountChangedHandler = (newAccount) => {
  getTheOwner();
  setDefaultAccount(`Connected with : ${newAccount}`);
  getAccountBalance(newAccount.toString());
}

const getAccountBalance = (account) => {
  window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
  .then(balance => {
    setUserBalance(ethers.utils.formatEther(balance));
  })
  .catch(error => {
    setErrorMessage(error.message);
  });
};

const chainChangedHandler = () => {
  // reload the page to avoid any errors with chain change mid use of application
  window.location.reload();
}


  useEffect(() => {
    connectWalletHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultAccount]);
  
  async function getTheOwner() {
    console.log("in getTheOwner fonction")
    const accounts = await window.ethereum.enable();
    console.log("in getTheOwner fonction accounts", accounts)
    const account = accounts[0];
    console.log("in getTheOwner fonction account", account)
    await contract.methods.owner().call()
      .then(receipt => {
        console.log("TheOwner", receipt)
        if (receipt.toLowerCase() === account) {
          setOwnerMessage("Wonderfull you are the owner of this contrat 😉")
          childToParent(true);
        }
        else {
          setOwnerMessage("❗️ You are not the owner of this contrat but you can yourself as a student and wait for your teacher to get a grade 😉")
          childToParent(false);
        }
      })
      .catch(err => {
        console.log('error , maybe you have no eth on this account ?  ', err)
      })
  };

  return (
    <div className="connectDiv">
      <div className="buttonMetamask">
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <br />
      <p className="metamaskSpan">{errorMessage}</p>
      {defaultAccount
      ?
      <>
      <span className="metamaskSpan">{defaultAccount}</span>
      <p className="metamaskSpan">Balance: {isNaN(Number.parseFloat(userBalance).toFixed(10)) ? "": Number.parseFloat(userBalance).toFixed(10) } ETH</p>
      </>
      : 
      <p className="metamaskSpan">🛑 Connect you wallet to interact 🛑</p>
      }

      </div>
      <div className="">
        <p className="connectMessage">{urlMessage}</p>
        <p className="connectMessage">{networkMessage}</p>
        <p className="connectMessage">{ownerMessage}</p>
        <br />
      </div>
    </div>
  )

}