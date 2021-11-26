export const schoolManager = [
 {
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "uint256",
    "name": "grade",
    "type": "uint256"
   },
   {
    "indexed": false,
    "internalType": "address",
    "name": "studentAddress",
    "type": "address"
   }
  ],
  "name": "LogGradeAdded",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "string",
    "name": "firstName",
    "type": "string"
   },
   {
    "indexed": false,
    "internalType": "address",
    "name": "studentAddress",
    "type": "address"
   }
  ],
  "name": "LogStudentAdded",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "enum SchoolManager.State",
    "name": "status",
    "type": "uint8"
   },
   {
    "indexed": false,
    "internalType": "address",
    "name": "studentAddress",
    "type": "address"
   }
  ],
  "name": "LogStudentGraduate",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
   },
   {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
   }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
 },
 {
  "inputs": [],
  "name": "owner",
  "outputs": [
   {
    "internalType": "address",
    "name": "",
    "type": "address"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
   }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "_studentAddress",
    "type": "address"
   },
   {
    "internalType": "string",
    "name": "_firstName",
    "type": "string"
   }
  ],
  "name": "addStudent",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "_studentAddress",
    "type": "address"
   },
   {
    "internalType": "uint256",
    "name": "_grade",
    "type": "uint256"
   }
  ],
  "name": "addGrade",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "_studentAddress",
    "type": "address"
   }
  ],
  "name": "getOneStudent",
  "outputs": [
   {
    "internalType": "enum SchoolManager.State",
    "name": "",
    "type": "uint8"
   },
   {
    "internalType": "uint256",
    "name": "grade",
    "type": "uint256"
   },
   {
    "internalType": "string",
    "name": "firstName",
    "type": "string"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "getListStudents",
  "outputs": [
   {
    "internalType": "address[]",
    "name": "",
    "type": "address[]"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "getStudentCount",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "sendDegreeNFT",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 }
];