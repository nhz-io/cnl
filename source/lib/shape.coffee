Event = require './event'

module.exports = class Shape extends require './element'
  constructor: (args = {}) ->
    super
    @origin = args.origin or @origin or x:0, y:0
    @size = args.size or @size or width:0, height:0
    @addEventListener 'draw', (e) => @drawListener e
    @addEventListener 'update', (e) => @updateListener e

  drawListener: ->

  updateListener: ->

  draw: (context, args) ->
    @broadcastEvent new Event type:'draw', target:this
    return this

  update: ->
    @broadcastEvent new Event type:'update', target:this
    return this

  style: (value) ->
    if value instanceof cnl.lib.Style
      @update style:value.get()
      return super
    super()

