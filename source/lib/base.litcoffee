# CLASS: Base

All classes extend this.

    module.exports = class Base

## CONSTRUCTOR

**new Base()**

Creates [Base][Base] instance. Call `super` from descendant class
if **___runtime** is required.

      constructor: -> Object.defineProperty this, '___runtime',
        enumerable:no, writable:no, configurable:no, value:{}

## PROPERTIES

### #___runtime
* Type: [Object][Object]

Private property which serves as a heap of data that should not
be exposed on the instance. Created with enumerable, configurable
and writable set **no**.

[Base]: ./base.litcoffee
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

