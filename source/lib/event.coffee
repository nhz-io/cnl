module.exports = class Event extends require './base'
  constructor: (args = {}, callback) ->
    if typeof args is 'string'
      args = type:args
    else if (arguments.length < 2) and typeof args is 'function'
      callback = args
      args = {}

    {
      @type, @phase,
      @cancelable, @bubbles,
      @source, @taget,
      @bubbling, @sinking,
      @started, @stopped, @canceled, @aborted, @done
    } = args

    date = Date.now()
    perf = performance?.now() or 0
    @callback = args.callback or callback or ->
    @timestamp = 1000 * date + Math.floor 1000 * (perf - Math.floor perf)

  start: ->
    @started = yes
    return this

  stop: ->
    @stopped = yes
    return this

  cancel: ->
    @canceled = yes
    return this

  abort: ->
    @aborted = yes
    return this

  finish: ->
    @done = yes
    return this
