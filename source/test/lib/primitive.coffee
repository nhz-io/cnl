should = require 'should'
Shape = require '../../lib/shape'
Primitive = require '../../lib/primitive'

describe 'Primitive', ->
  it 'should be a class', ->
    (Object.create Primitive::).should.be.an.instanceof Primitive

  it 'should be a subclass of Shape', ->
    Primitive::.should.be.an.instanceof Shape
