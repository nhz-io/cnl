Event = require './event'

module.exports = class Shape extends require './element'
  constructor: (args = {}) ->
    super
    this[key] = args[key] if args[key] for key in ['origin', 'size', 'state', 'style']
    (@styles ||= {}) and @styles[key] = value for key, value of args.styles
    (@states ||= {}) and @states[key] = value for key, value of args.states
    (@events ||= {}) and @events[key] = value for key, value of args.events
    (@zones ||= {}) and @zones[key] = value for key, value of args.zones

    @addListener 'mousemove', @mouseMoveListener, yes
    @addListener 'mousedown', @mouseDownListener, yes
    @addListener 'mouseup', @mouseUpListener, yes

  getZones: (x, y, zones = @zones) ->
    result = {}
    if @origin
      x -= @origin.x or 0
      y -= @origin.y or 0

    result[name] = $ for name, $ of zones when (
      $[0] <= x <= ($[0] + $[2]) and $[1] <= y <= ($[1] + $[3])
    )
    return result

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
    @broadcastEvent new Event type:'draw', target:this
    return this
