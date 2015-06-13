Style = require './style'
Event = require './event'

module.exports = class Element extends require './evented'
  constructor: (args = {}) ->
    super
    @_style = args.style or @_style
    @_state = args.state or @_state
    @addEventListener 'state', (e) => @stateListener e
    @addEventListener 'style', (e) => @styleListener e
    @addEventListener 'render', (e) => @renderListener e

  stateListener: ->

  styleListener: ->

  renderListener: ->

  state: (value) ->
    if arguments.length
      state = @_state
      @_state = value
      @broadcastEvent new Event type:'state', target:this, value:value, old:state
    return @_state

  style: (value) ->
    if arguments.length
      style = @_state
      @_style = value
      @broadcastEvent new Event type:'style', target:this, value:value, old:style
    return @_style

  render: (context, args) ->
    @broadcastEvent new Event type:'render', target:this
    return this
