# [mocha testing](https://mochajs.org/)

---
## Install Mocha
```
$ npm install mocha
$ mkdir test
$ $EDITOR test/test.js # or open with your favorite editor

```

## Install with npm globally:

```
$ npm install --global mocha
```
## or as a development dependency for your project:

```
$ npm install --save-dev mocha
```

## Set up a test script in package.json:

```
"scripts": {
  "test": "mocha"
}
```
## Then run tests with:

```
npm test
```
---
## describe and it blocks

In Mocha we group tests using the `describe` function and define tests using the `it` function. 

These two functions can be used to make your test suite complete, maintainable, and expressive in the following ways:

1. Structure your test suite: you can organize tests into nested groups that reflect the structure of your implementation code.

2. Provide informative messages: you can define your tests using human-readable strings.


Both the `describe` and `it` functions accept two parameters: a **descriptive string** and a **callback function**. Though the functions are flexible, they are commonly used in the structure above: nest `describe` blocks to resemble the structure of your implementation code and write individual tests in `it` blocks. 


If you are testing a Math object with the method .max, you could use the following test code.

```
describe('Math', () => {
  describe('.max', () => {
    it('returns the argument with the highest value', () => {
      // Your test goes here
    });
    it('returns -Infinity when no arguments are provided', () => {
      // Your test goes here
    });
  });
});
```
---

## assert

 To write the tests themselves, we can use the `assert.ok `method provided by Node.js.

` assert.ok()` allows you to compare values and throw errors as needed using one function call. The small, human-readable format of the functions will help you make a more expressive test suite.

As a Node module, assert can be imported at the top of your files with

```
const a = 1 + 2;

if (a !== 3) {
  throw 'Test failed! a is not 3'
} 

const assert = require('assert');
assert.ok(a === 3);

```

In this case a === 3 evaluates to true, so no error is thrown.

If an argument passed to assert.ok() evaluates to false, an AssertionError is thrown. The error communicates to Mocha that a test has failed, and Mocha logs the error message to the console.

---

## Setup, Exercise, and Verify

The phases are defined as follows:

1. Setup - create objects, variables, and set conditions that your test depends on

2. Exercise - execute the functionality you are testing

3. Verify - check your expectations against the result of the exercise phase. You can use the `assert` library here


Clear separation of each phase makes a test easier to read, change, and validate.

```

const assert = require('assert');

// Naive approach
describe('.pop', () => {
  it('returns the last element in the array [naive]', () => {
    assert.ok(['padawan', 'knight'].pop() === 'knight'); 
  });
});

// 3 phase approach
describe('.pop', () => {
  it('returns the last element in the array [3phase]', () => {
    // Setup
    const knightString = 'knight';
    const jediPath = ['padawan', knightString];

    // Exercise
    const popped = jediPath.pop();

    // Verify
    assert.ok(popped === knightString);
  });
});


```
---

## Teardown (fs_test.js)
Running multiple tests can introduce issues if the tests make changes to the testing environment: changes to the environment in one test might affect the next test

To address this issue, we often add a teardown step to the end of our tests. The teardown phase makes our tests isolated by resetting the environment before the next test runs. This provides two key benefits:

- Changes to the environment caused by one test do not affect the other tests.
- Isolated tests can be executed in any order!

---

## Hooks
While execution and verification are unique to each test, setup and teardown are often similar or even identical for multiple tests within a test suite. The Mocha test framework provides functions that enable us to reduce repetition, simplify the scope of each test, and more finely control the execution of our tests.

These functions (also referred to as hooks) are:

- beforeEach(callback) - callback is run before each test
  
- afterEach(callback) - callback is run after each test

- before(callback) - callback is run before the first test

- after(callback) - callback is run after the last test

Each hook accepts a callback to be executed at various times during a test. The `before...` hooks naturally happen before tests and are useful for separating out the setup steps of your tests. 

Meanwhile, the `after...` hooks are executed after tests and are useful for separating out the teardown steps of your tests.


```
describe('messing around with hooks', () => {
 
  let testValue; // Variable used by both tests
 
  beforeEach(() => {
    testValue = 5;
  });
 
  it('should add', () => {
    // testValue = 5 <-- moved to beforeEach()
    testValue = testValue + 5;
    assert.equal(testValue, 10);
  });
 
  it('should multiply', () => {
    // testValue = 5 <-- moved to beforeEach()
    testValue = testValue * 5;
    assert.equal(testValue, 25);
  });
 
});

```

In this example, while each it() block could have set the testValue to 5, using the beforeEach() hook allows us to avoid that repetition while keeping each test isolated.

---

## Write Expressive Tests
