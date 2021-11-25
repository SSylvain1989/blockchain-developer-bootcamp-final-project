const SchoolManager = artifacts.require("./SchoolManager");

contract('SchoolManager', accounts => {
 it('should add a student', async () => {
  const Contract = await SchoolManager.deployed();
  const result = await Contract.addStudent
  ("0x267a324cf02652f37fbe507c664623cf53444721",
   "John",
   { from: accounts[0] });
  assert.equal(result.logs[0].args.firstName, "John", "not equal to john");
 })

 it('should not add a student who already exist', async () => {
  const Contract = await SchoolManager.deployed();
  let err = null;
  try {
   await Contract.addStudent
   ("0x267a324cf02652f37fbe507c664623cf53444721",
    "John2",
    { from: accounts[0] });
  }
  catch (error) {
    err = error;
  }
  assert.ok(err instanceof Error);
 })

 it('should add a grade of a register student', async () => {
  const Contract = await SchoolManager.deployed();
  const result = await Contract.addGrade
  ("0x267a324cf02652f37fbe507c664623cf53444721",
   11,
   { from: accounts[0] });
  assert.equal(result.logs[0].args.grade, 11, "not equal to grade");
 })

 it('student cannot receive more than one grade', async () => {
  const Contract = await SchoolManager.deployed();
  let err = null;
  try {
   await Contract.addGrade
   ("0x267a324cf02652f37fbe507c664623cf53444721",
    12,
    { from: accounts[0] });
  }
  catch (error) {
    err = error;
  }
  assert.ok(err instanceof Error);
 })

 it('should not add a grade to an unknow student', async () => {
  const Contract = await SchoolManager.deployed();
  let err = null;
  try {
   await Contract.addGrade
   ("0x71d660fd08e8d5a293ec5263e8376e598208c7d3",
    12,
    { from: accounts[0] });
  }
  catch (error) {
    err = error;
  }
  assert.ok(err instanceof Error);
 })

 it('should get the count of register student', async () => {
  const Contract = await SchoolManager.deployed();
  const result = await Contract.addStudent
  ("0x71d660fd08e8d5a293ec5263e8376e598208c7d3",
   "John",
   { from: accounts[0] });
   return assert.equal(
    await Contract.getStudentCount(),
    2
   );
 })
})