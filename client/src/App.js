import React, { useState } from "react";
import { schoolManager } from "./abi/abi";
import Web3 from "web3";
import { useWeb3React } from '@web3-react/core';

import ConnectMetamaskButton from './components/ConnectMetamaskButton'
import './App.css';

// @notice: web3 is the connection with metamask
const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x67Bb944f3458a77d8e3B17C49B00Bc2320664D40";
// @notice: contract contain address contract and ABI 
const contract = new web3.eth.Contract(schoolManager, contractAddress);
const studentCount = document.getElementById('studentCount');
const studList = document.getElementById('studList');

function App() {
  const { account } = useWeb3React()
  console.log(account);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressStudent, setAddressStudent] = useState('');
  const [grade, setGrade] = useState('');
  
  async function addStudent() {
    const functionAddStudent = await contract.methods.addStudent(addressStudent, firstName, lastName)
      .send({
        from: account,
      })
      .catch(err => {
        console.log('erreur addStudent:', err)
      })
  };

  async function addGrade() {
    const functionAddGrade = await contract.methods.addGrade(addressStudent, grade)
      .send({
        from: account,
      })
      .catch(err => {
        console.log('erreur getStudentCount:', err.message)
      })
  };

  async function getStudentCount() {
    const theStudentCount = await contract.methods.getStudentCount().call()
      .then(receipt => {
        console.log('studentCount:',receipt)
        studentCount.innerHTML = receipt;
      })
      .catch(err => {
        console.log('erreur getStudentCount:', err.message)
      })
  };

  async function getListStudents() {
    const theListOfStudent = await contract.methods.getListStudents().call()
      .then(receipt => {
        console.log('studentList:',receipt)
        for (let i = 0; i < receipt.length; i++) {
          console.log('studentList:',receipt[i])
          studList.innerHTM = receipt[i];
          
        }
        // studList.innerHTML = response.slice(0, 5)+'<br/>';
      })
      .catch(err => {
        alert('erreur')
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

          <div className="insideCard">
          <button onClick={getStudentCount}>Get sudent count</button>
          <div >
            Nomber register student : <p id="studentCount"></p>
          </div>
          <br />
          </div>



          <div className="insideCard">
          <button onClick={getListStudents}>List of Students</button>
          <div id="studList">
          </div>
          </div>
          
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
          <label htmlFor="">lastName</label>
          <input
            id="lastNameStudent"
            value={lastName}
            placeholder="Enter Student lastName.."
            autoComplete="off"
            onChange={e => setLastName(e.target.value)}
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
      </div>
    </>
  );
}

export default App;

// ({address : '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', firstanme:'bob' , lastanme: 'bob', from: '0x929eef3ecF07ab807BC912C5b327A486F4edD042'});

// 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c this one has the teacher role can add student so