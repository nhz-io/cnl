should = require 'should'
cnl = require '../index'

describe 'CNL', ->
  it 'should have a lib namespace', -> cnl.lib.should.not.be.empty
