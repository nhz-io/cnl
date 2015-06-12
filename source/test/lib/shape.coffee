should = require 'should'
Element = require '../../lib/element'
Shape = require '../../lib/shape'

describe 'Shape', ->
  it 'should be a class', ->
    (Object.create Shape::).should.be.an.instanceof Shape

  it 'should be a subclass of Element', ->
    Shape::.should.be.an.instanceof Element
