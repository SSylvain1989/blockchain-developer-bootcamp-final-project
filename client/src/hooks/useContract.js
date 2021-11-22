import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import schoolManager from '../contracts/SchoolManager.json';

const toWei = Web3.utils.toWei;

const metamaskLogin = async () => {
  const provider = await detectEthereumProvider();
  return provider.request({ method: "eth_requestAccounts" });
};

export default function UseContract() {

 return {
   
 //  const contract = new web3.eth.Contract(
 //   contractInterface.abi,
 //   "addresContract"
 // );
 }
}