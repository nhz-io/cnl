should = require 'should'
Evented = require '../../lib/evented'
baseTest = require '../suite/lib/base'
nodeTest = require '../suite/lib/node'
eventedTest = require '../suite/lib/evented'

baseTest Evented, 'Evented'
nodeTest Evented, 'Evented'
eventedTest Evented, 'Evented'

