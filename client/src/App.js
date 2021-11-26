import React, { useState, useEffect } from "react";
import { schoolManager } from "./abi/abi";
import Web3 from "web3";
// import { useWeb3React } from '@web3-react/core';

import ConnectMetamaskButton from './components/ConnectMetamaskButton'
import './App.css';

// @notice: web3 is the connection with metamask
const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0xfF90414e2736778aF4904A0408055ca2220117e5";
// @notice: contract contain address contract and ABI 
const contract = new web3.eth.Contract(schoolManager, contractAddress);

function App() {
  useEffect(() => {
    getStudentCount();
    getListStudents();
  },[]);
  // const { account } = useWeb3React()
  // console.log(account);
  const [firstName, setFirstName] = useState('');

  const [addressStudent, setAddressStudent] = useState('');
  const [grade, setGrade] = useState('');
  
  async function addStudent() {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    await contract.methods.addStudent(addressStudent, firstName)
      .send({
        from: account,
      })
      .then((receipt) => {
        console.log('receipt addStudent:', receipt)
      })
      .then((err) => {
        console.log('erreur addStudent:', err)
      })
  };

  async function addGrade() {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    await contract.methods.addGrade(addressStudent, grade)
      .send({
        from: account,
      })
      .then((receipt) => {
        console.log('receipt addGrade:', receipt)
      })
      .then((err) => {
        console.log('erreur addGrade:', err)
      })
  };

  async function getStudentCount() {
    await contract.methods.getStudentCount().call()
    .then(receipt => {
        const studentCount = document.getElementById('studentCount');
        console.log('studentCount',studentCount)
        console.log('studentCount:',typeof receipt)
        studentCount.innerHTML = `${receipt}`;
      })
      .catch(err => {
        console.log('erreur getStudentCount:', err)
      })
  };

  async function getListStudents() {
    await contract.methods.getListStudents().call()
      .then(receipt => {
        let studList = document.getElementById('studList');
        studList.innerHTML = '';
        for (let i = 0; i < receipt.length; i++) {
          console.log('studentListe:',receipt[i])
          studList.innerHTML = `${studList.innerHTML} ${receipt[i]}<br/>`;
        }
      })
      .catch(err => {
        alert('erreur', err)
      })
  };



  return (
    <>
    <div className="header">
      <div className="headerText">
      <h1>School Manager</h1>
      <p>After deploy contract you will get the role of manager of the school</p>
      <p>You can add Teacher , Teacher can add Student</p>
      <p>Student get Grades from Teacher only</p>
      </div>
      <div className="headerConnection">
      <ConnectMetamaskButton />
        </div>
    </div>
      <div className="main">
        <div className="card">
          
          <div className="addTeacher">
          <label htmlFor="">Add Student Form</label>
          <input
            id="addressStudent"
            value={addressStudent}
            placeholder="Enter Student address account.."
            autoComplete="off"
            onChange={e => setAddressStudent(e.target.value)}
          >
          </input>
          <label htmlFor="">firstName</label>
          <input
            id="firstNameStudent"
            value={firstName}
            placeholder="Enter Student firstName.."
            autoComplete="off"
            onChange={e => setFirstName(e.target.value)}
          >
          </input>
          <button onClick={addStudent}>Add Student</button>
          <br />
          </div>

          <div className="addTeacher">
          <label htmlFor="">Add Grade Form</label>
          <input
            id="addressStudent"
            value={addressStudent}
            placeholder="Enter Student address account.."
            autoComplete="off"
            onChange={e => setAddressStudent(e.target.value)}
          >
          </input>
          <label htmlFor="">Grade</label>
          <input
            id="firstNameStudent"
            type="number" 
            value={grade}
            placeholder="Enter Student Grade.."
            autoComplete="off"
            onChange={e => setGrade(e.target.value)}
          >
          </input>
          <button onClick={addGrade}>Add Student</button>
          <br />
          </div>

        </div>
        <div className="main">
        <div className="addTeacher">
          <button onClick={getStudentCount}>Get sudent count</button>
          <div >
            Nomber register student : <p id="studentCount"></p>
          </div>
          <br />
          </div>



          <div className="addTeacher">
          <button onClick={getListStudents}>List of Students</button>
          <div id="studList">
          </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;

// ({address : '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', firstanme:'bob' , lastanme: 'bob', from: '0x929eef3ecF07ab807BC912C5b327A486F4edD042'});

// 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c this one has the teacher role can add student so