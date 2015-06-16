# Function: localize-event-coordinates

    module.exports = (event, origin) ->
      event.localX = (if event.localX? then event.localX else event.x) - (origin?.x or 0)
      event.localY = (if event.localY? then event.localY else event.y) - (origin?.y or 0)
