should = require 'should'
mapper = require '../../../lib/mapper/index'

describe 'lib.mapper namespace', ->
  it 'should have a css2json mapper', -> mapper.css2json.should.be.a.Function

