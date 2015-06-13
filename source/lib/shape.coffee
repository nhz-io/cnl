Event = require './event'

module.exports = class Shape extends require './element'
  constructor: ->
    super
    @addEventListener 'draw', (e) => @drawListener e

  drawListener: ->

  draw: (context, args) ->
    @broadcastEvent new Event type:'draw', target:this
    return this
