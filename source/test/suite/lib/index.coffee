should = require 'should'
lib = require '../../../lib/index'

describe 'lib namespace', ->
  it 'should have a Base constructor', -> lib.Base::constructor.should.be.equal lib.Base
  it 'should have an Event constructor', -> lib.Event::constructor.should.be.equal lib.Event
  it 'should have a Node constructor', -> lib.Node::constructor.should.be.equal lib.Node
  it 'should have an Element constructor', -> lib.Element::constructor.should.be.equal lib.Element
  it 'should have an Style constructor', -> lib.Style::constructor.should.be.equal lib.Style
  it 'should have an Shape constructor', -> lib.Shape::constructor.should.be.equal lib.Shape

