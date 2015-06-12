should = require 'should'
Base = require '../../lib/base'

describe 'Base', ->
  it 'should be a class', ->
    (Object.create Base::).should.be.an.instanceof Base
