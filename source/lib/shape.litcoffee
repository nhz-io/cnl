# CLASS: Shape
* Extends: [Element][Element]

A drawable shape class.

    Event = require './event'
    findPointZones = require '../helper/find-point-zones'

    module.exports = class Shape extends require './element'

## CONSTRUCTOR

### #new Shape(args)
* Returns: [Shape][Shape]

Create new Shape instance

      constructor: (args = {}) ->
        super

optionally settings **zones** property if it was provided in args.

        (@zones ||= {}) and @zones[key] = value for key, value of args.zones

Register capturing and non-capturing validation listeners. Those will stop the
event propagation if the event **type** is not enabled (Only one listener here)

        for name in ['draw']
          do (name) =>
            @addListener name, ((e) -> e.stop() unless @events?[name]), yes
            @addListener name, ((e) -> e.stop() unless @events?[name]), no

---

## PROPERTIES

### #zones
* Type: [Object][Object] - collection of shape zones

---

## METHODS
      
### #mousemoveCaptureListener(event)
* Returns: [Event][Event]

Capture **mousemove** events passing through this shape

      mousemoveCaptureListener: (event) ->
        super

Get shape zones which match the event and store them in the event (for later).

        if (zones = findPointZones event.localX, event.localY, @zones)
          event.zones = zones

Set the shape state to the first matching zone name in order.

          for name in ['active', 'hover', 'normal'] when zones[name]
            state = name
            break

If any state was set then make this shape a target of the event (for now)

          if (@state = state or null) then event.target = this
        return this

#### PARAMETERS
**event**
* Type: [Event][Event] - captured event

---

### #mousedownCaptureListener(event)
* Returns: [Shape][Shape]

Capture **mousedown** events passing through this shape

      mousedownCaptureListener: (event) ->
        super

Get shape zones which match the event and store them in the event (for later).

        if (zones = findPointZones event.localX, event.localY, @zones)
          event.zones = zones

Set the shape state to the first matching zone name in order

          for name in ['active', 'hover', 'normal'] when zones[name]
            state = name
            break

If any state was set then make this shape a target of the event (for now)

          if (@state = state or null) then event.target = this
        return this

#### PARAMETERS
**event**
* Type: [Event][Event] - captured event

---

### #mouseupCaptureListener(event)
* Returns: [Event][Event]

Capture **mouseup** events passing through this shape

      mouseupCaptureListener: (event) ->
        super

Get shape zones which match the event and store them in the event (for later).

        if zones = findPointZones event.localX, event.localY, @zones
          event.zones = zones

Set the shape state to the first matching zone name in order

          for name in ['active', 'hover', 'normal'] when zones[name]
            state = name
            break

If any state was set then make this shape a target of the event (for now)

          if (@state = state or null) then event.target = this
        return this

#### PARAMETERS
**event**
* Type: [Event][Event] - captured event

---

### #draw(context, args)
* Returns: [Shape][Shape]

Create **draw** event and deliver it to this shape

      draw: (context, args) ->
        if @events?.draw then @broadcastEvent new Event
          type:'draw', target:this, context:context, args:args
        return this

#### PARAMETERS
**context**
* Type: [Object][Object] - context to draw on

**args**
* Type: [Object][Object] - drawing options

[Shape]: ./shape.litcoffee
[Element]: ./element.litcoffee
[Event]: ./event.litcoffee
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
