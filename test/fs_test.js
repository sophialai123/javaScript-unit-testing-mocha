//use Node’s filesystem library fs in addition to assert

/* 

1. fs.appendFileSync(path, str) creates a new file at path with the string str as content. If a file at path exists, the string str will be appended to the end.

2. fs.readFileSync(path) returns the contents of the file found at path.

*/


const assert = require('assert');
const fs = require('fs');
let path, str;

describe('appendFileSync', () => {
  it('creates a new file with a string of text', () => {

    // Setup
    path = './message.txt';
    str = 'Hello Node.js';

    // Exercise: write to file
    fs.appendFileSync(path, str);

    // Verify: compare file contents to string
    const contents = fs.readFileSync(path);
    assert.equal(contents.toString(), str);

    // Teardown: restore file
    fs.unlinkSync(path);
  });

  it('creates a new file with a string of text', () => {

    // Setup
    path = './message.txt';
    str = '';

    // Exercise: write to file
    fs.appendFileSync(path, str);

    // Verify: compare file contents to string
    const contents = fs.readFileSync(path);
    assert.equal(contents.toString(), str);

    // Teardown: restore file
    fs.unlinkSync(path);

  });
});
