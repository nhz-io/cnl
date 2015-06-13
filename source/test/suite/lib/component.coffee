should = require 'should'
Shape = require '../../../lib/shape'

module.exports = (Test, name = 'Component') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test

    it 'should be a subclass of Shape', ->
      Test::.should.be.an.instanceof Shape

    describe '#constructor()', -> it 'should return an instance of Component', -> (new Test).should.be.an.instanceof Test
