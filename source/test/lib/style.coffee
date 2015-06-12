should = require 'should'
Base = require '../../lib/base'
Style = require '../../lib/style'

describe 'Style', ->
  it 'should be a class', ->
    (Object.create Style::).should.be.an.instanceof Style

  it 'should be a subclass of Base', ->
    Style::.should.be.an.instanceof Base
