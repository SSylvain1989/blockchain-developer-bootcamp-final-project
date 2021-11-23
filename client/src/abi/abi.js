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
       "indexed": true,
       "internalType": "bytes32",
       "name": "role",
       "type": "bytes32"
     },
     {
       "indexed": true,
       "internalType": "bytes32",
       "name": "previousAdminRole",
       "type": "bytes32"
     },
     {
       "indexed": true,
       "internalType": "bytes32",
       "name": "newAdminRole",
       "type": "bytes32"
     }
   ],
   "name": "RoleAdminChanged",
   "type": "event"
 },
 {
   "anonymous": false,
   "inputs": [
     {
       "indexed": true,
       "internalType": "bytes32",
       "name": "role",
       "type": "bytes32"
     },
     {
       "indexed": true,
       "internalType": "address",
       "name": "account",
       "type": "address"
     },
     {
       "indexed": true,
       "internalType": "address",
       "name": "sender",
       "type": "address"
     }
   ],
   "name": "RoleGranted",
   "type": "event"
 },
 {
   "anonymous": false,
   "inputs": [
     {
       "indexed": true,
       "internalType": "bytes32",
       "name": "role",
       "type": "bytes32"
     },
     {
       "indexed": true,
       "internalType": "address",
       "name": "account",
       "type": "address"
     },
     {
       "indexed": true,
       "internalType": "address",
       "name": "sender",
       "type": "address"
     }
   ],
   "name": "RoleRevoked",
   "type": "event"
 },
 {
   "inputs": [],
   "name": "DEFAULT_ADMIN_ROLE",
   "outputs": [
     {
       "internalType": "bytes32",
       "name": "",
       "type": "bytes32"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [],
   "name": "HEADMASTER_ADMIN_ROLE",
   "outputs": [
     {
       "internalType": "bytes32",
       "name": "",
       "type": "bytes32"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
     }
   ],
   "name": "ListOfStudents",
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
   "inputs": [
     {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
     }
   ],
   "name": "ListOfTeachers",
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
   "name": "TEACHER_ROLE",
   "outputs": [
     {
       "internalType": "bytes32",
       "name": "",
       "type": "bytes32"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "bytes32",
       "name": "role",
       "type": "bytes32"
     }
   ],
   "name": "getRoleAdmin",
   "outputs": [
     {
       "internalType": "bytes32",
       "name": "",
       "type": "bytes32"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "bytes32",
       "name": "role",
       "type": "bytes32"
     },
     {
       "internalType": "address",
       "name": "account",
       "type": "address"
     }
   ],
   "name": "grantRole",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "bytes32",
       "name": "role",
       "type": "bytes32"
     },
     {
       "internalType": "address",
       "name": "account",
       "type": "address"
     }
   ],
   "name": "hasRole",
   "outputs": [
     {
       "internalType": "bool",
       "name": "",
       "type": "bool"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "bytes32",
       "name": "role",
       "type": "bytes32"
     },
     {
       "internalType": "address",
       "name": "account",
       "type": "address"
     }
   ],
   "name": "renounceRole",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "bytes32",
       "name": "role",
       "type": "bytes32"
     },
     {
       "internalType": "address",
       "name": "account",
       "type": "address"
     }
   ],
   "name": "revokeRole",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "bytes4",
       "name": "interfaceId",
       "type": "bytes4"
     }
   ],
   "name": "supportsInterface",
   "outputs": [
     {
       "internalType": "bool",
       "name": "",
       "type": "bool"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "address",
       "name": "_teacherAddress",
       "type": "address"
     },
     {
       "internalType": "string",
       "name": "_firstName",
       "type": "string"
     },
     {
       "internalType": "string",
       "name": "_lastName",
       "type": "string"
     }
   ],
   "name": "addTeacher",
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
     },
     {
       "internalType": "string",
       "name": "_lastName",
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
     },
     {
       "internalType": "string",
       "name": "_subject",
       "type": "string"
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
   "name": "getGrades",
   "outputs": [
     {
       "internalType": "uint256[]",
       "name": "",
       "type": "uint256[]"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [],
   "name": "showListOfTeachers",
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
   "name": "showListOfStudents",
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
   "name": "getTeachCount",
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
];