// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Contract for manage grade's student
/// @author Sylvain Sigonnez
/// @notice Allows a teacher to give grade to a student , and student to see their grades and if they are graduates
/// @dev Send a NFT degree to a graduate student
contract SchoolManager is Ownable{

    constructor() { 
    }
    
    struct Student {
        string firstName;
        string lastName;
        uint grade;
        address studentAddress;
        State status;
    }
    
    mapping(address => Student) students;
    mapping(uint => address) studentsAddresses;
    uint studentCount; 

    enum State { studentNotGraduate, studentGraduate }

    /// @notice Emitted when a new student is added
    /// @param firstName of student 
    /// @param studentAddress of student 
    event LogStudentAdded(string firstName , address studentAddress);
    /// @notice Emitted when a new grade to a student is added
    /// @param grade for the work of a student 
    /// @param studentAddress of student 
    event LogGradeAdded(uint grade , address studentAddress);
    /// @notice Emitted when a new status is given to a student 
    /// @param status of the student according to the grade for his work 
    /// @param studentAddress of student 
    event LogStudentGraduate(State status , address studentAddress);
  
    // @notice It will add a student if doesn't already exist
    // @param _studenAddress the address of the new student
    // @param _firstName the firstName of the new student
    // @param _lasttName the firstName of the new student
    function addStudent(address _studentAddress, string memory _firstName, string memory _lastName) external onlyOwner {
        bytes memory firstNameOfAddress = bytes(students[_studentAddress].firstName);
        require(firstNameOfAddress.length == 0, "This student already exist");
        students[_studentAddress].firstName = _firstName;
        students[_studentAddress].lastName = _lastName;
        students[_studentAddress].studentAddress = _studentAddress;
        studentsAddresses[studentCount]= _studentAddress;
        students[_studentAddress].status = State.studentNotGraduate;
        studentCount++;
        emit LogStudentAdded(_firstName, _studentAddress);
    }

    // @notice It will add grade to a student if the student is already create
    // @param _studenAddress the address of the new student
    // @param _grade the grade of the work of the student
    function addGrade(address _studentAddress, uint _grade) external onlyOwner {
        bytes memory firstNameOfAddress = bytes(students[_studentAddress].firstName);
        require(firstNameOfAddress.length > 0, "First you need to add the student");
        require(students[_studentAddress].grade == 0, "Student already receive grade");
        students[_studentAddress].grade = _grade;
        if(_grade >= 10) {
        emit LogGradeAdded(_grade, _studentAddress);
        students[_studentAddress].status = State.studentGraduate;
        emit LogStudentGraduate(students[_studentAddress].status, _studentAddress);
        } else {
        emit LogGradeAdded(_grade, _studentAddress);
        students[_studentAddress].status = State.studentNotGraduate;
        emit LogStudentGraduate(students[_studentAddress].status, _studentAddress);
        }
    }
    
    // @notice It will get the grade, the status and the firstName of the Student
    // @param _studenAddress the address of the student
    // @return the grade, the status and the firstName of the student
    function getOneStudent(address _studentAddress) public view returns(State, uint grade, string memory firstName ){
        bytes memory studentFirstName = bytes(students[_studentAddress].firstName);
        require(studentFirstName.length > 0, "Student doesn't exist");
        return (students[_studentAddress].status, students[_studentAddress].grade, students[_studentAddress].firstName);
    }

    // @notice It will get the list of the address of all register student
    // @param emppty array of address 
    // @return the list of the address of all register student
    function getListStudents() public view returns (address[] memory){
        address[] memory ret = new address[](studentCount);
        for (uint i = 0; i < studentCount; i++) {
            ret[i] = studentsAddresses[i];
        }
        return ret;
    }
    
    // @notice It will get the number of all register student
    // @param empty uint 
    // @return the count of all register student
    function getStudentCount() public view returns (uint){
        return studentCount;
    }

    /// @notice Send a NFT degree
    /// @dev Only the owner of the contract can call this
    function sendDegreeNFT () external onlyOwner {
        // TODO: Send degree to student have graduate
    }
    
}
