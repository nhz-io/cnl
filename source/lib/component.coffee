Event = require './event'

module.exports = class Component extends require './shape'
  constructor: (args = {}) ->
    super
    for name in ['grab', 'release', 'drag']
      do (name) =>
        @addListener name, ((e) -> e.stop() unless @events?[name]), yes
        @addListener name, ((e) -> e.stop() unless @events?[name]), no

    for name in ['grab', 'release', 'drag']
      @addListener name, this["#{name}CaptureListener"], yes

  mousemoveListener: (event) ->
    super
    $ = @___runtime
    if $.grab
      @state = 'active'
      @broadcastEvent $.dragEvent = new Event type:'drag',
        x:event.x, y:event.y, target:this
        offsetX: event.x - ($.dragEvent?.x or $.grabEvent?.x or 0)
        offsetY: event.y - ($.dragEvent?.y or $.grabEvent?.y or 0)
    else
      @state = null
      if zones = @zones
        for name in ['hover', 'normal'] when zones[name]
          @state = name
          break

    return this

  mousedownListener: (event) ->
    super
    ($ = @___runtime).grab = true
    if @state is 'active'
      @broadcastEvent $.grabEvent = new Event type:'grab',
        x:event.x, y:event.y, target:this
    return this

  mouseupListener: (event) ->
    super
    ($ = @___runtime).grab = false
    @broadcastEvent $.grabEvent = new Event type:'release',
      x:event.x, y:event.y, target:this
    return this

  dragCaptureListener: (event) ->
    @___runtime.dragEvent = event
    localizeEventCoordinates event, @origin
    return this

  grabCaptureListener: (event) ->
    @___runtime.grabEvent = event
    localizeEventCoordinates event, @origin
    return this

  releaseCaptureListener: (event) ->
    @___runtime.releaseEvent = event
    localizeEventCoordinates event, @origin
    return this

  dragListener: -> this

  grabListener: -> this

  releaseListener: -> this
