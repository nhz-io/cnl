should = require 'should'

module.exports = (Test, name = 'Base') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test
