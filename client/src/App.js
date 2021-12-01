import React, { useState, useEffect } from "react";
import { schoolManager } from "./abi/abi";
import Web3 from "web3";
import ConnectMetamaskButton from './components/ConnectMetamaskButton'
import './App.css';

// @notice: web3 is the connection with metamask wallet
const web3 = new Web3(Web3.givenProvider);
// @notice: **** carrefull contract address need to be change in ConnectMetamaskButton.js as well ****
const contractAddress = "0x9Bc3ad57d23F81a97edB77473D65800B8222F55c";
// @notice: contract contain address contract and ABI 
const contract = new web3.eth.Contract(schoolManager, contractAddress);

function App() {
  const [firstName, setFirstName] = useState('');
  const [addressStudent, setAddressStudent] = useState('');
  const [grade, setGrade] = useState('');
  const [eventMessage, setEventMessage] = useState("");
  const [statusGraduate, setStatusGraduate] = useState("");
  const [successMessageFirstNameStudent, setSuccessMessageFirstNameStudent] = useState("");
  const [successMessageStudentAddress, setSuccessMessageStudentAddress] = useState("");
  const [oneStudentGrade, setOneStudentGrade] = useState("");
  const [oneStudentFirstName, setOneStudentFirstName] = useState("");
  const [oneStudentGraduate, setOneStudentGraduate] = useState("");
  const [oneStudentError, setOneStudentError] = useState("");
  const [isOwner, setIsOwner] = useState('');

  const childToParent = (childdata) => {
    setIsOwner(childdata);
    console.log('childata', isOwner)
  }
  
  useEffect(() => {
    addSmartContractListener();
    getStudentCount();
    getListStudents();
    setAddressStudent("");
    setFirstName("");
    setGrade("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventMessage, isOwner]);

  function addSmartContractListener() {
    contract.events.LogStudentAdded({}, (error, data) => {
      if (error) {
        console.log('error on logStudentAdded:', error.message);
      } else {
        console.log('success logStudentAdded added :', data.returnValues);
        setEventMessage('Student Added 🎉 now wait the grade from your teacher')
        setSuccessMessageFirstNameStudent(`First Name : ${data.returnValues.firstName}`);
        setSuccessMessageStudentAddress(`Address : ${data.returnValues.studentAddress.slice(0, 10)}...`);
        setStatusGraduate('');
      }
    });
    contract.events.LogGradeAdded({}, (error, data) => {
      if (error) {
        console.log('error add grade:', error.message);
      } else {
        console.log('success add grade :', data.returnValues.grade);
        setEventMessage(`Grade added 🙂 : ${data.returnValues.grade}`)
      }
    });
    contract.events.LogStudentGraduate({}, (error, data) => {
      if (error) {
        console.log('LogStudentGraduateError:', error.message);
      } else {
        console.log('success status student:', data.returnValues.status);
        if (data.returnValues.status === '1') {
          console.log('student is graduate')
          setStatusGraduate('Student Graduate 🥳');
        } else {
          console.log(data.returnValues.status);
          console.log('student is not graduate')
          setStatusGraduate('Student Not Graduate 😔');
          console.log('statusGraduate', statusGraduate)
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
      .then(setEventMessage('Confirm transaction on metamask... and wait for 2 block 🙂'))
      .then((receipt) => {
        console.log('receipt addStudent:', receipt)
        setEventMessage('Student Added 🎉 now wait the grade from your teacher')
        setSuccessMessageFirstNameStudent(`First Name : ${receipt.events.LogStudentAdded.returnValues.firstName}`);
        setSuccessMessageStudentAddress(`Address : ${receipt.events.LogStudentAdded.returnValues.studentAddress.slice(0, 10)}...`);
        setOneStudentGrade("");
        setOneStudentFirstName("");
        setOneStudentGraduate("");
      })
      .catch((err) => {
        console.log('error add student', err)
        console.log('error add student', err.message)
        console.log(err.message.includes("User denied transaction") === true)
        if (err.message.includes("This student already exist")) {
          console.log('error add student', err)
          setEventMessage("ERROR❗️ : This student already exist 🙂")
          setOneStudentGrade("");
          setOneStudentFirstName("");
          setOneStudentGraduate("");
        }
        else if (err.message.includes("User denied transaction")) {
          setEventMessage("ERROR❗️ : You denied transaction 🙁")
        }
        else if (err.message.includes("caller is not the owner")) {
          setEventMessage("ERROR❗️ : You are not the owner of this contract you can't add student 🙁")
        }
        else {
          setEventMessage("ERROR❗️ : Sorry this student already exist 🙂")
          setSuccessMessageFirstNameStudent('');
          setSuccessMessageStudentAddress('');
          setOneStudentGrade("");
          setOneStudentFirstName("");
          setOneStudentGraduate("");
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
      .then(setEventMessage('Confirm transaction on metamask and wait for 2 block ...🙂'))
      .then((receipt) => {
        console.log('receipt addGrade:', receipt.events.LogGradeAdded.returnValues.grade)
        console.log('receipt addGrade:', receipt.events.LogStudentGraduate.returnValues.status)
        if (receipt.events.LogStudentGraduate.returnValues.status === '1') {
          console.log('receipt addGrade:', receipt.events.LogGradeAdded.returnValues.grade)
          console.log('receipt addGrade:', receipt.events.LogStudentGraduate.returnValues.status)
          console.log('student is graduate')
          setStatusGraduate('Student Graduate 🥳');
          setEventMessage(`Grade added 🙂 : ${receipt.events.LogGradeAdded.returnValues.grade} Student Graduate 🥳`)
        } else {
          console.log('student is not graduate')
          setStatusGraduate('Student Not Graduate 😔');
          setEventMessage(`Grade added 🙂 : ${receipt.events.LogGradeAdded.returnValues.grade} Student Not Graduate 😔`)
          console.log('receipt addGrade:', receipt.events.LogGradeAdded.returnValues.grade)
          console.log('receipt addGrade:', receipt.events.LogStudentGraduate.returnValues.status)
        }
      })
      .catch((err) => {
        console.log('error add grade', err)
        console.log('error add grade', err.message)
        if (err.message.includes("First you need to add the student")) {
          setEventMessage("Error : First you need to add the student ☺️")
          setStatusGraduate('');
        }
        else if (err.message.includes("ERROR❗️ : Student already receive grade ☺️")) {
          setEventMessage("Error : Student already received grade 😉 you can check his grade with the student section below 👇")
          setStatusGraduate('');
        }
        else if (err.message.includes("User denied transaction")) {
          setEventMessage("ERROR❗️ : You denied transaction 🙁")
        }
        else if (err.message.includes("caller is not the owner")) {
          setEventMessage("ERROR❗️ : You are not the owner of this contract you can't add grade 🙁")
        }
        else {
          console.log('add Grade Error', err)
          setEventMessage("ERROR❗️ : Sorry student already receive grade ☺️")
          setStatusGraduate('');
          setSuccessMessageFirstNameStudent('');
          setSuccessMessageStudentAddress('');
        }
      })
  };

  async function getOneStudent() {
    await contract.methods.getOneStudent(addressStudent).call()
      .then((receipt) => {
        setStatusGraduate('');
        setSuccessMessageFirstNameStudent('');
        setSuccessMessageStudentAddress('');
        setOneStudentFirstName(receipt.firstName);
        if (receipt[0] === '1') {
          setOneStudentGrade(`you got the grade of ${receipt.grade}`);
          setOneStudentGraduate('congrats you are Graduated 🥳');
          setEventMessage('');
        }
        else {
          if (receipt.grade === '0') {
            setOneStudentGrade('');
            setStatusGraduate('');
            setOneStudentGraduate("you haven't received a grade yet ... keep waiting please 😊");
            setEventMessage('');
          }
          else {
            setOneStudentGrade(`you got the grade of ${receipt.grade}`);
            setOneStudentGraduate(' so sorry you are not Graduated 😔');
            setEventMessage('');
          }
        }
      })
      .catch((err) => {
        setOneStudentError('This student is not registered yet sorry 🙁')
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
        if (receipt  === '0' || receipt.length === null ){
          studentCount.innerHTML = ('No student registered yet')
        }
        else {
          studentCount.innerHTML = `${receipt}`;
        }
      })
      .catch(err => {
        console.log('erreur getStudentCount:', err)
      })
  };

  async function getListStudents() {
    await contract.methods.getListStudents().call()
      .then(receipt => {
        console.log('getListStudents:',receipt)
        let studList = document.getElementById('studList');
        studList.innerHTML = '';
        if ( receipt.length === 0 || receipt.length === null){
          studList.innerHTML =('No student registered yet')
        }
        else {
          for (let i = 0; i < receipt.length; i++) {
            studList.innerHTML = `${studList.innerHTML} ${receipt[i]}<br/><br/>`;
          }
        }
      })
      .catch(err => {
        console.log(' error , maybe you have no eth on this account ? ', err)
      })
  };

  function handleAddStudent () {
    setFirstName('');
    setAddressStudent('');
    setStatusGraduate('');
    addStudent();
  }

  return (
    <>
      <div className="header">
        <div className="headerText">
          <h1>School Manager</h1>
          <p className="headerParagraph">You are a student ?</p>
          <p className="headerParagraph">You can register yourself and wait a teacher will grade your work , then check your grade and graduate status</p>
          <p className="headerParagraph">You are a Teacher (so the owner of this contract) ?</p>
          <p className="headerParagraph">You can add grade to students</p>
        </div>
      </div>
        <div className="connectionPart">
          <ConnectMetamaskButton childToParent={childToParent}/>
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
            <p>(Student and Owner can do that)</p>
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
            <button onClick={handleAddStudent}>Add Student</button>
            <br />
          </div>

          {isOwner 
          ?
          <div className="addTeacher">
          <label htmlFor="">Add Grade Form </label>
          <p>(Teacher/Owner can do that)</p>
          <input
            id="addressStudent"
            value={addressStudent}
            placeholder="Enter student address account.."
            autoComplete="off"
            onChange={e => setAddressStudent(e.target.value)}
          >
          </input>
          <label htmlFor="">Grade(not below 1)</label>
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
        :
        ''
        }

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
                <p className="registerStudent">{oneStudentFirstName} , {oneStudentGrade} for your work , {oneStudentGraduate}</p>
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
