import React, { useState, useEffect } from "react";
import { schoolManager } from "./abi/abi";
import Web3 from "web3";
import ConnectMetamaskButton from './components/ConnectMetamaskButton'
import './App.css';

// @notice: web3 is the connection with metamask
const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0xfF90414e2736778aF4904A0408055ca2220117e5";
// @notice: contract contain address contract and ABI 
const contract = new web3.eth.Contract(schoolManager, contractAddress);

function App() {
  useEffect(() => {
    addSmartContractListener();
    getStudentCount();
    getListStudents();
  },[]);
  const [firstName, setFirstName] = useState('');
  const [addressStudent, setAddressStudent] = useState('');
  const [grade, setGrade] = useState('');
  const [eventMessage, setEventMessage] = useState("");
  const [statusGraduate, setStatusGraduate] = useState("");
  const [successMessageFirstNameStudent, setSuccessMessageFirstNameStudent] = useState("");
  const [successMessageStudentAddress, setSuccessMessageFirstName] = useState("");
  const [oneStudentGrade, setOneStudentGrade] = useState("");
  const [oneStudentFirstName, setOneStudentFirstName] = useState("");
  const [oneStudentGraduate, setOneStudentGraduate] = useState("");
  const [oneStudentError, setOneStudentError] = useState("");

  function addSmartContractListener() {
    contract.events.LogStudentAdded({}, (error, data) => {
      if (error) {
        console.log('ici:',error.message);
      } else {
        console.log(data.returnValues);
        setEventMessage('Student Added 🎉')
        setSuccessMessageFirstName(`First Name : ${data.returnValues.firstName}`);
        setSuccessMessageFirstNameStudent(`Address : ${data.returnValues.studentAddress.slice(0, 10)}...`);
      }
    });
    contract.events.LogGradeAdded({}, (error, data) => {
      if (error) {
        console.log('LogGradeAddedError:',error.message);
      } else {
        console.log(data.returnValues.grade);
        setEventMessage(`Grade added 🙂 : ${data.returnValues.grade}`)
      }
    });
    contract.events.LogStudentGraduate({}, (error, data) => {
      if (error) {
        console.log('LogStudentGraduateError:',error.message);
      } else {
        console.log('logStudentGraduate typeof', typeof data.returnValues.status);
        console.log('logStudentGraduate', data.returnValues.status);
        if (data.returnValues.status === '1') {
          setStatusGraduate('Student Graduate 🥳');
        } else {
          console.log(data.returnValues.grade);
          setStatusGraduate('Student Not Graduate 😔');
        }
      }
    });
  }
  
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
      .catch((err) => {
        if(err.message.includes("This student already exist")){
          setEventMessage("Error : This student already exist 😥")
        }
        else {
          setEventMessage("Error : Something went wrong try again 😥")
        } 
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
      .catch((err) => {
        if(err.message.includes("First you need to add the student")){
          setEventMessage("Error : First you need to add the student 😥")
        }
        if(err.message.includes("Student already receive grade")){
          setEventMessage("Error : Student already received grade 😉")
        }
        else {
          console.log('addGradeErro',err)
          setEventMessage("Error : Something went wrong try again 😥")
        } 
      })
  };

  async function getOneStudent() {
    await contract.methods.getOneStudent(addressStudent).call()
      .then((receipt) => {
        setOneStudentGrade(receipt.grade);
        setOneStudentFirstName(receipt.firstName);
        if (receipt[0] === '1') {
          setOneStudentGraduate('congrats you are Graduated 🥳');
          setEventMessage('');
        }
        else {
          setOneStudentGraduate('so sorry you are not Graduated 😔');
          setEventMessage('');
        }
        console.log('getOneStudent:', receipt)
        console.log('getOneStudent:', receipt[0])
        console.log('getOneStudent:', receipt.grade)
        console.log('getOneStudent:', receipt.firstName)
      })
      .catch((err) => {
        setOneStudentError('This student is not register yet sorry 🙁')
        setOneStudentGrade("");
        setOneStudentFirstName("");
        setOneStudentGraduate("");
        console.log('getOneStudent:', err)
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
          studList.innerHTML = `${studList.innerHTML} ${receipt[i]}<br/><br/>`;
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
      <p className="headerParagraph">You are a teacher of a class</p>
      <p className="headerParagraph">You can add Student</p>
      <p className="headerParagraph">Students get Grades from you only</p>
      <p className="headerParagraph">Students can check their grade and graduate status</p>
      </div>
      <div className="headerConnection">
      <ConnectMetamaskButton />
        </div>
    </div>
      <div className="main">
        <div className="message">
        {eventMessage.length > 2
            ?
              <p className="registerStudent">{eventMessage}</p>
            :
            ''
            }
            {successMessageFirstNameStudent.length > 2
            ?
            <>
            <p className="registerStudent">{statusGraduate}</p>
            <p className="registerStudent">{successMessageFirstNameStudent}</p>
            <p className="registerStudent">{successMessageStudentAddress}</p>
            </>
            :
            ''
          }
        </div>
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
          <label htmlFor="">First name</label>
          <input
            id="firstNameStudent"
            value={firstName}
            placeholder="Enter student first name.."
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
            placeholder="Enter student address account.."
            autoComplete="off"
            onChange={e => setAddressStudent(e.target.value)}
          >
          </input>
          <label htmlFor="">Grade</label>
          <input
            id="firstNameStudent"
            type="number" 
            value={grade}
            placeholder="Enter student Grade.."
            autoComplete="off"
            onChange={e => setGrade(e.target.value)}
          >
          </input>
          <button onClick={addGrade}>Add Grade</button>
          <br />
          </div>

        </div>
        <div className="main">
        <div className="addTeacher">
          <p className="registerStudent" >
            Student count : <span id="studentCount"> </span> 
          </p>
          <br />
          </div>
        <div className="addTeacher">
          <h4>You are a Student ? Find if you are Graduated 🙂</h4>

          {oneStudentError.length > 2
            ?
              <p className="registerStudent">{oneStudentError}</p>
            :
            ''
            }
            {oneStudentFirstName.length > 2
            ?
            <>
            <p className="registerStudent">{oneStudentFirstName} , you got the grade {oneStudentGrade} for your work ,{oneStudentGraduate}</p>
            </>
            :
            ''
          }
          <input
            id="addressStudent"
            value={addressStudent}
            placeholder="Enter your address account.."
            autoComplete="off"
            onChange={e => setAddressStudent(e.target.value)}
          >
          </input>
          <button onClick={getOneStudent}>Let's find out</button>
          <br />
          <br />
          <br />
          </div>
          <div className="addTeacher">
          <p className="registerStudent">List of Students</p>
          <div id="studList">
          </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
