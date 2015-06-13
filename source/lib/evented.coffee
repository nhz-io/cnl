Event = require './event'
module.exports = class Evented extends require './node'
  constructor: ->
    super
    @listeners = [{}, {}]

  addEventListener: (type, listener, capture = false) ->
    if type instanceof Object then {type, listener, capture} = type
    if type and typeof listener is 'function'
      listeners = (@listeners[if capture is true then 1 else 0][type] ||= [])
      listeners.push listener if -1 is listeners.indexOf listener
    return this

  removeEventListener: (type, listener, capture = false) ->
    if type instanceof Object then {type, listener, capture} = type
    if type and typeof listener is 'function'
      if listeners = @listeners[if capture is true then 1 else 0][type]
        listeners.splice idx, 1 if -1 isnt idx = listeners.indexOf listener
    return this

  dispatchEvent: (event) ->
    if (type = event?.type) and not event.aborted
      phase = event.phase
      if phase > 0 and phase < 3 and listeners = @listeners[2-phase][type]
        event.start()
        for listener in listeners
          break if event.stopped or event.aborted
          listener.call this, event
    return this

  broadcastEvent: (event , target) ->
    if type = event?.type
      unless event.aborted or event.done or event.phase is 3
        event.start()
        event.source ||= this
        event.target ||= target
        phase = (event.phase ||= 1)

        if event.target is this then event.phase = 2

        if event.phase is 1
          @dispatchEvent event

          for child in @children
            if event.phase is 1 and not event.aborted
              child.broadcastEvent event
            else break

        if event.phase is 2 then @dispatchEvent event

        if event.source is this
          unless event.canceled or event.aborted or event.done or event.phase is 3
            event.callback?.call this, event
          event.phase = 3
          event.finish()
    return this
