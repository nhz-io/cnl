should = require 'should'
Shape = require '../../lib/shape'
Composite = require '../../lib/composite'

describe 'Composite', ->
  it 'should be a class', ->
    (Object.create Composite::).should.be.an.instanceof Composite

  it 'should be a subclass of Shape', ->
    Composite::.should.be.an.instanceof Shape
