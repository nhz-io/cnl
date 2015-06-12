should = require 'should'
Element = require '../../lib/element'
baseTest = require '../suite/lib/base'
nodeTest = require '../suite/lib/node'
elementTest = require '../suite/lib/element'

baseTest Element, 'Element'
nodeTest Element, 'Element'
elementTest Element, 'Element'

