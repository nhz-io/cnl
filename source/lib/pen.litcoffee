# CLASS: Pen
* Extends: [Base][Base]

A base class for all pens.

    module.exports = class Pen extends require './base'
      constructor: -> return => @draw?.apply this, arguments

## CONSTRUCTOR

### new Pen

Returns a pen function which passes it's arguments to hidden #draw method.

[Base]: ./base.litcoffee
