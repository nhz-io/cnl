# CLASS: Evented
* Extends: [Node][Node]

Event delivery Subsystem.

    Event = require './event'
    module.exports = class Evented extends require './node'

---

## CONSTRUCTOR

### new Evented(args)

Creates **Evented** instance. Initializes **#listeners** and **#events**

      constructor: (args) ->
        super
        (@events ||= {}) and @events[key] = value for key, value of args?.events
        @listeners = [{}, {}]

#### PARAMETERS

**args**
* Type: [Object][Object] - optional constructor argument.

**args.events**
* Type: [Object][Object] - enabled events. (event-name: true/false)

---

## METHODS

### #addListener(args)
### #addListener(type, listener, capture)
* Returns: [Evented][Evented]

Add a listener (per capturing/non-capturing group) for the event type.
Will not add duplicates. Will not add listeners if event is not enabled.

      addListener: (type, listener, capture = false) ->
        if type instanceof Object then {type, listener, capture} = type
        if @events[type] and typeof listener is 'function'
          listeners = (@listeners[if capture is true then 1 else 0][type] ||= [])
          listeners.push listener if -1 is listeners.indexOf listener
        return this

#### PARAMETERS
**args**
* Type: [Object][Object] - type, listener and capture parameters

Only if the first argument to addListener is an [Object][Object]

**type**
* Type: [String][String] - event type

**listener**
* Type: [Function][Function] - event listener

**capture**
* Type: [Boolean][Boolean] - capturing/non-capturing flag
* Default: `false`

---

### #removeListener(args)
### #removeListener(type, listener, capture)
* Returns: [Evented][Evented]

Remove the listener (per capturing/non-capturing group) for the event type.

      removeListener: (type, listener, capture = false) ->
        if type instanceof Object then {type, listener, capture} = type
        if type and typeof listener is 'function'
          if listeners = @listeners[if capture is true then 1 else 0][type]
            listeners.splice idx, 1 if -1 isnt idx = listeners.indexOf listener
        return this

#### PARAMETERS
**args**
* Type: [Object][Object] - type, listener and capture parameters

Only if the first argument to removeListener is an [Object][Object]

**type**
* Type: [String][String] - event type

**listener**
* Type: [Function][Function] - event listener

**capture**
* Type: [Boolean][Boolean] - capturing/non-capturing flag
* Default: `false`

---

### #dispatchEvent(event)
* Returns: [Evented][Evented]

Event dispatcher. Dispatches the event to appropriate listener

      dispatchEvent: (event) ->
        if (type = event?.type) and @event[type] and not event.aborted
          phase = event.phase
          if phase > 0 and phase < 3 and listeners = @listeners[2-phase][type]
            event.start()
            for listener in listeners
              break if event.stopped or event.aborted
              listener.call this, event
        return this

#### PARAMETERS

**event**
* Type: [Event][Event] - event to dispatch

---

### #broadcastEvent(event)
* Returns: [Evented][Evented]

Process the event, dispatch it to listeners and broadcast to children.

      broadcastEvent: (event) ->

No action will be taken if event has no type. This method
will initialize fresh events. 
Only broadcast events that have a type. Event source will be
set to this instance if event has no source. Event target
can be changed by providing it as second argument to broadcast.

        if type = event?.type
          unless event.aborted or event.done or event.phase is 3
            event.start()
            event.source ||= this
            phase = (event.phase ||= 1)

If event target is this instance, it means event has reached it's
destination. Event phase is set to 2 (AT_TARGET)

            if event.target is this then event.phase = 2

If event phase is 1 (CAPTURING), the event will be dispatched to
this instance. After that, the event will be dispatched to every
while the phase remains CAPTURING and event was not aborted.

            if event.phase is 1
              @dispatchEvent event

              if @children then for child in @children
                if event.phase is 1 and not event.aborted
                  child.broadcastEvent event
                else break

After dispatching was finished, it may be possible that the event
target was changed. If the event target is this instance, the
event phase will be set to AT_TARGET and the event will be dispatched
again.

            if event.target is this then event.phase = 2

            if event.phase is 2 then @dispatchEvent event

At this point the event has finished it's lifecycle. If event.source
is this instance, so the event callback will be called if the
event was not aborted or finished or canceled.

            if event.source is this
              unless event.canceled or event.aborted or event.done or event.phase is 3
                event.callback?.call? this, event
              event.phase = 3
              event.finish()
        return this

#### PARAMETERS

**event**
* Type: [Event][Event] - event to broadcast

[Node]: ./node.litcoffee
[Event]: ./event.litcoffee
[Evented]: ./evented.litcoffee
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
