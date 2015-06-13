Event = require './event'

module.exports = class Shape extends require './element'
  constructor: (args = {}) ->
    super
    @origin = args.origin or @origin or x:0, y:0
    @size = args.size or @size or width:0, height:0
    @addEventListener 'draw', (e) => @drawListener e

  drawListener: ->

  draw: (context, args) ->
    @broadcastEvent new Event type:'draw', target:this
    return this
