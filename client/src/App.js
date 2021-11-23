import React, { useState } from "react";
import { schoolManager } from "./abi/abi";
import Web3 from "web3";
import { useWeb3React } from '@web3-react/core';

import ConnectMetamaskButton from './components/ConnectMetamaskButton'
import './App.css';

// @web3: is the connection with metamask
const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x54744C0C6f0FEa4E52b382819F31A977c0DC3057";
// @contract: contain address contract and ABI 
const contract = new web3.eth.Contract(schoolManager, contractAddress);
const teachCount = document.getElementById('teachCount');
const studentCount = document.getElementById('studentCount');
let teachList = ('');
let studList = document.getElementById('studList');
const teacherRole = "0xd16e204b8a42a15ab0ea6bb8ec1ecdfbe69f38074fc865323af19efe7d9573d9";
const hasTeacherRole = web3.utils.soliditySha3('TEACHER_ROLE');


function App() {
  console.log(hasTeacherRole);
  const { account } = useWeb3React()
  console.log(account);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressTeacher, setAddressTeacher] = useState('');
  const [addressStudent, setAddressStudent] = useState('');
  const [role, setRole] = useState('false')

  async function getTeachCount() {
    const theTeachCount = await contract.methods.getTeachCount().call()
      .then(receipt => {
        teachCount.innerHTML = receipt;
      })
      .catch(err => {
        alert('erreur')
      })
  };

  async function getStudentCount() {
    const theStudentCount = await contract.methods.getStudentCount().call()
      .then(receipt => {
        console.log('studentCount:',receipt)
        studentCount.innerHTML = receipt;
      })
      .catch(err => {
        alert('erreur')
      })
  };

  async function getListOfTeachers() {
    const theListOfTeacher = await contract.methods.showListOfTeachers().call()
    .then(receipt => {
      receipt.map((object, index) => (
        teachList = object.slice(0, 10)+'...'
        ))
        // console.log('teachList:', object.slice(0, 10)+'...')
      // for (let i = 0; i < receipt.length; i++) {
      //   teachList.innerHTML = receipt[i]+'<br/>';
        
      // }
      console.log('teachListHTML:',receipt.map((object, i) =>(
        object
      )))
      // studList.innerHTML = receipt.slice(0, 5)+'<br/>';
    })
      .catch(err => {
        alert('erreur')
      })
  };

  async function getListOfStudents() {
    const theListOfStudent = await contract.methods.showListOfStudents().call()
      .then(receipt => {
        console.log('studentList:',receipt)
        for (let i = 0; i < receipt.length; i++) {
          studList.innerHTM += receipt[i]+'<br/>';
          
        }
        // studList.innerHTML = response.slice(0, 5)+'<br/>';
      })
      .catch(err => {
        alert('erreur')
      })
  };

  async function addTeacher() {
    const functionAddStudent = await contract.methods.addTeacher(addressTeacher, firstName, lastName)
      .send({
        from: account,
      });
    console.log(functionAddStudent);
  };

  async function addStudent() {
    const functionAddStudent = await contract.methods.addStudent(addressStudent, firstName, lastName)
      .send({
        from: account,
      });
    console.log(functionAddStudent);
  };

  async function grantRoleToTeacher() {
    const functiongrantRoleToTeacher = await contract.methods.grantRole(teacherRole, addressTeacher)
      .send({
        from: account,
      });
    console.log(functiongrantRoleToTeacher);
  };

  async function hasRoleTeacher() {
    const functionAddTeacher = await contract.methods.hasRole(teacherRole, addressTeacher)
      .send({
        from: account,
      })
      .then((receipt) => {
        console.log('ici',receipt);
      })
    console.log(functionAddTeacher);
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
          <button onClick={getTeachCount}>Get teacher count</button>
          <div id="teachCount">
            Nomber of register teacher :
          </div>
          <br />
          </div>

          <div className="insideCard">
          <button onClick={getListOfTeachers}>Get list of teacher</button>
          <div id="teachList">
            List of teacher : {teachList}
          </div>
          <br />
          </div>

          <div className="insideCard">
          <button onClick={getStudentCount}>Get sudent count</button>
          <div id="studentCount">
            Nomber of register student :
          </div>
          <br />
          </div>

          <div className="addTeacher">
          <label htmlFor="">Add Teacher Form</label>
          <input
            id="addressTeacher"
            value={addressTeacher}
            placeholder="Enter teacher address account.."
            autoComplete="off"
            onChange={e => setAddressTeacher(e.target.value)}
          >
          </input>
          <label htmlFor="">firstName</label>
          <input
            id="firstNameTeacher"
            value={firstName}
            placeholder="Enter teacher firstName.."
            autoComplete="off"
            onChange={e => setFirstName(e.target.value)}
          >
          </input>
          <label htmlFor="">lastName</label>
          <input
            id="lastNameTeacher"
            value={lastName}
            placeholder="Enter teacher lastName.."
            autoComplete="off"
            onChange={e => setLastName(e.target.value)}
          >
          </input>
          <button onClick={addTeacher}>Add Teacher</button>
          <br />
          </div>

          <div className="insideCard">
          <button onClick={getListOfStudents}>List of Students</button>
          <div id="studList">
            Nomber of register student :
          </div>
          </div>

          <div className="addTeacher">
          <label htmlFor="">Add Teacher Role</label>
          <input
            id="addressTeacher"
            value={addressTeacher}
            placeholder="Enter teacher address account.."
            autoComplete="off"
            onChange={e => setAddressTeacher(e.target.value)}
          >
          </input>
          <button onClick={grantRoleToTeacher}>Add Teacher Role</button>
          <br />
          </div>

          <div className="addTeacher">
          <label htmlFor="">Check Teacher Role</label>
          <p>{role}</p>
          <input
            id="addressTeacher"
            value={addressTeacher}
            placeholder="Enter teacher address account.."
            autoComplete="off"
            onChange={e => setAddressTeacher(e.target.value)}
          >
          </input>
          <button onClick={hasRoleTeacher}>Check Teacher Role</button>
          <br />
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
        </div>
      </div>
    </>
  );
}

export default App;

// ({address : '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', firstanme:'bob' , lastanme: 'bob', from: '0x929eef3ecF07ab807BC912C5b327A486F4edD042'});

// 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c this one has the teacher role can add student so