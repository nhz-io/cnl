# CLASS: Element
* Extends: [Evented][Evented]

Visual Element

    Event = require './event'

    localizeEventCoordinates = require '../helper/localize-event-coordinates'

    module.exports = class Element extends require './evented'
      ###*
        @constructor Element
        @param {Object} args
      ###
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

      ###* @memberof Element# ###
      mousemoveCaptureListener: (event) ->
        @___runtime.mousemoveEvent = event
        localizeEventCoordinates event, @origin
        return this

      ###*
        * @method mousedownCaptureListener
        * @memberof Element#
        * @param {Event} event
      ###

      mousedownCaptureListener: (event) ->
        @___runtime.mousedownEvent = event
        localizeEventCoordinates event, @origin
        return this

      ###*
        * @method mouseupCaptureListener
        * @memberof Element#
        * @param {Event} event
      ###

      mouseupCaptureListener: (event) ->
        @___runtime.mouseupEvent = event
        localizeEventCoordinates event, @origin
        return this

      mousedownListener: -> this

      mouseupListener: -> this

      mousemoveListener: -> this

      ###*
        * @method update
        * @memberof Element
        * @param {Object} args
      ###

      update: (args) ->
        if @events?.update then @broadcastEvent new Event
          type:'update', target:this, args:args
        return this

      ###*
        * @method render
        * @memberof Element
        * @param {CanvasRenderingContext2D} context
      ###

      render: (context) ->
        if @events?.render then @broadcastEvent new Event
          type:'render', target:this, context:context, args:args
        if children = @children then (child.render context for child in children)
        return this

[Evented]: ./evented.litcoffee
