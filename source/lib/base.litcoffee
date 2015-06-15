# Class: **Base**

All classes extend this.

    module.exports = class Base

## Base

### new Base()

Creates **Base** instance. Call `super` from descendant class
if **___runtime** is required.

      constructor: -> Object.defineProperty this, '___runtime',
        enumerable:no, writable:no, configurable:no, value:{}

## Properties

### #___runtime

* Type: **Object**

Private property which serves as a heap of data that should not
be exposed on the instance. Created with enumerable, configurable
and writable set **no**.

