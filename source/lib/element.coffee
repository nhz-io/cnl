Style = require './style'

module.exports = class Element extends require './evented'
  constructor: (args = {}) ->
    @style = if args.style instanceof Style then args.style else @style

  render: (context, args) -> this
