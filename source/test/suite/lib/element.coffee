should = require 'should'
Evented = require '../../../lib/evented'

module.exports = (Test, name = 'Element') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test

    it 'should be a subclass of Evented', ->
      Test::.should.be.an.instanceof Evented

    describe '#constructor()', -> it 'should return an instance of Element', -> (new Test).should.be.an.instanceof Test

    describe 'instance', ->

      describe '#property', ->

      describe '#method()', ->
        it 'should return the element', -> (test = new Test).addEventListener().should.be.equal test
