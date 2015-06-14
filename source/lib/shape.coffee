Event = require './event'

module.exports = class Shape extends require './element'
  constructor: (args = {}) ->
    super
    (@zones ||= {}) and @zones[key] = value for key, value of args.zones

    for name in ['draw']
      do (name) => @addListener name, ((e) -> e.stop() unless @events?[name]), yes

    for name in ['mousemove', 'mousedown', 'mouseup']
      do (name) => @addListener name, this["#{name}Listener"], yes

  mousemoveListener: (event) ->
    if (type = event.type) and @events?[type]
      event.zones = @getZones event.x, event.y

  mousedownListener: ->
    if (type = event.type) and @events[type]
      event.zones = @getZones event.x, event.y

  mouseupListener: ->
    if (type = event.type) and @events[type]
      event.zones = @getZones event.x, event.y

  draw: (context, args) ->
    if @events?.draw then @broadcastEvent new Event
      type:'draw', target:this, context:context, args:args
    return this

  getZones: (x, y, zones = @zones) ->
    result = {}
    if @origin
      x -= @origin.x or 0
      y -= @origin.y or 0

    result[name] = $ for name, $ of zones when (
      $[0] <= x <= ($[0] + $[2]) and $[1] <= y <= ($[1] + $[3])
    )
    return result
