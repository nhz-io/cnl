module.exports = class Style extends require './base'
  constructor: (args = {}) ->
    super
    @mapper = args.mapper or @mapper
    @data = args.data or {}

  load: (json, callback) ->
    if json then mapper json, @data, callback
    return this

  get: (keys...) ->
    return @data unless length = keys.length

    result = []
    if length is 1 and keys[0] instanceof Array then keys = keys[0]
    for key in keys then result.push @data[key] if @data[key]?

    return (if result.length is 1 then result[0] else result)

  mapper: (data, context, callback) -> callback()
