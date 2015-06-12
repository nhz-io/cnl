should = require 'should'
Node = require '../../lib/node'
baseTest = require '../suite/lib/base'
nodeTest = require '../suite/lib/node'

baseTest Node, 'Node'
nodeTest Node, 'Node'
