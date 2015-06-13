should = require 'should'
cnl = require '../index'

describe 'CNL', ->
  it 'should have a lib namespace', -> cnl.lib.should.not.be.empty
  it 'should have a pen namespace', -> cnl.pen.should.not.be.empty
  it 'should have a style namespace', -> cnl.style.should.not.be.empty
