should = require 'should'
Event = require '../../lib/event'
baseTest = require '../suite/lib/base'
eventTest = require '../suite/lib/event'

baseTest Event, 'Event'
eventTest Event, 'Event'
