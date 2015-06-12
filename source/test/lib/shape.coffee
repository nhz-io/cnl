should = require 'should'
Shape = require '../../lib/shape'
baseTest = require '../suite/lib/base'
nodeTest = require '../suite/lib/node'
eventedTest = require '../suite/lib/evented'
elementTest = require '../suite/lib/element'
shapeTest = require '../suite/lib/shape'

baseTest Shape, 'Shape'
nodeTest Shape, 'Shape'
eventedTest Shape, 'Shape'
elementTest Shape, 'Shape'
shapeTest Shape, 'Shape'
