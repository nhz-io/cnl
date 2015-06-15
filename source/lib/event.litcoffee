# Class: Event
Light Event.

    module.exports = class Event extends require './base'
      constructor: (args = {}, callback) ->
        if typeof args is 'string' then args = type:args else
          if (arguments.length < 2) and typeof args is 'function'
            callback = args
            args = {}

        this[key] = value for key, value of args

        @callback = callback if callback and not @callback

        unless args.hasOwnProperty 'timestamp'
          date = Date.now()
          perf = performance?.now() or 0
          @timestamp = 1000 * date + Math.floor 1000 * (perf - Math.floor perf)

      start: -> (@started = yes) and this

      stop: -> (@stopped = yes) and this

      cancel: -> (@canceled = yes) and this

      abort: -> (@aborted = yes) and this

      finish: -> (@done = yes) and this
