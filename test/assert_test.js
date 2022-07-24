const assert = require('assert');

describe('+', () => {
  //only run this test
  it('returns the sum of two values', () => {
    // Setup
    let expected = { a: 3, b: 4, result: 7 };
    let sum = { a: 3, b: 4 };

    // Exercise
    sum.result = sum.a + sum.b;

    // Verify
    assert.deepEqual(sum, expected);
  });
});




describe('pluse', () => {
  it('returns the sum of two values', () => {
    // Setup
    let expected = [3, 4, 7];
    let sum = [3, 4];

    // Exercise
    sum.push(3 + 4);

    // Verify
    assert.deepEqual(sum, expected);
  });
});


describe('Numbers', () => {
  it('1 does not equal 2', () => {
    // Verify
    assert.notStrictEqual(1, 2);
  });
});
