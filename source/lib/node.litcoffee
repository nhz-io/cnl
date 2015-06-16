# CLASS: Node 
* Extends: [Base][Base]

Parent-Child aggregation.

    module.exports = class Node extends require './base'

---

## CONSTRUCTOR

### new Node(args)

Creates **Node** instance, optionally setting the **parent**
and the **children** properties.

      constructor: (args = {}) ->
        super
        args.children and @children = args.children
        args.parent and @parent = args.parent

#### PARAMETERS

**args**
* Type: [Object][Object] - Optional constructor arguments

**args.children**
* Type: [Array][Array] - Optional child list

**args.parent**
* Type: [Node][Node] - Optional parent node

## PROPERTIES

**#parent**
* Type: [Node][Node] - Node parent. Created only if passed in args.

**#children**
* Type: [Array][Array] - List of children. Created only if passed in args

---

## METHODS

### #appendChild(child)

Appends the child to children list. Will not append duplicates!
Removes the child from its previous parent.

      appendChild: (child) ->
        if child instanceof Node and (@children ||= [])
          if -1 is @children.indexOf child
            child.parent?.removeChild? child
            child.parent = this
            @children.push child
        return this

#### PARAMETERS

**child**
* Type: [Node][Node] - The child to append.

---
 
### #removeChild(child)

Removes the child from children list. Will delete parent property
of the child.

      removeChild: (child) ->
        if child instanceof Node and @children
          if -1 isnt idx = @children.indexOf child
            delete child.parent
            @children.splice idx, 1
          delete @children if @children.length is 0
        return this

#### PARAMETERS

**child**
* Type: [Node][Node] - The child to remove.

[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[Base]: ./base.litcoffee
[Node]: ./node.litcoffee
