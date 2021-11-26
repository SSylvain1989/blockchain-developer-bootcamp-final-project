// import React, { useEffect, useState } from 'react';
import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from './wallet/connectors';

export default function ConnectMetamaskButton() {
  const { active, account, activate, deactivate } = useWeb3React()

  // @active: is there a wallet actively connected right now?
  // @account: broadcast the blockchain account / address
  // @library: web3 ou etherJs 
  // @connector: the current connector ? injected here
  // @activate: is the method to connect the wallet
  // @deactivate: is the method to disconnect the wallet
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
    <div className="buttonMetamask">
      <br />
      {active && activate
        ?
        <div>
          <button className="metamaskButton" onClick={disconnect}>Disconnect Metamask</button>
          <br />
          <span className="metamaskSpan">Connected with : {account.slice(0, 10)}...</span>
        </div>
        :
        <div>
          <button className="metamaskButton" onClick={connect}>Connect Metamask</button>
        </div>
      }
      <br />
    </div>
  )

}