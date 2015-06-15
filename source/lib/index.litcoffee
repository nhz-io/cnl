# Namespace: lib

    module.exports =
      Base      : require './base'
      Event     : require './event'
      Node      : require './node'
      Evented   : require './evented'
      Element   : require './element'
      Shape     : require './shape'
      Component : require './component'
      Pen       : require './pen'
      Style     : require './style'

## Exports

* [lib.Base][Base] - All classes extend this.

* [lib.Event][Event] - Light Event

* [lib.Node][Node] - Parent-Child Aggregation

* [lib.Evented][Evented] - Event Subsytem

* [lib.Element][Element] - Visual Element

* [lib.Shape][Shape] - Drawable Shape

* [lib.Component][Component] - Dragable Component

* [lib.Style][Style] - Element Style

* [lib.Pen][Pen] - Common ancestor for pens

[Base]: ./base.litcoffee
[Event]: ./event.litcoffee
[Node]: ./node.litcoffee
[Evented]: ./evented.litcoffee
[Element]: ./element.litcoffee
[Shape]: ./shape.litcoffee
[Component]: ./component.litcoffee
[Style]: ./style.litcoffee
[Pen]: ./pen.litcoffee
