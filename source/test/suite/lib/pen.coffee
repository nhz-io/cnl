should = require 'should'

module.exports = (Test, name = 'Shape') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test

    describe '#constructor()', -> it 'should return a pen (Function)', -> (new Test).should.be.a.Function
