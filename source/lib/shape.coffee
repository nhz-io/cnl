Event = require './event'

findZones = (zones, x, y) ->
  result = {}
  result[name] = $ for name, $ of zones when (
    $[0] <= x <= ($[0] + $[2]) and $[1] <= y <= ($[1] + $[3])
  )
  return result

module.exports = class Shape extends require './element'
  constructor: (args = {}) ->
    super
    (@zones ||= {}) and @zones[key] = value for key, value of args.zones

    for name in ['draw']
      do (name) => @addListener name, ((e) -> e.stop() unless @events?[name]), yes

  mousemoveListener: (event) ->
    super
    event.zones = findZones @zones, event.localX, event.localY
    return this

  mousedownListener: (event) ->
    super
    event.zones = findZones @zones, event.localX, event.localY
    return this

  mouseupListener: (event) ->
    super
    event.zones = findZones @zones, event.localX, event.localY
    return this

  draw: (context, args) ->
    if @events?.draw then @broadcastEvent new Event
      type:'draw', target:this, context:context, args:args
    return this
