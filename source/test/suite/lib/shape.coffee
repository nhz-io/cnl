should = require 'should'
Element = require '../../../lib/element'

module.exports = (Test, name = 'Shape') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test

    it 'should be a subclass of Element', ->
      Test::.should.be.an.instanceof Element

    describe '#constructor()', -> it 'should return an instance of Shape', -> (new Test).should.be.an.instanceof Test

    describe 'instance', ->
      it 'should have a draw() method', -> (new Test).render.should.be.a.Function

      describe '#draw()', ->
        it 'should return the shape', -> (test = new Test).draw().should.be.equal test
