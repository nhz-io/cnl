# cnl tests
* Parent: [Index][Parent]

## [Element Test][ElementTest]
  
    test = require './element'
    test (require '../element'), 'Element'
    test (require '../shape'), 'Shape'
    test (require '../component'), 'Component'

## [Shape Test][ShapeTest]
    
    test = require './shape'
    test (require '../shape'), 'Shape'
    test (require '../component'), 'Component'

## [Component Test][ComponentTest]
    
    test = require './component'
    test (require '../component'), 'Component'

[Parent]: ../index.litcoffee

[Engine]: ../engine.litcoffee
[Element]: ../element.litcoffee
[Shape]: ../shape.litcoffee
[Pen]: ../pen.litcoffee
[Style]: ../style.litcoffee

[EngineTest]: ./engine.litcoffee
[ElementTest]: ./element.litcoffee
[ShapeTest]: ./shape.litcoffee
[PenTest]: ./pen.litcoffee
[StyleTest]: ./style.litcoffee
