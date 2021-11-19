// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SchoolManager is AccessControl{
    // Create a new role identifier for the headmaster role
    bytes32 public constant HEADMASTER_ADMIN_ROLE = keccak256("HEADMASTER_ADMIN_ROLE");
    bytes32 public constant TEACHER_ROLE = keccak256("TEACHER_ROLE");

    constructor() { 
    _setupRole(HEADMASTER_ADMIN_ROLE, msg.sender); 
    _setRoleAdmin(TEACHER_ROLE, HEADMASTER_ADMIN_ROLE);
    _setRoleAdmin(HEADMASTER_ADMIN_ROLE,HEADMASTER_ADMIN_ROLE); 
    }
    
    //on verifie que l'utilisateur est bien teacher
    modifier onlyTeacher() {
        require(hasRole(TEACHER_ROLE, msg.sender), "Caller is not a teacher");
        _;
    }
    
    //on verifie que l'utilisateur est bien director
        modifier onlyHeadmaster(){
        require(hasRole(HEADMASTER_ADMIN_ROLE, msg.sender), "Caller is not a headmaster");
        _;
    }
    
        struct Teacher {
        string firstName;
        string lastName;
    }
    
    mapping(address => Teacher) teachers;
    address[] public ListOfTeachers;
    uint teacherCount; 
    
    struct Grade {
        string subject;
        uint grade;
    }
    
    struct Student {
        string firstName;
        string lastName;
        uint numberOfGrades;
        uint numberOfStudents;
        // uint represente l'index dans le tableau de note
        mapping(uint => Grade) grades;
    }
    
    // par le bias du mapping , chaque address correspond à un Student, on accede donc à son firstName, lastName ... 
    // par le bias de Student on accede également à la structure Grade, donc les notes par sujet et par note
    mapping(address => Student) students;
    address[] public ListOfStudents;
    uint studentCount; 




        function addTeacher(address _teacherAddress, string memory _firstName, string memory _lastName) external onlyHeadmaster {
       /* require(owner == msg.sender, 'not the owner');*/
        bytes memory firstNameOfAddress = bytes(teachers[_teacherAddress].firstName);
        // on check que l'address n'existe pas déjà , elle soit être égale à 0 , si elle est a plus de 0 elle existe deja ,impossible de la rajouter
        require(firstNameOfAddress.length == 0, "Existe deja");
        teachers[_teacherAddress].firstName = _firstName;
        teachers[_teacherAddress].lastName = _lastName;
        ListOfTeachers.push(_teacherAddress);
        teacherCount++;
    }
    
    function addStudent(address _studentAddress, string memory _firstName, string memory _lastName) external onlyTeacher {
        /*require(owner == msg.sender, 'not the owner');*/
        bytes memory firstNameOfAddress = bytes(students[_studentAddress].firstName);
        // on check que l'address n'existe pas déjà , elle soit être égale à 0 , si elle est a plus de 0 elle existe deja ,impossible de la rajouter
        require(firstNameOfAddress.length == 0, "Existe deja");
        students[_studentAddress].firstName = _firstName;
        students[_studentAddress].lastName = _lastName;
        ListOfStudents.push(_studentAddress);
        studentCount++;
    }
    
    function addGrade(address _studentAddress, uint _grade, string memory _subject) external onlyTeacher {

        bytes memory firstNameOfAddress = bytes(students[_studentAddress].firstName);
        // si elle est pas superieur à 0 , alors il faut creer le student
        require(firstNameOfAddress.length > 0, "il faut d'abord creer le student");
        // students[_studentAddress].grades[0], cette syntaxe va fonctionner une fois, mais la prochaine fois 
        // on pourra pas remettre une nouvelle note à l'index zero 
        // il nous faut donc toujours l'index 
        students[_studentAddress].grades[students[_studentAddress].numberOfGrades].grade = _grade;
        students[_studentAddress].grades[students[_studentAddress].numberOfGrades].subject = _subject;
        students[_studentAddress].numberOfGrades++;
    }
    
    // ici on place dans le returns un tableau vide , on place dans le return ce qu'on veut que la fonction retourne
    // on veut que la fonction retour un tableau de notes donc on initialise un tableau vide qu'on met dans memory
    // inutile de le stocker dans la blockchain donc il va dans memory et pas storage sinon la prochaine 
    function getGrades(address _studentAddress) public view returns (uint[] memory) {
        uint numberGradesThisStudent = students[_studentAddress].numberOfGrades;
        // ici on crée le tableau de notes , quand on crée un nouveau tableau on doit toujours lui donner une longueur
        // une taille , ici la taille c'est le nombre de note de l'eleve
        uint[] memory grades = new uint[](numberGradesThisStudent);
        for(uint i = 0 ; i < numberGradesThisStudent ; i++ ) {
            grades[i] = students[_studentAddress].grades[i].grade;
        }
        return grades;
    }
    

    function showListOfTeachers() public view returns (address[] memory) {
        return ListOfTeachers;
    }
    
        function showListOfStudents() public view returns (address[] memory) {
        return ListOfStudents;
    }
    
        function getTeachCount() public view returns (uint){

        return teacherCount;
    }
        
        function getStudentCount() public view returns (uint){

        return studentCount;
    }
    
}