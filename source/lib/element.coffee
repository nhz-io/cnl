Event = require './event'

localizeEventCoordinates = (event, origin) ->
  event.localX = (if event.localX? then event.localX else event.x) - (origin?.x or 0)
  event.localY = (if event.localY? then event.localY else event.y) - (origin?.y or 0)

module.exports = class Element extends require './evented'
  constructor: (args = {}) ->
    super
    for key in ['origin', 'size', 'state', 'style']
      this[key] = args[key] if args[key]

    (@styles ||= {}) and @styles[key] = value for key, value of args.styles
    (@states ||= {}) and @states[key] = value for key, value of args.states

    for name in ['mousemove', 'mousedown', 'mouseup', 'update', 'render']
      do (name) =>
        @addListener name, ((e) -> e.stop() unless @events?[name]), yes
        @addListener name, ((e) -> e.stop() unless @events?[name]), no

    for name in ['mousemove', 'mousedown', 'mouseup']
      @addListener name, this["#{name}CaptureListener"], yes
      @addListener name, this["#{name}Listener"], no

  mousemoveCaptureListener: (event) ->
    @___runtime.mousemoveEvent = event
    localizeEventCoordinates event, @origin
    return this

  mousedownCaptureListener: (event) ->
    @___runtime.mousedownEvent = event
    localizeEventCoordinates event, @origin
    return this

  mouseupCaptureListener: (event) ->
    @___runtime.mouseupEvent = event
    localizeEventCoordinates event, @origin
    return this

  mousedownListener: -> this

  mouseupListener: -> this

  mousemoveListener: -> this

  update: (args) ->
    if @events?.update then @broadcastEvent new Event
      type:'update', target:this, args:args
    return this

  render: (context, args) ->
    if @events?.render then @broadcastEvent new Event
      type:'render', target:this, context:context, args:args
    return this
