import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from './wallet/connectors';

export default function ConnectMetamaskButton () {

 // @active: is there a wallet actively connected right now?
 // @account: broadcast the blockchain account / address
 // @library: web3 ou etherJs 
 // @connector: the current connector ? injected here
 // @activate: is the method to connect the wallet
 // @deactivate: is the method to disconnect the wallet
 const { active, account, library, connector, activate, deactivate } = useWeb3React()
 async function connect() {
  try {
   await activate(injected)
  } catch (error) {
   console.log(error)
  }
 }
 async function disconnect() {
  try {
    deactivate(injected)
  } catch (error) {
   console.log(error)
  }
 }
 return (

  <div>
   <button onClick={connect}>connect to metamask</button>
   <br />
   {active 
   ? 
   <span>Connected with account number : {account}</span>
   :
   <span>not connected</span>
   }
   <br />
      <button onClick={disconnect}>disconnect from metamask</button>

  </div>
 )

}