Event = require './event'

module.exports = class Element extends require './evented'
  constructor: (args = {}) ->
    super
    this[key] = args[key] if args[key] for key in ['origin', 'size', 'state', 'style']
    (@styles ||= {}) and @styles[key] = value for key, value of args.styles
    (@states ||= {}) and @states[key] = value for key, value of args.states

    for name in ['mousemove', 'mousedown', 'mouseup', 'update', 'render']
      do (name) => @addListener name, ((e) -> e.stop() unless @events?[name]), yes

  update: (args) ->
    if @events?.update then @broadcastEvent new Event
      type:'update', target:this, args:args
    return this

  render: (context, args) ->
    if @events?.render then @broadcastEvent new Event
      type:'render', target:this, context:context, args:args
    return this
