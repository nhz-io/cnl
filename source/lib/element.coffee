Style = require './style'
Event = require './event'

module.exports = class Element extends require './evented'
  constructor: (args = {}) ->
    super
    @_style = args.style or @_style
    @_state = args.state or @_state
    @addListener 'update', @updateListener, yes
    @addListener 'render', @renderListener, yes

  updateListener: ->

  renderListener: ->

  update: ->
    @broadcastEvent new Event type:'update', target:this
    return this

  render: (context, args) ->
    @broadcastEvent new Event type:'render', target:this
    return this
