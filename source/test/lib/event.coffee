should = require 'should'
Base = require '../../lib/base'
Event = require '../../lib/event'

describe 'Event', ->
  it 'should be a class', ->
    (Object.create Event::).should.be.an.instanceof Event

  it 'should be a subclass of Base', ->
    Event::.should.be.an.instanceof Base
