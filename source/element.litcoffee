# CLASS: Element
* Extends: [Evented][Evented]
* Parent: [Index][Parent]

A visual element.

---

    module.exports = class Element extends require 'ecl/dist/evented'

## CONSTRUCTOR

### new Element()

Creates an Element instance.

      constructor: ->
        super

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
* **args** - named arguments

---

## PROPERTIES

---

## METHODS
### #mousemoveCaptureListener(event)
* Returns: [Element][Element]

Extendable capturing **mousemove** listener
    
      mousemoveCaptureListener: (event) ->

Store the event in the runtime for later

        @___runtime.mousemoveEvent = event
        return this

---

### #mousedownCaptureListener(event)
* Returns: [Element][Element]

Extendable capturing **mousedown** listener

      mousedownCaptureListener: (event) ->

Store the event in the runtime for later

        @___runtime.mousedownEvent = event
        return this

---

### #mouseupCaptureListener(event)
* Returns: [Element][Element]

Extendable capturing **mouseup** listener
      
      mouseupCaptureListener: (event) ->

Store the event in the runtime for later
        
        @___runtime.mouseupEvent = event
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
