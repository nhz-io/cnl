# CLASS: Component
* Extends: [Shape][Shape]
* Parent: [Index][Parent]

An interactive component

---

    Event = require 'ecl/dist/event'
    module.exports = class Component extends require './shape'

## CONSTRUCTOR
### new Component()
* Returns: [Component][Component]

Creates Component instance.

      constructor: ->
        super

Register validating listeners for each **type** from the list.

        for type in ['grab', 'release', 'drag']

Localize the **type** variable.

          do (type) =>

Add capturing listener which will cancel and stop the event
if the event type is not enabled.

            @addListener type:type, capture:yes, listener: (event) ->
              event.cancel().stop() unless @events?[type]

Add normal listener which will cancel and stop the event
if the event type is not enabled.

            @addListener type:type, capture:no, listener: (event) ->
              event.cancel().stop() unless @events?[type]

Register extendable listeners for each **type** from the list.

        for type in ['grab', 'release', 'drag']

Add capturing extendable listener
          
          @addListener type, this["#{type}CaptureListener"], yes

Add normal extendable listener
          
          @addListener type, this["#{type}Listener"], no

#### PARAMETERS
* **args** - named arguments

---

## PROPERTIES

---

## LISTENERS
### #mousemoveCaptureListener(event)
* Returns: [Component][Component]

Capture **mousemove** event passing throught this component

      mousemoveCaptureListener: (event) ->
        super

Proceed only for valid event

        if event
          $ = @___runtime

Reset component state.

          @state = null

If component is grabbed then set the state to **active**.

          if $.grab
            @state = 'active'

Create **drag** Event and broadcast it to this component if drag event is enabled,

            if @events?.drag
              @broadcastEvent new Event
                type:'drag', x:event.x, y:event.y

setting the drag offset.

                offsetX: event.x - ($.dragEvent?.x or $.grabEvent?.x or 0)
                offsetY: event.y - ($.dragEvent?.y or $.grabEvent?.y or 0)

Otherwise, set the state to the name of the first matching region in order.

          else if regions = event.regions
            @state = (if regions.hover then 'hover' else if regions.normal then 'normal')

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

Proceed only for valid event

        if event

If component is in active state and **grab** event is enabled then grab this component.

          if (@state is 'active') and @events?.grab
            ($ = @___runtime).grab = true

Create **grab** event and deliver it to this component.
          
            $.dragEvent = null
            @broadcastEvent new Event
              type:'grab', x:event.x, y:event.y
          
        return this

#### PARAMETERS
**event**
* Type: [Event][Event]

---

### #dragCaptureListener(event)
* Returns: [Component][Component]

Capture **drag** events passing through this component

      dragCaptureListener: (event) ->

Proceed only for valid event

        if event

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

Proceed only for valid event
        
        if event

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

Proceed only for valid event
        
        if event

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


[Parent]: ./index.litcoffee
[Shape]: ./shape.litcoffee
[Component]: ./component.litcoffee

