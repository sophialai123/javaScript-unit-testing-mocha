const assert = require('assert');
const fs = require('fs');
let path, str;


describe('appendFileSync', () => {
  //Run before the first test
  before(() => {
    path = './message.txt'
  })

  //run after each test in the block 
  afterEach(() => {
    // Teardown: restore file
    fs.unlinkSync(path);

  })
  it('writes a string to text file at given path name', () => {

    // Setup

    str = 'Hello Node.js';

    // Exercise: write to file
    fs.appendFileSync(path, str);

    // Verify: compare file contents to string
    const contents = fs.readFileSync(path);
    assert.equal(contents.toString(), str);



  });

  it('writes an empty string to text file at given path name', () => {

    // Setup

    str = '';

    // Exercise: write to file
    fs.appendFileSync(path, str);

    // Verify: compare file contents to string
    const contents = fs.readFileSync(path);
    assert.equal(contents.toString(), str);


  });
});



describe('How to use hooks', () => {
  before(() => {
    console.log('before run before the first test')
  })

  after(() => {
    console.log('after run after the first test')
  })

})

