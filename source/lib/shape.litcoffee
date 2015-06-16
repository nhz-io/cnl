# CLASS: Shape

    Event = require './event'

    zonesFromEvent = require '../helper/zones-from-point'

    module.exports = class Shape extends require './element'
      constructor: (args = {}) ->
        super
        (@zones ||= {}) and @zones[key] = value for key, value of args.zones

        for name in ['draw']
          do (name) =>
            @addListener name, ((e) -> e.stop() unless @events?[name]), yes
            @addListener name, ((e) -> e.stop() unless @events?[name]), no

      ###
        All the capturing listeners below find the zones which ma
        All the capturing listeners below find and store the 'active zones'
        in the event. There is a trick used here which involves setting
        an 'event target' to 'this element'. This is done to ensure the
        non-capturing event listeners will be called. It will happen only
        after the event was dispatched to the children of 'this element'
        and none of those children have change the 'event target'.

        and call it's own non-capturing listeners. This can only happen
        if there is at least one 'active zone' for this event
      ###

      mousemoveCaptureListener: (event) ->
        super
        if (zones = @getEventZones event)
          event.zones = zones
          for name in ['active', 'hover', 'normal'] when zones[name]
            state = name
            break
          if (@state = state or null) then event.target = this
        return this

      mousedownCaptureListener: (event) ->
        super
        if (zones = @getEventZones event)
          event.zones = zones
          for name in ['active', 'hover', 'normal'] when zones[name]
            state = name
            break
          if (@state = state or null) then event.target = this
        return this

      mouseupCaptureListener: (event) ->
        super
        if zones = @getEventZones event
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
