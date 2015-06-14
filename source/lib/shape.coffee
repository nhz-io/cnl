Event = require './event'

findPointZones = (x, y, zones) ->
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
      do (name) =>
        @addListener name, ((e) -> e.stop() unless @events?[name]), yes
        @addListener name, ((e) -> e.stop() unless @events?[name]), no

  mousemoveCaptureListener: (event) ->
    super
    if zones = findPointZones event.localX, event.localY, @zones
      event.zones = zones
      for name in ['active', 'hover', 'normal'] when zones[name]
        state = name
        break
      if (@state = state or null) then event.target = this
    return this

  mousedownCaptureListener: (event) ->
    super
    if zones = findPointZones event.localX, event.localY, @zones
      event.zones = zones
      for name in ['active', 'hover', 'normal'] when zones[name]
        state = name
        break
      if (@state = state or null) then event.target = this
    return this

  mouseupCaptureListener: (event) ->
    super
    if zones = findPointZones event.localX, event.localY, @zones
      event.zones = zones
      for name in ['active', 'hover', 'normal'] when zones[name]
        state = name
        break
      if (@state = state or null) then event.target = this
    return this

  draw: (context, args) ->
    if @events?.draw then @broadcastEvent new Event
      type:'draw', target:this, context:context, args:args
    return this
