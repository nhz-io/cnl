module.exports = class Node extends require './base'
  constructor: (args = {}) ->
    super
    args.children and @children = args.children
    args.parent and @parent = args.parent

  appendChild: (child) ->
    if child instanceof Node and (@children ||= [])
      if -1 is @children.indexOf child
        child.parent?.removeChild? child
        child.parent = this
        @children.push child
    return this

  removeChild: (child) ->
    if child instanceof Node and @children
      if -1 isnt idx = @children.indexOf child
        delete child.parent
        @children.splice idx, 1
      delete @children if @children.length is 0
    return this
