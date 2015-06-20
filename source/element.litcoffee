# CLASS: Element
* Extends: [Evented][Evented]
* Parent: [Index][Parent]

A visual element. Manages **mousemove**, **mousedown** and **mouseup** events.
Manages **regions** and **local event coordinates**.

---

    module.exports = class Element extends require 'ecl/dist/evented'

## CONSTRUCTOR

### new Element(args)

Creates an Element instance.

      constructor: ->
        super

Copy the element origin if it was set from named arguments

        if @origin then @origin = x:(@origin.x or 0), y:(@origin.y or 0)

Copy the element regions if they were set from named arguments

        if regions = @regions
          @regions = {}
          @regions[name] = region for name, region of regions

Register validating listeners for each **type** from the list.

        for type in ['mousemove', 'mousedown', 'mouseup']

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

        for type in ['mousemove', 'mousedown', 'mouseup']

Add capturing extendable listener

          @addListener type, this["#{type}CaptureListener"], yes

Add normal extendable listener

          @addListener type, this["#{type}Listener"], no

#### PARAMETERS
* **args**
    * Type: [Object][Object] - named arguments

* **args.origin**
    * Type: [Object][Object] - origin coordinates

* **args.origin.x**
    * Type: [Number][Number] - x coordinate

* **args.origin.y**
    * Type: [Number][Number] - y coordinate

* **args.regions** - named regions
    * Type: [Object][Object]

* **args.regions.{NAME}**
    * Type: [Array][Array] - [x, y, width, height]

---

## PROPERTIES

### #origin
* Type: [Object][Object] - origin coordinates
* **x**
  * Type: [Number][Number] - x coordinate
* **y**
  * Type: [Number][Number] - y coordinate

### #regions
* Type: [Object][Object] - region name/value pairs
* **{REGION NAME}**
    * Type: [Array][Array] - [x, y, width, height]

---

## METHODS
### #localizeEventCoordinates(event) ->
* Returns: [Element][Element]

Helper method, to localize event coordinates.

      localizeEventCoordinates: (event) ->
        if event

If event already has localized **x**, use it instead of absolute **x**

          x = (if event.localX? then event.localX else event.x)
          event.localX = x - (@origin?.x or 0)

If event already has localized **y**, use it instead of absolute **y**

          y = (if event.localY? then event.localY else event.y)
          event.localY = y - (@origin?.y or 0)

        return this
---

### #getEventRegions(event)
* Returns: [Object][Object] - named set of matching regions

Helper method, to get element regions that match the event.

      getEventRegions: (event) ->
        result = null

Proceed only if event coordinates are localized

        if event and (x = event.localX)? and (y = event.localY)?

Walk through the element regions

          for name, $ of @regions

and add the region to the result if event localized coordinates are within
the region rectangle.

            if $[0] <= x <= ($[0] + $[2]) and $[1] <= y <= ($[1] + $[3])

Initialize result only if at least one region matches

              result or= {}
              result[name] = $

        return result

---

## LISTENERS
### #mousemoveCaptureListener(event)
* Returns: [Element][Element]

Extendable capturing **mousemove** listener

      mousemoveCaptureListener: (event) ->

Store the event in the runtime for later and localize event coordinates

        @___runtime.mousemoveEvent = event
        @localizeEventCoordinates event

        return this

---

### #mousedownCaptureListener(event)
* Returns: [Element][Element]

Extendable capturing **mousedown** listener

      mousedownCaptureListener: (event) ->

Store the event in the runtime for later and localize event coordinates

        @___runtime.mousedownEvent = event
        @localizeEventCoordinates event

        return this

---

### #mouseupCaptureListener(event)
* Returns: [Element][Element]

Extendable capturing **mouseup** listener

      mouseupCaptureListener: (event) ->

Store the event in the runtime for later and localize event coordinates

        @___runtime.mouseupEvent = event
        @localizeEventCoordinates event

        return this

---

### #mousemoveListener(event)
* Returns: [Element][Element]

Extendable **mousemove** listener

      mousemoveListener: -> this

---

### #mousedownListener(event)
* Returns: [Element][Element]

Extendable **mousemove** listener

      mousedownListener: -> this

---

### #mouseupListener(event)
* Returns: [Element][Element]

Extendable **mousemove** listener

      mouseupListener: -> this

[Element]: ./element

[Parent]: ./index.litcoffee
[Evented]: https://nhzio.github.com/ecl/evented.html
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
