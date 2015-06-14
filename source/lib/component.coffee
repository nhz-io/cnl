Style = require './style'
Event = require './event'

module.exports = class Component extends require './shape'

  mousedownListener: ->
    if (type = event.type) and @events[type]
      event.zones = @getZones event.x, event.y

      if (@state is 'active') and @config.drag
        $ = @___runtime
        dragEvent = new Event 'drag'
        dragEvent.source = this
        dragEvent.x = x
        dragEvent.y = y
        dragEvent.startX = $.dragStartX or 0
        dragEvent.startY = $.dragStartY or 0
        dragEvent.previousX = $.dragPreviousX or 0
        dragEvent.previousY = $.dragPreviousY or 0
        dragEvent.offsetX = x - dragEvent.previousX
        dragEvent.offsetY = y - dragEvent.previousY

        $.dragPreviousX = x
        $.dragPreviousY = y

        if @parent
          @parent.broadcastEvent drag
        else
          @broadcastEvent drag
