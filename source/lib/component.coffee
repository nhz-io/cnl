Style = require './style'
Event = require './event'

module.exports = class Component extends require './shape'
  constructor: (args = {}) ->
    super
    @addEventListener 'mousemove', (e) => @mousemoveListener e
    @addEventListener 'mousedown', (e) => @mousedownListener e
    @addEventListener 'mouseup', (e) => @mouseupListener e

  mousemoveListener: ->

  mousedownListener: ->

  mouseupListener: ->
