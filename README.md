# [mocha testing](https://mochajs.org/)

---

## Install package json 
`$  npm init --yes`


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

# [Chai Library] (https://www.chaijs.com/)

Install chai

```
$ npm install chai
```

Chai has several interfaces that allow the developer to choose the most comfortable. The chain-capable BDD styles provide an expressive language & readable style, while the TDD assert style provides a more classical feel.

---
## Write Expressive Tests

The functions in the [assert library](https://nodejs.org/api/assert.html) compare values and throw errors as needed using one function call. The small, human-readable format of the functions will help you make a more expressive test suite.

```
assert.ok(6 - 1 === 5);
```
In this case 6 - 1 === 5 evaluates to true, so no error is thrown.

If an argument passed to `assert.ok()` evaluates to false, an AssertionError is thrown. The error communicates to Mocha that a test has failed, and Mocha logs the error message to the console.

---

#### assert.equal

You can instead use assert.equal() which does the == comparison for us.

In the example below, the two methods achieve the same outcome.

```
assert.ok(landAnimals[2] == waterAnimals[2]);
assert.equal(landAnimals[2], waterAnimals[2]);

```

The second line is more expressive: instead of parsing the entire statement, a reader only needs to read the first two words to know the test is verifying equality!

---

#### assert.strictEqual

If you need to be strict in evaluating equality, you can use assert.strictEqual().

`assert.equal()` performs a == comparison

`assert.strictEqual()` performs a === comparison

```
const a = 3;
const b = '3';
assert.equal(a, b);
assert.strictEqual(a, b);
```
---
#### assert.deepEqual I

If you need to compare the values within two objects, you can use` assert.deepEqual()`. This method compares the values of each object using loose` (==)` equality.

```
const a = {relation: 'twin', age: '17'};
const b = {relation: 'twin', age: '17'};

//will not throw an error…
assert.deepEqual(a, b);
```

…and you can confirm by manually comparing the relation and age properties of each object.

```
a.relation == b.relation;
a.age == b.age;
```

---

#### [assert.deepEqual II](https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message)
In the last exercise you used deepEqual() to compare the values of two objects with loose equality. Arrays are also objects, so deepEqual() also compares their values with loose equality.

```
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const arr3 = [1, 2, '3'];
 
assert.deepEqual(arr1, arr2); // No error
assert.deepEqual(arr1, arr3); // No error
```
---
## LEARN TDD WITH MOCHA
Test-driven development (TDD) is a programming technique where you write test code before implementation code. Test code is written to define the desired behavior of your program. The test output provides descriptive error messages that inform the implementation of your program.

The Red-Green-Refactor Cycle

![](red-green-refactor-tdd.png)


- Red — Write tests that describe the intended behavior of implementation code, and then compare developer expectations with the actual results of implementation code. The tests should always fail at first because the implementation code for the desired behavior will be written in response to the failing test.

- Green — Write just enough implementation code to make the test pass. The tests return green because the implementation code executes the intended behavior described by the test in the red phase.

- Refactor — Clean up and optimize code following the characteristics of a good test. Refactoring involves actively considering test and implementation code and making revisions to the code base. The tests are passing and should continue to pass throughout this phase of the cycle.

---
Getting Into The Red I

Step 1: Write The Test

The first step to writing a test with Mocha is to use describe and it blocks to describe the desired behavior of your code. It’s very important for tests to thoroughly describe the desired behavior with natural language. This will create the most helpful error messages and make it easy for you to understand the behavior that your test failed in executing.

```
describe('Phrase', () => {
  describe('.initials', () => {
    it('returns the first letter of each word in a phrase.', () => {
      assert.strictEqual(Phrase.initials('Nelson Mandela'), 'NM');
    })
  })
})
```
Step 2: Run the test

If we ran this test we would get the following error message in the terminal:

Step 3: The test fails (yea!)

The error message tells us that the error is related to the Phrase.initials code block. The ReferenceError tells us that the error is thrown because we don’t have a Phrase object. In the next exercise, we’ll show you the minimum possible code required to get this test to pass.

---

## Red To Green I

The red error messages describe the failures of our implementation code, so we can specifically address each issue that is preventing our test from passing.

---
## Refactor I

Once all your tests pass, you can confidently refactor your code — restructure and improve it without changing its external behavior. The confidence comes from knowing that our tests will catch us if we make a misstep.

When refactoring, it’s critical to test early and often — if our tests turn red, then we know that something went wrong while we were refactoring, and we can undo those changes.

A good place to start with refactoring is to restructure tests to reflect the four phases of a good test: setup, exercise, verification, teardown. 

---

## Getting into the Red II
You have made it through your first red-green-refactor cycle using TDD! The next step is to repeat this cycle.

Once you have a baseline test for your feature, you can start to write additional test cases that force you to write better implementation code.

Let’s consider the test suite for our `Phrase.initials` method. We have one test that checks if `Phrase.initial("Nelson Mandela") returns "NM"`.

```
describe('Phrase', () => {
  describe('.initials', () => {
    it('returns the first letter of each word in a phrase.', () => {
      const inputName = 'Nelson Mandela';
      const expectedInitials = 'NM';
      const result = Phrase.initials(inputName);
      assert.strictEqual(result, expectedInitials);
    });
  });
});
```

Let’s write another test that pushes us to implement a Phrase.initials() method that returns the first letter of each word for “Nelson Mandela” and a different name.

To do this, we will add another it block to our code, and inside the callback function we will again follow the setup, exercise, verification phases for writing tests. This time we will write a test based on the circumstance that the string passed to .initials() has three names: 'Juan Manuel Santos'.

Here is what a second test for .initials() would look like:

```
describe('Phrase', () => {
  describe('.initials', () => {
 
    . . .
 
    it('returns the initials of a name', () => {
      const nameInput = 'Juan Manuel Santos';
      const expectedInitials = 'JMS';
 
      const result = Phrase.initials(nameInput);
 
      assert.strictEqual(result, expectedInitials);
    });
  });
});
 
```

Although the new it block is similar to the existing example, the two together force you to implement a method that will return initials that pass both tests.

The idea of TDD is to continue building tests and going through the red-green-refactor process until you feel confident that your implementation code performs as expected.

---

## Red to Green II

To write a more complete implementation, that could get us back into the green, we could write something like this:

```
const Phrase = {
  initials(inputName) {
    // Create an empty array for initials
    const initials = [];
    // Create an array of strings 
    const words = inputName.split(" ");
    // Iterate through the array of strings and push the first character of each to array
    words.forEach((word) => {
      initials.push(word.charAt(0));
    });
    // Return the initials as one string
    return initials.join("");
  }
}
```
This implementation will successfully pass the tests we have written. Each additional test pushes us to build a complete implementation of the .initials method.

---
## Review


At a high-level the process is:

1. Write The Test — Start with a test describing the functionality we’d like to see.
   
2. Fail The Test — Write code in response to the test that fails.
   
3. Pass The Test — The tests fail and communicate feedback to developers through error messages. It’s our responsibility to read those messages, then respond by writing the minimum amount of code to address those messages.
   
4. Refactor Your Code — See below.
   
The development process is guided by the red-green-refactor cycle.

Red
Write a test that covers the functionality you would like to see implemented. You don’t have to know what your code looks like at this point, you just have to know what it will do.

Run the test. You should see it fail. Most test runners will output red for failure and green for success. While we say “failure” do not take this negatively. It’s a good sign! By seeing the test fail first, we know that once we make it pass, our code works.

Green
Read the error message from the failing test, and write as little code as possible to fix the current error message. By only writing enough code to see our test pass, we tend to write less code as a whole. Continue this process until the test passes.

This may involve writing intermediary features covering lower level functionality which require their own Red, Green, Refactor cycle. The edge-case was an example of this.



Refactor
Clean up your code, reducing any duplication you may have introduced. This includes your code as well as your tests.

Treat your test suite with as much respect as you would your live code, as it can quickly become difficult to maintain if not handled with care. You should feel confident enough in the tests you’ve written that you can make your changes without breaking anything.
