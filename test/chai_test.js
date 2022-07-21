const chai = require('chai')
  , assert = chai.assert
  , expect = chai.expect
  , should = chai.should()


describe('String Checking', () => {
  let name = "Sophia";
  it('what is the type of value', () => {
    name.should.be.a('string')
    expect(name).to.be.a('string')
    assert.typeOf(name, 'string')
  })


  //only(only test this one) and skip(skip this test)
  it("name value is Sophia", () => {
    name.should.not.equal("Steven")
    name.should.equal('Sophia');
    expect(name).to.equal('Sophia');
    assert.equal(name, 'Sophia')

  })


})