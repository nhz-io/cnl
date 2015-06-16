# CLASS: Style
* Extends: [Base][Base]

A base class for all styles.

    module.exports = class Style extends require './base'

## CONSTRUCTOR

### new Style(args)
* Returns:

Creates **Style** instance and initializes **#mapper** and **data**.

      constructor: (args = {}) ->
        super
        @mapper = args.mapper if args.mapper
        @data = args.data or {}

#### PARAMETERS

**args**
* Type: [Object][Object]

**args.mapper**
* Type: [Function][Function]

**args.data**
* Type: [Object][Object]

---

## METHODS

### #load(json, callback)
* Returns [Style][Style]

Loads the style from JSON data (asynchronous image loading) and calls
the callback with the status and result.

      load: (json, callback) ->
        if json then @mapper json, @data, callback
        return this

---

### #get(keys...)
* Returns [Array][Array]
* Returns [Object][Object]

Get style data for passed keys. 

      get: (keys...) ->
        return @data unless length = keys.length

        result = []
        if length is 1 and keys[0] instanceof Array then keys = keys[0]
        for key in keys then result.push @data[key] if @data[key]?

        return (if result.length is 1 then result[0] else result)

#### PARAMETERS
**keys**
* Type: VARARGS (SPLAT)

---

### #mapper(data, context, callback)
* Returns: UNKNOWN

A dummy stub mapper for descendants to call `super` on

      mapper: (data, context, callback) -> callback()

#### PARAMETERS

**data**
* Type:[Object][Object]

**context**
* Type: [Object][Object]

**callback**
* Type: `function(error, result) { ... }`

[Base]: ./base.litcoffee
[Array]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
