should = require 'should'
Base = require '../../lib/base'
Node = require '../../lib/event'

describe 'Node', ->
  it 'should be a class', ->
    (Object.create Node::).should.be.an.instanceof Node

  it 'should be a subclass of Base', ->
    Node::.should.be.an.instanceof Base
