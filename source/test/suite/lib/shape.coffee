should = require 'should'
Element = require '../../../lib/element'

module.exports = (Test, name = 'Element') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test

    it 'should be a subclass of Element', ->
      Test::.should.be.an.instanceof Element
