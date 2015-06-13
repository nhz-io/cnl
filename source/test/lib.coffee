lib = require '../lib'

test = require './suite/lib/base'
test lib.Base

test = require './suite/lib/event'
test lib.Event

test = require './suite/lib/node'
test lib.Node

test = require './suite/lib/evented'
test lib.Evented

test = require './suite/lib/element'
test lib.Element

test = require './suite/lib/style'
test lib.Style

test = require './suite/lib/shape'
test lib.Shape

test = require './suite/lib/component'
test lib.Component
