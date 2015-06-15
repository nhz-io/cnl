# Class:Base

    module.exports = class Base

## Constructor

* `new Base()`

Creates private property `___runtime` of type: **Object**. 
This object is a place to store temporary data, which has 
nowhere else to go.

      constructor: -> Object.defineProperty this, '___runtime',
        enumerable:no, writable:no, configurable:no, value:{}

