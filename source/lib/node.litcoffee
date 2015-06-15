# Class: **Node** extends [Base][Base]

Parent-Child aggregation.

    module.exports = class Node extends require './base'

## Node

### new Node(args)

Creates **Node** instance, optionally setting the **parent**
and the **children** properties.

#### Parameters

Name          |  Type            | Description
--------------|:----------------:|----------------------------------
args          | [Object][Object] | Optional constructor arguments
args.children | [Array][Array]   | Optional children list
args.parent   | [Node][Node]     | Optional parent node

      constructor: (args = {}) ->
        super
        args.children and @children = args.children
        args.parent and @parent = args.parent


## Properties

### #parent        

* Type: [Node][Node]
  
Node parent. Created only if passed in args

### #children

* Type: [Array][Array]

List of children. Created only if passed in args

## Methods

### #appendChild(child)

Appends the child to children list. Will not append duplicates!
Removes the child from its previous parent.

#### Parameters

Name          |  Type             | Description
--------------|:----------------:|----------------------------------
child         | [Node][Node]     | A child to append
 
      appendChild: (child) ->
        if child instanceof Node and (@children ||= [])
          if -1 is @children.indexOf child
            child.parent?.removeChild? child
            child.parent = this
            @children.push child
        return this

### #removeChild(child)

Removes the child from children list. Will delete parent property
of the child.

#### Parameters

Name          |  Type             | Description
--------------|:----------------:|----------------------------------
child         | [Node][Node]     | A child to remove

      removeChild: (child) ->
        if child instanceof Node and @children
          if -1 isnt idx = @children.indexOf child
            delete child.parent
            @children.splice idx, 1
          delete @children if @children.length is 0
        return this

[Base]: ./base.litcoffee
[Node]: ./node.litcoffee
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
