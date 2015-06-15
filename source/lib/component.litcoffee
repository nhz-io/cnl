# Class: Component

    Event = require './event'
    localizeEventCoordinates = require '../helper/localize-event-coordinates'

    module.exports = class Component extends require './shape'
      constructor: (args = {}) ->
        super
        for name in ['grab', 'release', 'drag']
          do (name) =>
            @addListener name, ((e) -> e.stop() unless @events?[name]), yes
            @addListener name, ((e) -> e.stop() unless @events?[name]), no

        for name in ['grab', 'release', 'drag']
          @addListener name, this["#{name}CaptureListener"], yes

      mousemoveCaptureListener: (event) ->
        super
        if @___runtime.grab
          @state =
          if zones = event.zones
            @state = (if zones.hover then 'hover' else if zones.normal then 'normal')

      mouseupCaptureListener: (event) ->
        super
        ($ = @___runtime).grab = false

        if $.grab
          $.grab = false
          @state = null
          if @events?.release
            @broadcastEvent $.releaseEvent = new Event type:'release',
              x:event.x, y:event.y, target:this

      mousemoveListener: (event) ->
        super
        $ = @___runtime
        if $.grab
          @state = 'active'
          if @events?.drag
            @broadcastEvent $.dragEvent = new Event type:'drag',
              x:event.x, y:event.y, target:this
              offsetX: event.x - ($.dragEvent?.x or $.grabEvent?.x or 0)
              offsetY: event.y - ($.dragEvent?.y or $.grabEvent?.y or 0)
        else
          @state = null
          if states = event.states
            @state = (if states.hover then 'hover' else if states.normal then 'normal')

        return this

      mousedownListener: (event) ->
        super
        ($ = @___runtime).grab = true
        if (@state is 'active') and @events?.grab
          @broadcastEvent $.grabEvent = new Event type:'grab',
            x:event.x, y:event.y, target:this
        return this

      mouseupListener: (event) ->
        super
        $ = @___runtime
        @state = null
        if zones = event.zones
          @state = (if zones.hover then 'hover' else if zones.normal then 'normal')
        if $.grab
          $.grab = false
          @state = null
          if states = event.states
            @state = (if states.hover then 'hover' else if states.normal then 'normal')

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
