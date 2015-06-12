should = require 'should'
Base = require '../../../lib/base'

module.exports = (Test, name = 'Element') ->
  describe name, ->
    it 'should be a class', ->
      Test.should.be.a.Function
      Test::constructor.should.be.equal Test
      (Object.create Test::).should.be.an.instanceof Test

    it 'should be a subclass of Base', ->
      Test::.should.be.an.instanceof Base
