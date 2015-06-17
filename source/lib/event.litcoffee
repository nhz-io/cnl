# CLASS: Event
* Extends: [Base][Base]
* Parent: [lib][lib]

This class provides a data transport between instances of [Evented][Evented].
Any instance of this class must have at least the **type** property set
so that [Evented][Evented] methods will not drop it. This class does not provide
any functionality and mostly saves as the envelope for data.

      module.exports = class Event extends require './base'

## CONSTRUCTOR

### new Event(type)
### new Event(callback)
### new Event(args, callback)
### new Event(type, callback)

* Returns: [Event][Event]

Create the event. All the key-value pairs from **args** will be copied
to the event instance. If **callback** is provided in the **args**, it
will override the **callback** provided as the second argument.

Upon instance creation, the event will log it's creation timestamp. This
can be disabled by passing `timestamp:null` to constructor.

Any Event instance at its minimum will have **timestamp** property. This
is the only mandatory property.

Create Event instance, accepting arguments in multiple forms.

      constructor: (args = {}, callback) ->

Set the event type to the value of the first argument if it is a [String][String]

        if typeof args is 'string' then args = type:args 

Otherwise, set the `args` to empty [Object][Object] and `callback` to the value of the
first argument if it is a [Function][Function].

        else if (arguments.length < 2) and typeof args is 'function'
            callback = args
            args = {}

Copy contents of args into this instance

        this[key] = value for key, value of args

Overwrite the **#callback** only if it is not set.

        @callback = callback if callback and not @callback

Calculate and set the event creation timestamp if it was not disabled or set from **args**

        if (args.timestamp is true) or not args.hasOwnProperty 'timestamp'
          date = Date.now()
          perf = performance?.now() or 0
          @timestamp = 1000 * date + Math.floor 1000 * (perf - Math.floor perf)

### PARAMETERS
**args**
* Type: [Object][Object] - event data

**args.type**
* Type: [String][String] - event type

**args.callback**
* Type: [Function][Function] - event completion callback
* Optional
* Overrides the **callback** parameter

**args.timestamp**
* Type: [Boolean][Boolean] - set to `false` to disable the timestamp calculation
* Type: [Number][Number] - event timestamp

**type**
* Type: [String][String] - event type

**callback**
* Type: [Function][Function] - event completion callback
* Optional

---

## PROPERTIES

### #type
* Type: [String][String] - event type

### #phase
* Type: [Number][Number] - event phase (1..3)

### #timestamp
* Type: [Number][Number] - event creation timestamp

### #callback
* Type: [Function][Function] - event completion callback

---

## FLAGS

### #started
* Type: [Boolean][Boolean] - event **started** flag

### #stopped
* Type: [Boolean][Boolean] - event **stopped** flag

### #canceled
* Type: [Boolean][Boolean] - event **canceled** flag

### #aborted
* Type: [Boolean][Boolean] - event **aborted** flag

### #done
* Type: [Boolean][Boolean] - event **done** flag

---

## METHODS

### #start()
* Returns [Event][Event]

**started** flag setter

      start: -> (@started = yes) and this

---

### #stop()
* Returns [Event][Event]

**stopped** flag setter

      stop: -> (@stopped = yes) and this

---

### #cancel()
* Returns [Event][Event]

**canceled** flag setter

      cancel: -> (@canceled = yes) and this

---

### #abort()
* Returns [Event][Event]

**aborted** flag setter

      abort: -> (@aborted = yes) and this

---

### finish()
* Returns [Event][Event]

**done** flag setter

      finish: -> (@done = yes) and this

[lib]: ./index.litcoffee
[Evented]: ./evented.litcoffee
[Base]: ./base.litcoffee
[Event]: ./event.litcoffee
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
