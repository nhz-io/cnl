parallel = require 'nhz.lib/dist/async/parallel'
module.exports = class Style extends require './base'
  constructor: (args = {}) ->
    {@json} = args

  load:(json..., callback) ->
    @json = json[0] or @json or {}


  toJSON: -> @json
