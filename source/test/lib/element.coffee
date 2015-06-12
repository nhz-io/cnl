should = require 'should'
Node = require '../../lib/node'
Element = require '../../lib/element'

describe 'Element', ->
  it 'should be a class', ->
    (Object.create Element::).should.be.an.instanceof Element

  it 'should be a subclass of Node', ->
    Element::.should.be.an.instanceof Node
