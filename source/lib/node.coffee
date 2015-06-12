module.exports = class Node extends require './base'
  constructor: (args = {}) ->
    @children = args.children or []
    @parent = args.parent or null

  appendChild: (child) ->
    if child instanceof Node and -1 is @children.indexOf child
      if parent = child.parent then parent.removeChild child
      child.parent = this
      @children.push child
    return this

  removeChild: (child) ->
    if child instanceof Node and -1 isnt idx = @children.indexOf child
      child.parent = null
      @children.splice idx, 1
    return this
