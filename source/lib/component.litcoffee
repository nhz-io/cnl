# CLASS: Component
* Extends: [Element][Element]

An interactive component.

    Event = require './event'
    localizeEventCoordinates = require '../helper/localize-event-coordinates'
    module.exports = class Component extends require './shape'

## CONSTRUCTOR
### new Component(args)
* Returns: [Component][Component]

Create a Component instance

      constructor: (args = {}) ->
        super

and register capturing and non-capturing validation listeners. Those will stop the
event propagation if the event **type** is not enabled.

        for name in ['grab', 'release', 'drag']
          do (name) =>
            @addListener name, ((e) -> e.stop() unless @events?[name]), yes
            @addListener name, ((e) -> e.stop() unless @events?[name]), no

Register capturing listeners. Those listeners can be extended in subclasses.

        for name in ['grab', 'release', 'drag']
          @addListener name, this["#{name}CaptureListener"], yes

---

## METHODS
### #mousemoveCaptureListener(event)
* Returns: [Component][Component]

Capture **mousemove** event passing throught this component

      mousemoveCaptureListener: (event) ->
        super
        $ = @___runtime

Reset component state.

        @state = null

If component is grabbed then set the state to **active**.

        if $.grab
          @state = 'active'

Create **drag** Event and broadcast it to this component if drag event is enabled,

          if @events?.drag
            @broadcastEvent $.dragEvent = new Event type:'drag',
              x:event.x, y:event.y, target:this

setting the drag offset.

              offsetX: event.x - ($.dragEvent?.x or $.grabEvent?.x or 0)
              offsetY: event.y - ($.dragEvent?.y or $.grabEvent?.y or 0)

Otherwise, set the state to the name of the first matching zone in order.

        else if zones = event.zones
          @state = (if zones.hover then 'hover' else if zones.normal then 'normal')

        return this

#### PARAMETERS
**event**
* Type: [Event][Event]

---

### #mouseupCaptureListener(event)
* Returns: [Component][Component]

Capture **mouseup** event passing throught this component

      mouseupCaptureListener: (event) ->
        super
        $ = @___runtime

Reset component state.

        @state = null

If component is grabbed then release it

        if $.grab
          $.grab = false

If release event is enabled then create **release** Event, save it
and deliver it to this component, 

          if @events?.release
            @broadcastEvent $.releaseEvent = new Event type:'release',
              x:event.x, y:event.y, target:this

Update the **#state** to the first matching zone name in order

        if zones = event.zones
          @state = (if zones.hover then 'hover' else if zones.normal then 'normal')

        return this

#### PARAMETERS
**event**
* Type: [Event][Event]

---

### #mousedownListener(event)
* Returns: [Component][Component]

Receive **mousedown** event.

      mousedownListener: (event) ->
        super

If component is in active state and **grab** event is enabled then grab this component.

        if (@state is 'active') and @events?.grab
          ($ = @___runtime).grab = true

Create **grab** event and deliver it to this component.

          @broadcastEvent $.grabEvent = new Event type:'grab',
            x:event.x, y:event.y, target:this
        return this

#### PARAMETERS

---

### #dragCaptureListener(event)
* Returns: [Component][Component]

Capture **drag** events passing through this component

      dragCaptureListener: (event) ->

Save the event and localize event coordinates.

        @___runtime.dragEvent = event
        localizeEventCoordinates event, @origin
        return this

#### PARAMETERS
**event**
* Type: [Event][Event]

---

### #grabCaptureListener(event)
* Returns: [Component][Component]

Capture **grab** events passing through this component.

      grabCaptureListener: (event) ->

Save the event and localize event coordinates.

        @___runtime.grabEvent = event
        localizeEventCoordinates event, @origin
        return this

#### PARAMETERS
**event**
* Type: [Event][Event]

---

* Returns: [Component][Component]

Capture **release** events passing through this component.

      releaseCaptureListener: (event) ->

Save the event and localize event coordinates.

        @___runtime.releaseEvent = event
        localizeEventCoordinates event, @origin
        return this

#### PARAMETERS
**event**
* Type: [Event][Event]

---

* Returns: [Component][Component]

#### #dragListener(event)
* Returns: [Component][Component]

**drag** event receiver stub.

      dragListener: -> this

#### PARAMETERS
**event**
* Type: [Event][Event]

---

### #grabListener(event)
* Returns: [Component][Component]

**grab** event receiver stub.

      grabListener: -> this

#### PARAMETERS
**event**
* Type: [Event][Event]

---
### #releaseListener(event)
* Returns: [Component][Component]

**release** event receiver stub.

      releaseListener: -> this

#### PARAMETERS
**event**
* Type: [Event][Event]
