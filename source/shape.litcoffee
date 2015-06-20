# CLASS: Shape
* Extends: [Element][Element]
* Parent: [Index][Parent]

A drawable shape. Manages **regions**.

---

    module.exports = class Shape extends require './element'

## CONSTRUCTOR

### new Shape(args)

Creates Shape instance.

      constructor: ->
        super

Copy the element regions if they were set from named arguments

        if regions = @regions
          @regions = {}
          @regions[name] = region for name, region of regions

#### PARAMETERS
* **args** - named arguments

---

## PROPERTIES
### #regions
* Type: [Object][Object] - region name/value pairs
* **{REGION NAME}**
    * Type: [Array][Array] - [x, y, width, height]

---

## METHODS
### #draw(context, args)
* Returns: [Shape][Shape]

A draw method stub

      draw: -> this

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
* Returns: [Shape][Shape]

Capture **mousemove** events passing through this shape

      mousemoveCaptureListener: (event) ->
        super

        if regions = @getEventRegions event

Get shape regions that match the event and store them in the event.

          event.regions = regions

Set the shape state to the first matching region name in order.

          for name in ['active', 'hover', 'normal'] when regions[name]
            state = name
            break

If any state was set then make this shape a target of the event.
Reset the state if no region was found.

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

        if regions = @getEventRegions event

Get shape regions that match the event and store them in the event.

          event.regions = regions

Set the shape state to the first matching region name in order

          for name in ['active', 'hover', 'normal'] when regions[name]
            state = name
            break

If any state was set then make this shape a target of the event.
Reset the state if no region was found.

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

        if regions = @getEventRegions event

Get shape regions that match the event and store them in the event.

          event.regions = regions

Set the shape state to the first matching region name in order

          for name in ['active', 'hover', 'normal'] when regions[name]
            state = name
            break


If any state was set then make this shape a target of the event.
Reset the state if no region was found.

          if (@state = state or null) then event.target = this

        return this

#### PARAMETERS
**event**
* Type: [Event][Event] - captured event

[Shape]: ./shape.litcoffee
[Element]: ./element.litcoffee
[Event]: ./event.litcoffee
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
